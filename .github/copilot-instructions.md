# GitHub Copilot Instructions for Rundeck Documentation

You are an AI assistant helping maintain the Rundeck documentation site (VuePress 2, published to `docs.rundeck.com`).

## Canonical Conventions

All writing, markdown, content-structure, and tooling conventions for this repository are maintained in a single canonical location to prevent drift across AI tools:

- **`CLAUDE.md`** (repo root) — project conventions index (symlinked as `AGENTS.md`)
- **`.claude/docs/writing-style.md`** — voice, markdown rules, page structure, DocSearch architecture, content directory layout
- **`.claude/docs/local-development.md`** — environment setup and dev server
- **`.claude/docs/pr-feed.md`** — SaaS PR feed generator
- **`.claude/docs/docsearch-filters.md`** — custom DocSearch section filter
- **`.claude/docs/infrastructure.md`** — CI, deployment, secrets

Read `CLAUDE.md` first; follow its references into `.claude/docs/` as needed.

## Critical Constraints (Quick Reference)

- **Never use emojis in published content.** Font Awesome is available if decorative icons are strictly required.
- **Use ATX-style headers only** (`#`, `##`, `###`); one H1 per page, no skipped levels.
- **Every fenced code block declares its language.**
- **Never hand-edit PR-derived content in generated files** under `docs/history/**/version-*.md` or `docs/history/updates/index.md` — fix the originating PR and re-run the generator.
- **PRs for release notes MUST carry the `release-notes/include` label** and contain a `## Release Notes` section.

Full detail and rationale in `.claude/docs/writing-style.md` and `CLAUDE.md`.
