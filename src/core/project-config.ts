import { join } from 'path'
import { readJsonSync } from 'fs-extra'

import { Platforms } from './platforms'

export type Config = {
  src: string
  platforms?: Platforms
  formats: {
    [key: string]: {
      outDir: string
      transforms: string[]
      options?: {}
    }
  }
}

export async function getProjectConfig(source: string, configName: string): Promise<Config> {
  return readJsonSync(join(source, configName))
}
