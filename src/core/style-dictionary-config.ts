import { Platform, Config } from 'style-dictionary'

type Options = {
  sources: string[]
  entry: string
  platform: string
  output: Record<string, Platform>
}

export function createStyleDictionaryConfig({ sources, entry, platform, output }: Options): Config {
  const platforms = Object.entries<Platform>(output)
    // prettier-ignore
    .reduce<Record<string, Platform>>((acc, [key, value]) => {
      const target = { ...value }
      // Normalize path for style-dictionary specifics.
      target.buildPath = target.buildPath.endsWith('/') ? target.buildPath : `${target.buildPath}/`
      target.files = target.files.map((file) => ({
        ...file,
        // Replace placeholders for multiple themes and platforms.
        destination: file.destination
          .replace(/\[entry\]/, entry)
          .replace(/\[platform\]/, platform)
          // Remove common level, because is root.
          .replace(/common\/?/, ''),
      }))
      acc[key] = target
      return acc
    }, {})

  return {
    include: sources,
    platforms: platforms,
  }
}
