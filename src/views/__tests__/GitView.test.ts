import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import GitView from '../GitView.vue'

describe('GitView', () => {
  it('should render hero section', () => {
    const wrapper = mount(GitView)
    expect(wrapper.text()).toContain('Git Cheatsheet')
  })

  it('should render concept cards in core concepts section', () => {
    const wrapper = mount(GitView)
    expect(wrapper.text()).toContain('Git 的三個區域')
    expect(wrapper.text()).toContain('Branch（分支）')
    expect(wrapper.text()).toContain('Remote（遠端）')
  })

  it('should render command sections', () => {
    const wrapper = mount(GitView)
    expect(wrapper.text()).toContain('基本常用指令')
    expect(wrapper.text()).toContain('Rebase 變基')
    expect(wrapper.text()).toContain('推送到遠端與 Force Push')
  })

  it('should render search input', () => {
    const wrapper = mount(GitView)
    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
  })
})
