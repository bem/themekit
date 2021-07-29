import type { Transform } from '../types'

interface Context {
  /**
   * A map with name aliases.
   */
  aliases?: Record<string, string>
}

/**
 * Transform which change name with alias.
 */
export const transformNameToAlias: Transform<Context> = {
  name: 'name/alias',
  type: 'name',
  transformer: ({ token, context }) => {
    if (context?.aliases) {
      return context.aliases[token.name] || token.name
    }

    return token.name
  },
}
