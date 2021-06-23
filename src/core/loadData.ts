import { Config } from './config'
import { enhanceWhitepaperConfig } from './enhance-whitepaper-config'
import { loadSources } from './load-sources'
import { loadTheme } from './loadTheme'
import { loadMappers } from './mappers'
import { Data } from './types'

export async function loadData(config: Config): Promise<Data> {
  const result = []

  for (const entry in config.entry) {
    const theme = await loadTheme(config.entry[entry])
    for (const platform of theme.platforms) {
      result.push({
        sources: await loadSources(theme.sources, platform),
        mapper: await loadMappers(theme.mappers),
        whitepaper: enhanceWhitepaperConfig(theme.whitepaper, platform),
        output: config.output,
        entry,
        platform,
      })
    }
  }

  return result
}
