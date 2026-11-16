<script setup>
import Sidebar from './components/Sidebar.vue'
</script>

<template>
  <div v-if="$route.meta.requiresAuth" class="app">
    <Sidebar />
    <main><router-view /></main>
  </div>
  <router-view v-else />
</template>
