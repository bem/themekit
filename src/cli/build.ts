import { resolve } from 'path'
import { Command, flags } from '@oclif/command'

import { loadConfig } from '../core/config'
import { build } from '../core-v2/build'

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
    const { flags } = this.parse<Flags, any>(Build)
    const config = await loadConfig(resolve(flags.config))
    await build(config)
  }
}
