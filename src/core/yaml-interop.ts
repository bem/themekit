import Module from 'module'
import { readFileSync } from 'fs'
import YAML from 'yaml'
import { codeFrameColumns } from '@babel/code-frame'

class YamlParseError extends Error {
  public location: any

  constructor(fileName: string, source: string, message: string, location: any) {
    super('')
    // Override native stack with custom message.
    this.stack = new Error(
      [
        // Take only message without code-frame.
        `${message.split(/\n/)[0]} (${fileName}:${location.start.line}:${location.start.col})`,
        codeFrameColumns(source, {
          start: { line: location.start.line, column: location.start.col },
        }),
      ].join('\n'),
    ).stack
    this.location = location
  }
}

Module.prototype.require = new Proxy(Module.prototype.require, {
  apply(target, thisArg, args) {
    if (/\.ya?ml$/.test(args[0])) {
      const file = readFileSync(args[0], 'utf8')
      try {
        return YAML.parse(file, { prettyErrors: true })
      } catch (error) {
        throw new YamlParseError(args[0], file, error.message, error.linePos)
      }
    }
    return Reflect.apply(target, thisArg, args)
  },
})
