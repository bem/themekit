import './yaml-interop'
import StyleDictionaryApi from 'style-dictionary'
import cssColorFn from 'css-color-function'
import { resolve } from 'path'
import { readFileSync, writeFileSync } from 'fs-extra'

import { createWhitepaperConfig } from './whitepaper-config'
import { variablesWithPrefix } from './variable-with-prefix'
import { loadMappers } from './mappers'
import { loadThemes } from './themes'
import { dedupeProps } from './dedupe-props'

const store = new Map()

StyleDictionaryApi.registerFormat({
  name: 'css/whitepaper',
  formatter: (dictionary) => {
    const group = dictionary.allProperties.length ? dictionary.allProperties[0].group : 'unknown'
    const whitepaper = store.get('whitepaper')
    const selector = `.Theme_${group}_${whitepaper[group]}`
    // TODO: Add comment with path for dev mode.
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
    const { mappers, sources, whitepaper } = await loadThemes(themeConfig.themes)
    // TODO: Load mappers in themes?
    store.set('mapper', await loadMappers(mappers))
    for (const themeFileConfig of themeConfig.files) {
      let styleDictionaryConfig: any = {}
      if (themeFileConfig.format === 'css/whitepaper') {
        store.set('whitepaper', whitepaper)
        styleDictionaryConfig = createWhitepaperConfig({
          // TODO: Add sort by platform for all sources.
          source: sources,
          theme: themeConfig.name,
          outDir: themeConfig.outDir,
        })
      }
      const StyleDictionary = StyleDictionaryApi.extend(styleDictionaryConfig)
      StyleDictionary.properties = dedupeProps(StyleDictionary.properties)
      StyleDictionary.buildPlatform('css')
    }
  }
}
