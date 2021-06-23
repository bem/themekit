import './yaml-interop'
import cssColorFn from 'css-color-function'

import { Api, InternalApi } from '../index'
import { createStyleDictionaryConfig } from './style-dictionary-config'
import { variablesWithPrefix } from './variablesWithPrefix'
import { dedupeProps } from './dedupe-props'
import { isColor } from './utils'
import { replaceAliasToVariable } from './replace-alias-to-variable'
import { deprecate } from './deprecate'
import { performActions } from './perfomActions'
import { Platforms, Data } from './types'

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

Api.registerFormat({
  name: 'json/extended',
  formatter(dictionary) {
    const result: Record<string, any> = {}
    console.log(dictionary)
    for (const prop of dictionary.allProperties) {
      result[prop.name] = {
        name: prop.name,
        value: prop.value,
        rawValue: prop.original.value,
        path: prop.path,
        comment: prop.comment,
      }
    }
    return JSON.stringify(result, null, 2)
  },
})

Api.registerTransform({
  name: 'json/extended/mapper',
  type: 'name',
  transformer: (prop) => {
    return context.get('mapper')[prop.name] || prop.name
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

        const colorRe = /color\((?!{).+\)/g
        let executed
        while ((executed = colorRe.exec(convertedValue)) !== null) {
          convertedValue = convertedValue.replace(executed[0], cssColorFn.convert(executed[0]))
        }

        return convertedValue
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

export async function build(data: Data): Promise<Platforms> {
  let result = {}

  data.forEach((el: any) => {
    const { sources, mapper, whitepaper, platform, entry, output, properties } = el

    context.set('mapper', mapper)
    context.set('whitepaper', whitepaper)

    const StyleDictionary = InternalApi.extend(
      createStyleDictionaryConfig({
        platform,
        sources,
        entry,
        output,
        properties,
      }),
    )

    StyleDictionary.properties = dedupeProps(StyleDictionary.properties)
    result = { ...result, ...StyleDictionary.buildAllPlatforms() }
  })

  return performActions(result)
}
