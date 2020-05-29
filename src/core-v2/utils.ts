export function getCssModifierWithPlatform(value: string): string {
  const [name, platform] = value.split('@')
  if (platform === undefined) {
    return name
  }
  return `${name}-${platform}`
}

export function getFolderWithPlatform(fileName: string): string {
  const [name, platform] = fileName.split('@')
  if (platform === undefined) {
    return name
  }
  return `${name}/${platform}`
}
