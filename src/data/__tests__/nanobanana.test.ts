import { describe, it, expect } from 'vitest'
import { nanobananaTopic } from '../nanobanana'
import type { Section } from '../types'

describe('Nano Banana cheatsheet data', () => {
  it('should export a valid CheatsheetTopic', () => {
    expect(nanobananaTopic).toBeDefined()
    expect(nanobananaTopic.id).toBe('nanobanana')
    expect(nanobananaTopic.title).toBeTruthy()
    expect(nanobananaTopic.heroTitle).toBeTruthy()
    expect(nanobananaTopic.heroDesc).toBeTruthy()
  })

  it('should have exactly 9 sections', () => {
    expect(nanobananaTopic.sections).toHaveLength(9)
  })

  it('should have the correct section IDs in order', () => {
    const expectedIds = [
      'model',
      'generate',
      'edit',
      'restore',
      'icon',
      'pattern',
      'story',
      'diagram',
      'nanobanana',
    ]
    const actualIds = nanobananaTopic.sections.map((s: Section) => s.id)
    expect(actualIds).toEqual(expectedIds)
  })

  it('every section should have a title and color', () => {
    for (const section of nanobananaTopic.sections) {
      expect(section.title).toBeTruthy()
      expect(section.color).toBeTruthy()
    }
  })

  it('every command should have required fields', () => {
    for (const section of nanobananaTopic.sections) {
      for (const cmd of section.commands ?? []) {
        expect(cmd.cmd).toBeTruthy()
        expect(cmd.syntax).toBeTruthy()
        expect(cmd.desc).toBeTruthy()
        expect(cmd.examples.length).toBeGreaterThan(0)
      }
    }
  })

  it('every concept should have required fields', () => {
    for (const section of nanobananaTopic.sections) {
      for (const concept of section.concepts ?? []) {
        expect(concept.title).toBeTruthy()
        expect(concept.desc).toBeTruthy()
      }
    }
  })

  it('/generate section should have style and variation concepts', () => {
    const generateSection = nanobananaTopic.sections.find(s => s.id === 'generate')
    expect(generateSection).toBeDefined()
    expect(generateSection!.commands).toBeDefined()
    expect(generateSection!.concepts).toBeDefined()
    expect(generateSection!.concepts!.length).toBeGreaterThanOrEqual(2)
  })
})
