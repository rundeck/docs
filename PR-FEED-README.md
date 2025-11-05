# PR Feed Generator

This script generates RSS/Atom feeds and markdown pages from recently merged pull requests in the private rundeckpro repository. It's designed to be run as part of the SaaS release process to keep customers informed about development updates deployed to the Runbook Automation SaaS platform.

## Use Case

**SaaS Release Communication**: The Runbook Automation team releases to SaaS approximately weekly (and sometimes more frequently for urgent updates). These changes come from both the public `rundeck` repo and the private `rundeckpro` repo. Since customers can see public repo changes but not private ones, this tool captures and communicates the full scope of updates deployed to the SaaS platform.

## Features

- ✅ Fetches merged PRs from private `rundeckpro/rundeckpro` repository
- ✅ Filters PRs with the `release-notes/include` label
- ✅ Automatically removes `RUN-XXXX` prefixes from PR titles (matching notes.mjs logic)
- ✅ Groups PRs by category for better organization
- ✅ Generates both RSS 2.0 and Atom feeds
- ✅ Creates VuePress-compatible markdown pages
- ✅ Configurable lookback period (days)
- ✅ Comprehensive error handling
- ✅ Follows the same patterns as the existing notes.mjs script

# Quick Start: PR Feed Generator

## Initial Setup (One-time)

1. Create `.env` file in project root:
```bash
cp .env.example .env
```

2. Edit `.env` and add your GitHub token:
```env
GH_API_TOKEN=ghp_your_actual_token_here
```

Get a token at: https://github.com/settings/tokens (needs `repo` scope)

## Weekly Release Process

**Simple approach - just run after each SaaS deployment:**

```bash
npm run pr-feed
```

The script will automatically show all PRs merged since the last self-hosted release (configured in `pr-feed-config.json`).

Then commit the generated files:

```bash
git add docs/history/updates/recent-changes.md
git add docs/.vuepress/public/feeds/
git commit -m "SaaS deployment updates"
git push
```

**Timing**: Run after deploying to production SaaS, typically weekly or as needed for urgent releases.

### Updating the Release Baseline

**Automatic**: When you run `notes.mjs` to create release notes, it automatically updates `pr-feed-config.json`:

```bash
node ./docs/.vuepress/notes.mjs --milestone=5.9.0
# This automatically updates pr-feed-config.json with version 5.9.0 and today's date
```

**Manual** (if needed):

```json
{
  "lastSelfHostedRelease": {
    "version": "5.9.0",
    "date": "2024-11-15",
    "description": "Last self-hosted release version and date"
  }
}
```

This automatically resets the baseline - no need to track when you last ran the script!

## Common Commands

```bash
# Default: Show PRs since last self-hosted release (from pr-feed-config.json)
npm run pr-feed

# Override to use time-based lookback instead
npm run pr-feed -- --days=7

# Include a specific section from PR descriptions (e.g., "Customer Summary")
npm run pr-feed -- --include-section="Customer Summary"

# Weekly lookback (ignores config file)
npm run pr-feed:weekly

# Monthly lookback (ignores config file)
npm run pr-feed:monthly

# Different repository
node ./docs/.vuepress/generate-pr-feed.mjs --owner=rundeck --repo=rundeck
```

### How It Works

**Default Behavior (`--since-release`):**
- Reads `pr-feed-config.json` to find last self-hosted release date
- Shows all PRs merged after that date
- No need to remember when you last ran it
- Perfect for showing "everything new since the last versioned release"

**Override with `--days`:**
- Explicitly specify a lookback window
- Useful for testing or special cases
- Example: `--days=3` for just this week's urgent release

## PR Description Best Practices

To take advantage of the `--include-section` feature, structure your PR descriptions with clear sections:

```markdown
## Customer Summary
Brief description of the change from a customer perspective.
This section will be included in the feed if --include-section="Customer Summary" is used.

## Technical Details
Implementation specifics (not included in feed by default)

## Testing
Testing approach (not included in feed by default)
```

**Recommended sections for customer-facing PRs:**
- `## Customer Summary` - User-facing description
- `## Release Notes` - What to include in release notes
- `## Breaking Changes` - Any breaking changes

The script will automatically extract just the specified section and include it beneath the PR title in the generated feed.

## What Gets Generated

