<script setup lang="ts">
import { Layout } from "vuepress-theme-hope/client";
import { usePageData } from "@vuepress/client";
import { computed } from "vue";
import CookieSettings from "../components/CookieSettings.vue";

const pageData = usePageData();
const isHomePage = computed(() => pageData.value.frontmatter.home === true);
</script>

<template>
  <Layout>
    <!-- Adding announcement before content (works on all pages) -->
    <template #heroAfter>
      <div v-if="isHomePage"class="homepage-announce">
        <p>
         <b>The <i>resources.rundeck.com</i> site has been consolidated here!  Check our our <a href='/learning/solutions/'>Solutions</a> page for Automation use cases. </b>
        </p>
      </div>
    </template>
    
    <!-- Adding announcement to sidebar -->
    <template #sidebarTop>
      <div v-if="!isHomePage" class="sidebar-announce">
        <p>
          <b>Process Automation On Prem</b> is now <b>Runbook Automation Self-Hosted</b>
        </p>
      </div>
    </template>

    <!-- Add footer links for Privacy Policy and Cookie Settings after page content -->
    <template #pageBottom>
      <div class="custom-footer-links">
        <a href="https://www.pagerduty.com/privacy-policy/" target="_blank" rel="noopener noreferrer">
          Privacy Policy
        </a>
        <span class="footer-separator">|</span>
        <CookieSettings />
      </div>
    </template>
  </Layout>
</template>

<style scoped>
.custom-footer-links {
  text-align: center;
  padding: 1rem 0;
  font-size: 0.9rem;
  color: var(--vp-c-text-2, #476582);
}

.custom-footer-links a {
  color: var(--theme-color, #3eaf7c);
  text-decoration: none;
}

.custom-footer-links a:hover {
  text-decoration: underline;
}

.footer-separator {
  margin: 0 0.5rem;
  color: var(--vp-c-divider, #e2e8f0);
}

/* Dark mode */
html.dark .custom-footer-links {
  color: var(--vp-c-text-2, #a0a0a0);
}

html.dark .footer-separator {
  color: var(--vp-c-divider, #3a3a3a);
}
</style>