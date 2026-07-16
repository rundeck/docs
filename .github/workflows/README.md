# GitHub Actions Workflows

## Build Check

**File**: `build-check.yml`

### Purpose
Runs `npm run docs:build` on every pull request to confirm the VuePress site still builds — no publish step. This exists because the CircleCI `publish` workflow only builds/deploys branches matching the version-number pattern (`[456]\.[0-9]+\..*`) or tags, so PRs from other branches (e.g. Renovate's `renovate/*` dependency-update branches) previously had no build validation at all. VuePress is sensitive to exact dependency versions, so this catches breakage from a bumped package before it merges.

### Trigger
- `pull_request` (any branch, any base)
- `workflow_dispatch` for manual runs

### What It Does
1. Checks out the PR branch
2. Sets up Node.js via `.nvmrc`
3. Runs `npm ci` (using `CLOUDSMITH_NPM_TOKEN` for the private registry)
4. Runs `npm run docs:build`

If the build fails, the check fails on the PR — nothing is deployed either way.

## Update PR Feed Configuration

**File**: `update-pr-feed.yml`

### Purpose
Automatically updates the PR feed configuration when a new RBA (Rundeck Build Automation) tag is pushed, regenerates feed files, and creates a pull request for review.

### Manual Trigger

You can manually trigger this workflow from the GitHub Actions UI:

1. Go to **Actions** → **Update PR Feed Configuration**
2. Click **Run workflow**
3. Enter the RBA tag (e.g., `rba/5.18-RBA-20251030-2f39445-a6d9e14`)
4. Click **Run workflow**

### Trigger from CircleCI

To trigger this workflow from your CircleCI pipeline when RBA tags are pushed:

```bash
# Using GitHub CLI (recommended)
gh workflow run update-pr-feed.yml \
  --ref 4.0.x \
  --field rba_tag="${RBA_TAG}"

# Using curl with GitHub API
curl -X POST \
  -H "Accept: application/vnd.github+json" \
  -H "Authorization: token ${GITHUB_TOKEN}" \
  https://api.github.com/repos/rundeck/docs/actions/workflows/update-pr-feed.yml/dispatches \
  -d "{\"ref\":\"4.0.x\",\"inputs\":{\"rba_tag\":\"${RBA_TAG}\"}}"
```

### What It Does

1. **Checks out** the `4.0.x` branch
2. **Sets up** Node.js 22.12.0 environment
3. **Installs** npm dependencies
4. **Updates** `docs/.vuepress/pr-feed-config.json` with the new RBA tag in the `lastSelfHostedRelease.lastSaasCut` field
5. **Runs** `npm run pr-feed` to regenerate:
   - `docs/history/updates/index.md` - Markdown page
   - `docs/.vuepress/public/feeds/development.xml` - RSS feed
   - `docs/.vuepress/public/feeds/development-atom.xml` - Atom feed
6. **Creates** a new branch with pattern: `update-pr-feed-{sanitized-tag}-{timestamp}`
7. **Commits** all changes with a descriptive message
8. **Pushes** the branch to the repository
9. **Creates** a pull request with labels `automation` and `documentation`

### Requirements

#### Permissions
The workflow requires these permissions:
- `contents: write` - To push branches and commits
- `pull-requests: write` - To create pull requests

#### Secrets
- **`GITHUB_TOKEN`** - Automatically provided by GitHub Actions
  - Used to authenticate GitHub CLI for creating PRs
  - Used as `GH_API_TOKEN` for the pr-feed script to fetch PR data

**Note**: The default `GITHUB_TOKEN` may need additional permissions if accessing private repositories. If the feed generation fails with authentication errors, you may need to use a Personal Access Token (PAT) with appropriate repository access.

### Error Handling

- If `npm run pr-feed` fails, the workflow will still:
  - Commit the config file update
  - Create a pull request
  - Include a warning in the PR description
- The PR description will indicate whether feed generation succeeded or failed
- If failed, the PR will include instructions for manual regeneration

### Output

The workflow creates a pull request with:
- **Title**: `Update PR Feed Configuration for {rba_tag}`
- **Labels**: `automation`, `documentation`
- **Body**: Includes:
  - RBA tag value
  - Fields updated
  - Feed generation status
  - List of generated files (if successful)
  - Action required steps (if failed)

### Example

```bash
# Trigger from CircleCI when RBA tag is pushed
RBA_TAG="rba/5.18-RBA-20251030-2f39445-a6d9e14"

gh workflow run update-pr-feed.yml \
  --ref 4.0.x \
  --field rba_tag="${RBA_TAG}"
```

This will:
1. Update the config with the tag
2. Generate PR feed showing changes between v5.17.0 and the commits referenced in the tag
3. Create a PR like: `Update PR Feed Configuration for rba/5.18-RBA-20251030-2f39445-a6d9e14`

### Troubleshooting

#### Feed generation fails with authentication error
- Check that `GITHUB_TOKEN` has access to both `rundeckpro/rundeckpro` and `rundeck/rundeck` repositories
- For private repos, you may need to use a PAT instead of `GITHUB_TOKEN`
- Update the workflow to use `secrets.GH_API_TOKEN` instead of `secrets.GITHUB_TOKEN` if you create a PAT

#### Branch already exists
- The workflow adds a timestamp to branch names to avoid conflicts
- If you need to re-run, delete the old branch first or wait for the timestamp to change

#### PR creation fails
- Ensure the workflow has `pull-requests: write` permission
- Check that the base branch (`4.0.x`) exists
- Verify repository settings allow workflows to create PRs

### Configuration File Format

The workflow updates this JSON structure:

```json
{
  "lastSelfHostedRelease": {
    "version": "5.17.0",
    "date": "2025-10-22",
    "lastSaasRelease": "2025-11-04",
    "lastSaasCut": "rba/5.18-RBA-20251030-2f39445-a6d9e14",
    "description": "Last self-hosted release version and date"
  }
}
```

The workflow only updates the `lastSaasCut` field. Other fields (`version`, `date`, `lastSaasRelease`) are managed by other processes.
