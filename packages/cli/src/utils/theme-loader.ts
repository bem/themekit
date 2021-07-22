import { join, resolve, dirname } from 'path'
import { readJsonSync, existsSync } from 'fs-extra'
import merge from 'deepmerge'

import { resolveFrom } from './path-resolver'
import { findPackageRoot } from './package-resolver'
import { NotFoundThemeException } from './errors'

export function loadTheme(path: string, root: string = process.cwd()): OutputTheme {
  // TODO: use ref?
  let derivedTheme: OutputTheme = { mappers: [], sources: [], exclude: [] }
  const theme: InputTheme = readJsonSync(path)
  const packageRootPath = findPackageRoot(root)

  if (theme.extends !== undefined) {
    const parentThemePath = resolveFrom(packageRootPath, theme.extends)

    if (parentThemePath && existsSync(parentThemePath)) {
      const parentThemeCwd = dirname(parentThemePath)
      const parentTheme = loadTheme(parentThemePath, parentThemeCwd)
      derivedTheme = merge(derivedTheme, parentTheme)
    } else {
      throw new NotFoundThemeException(theme.extends)
    }
  }

  if (theme.exclude !== undefined) {
    derivedTheme.exclude = theme.exclude
  }

  if (theme.mappers !== undefined) {
    // TODO: Переписать эту херовину
    derivedTheme.mappers.push(...theme.mappers.map((filePath) => join(packageRootPath, filePath)))
  }

  for (const source of theme.sources) {
    const resolvedSource = resolve(packageRootPath, source)
    derivedTheme.sources.push(resolvedSource)
  }

  return derivedTheme
}

// TODO: rewrite to interface
type InputTheme = {
  exclude: string[]
  mappers: string[]
  sources: string[]
  extends?: string
}

type OutputTheme = {
  exclude: string[]
  mappers: string[]
  sources: string[]
}
