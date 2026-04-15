import type { RouteRecordRaw } from 'vue-router'
import { defineStore } from 'pinia'
import { asyncRoutes, constantRoutes } from '@/router/routes'

function hasPermission(roles: string[], route: RouteRecordRaw) {
  const routeRoles = route.meta?.roles as string[] | undefined
  if (!routeRoles || routeRoles.length === 0) {
    return true
  }
  return roles.includes('admin') || routeRoles.some((role) => roles.includes(role))
}

function filterAsyncRoutes(routes: RouteRecordRaw[], roles: string[]): RouteRecordRaw[] {
  return routes.reduce<RouteRecordRaw[]>((accumulator, route) => {
    if (!hasPermission(roles, route)) {
      return accumulator
    }

    const currentRoute = { ...route } as RouteRecordRaw
    if (route.children) {
      currentRoute.children = filterAsyncRoutes(route.children, roles)
    }

    accumulator.push(currentRoute)
    return accumulator
  }, [])
}

export const usePermissionStore = defineStore('permission', {
  state: () => ({
    routes: [] as RouteRecordRaw[],
    addRoutes: [] as RouteRecordRaw[],
    isRoutesLoaded: false,
  }),
  actions: {
    async generateRoutes(roles: string[]) {
      const accessedRoutes = roles.includes('admin') ? asyncRoutes.slice() : filterAsyncRoutes(asyncRoutes, roles)
      this.addRoutes = accessedRoutes
      this.routes = constantRoutes.concat(accessedRoutes)
      this.isRoutesLoaded = true
      return accessedRoutes
    },
    resetRoutes() {
      this.routes = []
      this.addRoutes = []
      this.isRoutesLoaded = false
    },
  },
})
