import { withTokens } from '../../src/index'

export const tokens = {
  space100: '20px',
}

export type Tokens = typeof tokens

export default withTokens<Tokens>(($tokens) => ({
  common: {
    input_space_all: $tokens.space100,
  },
  desktop: {
    button: {
      space_all: {
        value: $tokens.space100,
        type: 'size',
        comment: 'Space inside button',
      },
    },
  },
}))(tokens)
