<template>
  <v-app>
    <HeaderBar />
    <router-view />
    <FooterBar />
  </v-app>
</template>

<script setup>
import { onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useTodosStore } from '@/stores/todos'
import { useCookies } from '@vueuse/integrations/useCookies'

const auth = useAuthStore()
const todos = useTodosStore()
const cookies = useCookies()

onMounted(() => {
  auth.initFromCookie(cookies)
  if (auth.token) {
    todos.loadFromLocalStorage()
  }
})
</script>
