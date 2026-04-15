import { beforeEach, describe, expect, it, vi } from 'vitest'
import { createApp, nextTick } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import { setupPlugins } from '@/plugins'
import { setupRouteGuards } from '@/router/guards'

describe('app startup debug', () => {
  beforeEach(() => {
    document.body.innerHTML = '<div id="app"></div>'
    router.replace('/index')
  })

  it('mounts dashboard route without runtime errors', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})

    const app = createApp(App)
    app.use(store)
    setupRouteGuards(router, store)
    app.use(router)
    setupPlugins(app)

    expect(() => app.mount('#app')).not.toThrow()

    await router.isReady()
    await nextTick()

    expect(router.currentRoute.value.fullPath).toBe('/index')
    expect(document.body.innerHTML).toContain('Admin')
    expect(errorSpy).not.toHaveBeenCalled()

    warnSpy.mockRestore()
    errorSpy.mockRestore()
  })
})
