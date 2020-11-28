import StyleDictionary from 'style-dictionary'

import { Preset } from './index.h'

export const Api = {
  registerFormat: StyleDictionary.registerFormat.bind(StyleDictionary),
  registerTransform: StyleDictionary.registerTransform.bind(StyleDictionary),
  registerAction: StyleDictionary.registerAction.bind(StyleDictionary),
  registerFilter: StyleDictionary.registerFilter.bind(StyleDictionary),

  /**
   * Map with registered presets
   *
   * @internal
   */
  presets: new Map<string, Preset>(),

  /**
   * Add new or override existing preset
   *
   * @param preset - Preset settings
   */
  registerPreset: (preset: Preset): void => {
    Api.presets.set(preset.name, preset)
  },
}

/**
 * @internal
 */
export const InternalApi = {
  extend: StyleDictionary.extend.bind(StyleDictionary),
}
