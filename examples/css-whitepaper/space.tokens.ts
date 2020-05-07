import { withTokens } from '../../src/index'

export const tokens = {
  space_m: '20px',
}

export type Tokens = typeof tokens

export default withTokens<Tokens>(($tokens) => ({
  common: {
    input_space_all: $tokens.space_m,
  },
  desktop: {
    meta: { css: '.Theme_space_desktop' },
    button: {
      space_all: {
        value: $tokens.space_m,
        type: 'size',
        comment: 'Space inside button',
      },
    },
  },
}))(tokens)
