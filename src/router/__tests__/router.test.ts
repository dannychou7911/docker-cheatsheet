import { describe, it, expect, beforeEach } from 'vitest'
import router from '../index'

describe('Router', () => {
  beforeEach(async () => {
    router.push('/')
    await router.isReady()
  })

  it('should navigate to HomeView on /', () => {
    expect(router.currentRoute.value.name).toBe('home')
  })

  it('should navigate to DockerView on /docker', async () => {
    await router.push('/docker')
    expect(router.currentRoute.value.name).toBe('docker')
  })

  it('should navigate to K9sView on /k9s', async () => {
    await router.push('/k9s')
    expect(router.currentRoute.value.name).toBe('k9s')
  })

  it('should redirect unknown routes to home', async () => {
    await router.push('/unknown-page')
    expect(router.currentRoute.value.path).toBe('/')
    expect(router.currentRoute.value.name).toBe('home')
  })
})
