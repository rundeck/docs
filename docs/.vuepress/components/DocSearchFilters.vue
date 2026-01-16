<template>
  <div class="docsearch-filters-container">
    <!-- Filter toggle button -->
    <button 
      class="filter-toggle-btn"
      :class="{ active: showFilters }"
      @click="showFilters = !showFilters"
      title="Toggle section filters"
    >
      <svg class="filter-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
      </svg>
      <span v-if="hasActiveFilters" class="filter-badge">{{ selectedSections.length }}</span>
    </button>

    <!-- Filter panel -->
    <div v-if="showFilters" class="docsearch-filters">
      <div class="filters-header">
        <span class="filters-label">Filter Search:</span>
        <button 
          v-if="hasActiveFilters" 
          class="clear-filters-btn"
          @click="clearFilters"
        >
          Clear
        </button>
      </div>
      <div class="filters-grid">
        <label 
          v-for="section in sections" 
          :key="section"
          class="filter-checkbox"
        >
          <input 
            type="checkbox" 
            :value="section"
            v-model="selectedSections"
            @change="updateFilters"
          />
          <span>{{ section }}</span>
        </label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'

const sections = [
  'User Guide',
  'Learning', 
  'API',
  'Administration',
  'Developer',
  'Release Notes',
  'General',
]

const selectedSections = ref<string[]>([])
const showFilters = ref(false)

const hasActiveFilters = computed(() => selectedSections.value.length > 0)

const updateFilters = () => {
  // Store selection in localStorage
  localStorage.setItem('docsearch-section-filters', JSON.stringify(selectedSections.value))
  
  // Dispatch event for other components to listen to
  window.dispatchEvent(new CustomEvent('docsearch-filters-updated', {
    detail: { selectedSections: selectedSections.value }
  }))
  
  // Trigger re-search if DocSearch is open
  triggerDocSearchUpdate()
}

const clearFilters = () => {
  selectedSections.value = []
  localStorage.removeItem('docsearch-section-filters')
  triggerDocSearchUpdate()
}

const triggerDocSearchUpdate = () => {
  // Find the DocSearch input and trigger an input event to refresh results
  const docSearchInput = document.querySelector('.DocSearch-Input') as HTMLInputElement
  if (docSearchInput) {
    // Trigger input event to refresh search results with new filters
    docSearchInput.dispatchEvent(new Event('input', { bubbles: true }))
  }
}

// Restore filters from localStorage on mount
const restoreFilters = () => {
  const stored = localStorage.getItem('docsearch-section-filters')
  if (stored) {
    try {
      selectedSections.value = JSON.parse(stored)
    } catch (e) {
      console.error('Failed to restore search filters:', e)
    }
  }
}

onMounted(() => {
  restoreFilters()
  
  // Close filters panel when clicking outside
  document.addEventListener('click', (e) => {
    const container = document.querySelector('.docsearch-filters-container')
    if (container && !container.contains(e.target as Node)) {
      showFilters.value = false
    }
  })
})
</script>

<style scoped>
.docsearch-filters-container {
  position: relative;
  display: inline-flex;
  align-items: center;
}

.filter-toggle-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 6px 10px;
  background: none;
  border: 1px solid var(--c-border);
  border-radius: 6px;
  color: var(--c-text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 13px;
  position: relative;
}

.filter-toggle-btn:hover {
  color: var(--c-brand);
  border-color: var(--c-brand);
  background-color: var(--c-bg-light);
}

.filter-toggle-btn.active {
  color: var(--c-brand);
  border-color: var(--c-brand);
  background-color: var(--c-brand-light);
}

.filter-icon {
  width: 16px;
  height: 16px;
}

.filter-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  background-color: var(--c-brand);
  color: var(--c-text);
  border-radius: 9px;
  font-size: 11px;
  font-weight: 600;
}

.docsearch-filters {
  position: absolute;
  top: 100%;
  right: 0;
  margin-top: 8px;
  padding: 8px 12px;
  background-color: var(--vp-c-bg);
  border: 1px solid var(--c-border);
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  min-width: 240px;
}

html.dark .docsearch-filters {
  background-color: var(--vp-c-bg-soft);
  border-color: var(--c-border);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}

.filters-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0px;
  padding-bottom: 0px;
  border-bottom: 1px solid var(--c-border);
}

.filters-label {
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  color: var(--c-text-secondary);
  letter-spacing: 0.5px;
}

.clear-filters-btn {
  padding: 2px 6px;
  font-size: 11px;
  background: none;
  border: 1px solid var(--c-border);
  border-radius: 3px;
  color: var(--c-text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.clear-filters-btn:hover {
  background-color: var(--c-bg-light);
  border-color: var(--c-brand);
  color: var(--c-brand);
}

.filters-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0px;
}

.filter-checkbox {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  user-select: none;
  font-size: 13px;
  color: var(--c-text);
  padding: 0px 0;
  transition: color 0.2s ease;
}

.filter-checkbox input[type='checkbox'] {
  cursor: pointer;
  margin: 0;
  width: 18px;
  height: 18px;
  accent-color: var(--c-brand);
  flex-shrink: 0;
}

.filter-checkbox:hover {
  color: var(--c-brand);
}

.filter-checkbox input[type='checkbox']:checked + span {
  font-weight: 600;
  color: var(--c-brand);
}

.filter-checkbox input[type='checkbox']:checked {
  background-color: var(--c-brand);
}
</style>
