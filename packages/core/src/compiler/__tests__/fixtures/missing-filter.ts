import { createContext } from '../../../context'
import type { PreprocessorOptions } from '../../tokens-preprocessor'

const context = createContext()

context.registerTransform({
  name: 'transform',
  type: 'value',
  transformer: () => '',
})

context.registerFormat({
  name: 'format',
  formatter: () => '',
})

export const missingFilter = {
  options: {
    tokens: [],
    output: {
      css: {
        transforms: ['transform'],
        files: [
          {
            destination: '',
            format: 'format',
            filter: 'missing-filter',
          },
        ],
      },
    },
  } as PreprocessorOptions,
  context: context.value,
}
