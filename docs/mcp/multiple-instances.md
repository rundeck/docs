# Multiple Instances

Most setups only ever talk to one Rundeck instance, configured with `RUNDECK_URL`/`RUNDECK_TOKEN` as described in [Installation](installation.md). If that's you, there's nothing else to configure.

If you need to switch between more than one Rundeck instance — for example, staging and production — in the same session, without quitting and reconfiguring the server, configure `RUNDECK_INSTANCES` instead.

## The `RUNDECK_INSTANCES` registry

Set `RUNDECK_INSTANCES` to a JSON registry of named instances instead of setting `RUNDECK_URL`/`RUNDECK_TOKEN` directly:

```json
{
  "default": "prod",
  "instances": {
    "prod":    { "url": "https://rundeck-prod.example.com",    "token": "prod-token" },
    "staging": { "url": "https://rundeck-staging.example.com", "token": "staging-token" }
  }
}
```

- `default` — which instance the server connects to on startup.
- Every entry under `instances` needs both `url` and `token`.
- The registry is only read once, at process start. To rotate a token or add an instance, edit the JSON and restart the MCP client.

Once `RUNDECK_INSTANCES` is set, an extra tool — `rundeck_connect` — becomes available. It doesn't exist at all in a single-instance setup.

## Getting the registry into the environment

Save the JSON above to a file (e.g. `~/.rundeck-mcp/instances.json`; `chmod 600` it, since it holds live tokens), then set `RUNDECK_INSTANCES` to its contents in your MCP client's `env` configuration block — the same place you'd otherwise set `RUNDECK_URL`/`RUNDECK_TOKEN`:

```json
{
  "mcpServers": {
    "rundeck-mcp": {
      "command": "docker",
      "args": ["run", "-i", "--rm", "-e", "RUNDECK_INSTANCES", "rundeck/mcp:latest"],
      "env": {
        "RUNDECK_INSTANCES": "{\"default\":\"prod\",\"instances\":{\"prod\":{\"url\":\"https://rundeck-prod.example.com\",\"token\":\"prod-token\"},\"staging\":{\"url\":\"https://rundeck-staging.example.com\",\"token\":\"staging-token\"}}}"
      }
    }
  }
}
```

`-e RUNDECK_INSTANCES` (with no `=value`) tells `docker run` to forward that variable from the client's own process environment — set below it in `env` — into the container, rather than repeating the JSON inline in `args`.

If you're running the server outside a client's managed config — for example, invoking `claude` directly from a terminal — export it in your shell first:

```bash
export RUNDECK_INSTANCES=$(cat ~/.rundeck-mcp/instances.json)
claude
```

Either way, `RUNDECK_INSTANCES` needs to be present in the environment *before* the MCP server process starts.

## Using `rundeck_connect`

`rundeck_connect` switches the active instance by name:

| Parameter | Required | Description |
|---|---|---|
| `instance` | Yes | The registered instance name to switch to (e.g. `"staging"`) — never a URL or token. |

Calling it without `instance` returns the list of registered instance names as guidance instead of an error.

Once connected, every subsequent `api_call`, `job_create`/`job_validate`, `runner_create`, and `acl_validate`/`acl_manage` call uses whichever instance is currently active — there's no need to pass connection details to those tools directly.

**When not to use it:**
- Only one Rundeck instance is configured — the tool won't exist, so there's nothing to call.
- Making an API call itself — use `api_call`, which always targets whichever instance is currently active.
