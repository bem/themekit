// copy-paste from https://github.com/amzn/style-dictionary/blob/master/lib/common/formats.js
export function variablesWithPrefix(prefix: any, properties: any): any {
  return properties
    .map((prop: any) => {
      let nextProp =
        prefix +
        prop.name +
        ': ' +
        (prop.attributes.category === 'asset' ? '"' + prop.value + '"' : prop.value) +
        ';'

      if (prop.comment) {
        nextProp = nextProp.concat(' /* ' + prop.comment + ' */')
      }

      return nextProp
    })
    .filter((strVal: any) => Boolean(strVal))
    .sort()
    .join('\n')
}
