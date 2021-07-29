import type { Preset } from '../types'

export const cssPreset: Preset = {
  name: 'css',
  transforms: ['name/param-case', 'name/alias', 'value/color-function'],
}
