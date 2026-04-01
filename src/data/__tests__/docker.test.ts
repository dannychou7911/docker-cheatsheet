import { describe, it, expect } from 'vitest'
import { dockerTopic } from '../docker'
import type { Section } from '../types'

describe('Docker cheatsheet data', () => {
  it('should export a valid CheatsheetTopic', () => {
    expect(dockerTopic).toBeDefined()
    expect(dockerTopic.id).toBe('docker')
    expect(dockerTopic.title).toBeTruthy()
    expect(dockerTopic.heroTitle).toBeTruthy()
    expect(dockerTopic.heroDesc).toBeTruthy()
  })

  it('should have exactly 9 sections', () => {
    expect(dockerTopic.sections).toHaveLength(9)
  })

  it('should have the correct section IDs in order', () => {
    const expectedIds = [
      'basics',
      'container',
      'image',
      'volume',
      'network',
      'compose',
      'compose-yaml',
      'cleanup',
      'dockerfile',
    ]
    const actualIds = dockerTopic.sections.map((s: Section) => s.id)
    expect(actualIds).toEqual(expectedIds)
  })

  it('should have a total of 33 command cards', () => {
    const totalCommands = dockerTopic.sections.reduce(
      (sum: number, s: Section) => sum + (s.commands?.length ?? 0),
      0,
    )
    expect(totalCommands).toBe(33)
  })

  it('every section should have a title and color', () => {
    for (const section of dockerTopic.sections) {
      expect(section.title).toBeTruthy()
      expect(section.color).toBeTruthy()
    }
  })

  it('every command should have required fields', () => {
    for (const section of dockerTopic.sections) {
      for (const cmd of section.commands ?? []) {
        expect(cmd.cmd).toBeTruthy()
        expect(cmd.syntax).toBeTruthy()
        expect(cmd.desc).toBeTruthy()
        expect(cmd.examples.length).toBeGreaterThan(0)
      }
    }
  })

  it('should have correct command counts per section', () => {
    const expectedCounts: Record<string, number> = {
      basics: 3,
      container: 7,
      image: 5,
      volume: 2,
      network: 2,
      compose: 3,
      'compose-yaml': 8,
      cleanup: 2,
      dockerfile: 1,
    }
    for (const section of dockerTopic.sections) {
      expect(section.commands?.length ?? 0).toBe(expectedCounts[section.id])
    }
  })
})
