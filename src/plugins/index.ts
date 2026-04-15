import type { App } from 'vue'
import i18n from '@/i18n'
import { setupPermissionDirective } from '@/directive/permission'

export function setupPlugins(app: App) {
  app.use(i18n)
  setupPermissionDirective(app)
}
