declare module 'node-eval' {
  export default function(content: string, filename: string, context?: {}): any
}

declare module 'css-color-function' {
  namespace cssColorFunction {
    function convert(value: string): string
  }
  export = cssColorFunction
}

declare module 'style-dictionary' {
  const StyleDictionaryApi: {
    registerFormat: (config: {
      name: string
      formatter: (dictionary: any, config: any) => string
    }) => void
    registerTransform: (config: {
      name: string
      type: 'name' | 'attribute' | 'value'
      matcher?: (prop: any) => boolean
      transformer: (prop: any) => string
    }) => void
    registerAction: (config: {
      name: string
      do: (dictionary: any, config: any) => void
      undo?: (dictionary: any, config: any) => void
    }) => void
    extend: (
      config: any,
    ) => {
      buildPlatform: (platform: string) => void
    }
  }
  export default StyleDictionaryApi
}
