module.exports = {
  sidebar: {
    'Getting Started': ['installation', 'token', 'theme', 'glossary'],
    Features: [
      {
        type: 'category',
        label: 'transforms',
        items: [
          'transforms/name-cti-kebab',
          'transforms/name-cti-constant',
          'transforms/name-mapper',
        ],
      },
      {
        type: 'category',
        label: 'formats',
        items: ['formats/css-variables', 'formats/css-whitepaper'],
      },
      {
        type: 'category',
        label: 'filters',
        items: ['filters/whitepaper-color', 'filters/whitepaper-root'],
      },
      {
        type: 'category',
        label: 'actions',
        items: ['actions/process-color'],
      },
      'extends',
      'platforms',
    ],
  },
}
