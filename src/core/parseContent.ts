import YAML from 'yaml'

type Format = 'json' | 'yaml' | 'yml'

/**
 * Parse content by format.
 *
 * @param content - Raw content
 * @param format - Parsing format
 */
export function parseContent(content: string, format: Format): any {
  switch (format) {
    case 'json':
      try {
        return JSON.parse(content)
      } catch (_e) {
        return content
      }
    case 'yml':
    case 'yaml':
      return YAML.parse(content)
    default:
      throw new Error(
        `Unexpected format "${format}" for parsing, please choose json or yaml format.`,
      )
  }
}
