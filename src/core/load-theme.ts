import { join, resolve } from 'path'
import { readJSON } from 'fs-extra'
import merge from 'deepmerge'
import glob from 'fast-glob'
import pkgDir from 'pkg-dir'

import { Platforms } from './platforms'
import { throwError } from './utils'

type InputTheme = {
  mappers: string[]
  sources: string[]
  whitepaper: Record<string, string>
  platforms: Platforms[]
  extends?: string
}

type OutputTheme = {
  mappers: string[]
  // Uses nested array with paths, cuz glob not save orders with using patterns for path.
  sources: string[][]
  whitepaper: Record<string, string>
  platforms: Platforms[]
}

export async function loadTheme(
  sources: string,
  cwd: string = process.cwd(),
): Promise<OutputTheme> {
  let result: OutputTheme = { mappers: [], sources: [], whitepaper: {}, platforms: ['common'] }
  const theme: InputTheme = await readJSON(sources)

  if (theme.extends !== undefined) {
    const [extendsPath] = await glob([
      resolve(cwd, 'node_modules', theme.extends),
      resolve(cwd, theme.extends),
    ])

    if (extendsPath === undefined) {
      throwError(`Cannot load theme: "${theme.extends}".`)
    } else {
      const extendsCwd = extendsPath.includes('node_modules') ? pkgDir.sync(extendsPath) : cwd
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

  result.sources.push(theme.sources.map((filePath) => join(cwd, filePath)))

  return result
}
