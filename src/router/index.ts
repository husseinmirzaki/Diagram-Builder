import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import("@/views/diagram/Diagram.vue"),
        },
        {
            path: '/canvas',
            name: 'canvas',
            component: () => import("@/views/canvas/Canvas.vue"),
        },
        {
            path: '/gl3d',
            name: 'webgl3d',
            component: () => import("@/views/webgl_digram_3d/WebGLDiagram3d.vue"),
        },
        {
            path: '/glimport',
            name: 'webglimport',
            component: () => import("@/views/webgl_digram_import/WebGLDiagramImport.vue"),
        },
        {
            path: '/three',
            name: 'three',
            component: () => import("@/views/three/ThreeView.vue"),
        }
    ]
})

export default router
