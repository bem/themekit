import { resolve } from 'path'

import { loadSources } from '../sources-loader'

const fixturesPath = resolve(__dirname, 'fixtures/sources-loader')

describe('source-loader', () => {
  test('should return loaded sources', () => {
    const sources = loadSources([resolve(fixturesPath, 'simple/*.tokens.yml')])
    expect(sources).toEqual([
      { 'a-token': { value: 'value-a' } },
      { 'b-token': { value: 'value-b' } },
    ])
  })

  test('should return loaded sources with correct order', () => {
    const sources = loadSources([
      resolve(fixturesPath, 'order/*.tokens.yml'),
      resolve(fixturesPath, 'order/a-desktop.tokens.yml'),
    ])
    expect(sources).toEqual([
      { 'a-token': { value: 'value-a' } },
      { 'b-token': { value: 'value-b' } },
    ])
  })

  test('should return loaded sources without excluded', () => {
    const sources = loadSources(
      [resolve(fixturesPath, 'exclude/*.tokens.yml')],
      [resolve(fixturesPath, 'exclude/b.tokens.yml')],
    )
    expect(sources).toEqual([{ 'a-token': { value: 'value-a' } }])
  })
})
