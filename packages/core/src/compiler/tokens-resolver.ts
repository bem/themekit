import { dotCase } from 'change-case'

import type { Token, TokenValue } from '../types'
import { isAlias } from '../utils/is-alias'
import { createRef } from '../utils/ref'
import { CircularRefs, NotFoundRef } from './errors'

const tokensRef = createRef<Token[]>()
// Use map for cache tokens (get token with O(1) operations) indexes with path as key.
const indexCache = new Map<string, string>()

/**
 * Resolves tokens value aliases.
 *
 * @param tokens - Compiled tokens list.
 * @returns Tokens with resolved aliases.
 */
export function resolveTokensAliases(tokens: Token[]): Token[] {
  tokensRef.current = tokens

  for (const index in tokens) {
    const key = createCacheKey(tokens[index].path)
    indexCache.set(key, index)
  }

  for (const token of tokens) {
    if (isAlias(token.value)) {
      const compileResult = resolveValueAliases(token.value)
      token.refs = compileResult.refs
      token.value = compileResult.value
    }
  }

  return tokens
}

function createCacheKey(path: string[]) {
  return (
    path
      // Use dot-case for normalize key to resolve aliases with few cases.
      .map((chunk) => dotCase(chunk))
      // TODO: Create key and resolve without value postfix.
      .concat('value')
      .join('.')
  )
}

function normalizeAliasKey(alias: string) {
  return dotCase(alias)
}

function resolveValueAliases(value: TokenValue, visited = new Set<string>()) {
  const result = { value, refs: [] as Token[] }

  let aliasRegExp = /{([^}]+)}/g
  let matches: RegExpExecArray | null

  while ((matches = aliasRegExp.exec(String(value))) !== null) {
    const [match, alias] = matches

    if (visited.has(alias)) {
      throw new CircularRefs([...visited, alias])
    } else {
      visited.add(alias)
    }

    const index = indexCache.get(normalizeAliasKey(alias))
    // @ts-expect-error (TODO: Fix undefined issue)
    const resolvedToken = tokensRef.current[index]

    if (!resolvedToken) {
      throw new NotFoundRef(alias)
    }

    if (isAlias(resolvedToken.value)) {
      const compileResult = resolveValueAliases(resolvedToken.value, visited)
      resolvedToken.refs = compileResult.refs
      resolvedToken.value = compileResult.value
    }

    result.refs.push(resolvedToken)
    result.value = String(result.value).replace(match, resolvedToken.value)
  }

  return result
}
