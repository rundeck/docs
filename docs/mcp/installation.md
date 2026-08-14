# Installing the MCP Server

The Rundeck MCP Server is distributed two ways: as a Docker image (`rundeck/mcp`) and as an npm package (`@rundeck/mcp`). Both are published and ready to use — pick whichever fits your environment.

| | Docker | npm (`npx`) |
|---|---|---|
| Requires | Docker daemon running | Node.js 20+ |
| Docs search / resources | Work out of the box | Require `RUNDECK_DOCS_PATH` set explicitly (see below) |
| Recommended for | Most setups | Environments without Docker |

## Prerequisites

- **Rundeck 6.0 or later.** Each MCP server release is built against the OpenAPI spec current at release time and may expect endpoints that don't exist on older instances. Using the latest Rundeck/RBA release alongside the latest MCP server release is recommended. Older instances may work, but aren't tested.
- A Rundeck or Runbook Automation instance URL.
- An API token, generated from your Rundeck user profile page (**User Profile → Generate API Token**).
- **Docker path:** a running Docker daemon (Docker Desktop, Rancher Desktop, etc.) — your MCP client starts a container on demand each time it connects.
- **npm path:** Node.js 20 or later on your `PATH`.

## Docker (recommended)

No Node.js version to manage, and no docs-path configuration gotcha — the image downloads Rundeck's documentation to a fixed path inside its own working directory automatically.

### Claude Desktop / Cursor

Add to your client's `mcpServers` configuration:

```json
{
  "mcpServers": {
    "rundeck-mcp": {
      "command": "docker",
      "args": [
        "run", "-i", "--rm",
        "-e", "RUNDECK_URL=https://your-rundeck-instance.example.com",
        "-e", "RUNDECK_TOKEN=your-rundeck-api-token-here",
        "rundeck/mcp:latest"
      ]
    }
  }
}
```

### VS Code

Add to `mcp.json`:

```json
{
  "mcp": {
    "inputs": [
      {
        "type": "promptString",
        "id": "rundeck-url",
        "description": "Rundeck Instance URL"
      },
      {
        "type": "promptString",
        "id": "rundeck-token",
        "description": "Rundeck API Token",
        "password": true
      }
    ],
    "servers": {
      "rundeck-mcp": {
        "type": "stdio",
        "command": "docker",
        "args": [
          "run", "-i", "--rm",
          "-e", "RUNDECK_URL=${input:rundeck-url}",
          "-e", "RUNDECK_TOKEN=${input:rundeck-token}",
          "rundeck/mcp:latest"
        ]
      }
    }
  }
}
```

### Claude Code

Add via the CLI:

```bash
claude mcp add rundeck-mcp -- docker run -i --rm -e RUNDECK_URL=https://your-rundeck-instance.example.com -e RUNDECK_TOKEN=your-rundeck-api-token-here rundeck/mcp:latest
```

## npx (no Docker)

