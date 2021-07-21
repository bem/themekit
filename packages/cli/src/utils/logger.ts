export function createLogger(isSilentMode: boolean) {
  const createSilenceLog = (target) => {
    return new Proxy(target, {
      apply(original, arg, args) {
        if (isSilentMode) {
          return null
        }
        return Reflect.apply(original, arg, args)
      },
    })
  }

  return {
    log: createSilenceLog(console.log),
    error: createSilenceLog(console.error),
  }
}
