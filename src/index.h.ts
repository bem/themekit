export type Prop = {
  /**
   * Property additional attributes
   */
  attributes: Record<string, string>
  /**
   * Property comment
   */
  comment?: string
  /**
   * Property name
   */
  name: string
  /**
   * Property original value with comment
   */
  original: { value: string; comment?: string }
  /**
   * Property nested path
   */
  path: string[]
  /**
   * Property value
   */
  value: string
}

export type Preset = {
  /**
   * Preset name
   */
  name: string
  /**
   * Predefined transforms
   */
  transforms?: string[]
  /**
   * Predefined actions
   */
  actions?: string[]
}
