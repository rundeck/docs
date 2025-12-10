<template>
  <button 
    class="cookie-settings-link"
    @click="openCookieSettings"
    aria-label="Cookie Settings"
  >
    Cookie Settings
  </button>
</template>

<script setup lang="ts">
const openCookieSettings = () => {
  if (typeof window !== 'undefined' && (window as any).reopenCookieBanner) {
    (window as any).reopenCookieBanner();
  }
};
</script>

<style scoped>
.cookie-settings-link {
  background: none;
  border: none;
  color: var(--theme-color, #3eaf7c);
  text-decoration: underline;
  cursor: pointer;
  padding: 0;
  font-size: inherit;
  font-family: inherit;
  transition: opacity 0.2s;
}

.cookie-settings-link:hover {
  opacity: 0.7;
}

/* Dark mode */
html.dark .cookie-settings-link {
  color: var(--theme-color, #3eaf7c);
}
</style>

