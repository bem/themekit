export function trim(value: string = ''): string {
  return value.replace(/^ {6}/gm, '').trim()
}
