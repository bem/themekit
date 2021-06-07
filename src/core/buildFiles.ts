import { buildFile } from './buildFile'

export function buildFiles(dictionary: any, platform: any) {
  if (platform.buildPath && platform.buildPath.slice(-1) !== '/') {
    throw new Error('Build path must end in a trailing slash or you will get weird file names.')
  }

  platform.files.forEach(function(file: any) {
    if (file.format) {
      buildFile(file.destination, file.format.bind(file), platform, dictionary, file.filter)
    } else {
      throw new Error('Please supply a format')
    }
  })
}
