import { Platform } from 'style-dictionary'
import fg from 'fast-glob'

export type Config = {
  entry: Record<string, string>
  output: Record<string, Platform>
}

export async function loadConfig(path: string): Promise<Config> {
  const resolvedPath = fg.sync(path)
  if (resolvedPath.length === 0) {
    throw new Error(`Cannot load config from "${path}", please check path or file are exists.`)
  }
  return require(resolvedPath[0])
}
