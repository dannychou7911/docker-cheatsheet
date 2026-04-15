import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/docker',
      name: 'docker',
      component: () => import('@/views/DockerView.vue'),
    },
    {
      path: '/k9s',
      name: 'k9s',
      component: () => import('@/views/K9sView.vue'),
    },
    {
      path: '/git',
      name: 'git',
      component: () => import('@/views/GitView.vue'),
    },
    {
      path: '/nanobanana',
      name: 'nanobanana',
      component: () => import('@/views/NanoBananaView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

export default router
