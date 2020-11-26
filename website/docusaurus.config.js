const path = require('path')

module.exports = {
  title: 'themekit',
  tagline: 'Build system of design-tokens for any platforms',
  url: 'https://bem.github.io',
  baseUrl: '/themekit/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'bem', // Usually your GitHub org/user name.
  projectName: 'themekit', // Usually your repo name.
  themeConfig: {
    sidebarCollapsible: false,
    prism: {
      // theme: require('prism-react-renderer/themes/vsDark'),
      theme: require('prism-react-renderer/themes/dracula'),
      darkTheme: require('prism-react-renderer/themes/dracula'),
    },
    navbar: {
      title: 'Themekit',
      logo: {
        alt: 'themekit logo',
        src: 'img/logo.svg',
        srcDark: 'img/logo_inverse.svg',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Docs',
          position: 'left',
        },
        { to: 'blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/bem/themekit/blob/master/CHANGELOG.md',
          label: 'Changelog',
          position: 'right',
        },
        {
          href: 'https://github.com/bem/themekit',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Getting Started',
              to: 'docs/',
            },
            {
              label: 'Changelog',
              to: 'https://github.com/bem/themekit/blob/master/CHANGELOG.md',
            },
          ],
        },
        {
          title: 'Social',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/bem/themekit',
            },
          ],
        },
        {
          title: 'Built with',
          items: [
            {
              label: 'Docusaurus',
              href: 'https://v2.docusaurus.io',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} themekit.`,
    },
    yandexMetika: {
      counterId: 69813862,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          // It is recommended to set document id as docs home page (`docs/` path).
          homePageId: 'installation',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/bem/themekit/edit/master/website/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl: 'https://github.com/bem/themekit/edit/master/website/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  plugins: [path.resolve(__dirname, 'plugins/yandex-metrika.js')],
}
