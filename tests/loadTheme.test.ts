import { resolve } from 'path'

import { loadTheme } from '../src/core/loadTheme'

const fixturesPath = resolve(__dirname, 'fixtures')

describe('loadTheme', () => {
  test('should return theme with expected shape', async () => {
    const theme = await loadTheme(
      resolve(fixturesPath, 'simple/a.theme.json'),
      resolve(fixturesPath, 'simple'),
    )
    expect(theme).toEqual({ mappers: [], sources: [], whitepaper: {}, platforms: ['common'] })
  })

  test('should throw error when extendable theme not found', async () => {
    try {
      await loadTheme(
        resolve(fixturesPath, 'missing-extend/a.theme.json'),
        resolve(fixturesPath, 'missing-extend'),
      )
    } catch (error) {
      expect(error.message).toMatch('Cannot load theme: "./missing.theme.json".')
    }
  })

  test('should return theme with extended external theme with local', async () => {
    const theme = await loadTheme(
      resolve(fixturesPath, 'external-local-extend/src/a.theme.json'),
      resolve(fixturesPath, 'external-local-extend'),
    )
    expect(theme.sources).toHaveLength(2)
    expect(theme.sources[0][0]).toMatch(
      'external-local-extend/node_modules/module-a/src/a.tokens.yml',
    )
    expect(theme.sources[1][0]).toMatch(
      'external-local-extend/node_modules/module-a/src/b.tokens.yml',
    )
  })

  test('should return theme with extended external theme with global', async () => {
    const theme = await loadTheme(
      resolve(fixturesPath, 'external-global-extend/src/a.theme.json'),
      resolve(fixturesPath, 'external-global-extend'),
    )
    expect(theme.sources).toHaveLength(2)
    expect(theme.sources[0][0]).toMatch('external-global-extend/node_modules/module-a/a.tokens.yml')
    expect(theme.sources[1][0]).toMatch('external-global-extend/node_modules/module-b/b.tokens.yml')
  })

  test('should return theme without extended platforms', async () => {
    const theme = await loadTheme(
      resolve(fixturesPath, 'platforms-extend/src/b.theme.json'),
      resolve(fixturesPath, 'platforms-extend'),
    )
    expect(theme.platforms).toEqual(['desktop'])
  })
})
