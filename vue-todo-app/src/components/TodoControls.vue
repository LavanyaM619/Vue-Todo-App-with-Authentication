<template>
  <div class="mb-2">
    <v-row>
      <v-col>
        <v-text-field v-model="newTodo"  class="container" label="Add todo" @keyup.enter="add" dense outlined />
      </v-col>
      <v-col cols="auto">
        <v-btn @click="add" :disabled="!newTodo">Add</v-btn>
      </v-col>
    </v-row>

    <v-row class="mt-1" align="center">
      <v-col cols="12" md="6">
        <v-btn-toggle v-model="todos.filter" mandatory>
          <v-btn value="all">All</v-btn>
          <v-btn value="active">Active</v-btn>
          <v-btn value="completed">Completed</v-btn>
          <v-btn value="favorites">Favorites</v-btn>
        </v-btn-toggle>
      </v-col>

      <v-col cols="12" md="6">
        <v-select
          :model-value="todos.sort"
          @update:model-value="todos.sort = $event"
          :items="sortOptions"
          item-title="label"
          item-value="value"
          label="Sort"
          dense
          outlined
        />
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTodosStore } from '@/stores/todos'

const todos = useTodosStore()
const newTodo = ref('')
const sortOptions = [
  { label: 'Newest first', value: 'newest' },
  { label: 'Oldest first', value: 'oldest' },
  { label: 'A → Z', value: 'az' },
  { label: 'Z → A', value: 'za' },
  { label: 'Favorites first', value: 'favoritesFirst' }
]

function add() {
  if (!newTodo.value?.trim()) return
  todos.addTodo(newTodo.value)
  newTodo.value = ''
}
</script>

<style scoped>
.container{
  max-width:1100px;
  margin-top: 100px;
}
</style>