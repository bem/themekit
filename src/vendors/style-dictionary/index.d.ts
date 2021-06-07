export type Property = {
  value: string | number
  group: string
  name: string
}

export type Platform = {
  preset?: string
  buildPath: string
  transforms?: string[]
  actions?: string[]
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

export type InjectedTransformer = {
  type: 'name' | 'attribute' | 'value'
  transformer: (prop: { path: string; name: string }, options: any) => string
}

export type InjectedConfig = {
  buildPath: string
  transforms: InjectedTransformer[]
  files: Array<{
    destination: string
    format: any
    options?: any
  }>
}

declare const StyleDictionaryApi: {
  registerFormat: (config: {
    name: string
    formatter: (
      this: { context: any; options: any },
      dictionary: any,
      config: InjectedConfig,
    ) => string
  }) => void
  registerTransform: (config: {
    name: string
    type: 'name' | 'attribute' | 'value'
    matcher?: (prop: Property) => boolean
    transformer: (prop: Property, config: InjectedConfig) => string | void
  }) => void
  registerAction: (config: {
    name: string
    do: (dictionary: any, config: InjectedConfig) => void
    undo?: (dictionary: any, config: InjectedConfig) => void
  }) => void
  registerFilter: (config: { name: string; matcher: (prop: Property) => boolean }) => void
  extend: (
    config: Config,
  ) => {
    buildPlatform: (platform: string) => void
    buildAllPlatforms: () => Record<string, Array<any>>
    properties: Record<string, Property>
  }
}

export default StyleDictionaryApi
