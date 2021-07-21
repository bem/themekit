import fs from 'fs-extra'
import { resolve, join } from 'path'
import chalk from 'chalk'
import { compile } from '@yandex/themekit-core'

import { loadConfig } from '../utils/config-loader'
import { loadTheme } from '../utils/theme-loader'
import { loadSources } from '../utils/source-loader'
import { loadMapper } from '../utils/mapper-loader'
import { watch } from '../utils/watcher'
import { Command, flags } from '../utils/command'

interface BuildFlags {
  config: string
  watch: boolean
  entry: string[]
  output: string[]
}

export default class Build extends Command {
  static description = 'Builds themes for configured formats.'

  static flags = {
    ...Command.flags,
    config: flags.string({
      char: 'c',
      description: 'The path to a themekit config file',
      default: 'themekit.config.{js,json,yml}',
    }),
    watch: flags.boolean({
      char: 'w',
      description: 'Auto rebuilds themes after change sources',
    }),
    entry: flags.string({
      char: 'e',
      multiple: true,
      description: 'Builds selected entries',
    }),
    output: flags.string({
      char: 'o',
      multiple: true,
      description: 'Builds selected outputs',
    }),
  }

  async run() {
    // TODO: вернуть фильтрацию конфига
    const { flags } = this.parse<BuildFlags, never>(Build)
    const { entry, output } = loadConfig(resolve(flags.config))

    this.build(entry, output)

    if (flags.watch) {
      // TODO: move to utils or method?
      const sources = []
      for (const entryName in entry) {
        const theme = loadTheme(entry[entryName])
        sources.push(...theme.mappers.flat(), ...theme.sources.flat())
      }
      watch(sources, () => {
        this.build(entry, output)
      })
    }
  }

  // async catch(error) {
  //   // TODO: тут можно не делать exit1, но сперва стоит написать что фейл билда а затем кинуть ошибку
  //   console.error(chalk.red(error.stack))
  //   console.log(`>---------------- ${chalk.red('Build failed')} -----------------<`)
  //   // process.exit(1)
  //   this.exit(1)
  // }

  // TODO: check failed build
  private build(entry, output) {
    // TODO: started не нужно
    this.log(`>---------------- ${chalk.green('Build started')} ----------------<`)

    for (const entryName in entry) {
      const theme = loadTheme(entry[entryName])
      // @ts-expect-error
      const mapper = loadMapper(theme.mappers)

      for (const platform of theme.platforms) {
        const tokens = loadSources(theme.sources, platform) as any
        const result = compile({ tokens, output, context: { entry: entryName, platform, mapper } })

        for (const [outputName, files] of Object.entries(result)) {
          for (const file of files) {
            // TODO: move to utils?
            const destination = file.destination
              .replace(/\[entry\]/g, entryName)
              .replace(/\[platform\]/g, platform)
              // Remove common level, because is root.
              .replace(/common\/?/g, '')

            const filePath = join(process.cwd(), output[outputName].buildPath, destination)
            // console.log('>>> filePath', destination)
            fs.writeFile(filePath, file.content)
            this.log(`⚡️ ${destination}`)
          }
        }
      }
    }

    this.log(`>--------------- ${chalk.green('Build completed')} ---------------<\n`)
  }
}
