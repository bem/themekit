/*
 * Copyright 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with
 * the License. A copy of the License is located at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions
 * and limitations under the License.
 */

let _ = require('lodash')
let GroupMessages = require('../utils/groupMessages')

let SASS_MAP_FORMAT_DEPRECATION_WARNINGS = GroupMessages.GROUP.SassMapFormatDeprecationWarnings

function fileHeader(options, commentStyle) {
  let to_ret = ''
  // for backward compatibility we need to have the user explicitly hide them
  let showFileHeader = (options) ? options.showFileHeader : true
  if (showFileHeader) {
    if (commentStyle === 'short') {
      to_ret += '\n'
      to_ret += '// Do not edit directly\n'
      to_ret += '// Generated on ' + new Date().toUTCString() + '\n'
      to_ret += '\n'
    } else {
      to_ret += '/**\n'
      to_ret += ' * Do not edit directly\n'
      to_ret += ' * Generated on ' + new Date().toUTCString() + '\n'
      to_ret += ' */\n\n'
    }
  }

  return to_ret
}

function variablesWithPrefix(prefix, properties, commentStyle) {
  return properties.map(function(prop) {
    let to_ret_prop = prefix + prop.name + ': ' + (prop.attributes.category === 'asset' ? '"' + prop.value + '"' : prop.value) + ';'

    if (prop.comment) {
      if (commentStyle === 'short') {
        to_ret_prop = to_ret_prop.concat(' // ' + prop.comment)
      } else {
        to_ret_prop = to_ret_prop.concat(' /* ' + prop.comment + ' */')
      }
    }

    return to_ret_prop
  })
    .filter(function(strVal) { return Boolean(strVal) })
    .join('\n')
}

function iconsWithPrefix(prefix, properties, config) {
  return _.chain(properties)
    .filter(function(prop) {
      return prop.attributes.category === 'content' && prop.attributes.type === 'icon'
    })
    .map(function(prop) {
      let varName = prefix + prop.name + ': ' + prop.value + ';'
      let className = '.' + config.prefix + '-icon.' + prop.attributes.item + ':before '
      let declaration = '{ content: ' + prefix + prop.name + '; }'
      return varName + '\n' + className + declaration
    })
    .value().join('\n')
}

function minifyDictionary(obj) {
  let toRet = {}
  if (obj.hasOwnProperty('value')) {
    return obj.value
  }
  for (let name in obj) {
    if (obj.hasOwnProperty(name)) {
      toRet[name] = minifyDictionary(obj[name])
    }
  }

  return toRet
}
/**
 * @namespace Formats
 */

