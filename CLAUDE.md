# Project Conventions

VuePress 2 documentation site serving Rundeck product documentation (published to `docs.rundeck.com`). Content is Markdown under `docs/`, configuration under `docs/.vuepress/`.

## Documentation

Detailed conventions and guidance organised by topic:

### Writing & Content

- **`.claude/docs/writing-style.md`** — Voice, markdown conventions, page structure checklist, Algolia DocSearch architecture, and content directory layout
- **`.claude/docs/docsearch-filters.md`** — Custom section-filter component (`DocSearchFilters.vue` + `docsearch-filters.ts`)

### Environment & Infrastructure

- **`.claude/docs/local-development.md`** — Node setup, Cloudsmith token, dev server, troubleshooting
- **`.claude/docs/infrastructure.md`** — CI workflows, deployment branch/tag rules, NPM registry, secrets

### Release Pipelines

- **`.claude/docs/pr-feed.md`** — SaaS PR feed generator (`npm run pr-feed`), tag parsing, templates, troubleshooting

## Writing Conventions

### Voice
Clear, concise technical prose. Consistent terminology across pages. Never use emojis in content (Font Awesome is available if decorative icons are strictly required).

### Markdown
ATX-style headers only. One H1 per page; never skip heading levels. Every fenced code block declares its language. Every image has descriptive alt text.

### Cross-References
Prefer relative links over absolute `docs.rundeck.com` URLs so that versioned builds resolve correctly.

Full details in `.claude/docs/writing-style.md`.

## Content Structure

| Path | Purpose |
|---|---|
| `docs/manual/` | Core product documentation |
| `docs/administration/` | Administration guides |
| `docs/api/` | API documentation |
| `docs/developer/` | Developer documentation |
| `docs/learning/` | Tutorials and learning resources |
| `docs/history/` | Release notes (generated — see Critical Rules) |
| `docs/history/updates/` | SaaS PR feed page (generated) |
| `docs/.vuepress/` | VuePress config, components, plugins |
| `docs/.vuepress/public/assets/img/` | Image assets |

## Release Notes & PR Conventions

### PR Titles
Format when the PR relates to a RUN ticket: `RUN-1234: Description`. The `RUN-XXXX:` prefix is stripped automatically from release notes output.

### Release-Notes Inclusion
PRs intended for customer-facing release notes MUST carry the `release-notes/include` label and contain a `## Release Notes` section in the body. Without both, the PR is silently excluded from `npm run notes` and `npm run pr-feed`.

### Generated Files
Files under `docs/history/**/version-*.md` and `docs/history/updates/index.md` are generated. Never hand-edit PR-derived content — fix the originating PR description and re-run the generator. Manual edits are reserved for Overview, dates, and curation.

## Rules

Context-aware rules that load automatically based on file patterns:

- **`.claude/rules/release-notes-pr.md`** — Release-notes PR discipline (label, `## Release Notes` section, generated-file boundaries). Loads for `docs/history/**/version-*.md`, `docs/history/**/draft.md`, and `docs/history/updates/index.md`.

## Skills

Available skills for common workflows:

**Release pipeline:**
- **`write-release-notes`** — End-to-end self-hosted release-notes workflow: draft → tag → final → manual edits → commit.
- **`generate-pr-feed`** — Weekly SaaS PR-feed regeneration (`npm run pr-feed`), including `pr-feed-config.json` maintenance.

Invoke via the Skill tool: `Skill(skill_name="write-release-notes")`.

## Critical Rules

1. **Never commit release-notes output in isolation.** The generated `docs/history/<major>_x/version-<X.Y.Z>.md` MUST be staged alongside `.docsearch/config.json`, `docs/.vuepress/setup.js`, `docs/.vuepress/sidebar-menus/history.ts`, `docs/.vuepress/navbar-menus/about.js`, and `docs/.vuepress/pr-feed-config.json`.
2. **Never hand-edit PR-derived content in generated files.** Fix the PR description and re-run `npm run notes` / `npm run pr-feed`.
3. **Never push to remote without explicit user instruction.**
4. **Never bypass the `release-notes/include` label** — it is the single source of truth for customer-visible changes.
5. **Never introduce emojis into published content.**

## Extending the AI Setup

- **`.claude/README.md`** — directory structure
- **`.claude/CONTRIBUTING.md`** — how to add docs, rules, and skills

## Compaction Note

When compacting, preserve the Documentation table, Writing Conventions, Content Structure, Rules, Skills, and Critical Rules sections.
