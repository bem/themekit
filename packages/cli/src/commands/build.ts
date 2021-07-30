import { writeFileSync, ensureDirSync } from 'fs-extra'
import { resolve, join, dirname } from 'path'
import { compile } from '@yandex/themekit-core'

import { Config, loadConfig } from '../utils/config-loader'
import { loadThemeFiles, loadTheme } from '../utils/theme-loader'
import { watch } from '../utils/watcher'
import { CommandFlags, Command, flags } from '../utils/command'

interface BuildFlags extends CommandFlags {
  config: string
  watch?: boolean
}

export default class Build extends Command<BuildFlags> {
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
  }

  async run() {
    const { entry, output } = loadConfig(resolve(this.flags.config))

    this.build(entry, output)

    if (this.flags.watch) {
      this.startWatching(entry, output)
    }
  }

  private startWatching(entries: Config['entry'], output: Config['output']) {
    const sources = []

    for (const entry in entries) {
      const theme = loadThemeFiles(entries[entry])
      sources.push(...theme.aliases, ...theme.sources)
    }

    watch(sources, () => this.build(entries, output))
  }

  private build(entries: Config['entry'], output: Config['output']) {
    for (const entry in entries) {
      const { tokens, aliases } = loadTheme(entries[entry])
      const result = compile({ tokens, output, context: { entry, aliases } })

      for (const [outputName, files] of Object.entries(result)) {
        for (const file of files) {
          const destination = file.destination.replace(/\[entry\]/g, entry)

          const filePath = join(process.cwd(), output[outputName].buildPath, destination)
          const fileDir = dirname(filePath)

          ensureDirSync(fileDir)
          writeFileSync(filePath, file.content)
        }
      }
    }
  }
}
