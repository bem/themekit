import glob from 'fast-glob'
import { readJSON, readFileSync } from 'fs-extra'
import YAML from 'yaml'

export async function loadMappers(path: string): Promise<any> {
  const result = {}
  for (const file of await glob(path)) {
    if (/\.ya?ml$/.test(file)) {
      Object.assign(result, YAML.parse(await readFileSync(file, 'utf8')))
    } else {
      Object.assign(result, await readJSON(file))
    }
  }
  return result
}
