import type { RawToken, Token } from '../types'
import { deepMerge } from '../utils/deep-merge'
import { tokenize } from './tokenizer'
import { resolveTokensAliases } from './tokens-resolver'

/**
 * Compiles input tokens, creates token struct and resolves value aliases.
 *
 * @param tokens - Input tokens.
 * @returns Compiled tokens.
 */
export function compileTokens(tokens: RawToken[]): Token[] {
  let compiledTokens: Token[] = tokens as any[]
  compiledTokens = deepMerge(compiledTokens)
  compiledTokens = tokenize(compiledTokens)
  compiledTokens = resolveTokensAliases(compiledTokens)

  return compiledTokens
}
