import glob from 'fast-glob'
import { readJSON, readFileSync } from 'fs-extra'
import YAML from 'yaml'

import { normalizePaths } from './utils'

export async function loadMappers(paths: string[]): Promise<any> {
  const result = {}
  for (const file of await glob(normalizePaths(paths))) {
    if (/\.ya?ml$/.test(file)) {
      Object.assign(result, YAML.parse(await readFileSync(file, 'utf8')))
    } else {
      Object.assign(result, await readJSON(file))
    }
  }
  return result
}
