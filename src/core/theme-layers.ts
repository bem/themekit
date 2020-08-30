import deepmerge from 'deepmerge'

import { locator } from '../lib/service-locator'
import { Platforms, platforms } from './platforms'
import { Shape, TokensMap, ThemeTokens, Meta } from './types'
import { deepInvoke, throwError } from './utils'

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
  options: { platforms?: Platforms[] } = {},
): Promise<ThemeLayers> {
  const $glob = locator.get('glob')
  const $import = locator.get('import')
  const $path = locator.get('path')

  const result: ThemeLayers = {}
  const files = await $glob(source)
  for (const fileName of files) {
    const source = await $import($path.resolve(fileName))
    if (typeof source !== 'function') {
      throwError('Theme should return "withTokens" call.')
    }
    const themeLayer = deepInvoke<ThemeTokens>(source)
    const { name } = $path.parse(fileName)
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
