<template>
    <AnnounceBox>
      <template #top>
        <div class="sidebar-announce">
          <p>
            <b>Process Automation On Prem</b> is now <b>Runbook Automation Self-Hosted</b>
          </p>
    </div>
      </template>
    </AnnounceBox>
</template>
<script setup lang="ts">
  import AnnounceBox from "vuepress-theme-hope/modules/sidebar/components/Sidebar.js";
</script>

<style>
.sidebar-announce {
    background-color: var(--theme-color-mask); /* Green color */
    border-radius: 10px; /* Rounded corners */
    padding: 1px 8px; /* Padding inside the box */
    font-size: 14px; /* Small font size */
    margin: 10px; /* outside padding */
    text-align: center; /* Center the text */
    }
</style>