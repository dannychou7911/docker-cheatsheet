<script setup lang="ts">
import { useClipboard } from '@/composables/use-clipboard'

const props = defineProps<{
  text: string
}>()

const { copied, copy } = useClipboard()
</script>

<template>
  <button
    class="copy-btn"
    :class="{ copied }"
    :title="copied ? '已複製！' : '複製指令'"
    @click="copy(props.text)"
  >
    <svg v-if="!copied" xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
    <svg v-else xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-dock-green" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  </button>
</template>
