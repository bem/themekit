export class NotFoundThemeException extends Error {
  constructor(path: string) {
    super(`Cannot find find "${path}".`)
  }
}
