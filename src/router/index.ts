import { createRouter, createWebHistory } from 'vue-router'
import { constantRoutes } from '@/router/routes'

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: constantRoutes,
})

export default router
