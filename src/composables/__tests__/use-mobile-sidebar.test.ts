import { describe, it, expect } from 'vitest'
import { useMobileSidebar } from '../use-mobile-sidebar'

describe('useMobileSidebar', () => {
  it('should initialize as closed', () => {
    const { isOpen } = useMobileSidebar()
    expect(isOpen.value).toBe(false)
  })

  it('should open sidebar', () => {
    const { isOpen, open } = useMobileSidebar()
    open()
    expect(isOpen.value).toBe(true)
  })

  it('should close sidebar', () => {
    const { isOpen, open, close } = useMobileSidebar()
    open()
    expect(isOpen.value).toBe(true)
    close()
    expect(isOpen.value).toBe(false)
  })

  it('should toggle sidebar', () => {
    const { isOpen, toggle } = useMobileSidebar()
    toggle()
    expect(isOpen.value).toBe(true)
    toggle()
    expect(isOpen.value).toBe(false)
  })
})
