import { resolve, parse } from 'path'
import fg from 'fast-glob'
import deepmerge from 'deepmerge'

import { Platforms, platforms } from './platforms'
import { importModule } from './import-module'
import { Shape, TokensMap, ThemeTokens } from './token.h'

type ThemeLayers = Shape<
  Shape<{
    name: string
    meta?: { css?: string }
    tokens: TokensMap
  }>
>

export async function getThemeLayers(
  source: string,
  options: { platforms?: Platforms } = {},
): Promise<ThemeLayers> {
  const result: ThemeLayers = {}
  // @ts-ignore
  const files = await fg(source)
  for (const fileName of files) {
    const fn = await importModule<ThemeTokens>(resolve(fileName))
    const maybeFn = fn()
    const data = typeof maybeFn === 'function' ? maybeFn() : maybeFn
    const { name: layer } = parse(fileName)
    for (const [platform, levels] of platforms) {
      if (options.platforms !== undefined && !options.platforms.includes(platform)) {
        continue
      }
      const composedLevels = []
      for (const level of levels) {
        if (data[level] !== undefined) {
          composedLevels.push(data[level])
        }
      }
      if (result[platform] === undefined) {
        result[platform] = {}
      }
      result[platform][fileName] = {
        meta: data.meta,
        name: layer,
        tokens: deepmerge.all<TokensMap>(composedLevels),
      }
    }
  }
  return result
}
