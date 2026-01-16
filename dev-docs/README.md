# Developer Documentation

This directory contains internal documentation for developers working on the Rundeck documentation project. These guides cover build processes, automation scripts, and architectural decisions.

## Contents

### 📋 [PR-FEED-README.md](./PR-FEED-README.md)
**SaaS Development Feed Generator**

Comprehensive guide for generating RSS/Atom feeds and markdown pages from recently merged pull requests in Rundeck repositories. This script is run as part of the SaaS release process to communicate updates deployed to Runbook Automation SaaS.

**Key Topics:**
- Weekly SaaS release workflow
- Tag-based PR comparison
- Configuration management
- Feed generation (RSS 2.0 and Atom 1.0)
- Integration with release notes process

**Usage:** `npm run pr-feed`

---

### 🔍 [DOCSEARCH_FILTERS_README.md](./DOCSEARCH_FILTERS_README.md)
**DocSearch Section Filters Integration**

Technical documentation for the custom DocSearch filter component that allows users to filter documentation search results by section (Learning, API, Administration, etc.).

**Key Topics:**
- Component architecture (Vue + VuePress)
- Client-side plugin integration
- Algolia request interception
- LocalStorage persistence
- Automatic navbar injection

**Files Covered:**
- `docs/.vuepress/components/DocSearchFilters.vue`
- `docs/.vuepress/plugins/docsearch-filters.ts`
- `docs/.vuepress/client.ts`

---

## Related Documentation

### Main Project Documentation
- **[README.md](../README.md)** - Main project README with setup, release notes, and workflow instructions
- **[.github/copilot-instructions.md](../.github/copilot-instructions.md)** - AI assistant instructions for code generation

### Build Scripts
- **`notes.mjs`** - Self-hosted release notes generator (tag-based)
- **`pr-feed.mjs`** - SaaS development feed generator
- **`pr-utils.mjs`** - Shared utility functions

### Configuration Files
- **`pr-feed-config.json`** - PR feed baseline configuration
- **`.docsearch/config.json`** - Algolia DocSearch configuration
- **`docs/.vuepress/config.ts`** - VuePress site configuration

---

## Contributing

When adding new internal documentation:

1. **Place it in this directory** (`dev-docs/`)
2. **Update this README** with a description and link
3. **Reference from main README** if it's a key workflow
4. **Keep it updated** as the implementation changes

---

## Notes

- This directory is for **internal/developer documentation only**
- User-facing documentation belongs in `/docs/`
- These files are **not** published to docs.rundeck.com
- Complements the Copilot instructions in `.github/`
