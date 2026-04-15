import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import { setupRouteGuards } from '@/router/guards'
import { setupPlugins } from '@/plugins'
import store from '@/store'
import '@/assets/styles/index.scss'

const app = createApp(App)

app.use(store)
setupRouteGuards(router, store)
app.use(router)
setupPlugins(app)
app.mount('#app')
