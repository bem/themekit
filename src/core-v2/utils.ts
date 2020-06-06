import { Platforms } from '../core/platforms'

export function getFolderWithPlatform(fileName: string): string {
  const [name, platform] = fileName.split('@')
  if (platform === undefined) {
    return name
  }
  return `${name}/${platform}`
}

export function getPlatformFromFilePath(filePath: string): Platforms {
  const matched = filePath.match(/@([\w|-]+)+\./)
  return matched === null ? 'common' : (matched[1] as Platforms)
}
