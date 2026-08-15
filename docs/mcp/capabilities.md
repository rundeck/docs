# Technical Capabilities

Everything the Rundeck MCP Server exposes to an AI assistant: **tools** (actions it can take), **resources** (documentation it can read), and **prompts** (guided workflows it can walk through). You don't need to know any of this to use the server — describe what you want, and the assistant picks the right one. This page exists for two narrower reasons: trusting what the assistant did after it acted, and building against the protocol directly (a custom client, prompt, or skill layered on top).

## Tools

Tools are how the assistant acts: calling the Rundeck API, generating and validating job definitions, managing ACL policies, provisioning runners. All inputs are validated with [Zod](https://zod.dev) schemas — for exact parameters, ask the assistant or inspect the server directly; the schemas live in the code, not here, so a written copy can't drift out of sync with it.

### Guidance mode

For most tools (`api_call`, `job_create`, `job_validate`, `runner_create`, `acl_validate`, `acl_manage`, `rundeck_connect`), calling one without its required arguments doesn't fail outright — it returns markdown **guidance** explaining what's needed, so the assistant can recover and ask a follow-up instead of dead-ending. Malformed input (wrong type, invalid enum value) still returns a normal validation error. `job_create`, `job_validate`, `runner_create`, and `acl_manage` each name a fallback `api_call` endpoint in their guidance response, for the rare case the specialized tool doesn't cover what you need.

### API access

`api_call` executes a request against your live instance — querying projects, jobs, executions, or nodes, or triggering a run. `api_list` discovers available endpoints by category first, if you're not sure what's there. Requires `RUNDECK_URL` and `RUNDECK_TOKEN`.

### Job definitions

`job_create` generates a job definition (YAML or JSON) from a plain-language description — workflow steps, node filters, options, schedules — without calling your instance. `job_validate` checks an existing definition's structure before import.

**Scope note:** both check structure only — required fields, valid `loglevel` values, a well-formed workflow. Neither knows or enforces your organization's own conventions: required notification targets, where secrets must be stored, naming standards. If you want an assistant to apply house rules on top of what these generate, that's a custom prompt or client-side skill layered on top, not something these tools do themselves.

### Runners

`runner_create` provisions a Rundeck Runner at system or project scope, on Docker, Kubernetes, Linux, or Windows. It only *registers* the runner — fetching and starting it is always a separate, later step. The response includes a one-time token that can't be retrieved again, so the assistant should surface it to you immediately.

**ACL note:** Rundeck enforces access control at the Runner level. There's no separate ACL context for a Runner's individual Replicas — a Replica's visibility follows whatever the parent Runner's ACL grants. If a Replica isn't visible where you expect, check the Runner-level grant, not a Replica-specific one (there isn't one).

### ACL policies

Rundeck ACL policies are easy to get subtly wrong by hand — a missing `context`, `by`, or `allow`/`deny` clause silently turns into a denied access check with no error at edit time. `acl_validate` checks a policy's structure offline before it's ever submitted (not a substitute for Rundeck's own server-side validation). `acl_manage` lists, gets, creates, updates, or deletes a stored policy file at system or project scope. See [Best Practices](best-practices.md) for scoping a policy to the user whose token the assistant uses.

### Documentation search

`docs_search` searches local Rundeck documentation by keyword, with optional category filters, when you don't already know the exact resource to read. It returns ranked excerpts, not full pages — the assistant follows up by reading the matching resource directly.

### Multi-instance connection

`rundeck_connect` switches the active Rundeck instance by name. It only exists at all when `RUNDECK_INSTANCES` is configured — see [Multiple Instances](multiple-instances.md).

## Resources

Resources give an AI assistant read-only access to Rundeck documentation, addressed with `rundeck://` URIs. Two kinds:

- **Self-contained**, built into the server and always available: API reference, job schemas, workflow strategies, node filter syntax, terminology, and plugin overviews.
- **`rundeck://docs/*`**, which mirror the published documentation site (manual, administration, developer, rd-cli, integrations) and read from a local checkout at `RUNDECK_DOCS_PATH` (see [Configuration Reference](configuration.md)).

The assistant discovers and reads these on its own — there's nothing to configure or invoke directly.

## Prompts

Prompts are pre-configured, guided workflows for common tasks: creating a job, making an API call, configuring a project, setting up authentication, writing a node filter, integrating a plugin. Where a tool's guidance mode gives a nudge on one missing parameter, a prompt is the full walkthrough — documentation references, tool recommendations, and step-by-step instructions in one response.

Most of the time you won't invoke these directly; asking the assistant naturally gets you the same result. If your client has a prompt picker (in Claude Code, `/mcp` lists connected servers' prompts), it surfaces each prompt's optional arguments there — you don't need them memorized here.

> Plugin *scaffolding* (generating new plugin source code) isn't exposed as an MCP tool or prompt. Plugin-related prompts and resources cover configuring and using existing plugins, not authoring new ones.
