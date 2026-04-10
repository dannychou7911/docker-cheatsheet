import { describe, it, expect } from 'vitest'
import { gitTopic } from '../git'
import type { Section } from '../types'

describe('git cheatsheet data', () => {
  it('should export a valid CheatsheetTopic', () => {
    expect(gitTopic).toBeDefined()
    expect(gitTopic.id).toBe('git')
    expect(gitTopic.title).toBeTruthy()
    expect(gitTopic.heroTitle).toBeTruthy()
    expect(gitTopic.heroDesc).toBeTruthy()
  })

  it('should have at least 5 sections', () => {
    expect(gitTopic.sections.length).toBeGreaterThanOrEqual(5)
  })

  it('every section should have a title and color', () => {
    for (const section of gitTopic.sections) {
      expect(section.title).toBeTruthy()
      expect(section.color).toBeTruthy()
    }
  })

  it('should have a rebase section', () => {
    const rebaseSection = gitTopic.sections.find(
      (s: Section) => s.id === 'rebase',
    )
    expect(rebaseSection).toBeDefined()
    expect(rebaseSection!.commands!.length).toBeGreaterThan(0)
  })

  it('should have a push section covering force push', () => {
    const pushSection = gitTopic.sections.find(
      (s: Section) => s.id === 'push-remote',
    )
    expect(pushSection).toBeDefined()
    const hasForcePush = pushSection!.commands!.some(
      (cmd) => cmd.cmd.includes('push') && cmd.desc.includes('force'),
    )
    expect(hasForcePush).toBe(true)
  })

  it('should have concept sections with concepts', () => {
    const conceptSections = gitTopic.sections.filter(
      (s: Section) => s.concepts && s.concepts.length > 0,
    )
    expect(conceptSections.length).toBeGreaterThan(0)
  })

  it('should have command sections with commands', () => {
    const cmdSections = gitTopic.sections.filter(
      (s: Section) => s.commands && s.commands.length > 0,
    )
    expect(cmdSections.length).toBeGreaterThan(0)
  })

  it('every command should have required fields', () => {
    for (const section of gitTopic.sections) {
      for (const cmd of section.commands ?? []) {
        expect(cmd.cmd).toBeTruthy()
        expect(cmd.syntax).toBeTruthy()
        expect(cmd.desc).toBeTruthy()
        expect(cmd.examples.length).toBeGreaterThan(0)
      }
    }
  })

  it('every concept should have required fields', () => {
    for (const section of gitTopic.sections) {
      for (const concept of section.concepts ?? []) {
        expect(concept.title).toBeTruthy()
        expect(concept.desc).toBeTruthy()
      }
    }
  })
})
