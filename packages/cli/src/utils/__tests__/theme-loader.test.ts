import { resolve } from 'path'

import { loadThemeFiles } from '../theme-loader'
import { NotFoundTheme, SourcesNotDefined } from '../errors'

const fixturesPath = resolve(__dirname, 'fixtures/theme-loader')

describe('theme-loader', () => {
  test('should return theme with expected shape', () => {
    const theme = loadThemeFiles(
      resolve(fixturesPath, 'simple/theme.json'),
      resolve(fixturesPath, 'simple'),
    )
    expect(theme).toEqual({ exclude: [], aliases: [], sources: [] })
  })

  test('should throw error when extendable theme not found', () => {
    try {
      loadThemeFiles(
        resolve(fixturesPath, 'missing-extend/theme.json'),
        resolve(fixturesPath, 'missing-extend'),
      )
    } catch (error) {
      expect(error instanceof NotFoundTheme).toBeTruthy()
    }
  })

  test('should throw error when sources not defined', () => {
    try {
      loadThemeFiles(
        resolve(fixturesPath, 'missing-sources/theme.json'),
        resolve(fixturesPath, 'missing-sources'),
      )
    } catch (error) {
      expect(error instanceof SourcesNotDefined).toBeTruthy()
    }
  })

  test('should return theme with one extended external theme', () => {
    const theme = loadThemeFiles(
      resolve(fixturesPath, 'extended-external/a.theme.json'),
      resolve(fixturesPath, 'extended-external'),
    )
    expect(theme.sources[0]).toMatch('node_modules/module-a/a.tokens.yml')
  })

  test('should return theme with two extended external theme', () => {
    const theme = loadThemeFiles(
      resolve(fixturesPath, 'extended-external/b.theme.json'),
      resolve(fixturesPath, 'extended-external'),
    )
    expect(theme.sources[0]).toMatch('node_modules/module-a/a.tokens.yml')
    expect(theme.sources[1]).toMatch('node_modules/module-b/b.tokens.yml')
  })

  test('should return theme with one extended internal theme', () => {
    const theme = loadThemeFiles(
      resolve(fixturesPath, 'extended-internal/a.theme.json'),
      resolve(fixturesPath, 'extended-internal'),
    )
    expect(theme.sources[0]).toMatch('b.tokens.yml')
    expect(theme.sources[1]).toMatch('a.tokens.yml')
  })
})
