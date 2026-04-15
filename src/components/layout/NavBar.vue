<script setup lang="ts">
import { RouterLink } from 'vue-router'

const topics = [
  { name: 'Docker', to: '/docker' },
  { name: 'k9s', to: '/k9s' },
  { name: 'Git', to: '/git' },
  { name: 'Nano Banana', to: '/nanobanana' },
]
</script>

<template>
  <nav class="sticky top-0 z-50 bg-dock-surface/90 backdrop-blur border-b border-dock-surface2">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center h-14">
      <RouterLink to="/" class="text-lg font-bold text-dock-accent mr-8 hover:opacity-80 transition-opacity">
        Cheatsheet
      </RouterLink>
      <div class="flex gap-1">
        <RouterLink
          v-for="topic in topics"
          :key="topic.to"
          :to="topic.to"
          class="px-3 py-1.5 rounded-md text-sm font-medium text-dock-muted hover:text-dock-text hover:bg-dock-surface2 transition-colors"
          active-class="!text-dock-accent !bg-dock-accent/10"
        >
          {{ topic.name }}
        </RouterLink>
      </div>
    </div>
  </nav>
</template>
