import { deepClone } from './utils'
import { Platforms } from './types'

export function performActions(platforms: Platforms) {
  const result: Platforms = {}

  for (let [key, { dictionary, platform, ...rest }] of Object.entries(platforms)) {
    result[key] = {
      platform,
      dictionary: platform.actions.reduce((acc, action) => action.do(acc), deepClone(dictionary)),
      ...rest,
    }
  }

  return result
}
