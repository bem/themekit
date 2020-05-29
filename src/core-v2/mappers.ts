import glob from 'fast-glob'
import { readJSON } from 'fs-extra'

export async function loadMappers(path: string): Promise<any> {
  const result = {}
  for (const file of await glob(path)) {
    Object.assign(result, await readJSON(file))
  }
  return result
}
