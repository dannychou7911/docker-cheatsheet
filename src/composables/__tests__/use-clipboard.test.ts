import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useClipboard } from '../use-clipboard'

describe('useClipboard', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should initialize with copied = false', () => {
    const { copied } = useClipboard()
    expect(copied.value).toBe(false)
  })

  it('should set copied to true after successful copy', async () => {
    const { copy, copied } = useClipboard()
    await copy('hello')
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('hello')
    expect(copied.value).toBe(true)
  })

  it('should reset copied to false after 1500ms', async () => {
    const { copy, copied } = useClipboard()
    await copy('hello')
    expect(copied.value).toBe(true)
    vi.advanceTimersByTime(1500)
    expect(copied.value).toBe(false)
  })

  it('should set copied to false on failure', async () => {
    vi.mocked(navigator.clipboard.writeText).mockRejectedValueOnce(new Error('fail'))
    const { copy, copied } = useClipboard()
    await copy('hello')
    expect(copied.value).toBe(false)
  })
})
