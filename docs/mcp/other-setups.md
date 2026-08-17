# Other Setups

The [Installation](installation.md) page covers the fastest path: Docker with Claude Code. This page covers everything else: other clients on Docker, and the npx/npm alternative for any client.

## Docker, other clients

| | Docker | npm (`npx`) |
|---|---|---|
| Requires | Docker daemon running | Node.js 20+ |
| Docs search / resources | Work out of the box | Require `RUNDECK_DOCS_PATH` set explicitly (see below) |
| `api_call` OpenAPI validation | Never active: the image's docs checkout excludes the spec file (see [FAQ](faq.md)) | Active if `RUNDECK_DOCS_PATH` points at a full docs checkout |

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

## npx (no Docker)

The server is also published as the [`@rundeck/mcp`](https://www.npmjs.com/package/@rundeck/mcp) npm package, exposing the `rundeck-mcp` binary over stdio, for environments without Docker. Requires Node.js 20 or later.

> **Set `RUNDECK_DOCS_PATH` explicitly.** `npm install` downloads a documentation checkout automatically, but into the installed package's own directory, not wherever your MCP client happens to run the process from. Without `RUNDECK_DOCS_PATH` pointing at an actual docs checkout on disk, `docs_search`, the documentation resources, and OpenAPI-based validation in `api_call` will silently come up empty.

### Claude Code

```bash
claude mcp add rundeck-mcp -e RUNDECK_URL=https://your-rundeck-instance.example.com -e RUNDECK_TOKEN=your-rundeck-api-token-here -e RUNDECK_DOCS_PATH=/path/to/rundeck/docs -- npx -y @rundeck/mcp
```

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

## Environment variables

Besides `RUNDECK_URL` and `RUNDECK_TOKEN`, the npx path has three variables Docker doesn't need: `RUNDECK_DOCS_PATH` (above), `RUNDECK_DOCS_BRANCH`, and `SKIP_RUNDECK_DOCS_DOWNLOAD`. For those three plus everything else the server reads, on either path, see the [Configuration Reference](configuration.md).
