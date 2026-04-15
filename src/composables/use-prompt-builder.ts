import { ref, computed } from 'vue'
import { commandDefs, type CommandDef } from '@/components/nanobanana/prompt-builder-types'

export function usePromptBuilder() {
  const selectedCommandId = ref(commandDefs[0].id)
  const paramValues = ref<Record<string, string | number | boolean | string[]>>({})

  const selectedCommand = computed<CommandDef>(
    () => commandDefs.find(c => c.id === selectedCommandId.value) ?? commandDefs[0],
  )

  function selectCommand(id: string) {
    selectedCommandId.value = id
    paramValues.value = {}
  }

  function setParam(name: string, value: string | number | boolean | string[]) {
    paramValues.value = { ...paramValues.value, [name]: value }
  }

  function toggleMultiSelect(name: string, value: string) {
    const current = (paramValues.value[name] as string[] | undefined) ?? []
    const next = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value]
    paramValues.value = { ...paramValues.value, [name]: next }
  }

  function resetParams() {
    paramValues.value = {}
  }

  const generatedCommand = computed<string>(() => {
    const cmd = selectedCommand.value
    const vals = paramValues.value
    const parts: string[] = [cmd.name]

    // file param (for /edit, /restore)
    const fileDef = cmd.params.find(p => p.name === 'file')
    if (fileDef) {
      const fileVal = vals.file as string | undefined
      parts.push(fileVal?.trim() || fileDef.placeholder || 'file.png')
    }

    // prompt param
    const promptDef = cmd.params.find(p => p.name === 'prompt')
    if (promptDef) {
      const promptVal = vals.prompt as string | undefined
      parts.push(`"${promptVal?.trim() || '...'}"`)
    }

    // optional params
    for (const param of cmd.params) {
      if (param.name === 'prompt' || param.name === 'file') continue

      const val = vals[param.name]
      if (val === undefined || val === '' || val === false) continue

      if (param.type === 'boolean' && val === true) {
        parts.push(param.name)
      } else if (param.type === 'multi-select') {
        const arr = val as string[]
        if (arr.length > 0) {
          parts.push(`${param.name}="${arr.join(',')}"`)
        }
      } else if (param.type === 'number') {
        const num = Number(val)
        if (!isNaN(num) && num !== param.default) {
          parts.push(`${param.name}=${num}`)
        }
      } else if (param.type === 'select') {
        const strVal = val as string
        // Skip if it's the default option (first option value usually matches default)
        const defaultOpt = param.options?.[0]?.value
        if (strVal && strVal !== defaultOpt) {
          parts.push(`${param.name}="${strVal}"`)
        }
      } else if (param.type === 'text' && typeof val === 'string' && val.trim()) {
        parts.push(`${param.name}="${val.trim()}"`)
      }
    }

    return parts.join(' ')
  })

  return {
    commandDefs,
    selectedCommandId,
    selectedCommand,
    paramValues,
    selectCommand,
    setParam,
    toggleMultiSelect,
    resetParams,
    generatedCommand,
  }
}
