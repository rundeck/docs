<template>
  <div class="swagger" id="swagger"></div>
</template>

<script>
import SwaggerUI from 'swagger-ui';
import 'swagger-ui/dist/swagger-ui.css';

export default {
  name: "RundeckSwaggerUi",
  data() {
    return {
      specUrl: '/files/rundeck-api.yml'
    }
  },
  mounted() {
      SwaggerUI({
          url: this.specUrl,
          dom_id: '#swagger'
      })
  }
}
</script>
