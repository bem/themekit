import { Platforms } from './platforms'

export type Config = {
  src: string
  platforms?: Platforms[]
  formats: {
    [key: string]: {
      outDir: string
      fileName?: string
      transforms: string[]
    }
  }
}

export async function loadConfig(path: string): Promise<Config> {
  return await import(path)
}
