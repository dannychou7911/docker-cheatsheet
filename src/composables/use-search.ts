import { ref, computed } from 'vue'
import type { Section } from '@/data/types'

export function useSearch(sections: Section[]) {
  const query = ref('')

  const filteredSections = computed(() => {
    const q = query.value.trim().toLowerCase()
    if (!q) return sections

    return sections
      .map((section) => {
        const matchedCommands = (section.commands ?? []).filter((cmd) => {
          return (
            cmd.cmd.toLowerCase().includes(q) ||
            cmd.syntax.toLowerCase().includes(q) ||
            cmd.desc.toLowerCase().includes(q) ||
            cmd.examples.some((ex) => ex.text.toLowerCase().includes(q))
          )
        })

        const matchedConcepts = (section.concepts ?? []).filter((c) => {
          return (
            c.title.toLowerCase().includes(q) ||
            c.desc.toLowerCase().includes(q) ||
            (c.details ?? []).some((d) => d.toLowerCase().includes(q))
          )
        })

        if (matchedCommands.length === 0 && matchedConcepts.length === 0) {
          return null
        }

        return {
          ...section,
          commands: matchedCommands.length > 0 ? matchedCommands : undefined,
          concepts: matchedConcepts.length > 0 ? matchedConcepts : undefined,
        }
      })
      .filter((s) => s !== null) as Section[]
  })

  return { query, filteredSections }
}
