import { Prop } from '../index.h'

/**
 * Returns string with prefixed variables.
 *
 * @param prefix - Variables prefix
 * @param props - Props list
 */
export function variablesWithPrefix(prefix: string, props: Prop[]): string {
  const propToString = (prop: Prop) => {
    const nextProp = [prefix + prop.name + ': ' + prop.value + ';']

    if (prop.comment) {
      nextProp.push(' /* ' + prop.comment + ' */')
    }

    return nextProp.join('')
  }

  return props
    .map(propToString)
    .filter(Boolean)
    .join('\n')
}
