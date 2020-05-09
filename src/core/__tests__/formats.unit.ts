import { formats } from '../formats'

const tokens = {
  desktop: {
    layer1: {
      name: 'layer1',
      meta: { css: '.selector' },
      tokens: [{ value: '10px', comment: 'Size comment', type: 'size', name: 'size-1' }],
    },
    layer2: {
      name: 'layer2',
      meta: { css: '.selector' },
      tokens: [{ value: '#fff', comment: 'Color comment', type: 'color', name: 'color-1' }],
    },
  },
  touch: {
    layer1: {
      name: 'layer1',
      meta: { css: '.selector' },
      tokens: [{ value: '10px', comment: 'Size comment', type: 'size', name: 'size-1' }],
    },
    layer2: {
      name: 'layer2',
      meta: { css: '.selector' },
      tokens: [{ value: '#fff', comment: 'Color comment', type: 'color', name: 'color-1' }],
    },
  },
}

describe('css.flat', () => {
  test('should return array with files', () => {
    const actual = formats['css.flat'](tokens)
    expect(actual).toMatchInlineSnapshot(`
      Array [
        Object {
          "content": "/**
       * Current file was generated automatically, do not edit manually,
       * for update tokens run \\"themekit build\\".
       */
      :root {
          /* Size comment */
          --size-1: 10px;
          /* Color comment */
          --color-1: #fff;
      }
      ",
          "fileName": "build/desktop/index.css",
        },
        Object {
          "content": "/**
       * Current file was generated automatically, do not edit manually,
       * for update tokens run \\"themekit build\\".
       */
      :root {
          /* Size comment */
          --size-1: 10px;
          /* Color comment */
          --color-1: #fff;
      }
      ",
          "fileName": "build/touch/index.css",
        },
      ]
    `)
  })
})

describe('css.whitepaper', () => {
  test('should return array with files', () => {
    const actual = formats['css.whitepaper'](tokens)
    expect(actual).toMatchInlineSnapshot(`
      Array [
        Object {
          "content": "/**
       * Current file was generated automatically, do not edit manually,
       * for update tokens run \\"themekit build\\".
       */
      .selector {
          /* Size comment */
          --size-1: 10px;
      }
      ",
          "fileName": "layer1/desktop/index.css",
        },
        Object {
          "content": "/**
       * Current file was generated automatically, do not edit manually,
       * for update tokens run \\"themekit build\\".
       */
      .selector {
          /* Color comment */
          --color-1: #fff;
      }
      ",
          "fileName": "layer2/desktop/index.css",
        },
        Object {
          "content": "/**
       * Current file was generated automatically, do not edit manually,
       * for update tokens run \\"themekit build\\".
       */
      .selector {
          /* Size comment */
          --size-1: 10px;
      }
      ",
          "fileName": "layer1/touch/index.css",
        },
        Object {
          "content": "/**
       * Current file was generated automatically, do not edit manually,
       * for update tokens run \\"themekit build\\".
       */
      .selector {
          /* Color comment */
          --color-1: #fff;
      }
      ",
          "fileName": "layer2/touch/index.css",
        },
      ]
    `)
  })
})

describe('json.whitepaper', () => {
  test('should return array with files', () => {
    const actual = formats['json.whitepaper'](tokens)
    expect(actual).toMatchInlineSnapshot(`
      Array [
        Object {
          "content": "[
        {
          \\"value\\": \\"10px\\",
          \\"comment\\": \\"Size comment\\",
          \\"type\\": \\"size\\",
          \\"name\\": \\"size-1\\"
        }
      ]",
          "fileName": "layer1/desktop/index.json",
        },
        Object {
          "content": "[
        {
          \\"value\\": \\"#fff\\",
          \\"comment\\": \\"Color comment\\",
          \\"type\\": \\"color\\",
          \\"name\\": \\"color-1\\"
        }
      ]",
          "fileName": "layer2/desktop/index.json",
        },
        Object {
          "content": "[
        {
          \\"value\\": \\"10px\\",
          \\"comment\\": \\"Size comment\\",
          \\"type\\": \\"size\\",
          \\"name\\": \\"size-1\\"
        }
      ]",
          "fileName": "layer1/touch/index.json",
        },
        Object {
          "content": "[
        {
          \\"value\\": \\"#fff\\",
          \\"comment\\": \\"Color comment\\",
          \\"type\\": \\"color\\",
          \\"name\\": \\"color-1\\"
        }
      ]",
          "fileName": "layer2/touch/index.json",
        },
      ]
    `)
  })
})

describe('js.esm', () => {
  test('should return array with files', () => {
    const actual = formats['js.esm'](tokens)
    expect(actual).toMatchInlineSnapshot(`
      Array [
        Object {
          "content": "/**
       * Current file was generated automatically, do not edit manually,
       * for update tokens run \\"themekit build\\".
       */
      /** Size comment */
      export const size-1 = '10px';
      /** Color comment */
      export const color-1 = '#fff';
      ",
          "fileName": "build/desktop/index.js",
        },
        Object {
          "content": "/**
       * Current file was generated automatically, do not edit manually,
       * for update tokens run \\"themekit build\\".
       */
      /** Size comment */
      export const size-1 = '10px';
      /** Color comment */
      export const color-1 = '#fff';
      ",
          "fileName": "build/touch/index.js",
        },
      ]
    `)
  })
})
