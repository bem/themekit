[![themekit](https://user-images.githubusercontent.com/7934638/83977761-b6831600-a90b-11ea-84a4-8c4dd3b60cc1.png)](https://github.com/bem/themekit)

[![npm](https://img.shields.io/npm/v/@yandex/themekit.svg?style=flat-square&labelColor=111)][npm] [![examples](https://img.shields.io/badge/examples-folder-007ecc?style=flat-square&labelColor=111)][examples] [![node](https://img.shields.io/badge/node-8+-007ecc?style=flat-square&labelColor=111)][node]

Themkit is a build system for design-tokens for any platform. This system is based on [style-dictionary](sd-github) API and [redefinition levels](#-platforms), which allows you to describe platform-specific values. Themkit provides you to extend existing themes in order to supplement or redefine existing tokens, it also allows you to use the basic theme set and add it to the service.

## Features

- 🔍 Clear format (json or yaml) for developers and designers.
- 📚 Define tokens once and get result for any format, for example js, css or json.
- 🛠 Every part of the theme or some of the tokens is extendable and overridable.
- 💻 Tokens may be defined for several web platforms, for example desktop and touch.

## Installation

```sh
# via npm
npm i -DE @yandex/themekit
# or yarn
yarn add --dev @yandex/themekit
```

## Usage

A themekit is available as a CLI tool.

### `build`

```sh
Builds themes for configured formats.

USAGE
  $ themekit build

OPTIONS
  -c, --config=config  [default: themekit.config.{js,json,yml}] The path to a themekit config file.
  -e, --entry=entry    Builds selected entries.
  -o, --output=output  Builds selected outputs.
  -w, --watch          Auto rebuilds themes after change sources.
```

## Get started

More usage cases you can see in [examples][examples].

### Tool configuration

First, you need to create a config file `themekit.config.json` at project root:

```json
{
  "entry": {
    "light": "./src/theme/light.theme.json"
  },
  "output": {
    "css": {
      "transforms": ["name/cti/kebab"],
      "buildPath": "./src/theme/themes",
      "files": [
        {
          "destination": "[entry]/[platform]/root.css",
          "format": "css/variables"
        }
      ]
    }
  }
}
```

A output section based on style-dictionary [platforms](https://amzn.github.io/style-dictionary/#/config?id=configjson) config.

#### themekit config interface

```ts
{
  /**
   * Map with themes
   */
  entry: Record<string, string>
  /**
   * Map with output formats
   *
   * @see https://amzn.github.io/style-dictionary/#/config?id=configjson
   */
  output: Record<string, {
    /**
     * List of transforms should be applied for each token
     *
     * @see https://amzn.github.io/style-dictionary/#/transforms
     */
    transforms: string[]
    /**
     * A preset that contains the transforms set
     *
     * @see https://amzn.github.io/style-dictionary/#/transform_groups
     */
    transformGroup?: string
    /**
     * Output directory for building results
     */
    buildPath: string
    /**
     * @see https://amzn.github.io/style-dictionary/#/actions
     */
    actions: string[]
    /**
     * List of files to get at the output
     */
    files: Array<{
      /**
       * Output filepath, also supports helper placeholders:
       * [entry] — theme name
       * [platform] — platform name
       */
      destination: string
      /**
       * Output format
       *
       * @see https://amzn.github.io/style-dictionary/#/formats
       */
      format: string
      /**
       * Filter applied for each tokens
       */
      filter: any
    }>
  }>
}
```

### Theme configuration

The basic theme configuration consists of the sources section, which lists which tokens should include to this theme (you can specify the full path or glob).

```json
{
  "sources": [
    "./src/theme/tokens/typography.tokens.yml",
    "./src/theme/tokens/color-light.tokens.yml",
    "./src/components/**/*.tokens.yml"
  ]
}
```

#### theme config interface

```ts
{
  /**
   * Extendable theme
   */
  extends?: string
  /**
   * Platforms that should be included in the theme (default common)
   */
  platforms?: Array<'common' | 'deskpad' | 'desktop' | 'touch' | 'touch-pad' | 'touch-phone'>
  /**
   * Mappers list
   */
  mappers?: string[]
  /**
   * Sources list
   */
  sources: string[]
}
```

### Tokens

Tokens can include additional properties such as comment or group for documentation or meta information for processing, also can be used as aliases, see more at style-dictionary [properties](https://amzn.github.io/style-dictionary/#/properties).

A themekit support write tokens in `json` or `yaml` format:

#### yaml

```yml
component:
  type:
    base:
      fillColor:
        value: '#000'
      typoColor:
        value: '#fff'
    danger:
      fillColor:
        value: '#f00'
      typoColor:
        value: '#fff'
```

#### json

```json
{
  "component": {
    "type": {
      "base": {
        "fillColor": {
          "value": "#000"
        },
        "typoColor": {
          "value": "#fff"
        }
      },
      "danger": {
        "fillColor": {
          "value": "#f00"
        },
        "typoColor": {
          "value": "#fff"
        }
      }
    }
  }
}
```

#### token interface

```ts
{
  /**
   * Token value
   */
  value: string
  /**
   * Token group
   */
  group?: string
  /**
   * Token comment
   */
  comment?: string
}
```

## Additional features

### 💻 Platforms

A themekit supports platforms allows you to collect tokens for a specific platform such as `desktop` or `touch`, by default tokens included only from `common` platform.

Each platform contains a several levels:

| platforms   | levels                               |
| :---------- | :----------------------------------- |
| common      | common                               |
| deskpad     | common + deskpad                     |
| desktop     | common + deskpad + desktop           |
| touch       | common + touch                       |
| touch-pad   | common + deskpad + touch + touch-pad |
| touch-phone | common + touch + touch-phone         |

#### theme config

Platform should be written in file name after `@` symbol (exclude `common` level).

```json
{
  "platforms": ["desktop", "touch"],
  "sources": [
    "./tokens/project.tokens.yml",
    "./tokens/project@desktop.tokens.yml",
    "./tokens/project@touch.tokens.yml"
  ]
}
```

### 🌈 Color processing

A themekit supports [modifying colors](https://github.com/ianstormtaylor/css-color-function) for token values. Available next modifiers:

- `h` — change hue
- `s` — change saturation
- `l` — change lightness
- `a` — change alpha channel

#### tool config

Need define `process-color` for output actions:

```json
{
  "output": {
    "css": {
      "actions": ["process-color"]
    }
  }
}
```

#### tokens

Just use a necessary modifier for your color:

```yml
component:
  type:
    base:
      fillColor:
        value: 'color(#000 a(80%))'
```

#### result

At result you get plain value with color:

```css
:root {
  --component-type-base-fill-color: rgba(0, 0, 0, 0.8);
}
```

## Formats

### 🗂 css/variables

#### tool config

```json
{
  "output": {
    "css": {
      "transforms": ["name/cti/kebab"],
      "buildPath": "./src/theme/themes",
      "files": [
        {
          "destination": "[entry]/[platform]/root.css",
          "format": "css/variables",
          "options": {
            // default: ":root"
            "selector": ".MyTheme",
            // default: false
            "useAliasVariables": true
          }
        }
      ]
    }
  }
}
```

## License

[MPL-2.0][license]

[node]: https://nodejs.org/en/
[npm]: https://www.npmjs.com/package/@yandex/themekit
[license]: https://github.com/bem/themekit/blob/master/LICENSE.md
[examples]: https://github.com/bem/themekit/tree/master/examples
[sd-github]: https://github.com/amzn/style-dictionary
