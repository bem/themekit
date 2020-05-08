# @yandex/themekit

Themkit is a build system for design-tokens on any platform. This system is based on redefinition levels, which allows you to describe platform-specific values in a single place. Themkit provides you to extend existing themes in order to supplement or redefine existing tokens, it also allows you to use the basic theme set and add it to the service.

## Contents

- [Features](#features)
- [Installation](#installation)
- [Getting start](#getting-start)
- [Configuration](#configuration)
- [Examples](#examples)
- [Tokens](#tokens)
- [Extending](#extending)
- [License](#license)

## Features

- 📚 Define tokens once and get result for any format, for example js, css or json.
- 🛠 Every part of the theme or some of the tokens is extendable and overridable.
- 💻 Tokens may be defined for each platforms, for example desktop and touch.
- 🔍 Supports typescript extension with type checking.
- 🏗️ Available extends for new formats or transformations.

## Installation

```sh
# via npm
npm i -DE @yandex/themekit
# or yarn
yarn add --dev @yandex/themekit
```

## Getting start

You can use Themekit as cli or node api.

### cli

Build tokens for all formats:

```sh
themekit build
```

Call this in the root directory of your project. The only thing needed is a `themekit.config.js` file. There are also arguments:

| Flag               | Description |
| ------------------ | ----------- |
| --config -c [path] | —           |
| --help             | —           |
| --version          | —           |

### node

Coming soon.

## Configuration

```ts
type Platforms = 'common' | 'deskpad' | 'desktop' | 'touch' | 'touch-pad' | 'touch-phone'

type Config = {
  src: string
  platforms?: Platforms
  formats: {
    [key: string]: {
      outDir: string
      fileName?: string
      transforms: string[]
    }
  }
}
```

You can add your own formats, platforms and transforms, see more at [extending](#extending) section.

### platforms

Each platform contains one or more levels, and tokens declared on these levels will be combined in this specified order.

Default set of available platforms:

| platform    | levels                               |
| ----------- | ------------------------------------ |
| common      | common                               |
| deskpad     | common + deskpad                     |
| desktop     | common + deskpad + desktop           |
| touch       | common + touch                       |
| touch-pad   | common + deskpad + touch + touch-pad |
| touch-phone | common + touch + touch-phone         |

### formats

Formats are responsible for the type and content of files.

#### css.whitepaper

Coming soon.

#### json.whitepaper

Coming soon.

#### css.flat

Coming soon.

#### js.esm

Coming soon.

### transforms

Transforms are responsible for changing tokens names and values. It depends on the type.

#### name.param

Convert token name to `param-case` for usage at `css` or `json`, example:

```sh
# input
button_space_all: '20px'
# output
button-space-all: '20px'
```

#### name.const

Convert token name to `CONST_CASE` for usage at `js`, example:

```sh
# input
button_space_all: '20px'
# output
BUTTON_SPACE_ALL: '20px'
```

#### color.hex

Convert color to hex format or use rgba scheme, you can also process color by hsl scheme, for example:

```sh
# input
button_bg_color: 'color(#04b h(+22) s(-80%) l(+13%))'
# output
button_bg_color: 'rgb(102, 102, 153)'
```

## Examples

More examples you can see in [examples][examples].

### platforms merging

Each platform contains one or more levels, and tokens declared on these levels will be combined in this specified order for current [platform](#platforms).

theme with tokens for desktop and touch platforms:

```ts
import { withTokens } from '@yandex/themekit'

export default withTokens(() => ({
  common: {
    button_space_all: '10px',
    input_space_all: '10px',
  },
  desktop: {
    button_space_all: '20px',
  },
  touch: {
    button_space_all: '30px',
  },
}))
```

after build you getting next files:

```css
/* src/themes/build/desktop/index.css */
:root {
  --input-space-all: 10px;
  --button-space-all: 20px;
}
```

```css
/* src/themes/build/touch/index.css */
:root {
  --input-space-all: 10px;
  --button-space-all: 30px;
}
```

### themes extending

If necessary, you can extends or overrides an existing theme, you can also override base tokens.

base theme:

```ts
import { withTokens } from '@yandex/themekit'

export const tokens = {
  space100: '20px',
}

export type Tokens = typeof tokens

export default withTokens<Tokens>(($tokens) => ({
  common: {
    input_space_all: $tokens.space100,
  },
}))(tokens)
```

extended theme:

```ts
import { withTokens } from '@yandex/themekit'
import spaceTokens, { Tokens } from 'themes/tokens/space.tokens'

export const tokens = {
  space100: '10px',
}

export default withTokens<Tokens>(spaceTokens, ($tokens) => ({
  common: {
    button_space_all: $tokens.space100,
  },
}))(tokens)
```

result file with merged and overrides tokens:

```css
/* src/themes/build/desktop/index.css */
:root {
  --input-space-all: 10px;
  --button-space-all: 10px;
}
```

## Tokens

A token may full or short record, and may be nested:

```ts
type Primitive = string | number

type Token = {
  value: Primitive
  type: 'color' | 'size' | 'unknown'
  comment?: string
}

type TokensMap = {
  [key: string]: TokensMap | Token | Primitive
}
```

full record:

```js
button_space_all: {
  value: '20px',
  type: 'size',
  comment: 'Space inside button',
},
```

short record:

```js
button_space_all: '20px',
```

nested record:

```js
button: {
  space: {
    all: '20px',
  },
},
```

## Extending

Coming soon.

## License

[MPL-2.0][license]

[license]: https://github.com/yarastqt/themekit/blob/master/LICENSE.md
[examples]: https://github.com/yarastqt/themekit/tree/master/examples
