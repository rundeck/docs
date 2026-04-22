## Local Development

VuePress 2 documentation site for Rundeck. Content lives in `docs/`, config in `docs/.vuepress/`.

### Prerequisites

- Node.js 22.22.0 (managed via nvm — version pinned in `.nvmrc`)
- Cloudsmith NPM token (`CLOUDSMITH_NPM_TOKEN`) for the internal registry at `npm.artifacts.pd-internal.com`
- GitHub API token (`GH_API_TOKEN`) only needed for release notes generation

### Setup

```shell
nvm install && nvm use
export CLOUDSMITH_NPM_TOKEN=<your-token>
npm install
```

If you don't have Cloudsmith access, delete `.npmrc` first:

```shell
rm .npmrc
npm install
```

### Running locally

```shell
npm run docs:dev        # dev server with hot reload
npm run docs:build      # production build
npm run docs:no-cache   # dev server, skip cache
npm run docs:clean-dev  # dev server, clear cache first
```

### Release notes

```shell
# Draft (safe, doesn't modify config files)
npm run notes:draft -- --milestone=5.17.0

# Final (updates sidebar, navbar, setup.js, pr-feed-config.json)
npm run notes -- --milestone=5.17.0
```

Requires `GH_API_TOKEN` in a `.env` file at the repo root. PRs must have the `release-notes/include` label.

### PR feed (SaaS development updates)

```shell
npm run pr-feed
```

Regenerates RSS/Atom feeds and `docs/history/updates/index.md` for SaaS deployments not yet in a self-hosted release. See `.claude/docs/pr-feed.md` for details.

### Troubleshooting

```shell
# Clean reinstall
rm -rf node_modules package-lock.json
npm install
```

- If `nvm` is not found, restart terminal after installation
- If dev server shows stale content, clear browser cache or use `npm run docs:no-cache`
