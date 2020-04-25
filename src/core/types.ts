import { Platforms } from './platforms'

export type Shape<T> = { [key: string]: T }

export type Token = {
  value: string | number
  type: 'color' | 'size' | 'unknown'
  comment?: string
}

export type FlattenToken = Token & {
  name: string
}

export type TokensMap = {
  [key: string]: TokensMap | Token | string
}

export type ThemeTokens = { [key in Platforms]?: TokensMap } & { meta?: { css?: string } }
