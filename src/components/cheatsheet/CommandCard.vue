<script setup lang="ts">
import type { Command, SectionColor } from '@/data/types'
import CopyButton from './CopyButton.vue'

defineProps<{
  command: Command
  color: SectionColor
}>()

const syntaxColorMap: Record<SectionColor, string> = {
  accent: 'text-dock-accent',
  green: 'text-dock-green',
  purple: 'text-dock-purple',
  yellow: 'text-dock-yellow',
  orange: 'text-dock-orange',
  red: 'text-dock-red',
  dim: 'text-dock-dim',
}

const borderColorMap: Record<SectionColor, string> = {
  accent: 'hover:border-dock-accent/30',
  green: 'hover:border-dock-green/30',
  purple: 'hover:border-dock-purple/30',
  yellow: 'hover:border-dock-yellow/30',
  orange: 'hover:border-dock-orange/30',
  red: 'hover:border-dock-red/30',
  dim: 'hover:border-dock-dim/30',
}
</script>

<template>
  <div
    class="cmd-card group bg-dock-surface border border-dock-surface2 rounded-xl p-4 transition-colors duration-200"
    :class="borderColorMap[color]"
  >
    <div class="flex items-start justify-between gap-3">
      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 mb-1.5">
          <code
            class="font-mono text-sm font-medium"
            :class="syntaxColorMap[color]"
          >{{ command.syntax }}</code>
        </div>
        <p class="text-sm text-dock-muted" :class="{ 'mb-3': command.examples.length > 0 }">
          {{ command.desc }}
        </p>
        <div
          v-if="command.examples.length > 0"
          class="bg-dock-bg rounded-lg p-3 font-mono text-xs space-y-1.5 overflow-x-auto"
        >
          <div
            v-for="(line, i) in command.examples"
            :key="i"
            :class="{ 'pt-1': line.type === 'comment' && i > 0 }"
          >
            <span v-if="line.type === 'comment'" class="text-dock-dim">{{ line.text }}</span>
            <span v-else class="text-dock-yellow">{{ line.text }}</span>
          </div>
        </div>
        <div
          v-if="command.flags && command.flags.length > 0"
          class="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-dock-dim"
        >
          <span v-for="flag in command.flags" :key="flag.flag">
            <code class="text-dock-accent">{{ flag.flag }}</code> {{ flag.desc }}
          </span>
        </div>
      </div>
      <CopyButton v-if="command.copyText" :text="command.copyText" />
    </div>
  </div>
</template>
