<template>
    <AnnounceBox>
      <template #top>
        <div class="homepage-announce">
          <p>
            <b>Process Automation On Prem</b> is being renamed to <b>Runbook Automation - Self Hosted</b>
          </p>
    </div>
      </template>
    </AnnounceBox>
</template>
<script setup lang="ts">
  import AnnounceBox from "vuepress-theme-hope/components/Homepage.js";
</script>

<style>
.homepage-announce {
    background-color: var(--theme-color-mask); /* Green color */
    /*border-radius: 10px; /* Rounded corners */
    padding: 1px 0px; /* Padding inside the box */
    font-size: 16px; /* Small font size */
    margin: 0px; /* outside padding */
    text-align: center; /* Center the text */
    }
</style>