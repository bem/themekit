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
