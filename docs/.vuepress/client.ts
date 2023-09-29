import { defineClientConfig } from '@vuepress/client'

declare const VERSION: string;
declare const VERSION_FULL: string;
declare const API_MIN_VERSION: string;
declare const API_DEP_RELEASE: string;
declare const API_DEP_VERSION: string;
declare const API_VERSION: string;
declare const CLI_VERSION: string;

export default defineClientConfig({
  enhance({ app, router, siteData }) {
    Object.defineProperties(app.config.globalProperties, {
      $rundeckVersion: { get: () => VERSION },
      $rundeckVersionFull: { get: () => VERSION_FULL },
      $apiMinVersion: { get: () => API_MIN_VERSION },
      $apiDepRelease: { get: () => API_DEP_RELEASE },
      $apiDepVersion: { get: () => API_DEP_VERSION },
      $apiVersion: { get: () => API_VERSION },
      $cliVersion: { get: () => CLI_VERSION },

    });
  },
  setup() {},
  rootComponents: [],
})