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
): Promise<any> {
  // TODO: Add tokens validate.
  // TODO: Add avalible transforms validate.
  const themeLayers = await getThemeLayers(config.src, { platforms: config.platforms })
  for (const format in config.formats) {
    onStart && onStart(format)
    const { outDir, options, transforms } = config.formats[format]
    // Copy layers for mutate in future.
    const result = deepmerge(themeLayers, {})
    for (const platform in themeLayers) {
      const xxx = themeLayers[platform]
      for (const q in xxx) {
        const uuu = xxx[q]
        const yyy = flatTokens(uuu.tokens)
        const hhh = transformTokens(yyy, { transforms, ...options })
        // @ts-ignore
        result[platform][q].tokens = hhh
      }
    }
    const result_to_write = formats[format](result, options)
    const createdFiles = []
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
