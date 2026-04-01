<script setup lang="ts">
defineProps<{
  title: string
}>()

defineEmits<{
  toggleSidebar: []
}>()
</script>

<template>
  <div class="lg:hidden sticky top-14 z-40 bg-dock-bg/90 backdrop-blur border-b border-dock-surface2 px-4 py-2 flex items-center justify-between">
    <h1 class="text-sm font-semibold text-dock-text">{{ title }}</h1>
    <button
      class="p-2 rounded-lg text-dock-dim hover:text-dock-text hover:bg-dock-surface2 transition-colors"
      aria-label="開啟目錄"
      @click="$emit('toggleSidebar')"
    >
      <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </button>
  </div>
</template>
