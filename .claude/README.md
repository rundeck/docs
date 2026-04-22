# .claude Directory Structure

This directory contains Claude Code configuration, documentation, skills, and rules for the Rundeck documentation project (VuePress 2 site published to `docs.rundeck.com`).

## Directory Contents

```
.claude/
├── README.md              # This file
├── CONTRIBUTING.md        # Guide for extending this setup
├── settings.json          # Claude Code settings (permissions, hooks)
├── .sdlc-setup-done       # sdlc-workflow setup marker (gitignored)
├── docs/                  # Human-authored reference documentation
│   ├── writing-style.md
│   ├── infrastructure.md
│   ├── local-development.md
│   ├── docsearch-filters.md
│   └── pr-feed.md
├── rules/                 # Context-aware rules (auto-loaded by glob)
│   └── release-notes-pr.md
└── skills/                # Workflow automation skills
    ├── write-release-notes/
    └── generate-pr-feed/
```

All directories are created only when they hold concrete content. Additional directories (`hooks/`, `commands/`, `artifacts/`, `specs/`, `plans/`) may be added as the setup grows.

---

## Documentation (`docs/`)

Human-authored reference material consulted by the agent and developers alike.

| File | When to read |
|---|---|
| `docs/writing-style.md` | Authoring or editing any page under `docs/` — voice, markdown, DocSearch, content structure |
| `docs/local-development.md` | Setting up locally, running the dev server, generating release notes |
| `docs/infrastructure.md` | Touching CI workflows, deployment branches, secrets, or the NPM registry config |
| `docs/pr-feed.md` | Working on the SaaS PR feed generator (`npm run pr-feed`) or `pr-feed.mjs` |
| `docs/docsearch-filters.md` | Modifying the DocSearch filter component or `.vuepress/plugins/docsearch-filters.ts` |

Legacy paths at `dev-docs/DOCSEARCH_FILTERS_README.md` and `dev-docs/PR-FEED-README.md` are symlinks into `docs/` — the canonical copies live here.

---

## Rules (`rules/`)

Context-aware rules auto-load based on file patterns via frontmatter globs:

```markdown
---
description: Rule description
globs:
  - "docs/history/**/version-*.md"
alwaysApply: false
---
```

| Rule | Applies to |
|---|---|
| `rules/release-notes-pr.md` | PR descriptions and generated release-notes files |

---

## Skills (`skills/`)

Workflow automation skills invoked by the agent on demand:

| Skill | Purpose |
|---|---|
| `write-release-notes` | Guide the full release-notes workflow (`npm run notes:draft` → tag → `npm run notes`) with verification steps |
| `generate-pr-feed` | Guide the weekly SaaS PR-feed update (`npm run pr-feed`) including `pr-feed-config.json` maintenance |

Each skill lives in `skills/<skill-name>/SKILL.md` with optional `checklist.md` / `examples/` siblings.

---

## settings.json

Claude Code configuration for permissions (and hooks if added later). Permissions allow the agent to run documented npm scripts, inspect git, edit docs files, and call Atlassian MCP for Jira/Confluence lookups.

---

## Related Files at Repo Root

- `CLAUDE.md` — canonical index of conventions, docs, rules, and skills (agent reads this first)
- `AGENTS.md` — symlink to `CLAUDE.md` (for tools that prefer the AGENTS convention)
