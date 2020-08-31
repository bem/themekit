import glob from 'fast-glob'

import { Platforms, platforms } from '../core/platforms'
import { getPlatformFromFilePath, flatten, normalizePaths } from './utils'

export async function loadSources(paths: string[][], platform: Platforms): Promise<string[]> {
  const levels = platforms.get(platform)

  if (levels === undefined) {
    throw new Error(`Unexpected platform: ${platform}, please check configuration.`)
  }

  // Uses nested array with paths, cuz glob not save orders with using patterns for path.
  // Also uses sort after glob for idempotent result.
  const resolvedPaths = await Promise.all(
    paths.map((path) => glob.sync(normalizePaths(path), { fs: require('fs') }).sort()),
  )
  const result = flatten(resolvedPaths)
    .filter((file) => {
      const filePlatform = getPlatformFromFilePath(file)
      return levels.includes(filePlatform)
    })
    .sort((a, b) => {
      const a1 = getPlatformFromFilePath(a)
      const b1 = getPlatformFromFilePath(b)
      return levels.indexOf(a1) - levels.indexOf(b1)
    })

  return result
}
