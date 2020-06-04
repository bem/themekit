import { getFolderWithPlatform } from './utils'

const whitepaper = ['space', 'size', 'capacity', 'cosmetic', 'color']

export function createWhitepaperConfig({ source, theme, outDir }: any): any {
  return {
    include: source,
    platforms: {
      css: {
        buildPath: outDir.endsWith('/') ? outDir : `${outDir}/`,
        transforms: ['attribute/cti', 'time/seconds', 'color/css', 'name/cti/kebab', 'name/mapper'],
        actions: ['process-color'],
        files: whitepaper.map((file: any) => ({
          destination: `${getFolderWithPlatform(theme)}/${file}.css`,
          format: 'css/whitepaper',
          filter: (token: any) => token.group === file,
        })),
      },
    },
  }
}
