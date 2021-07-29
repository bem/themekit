import type { Token } from '../../types'
import { transformNameToAlias } from '../name-alias-transform'

describe('name-alias-transform', () => {
  test('should change name from mappers', () => {
    const result = transformNameToAlias.transformer({
      token: { name: 'original' } as Token,
      context: {
        aliases: {
          original: 'changed',
        },
      },
    })
    expect(result).toBe('changed')
  })

  test('should not change name if not found in mappers', () => {
    const result = transformNameToAlias.transformer({
      token: { name: 'original' } as Token,
      context: {
        aliases: {
          another: 'changed',
        },
      },
    })
    expect(result).toBe('original')
  })

  test('should not change name if mappers not found', () => {
    const result = transformNameToAlias.transformer({
      token: { name: 'original' } as Token,
      context: {},
    })
    expect(result).toBe('original')
  })
})
