import { compile } from '../index'
import { CompileResult, CompileOptions } from '../compiler'
import { RawToken, TokenValue } from '../types'
import deepcopy from 'deepcopy'

export type Watcher = (payload: CompileResult) => void
type Compile = typeof compile

export class ThemekitObserver {
  private originalTokens: RawToken[]
  private options: CompileOptions
  private compile: Compile
  private watchers: Set<Watcher> = new Set()

  constructor(options: CompileOptions, _compile: Compile = compile) {
    this.compile = _compile
    this.options = deepcopy(options)
    this.originalTokens = deepcopy(options.tokens)
    this.run(options)
  }

  watch(watcher: Watcher) {
    this.watchers.add(watcher)

    return () => {
      this.watchers.delete(watcher)
    }
  }

  update(token: string, value: TokenValue) {
    this.options.tokens.push({ [token]: { value } })
    this.run(this.options)
  }

  reset() {
    this.options.tokens = deepcopy(this.originalTokens)
    this.run(this.options)
  }

  private run(options: CompileOptions) {
    setImmediate(() => {
      this.emit(this.compile(options))
    })
  }

  private emit(payload: CompileResult) {
    for (const watcher of this.watchers) {
      watcher(payload)
    }
  }
}
