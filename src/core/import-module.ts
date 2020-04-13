/**
 * Import module with esm interop.
 *
 * @param path Module path.
 * @return Promise with data.
 */
export async function importModule<T>(path: string): Promise<T> {
  const maybeModule = await import(path)
  return maybeModule.default || maybeModule
}
