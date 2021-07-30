import { resolve } from 'path'

import { loadConfig } from '../config-loader'
import { NotFoundConfig } from '../errors'

describe('config-loader', () => {
  test('should load json config', () => {
    const config = loadConfig(resolve(__dirname, './fixtures/config-loader/config.json'))
    expect(config).toBeDefined()
  })

  test('should load yaml config', () => {
    const config = loadConfig(resolve(__dirname, './fixtures/config-loader/config.yaml'))
    expect(config).toBeDefined()
  })

  test('should load js config', () => {
    const config = loadConfig(resolve(__dirname, './fixtures/config-loader/config.js'))
    expect(config).toBeDefined()
  })

  test('should throw error when config not found', () => {
    try {
      loadConfig(resolve('./fixtures/config-loader/bad-config.json'))
    } catch (error) {
      expect(error instanceof NotFoundConfig).toBeTruthy()
    }
  })
})
