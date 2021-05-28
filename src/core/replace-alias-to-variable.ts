import merge from 'deepmerge'
import { InjectedTransformer } from '../vendors/style-dictionary'

import { isAlias } from './utils'

/**
 * Returns props with replaced alias with css-variables.
 * @param props Props list
 * @param transformer Name transformer
 */
export function replaceAliasToVariable<T extends Array<any>>(
  props: T,
  transformers: InjectedTransformer[],
): T {
  const nextProps = merge([], props)
  for (const prop of nextProps) {
    if (isAlias(prop.original.value)) {
      const nextProp = transformers.reduce(
        (prevProp, value) => {
          return { path: prevProp.path, name: value.transformer(prevProp, {}) }
        },
        { ...prop, path: prop.original.value.replace(/value/, '') },
      )
      prop.value = `var(--${nextProp.name})`
    }
  }
  return nextProps as T
}
