export class NotFoundConfig extends Error {
  constructor(path: string) {
    super(`Cannot find config "${path}", please check path.`)
  }
}

export class NotFoundTheme extends Error {
  constructor(path: string, isExtended?: boolean) {
    if (isExtended) {
      super(`Cannot find extended theme "${path}".`)
    } else {
      super(`Cannot find theme "${path}".`)
    }
  }
}

export class UnsupportedExtension extends Error {
  constructor(path: string) {
    super(`Unsupported file extension: "${path}".`)
  }
}

export class SourcesNotDefined extends Error {
  constructor(path: string) {
    super(`Property "sources" is not defined, please check theme: "${path}".`)
  }
}
