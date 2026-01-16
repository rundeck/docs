# DocSearch Filters Integration

This guide explains how to integrate the section filtering component into your Rundeck documentation search.

## Components Created

### 1. DocSearchFilters.vue
- Location: `docs/.vuepress/components/DocSearchFilters.vue`
- A Vue component that provides a filter button with a dropdown panel
- Shows section checkboxes (Learning, User Guide, API, Administration, Developer, Release Notes, General)
- Persists filter selections in localStorage
- Dispatches custom events when filters change

### 2. docsearch-filters.ts Plugin
- Location: `docs/.vuepress/plugins/docsearch-filters.ts`
- Client-side plugin that integrates filters with DocSearch
- Listens for filter update events and applies them to DocSearch
- Monitors DocSearch modal for filter restoration

### 3. Client Configuration Updates
- Updated `docs/.vuepress/client.ts` to initialize the filter integration
- Imports and calls `initializeDocSearchFilters()` on app startup

## Integration in Layout

To add the filter button to your navbar, you have two options:

### Option A: Add to Custom Navbar (Recommended)
Edit your navbar menu file to include the component.

### Option B: Add to Layout (Alternative)
You can add it to a navbar slot in `Layout.vue`:

```vue
<template #navbarEnd>
  <DocSearchFilters />
</template>
```

Or create a custom navbar that includes the component.

## How It Works

1. **User clicks the filter button** (funnel icon with badge)
2. **Filter dropdown opens** showing available section tags
3. **User selects/deselects sections** via checkboxes
4. **Selections are stored** in localStorage
5. **Filter state is dispatched** via custom event
6. **DocSearch monitors** and applies the filter state
7. **Results are filtered** by Algolia based on selected tags

## Configuration

### Available Sections
The component currently supports these sections (from `config.json` tags):
- Learning
- User Guide
- API
- Administration
- Developer
- Release Notes
- General

To add new sections:
1. Update `.docsearch/config.json` to add new `start_urls` with tags
2. Update the `sections` array in `DocSearchFilters.vue`

### VuePress Configuration
The DocSearch configuration in `docs/.vuepress/config.ts` includes:
```typescript
searchParameters: {
  hitsPerPage: 100,
  facetFilters: [`version:${setup.base}`],
  facets: ['tags']
}
```

The `facets: ['tags']` tells Algolia to include tags as filterable attributes.

## Styling

The component uses VuePress theme variables for styling:
- `--c-brand` - Brand color
- `--c-border` - Border color
- `--c-text-secondary` - Secondary text color
- `--c-bg`, `--c-bg-light` - Background colors

It automatically adapts to dark mode using `html.dark` selector.

## Testing

To test the filters:

1. Build/run the docs: `npm run docs:dev`
2. Click the filter button in the navbar
3. Select a section (e.g., "Learning")
4. Perform a search
5. Results should only show items tagged with the selected section
6. Refresh the page - filter selections persist via localStorage

## Troubleshooting

### Filters not appearing in results
- Ensure Algolia index has been re-scraped with new tags
- Check that `facets: ['tags']` is in the config
- Verify the section tags match what's in `config.json`

### localStorage not working
- Browser privacy mode disables localStorage
- Clear localStorage and refresh if there are issues

### Component not visible
- Ensure DocSearchFilters component is imported and placed in the layout
- Check browser console for Vue component registration errors
