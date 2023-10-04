<template>
  <div class="swagger" id="swagger" style="margin-top: 0;">
    {{ specFile }}
  </div>
</template>

<script>
import { SwaggerUIBundle } from 'swagger-ui-dist';
//import 'swagger-ui-dist/swagger-ui.css';
import '../styles/swagger-ui.css'
import { withBase } from '@vuepress/client'

export default {
  name: "RundeckSwaggerUi",
  props: ['specFile'],
  data() {
    return {
      specUrl: this.specFile
    }
  },
  mounted() {
      SwaggerUIBundle({
          url: withBase(this.specUrl),
          dom_id: '#swagger',
          presets: [
            SwaggerUIBundle.presets.apis
          ]
      })
  }
}
</script>
