import deepmerge from 'deepmerge'

import { Shape, ThemeTokens } from './core/token.h'
import { esModuleInterop } from './core/import-module'

type Primitives = Shape<string | number>
type ThemeFn = (primitives: Primitives) => ThemeTokens

// TODO: theme args must be fn or plain shape.
export function withTokens(theme1: ThemeFn, theme2?: ThemeFn) {
  return (primitives1: Primitives = {}) => (primitives2: Primitives = {}) => {
    const composedPrimitives = deepmerge(primitives1, primitives2)
    const resolvedTheme1 = esModuleInterop(theme1)
    const resolvedTheme2 = esModuleInterop(theme2)
    if (resolvedTheme2 === undefined) {
      return resolvedTheme1(composedPrimitives)
    }
    return deepmerge(resolvedTheme1(composedPrimitives), resolvedTheme2(composedPrimitives))
  }
}
