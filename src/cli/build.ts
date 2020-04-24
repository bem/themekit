import { Command, flags } from '@oclif/command'

import { getProjectConfig } from '../core/project-config'
import { build } from '../core/build'

type Flags = { config: string }

export default class Build extends Command {
  static flags = {
    config: flags.string({
      char: 'c',
      description: 'Config path',
      default: 'theme.config.json',
    }),
  }

  async run() {
    const { flags } = this.parse<Flags, any>(Build)
    const config = await getProjectConfig(process.cwd(), flags.config)
    await build(config)
  }
}
