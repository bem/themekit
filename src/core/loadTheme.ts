import { join, resolve, dirname } from 'path'
import { readJSON, existsSync } from 'fs-extra'
import merge from 'deepmerge'

import { resolveFrom } from '../resolveFrom'
import { findPackageRoot } from '../findPackageRoot'
import { Platforms } from './platforms'

export async function loadTheme(
  source: string,
  root: string = process.cwd(),
): Promise<OutputTheme> {
  let derivedTheme: OutputTheme = {
    mappers: [],
    sources: [],
    whitepaper: {},
    platforms: ['common'],
  }
  const theme: InputTheme = await readJSON(source)

  // In case with node_modules in cwd need resolve all sources from package root.
  root = root.match(/node_modules/) === null ? root : findPackageRoot(root)

  if (theme.extends !== undefined) {
    const parentThemePath = resolveFrom(root, theme.extends)
    if (parentThemePath && existsSync(parentThemePath)) {
      const parentThemeCwd = dirname(parentThemePath)
      const parentTheme = await loadTheme(parentThemePath, parentThemeCwd)
      // Platforms should be defined at project theme.
      derivedTheme = merge(derivedTheme, { ...parentTheme, platforms: [] })
    } else {
      throw new Error(`Cannot load theme: "${theme.extends}".`)
    }
  }

  if (theme.platforms !== undefined) {
    derivedTheme.platforms = theme.platforms
  }

  if (theme.mappers !== undefined) {
    derivedTheme.mappers.push(...theme.mappers.map((filePath) => join(root, filePath)))
  }

  if (theme.whitepaper !== undefined) {
    derivedTheme.whitepaper = { ...derivedTheme.whitepaper, ...theme.whitepaper }
  }

  for (const source of theme.sources) {
    // Makes array of arrays with each source for save order after glob.
    derivedTheme.sources.push([resolve(root, source)])
  }

  return derivedTheme
}

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
