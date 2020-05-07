import { withTokens } from '../../src/index'

export const tokens = {
  color_primary: '#000',
}

export type Tokens = typeof tokens

export default withTokens<Tokens>(($tokens) => ({
  common: {
    meta: { css: '.Theme_color_common' },
    button_bg_color: `color(${$tokens.color_primary} a(15%) })`,
  },
}))(tokens)
