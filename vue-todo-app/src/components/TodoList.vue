<template>
  <v-list>
    <TodoItem v-for="t in todos.filtered" :key="t.id" :todo="t" />
    <v-list-item v-if="!todos.filtered.length">
      <v-list-item-title>No todos yet</v-list-item-title>
    </v-list-item>
  </v-list>
</template>

<script setup>
import { useTodosStore } from '@/stores/todos'
import TodoItem from './TodoItem.vue'

const todos = useTodosStore()
</script>
