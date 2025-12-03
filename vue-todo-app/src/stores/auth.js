import { defineStore } from 'pinia'
import { ref } from 'vue'
import router from '@/router'

export const useAuthStore = defineStore('auth', () => {
  const token = ref(null)
  const user = ref(null) // { id, username, firstName, lastName }
  const loading = ref(false)
  const error = ref(null)

  function initFromCookie($cookies) {
    const t = $cookies.get('accessToken')
    if (t) token.value = t
  }

  async function login({ username, password }, $cookies) {
    loading.value = true
    error.value = null
    try {
      const res = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.message || 'Login failed')
      // save token in cookie
      $cookies.set('accessToken', data.accessToken, '7d')
      token.value = data.accessToken
      user.value = {
        id: data.id,
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName
      }
      // load todos after login (handled in todos store via watcher or call)
      router.push({ name: 'Dashboard' })
    } catch (err) {
      error.value = err.message || String(err)
      throw err
    } finally {
      loading.value = false
    }
  }

  function logout($cookies) {
    $cookies.remove('accessToken')
    token.value = null
    user.value = null
    router.push({ name: 'Login' })
  }

  return { token, user, loading, error, initFromCookie, login, logout }
})
