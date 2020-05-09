type Fn1 = () => any
type Fn2 = () => Fn1

export function deepInvoke<T>(fn: Fn1 | Fn2): T {
  const maybeFn = fn()
  if (typeof maybeFn === 'function') {
    return maybeFn()
  }
  return maybeFn
}

/**
 * Returns string with prefix.
 *
 * @param value Raw string.
 * @param prefix Prefix for string.
 */
export function withPrefix(value: string, prefix?: string): string {
  if (prefix === undefined) {
    return value
  }
  return `${prefix}_${value}`
}
