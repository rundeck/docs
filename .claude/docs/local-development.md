# Local Development

VuePress 2 documentation site for Rundeck. Content lives in `docs/`, config in `docs/.vuepress/`.

## Prerequisites

- Node.js 22.22.0 (managed via nvm — version pinned in `.nvmrc`)
- Cloudsmith NPM token (`CLOUDSMITH_NPM_TOKEN`) for the internal registry at `npm.artifacts.pd-internal.com`
- GitHub API token (`GH_API_TOKEN`) only needed for release notes generation

## Setup

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

## Running locally

```shell
npm run docs:dev        # dev server with hot reload
npm run docs:build      # production build
npm run docs:no-cache   # dev server, skip cache
npm run docs:clean-dev  # dev server, clear cache first
```

## Release notes

```shell
# Draft (safe, doesn't modify config files)
npm run notes:draft -- --milestone=5.17.0

# Final (updates sidebar, navbar, setup.js, pr-feed-config.json)
npm run notes -- --milestone=5.17.0
```

Requires `GH_API_TOKEN` in a `.env` file at the repo root. PRs must have the `release-notes/include` label.

## Updating vuepress dependencies

```shell
npm run docs:update-package
```

Runs `vp-update`, the official VuePress CLI updater — bumps the whole `@vuepress/*` family (core, plugins, `@vuepress/helper`) to mutually-compatible versions in one shot. Prefer this over letting Renovate land individual `@vuepress/*` PRs one at a time: several of these packages (`@vuepress/helper`, `plugin-docsearch`, `plugin-feed`, `plugin-pwa`, `theme-default`, etc.) declare an **exact** peerDependency on the `vuepress` core version, so bumping one without the rest risks a transient peer-dependency mismatch.

`npm run docs:update-package` runs `vp-update` through the Cloudsmith registry in `.npmrc`. `vp-update` looks up package dist-tags with a raw `https.get()` and does not send the `CLOUDSMITH_NPM_TOKEN` header itself. It also keeps the trailing newline from `npm config get registry`, which makes Cloudsmith reject the URL. `scripts/update-vuepress-packages.mjs` preloads `scripts/cloudsmith-https-auth.cjs` to add the auth header and repair that URL. Export `CLOUDSMITH_NPM_TOKEN` before running the command.

Cloudsmith hides newly published versions for a cooldown period. A request for a hidden version returns `403` with `Hidden by Cooldown period`, and `npm install` fails with `ETARGET` because that version is omitted from the registry metadata. After `vp-update` rewrites `package.json`, the script replaces each hidden version with the newest one Cloudsmith will serve, and moves `@vuepress/helper` and `vuepress-shared` onto a release whose exact `vuepress` peer matches the core version just selected. It then runs `npm install`.

`vuepress-plugin-open-graph` depends on an exact `@vuepress/core` version. The `overrides` for `@vuepress/client` and `@vuepress/core` keep those packages on the same version as `vuepress`, so the app and the plugin share one `clientData` provider.

## PR feed (SaaS development updates)

```shell
npm run pr-feed
```

Regenerates RSS/Atom feeds and `docs/history/updates/index.md` for SaaS deployments not yet in a self-hosted release. See `.claude/docs/pr-feed.md` for details.

## Troubleshooting

```shell
# Clean reinstall
rm -rf node_modules package-lock.json
npm install
```

- If `nvm` is not found, restart terminal after installation
- If dev server shows stale content, clear browser cache or use `npm run docs:no-cache`
