export function getFolderWithPlatform(fileName: string): string {
  const [name, platform] = fileName.split('@')
  if (platform === undefined) {
    return name
  }
  return `${name}/${platform}`
}
