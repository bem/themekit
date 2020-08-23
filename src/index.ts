import StyleDictionary from 'style-dictionary'

export const Api = {
  registerFormat: StyleDictionary.registerFormat.bind(StyleDictionary),
  registerTransform: StyleDictionary.registerTransform.bind(StyleDictionary),
  registerAction: StyleDictionary.registerAction.bind(StyleDictionary),
  registerFilter: StyleDictionary.registerFilter.bind(StyleDictionary),
}

/**
 * @internal
 */
export const InternalApi = {
  extend: StyleDictionary.extend.bind(StyleDictionary),
}
