import type { Format, Token } from '../types'

interface CssVariablesFormatOptions {
  /**
   * Custom css selector.
   *
   * @default ':root'
   */
  selector?: string
  /**
   * Use css-variables for aliases.
   *
   * @example
   * :root {
   *   --token-1: var(--token-2);
   *   --token-2: #fff;
   * }
   */
  useAliasVariables?: boolean
  /**
   * Enable comments.
   */
  useComments?: boolean
}

interface CssVariablesFormatContext {
  entry: string
}

/**
 * Format which convert tokens to css variables.
 */
export const formatToCssVariables: Format<CssVariablesFormatOptions, CssVariablesFormatContext> = {
  name: 'css/variables',
  formatter: ({ tokens, options = {}, context }) => {
    const selector = (options.selector ?? ':root').replace(/\[entry\]/g, context?.entry ?? '')

    return `${selector} {\n${variablesWithPrefix(tokens, options)}\n}\n`
  },
}

function variablesWithPrefix(tokens: Token[], options: CssVariablesFormatOptions): string {
  const { useAliasVariables, useComments } = options

  const tokenToString = (token: Token) => {
    // Don't mutate `token.value` because it can side effect other code.
    let value = token.value

    if (useAliasVariables && token.refs.length > 0) {
      for (const ref of token.refs) {
        value = String(value).replace(String(ref.value), `var(--${ref.name})`)
      }
    }

    const nextProp = [`  --${token.name}: ${value};`]

    if (useComments && token.comment) {
      nextProp.push(` /* ${token.comment} */`)
    }

    return nextProp.join('')
  }

  return tokens.map(tokenToString).filter(Boolean).join('\n')
}
