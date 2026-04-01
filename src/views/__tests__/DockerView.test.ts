import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DockerView from '../DockerView.vue'

describe('DockerView', () => {
  it('should render hero section', () => {
    const wrapper = mount(DockerView)
    expect(wrapper.text()).toContain('Docker Cheatsheet')
  })

  it('should render all 9 section blocks', () => {
    const wrapper = mount(DockerView)
    const sections = wrapper.findAll('.cmd-section')
    expect(sections).toHaveLength(9)
  })

  it('should render search input', () => {
    const wrapper = mount(DockerView)
    expect(wrapper.find('input[type="text"]').exists()).toBe(true)
  })

  it('should render sidebar with section links', () => {
    const wrapper = mount(DockerView)
    const tocLinks = wrapper.findAll('.toc-link')
    expect(tocLinks.length).toBeGreaterThanOrEqual(9)
  })
})
