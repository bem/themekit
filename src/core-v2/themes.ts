import { join } from 'path'
import { readJSON } from 'fs-extra'

import { Platforms } from '../core/platforms'

type Themes = {
  mappers: string[]
  sources: string[]
  whitepaper: {}
  platform: Platforms
}

function resolveRootDir(filePath: string): string {
  return filePath.match(/<rootDir>/)
    ? join(process.cwd(), filePath.replace(/<rootDir>/, ''))
    : filePath
}

export async function loadThemes(sources: string | string[]): Promise<Themes> {
  const result: Themes = { mappers: [], sources: [], whitepaper: {}, platform: 'common' }
  const normalizedSources = Array.isArray(sources) ? sources : [sources]
  for (const sourcePath of normalizedSources) {
    const { mappers = [], sources = [], whitepaper, platform }: Themes = await readJSON(sourcePath)
    result.mappers.push(...mappers.map(resolveRootDir))
    result.sources.push(...sources.map(resolveRootDir))
    result.whitepaper = { ...result.whitepaper, whitepaper }
    if (platform !== undefined) {
      result.platform = platform
    }
  }
  return result
}
