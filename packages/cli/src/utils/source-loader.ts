import type { DeepRawToken } from '@yandex/themekit-core'

import { glob } from './glob'
import { readFile } from './file-reader'

export function loadSources(paths: string[], exclude: string[]) {
  let files: string[] = []
  const result: DeepRawToken[] = []

  for (const path of paths) {
    // Use each path separately because glob
    // not save ordering with using patterns for path.
    const entries = glob(path, exclude).sort()
    // Remove exists files from list for save ordering with compicated globs.
    // example:
    // ./tokens/*.tokens.yml
    // ./tokens/*@desktop.tokens.yml
    files = files.filter((value) => !entries.includes(value))
    files.push(...entries)
  }

  for (const file of files) {
    const tokens = readFile<DeepRawToken | null>(file)

    if (tokens) {
      result.push(tokens)
    }
  }

  return result
}
