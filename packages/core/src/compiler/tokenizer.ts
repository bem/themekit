import { dotCase } from 'change-case'

import type { Token } from '../types'
import { isObject } from '../utils/is-object'

/**
 * Returns list of tokens with prepared shape for compile.
 *
 * @param tokens - Raw tokens.
 * @param prev - Prev result of tokenize.
 * @param context - Nested context.
 * @returns Prepared tokens.
 */
export function tokenize(
  tokens: Record<string, any>,
  prev: Token[] = [],
  context: string[] = [],
): Token[] {
  const result = prev

  for (const key in tokens) {
    if (isObject(tokens[key]) && tokens[key].value !== undefined) {
      result.push({
        comment: tokens[key].comment,
        name: '',
        // `path` can consist out of complex words (['color', 'viewAction'])
        // `normalizePath` converts into uniform form (['color', 'view', 'action'])
        path: normalizePath([...context, key]),
        refs: [],
        value: tokens[key].value,
        original: {
          value: tokens[key].value,
        },
      })
    } else {
      tokenize(tokens[key], result, [...context, key])
    }
  }

  return result
}

function normalizePath(path: string[]) {
  return (
    path
      .map((chunk) => dotCase(chunk))
      .join('.')
      .split('.')
  )
}
