import toColor from 'color'
import { paramCase, constantCase } from 'change-case'

import { withPrefix } from './with-prefix'
import { Shape, FlattenToken } from './token.h'

type Transform = {
  type: 'name' | 'value'
  matcher?: (token: FlattenToken) => boolean
  transformer: (tokenn: FlattenToken, options?: any) => string
}

export const transforms: Shape<Transform> = {
  'name.param': {
    type: 'name',
    // prettier-ignore
    transformer: (token, options) =>
      paramCase(withPrefix(token.name, options.prefix))
  },
  'name.const': {
    type: 'name',
    // prettier-ignore
    transformer: (token, options) =>
      constantCase(withPrefix(token.name, options.prefix))
  },
  'color.hex': {
    type: 'value',
    matcher: (token) => token.type === 'color',
    transformer: (token) => {
      const color = toColor(token.value)
      // prettier-ignore
      return (color as any).valpha < 1
        ? color.rgb().toString().toLowerCase()
        : color.hex().toString().toLowerCase()
    },
  },
  // TODO: Fix transform for multiply value, ex. `0 10px`.
  'size.px': {
    type: 'value',
    matcher: (token) => token.type === 'size',
    transformer: (token) => {
      if (token.value.toString().match(/px|%/)) {
        return `${token.value}`
      }
      return `${token.value}px`
    },
  },
}

// TODO: Use shape instead array for same struct as original.
// TODO: Fix any types.
export function transformTokens(tokens: Shape<any>, options: any) {
  const result = []
  for (const key in tokens) {
    const token = tokens[key]
    for (const transformKey of options.transforms) {
      const transform = transforms[transformKey]
      if (transform.type === 'name') {
        token.name = transform.transformer(token, options)
      }
      if (
        transform.type === 'value' &&
        transform.matcher !== undefined &&
        transform.matcher(token)
      ) {
        token.value = transform.transformer(token, options)
      }
    }
    result.push(token)
  }
  return result
}
