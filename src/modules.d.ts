declare module 'node-eval' {
  export default function(content: string, filename: string, context?: {}): any
}

declare module 'css-color-function' {
  namespace cssColorFunction {
    function convert(value: string): string
  }
  export = cssColorFunction
}
