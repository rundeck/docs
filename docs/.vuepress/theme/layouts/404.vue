<template>
  <div class="theme-container">
    <Navbar
      v-if="shouldShowNavbar"
    />
    <div class="theme-default-content">
      <h1>404</h1>
      <blockquote>{{ getMsg() }}</blockquote>
      <router-link to="/">Take me home.</router-link><br>
      <img src="/images/saucer-cat.png" style="width:321px;height:224px;"/>
    </div>
  </div>
</template>

<script>
import Navbar from '@theme/components/Navbar.vue'

const msgs = [
  `We must be purrr-fectly lost.`,
  `Too much Light Speed! How did we get here?`,
  `That's a Four-Oh-Four.`,
  `You gone beyond the rim, please search the galaxy for what you're looking for.`
]

export default {
  components: {
    Navbar
  },
  methods: {
    getMsg () {
      return msgs[Math.floor(Math.random() * msgs.length)]
    }
  },

  computed: {
  shouldShowNavbar () {
    const { themeConfig } = this.$site
    const { frontmatter } = this.$page
    if (
      frontmatter.navbar === false
      || themeConfig.navbar === false) {
      return false
    }
    return (
      this.$title
      || themeConfig.logo
      || themeConfig.repo
      || themeConfig.nav
      || this.$themeLocaleConfig.nav
    )
  }
}
}
</script>
