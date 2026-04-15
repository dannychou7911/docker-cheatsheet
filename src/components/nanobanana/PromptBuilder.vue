<script setup lang="ts">
import { usePromptBuilder } from '@/composables/use-prompt-builder'
import { useClipboard } from '@/composables/use-clipboard'

const {
  commandDefs,
  selectedCommandId,
  selectedCommand,
  paramValues,
  selectCommand,
  setParam,
  toggleMultiSelect,
  resetParams,
  generatedCommand,
} = usePromptBuilder()

const { copied, copy } = useClipboard()

function handleCopy() {
  copy(generatedCommand.value)
}

function getParamValue(name: string) {
  return paramValues.value[name]
}

function isMultiSelected(name: string, value: string) {
  const arr = paramValues.value[name] as string[] | undefined
  return arr?.includes(value) ?? false
}
</script>

<template>
  <div class="space-y-6">
    <!-- Command selector -->
    <div>
      <label class="block text-sm font-medium text-dock-muted mb-3">選擇指令</label>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="cmd in commandDefs"
          :key="cmd.id"
          class="px-3 py-1.5 rounded-lg text-sm font-mono transition-colors"
          :class="selectedCommandId === cmd.id
            ? 'bg-dock-accent text-white'
            : 'bg-dock-surface2 text-dock-muted hover:text-dock-text hover:bg-dock-surface2/80'"
          @click="selectCommand(cmd.id)"
        >
          {{ cmd.name }}
        </button>
      </div>
      <p class="mt-2 text-xs text-dock-dim">{{ selectedCommand.desc }}</p>
    </div>

    <!-- Params form -->
    <div class="space-y-4">
      <div v-for="param in selectedCommand.params" :key="param.name">
        <!-- Text input -->
        <template v-if="param.type === 'text'">
          <label class="block text-sm font-medium text-dock-muted mb-1">
            {{ param.label }}
            <span v-if="param.required" class="text-dock-red">*</span>
          </label>
          <input
            :value="getParamValue(param.name) as string ?? ''"
            :placeholder="param.placeholder"
            class="w-full bg-dock-bg border border-dock-surface2 rounded-lg px-3 py-2 text-sm text-dock-text placeholder:text-dock-dim focus:outline-none focus:border-dock-accent transition-colors"
            @input="setParam(param.name, ($event.target as HTMLInputElement).value)"
          >
        </template>

        <!-- Number input -->
        <template v-else-if="param.type === 'number'">
          <label class="block text-sm font-medium text-dock-muted mb-1">
            {{ param.label }}
          </label>
          <input
            type="number"
            :value="getParamValue(param.name) as number ?? ''"
            :placeholder="param.placeholder ?? String(param.default ?? '')"
            :min="param.min"
            :max="param.max"
            class="w-32 bg-dock-bg border border-dock-surface2 rounded-lg px-3 py-2 text-sm text-dock-text placeholder:text-dock-dim focus:outline-none focus:border-dock-accent transition-colors"
            @input="setParam(param.name, Number(($event.target as HTMLInputElement).value))"
          >
        </template>

        <!-- Select -->
        <template v-else-if="param.type === 'select'">
          <label class="block text-sm font-medium text-dock-muted mb-1">
            {{ param.label }}
          </label>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="opt in param.options"
              :key="opt.value"
              class="px-2.5 py-1 rounded-md text-xs font-mono transition-colors"
              :class="(getParamValue(param.name) ?? param.options?.[0]?.value) === opt.value
                ? 'bg-dock-accent/20 text-dock-accent border border-dock-accent/40'
                : 'bg-dock-surface2 text-dock-dim hover:text-dock-muted border border-transparent'"
              @click="setParam(param.name, opt.value)"
            >
              {{ opt.label }}
            </button>
          </div>
        </template>

        <!-- Multi-select -->
        <template v-else-if="param.type === 'multi-select'">
          <label class="block text-sm font-medium text-dock-muted mb-1">
            {{ param.label }}
          </label>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="opt in param.options"
              :key="opt.value"
              class="px-2.5 py-1 rounded-md text-xs font-mono transition-colors"
              :class="isMultiSelected(param.name, opt.value)
                ? 'bg-dock-green/20 text-dock-green border border-dock-green/40'
                : 'bg-dock-surface2 text-dock-dim hover:text-dock-muted border border-transparent'"
              @click="toggleMultiSelect(param.name, opt.value)"
            >
              {{ opt.label }}
            </button>
          </div>
        </template>

        <!-- Boolean toggle -->
        <template v-else-if="param.type === 'boolean'">
          <label class="inline-flex items-center gap-2 cursor-pointer">
            <button
              class="w-9 h-5 rounded-full transition-colors relative"
              :class="getParamValue(param.name) ? 'bg-dock-accent' : 'bg-dock-surface2'"
              @click="setParam(param.name, !getParamValue(param.name))"
            >
              <span
                class="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform"
                :class="getParamValue(param.name) ? 'translate-x-4' : 'translate-x-0.5'"
              />
            </button>
            <span class="text-sm text-dock-muted">{{ param.label }}</span>
          </label>
        </template>
      </div>
    </div>

    <!-- Generated command preview -->
    <div class="bg-dock-bg border border-dock-surface2 rounded-xl p-4">
      <div class="flex items-center justify-between mb-2">
        <span class="text-xs font-medium text-dock-muted uppercase tracking-wider">指令預覽</span>
        <div class="flex gap-2">
          <button
            class="text-xs text-dock-dim hover:text-dock-muted transition-colors"
            @click="resetParams"
          >
            重置
          </button>
          <button
            class="px-3 py-1 rounded-md text-xs font-medium transition-colors"
            :class="copied
              ? 'bg-dock-green/20 text-dock-green'
              : 'bg-dock-accent/20 text-dock-accent hover:bg-dock-accent/30'"
            @click="handleCopy"
          >
            {{ copied ? '已複製!' : '複製' }}
          </button>
        </div>
      </div>
      <pre class="font-mono text-sm text-dock-yellow whitespace-pre-wrap break-all">{{ generatedCommand }}</pre>
    </div>
  </div>
</template>
