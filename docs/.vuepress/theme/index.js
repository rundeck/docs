const path = require('path');

module.exports = (_, ctx) => ({
  // MODIFICATION_FROM_THEME - this alias method is imported without change
  // to point to updated AlgoliaSearchBox.vue
  alias() {
    const { themeConfig, siteConfig } = ctx;

    // resolve algolia
    const isAlgoliaSearch =
      themeConfig.algolia ||
      Object.keys((siteConfig.locales && themeConfig.locales) || {}).some(
        base => themeConfig.locales[base].algolia
      );

    let ret = {
      '@NavBar': path.resolve(__dirname, 'components/Navbar.vue')
    }

    if(isAlgoliaSearch) {
      ret = {
        ...ret,
        '@AlgoliaSearchBox': path.resolve(__dirname, 'components/AlgoliaSearchBox.vue')
      }
    }

    return ret
  },

  extend: '@vuepress/theme-default'
});