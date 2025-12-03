<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6" class="mx-auto">
        <v-card>
          <v-card-title>
            Todo Dashboard
          </v-card-title>
          <v-card-text>
            <TodoControls />
            <TodoList />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import TodoList from '@/components/TodoList.vue'
import TodoControls from '@/components/TodoControls.vue'
</script>
