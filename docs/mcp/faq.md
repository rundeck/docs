# FAQ & Troubleshooting

## Setup

### `docs_search` and documentation resources return nothing

This almost always means `RUNDECK_DOCS_PATH` isn't resolving:

1. Confirm the environment variable is actually set in your MCP client's configuration (see [Other Setups](other-setups.md)). Auto-detection only works when the server is launched from inside its own repository checkout, which is never the case when an MCP client spawns it.
2. Confirm the path points at an actual documentation checkout on disk, and that it contains the expected markdown files.
3. If you're on the Docker image, this shouldn't come up; it resolves its own bundled docs path automatically. If it does, check that `RUNDECK_DOCS_PATH` wasn't set to a container-local path that doesn't exist.

### `api_call` (or anything that calls through it) fails

1. Verify `RUNDECK_URL` is correct and reachable from wherever the server process runs.
2. Verify `RUNDECK_TOKEN` is valid and has the permissions the call needs.
3. Verify `RUNDECK_API_VERSION` matches a version your instance actually supports.
4. If the error mentions a timeout, the instance may be unreachable or overloaded. `RUNDECK_API_TIMEOUT_MS` controls how long the server waits before giving up (default 30 seconds).
5. If the error is about an unrecognized endpoint or parameter, check your Rundeck version (see below).

### `api_call` rejects an endpoint or parameter that looks correct

Each MCP server release validates `api_call` requests against the OpenAPI spec current as of that release, and may expect endpoints or fields that don't exist on an older Rundeck/RBA instance. This is most likely to show up if your instance predates **Rundeck 6.1.0** — the release that introduced API v59, the server's default `RUNDECK_API_VERSION`. Upgrade the Rundeck instance, or, if that's not possible, set `RUNDECK_SKIP_OPENAPI_VALIDATE=1` to bypass the local check.

This can't be what's happening on the **Docker image**, though: see the next entry.

### On Docker, `api_call` never rejects a bad parameter, even ones that should fail

This validation only runs if the OpenAPI spec file (`rundeck-api.yml`) is present under `RUNDECK_DOCS_PATH`. The Docker image fetches documentation via a sparse checkout that deliberately excludes `.vuepress/public/**` (a large, mostly-media tree), but that's exactly where the spec file lives. Without it, `api_call` skips query/body-key validation silently, independent of `RUNDECK_SKIP_OPENAPI_VALIDATE`; everything else `api_call` does (making the request, handling the response) is unaffected. If you need this validation, use the npm/`npx` path instead, with `RUNDECK_DOCS_PATH` pointed at a full docs checkout that includes `.vuepress/public/files/`.

### The Docker container won't start

The Docker daemon needs to be *running*, not just installed (Docker Desktop, Rancher Desktop, etc.), since your MCP client starts a container on demand each time it connects: if the daemon isn't up, the connection fails before the server ever gets a chance to run.

## Behavior

### Does `job_create` enforce our organization's coding standards?

No. `job_create` and `job_validate` check structure only. See their entries in the [Tools Reference](tools.md) for exactly what that covers. Neither knows about organization-specific conventions like "secrets must come from a particular key storage path" or "job failures must trigger a specific notification."

If you want an assistant to apply house rules on top of what these tools generate, that's a job for a custom prompt or client-side skill layered on top of the MCP server, not a configuration option on `job_create` itself. The tool is deliberately generic, useful across every Rundeck/RBA setup rather than tuned to one.

### I generated an ACL policy for a Runner, but its Replicas don't show up the way I expected

This is expected. Rundeck enforces ACLs at the Runner level: there's no separate ACL context for an individual Replica. A Replica's visibility follows whatever the parent Runner's ACL grants (typically `runner: [read]`); there's no additional grant to add for the Replicas themselves. If a Replica isn't visible where you expect, check the Runner-level grant rather than looking for a Replica-specific one.

### Why does the npm/`npx` setup need `RUNDECK_DOCS_PATH`, but Docker doesn't?

`npm install` downloads a documentation checkout as part of its postinstall step, but into the installed package's own directory, not the working directory your MCP client happens to launch the process from. The server's auto-detection logic only looks in a few `cwd`-relative locations, so it won't find that download unless your client's working directory happens to line up. Setting `RUNDECK_DOCS_PATH` explicitly sidesteps the guesswork. The Docker image doesn't have this problem because its documentation lands at a fixed, known path inside the container every time.

### What happens if I call a tool without its required parameters?

For most tools, you get back **guidance** (a markdown explanation of what's needed and why) instead of a hard error, so an assistant can recover and ask a follow-up question rather than dead-ending. See [Guidance mode](tools.md#guidance-mode) for exactly which tools support this and what triggers it. Malformed input (wrong type, invalid enum value) still returns a normal validation error.
