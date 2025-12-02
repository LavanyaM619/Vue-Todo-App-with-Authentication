import { createRouter, createWebHistory } from 'vue-router'
import Login from '@/views/Login.vue'
import Dashboard from '@/views/Dashboard.vue'
import { useAuthStore } from '@/stores/auth'

const routes = [
  { path: '/login', name: 'Login', component: Login },
  { path: '/', name: 'Dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/dashboard', redirect: '/' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  const hasToken = !!auth.token
  if (to.meta.requiresAuth && !hasToken) {
    return next({ name: 'Login' })
  }
  if (to.name === 'Login' && hasToken) {
    return next({ name: 'Dashboard' })
  }
  next()
})

export default router
