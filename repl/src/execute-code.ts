export function executeCode(code: string, require: () => any): {} {
  const exports = {}
  const module = { exports }

  const moduleArgsNames = ['__require', '__module', '__exports']
  const moduleArgs = [require, module, exports]

  const wrappedCode = `
    (function(require, module, exports) {
      ${code}
    })(${moduleArgsNames.join(', ')})
  `

  Function(...moduleArgsNames, wrappedCode)(...moduleArgs)

  return exports
}
