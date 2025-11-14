# PR Feed Generator

This script generates RSS/Atom feeds and markdown pages from recently merged pull requests in both the Rundeck repositories. It's designed to be run as part of the SaaS release process to keep customers informed about development updates deployed to the Runbook Automation SaaS platform.

## Use Case

**SaaS Release Communication**: The Runbook Automation team releases to SaaS approximately weekly (and sometimes more frequently for urgent updates). These changes come from both the public `rundeck/rundeck` repo and the private `rundeckpro/rundeckpro` repo. Since customers can see public repo changes but not private ones, this tool captures and communicates the full scope of updates deployed to the SaaS platform.

## Features

- Fetches merged PRs from **both** repositories:
  - **Private**: `rundeckpro/rundeckpro` (filtered by `release-notes/include` label)
  - **Public**: `rundeck/rundeck` (filtered by `release-notes/include` label)
- **Tag-based comparison**: Uses git tags instead of dates for accurate PR detection
- **SaaS cut support**: Limits PRs to those included in the most recent SaaS deployment cut
- **Submodule awareness**: Automatically finds the correct rundeck commit from rundeckpro tags
- **All merge strategies**: Handles merge commits, squash merges, and rebase merges
- Combines and sorts PRs by merge date across both repos
- Automatically removes `RUN-XXXX` prefixes from PR titles (matching notes.mjs logic)
- Generates both RSS 2.0 and Atom feeds
- Creates VuePress-compatible markdown pages
- Template-based content using Nunjucks (like notes.mjs)
- Comprehensive error handling

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

The script will automatically:
1. Use git tag comparison (v5.17.0 to SaaS cut tag) to find PRs
2. For rundeckpro: Compare v5.17.0 to the `lastSaasCut` tag
3. For rundeck: Extract the submodule commit from the SaaS cut tag and use that as the endpoint
4. Show only PRs that were included in the most recent SaaS deployment

Then commit the generated files:

```bash
git add docs/history/updates/index.md
git add docs/.vuepress/public/feeds/
git commit -m "Update SaaS deployment feed"
git push
```

### Updating the Configuration

The `pr-feed-config.json` file tracks three key values:

```json
{
  "lastSelfHostedRelease": {
    "version": "5.17.0",
    "lastSelfHostedDate": "2025-10-22",
    "lastSaasRelease": "2025-11-04",
    "lastSaasCut": "rba/5.18-RBA-20251030-2f39445-a6d9e14",
    "description": "Last self-hosted release version and date"
  }
}
```

**When to update each field:**

1. **`version` and `lastSelfHostedDate`**: Updated automatically by `notes.mjs` when creating self-hosted release notes
   ```bash
   node ./docs/.vuepress/notes.mjs --milestone=5.18.0
   # Automatically updates version and date
   ```

2. **`lastSaasRelease`**: Update manually after deploying to SaaS production (displayed on the updates page)

3. **`lastSaasCut`**: Update manually each time you cut a release (typically weekly)
   - This is the tag created when you build the release candidate
   - Format: `rba/${vNum}-RBA-${vDate}-${coreSha}-${proSha}`
     - `vNum`: Next major version (e.g., `5.18`)
     - `vDate`: Date the cut was made (YYYYMMDD)
     - `coreSha`: Short SHA of the rundeck (core) submodule commit
     - `proSha`: Short SHA of the rundeckpro commit
   - Example: `rba/5.18-RBA-20251030-2f39445-a6d9e14`
   - The script parses this tag to extract the exact commit SHAs
   - PRs merged after these commits will NOT appear in the feed until the next cut

**Example workflow:**
1. Wednesday: Cut release → Update `lastSaasCut` with the new tag
2. Monday: Deploy to production → Update `lastSaasRelease` with deployment date
3. Monday: Run `npm run pr-feed` → Shows PRs between last release and the cut tag
4. Repeat weekly

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
| `--days` | `-d` | *(uses config)* | Number of days to look back (overrides tag-based mode) |
| `--since-release` | | `true` | Use tag-based comparison from last self-hosted release |
| `--labels` | `-l` | `release-notes/include` | Labels to include (space-separated) |
| `--exclude-labels` | | `wip, do-not-publish` | Labels to exclude |
| `--max-prs` | | `100` | Maximum number of PRs to fetch per repository |
| `--include-section` | | `Release Notes` | Include specific section from PR body |
| `--output-dir` | | `docs/history/updates` | Output directory for markdown page |
| `--help` | | | Show help message |

### How It Works

**Tag-Based Comparison (Default):**
1. Reads `pr-feed-config.json` to get:
   - Last self-hosted release version (e.g., `5.17.0`)
   - SaaS cut tag (e.g., `rba/5.18-RBA-20251030-2f39445-a6d9e14`)
2. Parses the SaaS cut tag to extract:
   - `coreSha` (2f39445): The rundeck submodule commit
   - `proSha` (a6d9e14): The rundeckpro commit
