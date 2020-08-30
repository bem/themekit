// import { register } from 'ts-node'

// register({
//   transpileOnly: true,
//   compilerOptions: {
//     module: 'commonjs',
//   },
// })

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
// export async function importModule<T = any>(path: string): Promise<T> {
//   const result = await import(path)
//   return esModuleInterop(result)
// }
