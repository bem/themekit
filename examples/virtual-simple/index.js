// В лямбде мы будем создавать префикс для каждого реквеста, чтобы не было конфликтов,
// т.к. лябмда скорее всего одна (или она на каждый реквест своя, нужно будет проверить, скорее всего своя, в этом же суть лямбды)

const fs = require('fs')
const mockFs = require('mock-fs')
const glob = require('glob')

const Module = require('module')

const { InternalApi } = require('../../lib/index')
const { createStyleDictionaryConfig } = require('../../lib/core/style-dictionary-config')

// Мокаем ФС с токенами.
mockFs({
  'tokens/t1.token.json': '{"token1-name":{"value": "some-value2"}}',
  'tokens/t2.token.json': '{"token2-name":{"value": "some-value3"}}',
})

// Проксируем статический метод, который нужен при выполнении resolveCwd.
Module._resolveFilename = new Proxy(Module._resolveFilename, {
  apply(target, thisArg, args) {
    // TODO: Название tokens должно быть более уникальное, типо __VIRTUAL__.
    if (args[0].includes('tokens')) {
      return args[0]
    }
    return Reflect.apply(target, thisArg, args)
  },
})

const config = {
  entry: {
    default: './themes/default.theme.json',
  },
  output: {
    css: {
      transforms: ['name/cti/kebab'],
      buildPath: './themes',
      files: [
        {
          destination: '[entry]/[platform]/fake.css',
          format: 'css/variables',
          options: {
            useAliasVariables: true,
          },
        },
      ],
    },
  },
}

InternalApi.extend(
  createStyleDictionaryConfig({
    platform: 'common',
    sources: ['tokens/**/*.token.json'],
    entry: 'default',
    output: config.output,
  }),
).buildAllPlatforms()

for (const a of glob.sync('./themes/**/*.css')) {
  const data = fs.readFileSync(a, 'utf-8')
  console.log('>>> data', data)
}
