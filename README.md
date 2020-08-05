# Rundeck Documentation
Rundeck Documentation project.

## Getting starting

### Dependencies
* nodejs (Current LTS version is ok)

### Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run docs:dev
```

### Compiles and minifies for production
```
npm run docs:build
```

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

### Maintenance
For maintenance to docs on previous versions, simply create a branch:
```bash
# For 3.2.8
git checkout v3.2.8
git checkout -b 3.2.8
git push origin
```
