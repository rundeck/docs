---
name: document 
description: Write, update, and verify technical documentation for the Rundeck product (docs/ folder). Use this skill whenever the user provides a PR, branch, or feature to document — including writing release notes, API reference entries, user manual pages, administration guides, developer docs, or learning content. Also use when reviewing or correcting existing documentation for accuracy against source code. Trigger on any request involving Rundeck documentation, even if the user doesn't say "documentation" explicitly (e.g., "write up the changes in this PR", "add this to the release notes", "document this config property").
---

# Rundeck Documentation Writer

Write accurate, well-structured Rundeck product documentation by researching source code and PRs, matching existing documentation patterns, and validating every technical claim.

## Core Principle

**Code wins. Always.** Document what was actually implemented — not what was planned. The merged PR is the source of truth. When sources conflict, the implementation takes precedence.

## Source Hierarchy

When multiple sources are provided, trust them in this order:

1. **Merged PRs & source code** — what was actually built and shipped. Changed files = implementation. Test files = actual behavior.
2. **Test documentation** — E2E test plans, test CSVs, acceptance criteria that were tested.
3. **Design docs** — intent only, not implementation. Verify everything against PRs before documenting.

**Verification rules:**
- Design doc mentions feature X, PRs don't → don't document it; ask the user first
- Design doc says approach A, PR implements approach B → document approach B
- Design doc mentions a field or property, PRs have no trace of it → it wasn't implemented; don't document it

## Workflow

### Phase 1: Discovery

Research what needs to be documented before writing anything.

1. **Read PRs first** — descriptions and changed files
2. **Read test files** — they show actual behavior
3. **Search for undocumented items** with Glob and Grep:
   - Feature flags: `*.enabled`, `feature.*`, `nextUi.*`, `alphaUi.*`
   - Config properties: `rundeck.*`, `grails.*`, `framework.*`, `dataSource.*`
   - API changes: new controllers, routes, endpoints, version increments
   - Settings/UI changes: new admin options, project-level settings
4. **Verify current documentation state** — grep existing docs to confirm something is actually missing before flagging it
5. **Read design docs last** — for context only, never as sole source for documentation

Compile a **findings registry** with evidence before writing:

```
FINDINGS:

Feature Flag: `nextUi.workflow.enabled`
  Location: src/main/config/Config.groovy:847
  Source: PR #1234 - changed files
  Status: NOT documented (verified via grep of docs/)
  Action: Add to docs/manual/nextui.md

Config Property: `aws.ssm.timeout.max`
  Location: framework.properties.example:142
  Source: PR #1234 - implementation code
  Status: Documented but WRONG (says 10h, actually 12h)
  Action: Update docs/administration/configuration/config-file-reference.md

SKIPPED: Version 2.0 format field
  Source: design doc only — NOT found in PR #4595 or #4598
  Conclusion: Not implemented, not documenting. Ask user to confirm.
```

### Phase 2: Pattern Matching

Before writing any documentation, read existing pages in the same section to establish the patterns to follow. Documentation that doesn't match the surrounding content creates an inconsistent reader experience and will need to be rewritten.

1. **Read 2–3 existing pages** from the same section (e.g., if adding to `docs/manual/`, read similar manual pages nearby)
2. **Note the patterns** in:
   - Heading hierarchy and section structure
   - Code block formatting and language tags
   - Table structure and column conventions
   - Terminology used for common Rundeck concepts
   - Technical depth and assumed reader knowledge
   - Imperative vs. descriptive tone
   - How cross-references and links are formatted
3. **Mirror those patterns exactly** in the new content

### Phase 3: Writing

Write documentation based on findings and patterns identified above.

**By section type:**

| Section | Audience | Tone | Structure |
|---------|----------|------|-----------|
| `docs/manual/` | Technical users | Professional, assumes competence | Feature overview → Configuration → Usage → Reference |
| `docs/administration/` | Admins, DevOps | Direct, technical | Overview → Requirements → Configuration → Scenarios → Troubleshooting |
| `docs/api/` | Developers | Precise, specification-style | Endpoint → Method → Parameters → Request/Response → Version notes |
| `docs/history/` | All users | Professional, benefit-focused | Overview → Features → Fixes → Links → Contributors |
| `docs/developer/` | Plugin developers | Technical, assumes dev knowledge | Concept → Implementation → Examples → Reference |
| `docs/learning/` | New and intermediate users | Instructional, guided | Goal → Prerequisites → Steps → Verification |

**Markdown conventions (VuePress 2 + Hope Theme):**
- ATX-style headers: `#` for H1, `##` for H2, `###` for H3
- All code blocks must specify a language tag for syntax highlighting
- Numbered lists for sequential steps; bullet points for non-sequential items
- Tables must have headers and consistent column formatting
- Descriptive alt text on all images
- No emojis in content; use Font Awesome icons only if strictly necessary

**Writing style:**
- Clear, concise language — no unnecessary verbosity
- Active voice, imperative where appropriate: "Configure project-level settings..."
- No hedging: avoid "you may want to..." or "it might be helpful to..."
- Consistent terminology throughout — use the same term for the same concept
- All property names, flag names, and API paths must be exact matches from source
- All version numbers confirmed from source

**Standard locations:**
- Feature flags → `docs/administration/configuration/system-properties.md`
- Config properties → `docs/administration/configuration/config-file-reference.md`
- API changes → `docs/api/index.md` + version notes
- Features → appropriate `docs/manual/` section
- Release notes → `docs/history/[version]/version-[X.Y.Z].md`

### Phase 4: Validation

Before finishing, verify every item:

**Technical accuracy:**
- [ ] Every feature flag verified against source code (file:line cited)
- [ ] Every config property name is an exact match
- [ ] Every API endpoint path verified
- [ ] Every version number cross-checked against source
- [ ] All default values confirmed from source
- [ ] All code examples validated

**Structure and consistency:**
- [ ] Heading hierarchy matches the patterns of existing docs in this section
- [ ] All internal links verified (read target files to confirm they exist)
- [ ] All code blocks have language tags
- [ ] Tables have headers and consistent column formatting
- [ ] No emojis introduced
- [ ] Navigation updated (sidebars, cross-references) where needed

**English quality:**
- [ ] Zero typos
- [ ] Active voice throughout
- [ ] Correct technical terminology
- [ ] Consistent punctuation and formatting

## Reporting Format

When reporting findings and completed work:

```markdown
## Documentation Complete

**Materials Reviewed:**
- PRs: #XXXX, #XXXX
- Files analyzed: [count] (Glob *.java, *.groovy, *.properties)
- Docs searched: docs/manual/, docs/administration/ (Grep)
- Pattern reference docs: [list specific files read]

**Findings:**
1. **Feature Flag: `property.name`**
   - Location: `path/to/file.groovy:124`
   - Status: NOT documented (confirmed via grep)
   - Action taken: Added to docs/administration/configuration/system-properties.md

2. **Skipped: `some.feature`**
   - Source: design doc only — not found in PRs
   - Action: Not documented (ask user to confirm if this shipped)

**Documentation Changes:**
Created:
- docs/manual/projects/feature-name.md

Updated:
- docs/administration/configuration/config-file-reference.md (lines 892–898)
- docs/api/index.md (lines 1247–1289)
- docs/history/5_x/version-5.20.0.md (lines 23–31)

**Validation:**
✓ Technical accuracy verified (N properties checked against source)
✓ Patterns matched to: [list reference docs used]
✓ All links verified
✓ Navigation updated
```
