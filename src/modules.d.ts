declare module 'css-color-function' {
  namespace cssColorFunction {
    function convert(value: string): string
  }
  export = cssColorFunction
}

declare module 'style-dictionary' {
  export type Property = {
    value: string | number
    group: string
    name: string
  }

  export type Platform = {
    buildPath: string
    transforms?: string[]
    actions?: string
    files: Array<{
      destination: string
      format: string
      filter?: any
    }>
  }

  export type Config = {
    include: string[]
    platforms: Record<string, Platform>
  }

  const StyleDictionaryApi: {
    registerFormat: (config: {
      name: string
      formatter: (dictionary: any, config: any) => string
    }) => void
    registerTransform: (config: {
      name: string
      type: 'name' | 'attribute' | 'value'
      matcher?: (prop: Property) => boolean
      transformer: (prop: Property) => string
    }) => void
    registerAction: (config: {
      name: string
      do: (dictionary: any, config: any) => void
      undo?: (dictionary: any, config: any) => void
    }) => void
    extend: (
      config: Config,
    ) => {
      buildPlatform: (platform: string) => void
      buildAllPlatforms: () => void
      properties: Record<string, Property>
    }
  }
  export default StyleDictionaryApi
}
