import { resolve } from 'path'
import { Command, flags } from '@oclif/command'
import { watch } from 'chokidar'
import chalk from 'chalk'

import { loadConfig } from '../core/config'
import { build } from '../core/build'
import { loadTheme } from '../core/load-theme'
import { debounce, flatten } from '../core/utils'

type Flags = {
  config: string
  watch: boolean
  entry: string[]
  output: string[]
}

export default class Build extends Command {
  static description = 'Builds themes for configured formats.'

  static flags = {
    config: flags.string({
      char: 'c',
      description: 'The path to a themekit config file.',
      default: 'themekit.config.{js,json,yml}',
    }),
    watch: flags.boolean({
      char: 'w',
      description: 'Auto rebuilds themes after change sources.',
    }),
    entry: flags.string({
      char: 'e',
      multiple: true,
      description: 'Builds selected entries.',
    }),
    output: flags.string({
      char: 'o',
      multiple: true,
      description: 'Builds selected outputs.',
    }),
  }

  async run() {
    const { flags } = this.parse<Flags, any>(Build)
    const config = await loadConfig(resolve(flags.config), {
      entries: flags.entry,
      outputs: flags.output,
    })

    await this.build(config)

    if (flags.watch) {
      this.emitWatching()

      const themes = []
      let isShutdown = false

      for (const key in config.entry) {
        const theme = await loadTheme(config.entry[key])
        themes.push(...theme.mappers, ...flatten(theme.sources))
      }

      const watcher = watch(themes, { ignoreInitial: true })
      const onChange = debounce(async () => {
        if (!isShutdown) {
          this.clear()
          await this.build(config)
          this.emitWatching()
        }
      }, 500)

      watcher
        .on('unlink', onChange)
        .on('add', onChange)
        .on('change', onChange)

      const shutdown = () => {
        isShutdown = true
        console.log('\nShutting down watch')
        watcher.close()
      }

      process.once('SIGINT', shutdown)
      process.once('SIGTERM', shutdown)
    }
  }

  private async build(config: any) {
    console.log(`>---------------- ${chalk.yellow('Build started')} ----------------<`)
    try {
      await build(config)
      console.log(`\n>--------------- ${chalk.green('Build completed')} ---------------<`)
    } catch (error) {
      console.log(error)
      console.log(`\n>---------------- ${chalk.red('Build failed')} -----------------<`)
    }
  }

  private emitWatching() {
    console.log('\nWatching for changes...')
  }

  private clear() {
    console.clear()
  }
}
