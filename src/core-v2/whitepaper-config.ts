import { getFolderWithPlatform } from './utils'

const whitepaper = {
  space: '',
  size: '',
  capacity: '',
  cosmetic: '',
  color: '',
}

export function createWhitepaperConfig({ source, theme, outDir }: any): any {
  return {
    source,
    platforms: {
      css: {
        buildPath: outDir.endsWith('/') ? outDir : `${outDir}/`,
        transformGroup: 'css',
        files: Object.keys(whitepaper).map((file: any) => ({
          destination: `${getFolderWithPlatform(theme)}/${file}.css`,
          format: 'css/whitepaper',
          filter: (token: any) => token.group === file,
        })),
      },
    },
  }
}
