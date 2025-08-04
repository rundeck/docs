<script setup lang="ts">
import { Layout } from "vuepress-theme-hope/client";
import { usePageData } from "@vuepress/client";
import { computed } from "vue";

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
  </Layout>
</template>