3. For **rundeckpro**: Compares `v5.17.0` tag to `proSha` commit using `git.compareCommits`
4. For **rundeck**: Compares `v5.17.0` tag to `coreSha` commit using `git.compareCommits`
5. Finds all commits between these points and extracts associated PRs
6. Handles all merge strategies: merge commits, squash merges, and rebase merges
7. Filters by `release-notes/include` label
8. Combines results and sorts by merge date

**Why Tag-Based?**
- More accurate than date-based queries
- Tags represent actual git history, not approximate dates
- Correctly handles retroactive tagging scenarios
- Aligns with actual release cuts and deployments
- Ensures you only see PRs that are truly included in the deployment

**Tag Format Benefits:**
- Minimal API lookups needed - commit SHAs are directly in the tag (no tag object API calls needed)
- Guarantees accuracy - uses the exact commits from the build
- Simple parsing - reliable extraction from standardized format
- Fast execution - no need to traverse git trees

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

### Time-Based Override
For testing or special cases, you can override tag-based comparison with time-based:
```bash
npm run pr-feed -- --days=7
```

### Label Filtering
Use different labels:
```bash
node ./docs/.vuepress/pr-feed.mjs --labels feature bugfix enhancement
```

### Output Location
```bash
node ./docs/.vuepress/pr-feed.mjs --output-dir=./docs/some-other-location
```

## Implementation Notes

### Shared Utilities with notes.mjs

Both `pr-feed.mjs` and `notes.mjs` now use shared functions from `pr-utils.mjs`:

**Shared Functions:**
- `fetchPRsBetweenTags()` - Compare two git tags to find all PRs
- `extractPRSection()` - Extract specific sections from PR bodies (e.g., "Release Notes")
- `cleanPRTitle()` - Remove RUN-XXXX prefixes from PR titles
- `parseSaasCutTag()` - Parse SaaS cut tag format to extract commit SHAs
- `getPreviousVersion()` - Auto-decrement version numbers (e.g., 5.17.0 → 5.16.0)

This ensures consistent behavior across both scripts and reduces code duplication.

### Pattern Matching with notes.mjs

This script follows the same patterns as `notes.mjs`:
- Uses ES modules (`.mjs` extension)
- Uses Nunjucks templates for content generation
- Uses Octokit for GitHub API access
- Loads environment variables with `dotenv`
- Parses CLI arguments with `yargs`
- Follows the same code style and structure
- Both now use tag-based comparison (not milestones)

### Key Differences from notes.mjs

- **SaaS vs Self-Hosted**: Focuses on SaaS deployments vs version-specific self-hosted releases
- **Continuous updates**: Generates standalone pages for ongoing updates vs one-time release notes
- **SaaS cut awareness**: Limits PRs to those in the deployment cut (not everything in main)
- **Submodule handling**: Automatically resolves rundeck submodule commits from rundeckpro tags
- **Customer communication**: Designed for SaaS customers via RSS/Atom feeds
- **Feed generation**: Creates RSS 2.0 and Atom 1.0 feeds

### Similarity to notes.mjs

- **Both use tag-based comparison**: Compare git tags to find PRs between releases
- **Both handle all merge strategies**: Merge commits, squash merges, and rebase merges
- **Both use shared utilities**: Common functions from `pr-utils.mjs`
- **Both extract PR sections**: Pull "Release Notes" sections from PR bodies
- **Both filter by labels**: Use `release-notes/include` for enterprise PRs

## Technical Details

### Merge Strategy Support
The script handles all three GitHub merge strategies:
1. **Merge commits**: Detected via "Merge pull request #X" in commit message
2. **Squash merges**: Detected via `listPullRequestsAssociatedWithCommit` API
3. **Rebase merges**: Each rebased commit is associated with its PR via GitHub API

### SaaS Cut Tag Parsing
The `lastSaasCut` tag follows the format: `rba/${vNum}-RBA-${vDate}-${coreSha}-${proSha}`

Example: `rba/5.18-RBA-20251030-2f39445-a6d9e14`
- `5.18` - Next major version number
- `20251030` - Cut date (October 30, 2025)
- `2f39445` - Short SHA of rundeck (core) submodule commit
- `a6d9e14` - Short SHA of rundeckpro commit

The script parses this format to extract commit SHAs directly, eliminating the need for:
- API calls to fetch tag objects
- Git tree traversal to find submodules
- Handling of annotated vs lightweight tags

This ensures the exact commits used in the build are compared, guaranteeing accuracy.

## Related Documentation

- **[README.md](./README.md)** - Main documentation project setup and release notes generation
- **[MIGRATION-NOTES.md](./docs/.vuepress/MIGRATION-NOTES.md)** - Migration guide from milestone-based to tag-based approach
- **`notes.mjs`** - Self-hosted release notes generator (uses same shared utilities)
- **`pr-utils.mjs`** - Shared utility functions used by both scripts

## License

This script is part of the Rundeck documentation project and follows the same license as the main repository.
