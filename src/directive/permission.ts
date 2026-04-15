import type { App, Directive } from 'vue'
import { useUserStore } from '@/store/modules/user'

const permission: Directive<HTMLElement, string | string[]> = {
  mounted(el, binding) {
    const roles = Array.isArray(binding.value) ? binding.value : [binding.value]
    const userStore = useUserStore()
    const allowed = roles.some((role) => userStore.roles.includes(role))

    if (!allowed) {
      el.remove()
    }
  },
}

export function setupPermissionDirective(app: App) {
  app.directive('permission', permission)
}
