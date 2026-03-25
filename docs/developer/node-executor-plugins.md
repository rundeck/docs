# Node Executor Plugin

## Overview

A Node Executor plugin defines **how Rundeck connects to and executes commands on nodes**. It provides the transport mechanism and connection logic for remote (or local) command execution.

Node Executors are the foundation of Rundeck's remote execution capabilities. When Rundeck needs to run a command on a node, it uses the configured Node Executor to establish the connection, execute the command, capture output, and return results.

## What Node Executors Do

Node Executor plugins handle:

- **Connection Management** - Establishing connections to remote nodes (SSH, WinRM, API calls, etc.)
- **Authentication** - Handling credentials, keys, tokens, or other authentication methods
- **Command Execution** - Running the specified command on the target node
- **Output Capture** - Collecting stdout/stderr from the executed command
- **Error Handling** - Reporting success/failure and exit codes
- **Resource Cleanup** - Closing connections and cleaning up resources

## When to Create a Node Executor Plugin

Create a Node Executor plugin when you need to:

- **Integrate with a proprietary remote execution system** - Your organization uses a custom or proprietary system for remote command execution
- **Support a new transport protocol** - You need to execute commands via a protocol not already supported (e.g., a custom RPC mechanism)
- **Connect to specialized infrastructure** - You have unique infrastructure that requires custom connection logic (e.g., mainframes, embedded systems, IoT devices)
- **Wrap an existing tool** - You want to use an existing command-line tool or API for remote execution
- **Implement custom authentication** - You need authentication methods not supported by existing executors
- **Add custom connection logic** - You need special connection handling (proxies, tunneling, connection pooling)

## Examples of Node Executors

**Built-in Node Executors:**
- **SSH** - Connects via SSH protocol (default)
- **Local** - Executes commands directly on the Rundeck server
- **WinRM/PowerShell** - Connects to Windows nodes
- **AWS SSM** - Executes via AWS Systems Manager
- **AWS ECS** - Executes in ECS containers

**Custom Use Cases:**
- Execute commands via a REST API on remote systems
- Connect to network devices via Telnet or custom protocols
- Execute commands through a centralized orchestration platform
- Integrate with container orchestration systems (Kubernetes, Docker Swarm)
- Connect to legacy systems with proprietary protocols

## Node Executor vs. Other Plugin Types

**Not a Node Executor if you're:**
- ❌ Executing a specific task or workflow (use [Node Step Plugin](/developer/step-plugins.md) instead)
- ❌ Discovering or providing node inventory (use [Resource Model Source Plugin](/developer/resource-model-source-plugins.md) instead)
- ❌ Copying files to nodes (use [File Copier Plugin](/developer/file-copier-plugins.md) instead)
- ❌ Sending notifications (use [Notification Plugin](/developer/notification-plugins.md) instead)

**Use a Node Executor if you're:**
- ✅ Defining a new **way to connect** to nodes
- ✅ Implementing a new **transport mechanism**
- ✅ Providing an alternative to SSH/WinRM/etc.

## Quick Start with Plugin Bootstrap

::: tip Fastest Way to Start
Use the [Plugin Bootstrap Tool](/developer/plugin-bootstrap.md) to generate a complete Node Executor plugin:

**Java Plugin:**
```bash
rundeck-plugin-bootstrap -n CustomExecutor -t java -s NodeExecutor -d ~/projects
```

**Script Plugin:**
```bash
rundeck-plugin-bootstrap -n CustomExecutor -t script -s NodeExecutor -d ~/projects
```

This generates the complete project structure, build configuration, and template code. Then customize with your connection logic.
:::

## Java Plugin Implementation

### Interface

Your provider class must implement the [NodeExecutor]({{$javaDocBase}}/com/dtolabs/rundeck/core/execution/service/NodeExecutor.html) interface:

```java
public interface NodeExecutor {
     public NodeExecutorResult executeCommand(ExecutionContext context,
              String[] command, INodeEntry node);
}
```

**Method Parameters:**
- `context` - Execution context with access to framework, data context, and execution details
- `command` - Array of command strings to execute (e.g., `["ls", "-la", "/tmp"]`)
- `node` - The target node with attributes (hostname, username, etc.)

**Return Value:**
- `NodeExecutorResult` - Contains exit code, success/failure status, and any failure reason

### Basic Example

