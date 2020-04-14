import { withPrefix } from './with-prefix'
import { Shape, FlattenToken, Token, TokensMap } from './token.h'

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

/**
 * Returns flatten shape with tokens.
 *
 * @param tokens Map with tokens.
 */
export function flatTokens(tokens: TokensMap, __prefix__?: string): Shape<FlattenToken> {
  const result: Shape<FlattenToken> = {}
  for (const key in tokens) {
    const transformedKey = withPrefix(key, __prefix__)
    const maybeToken = tokens[key]
    if (typeof maybeToken === 'string') {
      result[transformedKey] = {
        value: maybeToken,
        type: getTokenType(maybeToken),
        name: transformedKey,
      }
    }
    else if (maybeToken.value === undefined) {
      Object.assign(result, flatTokens(maybeToken as TokensMap, transformedKey))
    } else {
      result[transformedKey] = {
        ...maybeToken as Token,
        name: transformedKey,
      }
    }
  }
  return result
}
