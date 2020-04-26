import deepmerge from 'deepmerge'

import { Shape, ThemeTokens } from './core/types'
import { esModuleInterop } from './core/import-module'

type ThemeFn<T> = ThemeFn1<T> | ThemeFn2<T>
type ThemeFn1<T> = (primitives: T) => ThemeTokens
type ThemeFn2<T> = (primitives: T) => ThemeFn1<T>

// TODO: theme args must be fn or plain shape.
export function withTokens<T extends Shape<any>>(themeFn1: ThemeFn<T>, themeFn2?: ThemeFn<T>) {
  return (primitives1?: T) => (primitives2?: T) => {
    const composedPrimitives = deepmerge<T>(primitives1 || {}, primitives2 || {})
    const theme1 = esModuleInterop<ThemeFn1<T>>(themeFn1 as any)
    const theme2 = esModuleInterop<ThemeFn1<T>>(themeFn2 as any)
    if (theme2 === undefined) {
      return theme1(composedPrimitives)
    }
    return deepmerge(theme1(composedPrimitives), theme2(composedPrimitives))
  }
}
