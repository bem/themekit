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

if (typeof window === 'undefined') {
	require('json5/lib/register')
}

var combineJSON = require('./utils/combineJSON'),
    deepExtend = require('./utils/deepExtend'),
    _ = require('lodash');

/**
 * Either a string to a JSON file that contains configuration for the style dictionary or a plain Javascript object
 * that contains the configuration.
 * @typedef {(object|string)} Config
 * @prop {String[]} source - Paths to property JSON files
 * @prop {Platform} platforms.platform - A platform
 * @example
 * ```json
 * {
 *   "source": ["properties/*.json"],
 *   "platforms": {
 *     "scss": {
 *       "transformGroup": "scss",
 *       "buildPath": "web/sass/",
 *       "files": [
 *         {
 *           "format": "scss/variables",
 *           "destination": "_variables.scss"
 *         }
 *       ],
 *       "actions": ["copy_assets"]
 *     }
 *   }
 * }
 * ```
 */

/**
 * An object representing a platform
 * @typedef {Object} Platform
 * @prop {String} transformGroup
 * @prop {String} transforms
 */

/**
 * Create a Style Dictionary
 * @static
 * @memberof module:style-dictionary
 * @param {Config} config - Configuration options to build your style dictionary. Pass an object with the configuration.
 * @returns {module:style-dictionary}
 * @example
 * ```js
 * const StyleDictionary = require('style-dictionary').extend({
 *   source: ['properties/*.json'],
 *   platforms: {
 *     scss: {
 *       transformGroup: 'scss',
 *       buildPath: 'build/',
 *       files: [{
 *         destination: 'variables.scss',
 *         format: 'scss/variables'
 *       }]
 *     }
 *     // ...
 *   }
 * });
 * ```
 */
function extend(opts) {
  var options, to_ret;

	options = opts;

  // Creating a new object and copying over the options
  // Also keeping an options object in case
  to_ret = deepExtend([{}, this, {options: options}, options]);

  // Update properties with includes from dependencies
  if (options.include) {
    if (!_.isArray(options.include))
      throw new Error('include must be an array');

		if (options.include.length > 0) {
			to_ret.properties = combineJSON(options.include, true);

			to_ret.include = null; // We don't want to carry over include references
		}
  }

	if (options.properties) {
		to_ret.properties = options.properties

    to_ret.include = null; // We don't want to carry over include references
	}


  return to_ret;
}

module.exports = extend;
