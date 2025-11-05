# Rundeck Documentation
Rundeck Documentation project.

## Getting Started

### Dependencies
* NodeJS version `22.12.0` is the currently supported and only version that should be used.
* NVM is helpful in making sure your machine is using the currently supported versions as we upgrade in the future.

### Recommended setup steps
Install `nvm` to manage your NodeJS installations.

Run `nvm install; nvm use;` to install and set the NodeJS version.  (it will use the `.nvmrc` file in the root of this directory as the version we are currently supporting.)

After setting the proper Node version, run this `npm` command before the first you start the docs site locally.

```
npm install
```

>Note: It may be helpful to delete any existing `node_modules` folder and the `package-lock.json` file before running npm install.

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
- `/docs/` - Main documentation content
- `/docs/.vuepress/` - VuePress configuration
- `/docs/.vuepress/public/assets/img/` - Images Folder

# How to Create Release Notes

Rundeck Core PRs are included by default.
Core PRs can excluded by labeling them with the `release-notes/exclude` label.

Rundeck Enterprise PRs are excluded by default.
Enterprise PRs can be included by labeling them with the `release-notes/include` label.

Create the file `.env` in the project root and add the line `GH_API_TOKEN=[TOKEN]`
replacing `[TOKEN]` with your GitHub API token. This token needs `repo` scope.

## Release Notes

Run the following with the milestone for the release. This will create/overwrite an existing entry for the release and automatically update related documentation and configuration files:

```bash
npm run notes -- --milestone=${1?milestone name}
```

When run, the script will:
- Generate release notes for the specified milestone.
    - This will require edits for proper dates, the Overview, etc.
- Add a new row for the release in `docs/history/release-calendar.md`.
    - This file will require an update to the release date.
- Update `.docsearch/config.json` to set the correct version for search indexing.
- Update `docs/.vuepress/setup.js` with the new version information.
- Add the new version link to the sidebar in `docs/.vuepress/sidebar-menus/history.ts`.

> Use wisely: running this command will overwrite existing release notes for the specified release and possibly duplicate config file updates.

## Draft Release Notes

Run the following with the milestone for the release. This will create the file named draft.md to avoid overwriting any existing version:

```bash
npm run notes -- --milestone=${1?milestone name} --draft
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