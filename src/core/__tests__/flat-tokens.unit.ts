import { flatTokens } from '../flat-tokens'

describe('flatTokens', () => {
  test('should return flatten object with tokens', () => {
    const actual = flatTokens({
      nested: {
        path: {
          token: '10px',
        },
      },
      single_token: {
        value: '#fff',
        type: 'color',
      },
    })
    const expected = {
      nested_path_token: {
        name: 'nested_path_token',
        value: '10px',
        type: 'size',
      },
      single_token: {
        name: 'single_token',
        value: '#fff',
        type: 'color',
      },
    }
    expect(actual).toStrictEqual(expected)
  })
})
