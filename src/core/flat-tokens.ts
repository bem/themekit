import { withPrefix } from './with-prefix'
import { Shape, FlattenToken, Token, TokensMap } from './token.h'

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
    if (maybeToken.value === undefined) {
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
