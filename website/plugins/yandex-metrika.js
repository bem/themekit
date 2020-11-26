module.exports = function(context) {
  const IS_DEV = process.env.NODE_ENV !== 'production'

  const { siteConfig } = context
  const { themeConfig } = siteConfig
  const { yandexMetika } = themeConfig || {}

  if (!yandexMetika) {
    throw new Error(
      `You need to specify 'yandexMetika' object in 'themeConfig' with 'counterId' field in it to use docusaurus-plugin-yandex-metrika`,
    )
  }

  const { counterId, debug = false } = yandexMetika

  if (!counterId) {
    throw new Error(
      "You specified the 'yandexMetika' object in 'themeConfig' but the 'counterId' field was missing. " +
        'Please ensure this is not a mistake.',
    )
  }

  return {
    name: 'docusaurus-plugin-yandex-metrika',

    injectHtmlTags() {
      if (IS_DEV && !debug) {
        return {}
      }

      return {
        postBodyTags: [
          {
            tagName: 'script',
            attributes: {
              async: true,
              src: 'https://mc.yandex.ru/metrika/tag.js',
            },
          },
          {
            tagName: 'script',
            innerHTML: `
              window.ym = window.ym || function() { (window.ym.a = window.ym.a || []).push(arguments); };
              window.ym.l = 1 * new Date();

              ym(${counterId}, 'init', {
                  clickmap: true,
                  trackLinks: true,
                  accurateTrackBounce: true
              });
            `,
          },
        ],
      }
    },
  }
}
