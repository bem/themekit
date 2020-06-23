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

export function throttle<T extends []>(
  callback: (..._: T) => void,
  delay: number,
): (..._: T) => void {
  let timeout: NodeJS.Timeout | undefined
  let lastArgs: T
  const next = () => {
    timeout = clearTimeout(timeout as any) as undefined
    callback(...lastArgs)
  }

  return (...args: T) => {
    lastArgs = args

    if (timeout === undefined) {
      timeout = setTimeout(next, delay)
    }
  }
}
