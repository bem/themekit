import { cssTemplate, esmTemplate, jsonTemplate } from './templates'

function getFileNameWithPlatform(folder: string, platform: string, fileName: string): string {
  if (platform === 'common') {
    return `${folder}/${fileName}`
  }
  return `${folder}/${platform}/${fileName}`
}

type Formats = {
  // TODO: Fix any types.
  [key: string]: (platforms: any, options?: any) =>
    Array<{ fileName: string; content: string }>
}

export const formats: Formats = {
  'css.flat': (platforms, options) => {
    const result = []
    for (const platform in platforms) {
      const layers = platforms[platform]
      const composedTokens = []
      for (const layer in layers) {
        composedTokens.push(...layers[layer].tokens)
      }
      result.push({
        // FIXME: Fix build path.
        fileName: getFileNameWithPlatform('build', platform, options.fileName || 'index.css'),
        content: cssTemplate(composedTokens, ':root'),
      })
    }
    return result
  },
  'css.whitepaper': (platforms, options) => {
    const result = []
    for (const platform in platforms) {
      const layers = platforms[platform]
      for (const layer in layers) {
        const { name, meta, tokens } = layers[layer]
        result.push({
          fileName: getFileNameWithPlatform(name, platform, options.fileName || 'index.css'),
          content: cssTemplate(tokens, meta.css),
        })
      }
    }
    return result
  },
  'json.whitepaper': (platforms, options) => {
    const result = []
    for (const platform in platforms) {
      const layers = platforms[platform]
      for (const layer in layers) {
        const { name, tokens } = layers[layer]
        result.push({
          fileName: getFileNameWithPlatform(name, platform, options.fileName || 'index.json'),
          content: jsonTemplate(tokens),
        })
      }
    }
    return result
  },
  'js.esm': (platforms, options) => {
    const result = []
    for (const platform in platforms) {
      const layers = platforms[platform]
      const composedTokens = []
      for (const layer in layers) {
        composedTokens.push(...layers[layer].tokens)
      }
      result.push({
        // FIXME: Fix build path.
        fileName: getFileNameWithPlatform('build', platform, options.fileName || 'index.js'),
        content: esmTemplate(composedTokens),
      })
    }
    return result
  },
}
