import { Platforms } from './platforms'

export type Shape<T> = {
  [key: string]: T
}

export type Primitive = string | number

export type TokenType = 'color' | 'size' | 'unknown'

export type Token = {
  value: Primitive
  type: TokenType
  comment?: string
}

export type FlattenToken = Token & {
  name: string
}

export type Meta = {
  meta?: {
    css?: string
  }
}

export type TokensMap = {
  [key: string]: TokensMap | Token | Primitive
}

export type ThemeTokens = {
  [key in Platforms]?: Meta & TokensMap
}
