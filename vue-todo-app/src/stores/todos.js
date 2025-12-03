import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { v4 as uuidv4 } from 'uuid'

const STORAGE_KEY = 'vue_auth_todos_v1'

export const useTodosStore = defineStore('todos', () => {
  const todos = ref([]) 
  const filter = ref('all') 
  const sort = ref('newest') 

  function loadFromLocalStorage() {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      try {
        todos.value = JSON.parse(raw)
      } catch (e) {
        todos.value = []
      }
    }
  }

  function saveToLocalStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos.value))
  }

 watch(todos, saveToLocalStorage, { deep: true })

  function addTodo(title) {
    todos.value.unshift({
      id: uuidv4(),
      title: title.trim(),
      completed: false,
      isFavorite: false,
      createdAt: new Date().toISOString()
    })
  }

  function updateTodo(id, patch) {
    const idx = todos.value.findIndex(t => t.id === id)
    if (idx === -1) return
    todos.value[idx] = { ...todos.value[idx], ...patch }
  }

  function removeTodo(id) {
    todos.value = todos.value.filter(t => t.id !== id)
  }

  function toggleComplete(id) {
    const t = todos.value.find(t => t.id === id)
    if (t) t.completed = !t.completed
  }

  function toggleFavorite(id) {
    const t = todos.value.find(t => t.id === id)
    if (t) t.isFavorite = !t.isFavorite
  }

  const filtered = computed(() => {
    let list = [...todos.value]
    if (filter.value === 'active') list = list.filter(t => !t.completed)
    else if (filter.value === 'completed') list = list.filter(t => t.completed)
    else if (filter.value === 'favorites') list = list.filter(t => t.isFavorite)
    // sorting
    if (sort.value === 'newest') {
      list.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    } else if (sort.value === 'oldest') {
      list.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    } else if (sort.value === 'az') {
      list.sort((a, b) => a.title.localeCompare(b.title))
    } else if (sort.value === 'za') {
      list.sort((a, b) => b.title.localeCompare(a.title))
    } else if (sort.value === 'favoritesFirst') {
      list.sort((a, b) => Number(b.isFavorite) - Number(a.isFavorite))
    }
    return list
  })

  // expose
  return {
    todos, filter, sort,
    loadFromLocalStorage, saveToLocalStorage,
    addTodo, updateTodo, removeTodo, toggleComplete, toggleFavorite,
    filtered
  }
})
