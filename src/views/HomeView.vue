<style>
.the-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>

<template>
  <Canvas ref="canvas" class="the-canvas"/>
</template>

<script setup lang="ts">
import {onMounted, onUnmounted, type Ref, ref} from "vue";
import DiagramContainer from "@/views/diagram_builder/DiagramContainer";
import MouseService from "@/views/diagram_builder/services/MouseService";
import {ResizeService} from "@/views/diagram_builder/services/ResizeService";

const canvas: Ref<HTMLCanvasElement | undefined> = ref();
let diagramContainer: DiagramContainer | null = null;
const configureCanvas = () => {
  if (canvas.value) {

    canvas.value!.width = innerWidth;
    canvas.value!.height = innerHeight;

    const c = canvas.value.getContext("2d");
    if (c) {
      if (!diagramContainer) {
        diagramContainer = new DiagramContainer(c);
        diagramContainer.build();
      } else {
        diagramContainer.draw(0);
      }
    }
  }
}
onMounted(() => {
  MouseService.init();
  ResizeService.init();
  ResizeService.listeners['onMounted'] = () => {
    configureCanvas();
  }
  configureCanvas();
});

onUnmounted(() => {
  MouseService.destroy();
  ResizeService.destroy();
});
</script>
