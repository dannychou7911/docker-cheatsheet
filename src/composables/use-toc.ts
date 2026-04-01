import { ref, onMounted, onUnmounted } from 'vue'
import type { Section } from '@/data/types'

export function useToc(sections: Section[]) {
  const activeId = ref('')

  function updateActive() {
    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i].id)
      if (el) {
        const rect = el.getBoundingClientRect()
        if (rect.top <= 120) {
          activeId.value = sections[i].id
          return
        }
      }
    }
    activeId.value = sections.length > 0 ? sections[0].id : ''
  }

  onMounted(() => {
    window.addEventListener('scroll', updateActive, { passive: true })
    updateActive()
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', updateActive)
  })

  return { activeId, sections }
}
