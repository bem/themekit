type RefObject<T> = { current: T | null }

/**
 * Create container for store value.
 *
 * @pram value - Initial value.
 * @returns Container with stored value.
 */
export function createRef<T>(value?: T): RefObject<T> {
  return { current: value ?? null }
}
