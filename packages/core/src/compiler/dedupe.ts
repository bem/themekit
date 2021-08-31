import dm from 'deepmerge'
import { Token } from '../types'

/**
 * Remove duplicates from tokens array.
 *
 * @param tokens - Input tokens.
 * @returns Compiled tokens without duplicates.
 */
export function dedupe(tokens: Token[]) {
  const result: Token[] = []
  const visited = new Map<string, number>()

  const arrayMerge = (source: any[], target: any[]) => target

  for (let token of tokens) {
    const key = token.path.join('.')

    if (visited.has(key)) {
      const index = visited.get(key) as number
      const mergedToken = dm.all([result[index], token], { arrayMerge }) as Token

      result[index] = mergedToken
    } else {
      result.push(token)
      visited.set(key, result.length - 1)
    }
  }

  return result
}
