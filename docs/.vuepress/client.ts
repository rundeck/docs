import { defineClientConfig } from '@vuepress/client'
import { nextTick, createApp } from 'vue'
import '@docsearch/css'
import Layout from "./layouts/Layout.vue";
import NotFound from "./layouts/NotFound.vue";
import CookieConsent from "./components/CookieConsent.vue";
import DocSearchFilters from "./components/DocSearchFilters.vue";
import { loadGA4, trackPageView, setupAutoTracking, setupVideoTracking, hasConsent } from "./utils/analytics";
import { CONSENT_GRANTED_EVENT, CONSENT_REVOKED_EVENT, CONSENT_DENIED_EVENT } from "./utils/constants";
import { initializeDocSearchFilters } from "./plugins/docsearch-filters";

declare const VERSION: string;
declare const VERSION_FULL: string;
declare const API_MIN_VERSION: string;
declare const API_DEP_RELEASE: string;
declare const API_DEP_VERSION: string;
declare const API_VERSION: string;
declare const CLI_VERSION: string;


export default defineClientConfig({
  layouts: {
    Layout,
    NotFound,
  },
  enhance({ app, router, siteData }) {
    Object.defineProperties(app.config.globalProperties, {
      $rundeckVersion: { get: () => VERSION },
      $rundeckVersionFull: { get: () => VERSION_FULL },
      $apiMinVersion: { get: () => API_MIN_VERSION },
      $apiDepRelease: { get: () => API_DEP_RELEASE },
      $apiDepVersion: { get: () => API_DEP_VERSION },
      $apiVersion: { get: () => API_VERSION },
      $cliVersion: { get: () => CLI_VERSION },
    });

    // Google Analytics 4 with Cookie Consent
    if (typeof window !== 'undefined') {
      // Helper to initialize analytics
      const initializeAnalytics = () => {
        loadGA4();
        setupAutoTracking();
        setupVideoTracking();
      };

      // Check if user already gave consent
      if (hasConsent()) {
        initializeAnalytics();
      }

      // Listen for consent granted event
      window.addEventListener(CONSENT_GRANTED_EVENT, () => {
        initializeAnalytics();
        // Track initial page view
        trackPageView(router.currentRoute.value.path);
      });
      
      // Listen for consent revoked event (when user changes from Accept to Reject)
      window.addEventListener(CONSENT_REVOKED_EVENT, () => {
        // Clear any existing analytics state if needed
        // Note: We don't uninitialize GA4 as it's already loaded
        console.log('Analytics consent revoked - no new events will be tracked');
      });
      
      // Listen for consent denied event (when user initially rejects)
      window.addEventListener(CONSENT_DENIED_EVENT, () => {
        console.log('Analytics consent denied - tracking not enabled');
      });

      // Track page views on route changes
      router.afterEach((to) => {
        if (!hasConsent()) return;
        // Wait for DOM updates to complete
        nextTick(() => {
          trackPageView(to.path);
        });
      });

      // Initialize DocSearch filters integration
      initializeDocSearchFilters();
    }
    
    // The section below is used to properly format the Search results on the docs site.
    if (typeof window !== 'undefined') {
      // Monitor XHR requests
      const originalXHR = window.XMLHttpRequest;
      function newXHR() {
        const xhr = new originalXHR();

        xhr.addEventListener('load', function () {
          if (xhr.responseURL?.includes('algolia')) {
            try {
              const data = JSON.parse(xhr.responseText);
              if (data.results?.[0]?.hits) {
                setTimeout(() => {
                  const hits = document.querySelectorAll('.DocSearch-Hit:empty');
                  hits.forEach((hit, index) => {
                    const hitData = data.results[0].hits[index];
                    if (hitData) {
                      const link = document.createElement('a');
                      link.href = hitData.url;
                      link.className = 'DocSearch-Hit-Container';

                      const title = hitData.hierarchy.lvl1 || hitData.hierarchy.lvl0;
                      const content = hitData.content;

                      link.innerHTML = `
                          <div class="DocSearch-Hit-icon">
                            <svg width="20" height="20" viewBox="0 0 20 20">
                              <path d="M17 5H3h14zm0 5H3h14zm0 5H3h14z" stroke="currentColor" fill="none" fill-rule="evenodd" stroke-linejoin="round"></path>
                            </svg>
                          </div>
                          <div class="DocSearch-Hit-content-wrapper">
                            <span class="DocSearch-Hit-title">${title}</span>
                            <span class="DocSearch-Hit-path">${content}</span>
                          </div>
                          <div class="DocSearch-Hit-action">
                            <svg class="DocSearch-Hit-Select-Icon" width="20" height="20" viewBox="0 0 20 20">
                              <g stroke="currentColor" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                                <path d="M18 3v4c0 2-2 4-4 4H2"></path>
                                <path d="M8 17l-6-6 6-6"></path>
                              </g>
                            </svg>
                          </div>
                        `;

                      hit.appendChild(link);

                      // Make the link clickable
                      link.addEventListener('click', (e) => {
                        e.preventDefault();
                        window.location.href = hitData.url;
                      });
                    }
                  });
                }, 100);
              }
            } catch (e) {
              console.error('Error processing response:', e);
            }
          }
        });

        return xhr;
      }

      window.XMLHttpRequest = newXHR as any;
    }
  },
  setup() {
    // Inject DocSearchFilters component into the navbar
    injectDocSearchFiltersIntoNavbar();
  },
  rootComponents: [CookieConsent],
})

// Store Vue app instance to enable cleanup if needed
let filterAppInstance: ReturnType<typeof createApp> | null = null

/**
 * Inject DocSearchFilters component into the navbar next to search
 * Mounts directly after the docsearch-container for tight integration
 */
function injectDocSearchFiltersIntoNavbar() {
  const checkAndInject = () => {
    // Target the docsearch container directly
    const docsearchContainer = document.querySelector('#docsearch-container')
    
    if (!docsearchContainer) {
      // Keep trying until docsearch is rendered
      setTimeout(checkAndInject, 100)
      return
    }

    // Check if already injected - look for the wrapper in parent
    const parent = docsearchContainer.parentElement
    if (parent?.querySelector('.navbar-filters-wrapper')) {
      return
    }

    // Create a container for the filters
    const filterContainer = document.createElement('div')
    filterContainer.className = 'navbar-filters-wrapper'
    filterContainer.style.display = 'flex'
    filterContainer.style.alignItems = 'center'
    filterContainer.style.marginLeft = '8px'
    
    // Insert right after the docsearch container
    docsearchContainer.parentElement?.appendChild(filterContainer)

    // Unmount previous instance if it exists
    if (filterAppInstance) {
      try {
        filterAppInstance.unmount()
      } catch (e) {
        console.warn('Failed to unmount previous filter app instance:', e)
      }
    }

    // Mount the Vue component and store the instance
    filterAppInstance = createApp(DocSearchFilters)
    filterAppInstance.mount(filterContainer)
  }

  // Start checking after a brief delay to ensure DOM is ready
  if (typeof window !== 'undefined') {
    setTimeout(checkAndInject, 500)
  }
}