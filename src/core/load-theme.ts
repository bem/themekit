import { join, resolve, dirname } from 'path'
import { readJSON } from 'fs-extra'
import merge from 'deepmerge'
import glob from 'fast-glob'
import readPkgUp from 'read-pkg-up'

import { Platforms } from './platforms'
import { throwError, normalizePaths } from './utils'

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

function findPackageRoot(path: string): string {
  const data = readPkgUp.sync({ cwd: path })
  if (data === undefined) {
    throw new Error('Cannot find package root, please check exists package.json.')
  }
  if (data.packageJson.version !== '' && data.packageJson.name !== '') {
    return dirname(data.path)
  }
  const prevDir = join(dirname(data.path), '..')
  return findPackageRoot(prevDir)
}

export async function loadTheme(
  sources: string,
  cwd: string = process.cwd(),
): Promise<OutputTheme> {
  let result: OutputTheme = { mappers: [], sources: [], whitepaper: {}, platforms: ['common'] }
  const theme: InputTheme = await readJSON(sources)

  if (theme.extends !== undefined) {
    const [extendsPath] = await glob(
      normalizePaths([resolve(cwd, 'node_modules', theme.extends), resolve(cwd, theme.extends)]),
    )

    if (extendsPath === undefined) {
      throwError(`Cannot load theme: "${theme.extends}".`)
    } else {
      const extendsCwd = extendsPath.includes('node_modules') ? findPackageRoot(extendsPath) : cwd
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

  for (const source of theme.sources) {
    // Makes array of arrays with each source for save order after glob.
    result.sources.push([join(cwd, source)])
  }

  return result
}
