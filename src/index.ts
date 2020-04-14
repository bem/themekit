import toColor from 'color'

import { ThemeTokens } from './core/token.h'

export function theme(shape1: ThemeTokens, shape2?: ThemeTokens): ThemeTokens {
  return shape1
}

export function color(inputColor: string, options: { h?: number; s?: number; l?: number }): string {
  let color = toColor(inputColor)
  return color.hsl(options.h, options.s, options.l).hex()
}
