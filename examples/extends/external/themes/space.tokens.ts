import { withTokens } from '../../../../src/index'

export const tokens = {
  space100: '10px',
}

export type Tokens = typeof tokens

export default withTokens<Tokens>(($tokens) => ({
  common: {
    input_space_all: $tokens.space100,
  },
  desktop: {
    button_space_all: $tokens.space100,
  },
}))(tokens)
