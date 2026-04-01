import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CommandCard from '../CommandCard.vue'
import type { Command, SectionColor } from '@/data/types'

const mockCommand: Command = {
  cmd: 'docker run',
  syntax: 'docker run [選項] <映像檔>',
  desc: '從映像檔建立一個新的容器並啟動它。',
  examples: [
    { type: 'comment', text: '# 基本啟動' },
    { type: 'command', text: 'docker run nginx' },
  ],
  flags: [
    { flag: '-d', desc: '背景執行' },
    { flag: '-p', desc: '主機Port:容器Port' },
  ],
  copyText: 'docker run -d --name my-web -p 8080:80 nginx',
}

const mockCommandNoFlags: Command = {
  cmd: 'docker version',
  syntax: 'docker version',
  desc: '查看 Docker 版本。',
  examples: [
    { type: 'command', text: 'docker version' },
  ],
}

describe('CommandCard', () => {
  it('should render command name (syntax)', () => {
    const wrapper = mount(CommandCard, {
      props: { command: mockCommand, color: 'green' as SectionColor },
    })
    expect(wrapper.text()).toContain('docker run [選項] <映像檔>')
  })

  it('should render description', () => {
    const wrapper = mount(CommandCard, {
      props: { command: mockCommand, color: 'green' as SectionColor },
    })
    expect(wrapper.text()).toContain('從映像檔建立一個新的容器並啟動它。')
  })

  it('should render examples', () => {
    const wrapper = mount(CommandCard, {
      props: { command: mockCommand, color: 'green' as SectionColor },
    })
    expect(wrapper.text()).toContain('# 基本啟動')
    expect(wrapper.text()).toContain('docker run nginx')
  })

  it('should render flags when provided', () => {
    const wrapper = mount(CommandCard, {
      props: { command: mockCommand, color: 'green' as SectionColor },
    })
    expect(wrapper.text()).toContain('-d')
    expect(wrapper.text()).toContain('背景執行')
  })

  it('should not render flags section when no flags', () => {
    const wrapper = mount(CommandCard, {
      props: { command: mockCommandNoFlags, color: 'accent' as SectionColor },
    })
    expect(wrapper.text()).not.toContain('背景執行')
  })

  it('should render copy button when copyText exists', () => {
    const wrapper = mount(CommandCard, {
      props: { command: mockCommand, color: 'green' as SectionColor },
    })
    expect(wrapper.find('button').exists()).toBe(true)
  })

  it('should not render copy button when no copyText', () => {
    const wrapper = mount(CommandCard, {
      props: { command: mockCommandNoFlags, color: 'accent' as SectionColor },
    })
    expect(wrapper.find('button').exists()).toBe(false)
  })
})
