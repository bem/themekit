type Fn1 = () => any
type Fn2 = () => Fn1

export function deepInvoke<T>(fn: Fn1 | Fn2): T {
  const maybeFn = fn()
  if (typeof maybeFn === 'function') {
    return maybeFn()
  }
  return maybeFn
}
