import deepmerge from 'deepmerge'

import { Shape, ThemeTokens } from './core/types'
import { esModuleInterop } from './core/import-module'

// For better DX, theme can be polymorphed, for example:
// withTokens(() => ...),
// withTokens(withTokens(() => ...), () => ...)
// withTokens(withTokens(() => ...)(), () => ...)
type ThemeFn<T> = ThemeFn1<T> | ThemeFn2<T>
type ThemeFn1<T> = (primitives: T) => ThemeTokens
type ThemeFn2<T> = (primitives: T) => ThemeFn1<T>

export function withTokens<T extends Shape<any>, U extends Shape<any> = Shape<any>>(
  themeFn1: ThemeFn<T>,
  themeFn2?: ThemeFn<U>,
) {
  return (primitives1?: T) => (primitives2?: U) => {
    const composedPrimitives = deepmerge(primitives1 || {}, primitives2 || {})
    // Interop needed for using transpiled esm modules.
    const theme1 = esModuleInterop<ThemeFn1<any>>(themeFn1 as any)
    const theme2 = esModuleInterop<ThemeFn1<any>>(themeFn2 as any)
    if (theme2 === undefined) {
      return theme1(composedPrimitives)
    }
    return deepmerge(theme1(composedPrimitives), theme2(composedPrimitives))
  }
}
