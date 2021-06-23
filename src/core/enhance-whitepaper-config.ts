import { WhitepaperConfig } from './types'

export function enhanceWhitepaperConfig(
  config: WhitepaperConfig,
  platform: string,
): WhitepaperConfig {
  const result: WhitepaperConfig = {}
  for (const key in config) {
    result[key] = config[key].replace(/\[platform\]/g, platform)
  }
  return result
}
