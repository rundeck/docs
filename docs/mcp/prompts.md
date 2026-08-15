# Prompts Reference

Prompts are pre-configured, guided workflows for common Rundeck tasks. Where a [tool's](tools.md) guidance mode gives you a nudge when a required parameter is missing, a prompt is the full walkthrough: it combines documentation references, tool recommendations, and step-by-step instructions in one response, optionally tailored by the arguments you pass.

Invoke a prompt through your MCP client's prompt picker (in Claude Code, `/mcp` lists connected servers' prompts) or by asking the assistant to use it by name.

## `create-job`

Guide for creating a Rundeck job: job structure, workflow steps, node filters, and options, tailored to the job type you're building.

| Argument | Required | Options | Default |
|---|---|---|---|
| `job_type` | No | `simple`, `multi-step`, `scheduled`, `with-options` | `simple` |

Points to the job schema resource, the `job_create`/`job_validate` tools, and the manual's job documentation.

## `call-api`

Guide for making Rundeck API calls: authentication setup, the three supported auth methods, and `api_call`/`api_list` usage, optionally focused on one endpoint category.

| Argument | Required | Options |
|---|---|---|
| `endpoint_category` | No | `jobs`, `projects`, `executions`, `system`, `authentication`, `general` |

## `configure-project`

Guide for project configuration: settings, node execution, resource model sources, SCM integration, and plugin configuration, via the UI, `api_call`, or the `rd` CLI, optionally focused on one configuration area.

| Argument | Required | Options |
|---|---|---|
| `configuration_area` | No | `settings`, `node-execution`, `resource-sources`, `scm`, `plugins` |

## `setup-authentication`

Guide for setting up API authentication: generating a token from the Rundeck UI, setting `RUNDECK_URL`/`RUNDECK_TOKEN`, and security best practices (HTTPS, token rotation, least privilege). Takes no arguments.

## `write-node-filter`

Guide for writing node filter expressions: attribute matching syntax, boolean operators, and common attributes, at a chosen complexity level.

| Argument | Required | Options | Default |
|---|---|---|---|
| `filter_complexity` | No | `simple`, `complex` | `simple` |

## `integrate-plugin`

Guide for plugin integration: plugin types (node step, workflow step, executor, file copier, notification), configuration levels (system/project/job), and configuration precedence, optionally focused on one plugin type and/or configuration level.

| Argument | Required | Options |
|---|---|---|
| `plugin_type` | No | `node-step`, `workflow-step`, `file-copier`, `notification`, `executor` |
| `configuration_level` | No | `system`, `project`, `job` |

> Plugin *scaffolding* (generating new plugin source code) is not currently exposed as an MCP tool. This prompt covers configuring and using existing plugins, not authoring new ones. For plugin development, see the [Plugin Development](../developer/) documentation.
