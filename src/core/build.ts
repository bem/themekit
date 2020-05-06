import { writeFile, ensureDir } from 'fs-extra'
import { join, resolve, parse } from 'path'
import deepmerge from 'deepmerge'

import { Config } from './config'
import { getThemeLayers } from './theme-layers'
import { flatTokens } from './flat-tokens'
import { transformTokens } from './transforms'
import { formats } from './formats'

export async function build(
  config: Config,
  onStart?: (format: string) => void,
  onFinish?: (format: string, files: string[]) => void,
): Promise<void> {
  const themeLayers = await getThemeLayers(config.src, { platforms: config.platforms })
  for (const format in config.formats) {
    onStart && onStart(format)
    const { outDir, fileName, transforms } = config.formats[format]
    // Copy layers for mutate in future.
    const result = deepmerge(themeLayers, {})
    for (const platform in themeLayers) {
      const themeLayer = themeLayers[platform]
      for (const layerKey in themeLayer) {
        const flattenTokens = flatTokens(themeLayer[layerKey].tokens)
        const transformedTokens = transformTokens(flattenTokens, { transforms })
        // @ts-ignore (FIXME: Fix transformTokens return type)
        result[platform][layerKey].tokens = transformedTokens
      }
    }
    // FIXME: Move formats to fn.
    // eslint-disable-next-line camelcase
    const result_to_write = formats[format](result, { fileName })
    const createdFiles = []
    // eslint-disable-next-line camelcase
    for (const file of result_to_write) {
      const destFilePath = resolve(outDir, file.fileName)
      const destFolder = parse(destFilePath).dir
      await ensureDir(destFolder)
      await writeFile(destFilePath, file.content)
      createdFiles.push(join(outDir, file.fileName))
    }
    onFinish && onFinish(format, createdFiles)
  }
}
