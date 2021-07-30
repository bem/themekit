import { glob } from './glob'
import { readFile } from './file-reader'

type Aliases = Record<string, string>

/**
 * Loads theme aliases.
 */
export function loadAliases(paths: string[]): Aliases {
  const result = {}
  const files = glob(paths)

  for (const file of files) {
    const aliases = readFile<Aliases | null>(file)

    if (aliases) {
      Object.assign(result, aliases)
    }
  }

  return result
}
