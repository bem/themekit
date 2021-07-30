import { Command as BaseCommand, flags } from '@oclif/command'
import chalk from 'chalk'

export { flags } from '@oclif/command'

export interface CommandFlags {
  silent?: boolean
}

export abstract class Command<T> extends BaseCommand {
  static flags = {
    silent: flags.boolean({
      description: 'Silence CLI output',
      default: false,
    }),
  }

  flags: CommandFlags & T = {} as CommandFlags & T

  async init() {
    const { flags } = this.parse<CommandFlags & T, never>(this.constructor as any)
    this.flags = flags
  }

  async catch(error: any) {
    this.error(chalk.red(error.stack))
  }

  log(message?: string, ...args: any[]): void {
    if (!this.flags.silent) {
      console.log(message, ...args)
    }
  }

  error(input: string | Error, _options?: unknown): never {
    console.log(input)
    process.exit(1)
  }
}
