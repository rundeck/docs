# Rundeck Documentation
Rundeck Documentation project.

## Getting Started

### Dependencies
* NodeJS version `24.10.0` is the current version used.
* NVM is helpful in making sure your machine is using the currently supported versions as we upgrade in the future.

### Recommended setup steps
Install `nvm` to manage your NodeJS installations.

Run `nvm install; nvm use;` to install and set the NodeJS version.  (it will use the `.nvmrc` file in the root of this directory as the version we are currently supporting.)

After setting the proper Node version, run this `npm` command before the first you start the docs site locally.

```
npm install
```

>Note: It may be helpful to delete any existing `node_modules` folder and the `package-lock.json` file before running npm install.

## Cloudsmith Authentication Setup

### For PagerDuty employees with Cloudsmith access

Export your Cloudsmith token before installing dependencies:

```bash
export CLOUDSMITH_NPM_TOKEN=your-cloudsmith-token-here
```

### For contributors without Cloudsmith access

Delete the `.npmrc` file in the repository root:

```bash
rm .npmrc
```

# How To 

## Run Locally for Development

```
npm run docs:dev
```

> Compiles and hot-reloads for development. As (most) content changes are made they show up immediately.

## Build

> Compiles and minifies for production.

```
npm run docs:build
```

# Submitting Changes

Rundeck welcomes documentation PRs.  Please submit PRs against the default branch (currently `4.0.x`) and we will review.


# Publishing

Docs will be built and published to a base matching a branch name of
`/4\.[1-9]\..*/`:

- Branch `4.0.x` => `docs.rundeck.com/4.0.x/`
- Branch `4.13.0` => `docs.rundeck.com/4.13.0/`

## Latest

> Version tag must contain the full Rundeck version with date!

Tag a commit to publish the matching version base as well as the main production docs:

- Tag `v4.13.0-20230515` => `docs.rundeck.com/4.13.0/` **AND** `docs.rundeck.com/docs/`


Example Code:
```
git tag -f v4.13.0-20230515
git push -f origin v4.13.0-20230515
```

### Maintenance
For maintenance to docs on previous versions, simply switch to or create the branch:
```bash
# For 3.2.8
git checkout v3.2.8
git checkout -b 3.2.8
git push origin
```

## Documentation Structure

The documentation is organized as follows:
- `/docs/` - Main documentation content (published to docs.rundeck.com)
- `/docs/.vuepress/` - VuePress configuration
- `/docs/.vuepress/public/assets/img/` - Images Folder
- `/dev-docs/` - Internal developer documentation (scripts, architecture, workflows)

# How to Create Release Notes

## Prerequisites

### GitHub API Token Setup

Create a `.env` file in the project root:

```bash
# Create .env file
touch .env

# Add your GitHub API token
echo "GH_API_TOKEN=ghp_your_actual_token_here" > .env
```

Get a token at: https://github.com/settings/tokens

**Required permissions:**
- `repo` - Full control of private repositories
- Access to `rundeckpro/rundeckpro` (private)
- Access to `rundeckpro/sidecar` (private)

### PR Labeling

Both Rundeck Core and Enterprise repositories use the **`release-notes/include`** label:
- PRs with this label will be included in release notes
- PRs without this label will be excluded

**Release Notes Sections:**
The script automatically extracts content from the `## Release Notes` section in PR descriptions. Structure your PRs like this:

```markdown
## Release Notes
Brief customer-facing description of the change.
This content will appear in the generated release notes.

## Technical Details
Implementation specifics (not included in release notes).
```

## Tag-Based Release Notes (Current Approach)

The release notes script uses **git tag comparison** to find all PRs between two releases. This ensures accuracy by capturing all changes in the actual git history.

### Basic Usage

```bash
# Generate release notes (auto-detects previous version)
# Example: 5.17.0 automatically compares with 5.16.0
npm run notes -- --milestone=5.17.0
```

### Version Auto-Detection

| Target Version | Auto-detected Previous | What it compares |
|---------------|------------------------|------------------|
| `5.17.0`      | `5.16.0`              | All PRs between v5.16.0 and v5.17.0 tags |
| `5.17.1`      | `5.17.0`              | All PRs between v5.17.0 and v5.17.1 tags |
| `5.0.0`       | `4.17.0`              | All PRs between v4.17.0 and v5.0.0 tags |

### Custom Version Range

For patch releases or special cases, specify the previous version:

```bash
# Compare 5.17.0 to 5.17.1
npm run notes -- --milestone=5.17.1 --from-version=5.17.0
```

### Draft Mode (Recommended for Testing)

Generate a draft without modifying configuration files:

```bash
# Creates docs/history/5_x/draft.md
npm run notes:draft -- --milestone=5.17.0

# Review the draft
cat docs/history/5_x/draft.md

# When satisfied, generate the final version
npm run notes -- --milestone=5.17.0
```

**Tag Detection:**
- If the tag exists (e.g., `v5.17.0`), draft mode uses the exact tag comparison
- If the tag doesn't exist yet, draft mode automatically uses `HEAD` to preview what will be in the release
  - You'll see: "Warning: Tag 5.17.0 not found, using HEAD for preview"
  - This allows you to preview release notes before creating the tag

## What the Script Does

When you run `npm run notes -- --milestone=5.17.0`, it will:

