import { join } from 'path'
import { readJsonSync } from 'fs-extra'

type Config = {
  platforms: {}
}

export async function getProjectConfig(source: string, configName: string): Promise<Config> {
  return readJsonSync(join(source, configName))
}
