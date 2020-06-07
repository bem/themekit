[![themekit](https://user-images.githubusercontent.com/7934638/83977761-b6831600-a90b-11ea-84a4-8c4dd3b60cc1.png)](https://github.com/yarastqt/themekit)

Themkit is a build system for design-tokens on any platform. This system is based on redefinition levels, which allows you to describe platform-specific values in a single place. Themkit provides you to extend existing themes in order to supplement or redefine existing tokens, it also allows you to use the basic theme set and add it to the service.

## Contents

- [Features](#features)
- [Installation](#installation)
- [Getting start](#getting-start)
- [Configuration](#configuration)
- [Example](#example)
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
npmi i -DE @yandex/themekit
# or yarn
yarn add --dev @yandex/themekit
```

## Getting start

You can use Themekit as cli or node api.

### cli

Builds tokens for configured formats:

```sh
themekit build
```

Call this in the root directory of your project. The only thing needed is a `themekit.config.js` file. There are also arguments:

| Flag               | Description                         |
| ------------------ | ----------------------------------- |
| --config -c [path] | The path to a themekit config file. |
| --help             | Show help with usage.               |
| --version          | Show current package version.       |

### node

Coming soon.

## Configuration

```ts
type Config = {
  src: string
  platforms?: 'common' | 'deskpad' | 'desktop' | 'touch' | 'touch-pad' | 'touch-phone'
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

| platform    | levels                            |
| ----------- | --------------------------------- |
| common      | common                            |
| deskpad     | common, deskpad                   |
| desktop     | common, deskpad, desktop          |
| touch       | common, touch                     |
| touch-pad   | common, deskpad, touch, touch-pad |
| touch-phone | common, touch, touch-phone        |

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

Transforms are responsible for changing tokens' names and values. It depends on the type.

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

## Example

More examples you can see in [examples][examples].

Consider case with `css.whitepaper` format:

### prepare fs

It doesn't matter where you put your files on the fs. Here is our example of how we do it:

```
├── themekit.config.js
└── src
    └── themes
        └── tokens
            ├── capacity.tokens.ts
            ├── color.tokens.ts
            ├── cosmetic.tokens.ts
            ├── size.tokens.ts
            └── space.tokens.ts
```

### themekit.config.js

Add base config with `css.whitepaper` format and `css.name` and `color.nex` transforms:

```js
/**
 * @type {import('@yandex/themekit/lib/core/config').Config}
 */
module.exports = {
  src: ['./src/themes/tokens/*.tokens.ts'],
  platforms: ['desktop'],
  formats: {
    'css.whitepaper': {
      outDir: './src/themes',
      transforms: ['name.param', 'color.hex'],
    },
  },
}
```

### theme tokens

Add tokens for two platforms `common` and `desktop`, we also need to add meta section for define result CSS selector:

```ts
// src/themes/tokens/space.tokens.ts
import { withTokens } from '@yandex/themekit'

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
    button_space_all: $tokens.space_m,
  },
}))(tokens)
```

### result

Here is the result:

```
├── themekit.config.js
└── src
    └── themes
        ├── space.tokens
        │   └── desktop
        │       └── index.css
        └── tokens
            └── space.tokens.ts
```

and file with styles:

```css
/* src/themes/space.tokens/desktop/index.css */
.Theme_space_desktop {
  --input-space-all: 20px;
  --button-space-all: 20px;
}
```

## Tokens

### interface

A token may full or short record, and may be nested:

```ts
type Primitive = string | number
type TokenType = 'color' | 'size' | 'unknown'

type Token = {
  value: Primitive
  type: TokenType
  comment?: string
}

type TokensMap = {
  [key: string]: TokensMap | Token | Primitive
}
```

full:

```js
button_space_all: {
  value: '20px',
  type: 'size',
  comment: 'Space inside button',
},
```

short:

```js
button_space_all: '20px',
```

nested:

```js
button: {
  space: {
      all: '20px',
    },
  },
},
```

### platforms

Coming soon.

### extends & overrides

Coming soon.

## Extending

Coming soon.

## License

[MPL-2.0][license]

[license]: https://github.com/yarastqt/themekit/blob/master/LICENSE.md
[examples]: https://github.com/yarastqt/themekit/tree/master/examples
