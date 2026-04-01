import { describe, it, expect } from 'vitest'
import { useToc } from '../use-toc'
import type { Section } from '@/data/types'

const mockSections: Section[] = [
  { id: 'basics', title: '基礎指令', color: 'accent', commands: [] },
  { id: 'container', title: '容器管理', color: 'green', commands: [] },
]

describe('useToc', () => {
  it('should initialize with empty activeId', () => {
    const { activeId } = useToc(mockSections)
    expect(activeId.value).toBe('')
  })

  it('should expose section list for rendering', () => {
    const { sections } = useToc(mockSections)
    expect(sections).toHaveLength(2)
    expect(sections[0].id).toBe('basics')
  })
})
