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
import Container from "@/views/diagram/components/Container";

const canvas: Ref<HTMLCanvasElement | null> = ref(null);
onMounted(() => {
  if (canvas.value) {
    const container = new Container(canvas.value);
    container.redraw();
  }
});
</script>
