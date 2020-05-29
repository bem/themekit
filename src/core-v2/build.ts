import StyleDictionaryApi from 'style-dictionary'

import { createWhitepaperConfig } from './whitepaper-config'
import { variablesWithPrefix } from './variable-with-prefix'
import { getCssModifierWithPlatform } from './utils'

const store = new Map()

StyleDictionaryApi.registerFormat({
  name: 'css/whitepaper',
  formatter: (dictionary) => {
    const group = dictionary.allProperties.length ? dictionary.allProperties[0].group : 'unknown'
    const value = store.get('theme')
    const selector = `.Theme_${group}_${value}`
    return `${selector} {\n${variablesWithPrefix('     --', dictionary.allProperties)} \n}\n`
  },
})

export function build(config: any): any {
  const normalizedConfig = Array.isArray(config) ? config : [config]

  for (const themeConfig of normalizedConfig) {
    for (const themeFileConfig of themeConfig.files) {
      let styleDictionaryConfig: any = {}
      if (themeFileConfig.format === 'css/whitepaper') {
        store.set('theme', getCssModifierWithPlatform(themeConfig.name))
        styleDictionaryConfig = createWhitepaperConfig({
          source: themeConfig.source,
          theme: themeConfig.name,
          outDir: themeConfig.outDir,
        })
      }
      const StyleDictionary = StyleDictionaryApi.extend(styleDictionaryConfig)
      StyleDictionary.buildPlatform('css')
    }
  }
}
