import StyleDictionary from './vendors/style-dictionary'

import { withDeprecated } from './core/deprecate'
import { Preset } from './index.h'

const Themekit = {
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
    Themekit.presets.set(preset.name, preset)
  },
}

const Api = withDeprecated(
  Themekit,
  'Warning: Named import "Api" is deprecated, use default import instead.',
)

export { Api }
module.exports = Themekit
