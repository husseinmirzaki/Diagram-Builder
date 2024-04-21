import { createRouter, createWebHistory } from 'vue-router'
import Diagram from "@/views/diagram/Diagram.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Diagram
    },
  ]
})

export default router
