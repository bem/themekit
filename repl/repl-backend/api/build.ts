/// <reference path="../global.d.ts" />
import Module from 'module'
import fs from 'fs'
import path from 'path'
import mockFs from 'mock-fs'
import { NowRequest, NowResponse } from '@vercel/node'
import { InternalApi } from '@yandex/themekit'
import { createStyleDictionaryConfig } from '@yandex/themekit/lib/core/style-dictionary-config'

function withCors(fn: (req: NowRequest, res: NowResponse) => void) {
  return (req: NowRequest, res: NowResponse) => {
    if (req.method === 'OPTIONS') {
      res.status(200).end()
      return
    }
    return fn(req, res)
  }
}

export default withCors((req: NowRequest, res: NowResponse) => {
  // @ts-ignore
  Module._resolveFilename = new Proxy(Module._resolveFilename, {
    apply(target, thisArg, args) {
      // TODO: Название tokens должно быть более уникальное, типо __VIRTUAL__.
      if (args[0].includes('tokens')) {
        return args[0]
      }
      return Reflect.apply(target, thisArg, args)
    },
  })

  // console.log(req.body)

  const mockFiles = {
    ['tokens/' + req.body.file]: req.body.content,
    // 'tokens/t1.tokens.json': '{"token1-name":{"value": "some-value2"}}',
    // 'tokens/t2.tokens.json': '{"token2-name":{"value": "some-value3"}}',
  }

  console.log('>>> mockFiles', mockFiles)

  mockFs(mockFiles)

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
            destination: 'fake.css',
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
      sources: ['tokens/**/*.tokens.json'],
      entry: 'default',
      output: config.output,
    }),
  ).buildAllPlatforms()

  const files = fs.readdirSync('./themes')
  // console.log('>>> files', files)
  const data = []
  for (const f of files) {
    const content = fs.readFileSync(path.join('themes', f), 'utf-8')
    data.push({ file: f, content })
  }

  res.json({ raw: data })
})