```java
import com.dtolabs.rundeck.core.common.INodeEntry;
import com.dtolabs.rundeck.core.execution.ExecutionContext;
import com.dtolabs.rundeck.core.execution.service.NodeExecutor;
import com.dtolabs.rundeck.core.execution.service.NodeExecutorResult;
import com.dtolabs.rundeck.core.plugins.Plugin;
import com.dtolabs.rundeck.plugins.ServiceNameConstants;
import com.dtolabs.rundeck.plugins.descriptions.*;

@Plugin(name = "my-executor", service = ServiceNameConstants.NodeExecutor)
@PluginDescription(title = "My Executor", description = "Custom node executor")
public class MyNodeExecutor implements NodeExecutor {
    
    @PluginProperty(title = "API Endpoint", required = true)
    private String apiEndpoint;
    
    @Override
    public NodeExecutorResult executeCommand(ExecutionContext context,
                                            String[] command,
                                            INodeEntry node) {
        try {
            // 1. Get node connection details
            String hostname = node.getHostname();
            String username = node.getUsername();
            
            // 2. Build command string
            String commandStr = String.join(" ", command);
            
            // 3. Connect and execute via your mechanism
            int exitCode = executeViaCustomProtocol(
                hostname, username, commandStr, apiEndpoint
            );
            
            // 4. Return result
            return NodeExecutorResultImpl.createSuccess(node);
            
        } catch (Exception e) {
            return NodeExecutorResultImpl.createFailure(
                NodeStepFailureReason.ConnectionFailure,
                "Failed to execute: " + e.getMessage(),
                node
            );
        }
    }
    
    private int executeViaCustomProtocol(String host, String user, 
                                        String command, String endpoint) {
        // Your custom execution logic here
        return 0;
    }
}
```

### Configuration Properties

See [Java Plugin Development - Plugin Properties](/developer/java-plugin-development.md#plugin-properties)
to learn how to define configuration properties for your plugin using annotations.

**Common properties for Node Executors:**
- Connection endpoints or URLs
- Authentication credentials (use Key Storage references)
- Timeout values
- Retry configuration
- Protocol-specific settings

## Script Plugin Implementation

Script-based Node Executors allow you to wrap existing command-line tools or scripts as Rundeck node executors.

See [Script Plugin Development](/developer/script-plugin-development.md) for the basics of developing script-based plugins.

### Use Cases for Script Node Executors

- **Wrap existing tools** - Use an existing CLI tool for remote execution
- **Custom protocols** - Implement connection via custom protocols
- **Legacy system integration** - Connect to systems with specialized requirements
- **Quick prototyping** - Test executor logic before building a Java plugin

### Configuration Example

**plugin.yaml:**

```yaml
name: Custom Executor
version: 1.0
rundeckPluginVersion: 1.2
author: Your Name
date: 2026-02-03

providers:
  - name: custom-executor
    service: NodeExecutor
    plugin-type: script
    script-interpreter: /bin/bash
    script-file: executor.sh
    script-args: ${node.hostname} ${node.username} ${exec.command}
    config:
      - name: endpoint
        title: API Endpoint
        type: String
        required: true
```

### Script Implementation

**contents/executor.sh:**

```bash
#!/bin/bash

# Arguments passed from plugin.yaml
HOSTNAME=$1
USERNAME=$2
COMMAND=$3

# Configuration properties available as RD_CONFIG_*
ENDPOINT="${RD_CONFIG_ENDPOINT}"

# Execute command via your custom mechanism
# This is where you implement your connection logic
echo "Executing on ${HOSTNAME} as ${USERNAME}: ${COMMAND}"

# Example: Call a REST API to execute the command
curl -X POST "${ENDPOINT}/execute" \
  -H "Content-Type: application/json" \
  -d "{\"host\":\"${HOSTNAME}\",\"user\":\"${USERNAME}\",\"command\":\"${COMMAND}\"}"

# Exit with appropriate code
exit $?
```

### Available Context Variables

Script Node Executors have access to special context variables:

**`${exec.command}`**
- The command to execute on the node
- Passed as a single string (e.g., "ls -la /tmp")

**Node attributes:**
- `${node.hostname}` - Target node hostname
- `${node.username}` - Username for connection
- `${node.*}` - Any other node attributes

**Example script-args:**
```yaml
script-args: ${node.hostname} ${node.username} "${exec.command}"
```

### Script Requirements

#### Exit Code

- **0** - Success (command executed successfully)
- **Non-zero** - Failure (command failed or connection error)

The exit code determines whether Rundeck considers the execution successful.

#### Output Handling

- **STDOUT** - Captured as execution output (shown in Rundeck logs)
- **STDERR** - Captured as error output (shown in Rundeck logs)

All output is streamed to the Rundeck execution log in real-time.

### Best Practices

1. **Error Handling** - Always check for errors and exit with appropriate codes
2. **Logging** - Write informative messages to help with troubleshooting
3. **Quoting** - Properly quote command arguments to handle spaces
4. **Timeouts** - Implement timeouts to prevent hanging executions
5. **Authentication** - Use secure credential storage (Key Storage)

## Related Documentation

- [Node Execution (User Guide)](/manual/projects/node-execution/) - Understanding node executors
- [File Copier Plugins](/developer/file-copier-plugins.md) - Companion plugin for file transfer
- [Java Plugin Development](/developer/java-plugin-development.md) - For more complex executors
- [Script Plugin Development](/developer/script-plugin-development.md) - General script plugin guide
