import { join, resolve } from 'path'
import { readJSON } from 'fs-extra'
import merge from 'deepmerge'
import glob from 'fast-glob'

import { Platforms } from '../core/platforms'

type Theme = {
  mappers: string[]
  sources: string[]
  whitepaper: {}
  platform: Platforms
  extends?: string
}

export async function loadTheme(sources: string, cwd: string = process.cwd()): Promise<Theme> {
  let result: Theme = { mappers: [], sources: [], whitepaper: {}, platform: 'common' }
  const theme: Theme = await readJSON(sources)

  if (theme.extends !== undefined) {
    const [extendsPath] = await glob([
      resolve(cwd, 'node_modules', theme.extends),
      resolve(cwd, theme.extends),
    ])

    if (extendsPath === undefined) {
      throw new Error(`Cannot load theme: "${theme.extends}".`)
    } else {
      const extendsCwd = extendsPath.includes('node_modules')
        ? resolve(cwd, 'node_modules', theme.extends.split('/')[0])
        : cwd
      result = merge(result, await loadTheme(extendsPath, extendsCwd))
    }
  }

  if (theme.platform !== undefined) {
    result.platform = theme.platform
  }

  if (theme.mappers !== undefined) {
    result.mappers.push(...theme.mappers.map((filePath) => join(cwd, filePath)))
  }

  if (theme.whitepaper !== undefined) {
    result.whitepaper = { ...result.whitepaper, ...theme.whitepaper }
  }

  result.sources.push(...theme.sources.map((filePath) => join(cwd, filePath)))

  return result
}
