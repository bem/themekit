import { resolve } from 'path'
import { Command, flags } from '@oclif/command'

import { getProjectConfig } from '../core/project-config'
import { build } from '../core/build'

type Flags = { config: string }
type Args = { source: string }

export default class Build extends Command {
  static flags = {
    config: flags.string({
      char: 'c',
      description: 'Config path',
      default: 'theme.config.json',
    }),
  }

  async run() {
    const { flags, args } = this.parse<Flags, Args>(Build)
    const config = await getProjectConfig(process.cwd(), flags.config)
    await build(config)
  }
}
