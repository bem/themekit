import { Property } from '../vendors/style-dictionary'
import merge from 'deepmerge'

function toDeepToken(path: string, prop: Property): any {
  const chunks = path.split('-').reverse()
  let result: any = prop
  for (let i = 0; i < chunks.length; i++) {
    result = { [chunks[i]]: result }
  }
  return result
}

export function dedupeProps<T extends Record<string, Property>>(props: T): T {
  let source = {}
  let overrides = {}
  for (const propKey in props) {
    if (propKey.match(/-/)) {
      overrides = merge(overrides, toDeepToken(propKey, props[propKey]))
    } else {
      source = merge(source, { [propKey]: props[propKey] })
    }
  }
  return merge<T>(source, overrides)
}
