<script setup lang="ts">
import type { Section } from '@/data/types'

defineProps<{
  sections: Section[]
  activeId: string
}>()

defineEmits<{
  navigate: [id: string]
}>()
</script>

<template>
  <aside class="w-56 flex-shrink-0">
    <nav class="sticky top-20 space-y-1">
      <a
        v-for="section in sections"
        :key="section.id"
        :href="'#' + section.id"
        class="toc-link block px-3 py-1.5 text-sm text-dock-muted hover:text-dock-text border-l-2 border-transparent transition-colors"
        :class="{ active: activeId === section.id }"
        @click="$emit('navigate', section.id)"
      >
        {{ section.title }}
      </a>
    </nav>
  </aside>
</template>
