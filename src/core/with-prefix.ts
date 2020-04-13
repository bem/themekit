/**
 * Returns string with prefix.
 *
 * @param value Raw string.
 * @param prefix Prefix for string.
 */
export function withPrefix(value: string, prefix?: string): string {
  if (prefix === undefined) {
    return value
  }
  return `${prefix}_${value}`
}
