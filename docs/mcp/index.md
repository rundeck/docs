# Rundeck / Runbook Automation MCP Server

Ask your AI assistant to "create a job that restarts the web service on all production nodes, and import it," and it generates a schema-valid job definition and submits it to your real Rundeck instance — no context switching to the UI, no hand-written API call, no YAML you have to get right from memory. That's what the Rundeck MCP Server does: it connects any [MCP](https://modelcontextprotocol.io)-compatible AI assistant (Claude Desktop, Claude Code, Cursor, VS Code, and others) directly to your Rundeck or Runbook Automation (RBA) instance, authenticated with your own API token.

## Why use it

Normally, getting an AI assistant to help with Rundeck means it's guessing: it doesn't know your job schema, your node filter syntax, or your ACL policy format, so you get plausible-looking YAML that fails on import, or advice that's slightly wrong for your version. Two things fix that:

- **It acts, instead of describing.** Ask it to list running executions, restart a job, or provision a runner, and it calls the real API and shows you the real result — not a suggested `curl` command for you to run yourself.
- **It knows the rules before it writes anything.** Job schemas, node filter syntax, and ACL policy structure are loaded as context the assistant checks its own output against, so a generated job definition is validated before it ever reaches your instance.

## What it can do

- **Answer Rundeck questions on the spot**, pulled from the official documentation: API usage, job schemas, node filters, plugin configuration, and more.
- **Query and drive your real instance**: look up projects, jobs, executions, and nodes, or trigger a job run, without leaving the chat.
- **Generate and validate job definitions**: describe a job in plain language and get back a ready-to-import YAML or JSON definition, checked against Rundeck's schema before you deploy it.
- **Validate and manage ACL policies**: catch a structural mistake before it's ever submitted, or list, read, create, update, and delete stored policies directly.
- **Provision runners**: create system- or project-scoped Rundeck Runners on demand, on Docker, Kubernetes, Linux, or Windows.

Under the hood, this runs on three MCP building blocks — **tools** (actions the assistant can call), **resources** (read-only documentation, addressed via `rundeck://` URIs), and **prompts** (guided, multi-step workflows) — but you shouldn't need to think about that distinction to use it. It only matters if you're building against the protocol directly; see [Technical Capabilities](capabilities.md) for that.

## Quick start

The fastest path is the published Docker image:

```bash
docker run -i --rm \
  -e RUNDECK_URL=https://your-rundeck-instance.example.com \
  -e RUNDECK_TOKEN=your-rundeck-api-token \
  rundeck/mcp:latest
```

Wire that command into your MCP client's configuration and you're connected. See [Installation](installation.md) for the Claude Code walkthrough, or [Other Setups](other-setups.md) for Claude Desktop, Cursor, VS Code, and the npm-based alternative if you'd rather not run Docker.

## In this section

- **[Installation](installation.md)**: the fastest setup, Docker with Claude Code.
- **[Other Setups](other-setups.md)**: every other client, and the npx/npm alternative.
- **[Best Practices](best-practices.md)**: set it up so the assistant can only do what you're comfortable with.
- **[Configuration Reference](configuration.md)**: every environment variable the server reads, in one place.
- **[Multiple Instances](multiple-instances.md)**: connect to more than one Rundeck instance (e.g. staging and production) from a single session.
- **[Technical Capabilities](capabilities.md)**: what the server can do, and what it doesn't cover.
- **[FAQ & Troubleshooting](faq.md)**: common setup issues and questions.
