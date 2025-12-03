<template>
  <v-list-item>
    <v-list-item-action>
      <v-checkbox v-model="local.completed" @change="toggle" />
    </v-list-item-action>

    <v-list-item-content>
      <v-text-field
        v-model="local.title"
        @blur="save"
        single-line
        dense
        hide-details
      />
      <div class="text-caption">{{ displayDate }}</div>
    </v-list-item-content>

    <v-list-item-action>
      <v-btn icon @click="fav">
        <v-icon v-if="local.isFavorite">mdi-star</v-icon>
        <v-icon v-else>mdi-star-outline</v-icon>
      </v-btn>
      <v-btn icon @click="remove">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-list-item-action>
  </v-list-item>
</template>

<script setup>
import { reactive, toRefs, watch } from 'vue'
import { useTodosStore } from '@/stores/todos'
import { formatDistanceToNow } from 'date-fns'


const props = defineProps({ todo: Object })
const todos = useTodosStore()

// local copy so editing doesn't immediately mutate the store until blur/save
const local = reactive({ ...props.todo })

watch(() => props.todo, (v) => {
  Object.assign(local, v)
})

function toggle() {
  todos.toggleComplete(local.id)
}

function fav() {
  todos.toggleFavorite(local.id)
}

function save() {
  if (!local.title.trim()) {
    // do not allow empty title; remove instead
    todos.removeTodo(local.id)
    return
  }
  todos.updateTodo(local.id, { title: local.title })
}

function remove() {
  todos.removeTodo(local.id)
}

const displayDate = new Date(local.createdAt).toLocaleString()
</script>
