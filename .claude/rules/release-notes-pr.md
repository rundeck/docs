---
description: PR description requirements for release-notes inclusion and generated notes files
globs:
  - "docs/history/**/version-*.md"
  - "docs/history/**/draft.md"
  - "docs/history/updates/index.md"
alwaysApply: false
---

# Release-Notes PR Conventions

## Mandatory

1. PRs intended for customer-facing release notes MUST carry the `release-notes/include` label. Without it, they are silently excluded from both `notes.mjs` and `pr-feed.mjs`.
2. PR descriptions MUST include a `## Release Notes` section containing the customer-facing copy. Add a second heading (e.g. `## Technical Details` or `## PR Details`) to separate internal notes from extracted content.
3. PR titles should be free of `RUN-XXXX:` Jira prefixes in the customer-facing output. The scripts strip `^(RUN-[0-9]+\s*)+:?\s*` automatically; non-matching prefixes must be cleaned manually in the generated markdown.
4. Never edit generated `docs/history/<major>_x/version-<X.Y.Z>.md` content that originated from PR bodies — fix the PR description and re-run the notes script. Manual edits are reserved for the Overview, dates, and final curation.
5. Never commit the results of `notes.mjs` / `pr-feed.mjs` in isolation — the side-effect config files (`pr-feed-config.json`, `setup.js`, `sidebar-menus/history.ts`, `navbar-menus/about.js`) must be staged in the same commit. Run `git status` after the generator to catch any other modified files.

## Detailed Guidance

See `.claude/docs/pr-feed.md` for:
- Tag-based comparison logic
- `lastSaasCut` format (`rba/<vNum>-RBA-<vDate>-<coreSha>-<proSha>`)
- Template variables available in `pr-feed.md.nj`

See `.claude/skills/write-release-notes/SKILL.md` for the end-to-end self-hosted release workflow.
See `.claude/skills/generate-pr-feed/SKILL.md` for the weekly SaaS PR-feed workflow.

## Before Completing

- [ ] Label presence verified on the contributing PRs
- [ ] `## Release Notes` section exists and is customer-appropriate
- [ ] All side-effect config files staged alongside the notes markdown
- [ ] No manual edits to PR-derived content in generated files
