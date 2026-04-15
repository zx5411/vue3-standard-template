import { defineStore } from 'pinia'
import { getToken, removeToken, setToken } from '@/utils/auth'
import { usePermissionStore } from '@/store/modules/permission'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: getToken() || 'demo-token',
    name: 'Admin',
    roles: ['admin'],
  }),
  actions: {
    setUserToken(token: string) {
      this.token = token
      setToken(token)
    },
    logout() {
      const permissionStore = usePermissionStore()
      this.token = ''
      this.roles = []
      removeToken()
      permissionStore.resetRoutes()
    },
  },
})
