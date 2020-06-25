import './yaml-interop'
import StyleDictionaryApi, { Property } from 'style-dictionary'
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
import { isColor } from './utils'

const store = new Map()

StyleDictionaryApi.registerFormat({
  name: 'css/whitepaper',
  formatter: (dictionary) => {
    const whitepaper = store.get('whitepaper')
    const group = dictionary.allProperties.length ? dictionary.allProperties[0].group : 'unknown'
    const selector = `.Theme_${group}_${whitepaper[group]}`
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

const isTypographyCategory = (prop: Property) => {
  const category = prop.attributes.category
  return category === 'fontSize' || category === 'lineHeight'
}

StyleDictionaryApi.registerTransform({
  name: 'yaTypography/rem',
  type: 'value',
  matcher: isTypographyCategory,
  transformer: (prop) => {
    const {
      value,
    } = prop

    if (typeof value === 'number') {
      return `${value}rem`
    }

    return value
  },
})

StyleDictionaryApi.registerFilter({
  name: 'whitepaper/color',
  matcher: (prop) => {
    if (isColor(prop.value)) {
      prop.group = 'color'
      return true
    }
    return false
  },
})

StyleDictionaryApi.registerFilter({
  name: 'whitepaper/root',
  matcher: (prop) => {
    if (!isColor(prop.value)) {
      prop.group = 'root'
      return true
    }
    return false
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
  for (const entry in config.entry) {
    const theme = await loadTheme(config.entry[entry])
    for (const platform of theme.platforms) {
      // TODO: Load sources in themes?
      const sources = await loadSources(theme.sources, platform)

      // TODO: Load mappers in themes?
      store.set('mapper', await loadMappers(theme.mappers))
      store.set('whitepaper', theme.whitepaper)

      const StyleDictionary = StyleDictionaryApi.extend(
        createStyleDictionaryConfig({
          platform: platform,
          sources: sources,
          entry: entry,
          output: config.output,
        }),
      )

      StyleDictionary.properties = dedupeProps(StyleDictionary.properties)
      StyleDictionary.buildAllPlatforms()
    }
  }
}
