import { join, resolve } from 'path'
import { readJSON } from 'fs-extra'
import merge from 'deepmerge'
import glob from 'fast-glob'

import { Platforms } from '../core/platforms'
import { throwError } from '../core/utils'

type Theme = {
  mappers: string[]
  sources: string[]
  whitepaper: {}
  platforms: Platforms[]
  extends?: string
}

export async function loadTheme(sources: string, cwd: string = process.cwd()): Promise<Theme> {
  let result: Theme = { mappers: [], sources: [], whitepaper: {}, platforms: ['common'] }
  const theme: Theme = await readJSON(sources)

  if (theme.extends !== undefined) {
    const [extendsPath] = await glob([
      resolve(cwd, 'node_modules', theme.extends),
      resolve(cwd, theme.extends),
    ])

    if (extendsPath === undefined) {
      throwError(`Cannot load theme: "${theme.extends}".`)
    } else {
      const extendsCwd = extendsPath.includes('node_modules')
        ? resolve(cwd, 'node_modules', theme.extends.split('/')[0])
        : cwd
      const extendsTheme = await loadTheme(extendsPath, extendsCwd)
      // Platforms should be defined at project theme.
      delete extendsTheme.platforms
      result = merge(result, extendsTheme)
    }
  }

  if (theme.platforms !== undefined) {
    result.platforms = theme.platforms
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
