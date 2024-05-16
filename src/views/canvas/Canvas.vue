<template>
  <canvas class="main-container" ref="canvas"/>
</template>
<style>
.main-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
<script setup lang="ts">

import {onMounted, type Ref, ref} from "vue";
import {MouseService} from "@/views/diagram/services/MouseService";

let context: CanvasRenderingContext2D;
const canvas: Ref<HTMLCanvasElement | null> = ref(null);

class Shape {
  x0: number;
  y0: number;
  x: number;
  y: number;
  lx = 40;
  ly = 40;

  dm = 6;

  constructor(x: number, y: number) {
    this.x0 = x
    this.y0 = y
    this.x = x;
    this.y = y;
  }

  draw() {
    const dx = MouseService.x - this.x;
    const dy = MouseService.y - this.y;
    const angle = Math.atan2(dy, dx);

    const vx = this.dm * Math.cos(angle);
    const vy = this.dm * Math.sin(angle);

    if (Math.abs(this.x + vx - this.x0) < this.lx) {
      this.x += vx;
    }
    if (Math.abs(this.y + vy - this.y0) < this.ly) {
      this.y += vy;
    }

    context.fillStyle = "black";
    context.beginPath();
    context.arc(this.x, this.y, 3, 0, Math.PI * 2, false);
    context.fill();
  }
}

let shapes: Array<Shape> = [];
const gs = 20
for (let i = 0; i < innerWidth; i += gs) {
  for (let j = 0; j < innerHeight; j += gs) {
    shapes.push(new Shape(i, j));
  }
}

const animate = () => {
  context.clearRect(0, 0, innerWidth, innerHeight);
  context.fillStyle = "white";
  context.fillRect(0, 0, innerWidth, innerHeight);

  shapes.forEach(e => e.draw());
  requestAnimationFrame(animate);
}
onMounted(() => {

  canvas.value.width = innerWidth;
  canvas.value.height = innerHeight;
  context = canvas.value.getContext("2d");

  requestAnimationFrame(animate);

});
</script>
