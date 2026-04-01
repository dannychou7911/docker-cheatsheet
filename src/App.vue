<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavBar from '@/components/layout/NavBar.vue'
</script>

<template>
  <div class="min-h-screen bg-dock-bg text-dock-text font-sans">
    <NavBar />
    <RouterView />
  </div>
</template>
