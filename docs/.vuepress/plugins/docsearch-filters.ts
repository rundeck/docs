/**
 * Client-side plugin to integrate custom section filters with DocSearch
 * This modifies DocSearch behavior to respect the selected section filters
 */

export function setupDocSearchFiltersIntegration() {
  if (typeof window === 'undefined') return

  // Patch fetch and XHR immediately
  patchAlgoliaRequests()

  // Listen for filter updates from the filter component
  window.addEventListener('docsearch-filters-updated', (event: CustomEvent) => {
    const { selectedSections } = event.detail
    applySelectedFilters(selectedSections)
  })
}

/**
 * Intercept fetch and XHR requests to Algolia to inject selected filters
 */
function patchAlgoliaRequests() {
  // Patch fetch
  const originalFetch = window.fetch
  
  window.fetch = function(url: string | Request, options?: RequestInit) {
    // Convert Request object to string if needed
    let urlStr = typeof url === 'string' ? url : url.url
    
    if (urlStr && urlStr.includes('algolia')) {
      // Intercept Algolia fetch requests
      let body = options?.body
      
      if (body && typeof body === 'string') {
        try {
          const parsed = JSON.parse(body)
          if (parsed.requests && Array.isArray(parsed.requests)) {
            // Get selected filters from localStorage
            const storedFilters = localStorage.getItem('docsearch-section-filters')
            let selectedSections: string[] = []
            if (storedFilters) {
              try {
                selectedSections = JSON.parse(storedFilters)
              } catch (e) {
                // Silently fail
              }
            }

            // Modify each request to include our facet filters
            parsed.requests.forEach((req: any) => {
              if (!req.facetFilters) {
                req.facetFilters = []
              }
              
              // Ensure facetFilters is an array
              if (!Array.isArray(req.facetFilters)) {
                req.facetFilters = [req.facetFilters]
              }

              // Add our section filters if any are selected
              if (selectedSections.length > 0) {
                // Build a filter array with OR logic: tags:Learning OR tags:API
                const tagFilters = selectedSections.map(section => `tags:${section}`)
                req.facetFilters.push(tagFilters)
              }
            })

            // Update the body with modified request
            if (options) {
              options.body = JSON.stringify(parsed)
            }
          }
        } catch (e) {
          // If parsing fails, just continue with original request
        }
      }
    }

    return originalFetch.call(this, url, options)
  } as any

  // Also patch XMLHttpRequest for compatibility
  const originalOpen = XMLHttpRequest.prototype.open
  const originalSend = XMLHttpRequest.prototype.send

  XMLHttpRequest.prototype.open = function(method: string, url: string, ...args: any[]) {
    ;(this as any).__requestUrl = url
    return originalOpen.apply(this, [method, url, ...args])
  }

  XMLHttpRequest.prototype.send = function(body: any) {
    // Check if this is an Algolia request
    const url = (this as any).__requestUrl as string
    if (url && url.includes('algolia')) {
      try {
        // Intercept the request body and add our filters
        let requestBody = body
        if (typeof body === 'string') {
          const parsed = JSON.parse(body)
          if (parsed.requests && Array.isArray(parsed.requests)) {
            // Get selected filters from localStorage
            const storedFilters = localStorage.getItem('docsearch-section-filters')
            let selectedSections: string[] = []
            if (storedFilters) {
              try {
                selectedSections = JSON.parse(storedFilters)
              } catch (e) {
                // Silently fail
              }
            }

            // Modify each request to include our facet filters
            parsed.requests.forEach((req: any) => {
              if (!req.facetFilters) {
                req.facetFilters = []
              }
              
              // Ensure facetFilters is an array
              if (!Array.isArray(req.facetFilters)) {
                req.facetFilters = [req.facetFilters]
              }

              // Add our section filters if any are selected
              if (selectedSections.length > 0) {
                // Build a filter array with OR logic: tags:Learning OR tags:API
                const tagFilters = selectedSections.map(section => `tags:${section}`)
                req.facetFilters.push(tagFilters)
              }
            })

            requestBody = JSON.stringify(parsed)
          }
        }

        return originalSend.call(this, requestBody)
      } catch (e) {
        // If parsing fails, just send original request
        return originalSend.call(this, body)
      }
    }

    return originalSend.call(this, body)
  }
}

function applySelectedFilters(selectedSections: string[]) {
  // Trigger a search update by simulating input on the search field
  const input = document.querySelector('.DocSearch-Input') as HTMLInputElement
  if (input) {
    // Dispatch an input event to trigger re-search with new filters
    input.dispatchEvent(new Event('input', { bubbles: true }))
  }
}

// Export function to initialize the integration
export function initializeDocSearchFilters() {
  // Setup immediately - don't wait for DOM
  setupDocSearchFiltersIntegration()
}

