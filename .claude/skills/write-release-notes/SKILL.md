---
name: write-release-notes
description: Generate self-hosted release notes for a Rundeck version using tag-based PR comparison. Use when preparing release notes for a milestone (e.g. 5.17.0), previewing upcoming notes via draft mode, or troubleshooting the notes pipeline.
---

# Write Release Notes

Guides the full release-notes workflow for a Rundeck self-hosted milestone using `npm run notes`. Auto-loads prerequisites, runs the draft, and helps finalise after tagging.

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

### Phase 1: Gather parameters

Before running anything, confirm with the user:

1. **Target milestone** (required) — e.g. `5.20.1`. If the user has not stated it, ask.
2. **Baseline version** (`--from-version`, optional) — ask the user: *"Should I auto-detect the starting version from the previous tag, or do you want to specify it explicitly (e.g. `--from-version=5.20.0`)?"* Auto-detection is the default and usually correct; an explicit baseline is needed for patch releases or unusual ranges.

### Phase 2: Run the draft preview (safe — does not modify configs)

Use the form that matches what the user provided in Phase 1:

**If the user did not supply `--from-version` (auto-detect):**
```bash
npm run notes:draft -- --milestone=<X.Y.Z>
```

**If the user supplied an explicit `--from-version`:**
```bash
npm run notes -- --milestone=<X.Y.Z> --from-version=<X.Y.Z-prev> --draft
```

- If the tag `v<X.Y.Z>` does not yet exist, draft mode falls back to `HEAD` and prints a warning — this is expected.
- Output: `docs/history/<major>_x/draft.md`.
- Review the draft with the user before proceeding.

### Phase 3: Tag the release

Only proceed when the user has confirmed the draft content. Split tag creation from pushing so the user can confirm each step.

Create the local tag:

```bash
git tag v<X.Y.Z>
```

Push the tag ONLY after the user explicitly confirms (Critical Rule: never push without explicit instruction):

```bash
git push origin v<X.Y.Z>
```

### Phase 4: Generate final notes (updates configs)

```bash
npm run notes -- --milestone=<X.Y.Z>
```

This updates, in addition to the notes markdown:
- `docs/.vuepress/setup.js` — version info
- `docs/.vuepress/sidebar-menus/history.ts` — sidebar link
- `docs/.vuepress/navbar-menus/about.js` — navbar link
- `docs/.vuepress/pr-feed-config.json` — PR feed baseline

### Phase 5: Manual edits

Open `docs/history/<major>_x/version-<X.Y.Z>.md` and fill in:
- Release date
- Overview section
- Any final descriptions or curated ordering

### Phase 6: Commit

```bash
git add docs/history/<major>_x/version-<X.Y.Z>.md
git add docs/.vuepress/sidebar-menus/history.ts
git add docs/.vuepress/navbar-menus/about.js
git add docs/.vuepress/setup.js
git add docs/.vuepress/pr-feed-config.json
git commit -m "Release notes for <X.Y.Z>"
```

Use `git status` to confirm no additional side-effect files were modified; stage any that appear.

Do NOT push without the user's explicit instruction.

### Phase 7: Push (only on explicit instruction)

Once the user confirms, push the commit (and, if not already pushed, the tag):

```bash
git push
git push origin v<X.Y.Z>   # if not already pushed in Phase 2
```

## Version Auto-Detection

| Target | Auto-detected previous | Compares |
|---|---|---|
| `5.17.0` | `5.16.0` | v5.16.0 → v5.17.0 |
| `5.17.1` | `5.17.0` | v5.17.0 → v5.17.1 |
| `5.0.0` | `4.17.0` | v4.17.0 → v5.0.0 |

If the user provides `--from-version`, pass it explicitly (Phase 2 explicit form). Otherwise, auto-detection is used. Ask the user in Phase 1 if the milestone is a patch release and the baseline is ambiguous.

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
