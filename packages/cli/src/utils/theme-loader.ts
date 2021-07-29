import { resolve, dirname } from 'path'
import { existsSync } from 'fs-extra'
import merge from 'deepmerge'

import { resolveFrom } from './path-resolver'
import { findPackageRoot } from './package-resolver'
import { NotFoundTheme, SourcesNotDefined } from './errors'
import { readFile } from './file-reader'
import { loadAliases } from './aliases-loader'
import { loadSources } from './sources-loader'

export interface Theme {
  /**
   * Parent theme.
   */
  extends?: string
  /**
   * A list of files for exclude from search.
   */
  exclude: string[]
  /**
   * A list of files with tokens for include to theme.
   */
  sources: string[]
  /**
   * A lias of files with aliases for include to theme.
   */
  aliases: string[]
}

/**
 * Loads theme files like sourced and aliases.
 */
export function loadThemeFiles(path: string, root: string = process.cwd()): Theme {
  let resultTheme: Theme = { aliases: [], sources: [], exclude: [] }

  if (!existsSync(path)) {
    throw new NotFoundTheme(path)
  }

  const theme = readFile<Theme>(path)
  const packageRootPath = findPackageRoot(root)

  if (!theme.sources) {
    throw new SourcesNotDefined(path)
  }

  if (theme.extends) {
    const parentThemePath = resolveFrom(packageRootPath, theme.extends)

    if (parentThemePath && existsSync(parentThemePath)) {
      const parentThemeCwd = dirname(parentThemePath)
      const parentTheme = loadThemeFiles(parentThemePath, parentThemeCwd)
      resultTheme = merge(resultTheme, parentTheme)
    } else {
      throw new NotFoundTheme(theme.extends, true)
    }
  }

  if (theme.exclude) {
    resultTheme.exclude = theme.exclude
  }

  if (theme.aliases) {
    for (const mapper of theme.aliases) {
      resultTheme.aliases.push(resolve(packageRootPath, mapper))
    }
  }

  for (const source of theme.sources) {
    resultTheme.sources.push(resolve(packageRootPath, source))
  }

  return resultTheme
}

/**
 * Loads theme sources like tokens and aliases.
 */
export function loadTheme(path: string) {
  const theme = loadThemeFiles(path)
  const aliases = loadAliases(theme.aliases)
  const tokens = loadSources(theme.sources, theme.exclude)

  return { tokens, aliases }
}
