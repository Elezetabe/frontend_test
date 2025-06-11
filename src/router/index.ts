import EspecialistaView from '@/views/EspecialistaView.vue'
import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'especialista',
      component: EspecialistaView,
    },
  ],
})

export default router
