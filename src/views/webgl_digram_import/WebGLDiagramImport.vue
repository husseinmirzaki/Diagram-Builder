<template>
  <canvas ref="canvas"></canvas>
  <img ref="image" src="../../assets/crate.png" alt="">
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
import * as glm from "gl-matrix";

const canvas: Ref<HTMLCanvasElement> = ref();
const image: Ref<HTMLImageElement> = ref();

const loadTexture = async (url) => {
  let response = await fetch(url);
  return response.blob();
}
onMounted(() => {
  loadTexture("http://localhost:5173/src/assets/monkey.json").then((r) => console.log(r));
  if (canvas.value) {
    canvas.value.width = innerWidth;
    canvas.value.height = innerHeight;
    const gl: WebGLRenderingContext = canvas.value.getContext("webgl");

    const vertexShaderText = `
precision mediump float;

attribute vec3 vertPosition;
attribute vec2 vertTexCoord;
varying vec2 fragTexCoord;

uniform mat4 mWorld;
uniform mat4 mView;
uniform mat4 mProj;

void main() {
  fragTexCoord = vertTexCoord;
  gl_Position = mProj * mView * mWorld * vec4(vertPosition, 1.0);
}
`;

    const fragmentShaderText = `
precision mediump float;

varying vec2 fragTexCoord;
uniform sampler2D sampler;

void main() {
  gl_FragColor = texture2D(sampler, fragTexCoord);
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

    var boxVertices =
        [ // X, Y, Z           U, V
          // Top
          -1.0, 1.0, -1.0, 0, 0,
          -1.0, 1.0, 1.0, 0, 1,
          1.0, 1.0, 1.0, 1, 1,
          1.0, 1.0, -1.0, 1, 0,

          // Left
          -1.0, 1.0, 1.0, 0, 0,
          -1.0, -1.0, 1.0, 1, 0,
          -1.0, -1.0, -1.0, 1, 1,
          -1.0, 1.0, -1.0, 0, 1,

          // Right
          1.0, 1.0, 1.0, 1, 1,
          1.0, -1.0, 1.0, 0, 1,
          1.0, -1.0, -1.0, 0, 0,
          1.0, 1.0, -1.0, 1, 0,

          // Front
          1.0, 1.0, 1.0, 1, 1,
          1.0, -1.0, 1.0, 1, 0,
          -1.0, -1.0, 1.0, 0, 0,
          -1.0, 1.0, 1.0, 0, 1,

          // Back
          1.0, 1.0, -1.0, 0, 0,
          1.0, -1.0, -1.0, 0, 1,
          -1.0, -1.0, -1.0, 1, 1,
          -1.0, 1.0, -1.0, 1, 0,

          // Bottom
          -1.0, -1.0, -1.0, 1, 1,
          -1.0, -1.0, 1.0, 1, 0,
          1.0, -1.0, 1.0, 0, 0,
          1.0, -1.0, -1.0, 0, 1,
        ];

    var boxIndices =
        [
          // Top
          0, 1, 2,
          0, 2, 3,

          // Left
          5, 4, 6,
          6, 4, 7,

          // Right
          8, 9, 10,
          8, 10, 11,

          // Front
          13, 12, 14,
          15, 14, 12,

          // Back
          16, 17, 18,
          16, 18, 19,

          // Bottom
          21, 20, 22,
          22, 20, 23
        ];

    const boxVertexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, boxVertexBufferObject);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(boxVertices), gl.STATIC_DRAW);

    const boxINdexBufferObject = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, boxINdexBufferObject);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(boxIndices), gl.STATIC_DRAW);


    const positionAttributeLocation = gl.getAttribLocation(program, "vertPosition");
    const texCoordAttributeLocation = gl.getAttribLocation(program, "vertTexCoord");
    gl.vertexAttribPointer(
        positionAttributeLocation,
        3,
        gl.FLOAT,
        false,
        5 * Float32Array.BYTES_PER_ELEMENT,
        0,
    );
    gl.vertexAttribPointer(
        texCoordAttributeLocation,
        2,
        gl.FLOAT,
        false,
        5 * Float32Array.BYTES_PER_ELEMENT,
        3 * Float32Array.BYTES_PER_ELEMENT,
    );

    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.enableVertexAttribArray(texCoordAttributeLocation);

    //
    // Create Texture
    //

    const boxTexture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, boxTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texImage2D(
        gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE,
        image.value
    );
    gl.bindTexture(gl.TEXTURE_2D, null);

    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.CCW);
    gl.cullFace(gl.BACK);

    const matWorldUniformLocation = gl.getUniformLocation(program, "mWorld");
    const matViewUniformLocation = gl.getUniformLocation(program, "mView");
    const matProjUniformLocation = gl.getUniformLocation(program, "mProj");

    const worldMatrix = new Float32Array(16);
    const viewMatrix = new Float32Array(16);
    const projMatrix = new Float32Array(16);

    glm.mat4.identity(worldMatrix);
    glm.mat4.lookAt(viewMatrix, [0, 0, -9], [0, 0, 0], [0, 1, 0]);
    glm.mat4.perspective(
        projMatrix,
        glm.glMatrix.toRadian(45),
        canvas.value.width / canvas.value.height,
        0.1,
        1000.0
    );


    //
    // Main Render Loop
    //
    gl.useProgram(program);

    gl.uniformMatrix4fv(matWorldUniformLocation, false, worldMatrix);
    gl.uniformMatrix4fv(matViewUniformLocation, false, viewMatrix);
    gl.uniformMatrix4fv(matProjUniformLocation, false, projMatrix);


    const xRotationMatrix = new Float32Array(16);
    const yRotationMatrix = new Float32Array(16);

    const identityMatrix = new Float32Array(16);
    glm.mat4.identity(identityMatrix);
    let angle = 0;
    const loop = () => {
      angle = performance.now() / 1000 / 6 * 2 * Math.PI;
      glm.mat4.rotate(xRotationMatrix, identityMatrix, angle, [0, 1, 0]);
      glm.mat4.rotate(yRotationMatrix, identityMatrix, angle / 4, [1, 0, 0]);
      glm.mat4.mul(worldMatrix, xRotationMatrix, yRotationMatrix);
      gl.uniformMatrix4fv(matWorldUniformLocation, false, worldMatrix);

      gl.clearColor(0.75, 0.85, 0.8, 1.0);
      gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
      gl.bindTexture(gl.TEXTURE_2D, boxTexture);
      gl.activeTexture(gl.TEXTURE0);
      gl.drawElements(
          gl.TRIANGLES,
          boxIndices.length,
          gl.UNSIGNED_SHORT,
          0,
      );

      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }

});
</script>
