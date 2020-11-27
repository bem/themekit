import { Platform } from 'style-dictionary'
import fg from 'fast-glob'
import normalize from 'normalize-path'

export type Config = {
  entry: Record<string, string>
  output: Record<string, Platform>
  [key: string]: any
}

export async function loadConfig(
  path: string,
  filters: { entries?: string[]; outputs?: string[]; [key: string]: any },
): Promise<Config> {
  const resolvedPath = fg.sync(normalize(path))
  if (resolvedPath.length === 0) {
    throw new Error(
      `Cannot load config from "${normalize(path)}", please check path or file are exists.`,
    )
  }
  const config: Config = require(resolvedPath[0])
  if (filters.entries !== undefined || filters.outputs !== undefined) {
    const fields = [
      ['outputs', 'output'],
      ['entries', 'entry'],
    ]
    for (const [filter, field] of fields) {
      for (const key in config[field]) {
        if (filters[filter] !== undefined && !filters[filter].includes(key)) {
          delete config[field][key]
        }
      }
    }
  }
  return config
}
