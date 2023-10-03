<template>
  <div class="swagger" id="swagger"></div>
</template>

<script>
import { SwaggerUIBundle } from 'swagger-ui-dist';
import 'swagger-ui-dist/swagger-ui.css';

export default {
  name: "RundeckSwaggerUi",
  data() {
    return {
      specUrl: '/files/rundeck-api.yml'
    }
  },
  mounted() {
      SwaggerUIBundle({
          url: this.specUrl,
          dom_id: '#swagger',
          presets: [
            SwaggerUIBundle.presets.apis
          ]
      })
  }
}
</script>
