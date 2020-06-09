export type Config = {
  entry: Record<string, string>
  output: {
    path: string
    files: Array<{
      filename: string
      format: string
    }>
  }
}

export async function loadConfig(path: string): Promise<Config> {
  return require(path)
}
