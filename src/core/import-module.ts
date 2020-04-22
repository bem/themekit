import { transpileModule } from 'typescript'
import { readFile } from 'fs-extra'
// @ts-ignore
import neval from 'node-eval'

export function esModuleInterop<T>(box?: T): T {
  if (box === undefined) {
    return box as any
  }
  return (box as any).default || box
}

/**
 * Import module with esm interop.
 *
 * @param path Module path.
 * @return Promise with data.
 */
export async function importModule<T>(path: string): Promise<T> {
  const source = await readFile(path, 'utf-8')
  // TODO: Add diagnostic.
  const transpileResult = transpileModule(source, {})
  const result = neval(transpileResult.outputText, path)
  return esModuleInterop(result)
}
