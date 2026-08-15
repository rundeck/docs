# Installing the MCP Server

The Rundeck MCP Server is distributed two ways: as a Docker image (`rundeck/mcp`) and as an npm package (`@rundeck/mcp`). This page walks through the fastest path: Docker with Claude Code. Every other client, and the npx alternative, are on [Other Setups](other-setups.md).

## Prerequisites

- **Rundeck 6.1.0 or later.** Each MCP server release is built against the OpenAPI spec current at release time — the default API version (`59`) was introduced in Rundeck 6.1.0.
- A Rundeck or Runbook Automation instance URL, and an API token generated from your Rundeck user profile page (**User Profile → Generate API Token**). See [Best Practices](best-practices.md) before using your own account's token for this.
- A running Docker daemon (Docker Desktop, Rancher Desktop, etc.): your MCP client starts a container on demand each time it connects.

## Quick setup

```bash
claude mcp add rundeck-mcp -- docker run -i --rm -e RUNDECK_URL=https://your-rundeck-instance.example.com -e RUNDECK_TOKEN=your-rundeck-api-token-here rundeck/mcp:latest
```

That's the whole setup.

## Required configuration

| Variable | Purpose |
|---|---|
| `RUNDECK_URL` | Base URL of your Rundeck instance, e.g. `https://rundeck.example.com`. |
| `RUNDECK_TOKEN` | Rundeck API token. |

Both are required for `api_call` and anything that calls through it (`runner_create`, `acl_manage`); `job_create`/`job_validate` need no live instance.

## Advanced configuration

`RUNDECK_URL` and `RUNDECK_TOKEN` above are the only two you need to get running. Everything else — API version, timeouts, multiple instances, debug logging, and (for the npx path) documentation source variables — has a working default and is documented in one place: the [Configuration Reference](configuration.md).

## Other setups

Running a different client (Cursor, VS Code, Claude Desktop), or want to skip Docker entirely and run via `npx`? See [Other Setups](other-setups.md) for the full set of client configurations.

## Next steps

- [Best Practices](best-practices.md): set this up so the assistant can only do what you're comfortable with.
- [Tools Reference](tools.md): what you can ask the assistant to do.
- [Prompts Reference](prompts.md): guided workflows for common tasks.
- [Resources Reference](resources.md): the documentation catalog available to the assistant.
- [FAQ & Troubleshooting](faq.md): if something isn't working as expected.
