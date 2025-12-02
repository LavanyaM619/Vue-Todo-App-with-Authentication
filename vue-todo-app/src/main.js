import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import VueCookies from 'vue-cookies'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(VueCookies, { expire: '7d' })
app.mount('#app')
