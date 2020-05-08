import { withTokens } from '../../src/index'
import spaceTokens from './external/themes/space.tokens'

export const tokens = {
  // Overrides existing token.
  space100: '20px',
  // Add new token.
  space200: '30px',
}

export type Tokens = typeof tokens

export default withTokens<Tokens>(spaceTokens, ($tokens) => ({
  common: {
    // Add new token.
    checkbox_space_all: $tokens.space100,
  },
  desktop: {
    // Overrides existing token.
    button_space_all: $tokens.space200,
  },
}))(tokens)
