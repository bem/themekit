import { Platforms as PlatformsTypes } from './platforms'
import { Platform as SDPlatform } from '../vendors/style-dictionary'

export type File = {
  context: any
  destination: string
  format: Function
}

export type Dictionary = any

export type Action = {
  name: string
  do: Function
  undo: Function
}

export type Platform = {
  dictionary: Dictionary
  platform: {
    actions: Array<Action>
    buildPath: string
    transforms: Array<Function>
    files: Array<File>
  }
}

export type Platforms = Record<string, Platform>

export type WhitepaperConfig = Record<string, string>

export type Mapper = Record<string, string>

export type BaseData = {
  mapper: Mapper
  whitepaper: WhitepaperConfig
  output: Record<string, SDPlatform>
  entry: string
  platform: PlatformsTypes
}

export type NodeData = Array<
  BaseData & {
    sources: string[]
  }
>

export type BrowserData = Array<
  BaseData & {
    properties: object
  }
>

export type Data = NodeData | BrowserData
