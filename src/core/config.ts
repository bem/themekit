import { Platforms } from './platforms'

// TODO: update readme
export type Config = {
  /**
   * Tokens sources
   */
  src: string
  /**
   * Platforms
   */
  platforms?: Platforms
  /**
   * Formats
   */
  formats: {
    [key: string]: {
      /**
       * Result build
       */
      outDir: string
      /**
       * Result fiflename
       */
      fileName?: string
      /**
       * Applied transformation for tokens
       */
      transforms: string[]
    }
  }
}

export async function loadConfig(path: string): Promise<Config> {
  return await import(path)
}