The server is also published as the [`@rundeck/mcp`](https://www.npmjs.com/package/@rundeck/mcp) npm package, exposing the `rundeck-mcp` binary over stdio.

> **Set `RUNDECK_DOCS_PATH` explicitly.** `npm install` downloads a documentation checkout automatically, but into the installed package's own directory — not wherever your MCP client happens to run the process from. Without `RUNDECK_DOCS_PATH` pointing at an actual docs checkout on disk, `docs_search`, the documentation resources, and OpenAPI-based validation in `api_call` will silently come up empty.

### Cursor

Configure in Cursor's `settings.json` (**Cursor Settings → Tools → Add MCP**, or `Cmd+,` / `Ctrl+,`):

```json
{
  "mcpServers": {
    "rundeck-mcp": {
      "command": "npx",
      "args": ["-y", "@rundeck/mcp"],
      "env": {
        "RUNDECK_URL": "https://your-rundeck-instance.example.com",
        "RUNDECK_TOKEN": "your-rundeck-api-token-here",
        "RUNDECK_DOCS_PATH": "/path/to/rundeck/docs"
      }
    }
  }
}
```

### VS Code

Under **Features → Chat**, confirm **Mcp: Enabled** is checked, then edit `mcp.json`:

```json
{
  "mcp": {
    "inputs": [
      {
        "type": "promptString",
        "id": "rundeck-url",
        "description": "Rundeck Instance URL"
      },
      {
        "type": "promptString",
        "id": "rundeck-token",
        "description": "Rundeck API Token",
        "password": true
      }
    ],
    "servers": {
      "rundeck-mcp": {
        "type": "stdio",
        "command": "npx",
        "args": ["-y", "@rundeck/mcp"],
        "env": {
          "RUNDECK_URL": "${input:rundeck-url}",
          "RUNDECK_TOKEN": "${input:rundeck-token}",
          "RUNDECK_DOCS_PATH": "/path/to/rundeck/docs"
        }
      }
    }
  }
}
```

### Claude Desktop

Edit your Claude Desktop configuration file:

- **macOS:** `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows:** `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "rundeck-mcp": {
      "command": "npx",
      "args": ["-y", "@rundeck/mcp"],
      "env": {
        "RUNDECK_URL": "https://your-rundeck-instance.example.com",
        "RUNDECK_TOKEN": "your-rundeck-api-token-here",
        "RUNDECK_DOCS_PATH": "/path/to/rundeck/docs"
      }
    }
  }
}
```

Restart Claude Desktop completely for the change to take effect.

### Claude Code

Add via the CLI:

```bash
claude mcp add rundeck-mcp -e RUNDECK_URL=https://your-rundeck-instance.example.com -e RUNDECK_TOKEN=your-rundeck-api-token-here -e RUNDECK_DOCS_PATH=/path/to/rundeck/docs -- npx -y @rundeck/mcp
```

## Environment variables

| Variable | Required | Default | Purpose |
|---|---|---|---|
| `RUNDECK_URL` | For `api_call` and anything that calls through it (`job_create`/`job_validate` need no live instance; `runner_create`, `acl_manage` do) | — | Base URL of your Rundeck instance, e.g. `https://rundeck.example.com`. |
| `RUNDECK_TOKEN` | Same as above | — | Rundeck API token. |
| `RUNDECK_API_VERSION` | No | `46` | Rundeck API version appended to the base URL. Match your instance's supported version. |
| `RUNDECK_API_TIMEOUT_MS` | No | `30000` | Timeout in milliseconds for `api_call`'s underlying HTTP request (also bounds `runner_create` and `acl_manage`, which call through it). Past this limit the request is aborted with a distinct timeout error. Invalid or non-positive values fall back to the default. |
| `RUNDECK_INSTANCES` | No | — | JSON registry of multiple named Rundeck instances, for switching between them (e.g. prod/staging) without restarting. See [Multiple Instances](multiple-instances.md). |
| `RUNDECK_DOCS_PATH` | Only for npx-based setups | Auto-detected | Path to a Rundeck documentation directory on disk. Auto-detection (`./docs/docs`, `../docs/docs`, `./docs`, `../docs`, relative to the process's working directory) only works when the server is launched from inside a checkout of the server's own repository — an MCP client spawning the process from its own working directory won't find auto-downloaded docs this way. The Docker image always has this resolved correctly out of the box. |
| `RUNDECK_DOCS_BRANCH` | No | `4.0.x` | Branch of [rundeck/docs](https://github.com/rundeck/docs) to download when no documentation is already present. |
| `SKIP_RUNDECK_DOCS_DOWNLOAD` | No | — | Set to `1` to skip the automatic documentation download during `npm install`/`npm ci` (npm path only; no effect on Docker). |
| `RUNDECK_SKIP_OPENAPI_VALIDATE` | No | — | Set to `1` to disable pre-request validation of `api_call` query keys and JSON body top-level keys against the shipped OpenAPI spec. Useful if you intentionally send parameters not yet documented in that spec. |
| `MCP_DEBUG` | No | — | Set to `1` or `true` for verbose server-side logging. |

## Next steps

- [Tools Reference](tools.md) — what you can ask the assistant to do.
- [Prompts Reference](prompts.md) — guided workflows for common tasks.
- [Resources Reference](resources.md) — the documentation catalog available to the assistant.
- [FAQ & Troubleshooting](faq.md) — if something isn't working as expected.
