import { resolve, parse } from 'path'
import fg from 'fast-glob'
import deepmerge from 'deepmerge'

import { Platforms, platforms } from './platforms'
import { importModule } from './import-module'
import { Shape, TokensMap, ThemeTokens, Meta } from './types'
import { deepInvoke } from './utils'

type ThemeLayers = Shape<
  Shape<
    {
      name: string
      tokens: TokensMap
    } & Meta
  >
>

export async function getThemeLayers(
  source: string,
  options: { platforms?: Platforms } = {},
): Promise<ThemeLayers> {
  const result: ThemeLayers = {}
  const files = await fg(source)
  for (const fileName of files) {
    const source = await importModule(resolve(fileName))
    const themeLayer = deepInvoke<ThemeTokens>(source)
    const { name } = parse(fileName)
    for (const [platform, levels] of platforms) {
      if (options.platforms !== undefined && !options.platforms.includes(platform)) {
        continue
      }
      const composedLevels: (Meta & TokensMap)[] = []
      for (const level of levels) {
        const levelTokens = themeLayer[level]
        if (levelTokens !== undefined) {
          composedLevels.push(levelTokens)
        }
      }
      if (result[platform] === undefined) {
        result[platform] = {}
      }
      const { meta, ...tokens } = deepmerge.all<Meta & TokensMap>(composedLevels)
      result[platform][fileName] = {
        meta,
        name,
        tokens,
      }
    }
  }
  return result
}
