const whitepaper = {
  space: '',
  size: '',
  capacity: '',
  cosmetic: '',
  color: '',
}

export function createWhitepaperConfig({ source, theme }: any): any {
  return {
    source,
    platforms: {
      css: {
        buildPath: 'build/',
        transformGroup: 'css',
        files: Object.keys(whitepaper).map((file: any) => ({
          destination: `${theme}/${file}.css`,
          format: 'css/variables',
          filter: (token: any) => token.group === file,
        })),
      },
    },
  }
}
