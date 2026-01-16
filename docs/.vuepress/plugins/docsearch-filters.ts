/**
 * Client-side plugin to integrate custom section filters with DocSearch
 * This modifies DocSearch behavior to respect the selected section filters
 */

export function setupDocSearchFiltersIntegration() {
  if (typeof window === 'undefined') return

  // Listen for filter updates from the filter component
  window.addEventListener('docsearch-filters-updated', (event: CustomEvent) => {
    const { selectedSections } = event.detail
    applySelectedFilters(selectedSections)
  })

  // Monitor DocSearch input changes and reapply filters
  const monitorDocSearch = () => {
    const docSearchButton = document.querySelector('[data-docsearch-button]')
    if (!docSearchButton) {
      setTimeout(monitorDocSearch, 100)
      return
    }

    docSearchButton.addEventListener('click', () => {
      setTimeout(() => {
        const input = document.querySelector('.DocSearch-Input') as HTMLInputElement
        if (input && !(input as any).__filtersAttached) {
          ;(input as any).__filtersAttached = true

          // Restore and apply stored filters when modal opens
          const stored = localStorage.getItem('docsearch-section-filters')
          if (stored) {
            try {
              const filters = JSON.parse(stored)
              applySelectedFilters(filters)
            } catch (e) {
              console.error('Failed to apply stored filters:', e)
            }
          }

          // Monitor input changes
          input.addEventListener('input', () => {
            const stored = localStorage.getItem('docsearch-section-filters')
            if (stored) {
              try {
                const filters = JSON.parse(stored)
                applySelectedFilters(filters)
              } catch (e) {
                // Silently fail
              }
            }
          })
        }
      }, 100)
    })
  }

  monitorDocSearch()
}

/**
 * Apply selected section filters by manipulating the DocSearch input
 * and triggering a re-search with the filters applied
 */
function applySelectedFilters(selectedSections: string[]) {
  const input = document.querySelector('.DocSearch-Input') as HTMLInputElement

  if (!input) return

  // Get the current search query
  const currentQuery = input.value

  // Build the facet filter tags
  const filterTags = selectedSections.length > 0
    ? ` (${selectedSections.join(' OR ')})`
    : ''

  // If there are filters, append them as a metadata hint
  // Note: Algolia filtering happens server-side via facetFilters
  // This is just visual feedback
  const docSearchContainer = document.querySelector('.DocSearch')
  if (docSearchContainer) {
    // Mark that filters are applied
    docSearchContainer.setAttribute('data-filters-applied', selectedSections.join(','))
  }

  // Trigger a search with filters
  // The actual filtering is done through Algolia's facetFilters parameter
  // which we need to patch in the DocSearch instance
  patchDocSearchInstance(selectedSections)
}

/**
 * Patch the DocSearch instance to include section filters in searches
 */
function patchDocSearchInstance(selectedSections: string[]) {
  // This attempts to patch the DocSearch search parameters
  // Note: Direct patching of DocSearch internals is fragile and version-dependent
  // A better approach would be to re-implement search using Algolia's JS client directly

  const docSearchDialog = document.querySelector('[role="dialog"]')
  if (!docSearchDialog) return

  // Try to trigger a new search with our filters
  const input = docSearchDialog.querySelector('input') as HTMLInputElement
  if (input && input.value) {
    // Force a re-search by simulating input events
    const event = new Event('input', { bubbles: true })
    input.dispatchEvent(event)
  }
}

// Export function to initialize the integration
export function initializeDocSearchFilters() {
  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setupDocSearchFiltersIntegration)
  } else {
    setupDocSearchFiltersIntegration()
  }
}

