import glob from 'fast-glob'

import { Platforms, platforms } from '../core/platforms'
import { getPlatformFromFilePath } from './utils'

export async function loadSources(path: string[], platform: Platforms): Promise<string[]> {
  const levels = platforms.get(platform)

  if (levels === undefined) {
    throw new Error(`Unexpected platform: ${platform}, please check configuration.`)
  }

  const files = await glob(path)

  const result = files
    .filter((file) => {
      const filePlatform = getPlatformFromFilePath(file)
      return levels.includes(filePlatform as Platforms)
    })
    .sort((a, b) => {
      const a1 = getPlatformFromFilePath(a)
      const b1 = getPlatformFromFilePath(b)
      return levels.indexOf(a1) - levels.indexOf(b1)
    })

  return result
}
