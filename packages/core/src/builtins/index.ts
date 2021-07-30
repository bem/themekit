import type { Context } from '../types'

// All builtin formats.
import { formatToCssVariables } from './css-variables-format'
import { formatToFlatJson } from './flat-json-format'
// All builtin transformers.
import { transformNameToParamcase } from './name-param-case-transform'
import { transformValueWithColorFn } from './value-color-function-transform'
import { transformNameToAlias } from './name-alias-transform'
// All builtin filters.
import { isValueColorFilter } from './is-value-color-filter'
import { isValueNotColorFilter } from './is-value-not-color-filter'
// All builtin presets.
import { cssPreset } from './css-preset'

export function registerBuiltins(context: Context) {
  // Register builins formats.
  context.registerFormat(formatToCssVariables)
  context.registerFormat(formatToFlatJson)

  // Register builins transforms.
  context.registerTransform(transformNameToParamcase)
  context.registerTransform(transformValueWithColorFn)
  context.registerTransform(transformNameToAlias)

  // Register builins filters.
  context.registerFilter(isValueColorFilter)
  context.registerFilter(isValueNotColorFilter)

  // Register builins presets.
  context.registerPreset(cssPreset)
}
