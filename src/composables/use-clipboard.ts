import { ref } from 'vue'

export function useClipboard(resetDelay = 1500) {
  const copied = ref(false)

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text)
      copied.value = true
      setTimeout(() => {
        copied.value = false
      }, resetDelay)
    } catch {
      copied.value = false
    }
  }

  return { copied, copy }
}
