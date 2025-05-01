<template>
  <div class="openapi-explorer-container">
    <div v-if="loading">Loading OpenAPI Explorer...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <!-- Always render the container, but hide it with CSS when loading -->
    <div class="explorer-wrapper" ref="container" :style="{ display: loading ? 'none' : 'block' }"></div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "OpenApiExplorer",
  props: {
    specFile: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: true,
      error: null
    }
  },
  computed: {
    specUrl() {
      // Get the full URL to the spec file
      return this.getAbsoluteUrl(this.specFile);
    }
  },
  mounted() {
    this.initExplorer();
  },
  methods: {
    getAbsoluteUrl(relativePath) {
      // Use $withBase for VuePress paths
      const basePath = this.$withBase(relativePath);
      
      // Convert to absolute URL
      const baseUrl = window.location.origin;
      
      // Handle cases where basePath might already be absolute
      if (basePath.startsWith('http')) {
        return basePath;
      }
      
      // Join baseUrl and basePath correctly
      return new URL(basePath, baseUrl).href;
    },
    
    async initExplorer() {
      try {
        console.log("Initializing OpenAPI Explorer...");
        
        // Import the component
        await import("openapi-explorer");
        console.log("OpenAPI Explorer component loaded");
        
        // Make sure container exists
        if (!this.$refs.container) {
          console.error("Container ref not found");
          this.error = "Component initialization error: Container not found";
          return;
        }
        
        console.log("Container found:", this.$refs.container);
        
        // Create the element
        const explorerEl = document.createElement("openapi-explorer");
        
        // Set the full URL to the spec
        console.log("Setting spec-url to:", this.specUrl);
        explorerEl.setAttribute("spec-url", this.specUrl);
        
        // Set other helpful attributes
        explorerEl.setAttribute("router", "hash");
        explorerEl.setAttribute("layout", "column");
        
        // Append the element to the container
        this.$refs.container.innerHTML = "";
        this.$refs.container.appendChild(explorerEl);
        
        console.log("OpenAPI Explorer element added to DOM");
        
        // Set up a listener for the API loaded event
        explorerEl.addEventListener('apiDocumentLoaded', () => {
          console.log("API document loaded successfully");
          this.loading = false;
        });
        
        // Add an error handler
        explorerEl.addEventListener('apiLoadError', (event) => {
          console.error("API load error:", event.detail);
          this.error = `Failed to load API spec: ${event.detail.message || 'Unknown error'}`;
          this.loading = false;
        });
        
        // Set a fallback timeout in case the events don't fire
        setTimeout(() => {
          if (this.loading) {
            console.log("Fallback timeout - setting loading to false");
            this.loading = false;
          }
        }, 5000);
      } catch (error) {
        this.error = "Failed to initialize OpenAPI Explorer: " + error.message;
        console.error("Failed to initialize OpenAPI Explorer:", error);
        this.loading = false;
      }
    }
  }
})
</script>

<style>
.openapi-explorer-container {
  margin-top: 1rem;
  margin-bottom: 1rem;
  min-height: 800px;
  width: 100%;
}

.explorer-wrapper {
  height: 800px;
  width: 100%;
}

.error {
  color: red;
  padding: 1rem;
  border: 1px solid red;
  background-color: #ffeeee;
  border-radius: 4px;
}

/* Make sure the explorer is visible */
openapi-explorer {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 800px;
}
 
</style>