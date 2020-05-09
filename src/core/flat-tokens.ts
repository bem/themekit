import { withPrefix } from './utils'
import { Shape, FlattenToken, Token, TokensMap, TokenType } from './types'

function getTokenType(value: string | number): TokenType {
  // TODO: Order is necessary, cuz color maybe has percent.
  if (value.toString().match(/#|rgb|hsl/) !== null) {
    return 'color'
  }
  if (value.toString().match(/px|%|em|rem/) !== null) {
    return 'size'
  }
  return 'unknown'
}

function isTokensMap(token: TokensMap | Token): token is TokensMap {
  return token.value === undefined
}

/**
 * Returns flatten shape with tokens.
 *
 * @param tokens Map with tokens.
 */
export function flatTokens(tokens: TokensMap, prefix?: string): Shape<FlattenToken> {
  const result: Shape<FlattenToken> = {}
  for (const key in tokens) {
    const computedKey = withPrefix(key, prefix)
    const token = tokens[key]
    // FIXME: Move getTokenType to another fn.
    if (typeof token === 'string' || typeof token === 'number') {
      result[computedKey] = {
        value: token,
        type: getTokenType(token),
        name: computedKey,
      }
    } else if (isTokensMap(token)) {
      Object.assign(result, flatTokens(token, computedKey))
    } else {
      result[computedKey] = {
        ...token,
        name: computedKey,
      }
    }
  }
  return result
}
