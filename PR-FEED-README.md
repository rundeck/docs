# PR Feed Generator

This script generates RSS/Atom feeds and markdown pages from recently merged pull requests in both the Rundeck repositories. It's designed to be run as part of the SaaS release process to keep customers informed about development updates deployed to the Runbook Automation SaaS platform.

## Use Case

**SaaS Release Communication**: The Runbook Automation team releases to SaaS approximately weekly (and sometimes more frequently for urgent updates). These changes come from both the public `rundeck/rundeck` repo and the private `rundeckpro/rundeckpro` repo. Since customers can see public repo changes but not private ones, this tool captures and communicates the full scope of updates deployed to the SaaS platform.

## Features

- ✅ Fetches merged PRs from **both** repositories:
  - **Private**: `rundeckpro/rundeckpro` (filtered by `release-notes/include` label)
  - **Public**: `rundeck/rundeck` (filtered by `release-notes/include` label)
- ✅ Combines and sorts PRs by merge date across both repos
- ✅ Automatically removes `RUN-XXXX` prefixes from PR titles (matching notes.mjs logic)
- ✅ Generates both RSS 2.0 and Atom feeds
- ✅ Creates VuePress-compatible markdown pages
- ✅ Template-based content using Nunjucks (like notes.mjs)
- ✅ Comprehensive error handling

## Initial Setup (One-time)

1. **Create `.env` file** in project root:
   ```bash
   touch .env
   ```

2. **Add your GitHub token**:
   ```env
   GH_API_TOKEN=ghp_your_actual_token_here
   ```
   
   Get a token at: https://github.com/settings/tokens (needs `repo` scope)

3. **Verify Dependencies** - Already in `package.json`:
   - `@octokit/rest` - GitHub API client
   - `dotenv` - Environment variable loading
   - `yargs` - Command-line argument parsing
   - `nunjucks` - Template engine

## Weekly Release Process

Run after each SaaS deployment:

```bash
npm run pr-feed
```

The script will automatically show all PRs merged since the last self-hosted release (configured in `pr-feed-config.json`).

Then commit the generated files:

```bash
git add docs/history/updates/index.md
git add docs/.vuepress/public/feeds/
git commit -m "Update SaaS deployment feed"
git push
```

### Updating the Release Baseline

**Automatic**: When you run `notes.mjs` to create release notes, it automatically updates `pr-feed-config.json`:

```bash
node ./docs/.vuepress/notes.mjs --milestone=5.9.0
# This automatically updates pr-feed-config.json with version 5.9.0 and today's date
```

**Manual** (if needed), edit `docs/.vuepress/pr-feed-config.json`:

```json
{
  "lastSelfHostedRelease": {
    "version": "5.9.0",
    "date": "2024-11-15",
    "description": "Last self-hosted release version and date"
  }
}
```

## Command Reference

### Basic Commands

```bash
# Default: Show PRs since last self-hosted release
npm run pr-feed

# Override to use time-based lookback
npm run pr-feed -- --days=7

# Include specific section from PR descriptions
npm run pr-feed -- --include-section="Customer Summary"

# Different repository
node ./docs/.vuepress/pr-feed.mjs --owner=rundeck --repo=rundeck
```

### Command-Line Options

| Option | Alias | Default | Description |
|--------|-------|---------|-------------|
| `--days` | `-d` | *(uses config)* | Number of days to look back (overrides --since-release) |
| `--since-release` | | `true` | Show PRs since last self-hosted release from config |
| `--owner` | `-o` | `rundeckpro` | GitHub repository owner |
| `--repo` | `-r` | `rundeckpro` | GitHub repository name |
| `--labels` | `-l` | `release-notes/include` | Labels to include (space-separated) |
| `--exclude-labels` | | `wip, do-not-publish` | Labels to exclude |
| `--max-prs` | | `100` | Maximum number of PRs to fetch |
| `--include-section` | | `Release Notes` | Include specific section from PR body |
| `--help` | | | Show help message |

### How It Works

**Dual-Repository Fetching:**
1. Fetches PRs from `rundeckpro/rundeckpro` (filtered by `release-notes/include` label)
2. Fetches PRs from `rundeck/rundeck` (filtered by `release-notes/include` label)
3. Combines results and sorts by merge date
4. Removes duplicate PR titles if they appear in both repos (rare but possible)

**Default Behavior (`--since-release`):**
- Reads `pr-feed-config.json` to find last self-hosted release date
- Shows all PRs merged after that date from both repositories
- No need to remember when you last ran it

**Override with `--days`:**
- Explicitly specify a lookback window
- Useful for testing or special cases
- Still fetches from both repos

## What Gets Generated

### 1. Markdown Page
**Location**: `docs/history/updates/index.md`  
**URL**: https://docs.rundeck.com/docs/history/updates/

