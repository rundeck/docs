import { path } from '@vuepress/shared-utils'

export default (options = {}, ctx) => ({
    define: {
        trimContent: options.trimContent || false,
        selector: options.selector || 'div[class*="language-"] pre',
        // ... (other properties)
    },
    enhanceAppFiles: [path.resolve(__dirname, 'appFile.js')],
    clientRootMixin: path.resolve(__dirname, 'clientRootMixin.js')
});
