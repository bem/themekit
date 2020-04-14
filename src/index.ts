import Color from 'color'
import deepmerge from 'deepmerge'

import { ThemeTokens } from './core/token.h'

export function theme(shape1: ThemeTokens, shape2: ThemeTokens = {}): ThemeTokens {
  return deepmerge(shape1, shape2)
}

export function color(inputColor: string, options: { h?: number; s?: number; l?: number }): string {
  return Color(inputColor)
    .hsl(options.h, options.s, options.l)
    .hex()
}
