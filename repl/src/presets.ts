export const presets: { [key: string]: {} } = {
  'css-whitepaper': {
    'themekit.config.js': `
      export default {
        src: '',
        platforms: ['desktop'],
        formats: {
          'css.whitepaper': {
            outDir: '',
            transforms: ['name.param', 'color.hex'],
          },
        },
      }
    `,
    'space.tokens.ts': `
      import { withTokens } from '@yandex/themekit'

      export const tokens = {
        color_primary: '#000',
      }

      export type Tokens = typeof tokens

      export default withTokens<Tokens>(($tokens) => ({
        common: {
          meta: { css: '.Theme_color_common' },
          button_bg_color: $tokens.color_primary,
        },
      }))(tokens)
    `,
  },
  'json-whitepaper': {},
}

export const presetsKeys = Object.keys(presets)
