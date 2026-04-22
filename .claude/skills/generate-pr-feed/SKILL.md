---
name: generate-pr-feed
description: Regenerate the SaaS PR feed (RSS/Atom + updates markdown) after a SaaS deployment using tag-based PR comparison. Use when the user asks to "update the PR feed", "regenerate RSS feed", "update docs/history/updates", or mentions a new SaaS cut tag (e.g. rba/5.18-RBA-...).
---

# Generate PR Feed

Runs the weekly SaaS PR feed update: compares the last self-hosted release tag against the latest SaaS cut tag to produce RSS 2.0, Atom 1.0, and a VuePress-compatible markdown page listing all PRs deployed to the SaaS platform.

## When to Use

- The user says "regenerate the PR feed", "update the updates page", "run pr-feed", or mentions a freshly cut SaaS tag.
- A SaaS deployment has just completed and the public-facing feed needs refreshing.
- The user wants to preview upcoming SaaS updates before committing.

## Reference Documentation

Read before executing:

- `.claude/docs/pr-feed.md` — comprehensive guide (tag parsing, template variables, troubleshooting)
- `.claude/docs/local-development.md` — environment setup

## Prerequisites

1. Node 22.22.0 (`nvm install && nvm use`).
2. `.env` with `GH_API_TOKEN` that has `repo` scope and access to `rundeckpro/rundeckpro` and `rundeck/rundeck`.
3. `docs/.vuepress/pr-feed-config.json` updated with the latest `lastSaasCut` tag (see Phase 1).

## Process

### Phase 1: Update `pr-feed-config.json`

Open `docs/.vuepress/pr-feed-config.json` and confirm/update:

| Field | When to update | Who |
|---|---|---|
| `version`, `lastSelfHostedDate` | Auto-updated by `notes.mjs` when producing a self-hosted release | the `write-release-notes` skill |
| `lastSaasRelease` | After deploying to SaaS production (date displayed on the updates page) | manual |
| `lastSaasCut` | Each time a release is cut (typically weekly) | manual |

`lastSaasCut` format: `rba/<vNum>-RBA-<vDate>-<coreSha>-<proSha>`
Example: `rba/5.18-RBA-20251030-2f39445-a6d9e14`

The script parses this tag to extract exact commit SHAs; any deviation from the format will break parsing.

### Phase 2: Run the generator

```bash
npm run pr-feed
```

The script will:
1. Load config, parse `lastSaasCut` into `coreSha` + `proSha`.
2. Compare `v<lastSelfHostedVersion>` → `proSha` in `rundeckpro/rundeckpro`.
3. Compare `v<lastSelfHostedVersion>` → `coreSha` in `rundeck/rundeck`.
4. Combine PRs, filter by `release-notes/include`, sort by merge date.
5. Strip `RUN-XXXX:` prefixes from titles.
6. Render `docs/history/updates/index.md` from `docs/.vuepress/pr-feed.md.nj`.
7. Write `docs/.vuepress/public/feeds/development.xml` (RSS) and `development-atom.xml` (Atom).

### Phase 3: Review output

- `docs/history/updates/index.md` — the page published at `docs.rundeck.com/docs/history/updates/`
- `docs/.vuepress/public/feeds/development.xml` — RSS 2.0
- `docs/.vuepress/public/feeds/development-atom.xml` — Atom 1.0

Verify PR titles look clean, merge dates are present, and `## Release Notes` sections rendered where expected.

### Phase 4: Commit

```bash
git add docs/history/updates/index.md
git add docs/.vuepress/public/feeds/
git add docs/.vuepress/pr-feed-config.json
git commit -m "Update SaaS deployment feed"
```

Do NOT push without the user's explicit instruction.

## Customisation (Rare)

| Option | Purpose |
|---|---|
| `--days=N` | Override tag-based comparison with a time window (testing only) |
| `--include-section="Customer Summary"` | Extract a different PR body section |
| `--max-prs=N` | Cap PRs per repo (default 100) |
| `--output-dir=...` | Write markdown elsewhere |

Full flag reference lives in `.claude/docs/pr-feed.md`.

## Troubleshooting

| Symptom | Cause / Fix |
|---|---|
| `GH_API_TOKEN not set` | Create `.env` with a valid token |
| `Repository not found` | Token missing `repo` scope or lacks access to the private repo |
| No PRs found | Tag comparison range is empty, or no PRs carry `release-notes/include` |
| Titles still have `RUN-XXXX:` prefixes | Prefix does not match `/^(RUN-[0-9]+\s*)+:?\s*/g` — inspect the original PR title |
| Parse error on `lastSaasCut` | Tag does not match `rba/<vNum>-RBA-<vDate>-<coreSha>-<proSha>` |

## Checklist

- [ ] `pr-feed-config.json` `lastSaasCut` updated to the latest cut tag
- [ ] `lastSaasRelease` reflects the actual production deployment date
- [ ] `npm run pr-feed` completes without errors
- [ ] `docs/history/updates/index.md` renders cleanly (titles, dates, sections)
- [ ] RSS and Atom feeds present under `docs/.vuepress/public/feeds/`
- [ ] Config + generated files staged together
- [ ] Commit message follows `Update SaaS deployment feed` convention
