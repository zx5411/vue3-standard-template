import { setActivePinia, createPinia } from 'pinia'
import { describe, expect, it } from 'vitest'
import { usePermissionStore } from '@/store/modules/permission'
import { asyncRoutes } from '@/router/routes'

describe('permission store', () => {
  it('keeps only routes allowed by role metadata for non-admin users', async () => {
    setActivePinia(createPinia())
    const permissionStore = usePermissionStore()

    const routes = await permissionStore.generateRoutes(['editor'])
    const routePaths = routes.map((route) => route.path)

    expect(routePaths).toContain('/index')
    expect(routePaths).not.toContain('/system/user')
    expect(asyncRoutes.some((route) => route.path === '/system/user')).toBe(true)
  })

  it('returns all async routes for admin users', async () => {
    setActivePinia(createPinia())
    const permissionStore = usePermissionStore()

    const routes = await permissionStore.generateRoutes(['admin'])

    expect(routes.map((route) => route.path)).toContain('/system/user')
  })
})
