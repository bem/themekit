/**
 * @type {import('@yandex/themekit/lib/core/config').Config}
 */
module.exports = {
  src: ['./*.tokens.ts'],
  platforms: ['desktop'],
  formats: {
    'css.whitepaper': {
      outDir: './',
      transforms: ['name.param', 'color.hex'],
    },
  },
}
