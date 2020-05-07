import { withPrefix } from './with-prefix'
import { Shape, FlattenToken, Token, TokensMap } from './types'

function getTokenType(value: string): Token['type'] {
  // TODO: Order is necessary, cuz color maybe has percent.
  if (value.match(/#|rgb|hsl/) !== null) {
    return 'color'
  }
  if (value.match(/px|%|em|rem/) !== null) {
    return 'size'
  }
  return 'unknown'
}

function isTokensMap(token: Token | TokensMap): token is TokensMap {
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
    if (typeof token === 'string') {
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
