<script setup lang="ts">
import type { Concept, SectionColor } from '@/data/types'

defineProps<{
  concept: Concept
  color: SectionColor
}>()

const borderColorMap: Record<SectionColor, string> = {
  accent: 'hover:border-dock-accent/30',
  green: 'hover:border-dock-green/30',
  purple: 'hover:border-dock-purple/30',
  yellow: 'hover:border-dock-yellow/30',
  orange: 'hover:border-dock-orange/30',
  red: 'hover:border-dock-red/30',
  dim: 'hover:border-dock-dim/30',
}

const titleColorMap: Record<SectionColor, string> = {
  accent: 'text-dock-accent',
  green: 'text-dock-green',
  purple: 'text-dock-purple',
  yellow: 'text-dock-yellow',
  orange: 'text-dock-orange',
  red: 'text-dock-red',
  dim: 'text-dock-dim',
}
</script>

<template>
  <div
    class="bg-dock-surface border border-dock-surface2 rounded-xl p-4 transition-colors duration-200"
    :class="borderColorMap[color]"
  >
    <h3 class="font-mono text-sm font-medium mb-1.5" :class="titleColorMap[color]">
      {{ concept.title }}
    </h3>
    <p class="text-sm text-dock-muted">{{ concept.desc }}</p>
    <ul
      v-if="concept.details && concept.details.length > 0"
      class="mt-3 space-y-1"
    >
      <li
        v-for="(detail, i) in concept.details"
        :key="i"
        class="text-xs text-dock-dim flex items-start gap-2"
      >
        <span class="mt-1.5 w-1 h-1 rounded-full bg-dock-dim flex-shrink-0"></span>
        {{ detail }}
      </li>
    </ul>
  </div>
</template>
