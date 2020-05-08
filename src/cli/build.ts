import { resolve } from 'path'
import { Command, flags } from '@oclif/command'
import createSpinner, { Ora as Spinner } from 'ora'
import chalk from 'chalk'

import { loadConfig } from '../core/config'
import { build } from '../core/build'

type Flags = { config: string }

export default class Build extends Command {
  static description = 'Builds tokens for configured formats.'

  static flags = {
    config: flags.string({
      char: 'c',
      description: 'The path to a themekit config file.',
      default: 'themekit.config.js',
    }),
  }

  async run() {
    let spinner: Spinner
    const { flags } = this.parse<Flags, any>(Build)
    const config = await loadConfig(resolve(flags.config))
    await build(
      config,
      (format) => {
        spinner = createSpinner().start(`Build ${chalk.cyan(format)}`)
      },
      (format, files) => {
        spinner.stop()
        this.log(chalk.cyan(`❯ ${format}`))
        this.log(chalk.gray(`${files.map((file) => `  - ${file}`).join('\n')}`))
      },
    )
  }
}
