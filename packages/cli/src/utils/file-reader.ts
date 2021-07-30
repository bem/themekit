import { extname } from 'path'
import { readFileSync } from 'fs-extra'
import { parseYaml, parseJson } from '@yandex/themekit-core'

import { UnsupportedExtension } from './errors'

/**
 * Reads file content with one of available extensions (yaml, json or js).
 *
 * @param path - File path.
 * @returns Parsed content.
 */
export function readFile<T>(path: string): T {
  switch (extname(path)) {
    case '.yml':
    case '.yaml':
      return parseYaml(readFileSync(path, 'utf8'), path)
    case '.json':
      return parseJson(readFileSync(path, 'utf8'), path)
    case '.js':
      return require(path)
    default:
      throw new UnsupportedExtension(path)
  }
}
