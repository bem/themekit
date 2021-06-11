import { resolve } from 'path'
import { Command, flags } from '@oclif/command'
import { watch } from 'chokidar'
import chalk from 'chalk'

import { loadConfig } from '../core/config'
import { build } from '../core/build'
import { loadTheme } from '../core/loadTheme'
import { debounce, flatten } from '../core/utils'
import { buildFiles } from '../core/buildFiles'
import { Platforms } from '../core/types'

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

    const result = await this.build(config)

    if (!result) {
      return
    }

    await this.buildFiles(result)

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
      const result = await build(config)
      console.log(`\n>--------------- ${chalk.green('Build completed')} ---------------<\n\n`)
      return result
    } catch (error) {
      console.log('\r')
      console.log(error)
      console.log(`\n>---------------- ${chalk.red('Build failed')} -----------------<`)
    }
  }

  private async buildFiles(platforms: Platforms) {
    console.log(`\n>---------------- ${chalk.yellow('Files build started')} ----------------<`)
    try {
      for (let { dictionary, platform } of Object.values(platforms)) {
        buildFiles(dictionary, platform)
      }
      console.log(`\n>--------------- ${chalk.green('Files build completed')} ---------------<\n\n`)
    } catch (error) {
      console.log('\r')
      console.log(error)
      console.log(`\n>---------------- ${chalk.red('Files build failed')} -----------------<`)
    }
  }

  private emitWatching() {
    console.log('\nWatching for changes...')
  }

  private clear() {
    console.clear()
  }
}
