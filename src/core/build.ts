import { writeFile, ensureDir } from 'fs-extra'
import { resolve } from 'path'
import deepmerge from 'deepmerge'

import { Config } from './project-config'
import { getThemeLayers } from './theme-layers'
import { flatTokens } from './flat-tokens'
import { transformTokens } from './transforms'
import { formats } from './formats'

export async function build(options: Config): Promise<any> {
  // TODO: Add tokens validate.
  // TODO: Add avalible transforms validate.
  const themeLayers = await getThemeLayers(options.rootDir, { platforms: options.platforms, exclude: options.exclude })
  for (const format in options.formats) {
    // @ts-ignore
    const { options, transforms } = options.formats[format]
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
      await ensureDir(resolve(process.cwd(), options.rootDir, 'build'))
      await writeFile(resolve(process.cwd(), options.rootDir, 'build', file.fileName), file.content)
    }
  }
}
