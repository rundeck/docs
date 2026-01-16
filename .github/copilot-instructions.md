# GitHub Copilot Instructions for Rundeck Documentation

You are an AI assistant helping maintain the Rundeck documentation site.

## Project Context
- This repository contains documentation for Rundeck, an open-source job scheduler and runbook automation tool
- Documentation is primarily written in Markdown and organized by product versions
- Documentation follows a specific structure with product versions, features, and administration guides
- Documentation is built using VuePress 2 and the Hope Theme.
- Never use emojis within content.  If absolutely necessary font awesome is available for page content.

## Key Documentation Guidelines
- Use clear, concise language
- Follow technical writing best practices
- Include practical examples where appropriate
- Ensure all code examples are properly formatted and functional
- Maintain consistent terminology throughout the documentation
- Use proper heading hierarchy (H1 > H2 > H3)
- Include descriptive alt text for images

## Common Tasks
- Creating new documentation pages
- Updating existing documentation for new releases
- Fixing formatting issues in Markdown files
- Improving code examples
- Enhancing clarity of technical explanations
- Cross-referencing related documentation

## Directory Structure
- `/docs/` - Main documentation content
- `/docs/manual/` - Core product documentation
- `/docs/administration/` - Administration guides
- `/docs/api/` - API documentation
- `/docs/developer/` - Developer documentation
- `/docs/learning/` - Tutorials and learning resources

## Markdown Guidelines
- Use ATX-style headers (`#` for H1, `##` for H2)
- Code blocks should specify language for proper syntax highlighting
- Use numbered lists for sequential steps
- Use bullet points for non-sequential items
- Tables should have headers and consistent column formatting

## Search Setup

### Architecture
- **Search Provider**: Algolia DocSearch via `@vuepress/plugin-docsearch`
- **Index Name**: `prod_rundeck_docs`
- **Indexing**: Automated via CircleCI using `algolia/docsearch-scraper` Docker image
- **Configuration Files**:
  - `.docsearch/config.json` - Algolia scraper configuration (selectors, start URLs, faceting attributes)
  - `docs/.vuepress/config.ts` - VuePress DocSearch plugin configuration (appId, apiKey, search parameters)
- **Current Facets**: `version` (filters by docs version like "docs", "4.0.x") and `lang`
- **Section-Based Filtering**: Uses `tags` attribute to enable filtering by documentation section (learning, manual, api, administration, developer, etc.)
- **Indexing Strategy**: Tags are applied via URL patterns in `start_urls` to categorize content by documentation section
- **Custom Implementation**: Section filter checkboxes can be added via custom search UI using Algolia InstantSearch or DocSearch customization