1. **Compare git tags** to find all PRs between versions (e.g., v5.16.0 → v5.17.0)
2. **Extract Release Notes sections** from PR bodies
3. **Collect contributor information** (excluding bots and internal accounts)
4. **Generate release notes markdown** at `docs/history/5_x/version-5.17.0.md`
5. **Update sidebar and navbar links** (unless `--draft` mode)
6. **Update configuration files**:
   - `.docsearch/config.json` - Search indexing version
   - `docs/.vuepress/setup.js` - Version information
   - `docs/.vuepress/sidebar-menus/history.ts` - Version link
   - `docs/.vuepress/navbar-menus/about.js` - Release notes link
   - `docs/.vuepress/pr-feed-config.json` - PR feed baseline
7. **Handle all merge strategies** (merge commits, squash merges, rebase merges)

> **Note**: The generated file requires manual edits for dates, Overview section, and final descriptions.

## Typical Workflow

### Self-Hosted Release Process

```bash
# 1. Generate draft for review (before tagging)
# If tag doesn't exist yet, uses HEAD for preview
npm run notes:draft -- --milestone=5.17.0

# 2. Review the generated draft
code docs/history/5_x/draft.md

# 3. Create the version tag
git tag v5.17.0
git push origin v5.17.0

# 4. Generate final release notes (updates all configs)
# Now uses the exact tag for accurate PR detection
npm run notes -- --milestone=5.17.0

# 5. Edit the generated file for dates, overview, etc.
code docs/history/5_x/version-5.17.0.md

# 6. Commit all changes
git add docs/history/5_x/version-5.17.0.md
git add docs/.vuepress/sidebar-menus/history.ts
git add docs/.vuepress/navbar-menus/about.js
git add docs/.vuepress/setup.js
git add .docsearch/config.json
git add docs/.vuepress/pr-feed-config.json
git commit -m "Release notes for 5.17.0"
git push
```

**Note:** You can preview with draft mode before creating the tag. Draft mode will use HEAD if the tag doesn't exist yet.

## SaaS Development Updates Feed

For generating RSS/Atom feeds and markdown pages showing recent PRs deployed to the SaaS platform (but not yet in self-hosted releases), see [dev-docs/PR-FEED-README.md](./dev-docs/PR-FEED-README.md).

This feed automatically tracks changes since the last self-hosted release and is updated after each SaaS deployment:

```bash
npm run pr-feed
```

The feed date range is automatically updated when you create release notes - no manual configuration needed!

## Troubleshooting Release Notes

### "Tag X.Y.Z not found" Warning or Error

**In Draft Mode:**
- Shows warning: "Tag 5.18.0 not found, using HEAD for preview"
- Uses HEAD (main branch) to preview PRs
- This is normal before the tag is created

**In Final Mode:**
- Shows error: "Tag 5.18.0 not found. Create the tag first or use --draft mode."
- Creates a placeholder file with minimal content
- Re-run after creating the tag to populate with actual PRs

**Solution:**
1. Use draft mode to preview: `npm run notes:draft -- --milestone=5.18.0`
2. Create the tag when ready: `git tag v5.18.0 && git push origin v5.18.0`
3. Generate final notes: `npm run notes -- --milestone=5.18.0`

**For repo-specific warnings** (`docs`, `ansible-plugin`):
- This is normal - these repos don't use version tags
- They'll be skipped gracefully

### "GH_API_TOKEN environment variable is not set"

**Solution**: Create `.env` file with your GitHub token (see Prerequisites above).

### No PRs found

**Check**:
- Version range is correct
- Tags exist in the repositories
- PRs are merged (not just closed)
- PRs have the required labels (`release-notes/include` for enterprise)

### Get Help

```bash
# View all available options
npm run notes -- --help
```

## Advanced Options

```bash
# Specify custom previous version
npm run notes -- --milestone=5.17.1 --from-version=5.17.0

# Draft mode (doesn't update configs)
npm run notes:draft -- --milestone=5.17.0

# Direct script usage
node ./docs/.vuepress/notes.mjs --milestone=5.17.0 --from-version=5.16.0
```

## Troubleshooting

If you encounter errors running the site locally, follow these steps to ensure a clean environment and proper setup:

Prerequisites
- Make sure [NVM (Node Version Manager)](https://github.com/nvm-sh/nvm#installing-and-updating) is installed on your machine
- Ensure you have proper repository access


```
# 1. Navigate to repository root
cd <repository directory>

# 2. Set correct Node.js version
nvm install    # Installs version specified in .nvmrc
nvm use        # Switches to the correct version

# 3. Clean existing dependencies
rm -rf node_modules package-lock.json

# 4. Ensure you're on the correct branch
git checkout 4.0.x
git pull origin 4.0.x

# 5. Verify branch (should show '* 4.0.x')
git branch

# 6. Reinstall dependencies
npm install

# 7. Start development server
npm run docs:dev

```

### Common Issues and Solutions

- If nvm command is not found, restart your terminal after installation
- If npm install fails, try clearing npm cache: npm cache clean --force
- If the dev server shows outdated content, clear your browser cache
- For permission errors, ensure you're not using sudo with npm commands

### Still Having Issues?
- Check the console for specific error messages
- Verify your Node.js version matches the project requirements: node --version