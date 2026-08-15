# Configuration Reference

Every environment variable the MCP server reads, in one place. If you just want the two you need to get started, see [Installation](installation.md#required-configuration) instead — this page is for when you want the complete picture, or need something not covered there.

## Connection

| Variable | Applies to | Default | Purpose |
|---|---|---|---|
| `RUNDECK_URL` | Docker & npx | — | Base URL of your Rundeck instance, e.g. `https://rundeck.example.com`. Required for `api_call` and anything that calls through it (`runner_create`, `acl_manage`); `job_create`/`job_validate` need no live instance. |
| `RUNDECK_TOKEN` | Docker & npx | — | Rundeck API token. Same requirement as `RUNDECK_URL`. |
| `RUNDECK_INSTANCES` | Docker & npx | — | JSON registry of multiple named Rundeck instances, for switching between them (e.g. prod/staging) in the same session instead of setting `RUNDECK_URL`/`RUNDECK_TOKEN` directly. See [Multiple Instances](multiple-instances.md). |

## API behavior

| Variable | Applies to | Default | Purpose |
|---|---|---|---|
| `RUNDECK_API_VERSION` | Docker & npx | `59` | Rundeck API version appended to the base URL. Only needed if your instance runs a different supported version. |
| `RUNDECK_API_TIMEOUT_MS` | Docker & npx | `30000` | Timeout for `api_call`'s underlying HTTP request (also bounds `runner_create` and `acl_manage`). |
| `RUNDECK_SKIP_OPENAPI_VALIDATE` | Docker & npx | — | Set to `1` to disable pre-request validation of `api_call` parameters against the shipped OpenAPI spec. Has no practical effect on Docker, where that spec file isn't present to begin with — see [FAQ](faq.md). |

## Documentation source (npx only)

The Docker image resolves its own bundled documentation automatically at a fixed path, so none of these three apply to it.

| Variable | Applies to | Default | Purpose |
|---|---|---|---|
| `RUNDECK_DOCS_PATH` | npx only | Auto-detected (rarely resolves for an MCP client) | Path to a Rundeck documentation checkout on disk. Without it, `docs_search`, the documentation resources, and OpenAPI-based validation in `api_call` silently come up empty. |
| `RUNDECK_DOCS_BRANCH` | npx only | `4.0.x` | Branch of [rundeck/docs](https://github.com/rundeck/docs) to download when no documentation is already present. |
| `SKIP_RUNDECK_DOCS_DOWNLOAD` | npx only | — | Set to `1` to skip the automatic documentation download during `npm install`/`npm ci`. |

## Diagnostics

| Variable | Applies to | Default | Purpose |
|---|---|---|---|
| `MCP_DEBUG` | Docker & npx | — | Set to `1` or `true` for verbose server-side logging. |
