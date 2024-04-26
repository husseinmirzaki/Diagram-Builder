<template>
  <canvas ref="canvas"></canvas>
</template>
<style scoped>
canvas {
  position: absolute;
  top: 0;
  left: 0;
}
</style>
<script setup lang="ts">
import {onMounted, Ref, ref} from "vue";

const canvas: Ref<HTMLCanvasElement> = ref();


onMounted(() => {
  if (canvas.value) {
    canvas.value.width = innerWidth;
    canvas.value.height = innerHeight;
    const gl: WebGLRenderingContext = canvas.value.getContext("webgl");

    const vertexShaderText = `
precision mediump float;

attribute vec2 vertPosition;
attribute vec3 vertColor;
varying  vec3 fragColor;

void main() {
  fragColor = vertColor;
  gl_Position = vec4(vertPosition, 0.0, 1.0);
}
`;

    const fragmentShaderText = `
precision mediump float;

varying  vec3 fragColor;
void main() {
  gl_FragColor = vec4(fragColor, 1.0);
}
`;

    gl.clearColor(0.75, 0.85, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

    gl.shaderSource(vertexShader, vertexShaderText);
    gl.shaderSource(fragmentShader, fragmentShaderText);
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
      console.error("ERROR Compling vertexShader", gl.getShaderInfoLog(vertexShader));
      return;
    }
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
      console.error("ERROR Compling fragmentShader", gl.getShaderInfoLog(fragmentShader));
      return;
    }

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("ERROR Linking Program", gl.getProgramInfoLog(program));
      return;
    }

    gl.validateProgram(program);
    if (!gl.getProgramParameter(program, gl.VALIDATE_STATUS)) {
      console.error("ERROR Validating Program", gl.getProgramInfoLog(program));
      return;
    }

    //
    // Create buffer
    //

    const triangleVertices = [
      0.0, 0.5, 1.0, 1.0, 0.0,
      -0.5, -0.5, 0.7, 0.0, 1.0,
      0.5, -0.5, 0.1, 1.0, 0.6
    ];

    const triangleVertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);

    const positionAttributeLocation = gl.getAttribLocation(program, "vertPosition");
    const colorAttributeLocation = gl.getAttribLocation(program, "vertColor");
    gl.vertexAttribPointer(
        positionAttributeLocation,
        2,
        gl.FLOAT,
        false,
        5 * Float32Array.BYTES_PER_ELEMENT,
        0,
    );
    gl.vertexAttribPointer(
        colorAttributeLocation,
        3,
        gl.FLOAT,
        false,
        5 * Float32Array.BYTES_PER_ELEMENT,
        3 * Float32Array.BYTES_PER_ELEMENT,
    );

    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.enableVertexAttribArray(colorAttributeLocation);

    //
    // Main Render Loop
    //
    gl.useProgram(program);
    gl.drawArrays(
        gl.TRIANGLES,
        0,
        triangleVertices.length
    );
  }

});
</script>