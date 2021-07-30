import { formatToCssVariables } from '../css-variables-format'
import { tokens } from './fixtures/simple'

describe('css-variables-format', () => {
  test('should return content with css variables', () => {
    const result = formatToCssVariables.formatter({ tokens })
    expect(result).toMatchInlineSnapshot(`
      ":root {
        --token-1: value-2 value-3;
        --token-2: value-2;
        --token-3: value-3;
      }
      "
    `)
  })

  test('should return content with css variables (custom selector)', () => {
    const result = formatToCssVariables.formatter({
      tokens,
      options: { selector: '.tokens' },
    })
    expect(result).toMatchInlineSnapshot(`
      ".tokens {
        --token-1: value-2 value-3;
        --token-2: value-2;
        --token-3: value-3;
      }
      "
    `)
  })

  test('should return content with css variables (custom selector placeholder)', () => {
    const result = formatToCssVariables.formatter({
      tokens,
      options: { selector: '.tokens_[entry]' },
      context: { entry: 'default' },
    })
    expect(result).toMatchInlineSnapshot(`
      ".tokens_default {
        --token-1: value-2 value-3;
        --token-2: value-2;
        --token-3: value-3;
      }
      "
    `)
  })

  test('should return content with css variables (use aliases)', () => {
    const result = formatToCssVariables.formatter({
      tokens,
      options: { useAliasVariables: true },
    })
    expect(result).toMatchInlineSnapshot(`
      ":root {
        --token-1: var(--token-2) var(--token-3);
        --token-2: value-2;
        --token-3: value-3;
      }
      "
    `)
  })

  test('should return content with css variables (with comments)', () => {
    const result = formatToCssVariables.formatter({
      tokens,
      options: { useComments: true },
    })
    expect(result).toMatchInlineSnapshot(`
      ":root {
        --token-1: value-2 value-3; /* comment */
        --token-2: value-2;
        --token-3: value-3;
      }
      "
    `)
  })
})
