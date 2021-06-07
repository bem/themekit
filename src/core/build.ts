import './yaml-interop'
import cssColorFn from 'css-color-function'
import { resolve } from 'path'
import { readFileSync, writeFileSync } from 'fs-extra'

import { Api, InternalApi } from '../index'
import { createStyleDictionaryConfig } from './style-dictionary-config'
import { variablesWithPrefix } from './variablesWithPrefix'
import { loadMappers } from './mappers'
import { loadTheme } from './loadTheme'
import { dedupeProps } from './dedupe-props'
import { loadSources } from './load-sources'
import { Config } from './config'
import { isColor } from './utils'
import { enhanceWhitepaperConfig } from './enhance-whitepaper-config'
import { replaceAliasToVariable } from './replace-alias-to-variable'
import { deprecate } from './deprecate'

const context = new Map()

Api.registerFormat({
  name: 'css/whitepaper',
  formatter(dictionary, config) {
    deprecate(
      'Warning: css/whitepaper format is deprecated, ' +
        'you should use css/variables format instead.\n' +
        'See more information for migration: https://github.com/bem/themekit/tree/master/docs/migrations/0077.md',
    )

    const defaultOptions = { useAliasVariables: false }
    const options = Object.assign(defaultOptions, this.options)

    const whitepaper = context.get('whitepaper')
    const group = dictionary.allProperties.length ? dictionary.allProperties[0].group : 'unknown'
    const selector = `.Theme_${group}_${whitepaper[group]}`

    const transformers = config.transforms.filter((transform) => transform.type === 'name')

    const props = options.useAliasVariables
      ? replaceAliasToVariable(dictionary.allProperties, transformers)
      : dictionary.allProperties

    return `${selector} {\n${variablesWithPrefix('    --', props)}\n}\n`
  },
})

// NOTE: Override default css/variables format.
Api.registerFormat({
  name: 'css/variables',
  formatter(dictionary, config) {
    const defaultOptions = { selector: ':root', useAliasVariables: false }
    const options = Object.assign(defaultOptions, this.options)
    const { entry, platform } = this.context
    const selector = options.selector
      .replace(/\[entry\]/g, entry)
      .replace(/\[platform\]/g, platform)

    const transformers = config.transforms.filter((transform) => transform.type === 'name')

    const props = options.useAliasVariables
      ? replaceAliasToVariable(dictionary.allProperties, transformers)
      : dictionary.allProperties

    return `${selector} {\n${variablesWithPrefix('    --', props)}\n}\n`
  },
})

Api.registerTransform({
  name: 'name/mapper',
  type: 'name',
  transformer: (prop) => {
    const mapper = context.get('mapper') || {}
    return mapper[prop.name] || prop.name
  },
})

Api.registerFilter({
  name: 'whitepaper/color',
  matcher: (prop) => {
    if (isColor(prop.value)) {
      prop.group = 'color'
      return true
    }
    return false
  },
})

Api.registerFilter({
  name: 'whitepaper/root',
  matcher: (prop) => {
    if (!isColor(prop.value)) {
      prop.group = 'root'
      return true
    }
    return false
  },
})

Api.registerAction({
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

Api.registerPreset({
  name: 'css',
  transforms: ['name/cti/kebab', 'name/mapper'],
  actions: ['process-color'],
})

export type BuildResult = Record<
  string,
  {
    dictionary: any
    platform: any
  }
>

export async function build(config: Config): Promise<BuildResult> {
  let result = {}

  for (const entry in config.entry) {
    const theme = await loadTheme(config.entry[entry])
    for (const platform of theme.platforms) {
      // TODO: Load sources in themes?
      const sources = await loadSources(theme.sources, platform)

      // TODO: Load mappers in themes?
      context.set('mapper', await loadMappers(theme.mappers))
      context.set('whitepaper', enhanceWhitepaperConfig(theme.whitepaper, platform))

      const StyleDictionary = InternalApi.extend(
        createStyleDictionaryConfig({
          platform: platform,
          sources: sources,
          entry: entry,
          output: config.output,
        }),
      )

      StyleDictionary.properties = dedupeProps(StyleDictionary.properties)
      result = { ...result, ...StyleDictionary.buildAllPlatforms() }
    }
  }

  return result
}
