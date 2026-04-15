import type { Pinia } from 'pinia'
import type { Router } from 'vue-router'
import { APP_TITLE, ROUTE_WHITE_LIST } from '@/constants'
import i18n from '@/i18n'
import { usePermissionStore } from '@/store/modules/permission'
import { useUserStore } from '@/store/modules/user'

export function setupRouteGuards(router: Router, store: Pinia) {
  router.beforeEach(async (to) => {
    const userStore = useUserStore(store)
    const permissionStore = usePermissionStore(store)
    const titleKey = typeof to.meta.titleKey === 'string' ? to.meta.titleKey : ''
    const pageTitle = titleKey ? i18n.global.t(titleKey) : APP_TITLE
    document.title = titleKey ? `${pageTitle} | ${APP_TITLE}` : APP_TITLE

    if (userStore.token) {
      if (to.path === '/login') {
        return '/index'
      }

      if (!permissionStore.isRoutesLoaded) {
        const accessRoutes = await permissionStore.generateRoutes(userStore.roles)
        accessRoutes.forEach((route) => {
          router.addRoute(route)
        })

        return {
          ...to,
          replace: true,
        }
      }

      return true
    }

    if (ROUTE_WHITE_LIST.includes(to.path)) {
      return true
    }

    return '/login'
  })
}
