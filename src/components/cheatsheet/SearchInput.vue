<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const model = defineModel<string>({ required: true })
const inputRef = ref<HTMLInputElement | null>(null)

function handleKeydown(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault()
    inputRef.value?.focus()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<template>
  <div class="relative">
    <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dock-dim" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
    <input
      ref="inputRef"
      v-model="model"
      type="text"
      placeholder="搜尋指令… (Cmd+K)"
      class="w-full pl-10 pr-4 py-2.5 bg-dock-surface border border-dock-surface2 rounded-lg text-sm text-dock-text placeholder-dock-dim focus:outline-none focus:border-dock-accent/50 focus:ring-1 focus:ring-dock-accent/25 transition-colors"
    />
  </div>
</template>
