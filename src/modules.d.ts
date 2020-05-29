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
    extend: (
      config: any,
    ) => {
      buildPlatform: (platform: string) => void
    }
  }
  export default StyleDictionaryApi
}
