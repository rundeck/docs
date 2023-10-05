# Rundeck Documentation
Rundeck Documentation project.

*!!!! We have updated to VuePress 2 and are now using Node 18 for builds. Note updated instruction below !!!*

## Getting starting

### Dependencies
* NodeJS (`lts/hydrogen` or version `18.18.0` is the supported version)

### Recommended setup steps
Install `nvm` to manage your NodeJS installations.

Run `nvm install lts/hydrogen; nvm use lts/hydrogen` to install and set the NodeJS version.

Run this before the first you start the docs site locally.

```
npm install
```

## API Documentation Guidelines

Our API Docuementation is now handled by OpenAPI spec and presented using Swagger UI.


# How to run locally for Development

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

# How to Create Release Notes

Rundeck Core PRs are included by default.
Core PRs can excluded by labeling them with the `release-notes/exclude` label.

Rundeck Enterprise PRs are excluded by default.
Enterprise PRs can be included by labeling them with the `release-notes/include` label.

Create the file `.env` in the project root and add the line `GH_API_TOKEN=[TOKEN]`
replacing `[TOKEN]` with your GitHub API token. This token needs `repo` scope.

## Release Notes

Run the following with the milestone for the release.  This will create/overwrite an existing entry for the release.  Use wisely:

```bash
npm run notes -- --milestone=${1?milestone name}
```

## Draft Release Notes

Run the following with the milestone for the release. This will create the file named draft.md to avoid overwriting any existing version:

```bash
npm run notes -- --milestone=${1?milestone name} --draft
```
