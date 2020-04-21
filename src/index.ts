import deepmerge from 'deepmerge'

import { Shape, ThemeTokens } from './core/token.h'

type Primitives = Shape<string | number>
type ThemeFn = (primitives: Primitives) => ThemeTokens

// TODO: theme args must be fn or plain shape.
export function withTokens(theme1: ThemeFn, theme2?: ThemeFn) {
  return (primitives1: Primitives = {}) => (primitives2: Primitives = {}) => {
    const composedPrimitives = deepmerge(primitives1, primitives2)
    if (theme2 === undefined) {
      return theme1(composedPrimitives)
    }
    return deepmerge(theme1(composedPrimitives), theme2(composedPrimitives))
  }
}
