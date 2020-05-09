import { cssTemplate, jsonTemplate, esmTemplate } from '../templates'
import { FlattenToken } from '../types'

const tokens: FlattenToken[] = [
  { value: '10px', comment: 'Size comment', type: 'size', name: 'size-1' },
  { value: '#fff', comment: 'Color comment', type: 'color', name: 'color-1' },
]

describe('cssTemplate', () => {
  test('should return content with css', () => {
    const actual = cssTemplate(tokens, ':root')
    expect(actual).toMatchInlineSnapshot(`
      "/**
       * Current file was generated automatically, do not edit manually,
       * for update tokens run \\"themekit build\\".
       */
      :root {
          /* Size comment */
          --size-1: 10px;
          /* Color comment */
          --color-1: #fff;
      }
      "
    `)
  })
})

describe('jsonTemplate', () => {
  test('should return content with json', () => {
    const actual = jsonTemplate(tokens)
    expect(actual).toMatchInlineSnapshot(`
      "[
        {
          \\"value\\": \\"10px\\",
          \\"comment\\": \\"Size comment\\",
          \\"type\\": \\"size\\",
          \\"name\\": \\"size-1\\"
        },
        {
          \\"value\\": \\"#fff\\",
          \\"comment\\": \\"Color comment\\",
          \\"type\\": \\"color\\",
          \\"name\\": \\"color-1\\"
        }
      ]
      "
    `)
  })
})

describe('esmTemplate', () => {
  test('should return content with js esm', () => {
    const actual = esmTemplate(tokens)
    expect(actual).toMatchInlineSnapshot(`
      "/**
       * Current file was generated automatically, do not edit manually,
       * for update tokens run \\"themekit build\\".
       */
      /** Size comment */
      export const size-1 = '10px';
      /** Color comment */
      export const color-1 = '#fff';
      "
    `)
  })
})
