import merge from 'deepmerge'
import { isAlias } from './utils'

/**
 * Returns props with replaced alias with css-variables.
 * @param props Props list
 * @param transformer Name transformer
 */
export function replaceAliasToVariable<T extends Array<any>>(props: T, transformer: any): T {
  const nextProps = merge([], props)
  for (const prop of nextProps) {
    if (isAlias(prop.original.value)) {
      const variableName = transformer({ path: prop.original.value.replace(/value/, '') }, {})
      prop.value = `var(--${variableName})`
    }
  }
  return nextProps as T
}
