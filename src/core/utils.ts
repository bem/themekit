import normalize from 'normalize-path'

import { Platforms } from '../core/platforms'

export function throwError(messag: string): void {
  throw new Error(messag)
}

export function getPlatformFromFilePath(filePath: string): Platforms {
  const matched = filePath.match(/@([\w|-]+)+\./)
  return matched === null ? 'common' : (matched[1] as Platforms)
}

export function isColor(value: string | number): boolean {
  return /^(#|rgba?|hsla?|color|transparent)/.test(String(value))
}

export function isAlias(value: string | number): boolean {
  return /^{.+}$/.test(String(value))
}

// eslint-disable-next-line space-before-function-paren
export function debounce<F extends (...args: any[]) => any>(func: F, waitFor: number) {
  let timeout: ReturnType<typeof setTimeout> | null = null

  const debounced = (...args: Parameters<F>) => {
    if (timeout !== null) {
      clearTimeout(timeout)
      timeout = null
    }
    timeout = setTimeout(() => func(...args), waitFor)
  }

  return debounced as (...args: Parameters<F>) => ReturnType<F>
}

type ArrayType<T> = T extends (infer U)[] ? U : never

export function flatten<T extends any[]>(arrays: T[]): ArrayType<T>[] {
  return arrays.reduce<any[]>((acc, value) => acc.concat(value), [])
}

export function normalizePaths(paths: string[]): string[] {
  return paths.map((path) => normalize(path))
}

export function normalizeCss(text: string): string {
  const csso = require('csso')
  // workaround https://github.com/css/csso/issues/422
  return csso.minify(text.replace(/--/g, '____')).css.replace(/____/g, '--')
}
