import { createRouter, createWebHistory } from 'vue-router'
import Diagram from "@/views/diagram/Diagram.vue";
import WebGLDiagram from "@/views/webgl_diagram/WebGlDiagram.vue";
import WebGLDiagram3d from "@/views/webgl_digram_3d/WebGLDiagram3d.vue";
import WebGLDiagramImport from "@/views/webgl_digram_import/WebGLDiagramImport.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Diagram
    },
    {
      path: '/gl',
      name: 'webgl',
      component: WebGLDiagram,
    },
    {
      path: '/gl3d',
      name: 'webgl3d',
      component: WebGLDiagram3d,
    },
    {
      path: '/glimport',
      name: 'webglimport',
      component: WebGLDiagramImport,
    }
  ]
})

export default router
