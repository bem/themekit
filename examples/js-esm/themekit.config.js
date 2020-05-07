/**
 * @type {import('@yandex/themekit/lib/core/config').Config}
 */
module.exports = {
  src: ['./*.tokens.ts'],
  platforms: ['desktop'],
  formats: {
    'js.esm': {
      outDir: './',
      transforms: ['name.const', 'color.hex'],
    },
  },
}
