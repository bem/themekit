export function parseJson(source: string, _path?: string) {
  try {
    return JSON.parse(source)
  } catch (error) {
    throw new Error(error)
  }
}
