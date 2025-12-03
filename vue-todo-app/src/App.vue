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

const auth = useAuthStore()
const todos = useTodosStore()

onMounted(() => {
  auth.initFromLocalStorage()
  if (auth.token) {
    todos.loadFromLocalStorage()
  }
})
</script>
