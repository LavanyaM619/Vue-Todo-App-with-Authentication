<template>
  <v-app-bar color="primary" dark>
    <v-toolbar-title>Vue Auth Todo</v-toolbar-title>
    <v-spacer />
    <div v-if="auth.user">{{ auth.user.firstName }} {{ auth.user.lastName }}</div>
    <v-btn text @click="handleLogout">Logout</v-btn>
  </v-app-bar>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { useCookies } from '@vueuse/integrations/useCookies'

const auth = useAuthStore()
const cookies = useCookies()

function handleLogout() {
  auth.logout(cookies)
}
</script>
