import deepmerge from 'deepmerge'

import { Shape, Primitive, ThemeTokens } from './core/types'
import { esModuleInterop } from './core/import-module'

type Primitives = Shape<Primitive>
type ThemeFn = ThemeFn1 | ThemeFn2
type ThemeFn1 = (primitives: Primitives) => ThemeTokens
type ThemeFn2 = (primitives: Primitives) => ThemeFn1

// TODO: theme args must be fn or plain shape.
export function withTokens(themeFn1: ThemeFn, themeFn2?: ThemeFn) {
  return (primitives1: Primitives = {}) => (primitives2: Primitives = {}) => {
    const composedPrimitives = deepmerge(primitives1, primitives2)
    const theme1 = esModuleInterop<ThemeFn1>(themeFn1 as any)
    const theme2 = esModuleInterop<ThemeFn1>(themeFn2 as any)
    if (theme2 === undefined) {
      return theme1(composedPrimitives)
    }
    return deepmerge(theme1(composedPrimitives), theme2(composedPrimitives))
  }
}
