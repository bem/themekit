import YAML from 'yaml'

export function yamlToJson(content) {
  try {
    return YAML.parse(content)
  } catch (_error) {
    // TODO: Handle parse error.
  }
}