module.exports = {
  /**
   * Creates a CSS file with variable definitions based on the style dictionary
   *
   * @memberof Formats
   * @kind member
   * @example
   * ```css
   * :root {
   *   --color-background-base: #f0f0f0;
   *   --color-background-alt: #eeeeee;
   * }
   * ```
   */
  'css/variables': function(dictionary) {
    return fileHeader(this.options) +
      ':root {\n' +
      variablesWithPrefix('  --', dictionary.allProperties) +
      '\n}\n'
  },

  /**
   * Creates a SCSS file with variable definitions based on the style dictionary
   *
   * @memberof Formats
   * @kind member
   * @example
   * ```scss
   * $color-background-base: #f0f0f0;
   * $color-background-alt: #eeeeee;
   * ```
   */
  'scss/variables': function(dictionary) {
    return fileHeader(this.options, 'short') + variablesWithPrefix('$', dictionary.allProperties, 'short')
  },

  /**
   * Creates a SCSS file with variable definitions and helper classes for icons
   *
   * @memberof Formats
   * @kind member
   * @example
   * ```scss
   * $content-icon-email: '\E001';
   * .icon.email:before { content:$content-icon-email; }
   * ```
   */
  'scss/icons': function(dictionary, config) {
    return fileHeader(this.options, 'short') + iconsWithPrefix('$', dictionary.allProperties, config, 'short')
  },

  /**
   * Creates a LESS file with variable definitions based on the style dictionary
   *
   * @memberof Formats
   * @kind member
   * @example
   * ```less
   * \@color-background-base: #f0f0f0;
   * \@color-background-alt: #eeeeee;
   * ```
   */
  'less/variables': function(dictionary) {
    return fileHeader(this.options, 'short') + variablesWithPrefix('@', dictionary.allProperties, 'short')
  },

  /**
   * Creates a LESS file with variable definitions and helper classes for icons
   *
   * @memberof Formats
   * @kind member
   * @example
   * ```less
   * \@content-icon-email: '\E001';
   * .icon.email:before { content:\@content-icon-email; }
   * ```
   */
  'less/icons': function(dictionary, config) {
    return fileHeader(this.options, 'short') + iconsWithPrefix('@', dictionary.allProperties, config, 'short')
  },

  /**
   * Creates a CommonJS module with the whole style dictionary
   *
   * @memberof Formats
   * @kind member
   * @example
   * ```js
   * module.exports = {
   *   color: {
   *     base: {
   *        red: {
   *          value: '#ff000'
   *        }
   *     }
   *   }
   * }
   * ```
   */
  'javascript/module': function(dictionary) {
    return fileHeader(this.options) +
    'module.exports = ' +
      JSON.stringify(dictionary.properties, null, 2) + ';'
  },

  /**
   * Creates a JS file a global var that is a plain javascript object of the style dictionary.
   * Name the variable by adding a 'name' attribute on the file object in your config.
   *
   * @memberof Formats
   * @kind member
   * @example
   * ```js
   * var StyleDictionary = {
   *   color: {
   *     base: {
   *        red: {
   *          value: '#ff000'
   *        }
   *     }
   *   }
   * }
   * ```
   */
  'javascript/object': function(dictionary) {
    return fileHeader(this.options) +
      'var ' +
      (this.name || '_styleDictionary') +
      ' = ' +
      JSON.stringify(dictionary.properties, null, 2) +
      ';'
  },

  /**
   * Creates a [UMD](https://github.com/umdjs/umd) module of the style
   * dictionary. Name the module by adding a 'name' attribute on the file object
   * in your config.
   *
   * @memberof Formats
   * @kind member
   * @example
   * ```js
   * (function(root, factory) {
   *   if (typeof module === "object" && module.exports) {
   *     module.exports = factory();
   *   } else if (typeof exports === "object") {
   *     exports["_styleDictionary"] = factory();
   *   } else if (typeof define === "function" && define.amd) {
   *     define([], factory);
   *   } else {
   *     root["_styleDictionary"] = factory();
   *   }
   * }(this, function() {
   *   return {
   *     "color": {
   *       "red": {
   *         "value": "#FF0000"
   *       }
   *     }
   *   };
   * }))
   * ```
   */
  'javascript/umd': function(dictionary) {
    let name = this.name || '_styleDictionary'
    return fileHeader(this.options) +
      '(function(root, factory) {\n' +
      '  if (typeof module === "object" && module.exports) {\n' +
      '    module.exports = factory();\n' +
      '  } else if (typeof exports === "object") {\n' +
      '    exports["' + name + '"] = factory();\n' +
      '  } else if (typeof define === "function" && define.amd) {\n' +
      '    define([], factory);\n' +
      '  } else {\n' +
      '    root["' + name + '"] = factory();\n' +
      '  }\n' +
      '}(this, function() {\n' +
      '  return ' + JSON.stringify(dictionary.properties, null, 2) + ';\n' +
      '}))\n'
  },

  /**
   * Creates a ES6 module of the style dictionary.
   *
   * ```json
   * {
   *   "platforms": {
   *     "js": {
   *       "transformGroup": "js",
   *       "files": [
   *         {
   *           "format": "javascript/es6",
   *           "destination": "colors.js",
   *           "filter": {
   *             "attributes": {
   *               "category": "color"
   *             }
   *           }
   *         }
   *       ]
   *     }
   *   }
   * }
   * ```
   *
   * @memberof Formats
   * @kind member
   * @example
   * ```js
   * export const ColorBackgroundBase = '#ffffff';
   * export const ColorBackgroundAlt = '#fcfcfcfc';
   * ```
   */
  'javascript/es6': function(dictionary) {
    return fileHeader(this.options) +
      dictionary.allProperties.map(function(prop) {
        let to_ret_prop = 'export const ' + prop.name + ' = ' + JSON.stringify(prop.value) + ';'
        if (prop.comment) { to_ret_prop = to_ret_prop.concat(' // ' + prop.comment) }
        return to_ret_prop
      }).join('\n')
  },

  // Web templates

  /**
   * Creates a JSON file of the style dictionary.
   *
   * @memberof Formats
   * @kind member
   * @example
   * ```json
   * {
   *   "color": {
   *     "base": {
   *        "red": {
   *          "value": "#ff000"
   *        }
   *     }
   *   }
   * }
   * ```
   */
  json: function(dictionary) {
    return JSON.stringify(dictionary.properties, null, 2)
  },

  /**
   * Creates a JSON file of the assets defined in the style dictionary.
   *
   * @memberof Formats
   * @kind member
   * @example
   * ```js
   * {
   *   "asset": {
   *     "image": {
   *        "logo": {
   *          "value": "assets/logo.png"
   *        }
   *     }
   *   }
   * }
   * ```
   */
  'json/asset': function(dictionary) {
    return JSON.stringify({ asset: dictionary.properties.asset }, null, 2)
  },

  /**
   * Creates a JSON nested file of the style dictionary.
   *
   * @memberof Formats
   * @kind member
   * @example
   * ```json
   * {
   *   "color": {
   *     "base": {
   *        "red": "#ff000"
   *     }
   *   }
   * }
   * ```
   */
  'json/nested': function(dictionary) {
    return JSON.stringify(minifyDictionary(dictionary.properties), null, 2)
  },

  /**
   * Creates a JSON flat file of the style dictionary.
   *
   * @memberof Formats
   * @kind member
   * @example
   * ```json
   * {
   *   "color-base-red": "#ff000"
   * }
   * ```
   */
  'json/flat': function(dictionary) {
    return '{\n' + dictionary.allProperties.map(function(prop) {
      return `  "${prop.name}": ${JSON.stringify(prop.value)}`
    }).join(',\n') + '\n}'
  },

  /**
   * Creates a sketchpalette file of all the base colors
   *
   * @memberof Formats
   * @kind member
   * @example
   * ```json
   * {
   *   "compatibleVersion": "1.0",
   *   "pluginVersion": "1.1",
   *   "colors": [
   *     "#ffffff",
   *     "#ff0000",
   *     "#fcfcfc"
   *   ]
   * }
   * ```
   */
  'sketch/palette': function(dictionary) {
    let to_ret = {
      compatibleVersion: '1.0',
      pluginVersion: '1.1'
    }
    to_ret.colors = _.chain(dictionary.allProperties)
      .filter(function(prop) {
        return prop.attributes.category === 'color' && prop.attributes.type === 'base'
      })
      .map(function(prop) {
        return prop.value
      })
      .value()
    return JSON.stringify(to_ret, null, 2)
  },

  /**
   * Creates a sketchpalette file compatible with version 2 of
   * the sketchpalette plugin. To use this you should use the
   * 'color/sketch' transform to get the correct value for the colors.
   *
   * @memberof Formats
   * @kind member
   * @example
   * ```json
   * {
   *   "compatibleVersion": "2.0",
   *   "pluginVersion": "2.2",
   *   "colors": [
   *     {name: "red", r: 1.0, g: 0.0, b: 0.0, a: 1.0},
   *     {name: "green", r: 0.0, g: 1.0, b: 0.0, a: 1.0},
   *     {name: "blue", r: 0.0, g: 0.0, b: 1.0, a: 1.0}
   *   ]
   * }
   * ```
   */
  'sketch/palette/v2': function(dictionary) {
    let to_ret = {
      compatibleVersion: '2.0',
      pluginVersion: '2.2',
      colors: dictionary.allProperties.map(function(prop) {
        // Merging the token's value, which should be an object with r,g,b,a channels
        return Object.assign({
          name: prop.name
        }, prop.value)
      })
    }
    return JSON.stringify(to_ret, null, 2)
  },
}
