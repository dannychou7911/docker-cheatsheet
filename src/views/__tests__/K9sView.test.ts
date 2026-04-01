import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import K9sView from '../K9sView.vue'

describe('K9sView', () => {
  it('should render hero section', () => {
    const wrapper = mount(K9sView)
    expect(wrapper.text()).toContain('k9s Cheatsheet')
  })

  it('should render concept cards in K8s concepts section', () => {
    const wrapper = mount(K9sView)
    expect(wrapper.text()).toContain('Pod')
    expect(wrapper.text()).toContain('Deployment')
    expect(wrapper.text()).toContain('Service')
  })

  it('should render command sections', () => {
    const wrapper = mount(K9sView)
    expect(wrapper.text()).toContain('k9s 基本操作')
    expect(wrapper.text()).toContain('k9s 導航快捷鍵')
  })

  it('should render search input', () => {
    const wrapper = mount(K9sView)
    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
  })
})
