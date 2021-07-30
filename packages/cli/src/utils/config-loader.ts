import type { Output } from '@yandex/themekit-core'

import { glob } from './glob'
import { NotFoundConfig } from './errors'
import { readFile } from './file-reader'

interface CliOutput extends Output {
  buildPath: string
}

export interface Config {
  /**
   * A set of themes.
   */
  entry: Record<string, string>
  /**
   * A set of output files.
   */
  output: Record<string, CliOutput>
}

/**
 * Loads config with one of available extensions (js, json, yaml).
 *
 * @param path - Config path.
 * @returns Config.
 */
export function loadConfig(path: string): Config {
  // Use glob for get config with one of available extensions.
  const [configPath] = glob(path)

  if (configPath === undefined) {
    throw new NotFoundConfig(configPath)
  }

  const config = readFile<Config>(configPath)

  return config
}
