---
name: write-release-notes
description: Generate self-hosted release notes for a Rundeck version using tag-based PR comparison. Use when preparing release notes for a milestone (e.g. 5.17.0), previewing upcoming notes via draft mode, or troubleshooting the notes pipeline.
---

# Write Release Notes

Guides the full release-notes workflow for a Rundeck self-hosted milestone using `npm run notes` / `npm run notes:draft`. Auto-loads prerequisites, runs the draft, and helps finalise after tagging.

## When to Use

- The user asks to "generate release notes", "prepare release notes", "draft release notes for X.Y.Z", or similar.
- The user mentions milestones like `5.17.0`, `5.18.0` in a release context.
- CI or a team member reports the notes pipeline produced unexpected output and help is needed.

## Reference Documentation

Read these before executing:

- `.claude/docs/local-development.md` — environment setup (Node via nvm, Cloudsmith token)
- `.claude/docs/pr-feed.md` — the shared utilities (`pr-utils.mjs`) and tag-parsing logic used by `notes.mjs`
- `README.md` (repo root) — the authoritative end-to-end release-notes workflow (section: "How to Create Release Notes")

## Prerequisites

1. Node 22.22.0 active (`nvm install && nvm use`).
2. Repo dependencies installed (`npm install`, requires `CLOUDSMITH_NPM_TOKEN` or `.npmrc` removed).
3. `.env` file at the repo root with `GH_API_TOKEN=ghp_...` (needs `repo` scope; must have access to `rundeckpro/rundeckpro` and `rundeckpro/sidecar`).
4. All contributing PRs carry the `release-notes/include` label.
5. PR descriptions use a `## Release Notes` section for customer-facing copy.

## Process

### Phase 1: Draft preview (safe, does not modify configs)

```bash
npm run notes:draft -- --milestone=<X.Y.Z>
```

- If the tag `v<X.Y.Z>` does not yet exist, draft mode falls back to `HEAD` and prints a warning — this is expected.
- Output: `docs/history/<major>_x/draft.md`.
- Review the draft with the user before proceeding.

### Phase 2: Tag the release

```bash
git tag v<X.Y.Z>
git push origin v<X.Y.Z>
```

Only tag when the user has confirmed the draft content.

### Phase 3: Generate final notes (updates configs)

```bash
npm run notes -- --milestone=<X.Y.Z>
```

This updates, in addition to the notes markdown:
- `.docsearch/config.json` — search indexing version
- `docs/.vuepress/setup.js` — version info
- `docs/.vuepress/sidebar-menus/history.ts` — sidebar link
- `docs/.vuepress/navbar-menus/about.js` — navbar link
- `docs/.vuepress/pr-feed-config.json` — PR feed baseline

### Phase 4: Manual edits

Open `docs/history/<major>_x/version-<X.Y.Z>.md` and fill in:
- Release date
- Overview section
- Any final descriptions or curated ordering

### Phase 5: Commit

```bash
git add docs/history/<major>_x/version-<X.Y.Z>.md
git add docs/.vuepress/sidebar-menus/history.ts
git add docs/.vuepress/navbar-menus/about.js
git add docs/.vuepress/setup.js
git add .docsearch/config.json
git add docs/.vuepress/pr-feed-config.json
git commit -m "Release notes for <X.Y.Z>"
```

Do NOT push without the user's explicit instruction.

## Version Auto-Detection

| Target | Auto-detected previous | Compares |
|---|---|---|
| `5.17.0` | `5.16.0` | v5.16.0 → v5.17.0 |
| `5.17.1` | `5.17.0` | v5.17.0 → v5.17.1 |
| `5.0.0` | `4.17.0` | v4.17.0 → v5.0.0 |

Override with `--from-version=<X.Y.Z>` for patch releases or special ranges.

## Troubleshooting

| Symptom | Cause / Fix |
|---|---|
| `Tag X.Y.Z not found` in draft mode | Normal before tagging — draft uses `HEAD`. Ignore. |
| `Tag X.Y.Z not found` in final mode | Create the tag first (Phase 2). |
| `GH_API_TOKEN environment variable is not set` | Create `.env` with a GitHub token with `repo` scope. |
| No PRs found | Verify tags exist, PRs are merged (not just closed), and carry `release-notes/include`. |
| Warnings about `docs` / `ansible-plugin` repos | Expected — those repos do not use version tags; they are skipped gracefully. |

## Checklist

- [ ] Node version matches `.nvmrc`
- [ ] `.env` present with valid `GH_API_TOKEN`
- [ ] Draft generated and reviewed with the user
- [ ] Git tag created and pushed
- [ ] Final notes generated
- [ ] Manual edits applied (date, overview)
- [ ] All config files staged together with the notes markdown
- [ ] Commit message follows `Release notes for <X.Y.Z>` convention
