import { register } from 'ts-node'

register({ transpileOnly: true })

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
  // TODO: Source possibly empty or have invalid format.
  // TODO: Add diagnostic.
  const result = await import(path)
  return esModuleInterop(result)
}
