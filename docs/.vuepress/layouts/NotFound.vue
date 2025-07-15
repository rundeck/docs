<template>
  <NotFound>
    <template #default>
      <div class="custom-404-content">
        <div class="not-found-container">
          <div class="not-found-hint">
            <p class="error-code">404</p>
            <h1 class="error-title">Page not found</h1>
            <p>You've landed on a link that doesn't exist. Try the Search!</p>
          </div>
        </div>
      </div>
    </template>
  </NotFound>
</template>

<script setup lang="ts">
import { NotFound } from "vuepress-theme-hope/client";
import { onMounted } from 'vue';

onMounted(() => {
  if (typeof gtag !== 'undefined') {
    gtag('event', '404_error', {
      'app_name': 'Rundeck_Docs',
      'screen_name': '404 Error'
    });
  }
});
</script>

<style scoped>
.custom-404-content {
  width: 100%;
  min-height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 0;
}

.not-found-container {
  max-width: 600px;
  text-align: center;
  padding: 3rem 2rem;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

.error-code {
  font-size: 6rem;
  font-weight: bold;
  color: #999;
  margin: 0 0 1rem 0;
  line-height: 1;
}

.error-title {
  font-size: 2rem;
  margin: 1rem 0;
  color: #333;
  font-weight: 600;
}

.not-found-hint p:last-child {
  font-size: 1.1rem;
  color: #666;
  margin: 1.5rem 0 0 0;
}
</style>