import { resolve } from 'path'

import { loadAliases } from '../aliases-loader'

describe('aliases-loader', () => {
  test('should load tokens aliases', () => {
    const aliases = loadAliases([resolve(__dirname, './fixtures/aliases-loader/*.yml')])
    expect(aliases).toEqual({
      'original-token-name-1': 'mapped-token-name-1',
      'original-token-name-2': 'mapped-token-name-2',
    })
  })
})
