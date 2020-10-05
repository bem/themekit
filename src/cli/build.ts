import { dirname, relative } from 'path'
import { Union } from 'unionfs'
import { Volume } from 'memfs'
import * as fs from 'fs-extra'
import { resolve } from 'path'
import { Command, flags } from '@oclif/command'
import { watch } from 'chokidar'
import chalk from 'chalk'

import { Config, loadConfig } from '../core/config'
import { build } from '../core/build'
import { loadTheme } from '../core/load-theme'
import { debounce, flatten, normalizeCss } from '../core/utils'

type Flags = {
  config: string
  watch: boolean
  entry: string[]
  output: string[]
  check: boolean
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
    check: flags.boolean({
      description: 'Checks existent output files satisfy the config file.',
      default: false,
    }),
  }

  async run() {
    const { flags } = this.parse<Flags, any>(Build)
    const config = await loadConfig(resolve(flags.config), {
      entries: flags.entry,
      outputs: flags.output,
    })

    if (flags.check) {
      return this.check(config)
    }

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

  private async build(config: Config) {
    console.log(`----------------- ${chalk.yellow('Build started')} -----------------`)
    await build(config)
    console.log(`\n---------------- ${chalk.green('Build completed')} ----------------`)
  }

  private async check(config: Config) {
    const memfs = Volume.fromJSON({})
    const ufs = new Union().use(fs as any).use(memfs as any)

    // workaround https://github.com/streamich/unionfs/issues/425
    const { openSync } = ufs
    ufs.openSync = function(this, path) {
      if (typeof path === 'string') {
        memfs.mkdirpSync(dirname(path))
      }
      return openSync.apply(this, arguments as any)
    }

    const unpatchFsExtra = require('fs-monkey').patchFs(ufs, require('fs-extra'))
    const unpatchFs = require('fs-monkey').patchFs(ufs)
    try {
      await build(config)
    } finally {
      unpatchFsExtra()
      unpatchFs()
    }

    let failed = false
    const files = memfs.toJSON()

    for (const [fileName, fileContent] of Object.entries(files)) {
      if (fileContent) {
        if (!fs.existsSync(fileName)) {
          console.log(chalk.red(`${relative(process.cwd(), fileName)} doesn't exist`))
          continue
        }
        const fileOldContent = fs.readFileSync(fileName, 'utf8')
        if (fileName.endsWith('.css')) {
          if (normalizeCss(fileContent) !== normalizeCss(fileOldContent)) {
            failed = true
            console.log(chalk.red(`${relative(process.cwd(), fileName)} (CSS file) is outdated`))
          }
        } else if (fileContent !== fileOldContent) {
          failed = true
          console.log(chalk.red(`${relative(process.cwd(), fileName)} (text file) is outdated`))
        }
      }
    }

    if (failed) {
      throw 'failed'
    }
  }

  private emitWatching() {
    console.log('\nWatching for changes...')
  }

  private clear() {
    console.clear()
  }
}
