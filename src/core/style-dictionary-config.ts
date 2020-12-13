import { Platform, Config } from 'style-dictionary'

import Themekit from '../index'

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

      if (target.preset !== undefined) {
        const maybePrese = Themekit.presets.get(target.preset)
        if (maybePrese === undefined) {
          throw new Error(`Used unexpected preset "${target.preset}" for "${key}" platform.`)
        } else {
          target.transforms = maybePrese.transforms || target.transforms
          target.actions = maybePrese.actions || target.actions
        }
      }

      // Normalize path for style-dictionary specifics.
      target.buildPath = target.buildPath.endsWith('/') ? target.buildPath : `${target.buildPath}/`
      target.files = target.files.map((file) => ({
        ...file,
        context: { entry, platform },
        // Replace placeholders for multiple themes and platforms.
        destination: file.destination
          .replace(/\[entry\]/g, entry)
          .replace(/\[platform\]/g, platform)
          // Remove common level, because is root.
          .replace(/common\/?/g, ''),
      }))
      acc[key] = target
      return acc
    }, {})

  return {
    include: sources,
    platforms: platforms,
  }
}
