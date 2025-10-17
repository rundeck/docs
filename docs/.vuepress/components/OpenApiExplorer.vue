<template>
  <div class="openapi-explorer-container">
    <div v-if="loading" class="loading-spinner">Loading API documentation...</div>
    <div v-if="error" class="error">{{ error }}</div>
    <div class="explorer-wrapper" ref="container" :style="{ display: loading ? 'none' : 'block' }"></div>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "OpenApiExplorer",
  props: {
    // Required properties
    specFile: {
      type: String,
      required: true
    },
    // Explorer setup options
    explorerLocation: {
      type: String,
      default: undefined
    },
    serverUrl: {
      type: String,
      default: undefined
    },
    
    // Disable configuration options
    displayNulls: {
      type: Boolean,
      default: false
    },
    hideDefaults: {
      type: Boolean,
      default: false
    },
    collapse: {
      type: Boolean,
      default: false
    },
    tree: {
      type: Boolean,
      default: false
    },
    schemaExpandLevel: {
      type: Number,
      default: 9999
    },
    
    // Hide/Show Sections
    hideConsole: {
      type: Boolean,
      default: false
    },
    hideAuthentication: {
      type: Boolean,
      default: false
    },
    hideServerSelection: {
      type: Boolean,
      default: false
    },
    hideComponents: {
      type: Boolean,
      default: false
    },
    
    // Custom configuration
    defaultSchemaTab: {
      type: String,
      default: 'model', // 'model' or 'body'
      validator: (value) => ['model', 'body'].includes(value)
    },
    usePathInNavBar: {
      type: Boolean,
      default: false
    },
    
    // Legacy props for backward compatibility
    layout: {
      type: String,
      default: 'row', // 'row' or 'column'
    },
    renderStyle: {
      type: String,
      default: 'view', // 'read', 'view', or 'focused'
    },
    theme: {
      type: String,
      default: 'light', // 'light' or 'dark'
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    schemaStyle: {
      type: String,
      default: undefined // 'tree' or 'table'
    }
  },
  data() {
    return {
      loading: true,
      error: null,
      explorerElement: null
    }
  },
  computed: {
    specUrl() {
      return this.getAbsoluteUrl(this.specFile);
    }
  },
  mounted() {
    this.initExplorer();
  },
  methods: {
    getAbsoluteUrl(relativePath) {
      const basePath = this.$withBase(relativePath);
      const baseUrl = window.location.origin;
      
      if (basePath.startsWith('http')) {
        return basePath;
      }
      
      return new URL(basePath, baseUrl).href;
    },
    
    async initExplorer() {
      try {
        console.log("Initializing OpenAPI Explorer...");
        
        // Import the web component
        await import("openapi-explorer");
        console.log("OpenAPI Explorer component loaded");
        
        if (!this.$refs.container) {
          console.error("Container ref not found");
          this.error = "Component initialization error: Container not found";
          return;
        }
        
        console.log("Container found:", this.$refs.container);
        
        // Create the element
        const explorerEl = document.createElement("openapi-explorer");
        this.explorerElement = explorerEl;
        
        // Set the spec URL (required)
        console.log("Setting spec-url to:", this.specUrl);
        explorerEl.setAttribute("spec-url", this.specUrl);
        
        // Set up location and server URL if provided
        if (this.explorerLocation) {
          explorerEl.setAttribute("explorer-location", this.explorerLocation);
        }
        
        if (this.serverUrl) {
          explorerEl.setAttribute("server-url", this.serverUrl);
        }
        
        // Apply disable configuration options
        if (this.displayNulls) {
          explorerEl.setAttribute("display-nulls", "");
        }
        
        if (this.hideDefaults) {
          explorerEl.setAttribute("hide-defaults", "");
        }
        
        if (this.collapse) {
          explorerEl.setAttribute("collapse", "");
        }
        
        if (this.tree) {
          explorerEl.setAttribute("tree", "");
        }
        
        if (this.schemaExpandLevel !== 9999) {
          explorerEl.setAttribute("schema-expand-level", this.schemaExpandLevel.toString());
        }
        
        // Apply hide/show section options
        if (this.hideConsole) {
          explorerEl.setAttribute("hide-console", "");
        }
        
        if (this.hideAuthentication) {
          explorerEl.setAttribute("hide-authentication", "");
        }
        
        if (this.hideServerSelection) {
          explorerEl.setAttribute("hide-server-selection", "");
        }
        
        if (this.hideComponents) {
          explorerEl.setAttribute("hide-components", "");
        }
        
        // Apply custom configuration
        explorerEl.setAttribute("default-schema-tab", this.defaultSchemaTab);
        
        if (this.usePathInNavBar) {
          explorerEl.setAttribute("use-path-in-nav-bar", "");
        }
        
        // Apply legacy properties (for backward compatibility)
        if (this.layout) {
          explorerEl.setAttribute("layout", this.layout);
        }
        
        if (this.renderStyle) {
          explorerEl.setAttribute("render-style", this.renderStyle);
        }
        
        if (this.theme) {
          explorerEl.setAttribute("theme", this.theme);
        }
        
        if (!this.showHeader) {
          explorerEl.setAttribute("show-header", "false");
        }
        
        if (this.schemaStyle) {
          explorerEl.setAttribute("schema-style", this.schemaStyle);
        }
        
        // Append the element to the container
        this.$refs.container.innerHTML = "";
        this.$refs.container.appendChild(explorerEl);
        
        console.log("OpenAPI Explorer element added to DOM");

        // Set up event listeners
        explorerEl.addEventListener('apiDocumentLoaded', this.handleApiLoaded);
        explorerEl.addEventListener('apiLoadError', this.handleApiError);
        
        // Fallback for loading state
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
    },
    
    handleApiLoaded(event) {
      console.log("API document loaded successfully", event);
      this.loading = false;
      
      // Forward the event to parent component
      this.$emit('spec-loaded', event);
    },
    
    handleApiError(event) {
      console.error("API load error:", event.detail);
      this.error = `Failed to load API spec: ${event.detail.message || 'Unknown error'}`;
      this.loading = false;
      
      // Forward the error event to parent component
      this.$emit('api-error', event);
    },
    
    // Expose API methods
    async loadSpec(spec) {
      if (this.explorerElement && typeof this.explorerElement.loadSpec === 'function') {
        return await this.explorerElement.loadSpec(spec);
      }
    },
    
    setAuthenticationConfiguration(securitySchemeId, config) {
      if (this.explorerElement && 
          typeof this.explorerElement.setAuthenticationConfiguration === 'function') {
        this.explorerElement.setAuthenticationConfiguration(securitySchemeId, config);
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