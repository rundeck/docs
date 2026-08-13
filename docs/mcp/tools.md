# Tools Reference

Tools let an AI assistant perform actions beyond reading documentation — calling the Rundeck API, generating and validating job definitions, managing ACL policies, and provisioning runners. All inputs are validated with [Zod](https://zod.dev) schemas.

## Guidance mode

For `api_call`, `job_create`, `job_validate`, `runner_create`, `acl_validate`, `acl_manage`, and `rundeck_connect`, calling the tool without its required arguments (or leaving a required string field blank) doesn't return a validation error — it returns markdown **guidance** in the normal tool response, so the assistant can walk the user through what's needed instead of failing outright. Malformed types, invalid enum values, and other structurally invalid input still return a normal validation error. Each tool's required fields are listed in its section below.

For a fully guided, multi-step walkthrough rather than single-call guidance, use the corresponding [prompt](prompts.md) instead.

## API Tools

### `api_call`

Execute a Rundeck API call against a live instance.

**When to use:** querying projects, jobs, executions, nodes, or system information; triggering job executions; managing Rundeck resources programmatically.

**When not to use:** reading documentation — use [resources](resources.md) instead.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `endpoint` | string | Yes | API path. Full (`/api/46/projects`) or relative (`projects`). |
| `method` | `GET`\|`POST`\|`PUT`\|`DELETE`\|`PATCH` | No (default `GET`) | HTTP method. |
| `body` | object, array, or string | No | Request body for `POST`/`PUT`/`PATCH`. A pre-serialized string is sent verbatim; otherwise it's JSON-encoded. Some endpoints (e.g. job import) require a JSON array rather than an object. |
| `query_params` | object of strings | No | Query parameters as key/value pairs. Names are validated against the shipped OpenAPI spec unless `RUNDECK_SKIP_OPENAPI_VALIDATE=1`. |
| `content_type` | string | No (default `application/json`) | Content-Type header. Use `application/yaml` when importing a job definition produced by `job_create`. |

Guidance mode triggers when `endpoint` is omitted. Requires `RUNDECK_URL` and `RUNDECK_TOKEN` — if either is missing, the tool returns a configuration error pointing at the `setup-authentication` prompt.

```json
{
  "endpoint": "job/abcd-1234/run",
  "method": "POST",
  "body": { "options": { "environment": "staging" } }
}
```

### `api_list`

List available Rundeck API endpoints with descriptions and categories, discovered from the shipped OpenAPI spec.

**When to use:** discovering available endpoints, or understanding API structure before calling `api_call`.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `category` | `jobs`\|`projects`\|`executions`\|`system`\|`authentication`\|`general` | No | Filter by category. Omit to return all endpoints. |

## Job Tools

### `job_create`

Generate a Rundeck job definition in YAML or JSON, from structured parameters — not from a live instance call.

**When to use:** creating a new job definition for import, or building one with AI assistance.

**When not to use:** validating an existing definition (use `job_validate`); reading job documentation (use the [`rundeck://docs/manual/jobs`](resources.md) resource).

| Parameter | Type | Required | Description |
|---|---|---|---|
| `name` | string | Yes | Job name, unique within the project. |
| `project` | string | Yes | Project the job belongs to. |
| `workflow_steps` | array of step objects | Yes | See **Workflow step** below. |
| `description` | string | No | Job description. |
| `node_filter` | string | No | Node filter expression, e.g. `tags: production`. See [node filter syntax](resources.md). |
| `options` | array of option objects | No | See **Job option** below. |
| `format` | `yaml`\|`json` | No (default `yaml`) | Output format. |
| `group` | string | No | Job group for organization. |
| `loglevel` | `DEBUG`\|`VERBOSE`\|`INFO`\|`WARN`\|`ERROR` | No (default `INFO`) | Execution log verbosity. |
| `timeout` | string | No | Max run time, e.g. `1h`, `30m`, `2h30m`. |
| `retry` | number or string | No | Number of retries for failed steps. |
| `multipleExecutions` | boolean | No | Allow concurrent runs of this job. Default `false`. |
| `schedule` | schedule object | No | See **Schedule** below. |

**Workflow step:**

| Field | Description |
|---|---|
| `type` | `command`, `script`, `jobref`, or `plugin`. |
| `exec` | Shell command (for `type: command`). |
| `script` / `scriptfile` / `scripturl` | Inline script, path, or URL (for `type: script`). |
| `jobref` | `{ name, group?, args? }` — reference to another job (for `type: jobref`). |
| `plugin` | `{ type, configuration? }` — a step plugin (for `type: plugin`). |
| `nodeStep` | Whether this step runs per-node vs. once on the server. |
| `description` | Optional step description. |

**Job option:**

| Field | Description |
|---|---|
| `name` | Option name (required). |
| `description`, `default`, `required` | Standard fields. |
| `values` / `valuesUrl` | Static list or a URL provider for the value list. |
| `regex`, `enforcedValues` | Validation constraints. |
| `multivalued`, `delimiter` | Allow multiple values, and the delimiter to join them. |
| `secure`, `valueExposed` | Mark the option as a secure/masked input, and whether its value is exposed to scripts. |

**Schedule:** either `crontab` (a Quartz cron expression, e.g. `0 30 8 ? * MON-FRI`) or the structured fields `time` (`{ hour, minute, seconds? }`), `month`, `year`, `weekday` (`{ day }`), `day` (`{ day }`) — provide one approach, not both.

Guidance mode triggers when `name`, `project`, or `workflow_steps` is omitted.

> **Scope note:** `job_create` produces a structurally correct, schema-valid job definition. It does not know or enforce your organization's own conventions — required notification targets, where secrets must be stored, naming standards, and similar policies. If you need the assistant to apply house rules on top of what `job_create` generates, layer a custom prompt or client-side skill that reviews or rewrites its output; that's a complement to this tool, not something it does itself.

```yaml
- name: Restart Web Service
  description: Restarts the web service and confirms it's back up
  loglevel: INFO
  sequence:
    commands:
      - exec: systemctl restart web
      - exec: curl -sf http://localhost/health
  nodefilters:
    filter: 'tags: web AND tags: production'
```

### `job_validate`

Validate a job definition's syntax and required fields.

**When to use:** checking a job before importing it; debugging a malformed definition.

**When not to use:** creating a new definition (use `job_create`).

| Parameter | Type | Required | Description |
|---|---|---|---|
| `job_definition` | string | Yes | The job definition as a YAML or JSON string. |
| `format` | `yaml`\|`json` | Yes | Must match the actual format of `job_definition`. |

Returns `{ valid, errors, warnings }`. This is a structural check (required fields, `loglevel` values, a well-formed `sequence.commands` array) — it does not replace Rundeck's own server-side validation on import, and does not check plugin-specific configuration or option values.

Guidance mode triggers when `job_definition` or `format` is omitted.

## Runner Tools

### `runner_create`

Create a Rundeck Runner at system or project scope, on any supported platform.

**When to use:** provisioning a runner for a project, or a system-wide runner shared across projects.

**When not to use:** expecting the runner to be downloaded, installed, or started automatically — this tool only *registers* the runner. Fetching and starting it is always a separate, later step.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `name` | string | Yes | Runner name, unique within its scope. |
| `scope` | `system`\|`project` | Yes | `project` targets `POST project/{project}/runnerManagement/runners`; `system` targets `POST runnerManagement/runners`. |
| `project` | string | Required if `scope: project` | Target project name. |
| `description` | string | No | Human-readable description. |
| `installation_type` | `docker`\|`kubernetes`\|`linux`\|`windows` | No (default `docker`) | Platform the runner is installed on. |
| `replica_type` | `ephemeral`\|`manual` | No | If omitted, defaults based on `installation_type` — `manual` for `linux`/`windows`, `ephemeral` for `docker`/`kubernetes` — matching Rundeck's own default. Any combination is valid; set explicitly to override (e.g. a manual Docker runner). |
| `tag_names` | array of strings | No | Tags for filtering/targeting, e.g. `["DOCKER", "PRODUCTION"]`. |
| `node_dispatch` | object | No | Optional follow-up call to configure Node Dispatch. Only valid with `scope: project`. See below. |

**`node_dispatch` fields:** `runner_as_node_enabled` (boolean, default `true` — adds the runner itself as a node), `remote_node_dispatch` (boolean — lets the runner dispatch to remote nodes matching `node_filter`), `node_filter` (string — node filter expression scoping that dispatch).

**Important:** the response includes a one-time `token` and `downloadTk`. They cannot be retrieved again — surface them to the user immediately.

Guidance mode triggers when `name` or `scope` is omitted.

> **ACL note:** Rundeck enforces access control at the Runner level. There is no separate ACL context for individual Replicas of a runner — a Replica's visibility follows whatever the parent Runner's ACL grants. If a generated or hand-written policy grants `runner: [read]` but a Replica doesn't appear where you expect, that's expected behavior, not a missing grant.

## ACL Tools

Rundeck ACL policies are easy to get subtly wrong by hand — a missing `context`, `by`, or `allow`/`deny` clause silently turns into a denied access check with no error at edit time. These two tools give a structural pre-flight check plus a small, named surface for the CRUD operations Rundeck exposes for ACL policy files, instead of requiring hand-built `api_call` requests against `system/acl/*` or `project/{project}/acl/*`.

### `acl_validate`

Validate an ACL policy YAML document offline against the aclpolicy v1.0 format — a local structural check, not a substitute for Rundeck's own server-side validation.

**When to use:** checking policy structure (`context`, `for`, `by`/`notBy`, `allow`/`deny`) before creating or updating it; debugging why a policy might be silently denying access.

**When not to use:** actually creating, updating, or deleting a policy on the server (use `acl_manage`).

| Parameter | Type | Required | Description |
|---|---|---|---|
| `acl_definition` | string | Yes | ACL policy file contents as YAML. May contain multiple `---`-separated documents. |

Returns `{ valid, errors, warnings, policyCount }`. Checks include: a `context` declaring exactly one of `project`/`application`; a non-empty `for` section with recognized resource types and well-formed rules; every rule declaring `allow` and/or `deny` plus a match clause; a `by` or `notBy` section naming a `username`, `group`, or `urn`; and (where Rundeck's own action vocabulary for that resource type and scope is known) a warning if an `allow`/`deny` action looks unrecognized.

Guidance mode triggers when `acl_definition` is omitted.

### `acl_manage`

List, get, create, update, or delete a Rundeck ACL policy file at system or project scope.

**When to use:** auditing which policies exist, reading one's current contents, or creating/updating a policy after validating it with `acl_validate`.

**When not to use:** editing ACL policy files on the server's local filesystem directly (not supported by this or any Rundeck API); validating structure only, without submitting it (use `acl_validate`).

| Parameter | Type | Required | Description |
|---|---|---|---|
| `action` | `list`\|`get`\|`create`\|`update`\|`delete` | Yes | Operation to perform. |
| `scope` | `system`\|`project` | Yes | `system` → `system/acl/*` (cluster-wide); `project` → `project/{project}/acl/*`. |
| `project` | string | Required if `scope: project` | Target project name. |
| `name` | string | Required for all actions except `list` | Policy file name. The `.aclpolicy` suffix is added automatically if omitted. |
| `content` | string | Required for `create`/`update` | ACL policy YAML contents. Strongly recommended: validate with `acl_validate` first — Rundeck rejects invalid policies with a 400 and per-document errors, but the local check surfaces the same issues faster. |

Guidance mode triggers when `action` or `scope` is omitted.

## Documentation Tools

### `docs_search`

Search local Rundeck markdown documentation (under `RUNDECK_DOCS_PATH`) by keywords and phrases, with optional category filters.

**When to use:** finding where a topic is documented before opening a resource by URI; exploring when the exact `rundeck://` URI is unknown.

**Follow-up:** once you have a file path, prefer reading the corresponding [resource](resources.md) for complete, authoritative content — `docs_search` returns ranked excerpts, not full pages.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `query` | string | Yes | Search terms. |
| `category` | `api`\|`jobs`\|`config`\|`learning`\|`plugins` | No | Restrict the search to one documentation subtree. Omit to search everything under `RUNDECK_DOCS_PATH`. |

Returns up to 20 results, each with `title`, `content` (an excerpt around the match), `file`, and a relevance score.

## Connection Tools

### `rundeck_connect`

Only listed and callable when a `RUNDECK_INSTANCES` registry is configured — see [Multiple Instances](multiple-instances.md). With a single `RUNDECK_URL`/`RUNDECK_TOKEN` setup, this tool doesn't exist at all.

| Parameter | Type | Required | Description |
|---|---|---|---|
| `instance` | string | Yes | Registered instance name to switch to. Never a URL or token. |

Guidance mode triggers when `instance` is omitted — returns the list of registered instance names instead of an error.
