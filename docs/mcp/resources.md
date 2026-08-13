# Resources Reference

Resources give an AI assistant read-only access to Rundeck documentation, addressed with `rundeck://` URIs. Some resources are self-contained (built into the server); others read from a local documentation checkout at `RUNDECK_DOCS_PATH` (see [Installation](installation.md)) and return "Resource not found" if that path isn't reachable.

Use [`docs_search`](tools.md#docs_search) to find the right URI when you don't already know it, then read the resource directly for the complete, authoritative content.

## API documentation

| URI | Description |
|---|---|
| `rundeck://api` | Complete API reference. |
| `rundeck://api/auth` | Authentication methods. |
| `rundeck://api/examples` | API usage examples. |
| `rundeck://docs/api` | Alias for `rundeck://api`. |
| `rundeck://docs/api/auth` | Alias for `rundeck://api/auth`. |
| `rundeck://docs/api/examples` | Alias for `rundeck://api/examples`. |

## Job definitions

| URI | Description |
|---|---|
| `rundeck://jobs/schema?format=yaml\|json\|xml` | Job schema. Defaults to YAML if `format` is omitted; XML is legacy support. |
| `rundeck://jobs/workflows` | Workflow strategies. |
| `rundeck://jobs/options` | Job options documentation. |
| `rundeck://jobs/examples/{category}` | Job examples for a category. |

## Configuration

| URI | Description |
|---|---|
| `rundeck://config` | Configuration index (same content as `config/system`). |
| `rundeck://config/system` | System configuration reference. |
| `rundeck://config/project` | Project configuration. |
| `rundeck://config/plugins` | Plugin configuration. |
| `rundeck://config/examples/{type}` | Configuration examples for a type. |

## Learning resources

| URI | Description |
|---|---|
| `rundeck://learn` | Getting started guide. |
| `rundeck://docs/learning` | Alias for `rundeck://learn`. |
| `rundeck://learn/runners` | Runners overview. |
| `rundeck://learn/howto/{topic}` | How-to guide for a topic. |
| `rundeck://learn/tutorial/{lesson}` | A tutorial lesson. |
| `rundeck://docs/learning/howto/{topic}` | Alias form of the how-to guide route. |
| `rundeck://docs/learning/tutorial/{topic}` | Alias form of the tutorial route. |

## Plugin documentation

| URI | Description |
|---|---|
| `rundeck://plugins` | Plugin overview. |
| `rundeck://plugins/node-steps` | Node step plugins. |
| `rundeck://plugins/workflow-steps` | Workflow step plugins. |
| `rundeck://plugins/{type}/{name}` | A specific plugin's documentation. |

## Reference materials

| URI | Description |
|---|---|
| `rundeck://ref/filters` | Node filter syntax. |
| `rundeck://ref/terms` | Rundeck terminology. |
| `rundeck://ref/runners` | Runners overview (alias). |

## Comprehensive documentation (`rundeck://docs/*`)

These read from `RUNDECK_DOCS_PATH` and mirror the structure of the published documentation site, so the set of readable URIs grows as the underlying docs do. `listResources()` returns every directory and file discovered this way alongside the entries below, so a client can enumerate them rather than guessing paths.

| URI pattern | Content source |
|---|---|
| `rundeck://docs/manual` and `rundeck://docs/manual/{...path}` | User manual — jobs, nodes, executions, calendars, projects, key storage, and more. |
| `rundeck://docs/administration` and `rundeck://docs/administration/{...path}` | Administration guides — installation, security, configuration, clustering. |
| `rundeck://docs/developer` and `rundeck://docs/developer/{...path}` | Plugin development documentation. |
| `rundeck://docs/developer/plugins` | Plugin development overview. |
| `rundeck://docs/developer/plugin/{type}` | Documentation for a specific plugin type (e.g. `step-plugins`, `node-execution-plugins`, `file-copier-plugins`, `notification-plugins`). |
| `rundeck://docs/rd-cli`, `rundeck://docs/rd-cli/commands`, `rundeck://docs/rd-cli/scripting`, `rundeck://docs/rd-cli/{topic}` | RD command-line interface documentation. |
| `rundeck://docs/integrations/salesforce` | Salesforce integration guidance. |

A few manual/administration topics are reachable under friendlier names than their underlying file path — for example `rundeck://docs/manual/nodes`, `.../executions`, `.../performance` (and its `metrics`/`monitoring` aliases), and `.../projects/aws-ssm`. These aliases are always included in `listResources()`, so you don't need to know the underlying file layout to find them.

## Quick-access shortcuts

A handful of frequently-needed topics are also reachable directly, without the `docs/` prefix:

| URI | Description |
|---|---|
| `rundeck://aws-ssm-setup` | AWS SSM plugin setup guide. |
| `rundeck://runners` | Runners overview and importance. |
| `rundeck://performance-monitoring` (or `rundeck://metrics`) | Performance monitoring and metrics. |
| `rundeck://salesforce-alternatives` | Salesforce integration alternatives. |

## Discovering resources

Call your MCP client's `resources/list` to get the full, current catalog — including every dynamically-discovered `docs/manual` and `docs/administration` path — rather than relying on this page to enumerate every leaf topic. This page documents the URI *scheme* and the categories it covers; the manual and administration trees in particular are large enough that new pages appear there independent of MCP server releases.
