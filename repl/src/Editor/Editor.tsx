import React, { FC } from 'react'
import MonacoEditor, { monaco } from '@monaco-editor/react'
import './Editor.css'

monaco.init().then((instance) => {
  instance.languages.typescript.typescriptDefaults.addExtraLib(
    `
      declare module '@yandex/themekit' {
        export declare type Platforms = 'common' | 'deskpad' | 'desktop' | 'touch' | 'touch-pad' | 'touch-phone';
        export declare type Shape<T> = {
            [key: string]: T;
        };
        export declare type Primitive = string | number;
        export declare type TokenType = 'color' | 'size' | 'unknown';
        export declare type Token = {
            value: Primitive;
            type: TokenType;
            comment?: string;
        };
        export declare type FlattenToken = Token & {
            name: string;
        };
        export declare type Meta = {
            meta?: {
                css?: string;
            };
        };
        export declare type TokensMap = {
            [key: string]: TokensMap | Token | Primitive;
        };
        export declare type ThemeTokens = {
            [key in Platforms]?: Meta & TokensMap;
        };
        declare type ThemeFn<T> = ThemeFn1<T> | ThemeFn2<T>;
        declare type ThemeFn1<T> = (primitives: T) => ThemeTokens;
        declare type ThemeFn2<T> = (primitives: T) => ThemeFn1<T>;
        export declare function withTokens<T extends Shape<any>>(themeFn1: ThemeFn<T>, themeFn2?: ThemeFn<T>): (primitives1?: T | undefined) => (primitives2?: T | undefined) => ThemeTokens;
      }
    `,
    'ts:filename/themekit.d.ts',
  )
})

const options = {
  minimap: { enabled: false },
}

export const Editor: FC<any> = ({ value, language }) => {
  return (
    <MonacoEditor value={value} language={language} options={options} />
  )
}
