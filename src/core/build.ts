import './yaml-interop'
import StyleDictionaryApi from 'style-dictionary'
import cssColorFn from 'css-color-function'
import { resolve } from 'path'
import { readFileSync, writeFileSync } from 'fs-extra'

import { createStyleDictionaryConfig } from './style-dictionary-config'
import { variablesWithPrefix } from './variable-with-prefix'
import { loadMappers } from './mappers'
import { loadTheme } from './load-theme'
import { dedupeProps } from './dedupe-props'
import { loadSources } from './load-sources'
import { Config } from './config'

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

export async function build(config: Config): Promise<void> {
  const normalizedConfig: Config[] = Array.isArray(config) ? config : [config]
  for (const themeConfig of normalizedConfig) {
    for (const entryKey in themeConfig.entry) {
      const theme = await loadTheme(themeConfig.entry[entryKey])
      for (const platform of theme.platforms) {
        // TODO: Load sources in themes?
        const sources = await loadSources(theme.sources, platform)
        // TODO: Load mappers in themes?
        store.set('mapper', await loadMappers(theme.mappers))
        for (const _themeFileConfig of themeConfig.output.files) {
          store.set('whitepaper', theme.whitepaper)
          const styleDictionaryConfig = createStyleDictionaryConfig({
            platform: platform,
            source: sources,
            theme: entryKey,
            outDir: themeConfig.output.path,
            whitepaper: theme.whitepaper,
          })
          const StyleDictionary = StyleDictionaryApi.extend(styleDictionaryConfig)
          StyleDictionary.properties = dedupeProps(StyleDictionary.properties)
          StyleDictionary.buildPlatform('css')
        }
      }
    }
  }
}
