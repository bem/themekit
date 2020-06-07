import { Platforms } from '../core/platforms'

export function throwError(messag: string): void {
  throw new Error(messag)
}

export function getPlatformFromFilePath(filePath: string): Platforms {
  const matched = filePath.match(/@([\w|-]+)+\./)
  return matched === null ? 'common' : (matched[1] as Platforms)
}
