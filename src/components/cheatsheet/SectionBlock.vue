<script setup lang="ts">
import type { Section, SectionColor } from '@/data/types'
import CommandCard from './CommandCard.vue'
import ConceptCard from './ConceptCard.vue'

defineProps<{
  section: Section
}>()

const dotColorMap: Record<SectionColor, string> = {
  accent: 'bg-dock-accent',
  green: 'bg-dock-green',
  purple: 'bg-dock-purple',
  yellow: 'bg-dock-yellow',
  orange: 'bg-dock-orange',
  red: 'bg-dock-red',
  dim: 'bg-dock-dim',
}
</script>

<template>
  <section :id="section.id" class="cmd-section mb-12 scroll-mt-20 lg:scroll-mt-8">
    <div class="flex items-center gap-3 mb-6">
      <span class="w-2 h-2 rounded-full" :class="dotColorMap[section.color]"></span>
      <h2 class="text-xl font-bold">{{ section.title }}</h2>
    </div>
    <div v-if="section.concepts" class="grid gap-3 sm:grid-cols-2">
      <ConceptCard
        v-for="concept in section.concepts"
        :key="concept.title"
        :concept="concept"
        :color="section.color"
      />
    </div>
    <div v-if="section.commands" class="space-y-3" :class="{ 'mt-6': section.concepts }">
      <CommandCard
        v-for="cmd in section.commands"
        :key="cmd.cmd"
        :command="cmd"
        :color="section.color"
      />
    </div>
  </section>
</template>
