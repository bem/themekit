import { Command as BaseCommand, flags } from '@oclif/command'
import { IConfig } from '@oclif/config'

export { flags } from '@oclif/command'

export abstract class Command extends BaseCommand {
  static flags = {
    silent: flags.boolean({
      description: 'Silence CLI output',
    }),
  }

  private isSilent: boolean

  constructor(argv: string[], config: IConfig) {
    super(argv, config)
    const { flags } = this.parse<{ silent?: boolean }, never>(BaseCommand)
    this.isSilent = flags.silent ?? false
  }

  log(message?: string, ...args: any[]) {
    if (!this.isSilent) {
      console.log(message, ...args)
    }
  }
}
