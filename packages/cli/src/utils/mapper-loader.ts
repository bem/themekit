import { readFile } from './file-reader'
import { glob } from './glob'

type Mapper = Record<string, string>

/**
 *
 */
export function loadMapper(paths: []): Mapper {
  const result = {}
  const files = glob(paths)

  for (const file of files) {
    const tokens = readFile<Mapper | null>(file)

    if (tokens) {
      Object.assign(result, tokens)
    }
  }

  return result
}
