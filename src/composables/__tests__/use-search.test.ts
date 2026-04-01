import { describe, it, expect } from 'vitest'
import { useSearch } from '../use-search'
import type { Section } from '@/data/types'

const mockSections: Section[] = [
  {
    id: 'basics',
    title: '基礎指令',
    color: 'accent',
    commands: [
      {
        cmd: 'docker version',
        syntax: 'docker version',
        desc: '查看 Docker 版本',
        examples: [{ type: 'command', text: 'docker version' }],
      },
      {
        cmd: 'docker info',
        syntax: 'docker info',
        desc: '查看系統資訊',
        examples: [{ type: 'command', text: 'docker info' }],
      },
    ],
  },
  {
    id: 'container',
    title: '容器管理',
    color: 'green',
    commands: [
      {
        cmd: 'docker run',
        syntax: 'docker run [選項] <映像檔>',
        desc: '建立並啟動容器',
        examples: [{ type: 'command', text: 'docker run nginx' }],
      },
    ],
  },
]

describe('useSearch', () => {
  it('should return all sections when query is empty', () => {
    const { filteredSections, query } = useSearch(mockSections)
    query.value = ''
    expect(filteredSections.value).toHaveLength(2)
  })

  it('should filter commands by cmd field', () => {
    const { filteredSections, query } = useSearch(mockSections)
    query.value = 'version'
    expect(filteredSections.value).toHaveLength(1)
    expect(filteredSections.value[0].id).toBe('basics')
    expect(filteredSections.value[0].commands).toHaveLength(1)
    expect(filteredSections.value[0].commands![0].cmd).toBe('docker version')
  })

  it('should filter commands by desc field', () => {
    const { filteredSections, query } = useSearch(mockSections)
    query.value = '系統資訊'
    expect(filteredSections.value).toHaveLength(1)
    expect(filteredSections.value[0].commands![0].cmd).toBe('docker info')
  })

  it('should be case-insensitive', () => {
    const { filteredSections, query } = useSearch(mockSections)
    query.value = 'DOCKER RUN'
    expect(filteredSections.value).toHaveLength(1)
    expect(filteredSections.value[0].commands![0].cmd).toBe('docker run')
  })

  it('should hide sections with no matching commands', () => {
    const { filteredSections, query } = useSearch(mockSections)
    query.value = 'run'
    expect(filteredSections.value).toHaveLength(1)
    expect(filteredSections.value[0].id).toBe('container')
  })

  it('should return empty when nothing matches', () => {
    const { filteredSections, query } = useSearch(mockSections)
    query.value = 'zzz-no-match'
    expect(filteredSections.value).toHaveLength(0)
  })
})
