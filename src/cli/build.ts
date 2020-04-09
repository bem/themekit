import { Command, flags } from '@oclif/command'

export default class Build extends Command {
  async run() {
    this.log('build command')
  }
}
