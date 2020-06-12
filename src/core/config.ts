import { Platform } from 'style-dictionary'

export type Config = {
  entry: Record<string, string>
  output: Record<string, Platform>
}

export async function loadConfig(path: string): Promise<Config> {
  return require(path)
}