A complete, standalone VuePress page with:
- Context about the updates and SaaS releases
- Subscription links for RSS/Atom feeds
- Information about the difference between SaaS and self-hosted
- All PRs listed under "Recent Changes" heading
- Rich formatting with cleaned PR titles and merge dates
- Optional "Release Notes" sections from PR descriptions
- Automatic reference to the last self-hosted release version

**Note**: This file is completely regenerated on each run from the template. To modify static content, edit the template (see below).

### 2. RSS Feed
**Location**: `docs/.vuepress/public/feeds/development.xml`  
**URL**: https://docs.rundeck.com/feeds/development.xml

RSS 2.0 feed compatible with most feed readers.

### 3. Atom Feed
**Location**: `docs/.vuepress/public/feeds/development-atom.xml`  
**URL**: https://docs.rundeck.com/feeds/development-atom.xml

Atom 1.0 feed for modern feed readers.

## Editing Static Content

The generated `index.md` page is created from a Nunjucks template, similar to how `notes.mjs` works:

**Template Location**: `docs/.vuepress/pr-feed.md.nj`

To change the static parts of the page (headings, descriptions, subscription text, etc.), edit the template file directly.

### Template Variables

- `{{currentDate}}` - ISO timestamp for frontmatter
- `{{lastUpdated}}` - Formatted date string (YYYY-MM-DD)
- `{{periodDescription}}` - Description like "merged since the last self-hosted release"
- `{{releaseInfo}}` - Optional release version and date info
- `{{prs}}` - Array of PR objects with:
  - `cleanTitle` - PR title with RUN-XXXX prefixes removed
  - `mergedDate` - Formatted merge date
  - `sectionContent` - Optional extracted section (if `--include-section` used)

After editing the template, run `npm run pr-feed` to regenerate the page with your changes.

## PR Description Best Practices

Structure your PR descriptions with clear sections to take advantage of the `--include-section` feature:

```markdown
## Release Notes
Brief customer-facing description of the change.
This will be included in the feed by default.

## PR Details
Implementation specifics and technical details.

## Testing
Testing approach and verification steps.
```

**Default section**: `## Release Notes` is extracted by default. Make sure to include another section header (like `## PR Details`) to separate customer-facing content from internal details.

## Integration with Release Process

### SaaS Deployment
1. Deploy to SaaS production
2. Run `npm run pr-feed`
3. Review generated `docs/history/updates/index.md`
4. Commit and push changes

### Self-Hosted Release
When creating a new self-hosted release, `notes.mjs` automatically updates the PR feed baseline:

```bash
node ./docs/.vuepress/notes.mjs --milestone=5.9.0
# Automatically updates pr-feed-config.json
```

Next time you run `npm run pr-feed`, it will show PRs merged after this release date.

## Troubleshooting

### "GH_API_TOKEN not set"
Create `.env` file with your GitHub token (see Initial Setup).

### "Repository not found"
- Verify your token has the `repo` scope
- Check that you have access to the private repository
- Ensure the owner/repo names are correct

### "No PRs found"
- No PRs were merged in the specified time period
- No PRs have the required labels
- Try expanding the date range: `--days=30`

### PR titles still have RUN-XXXX prefixes
The script automatically removes `RUN-XXXX` prefixes using the regex pattern: `/^(RUN-[0-9]+\s*)+:?\s*/g`

If you see prefixes that weren't removed, they may not match this pattern.

## Customization

### Label Filtering
Use different labels:
```bash
node ./docs/.vuepress/pr-feed.mjs --labels feature bugfix enhancement
```

### Different Repository
```bash
node ./docs/.vuepress/pr-feed.mjs --owner=rundeck --repo=rundeck --days=14
```

### Output Location
```bash
node ./docs/.vuepress/pr-feed.mjs --output-dir=./docs/some-other-location
```

## Implementation Notes

### Pattern Matching with notes.mjs
This script follows the same patterns as `notes.mjs`:
- Uses ES modules (`.mjs` extension)
- Uses Nunjucks templates for content generation
- Uses Octokit for GitHub API access
- Loads environment variables with `dotenv`
- Parses CLI arguments with `yargs`
- Follows the same code style and structure

### Key Differences from notes.mjs
- **SaaS vs Self-Hosted**: Focuses on SaaS deployments vs version-specific self-hosted releases
- **Time/Release-based**: Uses recent time periods or release dates instead of specific milestones
- **Continuous updates**: Generates standalone pages for ongoing updates
- **Customer communication**: Designed for SaaS customers via RSS/Atom feeds
- **Label filtering**: Uses `release-notes/include` for rundeckpro PRs
- **Shared logic**: Uses same PR title cleaning regex as notes.md.nj template

## License

This script is part of the Rundeck documentation project and follows the same license as the main repository.
