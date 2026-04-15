import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import NanoBananaView from '../NanoBananaView.vue'

describe('NanoBananaView', () => {
  it('should render hero section', () => {
    const wrapper = mount(NanoBananaView)
    expect(wrapper.text()).toContain('Nano Banana Cheatsheet')
  })

  it('should render all 9 section blocks on cheatsheet tab', () => {
    const wrapper = mount(NanoBananaView)
    const sections = wrapper.findAll('.cmd-section')
    expect(sections).toHaveLength(9)
  })

  it('should render cheatsheet and builder tab buttons', () => {
    const wrapper = mount(NanoBananaView)
    expect(wrapper.text()).toContain('Cheatsheet')
    expect(wrapper.text()).toContain('指令產生器')
  })

  it('should switch to prompt builder tab when clicked', async () => {
    const wrapper = mount(NanoBananaView)
    const buttons = wrapper.findAll('button')
    const builderBtn = buttons.find(b => b.text() === '指令產生器')
    expect(builderBtn).toBeDefined()
    await builderBtn!.trigger('click')
    // Builder tab should render command selector
    expect(wrapper.text()).toContain('選擇指令')
    expect(wrapper.text()).toContain('指令預覽')
  })
})