1. **Markdown Page**: `docs/history/updates/recent-changes.md`
   - Viewable at: https://docs.rundeck.com/docs/history/updates/recent-changes.html
   - This is a **complete standalone page** with context, subscription info, and the list of changes
   - Completely regenerated each time (any manual edits will be overwritten)

2. **RSS Feed**: `docs/.vuepress/public/feeds/development.xml`
   - Subscribe at: https://docs.rundeck.com/feeds/development.xml

3. **Atom Feed**: `docs/.vuepress/public/feeds/development-atom.xml`
   - Subscribe at: https://docs.rundeck.com/feeds/development-atom.xml

## Editing Static Content

The generated `index.md` page is created from a [Nunjucks](https://mozilla.github.io/nunjucks/) template, similar to how `notes.mjs` works:

**Template Location**: `docs/.vuepress/pr-feed.md.nj`

To change the static parts of the page (headings, descriptions, subscription text, etc.), edit the template file directly. The template uses these variables:

- `{{currentDate}}` - ISO timestamp for frontmatter
- `{{lastUpdated}}` - Formatted date string (YYYY-MM-DD)
- `{{periodDescription}}` - Description like "merged since the last self-hosted release"
- `{{releaseInfo}}` - Optional release version and date info
- `{{prs}}` - Array of PR objects with:
  - `cleanTitle` - PR title with RUN-XXXX prefixes removed
  - `mergedDate` - Formatted merge date
  - `sectionContent` - Optional extracted section (if `--include-section` used)

**Example edits**:
- Change the main heading → Edit `# Recent Development Updates` in the template
- Update subscription text → Edit the `## Subscribe to Updates` section
- Modify the about section → Edit the `## About These Updates` section

After editing the template, run `npm run pr-feed` to regenerate the page with your changes.

## Troubleshooting

**"GH_API_TOKEN not set"**
→ Create `.env` file with your GitHub token

**"Repository not found"**
→ Check token has `repo` scope and access to rundeckpro/rundeckpro

**"No PRs found"**
→ Try longer timeframe: `--days=30` or check label filters

## Full Documentation

See `PR-FEED-README.md` for complete documentation.


## Prerequisites

1. **GitHub Personal Access Token**: You need a GitHub token with access to the private `rundeckpro/rundeckpro` repository.
   - Create a token at: https://github.com/settings/tokens
   - Required scopes: `repo` (Full control of private repositories)

2. **Environment Variables**: Set up your `.env` file (see below)

## Setup

### 1. Create `.env` file

Create a `.env` file in the root of the docs repository:

```bash
# GitHub API Token (required)
# Get yours at: https://github.com/settings/tokens
GH_API_TOKEN=ghp_your_token_here
```

**Important**: Never commit your `.env` file to version control. It should already be in `.gitignore`.

### 2. Verify Dependencies

All required dependencies are already in `package.json`:
- `@octokit/rest` - GitHub API client
- `dotenv` - Environment variable loading
- `yargs` - Command-line argument parsing

### 3. Configure Release Baseline

The script uses `docs/.vuepress/pr-feed-config.json` to track the last self-hosted release:

```json
{
  "lastSelfHostedRelease": {
    "version": "5.8.0",
    "date": "2024-10-15",
    "description": "Last self-hosted release version and date"
  }
}
```

**Note**: This file is automatically updated when you run `notes.mjs` to create release notes. You rarely need to edit it manually.

## Usage

### Basic Commands

```bash
# Generate feed for the last 7 days (default)
npm run pr-feed

# Generate feed for the last 7 days (explicit)
npm run pr-feed:weekly

# Generate feed for the last 30 days
npm run pr-feed:monthly

# Custom number of days
node ./docs/.vuepress/generate-pr-feed.mjs --days=14
```

### Advanced Options

```bash
# Full command with all options
node ./docs/.vuepress/generate-pr-feed.mjs \
  --days=7 \
  --owner=rundeckpro \
  --repo=rundeckpro \
  --labels release-notes/include \
  --exclude-labels wip do-not-publish \
  --max-prs=100
```

### Command-Line Options

| Option | Alias | Default | Description |
|--------|-------|---------|-------------|
| `--days` | `-d` | *(none - uses config)* | Number of days to look back (overrides --since-release) |
| `--since-release` | | `true` | Show PRs since last self-hosted release from config |
| `--owner` | `-o` | `rundeckpro` | GitHub repository owner |
| `--repo` | `-r` | `rundeckpro` | GitHub repository name |
| `--labels` | `-l` | `release-notes/include` | Labels to include (space-separated) |
| `--exclude-labels` | | `wip, do-not-publish` | Labels to exclude (space-separated) |
| `--max-prs` | | `100` | Maximum number of PRs to fetch |
| `--output-dir` | | `./docs/history/updates` | Output directory for markdown page |
| `--include-section` | | *(none)* | Include specific section from PR body (e.g., "Customer Summary") |
| `--help` | | | Show help message |

### Output Format

**Default**: Each PR is shown as a simple list item with title and date:
```markdown
- **Add webhook support for notifications** _(Nov 3, 2025)_
- **Fix job execution timeout issue** _(Nov 2, 2025)_
```

**With `--include-section`**: If PRs have a specific markdown section (like `## Customer Summary`), you can include it:
```bash
npm run pr-feed -- --include-section="Customer Summary"
```

This will look for that section in each PR's description and include it below the title:
```markdown
- **Add webhook support for notifications** _(Nov 3, 2025)_
  This adds support for sending notifications via webhooks to external systems.
  
- **Fix job execution timeout issue** _(Nov 2, 2025)_
  Jobs will no longer timeout prematurely when running long operations.
```

## Output

The script generates three files:

## What Gets Generated

The script generates three types of output:

### 1. Markdown Page
**Location**: `docs/history/updates/index.md`

A complete, standalone VuePress page generated from the Nunjucks template at `docs/.vuepress/pr-feed.md.nj`:
- Context about the updates and SaaS releases
- Subscription links for RSS/Atom feeds
- Information about the difference between SaaS and self-hosted
- All PRs listed under "Recent Changes" heading
- Rich formatting with cleaned PR titles and merge dates
- Optional "Release Notes" sections from PR descriptions
- Automatic reference to the last self-hosted release version

**Note**: This file is regenerated on each run from the template. To modify the static content (headings, descriptions, etc.), edit `docs/.vuepress/pr-feed.md.nj`.

### 2. RSS Feed
**Location**: `docs/.vuepress/public/feeds/development.xml`
**URL**: `https://docs.rundeck.com/feeds/development.xml`

RSS 2.0 feed compatible with most feed readers.

### 3. Atom Feed
**Location**: `docs/.vuepress/public/feeds/development-atom.xml`
**URL**: `https://docs.rundeck.com/feeds/development-atom.xml`

Atom 1.0 feed for modern feed readers.

## Integration with Release Process

### SaaS Release Workflow

1. **After SaaS deployment** (typically weekly or as needed):
   ```bash
   npm run pr-feed
   ```

2. **Review the generated files**:
   - Check `docs/history/updates/recent-changes.md` for accuracy
   - Verify PRs are properly categorized
   - Ensure RUN-XXXX prefixes were removed from titles
   - Edit manually if needed (the markdown is human-readable)

3. **Commit and deploy to docs site**:
   ```bash
   git add docs/history/updates/recent-changes.md
   git add docs/.vuepress/public/feeds/
   git commit -m "SaaS deployment updates for [date]"
   git push
   ```

4. **Build and deploy** your documentation site:
   ```bash
   npm run docs:build
   ```

The feeds will be automatically available at the public URLs, keeping SaaS customers informed of the latest platform updates.

### Self-Hosted Release Workflow

When creating a new self-hosted release:

1. **Generate release notes** (this automatically updates the PR feed baseline):
   ```bash
   node ./docs/.vuepress/notes.mjs --milestone=5.9.0
   # This updates pr-feed-config.json automatically
   ```

2. **Next time you run `pr-feed`**, it will show PRs merged after this release date
   - No manual tracking needed
   - The config file is your single source of truth

## Customization

### Label Filtering

By default, the script only fetches PRs with the `release-notes/include` label from the `rundeckpro/rundeckpro` repository. This matches the logic used in the release notes generation.

To use different labels:

```bash
# Multiple labels
node ./docs/.vuepress/generate-pr-feed.mjs --labels feature bugfix enhancement

# Single label
node ./docs/.vuepress/generate-pr-feed.mjs --labels customer-visible
```

### Using with Different Repositories

To generate feeds from other repositories:

```bash
# From the public rundeck/rundeck repo
node ./docs/.vuepress/generate-pr-feed.mjs \
  --owner=rundeck \
  --repo=rundeck \
  --days=14
```

### Modifying Output Location

The default output location is `docs/history/updates/`. To change it:

```bash
node ./docs/.vuepress/generate-pr-feed.mjs \
  --output-dir=./docs/some-other-location
```

## Troubleshooting

### "Error: GH_API_TOKEN environment variable is not set"

**Solution**: Create a `.env` file with your GitHub token (see Setup section).

### "Repository not found or token lacks access"

**Solutions**:
- Verify your token has the `repo` scope
- Check that you have access to the private repository
- Ensure the owner/repo names are correct

### "No PRs found matching criteria"

**Possible causes**:
- No PRs were merged in the specified time period
- No PRs have the required labels
- Try expanding the date range: `--days=14` or `--days=30`
- Check your label filters with `--labels feature bugfix enhancement`

### PR bodies contain broken markdown

The script attempts to clean up PR descriptions, but some GitHub-specific markdown may not render perfectly. You can manually edit `docs/history/updates/recent-changes.md` after generation.

### PR titles still have RUN-XXXX prefixes

The script automatically removes `RUN-XXXX` prefixes using the regex pattern: `/^(RUN-[0-9]+\s*)+:?\s*/g`

This matches the logic in `notes.md.nj`. If you see prefixes that weren't removed, check that they match this pattern.

## Implementation Notes

### Pattern Matching with notes.mjs

This script follows the same patterns as `notes.mjs`:
- Uses ES modules (`.mjs` extension)
- Uses Octokit for GitHub API access
- Loads environment variables with `dotenv`
- Parses CLI arguments with `yargs`
- Includes comprehensive error handling
- Follows the same code style and structure

### Key Differences from notes.mjs

- **SaaS vs Self-Hosted**: Focuses on SaaS deployments vs version-specific self-hosted releases
- **Time-based vs Milestone-based**: Uses recent time periods instead of specific version milestones
- **Continuous updates**: Generates standalone pages for ongoing updates vs version release notes
- **Customer communication**: Designed for SaaS customers via RSS/Atom feeds
- **Category grouping**: Automatically groups PRs by type (features, bugfixes, etc.)
- **Label filtering**: Uses `release-notes/include` for rundeckpro PRs (vs milestone-based)
- **Shared logic**: Uses same PR title cleaning regex as notes.md.nj template
- **Repository scope**: Captures private repo changes that aren't visible in public rundeck repo

## Example Output

### Sample Markdown Page

```markdown
---
title: Recent Development Updates
description: Latest merged changes from the Rundeck development team
date: 2025-11-05T10:30:00.000Z
feed: true
article: true
---

# Recent Development Updates

Last updated: **2025-11-05**

## 🚀 Features

### Add support for webhook notifications

**Merged:** Nov 3, 2025 | **Author:** [@username](https://github.com/username) | **PR:** [#1234](https://github.com/rundeckpro/rundeckpro/pull/1234)

**Labels:** `feature` `customer-visible`

This PR adds webhook notification support...

---

## 🐛 Bug Fixes

### Fix job execution timeout issue

**Merged:** Nov 2, 2025 | **Author:** [@contributor](https://github.com/contributor) | **PR:** [#1233](https://github.com/rundeckpro/rundeckpro/pull/1233)

**Labels:** `bugfix` `changelog`

Resolves issue where job executions would timeout...

---
```

## Maintenance

### Updating Default Labels

Edit the `--labels` default in `generate-pr-feed.mjs`:

```javascript
.option('labels', {
  alias: 'l',
  type: 'array',
  description: 'Labels to filter PRs (space-separated)',
  default: ['release-notes/include']  // Change this array as needed
})
```

**Current default**: Only PRs with `release-notes/include` label are included.

### Changing Feed Metadata

Edit the CONFIG object in `generate-pr-feed.mjs`:

```javascript
const CONFIG = {
  // ... other options
  feedTitle: 'Your Custom Feed Title',
  feedDescription: 'Your custom feed description',
  siteUrl: 'https://your-site.com',
};
```

## Support

For issues or questions:
1. Check this README first
2. Review the existing `notes.mjs` implementation for reference
3. Check GitHub API documentation: https://docs.github.com/en/rest
4. Contact the documentation team

## License

This script is part of the Rundeck documentation project and follows the same license as the main repository.
