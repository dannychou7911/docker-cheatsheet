<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{
  title: string
  description: string
  to: string
  sectionCount: number
  commandCount: number
}>()
</script>

<template>
  <RouterLink
    :to="to"
    class="block p-6 rounded-2xl bg-dock-surface border border-dock-surface2 hover:border-dock-accent/50 hover:bg-dock-surface2/50 transition-all group"
  >
    <h2 class="text-xl font-bold text-dock-text group-hover:text-dock-accent transition-colors mb-2">
      {{ title }}
    </h2>
    <p class="text-dock-muted text-sm mb-4">{{ description }}</p>
    <div class="flex gap-4 text-xs text-dock-dim">
      <span>{{ sectionCount }} 章節</span>
      <span>{{ commandCount }} 指令</span>
    </div>
  </RouterLink>
</template>
