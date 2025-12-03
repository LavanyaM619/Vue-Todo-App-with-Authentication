<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card width="480">
      <v-card-title>Login</v-card-title>
      <v-card-text>
        <v-form ref="formRef" v-model="valid" @submit.prevent="submit">
          <v-text-field
            v-model="username"
            label="Username"
            :rules="[v => !!v || 'Required']"
            outlined
            dense
          />
          <v-text-field
            v-model="password"
            label="Password"
            :rules="[v => !!v || 'Required']"
            type="password"
            outlined
            dense
          />
          <v-alert v-if="auth.error" type="error" dense class="mt-2">
            {{ auth.error }}
          </v-alert>
          <v-row class="mt-4" justify="end">
            <v-btn :loading="auth.loading" type="submit" color="primary">Login</v-btn>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useTodosStore } from '@/stores/todos'

const auth = useAuthStore()
const todos = useTodosStore()


const username = ref('') 
const password = ref('')
const valid = ref(false)
const formRef = ref(null)

async function submit() {
  if (!formRef.value?.validate?.()) return
  try {
    await auth.login({ username: username.value, password: password.value })
    todos.loadFromLocalStorage()
  } catch (err) {
  }
}
</script>
