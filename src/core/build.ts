import './yaml-interop'
import cssColorFn from 'css-color-function'

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
import { Platforms } from './types'
import { performActions } from './perfomActions'

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
  // We need to apply the cssColorFn to the value.
  // Also should retain the original value unchanged
  do: (dictionary) => {
    const content = JSON.stringify(dictionary)

    return JSON.parse(content, (key, value) => {
      // When meet key "value" return original and converted versions
      if (key === 'value') {
        let convertedValue = value

        const colorRe = /color\(.+\)/g
        let executed
        while ((executed = colorRe.exec(convertedValue)) !== null) {
          convertedValue = convertedValue.replace(executed[0], cssColorFn.convert(executed[0]))
        }

        return {
          original: value,
          value: convertedValue,
        }
      }

      // If the value has "value" key, spread the original and converted values
      if (value.value) {
        return {
          ...value,
          ...value.value,
        }
      }

      return value
    })
  },
  undo: () => {},
})

Api.registerPreset({
  name: 'css',
  transforms: ['name/cti/kebab', 'name/mapper'],
  actions: ['process-color'],
})

export async function build(config: Config): Promise<Platforms> {
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

  return performActions(result)
}
