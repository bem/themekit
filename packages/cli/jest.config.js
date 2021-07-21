const baseConfig = require('../../jest.config')
const { name } = require('./package.json')

module.exports = {
  ...baseConfig,
  displayName: name,
}
