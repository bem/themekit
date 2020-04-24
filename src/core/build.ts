import { writeFile, ensureDir } from 'fs-extra'
import { resolve } from 'path'
import deepmerge from 'deepmerge'

import { Config } from './project-config'
import { getThemeLayers } from './theme-layers'
import { flatTokens } from './flat-tokens'
import { transformTokens } from './transforms'
import { formats } from './formats'

export async function build(config: Config): Promise<any> {
  // TODO: Add tokens validate.
  // TODO: Add avalible transforms validate.
  // TODO: Add header for generated files with date/ts.
  const themeLayers = await getThemeLayers(config.src, { platforms: config.platforms, exclude: config.exclude })
  for (const format in config.formats) {
    // @ts-ignore
    const { options, transforms } = config.formats[format]
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
    for (const file of result_to_write) {
      // TODO: build dir should be configurated
      await ensureDir(resolve(process.cwd(), config.outDir, 'tokens'))
      await writeFile(resolve(process.cwd(), config.outDir, 'tokens', file.fileName), file.content)
    }
  }
}
