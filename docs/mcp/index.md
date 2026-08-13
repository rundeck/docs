# Rundeck / Runbook Automation MCP Server

The Rundeck MCP Server gives any [Model Context Protocol](https://modelcontextprotocol.io) (MCP) compatible AI assistant — Claude Desktop, Claude Code, Cursor, VS Code, and others — direct, authenticated access to your Rundeck or Runbook Automation (RBA) instance. Point it at your instance URL and an API token, and your assistant can look up documentation, drive real jobs and executions, and generate automation on your behalf, all from inside the chat interface you already use.

## Why use it

Rundeck is powerful, but a lot of that power is locked behind API calls, job schemas, node filter syntax, and ACL policy files that take time to learn. The MCP server closes that gap in two ways:

- **AI assistants can act, not just advise.** Instead of describing the API call you should make, an assistant with the Rundeck MCP Server configured can list your projects, run a job, check an execution's status, or provision a runner directly.
- **Documentation and guidance travel with the tool.** Job schemas, node filter syntax, ACL policy structure, and API references are available as first-class context the assistant can pull from mid-conversation, so it can generate and validate correct output on the first try instead of guessing.

## What it can do

- **Answer Rundeck questions on the spot** — API usage, job schemas, node filters, plugin configuration, and more, pulled straight from the official documentation.
- **Query and drive your real instance** — look up projects, jobs, executions, and nodes, or trigger a job run, without leaving the chat.
- **Generate and validate job definitions** — describe a job in plain language and get back a ready-to-import YAML or JSON definition, checked against Rundeck's schema before you deploy it.
- **Validate and manage ACL policies** — check an access control policy for structural errors before it's ever submitted, or list, read, create, update, and delete stored policies directly.
- **Provision runners** — create system- or project-scoped Rundeck Runners on demand, on Docker, Kubernetes, Linux, or Windows.

The server exposes this through three MCP primitives: **tools** (executable actions), **resources** (read-only documentation, addressed via `rundeck://` URIs), and **prompts** (guided, multi-step workflows for common tasks).

## Quick start

The fastest path is the published Docker image — no Node.js version to manage, no local docs checkout to configure:

```bash
docker run -i --rm \
  -e RUNDECK_URL=https://your-rundeck-instance.example.com \
  -e RUNDECK_TOKEN=your-rundeck-api-token \
  rundeck/mcp:latest
```

Wire that command into your MCP client's configuration and you're connected. See [Installation](installation.md) for exact configuration snippets for Claude Desktop, Claude Code, Cursor, and VS Code, plus the equivalent npm-based setup if you'd rather not run Docker.

## In this section

- **[Installation](installation.md)** — Client-by-client setup for Docker and npm, and the full environment variable reference.
- **[Multiple Instances](multiple-instances.md)** — Connect to more than one Rundeck instance (e.g. staging and production) from a single session.
- **[Tools Reference](tools.md)** — Every tool the server exposes, with parameters and examples.
- **[Prompts Reference](prompts.md)** — The guided workflows available for common tasks.
- **[Resources Reference](resources.md)** — The full `rundeck://` documentation catalog.
- **[FAQ & Troubleshooting](faq.md)** — Common setup issues and questions.
