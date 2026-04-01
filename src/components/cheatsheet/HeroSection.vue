<script setup lang="ts">
defineProps<{
  title: string
  desc: string
}>()
</script>

<template>
  <section class="mb-12">
    <div class="bg-gradient-to-br from-dock-surface to-dock-bg border border-dock-surface2 rounded-2xl p-6 sm:p-8">
      <div>
        <h2 class="text-2xl sm:text-3xl font-bold mb-2">{{ title }}</h2>
        <p class="text-dock-muted text-sm sm:text-base leading-relaxed max-w-2xl" v-html="desc"></p>
        <div class="flex flex-wrap gap-2 mt-4">
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-dock-accent/10 text-dock-accent text-xs font-medium rounded-md">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            點擊複製指令
          </span>
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 bg-dock-green/10 text-dock-green text-xs font-medium rounded-md">
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            Cmd+K 快速搜尋
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
