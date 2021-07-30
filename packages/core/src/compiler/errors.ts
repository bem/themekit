export class NotFoundFormat extends Error {
  constructor(format: string) {
    super(`Cannot find format "${format}", please check config.`)
  }
}

export class NotFoundFilter extends Error {
  constructor(filter: string) {
    super(`Cannot find filter "${filter}", please check config.`)
  }
}

export class NotFoundTransform extends Error {
  constructor(transform: string) {
    super(`Cannot find transform "${transform}", please check config.`)
  }
}

export class NotFoundPreset extends Error {
  constructor(preset: string) {
    super(`Cannot find preset "${preset}", please check config.`)
  }
}

export class NotFoundRef extends Error {
  constructor(ref: string) {
    super(`Cannot find ref "${ref}".`)
  }
}

export class CircularRefs extends Error {
  constructor(refs: string[]) {
    super(`Found circular reference "${refs.join(' -> ')}", please check tokens.`)
  }
}
