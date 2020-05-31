import { join } from 'path'
import { readJSON } from 'fs-extra'

type Themes = {
  mappers: string[]
  sources: string[]
}

function resolveRootDir(filePath: string): string {
  return filePath.match(/<rootDir>/)
    ? join(process.cwd(), filePath.replace(/<rootDir>/, ''))
    : filePath
}

export async function loadThemes(sources: string[]): Promise<Themes> {
  const result: Themes = { mappers: [], sources: [] }
  for (const sourcePath of sources) {
    const { mappers = [], sources = [] }: Themes = await readJSON(sourcePath)
    result.mappers.push(...mappers.map(resolveRootDir))
    result.sources.push(...sources.map(resolveRootDir))
  }
  return result
}
