<script setup lang="ts">
import { ref, onMounted, watch, nextTick } from 'vue'

const props = defineProps<{
  code: string
}>()

const container = ref<HTMLElement>()
const svgContent = ref('')
let mermaidReady: typeof import('mermaid')['default'] | null = null

async function getMermaid() {
  if (mermaidReady) return mermaidReady
  const { default: mermaid } = await import('mermaid')
  mermaid.initialize({
    startOnLoad: false,
    theme: 'dark',
    themeVariables: {
      darkMode: true,
      background: '#1E293B',
      primaryColor: '#334155',
      primaryTextColor: '#E2E8F0',
      primaryBorderColor: '#475569',
      lineColor: '#94A3B8',
      secondaryColor: '#1E3A5F',
      tertiaryColor: '#1E293B',
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: '13px',
      nodeBorder: '#60A5FA',
      mainBkg: '#334155',
      clusterBkg: '#1E293B',
      clusterBorder: '#475569',
      edgeLabelBackground: '#1E293B',
      nodeTextColor: '#E2E8F0',
    },
    gitGraph: {
      mainBranchName: 'main',
    },
  })
  mermaidReady = mermaid
  return mermaid
}

async function renderDiagram() {
  if (!container.value) return
  try {
    const mermaid = await getMermaid()
    const id = `mermaid-${Math.random().toString(36).slice(2, 9)}`
    const { svg } = await mermaid.render(id, props.code)
    svgContent.value = svg
  } catch {
    svgContent.value = `<pre class="text-dock-dim text-xs">${props.code}</pre>`
  }
}

onMounted(() => {
  renderDiagram()
})

watch(() => props.code, async () => {
  await nextTick()
  renderDiagram()
})
</script>

<template>
  <div
    ref="container"
    class="mermaid-diagram my-3 flex justify-center overflow-x-auto rounded-lg bg-dock-surface2/50 p-3"
    v-html="svgContent"
  />
</template>

<style scoped>
.mermaid-diagram :deep(svg) {
  max-width: 100%;
  height: auto;
}
</style>
