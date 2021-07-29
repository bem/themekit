export interface Context {
  value: ContextValue
  registerFilter: (filter: Filter) => void
  registerFormat: (format: Format) => void
  registerTransform: (transform: Transform) => void
  registerPreset: (preset: Preset) => void
}

export interface ContextValue {
  /**
   * List of registered transforms.
   */
  transforms: Map<string, Transform>
  /**
   * List of registered formats.
   */
  formats: Map<string, Format>
  /**
   * List of registered filters.
   */
  filters: Map<string, Filter>
  /**
   * List of registered presets.
   */
  presets: Map<string, Preset>
}

export interface Format<T = any, U extends Record<string, any> = any> {
  name: string
  formatter: (params: { tokens: Token[]; options?: T; context?: Partial<U> }) => string
}

export interface Transform<T extends Record<string, any> = any> {
  name: string
  type: 'name' | 'value'
  transformer: (params: { token: Token; context?: Partial<T> }) => string
}

export interface Filter<T extends Record<string, any> = any> {
  name: string
  matcher: (params: { token: Token; context?: Partial<T> }) => boolean
}

export interface Preset {
  name: string
  transforms: string[]
}

export type TokenValue = string | number | boolean

export interface RawTokenBase {
  /**
   * Token value.
   */
  value: TokenValue
  /**
   * Token comment with description.
   */
  comment?: string
}

export interface RawToken {
  [key: string]: RawTokenBase | RawToken
}

export interface Token extends RawTokenBase {
  /**
   * Token name.
   */
  name: string
  /**
   * Token context path.
   */
  path: string[]
  /**
   * Token references for aliases.
   */
  refs: Pick<Token, 'value' | 'name'>[]
  /**
   * Original token without transformations.
   */
  original: Pick<Token, 'value'>
}
