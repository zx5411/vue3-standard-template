import type { RouteRecordRaw } from 'vue-router'

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login.vue'),
    meta: { titleKey: 'route.login' },
  },
  {
    path: '/401',
    name: 'Error401',
    component: () => import('@/views/error/401.vue'),
    meta: { titleKey: 'route.error401' },
  },
  {
    path: '/404',
    name: 'Error404',
    component: () => import('@/views/error/404.vue'),
    meta: { titleKey: 'route.error404' },
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
]

export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/index',
    name: 'Dashboard',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '',
        name: 'DashboardHome',
        component: () => import('@/views/index.vue'),
        meta: { titleKey: 'route.dashboard' },
      },
    ],
  },
  {
    path: '/system/user',
    name: 'SystemUser',
    component: () => import('@/layout/index.vue'),
    meta: { roles: ['admin'] },
    children: [
      {
        path: '',
        name: 'SystemUserIndex',
        component: () => import('@/views/system/user/index.vue'),
        meta: { titleKey: 'route.systemUser', roles: ['admin'] },
      },
    ],
  },
]
