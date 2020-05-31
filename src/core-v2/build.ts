import './yaml-interop'
import StyleDictionaryApi from 'style-dictionary'
import cssColorFn from 'css-color-function'
import { resolve } from 'path'
import { readFileSync, writeFileSync } from 'fs-extra'

import { createWhitepaperConfig } from './whitepaper-config'
import { variablesWithPrefix } from './variable-with-prefix'
import { getCssModifierWithPlatform } from './utils'
import { loadMappers } from './mappers'
import { loadThemes } from './themes'

const store = new Map()

StyleDictionaryApi.registerFormat({
  name: 'css/whitepaper',
  formatter: (dictionary) => {
    const group = dictionary.allProperties.length ? dictionary.allProperties[0].group : 'unknown'
    const value = store.get('theme')
    const selector = `.Theme_${group}_${value}`
    return `${selector} {\n${variablesWithPrefix('    --', dictionary.allProperties)}\n}\n`
  },
})

StyleDictionaryApi.registerTransform({
  name: 'name/mapper',
  type: 'name',
  transformer: (prop) => {
    const mapper = store.get('mapper') || {}
    return mapper[prop.name] || prop.name
  },
})

StyleDictionaryApi.registerAction({
  name: 'process-color',
  do: (_, config) => {
    for (const file of config.files) {
      if (file.destination.match(/\.css$/) === null) {
        continue
      }
      const filePath = resolve(process.cwd(), config.buildPath, file.destination)
      const colorRe = /color\(.+\)/g
      let content = readFileSync(filePath, 'utf8')
      let executed = null
      while ((executed = colorRe.exec(content)) !== null) {
        content = content.replace(executed[0], cssColorFn.convert(executed[0]))
      }
      writeFileSync(filePath, content)
    }
  },
  undo: () => {},
})

export async function build(config: any): Promise<any> {
  const normalizedConfig = Array.isArray(config) ? config : [config]
  for (const themeConfig of normalizedConfig) {
    const { mappers, sources } = await loadThemes(themeConfig.themes)
    // TODO: Load mappers in themes?
    store.set('mapper', await loadMappers(mappers))
    for (const themeFileConfig of themeConfig.files) {
      let styleDictionaryConfig: any = {}
      if (themeFileConfig.format === 'css/whitepaper') {
        store.set('theme', getCssModifierWithPlatform(themeConfig.name))
        styleDictionaryConfig = createWhitepaperConfig({
          // TODO: Add sort by platform for all sources.
          source: sources,
          theme: themeConfig.name,
          outDir: themeConfig.outDir,
        })
      }
      const StyleDictionary = StyleDictionaryApi.extend(styleDictionaryConfig)
      StyleDictionary.buildPlatform('css')
    }
  }
}
