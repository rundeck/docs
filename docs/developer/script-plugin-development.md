# Script Plugin Development

## Overview

Script plugins allow you to extend Rundeck using any scripting language (Bash, Python, Ruby, etc.) without setting up a Java development environment. Scripts are invoked as external system processes by the JVM, making them ideal for:

- Quick prototypes and proof-of-concepts
- Wrapping existing scripts or command-line tools
- Simple file operations or system commands
- Environment-specific customizations
- Situations where Java development setup is not desired

## Supported Plugin Types

These Services support Script Plugins:

- **[NodeExecutor](/developer/node-executor-plugins.md#script-plugin-type)** - Execute commands on nodes
- **[FileCopier](/developer/file-copier-plugins.md#script-plugin-type)** - Copy files to nodes
- **[ResourceModelSource](/developer/resource-model-source-plugins.md#script-plugin-type)** - Provide node inventory
- **[WorkflowNodeStep](/developer/step-plugins.md#script-plugin-type)** - Node step execution
- **[RemoteScriptNodeStep](/developer/step-plugins.md#script-plugin-type)** - Remote script execution

Additionally, **[UI Plugins](/developer/ui-plugins.md)** are supported with a `ui` plugin type, which is similar to a Script Plugin.

## Plugin Bootstrap Tool (Fastest Way to Start)

::: tip Recommended
Use the [Plugin Bootstrap Tool](/developer/plugin-bootstrap.md) to generate a complete script plugin project instantly:

```bash
# Generate a Node Step plugin
rundeck-plugin-bootstrap -n MyNodeStep -t script -s WorkflowNodeStep -d ~/projects

# Or generate a Node Executor
rundeck-plugin-bootstrap -n CustomExecutor -t script -s NodeExecutor -d ~/projects
```

This creates the complete directory structure, plugin.yaml, script template, and build configuration. Skip to step 4 below to customize the generated plugin.
:::

## Quick Start (Manual)

If you prefer to create the structure manually:

### 1. Create Plugin Directory Structure

```
my-plugin-1.0-plugin.zip
└── my-plugin-1.0-plugin/
    ├── plugin.yaml          # Plugin metadata
    ├── contents/            # Your scripts
    │   └── my-script.sh
    └── resources/           # Optional: i18n, icons
        ├── i18n/
        │   └── messages.properties
        └── icon.png
```

### 2. Create plugin.yaml

```yaml
name: My Plugin
version: 1.0
rundeckPluginVersion: 1.2
author: Your Name
date: 2026-02-02
url: https://example.com

providers:
  - name: my-script-step
    service: WorkflowNodeStep
    plugin-type: script
    script-interpreter: /bin/bash
    script-file: my-script.sh
    script-args: ${node.name}
    config:
      - name: message
        title: Message
        type: String
        required: true
        description: "Message to display"
```

### 3. Create Your Script

`contents/my-script.sh`:

```bash
#!/bin/bash

# Configuration properties are available as RD_CONFIG_* variables
MESSAGE="${RD_CONFIG_MESSAGE:-Hello}"

# Node context is available as RD_NODE_* variables
NODE_NAME="${RD_NODE_NAME}"

echo "Running on ${NODE_NAME}: ${MESSAGE}"

# Exit 0 for success
exit 0
```

### 4. Package and Deploy

```bash
# Create the zip file
zip -r my-plugin-1.0-plugin.zip my-plugin-1.0-plugin/

# Copy to Rundeck plugin directory
cp my-plugin-1.0-plugin.zip $RDECK_BASE/libext/

# Restart Rundeck or use dynamic plugin loading
```

## Plugin.yaml Structure

The `plugin.yaml` file defines the metadata for your plugin.

### Required Metadata

```yaml
name: plugin name              # Display name for the plugin
version: plugin version        # Version number (e.g., 1.0, 2.1.3)
rundeckPluginVersion: 1.2      # Rundeck Plugin API version
providers:                     # List of provider definitions
  - name: provider-name
    service: ServiceName
    plugin-type: script
    script-file: script.sh
```

### Optional Metadata

```yaml
author: author name           # Plugin author
date: 2026-02-02             # Release date (ISO8601 format)
url: https://example.com     # Website URL
```

### Plugin Version Changes

The value of `rundeckPluginVersion` defines feature availability:

| Version | Features |
|---------|----------|
| `1.2` | Allows use of [Plugin Localization](/developer/plugin-properties.md#plugin-localization) with message resources and [Plugin Icons](/developer/plugin-properties.md#plugin-icons) |
| `1.1` | Uses a default of `true` for `mergeEnvironment` |
| `1.0` | First release, uses a default of `false` for `mergeEnvironment` |

## Provider Configuration

Each provider in the `providers` list defines a specific plugin implementation.

### Required Provider Entries

```yaml
providers:
  - name: my-provider          # Provider name (must be unique)
    service: WorkflowNodeStep  # Service type (see below)
    plugin-type: script        # Must be 'script' (or 'ui' for UI plugins)
    script-file: script.sh     # Filename relative to contents/ directory
```

### Service Types

| Service | Description |
|---------|-------------|
| `NodeExecutor` | Execute commands on nodes |
| `FileCopier` | Copy files to nodes |
| `ResourceModelSource` | Provide node inventory data |
| `WorkflowNodeStep` | Execute workflow node steps |
| `RemoteScriptNodeStep` | Execute scripts remotely on nodes |

**Additional requirement for ResourceModelSource:**

```yaml
service: ResourceModelSource
resource-format: resourcexml  # Or: resourceyaml, resourcejson
```

Must be one of the supported [Resource Model Document Formats](/manual/projects/resource-model-sources/builtin.md#resource-model-document-formats).

### Optional Provider Entries

```yaml
script-interpreter: /bin/bash           # Command to execute the script
script-args: ${node.name} ${job.id}    # Arguments to pass to script
interpreter-args-quoted: false          # How to pass args (see below)
mergeEnvironment: true                  # Merge server env variables
plugin-meta:                            # Provider metadata (icons, etc.)
  faicon: check-circle
config:                                 # Custom configuration properties
  - name: property1
    # ... property definition
```

#### Script Interpreter

Defines how to execute your script:

```yaml
# Execute directly (script must be executable)
script-file: script.sh

# Use specific interpreter
script-interpreter: /bin/bash
script-file: script.sh

# Use interpreter with arguments
script-interpreter: /usr/bin/python3 -u
script-file: script.py
```

#### Script Arguments

Arguments can contain [context variable references](/manual/jobs/job-variables.md):

```yaml
script-args: ${node.name} ${job.id} ${option.environment}
```

#### Interpreter Args Quoting

Controls how file and args are passed to the interpreter:

```yaml
interpreter-args-quoted: false  # Default
# Executes: ${interpreter} ${file} ${arg1} ${arg2}

interpreter-args-quoted: true
# Executes: ${interpreter} "${file} ${arg1} ${arg2}..."
```

#### Remote Script Options

For `RemoteScriptNodeStep` only:

```yaml
use-original-extension: true           # Keep original file extension
script-file-extension: .sh             # Or specify a different extension
```

#### Environment Merging

```yaml
mergeEnvironment: true   # Default for rundeckPluginVersion 1.1+
```

- `true`: Server environment variables are merged with context variables
- `false`: Only context environment variables are provided to the script

## Plugin Properties

Custom configuration properties allow users to configure your plugin's behavior.

### Property Types

| Type | Description | Example Values |
|------|-------------|----------------|
| `String` | Text value | "Hello World" |
| `Boolean` | True/false value | "true", "false" |
| `Integer` | Whole number | 42, -10 |
| `Long` | Large whole number | 9223372036854775807 |
| `Select` | Must be one of a set of values | (from values list) |
| `FreeSelect` | May be one of a set of values | (from values list or custom) |
| `Options` | Multiple values from a set | (joined with commas) |

### Property Definition

```yaml
config:
  - name: property_name          # Property identifier (use lowercase, underscores)
    title: Display Name          # Shown in GUI
    type: String                 # Property type
    required: false              # Is value required?
    default: default value       # Default value
    description: Help text       # Description for users
    scope: Instance              # Resolution scope
    renderingOptions:            # Display options
      displayType: SINGLE_LINE
```

### Property Attributes

| Attribute | Required | Description |
|-----------|----------|-------------|
| `name` | Yes | Property identifier (use lowercase_with_underscores) |
| `type` | Yes | One of: String, Boolean, Integer, Long, Select, FreeSelect, Options |
| `title` | No | Display name in GUI |
| `description` | No | Help text shown to users |
| `required` | No | If true, value must be provided (default: false) |
| `default` | No | Default value to use |
| `values` | For Select types | Comma-separated list of allowed values |
| `scope` | No | Resolution scope. **The default when omitted depends on the service type** — `WorkflowNodeStep` and `RemoteScriptNodeStep` default to `InstanceOnly` (no fallback to Project/Framework config), while `NodeExecutor`, `FileCopier`, and `ResourceModelSource` default to `Instance`. Always set `scope: Instance` explicitly if the property should be configurable above the individual job/step level. See [Default Scope When `scope` Is Omitted](/developer/plugin-properties.md#default-scope-when-scope-is-omitted) |
| `renderingOptions` | No | Map of rendering options. See [Property Rendering Options](/developer/plugin-properties.md#property-rendering-options) |

### Example Properties

**Simple string property:**

```yaml
- name: api_endpoint
  title: API Endpoint
  type: String
  required: true
  default: https://api.example.com
  description: The API endpoint URL
```

**Select dropdown:**

```yaml
- name: environment
  title: Environment
  type: Select
  values: dev,staging,production
  default: dev
  description: Target environment
```

**Free select with suggestions:**

```yaml
- name: region
  title: Region
  type: FreeSelect
  values: us-east-1,us-west-2,eu-west-1
  description: AWS region (or enter custom)
```

**Password field:**

```yaml
- name: password
  title: Password
  type: String
  required: true
  renderingOptions:
    displayType: PASSWORD
    selectionAccessor: STORAGE_PATH
    valueConversion: STORAGE_PATH_AUTOMATIC_READ
```

**Multi-line code editor:**

```yaml
- name: script_content
  title: Script Content
  type: String
  renderingOptions:
    displayType: CODE
    codeSyntaxMode: python
    codeSyntaxSelectable: true
```

For complete property documentation, see [Plugin Properties Reference](/developer/plugin-properties.md).

## Script Execution

### How Scripts Are Invoked

When your provider is used, the script is executed with this pattern:

```bash
[interpreter] [filename] [args...]
```

If no interpreter is specified, the script file is executed directly (must include `#!` line and be executable).

### Environment Variables

All context properties are provided as environment variables in uppercase with this format:

```
RD_[KEY]_[NAME]
```

**Examples:**
- `${node.name}` becomes `$RD_NODE_NAME`
- `${node.hostname}` becomes `$RD_NODE_HOSTNAME`
- `${job.id}` becomes `$RD_JOB_ID`
- `${option.environment}` becomes `$RD_OPTION_ENVIRONMENT`
- `${exec.command}` becomes `$RD_EXEC_COMMAND`

Any characters not valid as Bash shell variable characters are replaced with underscore `_`.

### Configuration Properties as Variables

Plugin configuration properties are available as `RD_CONFIG_*` variables:

```yaml
config:
  - name: my_property
    type: String
```

Becomes available as: `$RD_CONFIG_MY_PROPERTY`

### Service-Specific Context Properties

Different services provide additional context properties:

**NodeExecutor:**
- `${exec.command}` - The command to execute
- `$RD_EXEC_COMMAND` - Environment variable

**FileCopier:**
- `${file-copy.file}` - Local path to file to copy
- `${file-copy.destination}` - Remote destination path
- `$RD_FILE_COPY_FILE` and `$RD_FILE_COPY_DESTINATION`

**ResourceModelSource:**
- `${config.KEY}` - Each configuration property KEY

**All Script Plugins:**
- `${rundeck.base}` / `$RD_RUNDECK_BASE` - Rundeck installation directory
- `${rundeck.project}` / `$RD_RUNDECK_PROJECT` - Project name
- `${plugin.base}` / `$RD_PLUGIN_BASE` - Plugin contents directory
- `${plugin.file}` / `$RD_PLUGIN_FILE` - Plugin file path
- `${plugin.scriptfile}` / `$RD_PLUGIN_SCRIPTFILE` - Script file path
- `${plugin.vardir}` / `$RD_PLUGIN_VARDIR` - Plugin cache directory (project-specific)
- `${plugin.tmpdir}` / `$RD_PLUGIN_TMPDIR` - Temp directory for plugin

### Private Context Variables

[Secure Remote Authentication Options](/manual/jobs/job-options.md#secure-options) are available via the Private Data Context as environment variables:

```yaml
# Job defines a secure option named 'password'
```

Available in NodeExecutor scripts as:
- `${option.password}` → `$RD_PRIVATE_PASSWORD`

## Script Requirements

### Exit Code

- **Exit 0** = Success
- **Any other exit code** = Failure

```bash
#!/bin/bash

if [ success ]; then
    exit 0
else
    exit 1
fi
```

### Output Handling

**NodeExecutor:**
- All output to `STDOUT` and `STDERR` is captured for the job's log output

**FileCopier:**
- **First line of `STDOUT`** MUST be the filepath of the copied file on the target node
- Other `STDOUT` output is ignored
- All `STDERR` output is captured for the job's log

```bash
#!/bin/bash
# FileCopier example
echo "/tmp/copied-file.txt"  # This is the required output
echo "Copy successful" >&2   # Additional info to stderr
exit 0
```

**ResourceModelSource:**
- All `STDOUT` output is captured and passed to a `ResourceFormatParser` for the specified `resource-format` to create Node definitions
- Must output valid resource model data in the specified format (XML, YAML, or JSON)

## Complete Example

Here's a complete example of a simple monitoring plugin:

**plugin.yaml:**

```yaml
name: Server Monitor
version: 1.0
rundeckPluginVersion: 1.2
author: Ops Team
date: 2026-02-02
url: https://internal.example.com/docs/monitor-plugin

providers:
  - name: check-server-health
    service: WorkflowNodeStep
    plugin-type: script
    script-interpreter: /bin/bash
    script-file: check-health.sh
    plugin-meta:
      faicon: heartbeat
    config:
      - name: threshold
        title: CPU Threshold
        type: Integer
        default: "80"
        required: true
        description: "CPU usage threshold percentage"
        renderingOptions:
          groupName: Thresholds
      
      - name: memory_threshold
        title: Memory Threshold
        type: Integer
        default: "90"
        required: true
        description: "Memory usage threshold percentage"
        renderingOptions:
          groupName: Thresholds
      
      - name: alert_email
        title: Alert Email
        type: String
        required: false
        description: "Email address for alerts"
        renderingOptions:
          grouping: secondary
          groupName: Notifications
```

**contents/check-health.sh:**

```bash
#!/bin/bash
set -euo pipefail

# Get configuration
CPU_THRESHOLD="${RD_CONFIG_THRESHOLD:-80}"
MEM_THRESHOLD="${RD_CONFIG_MEMORY_THRESHOLD:-90}"
ALERT_EMAIL="${RD_CONFIG_ALERT_EMAIL:-}"

# Get node context
NODE_NAME="${RD_NODE_NAME}"
NODE_HOSTNAME="${RD_NODE_HOSTNAME}"

echo "Checking health on ${NODE_NAME} (${NODE_HOSTNAME})"

# Check CPU usage
CPU_USAGE=$(top -bn1 | grep "Cpu(s)" | sed "s/.*, *\([0-9.]*\)%* id.*/\1/" | awk '{print 100 - $1}')
echo "CPU Usage: ${CPU_USAGE}%"

if (( $(echo "$CPU_USAGE > $CPU_THRESHOLD" | bc -l) )); then
    echo "WARNING: CPU usage ${CPU_USAGE}% exceeds threshold ${CPU_THRESHOLD}%"
    
    if [ -n "$ALERT_EMAIL" ]; then
        echo "Alert email would be sent to: $ALERT_EMAIL"
    fi
    exit 1
fi

# Check memory usage
MEM_USAGE=$(free | grep Mem | awk '{print ($3/$2) * 100.0}')
echo "Memory Usage: ${MEM_USAGE}%"

if (( $(echo "$MEM_USAGE > $MEM_THRESHOLD" | bc -l) )); then
    echo "WARNING: Memory usage ${MEM_USAGE}% exceeds threshold ${MEM_THRESHOLD}%"
    exit 1
fi

echo "Health check passed"
exit 0
```

**resources/i18n/messages.properties:**

```properties
plugin.title=Server Health Monitor
plugin.description=Monitors server CPU and memory usage
property.threshold.title=CPU Threshold (%)
property.threshold.description=Alert if CPU usage exceeds this percentage
property.memory_threshold.title=Memory Threshold (%)
property.alert_email.title=Alert Email Address
```

## Best Practices

### Error Handling

Always use proper error handling:

```bash
#!/bin/bash
set -euo pipefail  # Exit on error, undefined variable, or pipe failure

# Function for error messages
error_exit() {
    echo "ERROR: $1" >&2
    exit 1
}

# Use the function
[ -f "$CONFIG_FILE" ] || error_exit "Config file not found: $CONFIG_FILE"
```

### Logging

Provide clear, informative output:

```bash
# Good logging
echo "Starting process on node ${RD_NODE_NAME}"
echo "Configuration: endpoint=${RD_CONFIG_ENDPOINT}"
echo "Processing 1234 records..."
echo "Complete. Processed 1234 records in 5.2 seconds"

# Avoid
echo "Starting..."
echo "Done"
```

### Variable Safety

Always quote variables and provide defaults:

```bash
# Good
ENDPOINT="${RD_CONFIG_ENDPOINT:-https://default.example.com}"
MESSAGE="${1:-No message provided}"

# Risky
ENDPOINT=$RD_CONFIG_ENDPOINT  # Breaks if unset or contains spaces
```

### Configuration Validation

Validate configuration at the start:

```bash
#!/bin/bash
set -euo pipefail

# Validate required configuration
if [ -z "${RD_CONFIG_API_KEY:-}" ]; then
    echo "ERROR: API Key is required" >&2
    exit 1
fi

if [ -z "${RD_CONFIG_ENDPOINT:-}" ]; then
    echo "ERROR: API Endpoint is required" >&2
    exit 1
fi

# Continue with script...
```

### File Operations

Use the plugin directories:

```bash
# Cache data (persists across runs, project-specific)
CACHE_FILE="${RD_PLUGIN_VARDIR}/cache.json"

# Temporary data (cleaned up)
TEMP_FILE="${RD_PLUGIN_TMPDIR}/temp-$$.txt"
```

## Debugging

### Enable Debug Output

```bash
#!/bin/bash
set -x  # Print commands as they execute

# Or use conditional debugging
if [ "${RD_JOB_LOGLEVEL}" = "DEBUG" ]; then
    set -x
fi
```

### Test Locally

Test your script outside Rundeck first:

```bash
# Set up test environment
export RD_NODE_NAME=test-node
export RD_CONFIG_ENDPOINT=https://test.example.com
export RD_CONFIG_TIMEOUT=30

# Run your script
./contents/my-script.sh
```

### Common Issues

**Script not executing:**
- Check file permissions (`chmod +x`)
- Verify `#!` line is correct
- Check `script-interpreter` path

**Environment variables not available:**
- Verify property names match (case-sensitive after RD_CONFIG_)
- Check `mergeEnvironment` setting
- Ensure context variables are available in your plugin type

**Output not captured:**
- Ensure output goes to `STDOUT` or `STDERR`
- Check exit code (must be 0 for success)
- For FileCopier, first line must be the file path

## Localization and Icons

Script plugins support localization and custom icons. See:

- [Plugin Localization](/developer/plugin-properties.md#plugin-localization) - Translate plugin UI text
- [Plugin Icons](/developer/plugin-properties.md#plugin-icons) - Add custom icons

Quick example in `plugin.yaml`:

```yaml
rundeckPluginVersion: 1.2  # Required for i18n and icons
providers:
  - name: my-plugin
    # ... other config
    plugin-meta:
      faicon: check-circle  # Font Awesome icon
```

## Related Documentation

- [Plugin Properties Reference](/developer/plugin-properties.md) - Complete property documentation
- [NodeExecutor Script Plugins](/developer/node-executor-plugins.md#script-plugin-type)
- [FileCopier Script Plugins](/developer/file-copier-plugins.md#script-plugin-type)
- [ResourceModelSource Script Plugins](/developer/resource-model-source-plugins.md#script-plugin-type)
- [WorkflowStep Script Plugins](/developer/step-plugins.md#script-plugin-type)
- [UI Plugins](/developer/ui-plugins.md) - Similar structure for UI plugins
- [Job Variables Reference](/manual/jobs/job-variables.md) - Available context variables
