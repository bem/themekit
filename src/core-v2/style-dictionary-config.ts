export function createStyleDictionaryConfig({
  source,
  theme,
  outDir,
  platform,
  whitepaper,
}: any): any {
  const themeFolder = platform === 'common' ? theme : `${theme}/${platform}`
  return {
    include: source,
    platforms: {
      css: {
        buildPath: outDir.endsWith('/') ? outDir : `${outDir}/`,
        transforms: ['attribute/cti', 'time/seconds', 'color/css', 'name/cti/kebab', 'name/mapper'],
        actions: ['process-color'],
        files: Object.keys(whitepaper).map((file: any) => ({
          destination: `${themeFolder}/${file}.css`,
          format: 'css/whitepaper',
          filter: (token: any) => token.group === file,
        })),
      },
    },
  }
}
