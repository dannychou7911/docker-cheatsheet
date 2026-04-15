import { describe, it, expect } from 'vitest'
import { usePromptBuilder } from '../use-prompt-builder'

describe('usePromptBuilder', () => {
  it('should initialize with the first command selected', () => {
    const { selectedCommand } = usePromptBuilder()
    expect(selectedCommand.value.id).toBe('generate')
  })

  it('should switch commands and reset params', () => {
    const { selectCommand, selectedCommand, paramValues } = usePromptBuilder()
    selectCommand('edit')
    expect(selectedCommand.value.id).toBe('edit')
    expect(paramValues.value).toEqual({})
  })

  it('should generate basic /generate command with prompt only', () => {
    const { setParam, generatedCommand } = usePromptBuilder()
    setParam('prompt', 'a cat in space')
    expect(generatedCommand.value).toBe('/generate "a cat in space"')
  })

  it('should include --count when different from default', () => {
    const { setParam, generatedCommand } = usePromptBuilder()
    setParam('prompt', 'mountain')
    setParam('--count', 3)
    expect(generatedCommand.value).toContain('--count=3')
  })

  it('should include --styles as comma-separated list', () => {
    const { setParam, toggleMultiSelect, generatedCommand } = usePromptBuilder()
    setParam('prompt', 'landscape')
    toggleMultiSelect('--styles', 'watercolor')
    toggleMultiSelect('--styles', 'anime')
    expect(generatedCommand.value).toContain('--styles="watercolor,anime"')
  })

  it('should toggle multi-select values on and off', () => {
    const { toggleMultiSelect, paramValues } = usePromptBuilder()
    toggleMultiSelect('--styles', 'watercolor')
    expect(paramValues.value['--styles']).toEqual(['watercolor'])
    toggleMultiSelect('--styles', 'watercolor')
    expect(paramValues.value['--styles']).toEqual([])
  })

  it('should include --preview flag', () => {
    const { setParam, generatedCommand } = usePromptBuilder()
    setParam('prompt', 'test')
    setParam('--preview', true)
    expect(generatedCommand.value).toContain('--preview')
  })

  it('should generate /edit command with file and prompt', () => {
    const { selectCommand, setParam, generatedCommand } = usePromptBuilder()
    selectCommand('edit')
    setParam('file', 'photo.png')
    setParam('prompt', 'add sunglasses')
    expect(generatedCommand.value).toBe('/edit photo.png "add sunglasses"')
  })

  it('should generate /icon command with options', () => {
    const { selectCommand, setParam, toggleMultiSelect, generatedCommand } = usePromptBuilder()
    selectCommand('icon')
    setParam('prompt', 'app logo')
    toggleMultiSelect('--sizes', '64')
    toggleMultiSelect('--sizes', '128')
    expect(generatedCommand.value).toContain('--sizes="64,128"')
  })

  it('should not include select params with default value', () => {
    const { setParam, generatedCommand } = usePromptBuilder()
    setParam('prompt', 'test')
    setParam('--format', 'separate') // default value
    expect(generatedCommand.value).not.toContain('--format')
  })

  it('should reset params', () => {
    const { setParam, resetParams, paramValues } = usePromptBuilder()
    setParam('prompt', 'test')
    setParam('--count', 5)
    resetParams()
    expect(paramValues.value).toEqual({})
  })
})
