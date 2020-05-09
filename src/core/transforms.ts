import cssColorFn from 'css-color-function'
import { constantCase } from 'change-case'

import { withPrefix } from './with-prefix'
import { Shape, FlattenToken } from './types'

function paramCase(value: string): string {
  return value.replace(/_/g, '-')
}

type Transform = {
  type: 'name' | 'value'
  matcher?: (token: FlattenToken) => boolean
  transformer: (tokenn: FlattenToken, options?: any) => string
}

export const transforms: Shape<Transform> = {
  'name.param': {
    type: 'name',
    transformer: (token, options) =>
      // prettier-ignore
      paramCase(withPrefix(token.name, options.prefix)),
  },
  'name.const': {
    type: 'name',
    transformer: (token, options) =>
      // prettier-ignore
      constantCase(withPrefix(token.name, options.prefix)),
  },
  'color.hex': {
    type: 'value',
    matcher: (token) => token.type === 'color',
    // FIXME: value always should be string after flatting.
    transformer: (token) => {
      if (token.value.toString().startsWith('color')) {
        return cssColorFn.convert(token.value.toString())
      }
      return token.value.toString()
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
export function transformTokens(
  tokens: Shape<FlattenToken>,
  options: { transforms: string[] },
): FlattenToken[] {
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
