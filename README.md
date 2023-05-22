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

## API Documentation Guidelines

### To Add a new API version

1. Add appropriate entries to the `docs/api/rundeck-api-versions.md` file, list all changes associated with the new API version.
2. Update the `docs/.vuepress/setup.js` API_VERSION

### Add a new API Endpoint

Steps:

1. Define the new API version as defined above.
1. Add the appropriate documentation section in the `docs/api/rundeck-api.md` file

	Each API endpoint has a minimum API version requirement.  Reference this in the endpoint, such as:

	```
	Request:

	    GET /api/41/enterprise/license
	```

	Use a capitalized `[PARAM]` for any parameters in the URL itself.


2. Add **Reference Link Definitions** to the `docs/api/api-index-links.md`.  This defines a link name that can be referenced elsewhere.
	
	```markdown
	[/api/V/execution/\[ID\]]:/api/rundeck-api.html#execution-info
	```

	* Replace the API version with the letter `V`.
	* Escape `[` and `]` characters with a backslash.
	* Use the full path to the rundeck-api.html doc
	* Include the Anchor text to your specific documentation section


3. Add back links in the "Index" section in the `docs/api/rundeck-api.md` file

	In the "Index" section, add an entry for the new endpoint in alphabetical order.

4. Add back links in the `docs/api/rundeck-api-versions.md` for the new API version.


# How to use

## Run Locally

```
npm run docs:dev
```

> Compiles and hot-reloads for development. As (most) content changes are made they show up immediately.  Changes to the menus will require quitting and restarting with the command above.

## Build

> Compiles and minifies for production.

```
npm run docs:build
```

# Submitting Changes

Rundeck welcomes documentation PRs.  Please submit PRs against the default branch (currently `4.x`) and we will review.


# Publishing

Docs will be built and published to a base matching a branch name of
`/4\.[1-9]\..*/`:

- Branch `4.0.x` => `docs.rundeck.com/4.0.x/`
- Branch `3.4.1` => `docs.rundeck.com/3.4.1/`

## Latest

> Version tag must contain the full Rundeck version with date!

Tag a commit to publish to the matching version base as well as
to the latest:
- Tag `v4.13.0-20230515` => `docs.rundeck.com/4.13.0/` **AND**
`docs.rundeck.com/docs/`


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
