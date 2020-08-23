import chalk from 'chalk'

export function deprecate(message: string): void {
  console.error(chalk.yellow(message))
}
