# Infrastructure

## CI/CD — GitHub Actions

| Workflow | Trigger | Purpose |
|---|---|---|
| `check-milestone.yml` | `pull_request_target` (`opened`, `synchronize`, `reopened`, `milestoned`, `demilestoned`) on `4.0.x` | Enforces milestone on every PR |
| `snyk-scan.yml` | `pull_request` + `push` | Snyk security scan; monitors default branch, blocks on high-severity vulns |
| `build-check.yml` | `pull_request` + `workflow_dispatch` | Runs `npm run docs:build` to confirm the VuePress site builds; no publish step. Catches version-pin/build breakage on PRs (e.g. Renovate) whose source branch doesn't match the CircleCI publish filter |
| `update-pr-feed.yml` | `workflow_dispatch` | Updates PR feed config for a given RBA tag, regenerates feed files, opens a PR |

Node.js version is pinned via `.nvmrc` (22.22.0); all workflows use `actions/setup-node@v4` with `node-version-file: '.nvmrc'`.

## NPM Registry

Private registry at `npm.artifacts.pd-internal.com` (Cloudsmith). Configured in `.npmrc`. Requires `CLOUDSMITH_NPM_TOKEN` secret in CI and locally.

## Deployment

Docs are published to `docs.rundeck.com` based on branch/tag naming:

| Branch / Tag pattern | Published URL |
|---|---|
| `4.0.x` | `docs.rundeck.com/4.0.x/` |
| `4.13.0` | `docs.rundeck.com/4.13.0/` |
| Tag `v4.13.0-20230515` | `docs.rundeck.com/4.13.0/` **and** `docs.rundeck.com/docs/` (latest) |

Maintenance branches for older versions follow the pattern `git checkout -b 3.2.8`.

## Secrets

| Secret | Used by |
|---|---|
| `CLOUDSMITH_NPM_TOKEN` | `snyk-scan.yml`, `build-check.yml`, `update-pr-feed.yml` |
| `SNYK_TOKEN` | `snyk-scan.yml` |
| `GH_API_TOKEN` | `update-pr-feed.yml` (GitHub API for PR feed) |
| `GITHUB_TOKEN` | `check-milestone.yml`, `update-pr-feed.yml` (built-in) |
