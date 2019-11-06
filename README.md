# Rundeck Documentation
Rundeck Documentation project.

## Getting starting

### Dependencies
* nodejs

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

- Branch `3.1.x` => `docs.rundeck.com/3.1.x/`
- Branch `3.1.1` => `docs.rundeck.com/3.1.1/`

### Latest
> Version tag must contain the full Rundeck version with date!

Tag a commit to publish to the matching version base as well as
to the latest:
- Tag `v3.1.2-20190927` => `docs.rundeck.com/3.1.2/` **AND**
`docs.rundeck.com/docs/`

### Maintenance
For maintenance to docs on previous versions, simply create a branch:
```bash
# For 3.0.26
git checkout v3.0.26
git checkout -b 3.0.26
git push origin
```