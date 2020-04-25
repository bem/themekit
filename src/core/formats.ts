import { cssTemplate, esmTemplate } from './templates'

function getFileNameWithPlatform(fileName: string, platform: string, extension: string): string {
  if (platform === 'common') {
    return `${fileName}/index.${extension}`
  }
  return `${fileName}/${platform}/index.${extension}`
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
        fileName: getFileNameWithPlatform(options.fileName, platform, 'css'),
        content: cssTemplate(composedTokens, ':root'),
      })
    }
    return result
  },
  'css.whitepaper': (platforms) => {
    const result = []
    for (const platform in platforms) {
      const layers = platforms[platform]
      for (const layer in layers) {
        const { name, meta, tokens } = layers[layer]
        result.push({
          fileName: getFileNameWithPlatform(name, platform, 'css'),
          content: cssTemplate(tokens, meta.css),
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
        fileName: getFileNameWithPlatform(options.fileName, platform, 'js'),
        content: esmTemplate(composedTokens),
      })
    }
    return result
  },
}
