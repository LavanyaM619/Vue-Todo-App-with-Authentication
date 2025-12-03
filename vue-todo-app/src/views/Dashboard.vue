<template>
  <v-container>
    <HeaderBar />
    <v-row>
      <v-col cols="12" md="6" class="mx-auto">
        <v-card>
          <v-card-title>
            Todos
          </v-card-title>
          <v-card-text>
            <TodoControls />
            <TodoList />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <FooterBar />
  </v-container>
</template>

<script setup>
import HeaderBar from '@/components/HeaderBar.vue'
import FooterBar from '@/components/FooterBar.vue'
import TodoList from '@/components/TodoList.vue'
import TodoControls from '@/components/TodoControls.vue'
</script>
