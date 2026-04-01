import { describe, it, expect } from 'vitest'
import { k9sTopic } from '../k9s'
import type { Section } from '../types'

describe('k9s cheatsheet data', () => {
  it('should export a valid CheatsheetTopic', () => {
    expect(k9sTopic).toBeDefined()
    expect(k9sTopic.id).toBe('k9s')
    expect(k9sTopic.title).toBeTruthy()
    expect(k9sTopic.heroTitle).toBeTruthy()
    expect(k9sTopic.heroDesc).toBeTruthy()
  })

  it('should have at least 4 sections', () => {
    expect(k9sTopic.sections.length).toBeGreaterThanOrEqual(4)
  })

  it('every section should have a title and color', () => {
    for (const section of k9sTopic.sections) {
      expect(section.title).toBeTruthy()
      expect(section.color).toBeTruthy()
    }
  })

  it('should have concept sections with concepts', () => {
    const conceptSections = k9sTopic.sections.filter(
      (s: Section) => s.concepts && s.concepts.length > 0,
    )
    expect(conceptSections.length).toBeGreaterThan(0)
  })

  it('should have command sections with commands', () => {
    const cmdSections = k9sTopic.sections.filter(
      (s: Section) => s.commands && s.commands.length > 0,
    )
    expect(cmdSections.length).toBeGreaterThan(0)
  })

  it('every command should have required fields', () => {
    for (const section of k9sTopic.sections) {
      for (const cmd of section.commands ?? []) {
        expect(cmd.cmd).toBeTruthy()
        expect(cmd.syntax).toBeTruthy()
        expect(cmd.desc).toBeTruthy()
        expect(cmd.examples.length).toBeGreaterThan(0)
      }
    }
  })

  it('every concept should have required fields', () => {
    for (const section of k9sTopic.sections) {
      for (const concept of section.concepts ?? []) {
        expect(concept.title).toBeTruthy()
        expect(concept.desc).toBeTruthy()
      }
    }
  })
})
