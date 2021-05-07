# Rundeck Documentation
Rundeck Documentation project.

## Getting starting

### Dependencies
* NodeJS (lts/erbium or version 12 is currently best)

### Recommended setup steps
Install `nvm` to manage your NodeJS installations.

Run `nvm install lts/erbium; nvm use lts/erbium` to install and set the NodeJS version.

Run this before the first you start the docs site locally.
```
npm install
```

### Run the Rundeck Docs site locally

```
npm run docs:dev
```
> Compiles and hot-reloads for development. As (most) content changes are made they show up immediately.  Changes to the menus will require quitting and restarting with the command above.

### Running in Production
> Compiles and minifies for production.
```
npm run docs:build
```

## Submitting Changes
Rundeck welcomes documentation PRs.  Please submit PRs against the default branch (currently `3.3.x`) and we will review.


## Publishing

Docs will be built and published to a base matching a branch name of
`/3\.[1-9]\..*/`:

- Branch `3.3.x` => `docs.rundeck.com/3.3.x/`
- Branch `3.3.1` => `docs.rundeck.com/3.3.1/`

### Latest
> Version tag must contain the full Rundeck version with date!

Tag a commit to publish to the matching version base as well as
to the latest:
- Tag `v3.3.1-20200727` => `docs.rundeck.com/3.3.1/` **AND**
`docs.rundeck.com/docs/`


Example Code:
```
git tag -f v3.3.9-20210201
git push -f origin v3.3.9-20210201
```


### Maintenance
For maintenance to docs on previous versions, simply create a branch:
```bash
# For 3.2.8
git checkout v3.2.8
git checkout -b 3.2.8
git push origin
```

## Generating Release Notes

Rundeck Core PRs are included by default.
Core PRs can excluded by labeling them with the `release-notes/exclude` label.

Rundeck Enterprise PRs are excluded by default.
Enterprise PRs can be included by labeling them with the `release-notes/include` label.

Create the file `.env` in the project root and add the line `GH_API_TOKEN=[TOKEN]`
replacing `[TOKEN]` with your GitHub API token. This token needs `repo` scope.

Run the following with the milestone for the release.  This will create/overwrite an existing entry for the release.  Use wisely:
```bash
npm run notes -- --milestone=3.3.9
```

**Draft**
Run the following with the milestone for the release. This will create the file named draft.md to avoid overwriting any existing version:
```bash
npm run notes -- --milestone=3.3.9 --draft
```
