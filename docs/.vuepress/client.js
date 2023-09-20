import RundeckSwaggerUi from './components/RundeckSwaggerUI.vue';
import { defineClientConfig } from '@vuepress/client'

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    app.component('RundeckSwaggerUi', RundeckSwaggerUi)
  },
  setup() {},
  rootComponents: [],
})