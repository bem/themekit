import StyleDictionaryApi from 'style-dictionary'

import { createWhitepaperConfig } from './whitepaper-config'

export function build(config: any): any {
  const normalizedConfig = Array.isArray(config) ? config : [config]

  for (const themeConfig of normalizedConfig) {
    for (const themeFileConfig of themeConfig.files) {
      let styleDictionaryConfig: any = {}
      if (themeFileConfig.format === 'css/whitepaper') {
        styleDictionaryConfig = createWhitepaperConfig({
          source: themeConfig.source,
          theme: themeConfig.name,
        })
      }
      const StyleDictionary = StyleDictionaryApi.extend(styleDictionaryConfig)
      StyleDictionary.buildPlatform('css')
    }
  }
}
