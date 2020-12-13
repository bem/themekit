import chalk from 'chalk'

export function deprecate(message: string): void {
  console.error(chalk.yellow(message))
}

export function withDeprecated<T extends object>(target: T, message: string): T {
  let isFirstShown = true
  return new Proxy<T>(target, {
    get(target, receiver) {
      if (isFirstShown) {
        deprecate(message)
        isFirstShown = false
      }
      return Reflect.get(target, receiver)
    },
  })
}
