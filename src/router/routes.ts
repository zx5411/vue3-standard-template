import type { RouteRecordRaw } from 'vue-router'

const Layout = () => import('@/layout/index.vue')

export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/index',
  },
  {
    path: '/index',
    name: 'Dashboard',
    component: Layout,
    children: [
      {
        path: '',
        name: 'DashboardHome',
        component: () => import('@/views/index.vue'),
        meta: {
          titleKey: 'route.dashboard',
          breadcrumbKeys: ['route.dashboard'],
          menuKey: 'dashboard',
        },
      },
    ],
  },
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
    redirect: '/index',
  },
]

export const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/pms',
    name: 'PmsRoot',
    component: Layout,
    meta: { roles: ['admin'] },
    children: [
      {
        path: 'product',
        name: 'ProductList',
        component: () => import('@/views/pms/product/index.vue'),
        meta: {
          titleKey: 'route.productList',
          roles: ['admin'],
          breadcrumbKeys: ['route.dashboard', 'nav.merchandise', 'route.productList'],
          menuKey: 'product-list',
        },
      },
      {
        path: 'product/create',
        name: 'ProductCreate',
        component: () => import('@/views/pms/product-create/index.vue'),
        meta: {
          titleKey: 'route.productCreate',
          roles: ['admin'],
          breadcrumbKeys: ['route.dashboard', 'nav.merchandise', 'route.productCreate'],
          menuKey: 'product-create',
        },
      },
      {
        path: 'product/category',
        name: 'ProductCategory',
        component: () => import('@/views/pms/product-category/index.vue'),
        meta: {
          titleKey: 'route.productCategory',
          roles: ['admin'],
          breadcrumbKeys: ['route.dashboard', 'nav.merchandise', 'route.productCategory'],
          menuKey: 'product-category',
        },
      },
      {
        path: 'product/type',
        name: 'ProductType',
        component: () => import('@/views/pms/product-type/index.vue'),
        meta: {
          titleKey: 'route.productType',
          roles: ['admin'],
          breadcrumbKeys: ['route.dashboard', 'nav.merchandise', 'route.productType'],
          menuKey: 'product-type',
        },
      },
      {
        path: 'product/brand',
        name: 'BrandManage',
        component: () => import('@/views/pms/brand/index.vue'),
        meta: {
          titleKey: 'route.brandManage',
          roles: ['admin'],
          breadcrumbKeys: ['route.dashboard', 'nav.merchandise', 'route.brandManage'],
          menuKey: 'brand-manage',
        },
      },
      {
        path: 'product/:id',
        name: 'ProductDetail',
        component: () => import('@/views/pms/product/detail.vue'),
        meta: {
          titleKey: 'route.productDetail',
          roles: ['admin'],
          breadcrumbKeys: ['route.dashboard', 'nav.merchandise', 'route.productList', 'route.productDetail'],
          menuKey: 'product-list',
        },
      },
    ],
  },
]
