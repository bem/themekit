// TODO: Я думаю, что этот файл должеен быть в самом репле
import { locator } from '../lib/service-locator'
import { build } from './build'
import { Config } from './config'

// TODO: use tokens for type and getter
// TODO: Add validate for meta exists att whitepaper

locator.set('glob', () => ['some', 'files'])
locator.set('import', () => () => ({ common: { meta: {css: '.selecor'}, border_radius: '10px' } }))
locator.set('path', {
  resolve(path: string) {
    return path
  },
  join(a: string, b: string) {
    return `${a}/${b}`
  },
  parse(path: string) {
    return { name: path }
  },
})

// export async function __build() {
//   // return getThemeLayers('source', { platforms: ['common'] }).then(l => console.log(l))
// }

const config: Config = {
  src: '',
  platforms: ['desktop'],
  formats: {
    'css.whitepaper': {
      outDir: '',
      transforms: ['name.param', 'color.hex'],
    },
  },
}

build(config)
