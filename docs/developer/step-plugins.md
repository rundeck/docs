# Job Step Plugins

## Overview

Step plugins are the most commonly created plugin type. They allow you to add custom steps to job workflows, extending Rundeck's automation capabilities.

There are two fundamental types of step plugins:

1. **[Node Step Plugins](#node-step-plugin)** - Execute on each target node in parallel
2. **[Workflow Step Plugins](#workflow-step-plugin)** - Execute once per job at the workflow level

## Understanding the Difference

### Node Step Plugin

**Executes:** Once per target node (parallel execution across nodes)

**Use When:**
- You need to perform an action on each individual node
- The operation is node-specific (requires node attributes)
- You want parallel execution across multiple nodes
- Examples: Install software, check service status, update configuration files

**Key Characteristics:**
- Receives node context (hostname, attributes, etc.)
- Executes multiple times (once per selected node)
- Can run in parallel across nodes
- Stores output in **Node Scope** variables
- Ideal for infrastructure automation tasks

**Common Examples:**
- Execute remote commands or scripts
- Deploy files to nodes
- Check node health status
- Install or update packages
- Configure node-specific settings

### Workflow Step Plugin

**Executes:** Once per job (single execution at workflow level)

**Use When:**
- You need to perform an orchestration task once
- The operation is not node-specific
- You want to coordinate across multiple nodes as a group
- Examples: Send notifications, call APIs, update tickets, create reports

**Key Characteristics:**
- No individual node context (but can access the node set)
- Executes only once regardless of node count
- Always runs sequentially in workflow order
- Stores output in **Global Scope** variables
- Ideal for orchestration and integration tasks

**Common Examples:**
- Call external APIs
- Send notifications
- Create tickets in JIRA or ServiceNow
- Generate reports
- Reference other jobs
- Aggregate data from multiple nodes

## Quick Decision Guide

```
Need to execute on EACH node? 
  → Use Node Step Plugin
  
Need to execute ONCE for the entire job?
  → Use Workflow Step Plugin

Need to coordinate/aggregate across ALL nodes?
  → Use Workflow Step Plugin

Need to access node-specific attributes (hostname, tags)?
  → Use Node Step Plugin

Need to call external APIs or services?
  → Use Workflow Step Plugin (usually)

Need to execute remote commands/scripts?
  → Use Node Step Plugin (specifically RemoteScriptNodeStep)
```

## Comparison Table

| Feature | Node Step | Workflow Step |
|---------|-----------|---------------|
| **Execution** | Once per node | Once per job |
| **Node Context** | Yes, receives individual node | No, but can access node set |
| **Parallelism** | Can run parallel across nodes | Sequential only |
| **Variable Scope** | Node Scope | Global Scope |
| **Use Case** | Node operations | Orchestration/Integration |
| **Examples** | Commands, scripts, configs | APIs, notifications, tickets |

## Quick Start with Plugin Bootstrap

::: tip Fastest Way to Start
Use the [Plugin Bootstrap Tool](/developer/plugin-bootstrap.md) to generate a complete step plugin project:

**For Workflow Step (Java):**
```bash
rundeck-plugin-bootstrap -n MyWorkflowStep -t java -s WorkflowStep -d ~/projects
```

**For Node Step (Java):**
```bash
rundeck-plugin-bootstrap -n MyNodeStep -t java -s WorkflowNodeStep -d ~/projects
```

**For Node Step (Script):**
```bash
rundeck-plugin-bootstrap -n MyScriptStep -t script -s WorkflowNodeStep -d ~/projects
```

This generates everything you need: project structure, build files, template code, and tests. Then customize the generated plugin with your logic.
:::

## Plugin Implementation Types

You can implement step plugins in three ways:

1. **[Java Plugins](/developer/java-plugin-development.md)** - Most powerful and flexible
2. **[Script Plugins](/developer/script-plugin-development.md)** - Easiest to get started
3. **[Groovy Plugins](/developer/groovy-plugin-development.md)** - Currently not supported for step plugins

## Node Step Plugin

Node Step plugins execute on each target node. There are two Java interfaces you can implement:

### WorkflowNodeStep (Most Common)

Execute custom logic on each node locally from the Rundeck server.

**Service Name:** `WorkflowNodeStep`

**Use When:**
- You need to interact with external APIs per node
- You want to perform checks or validations
- You need complex logic before/after node operations

**See:** [WorkflowNodeStep Implementation](#workflownodestep-plugin) below

### RemoteScriptNodeStep (For Scripts)

Generate a script/command that Rundeck executes remotely on each node.

**Service Name:** `RemoteScriptNodeStep`

**Use When:**
- You want to execute commands or scripts on remote nodes
- You need the script to run in the node's environment
- You want to leverage Rundeck's remote execution (SSH, WinRM, etc.)

**See:** [RemoteScriptNodeStep Implementation](#remotescriptnodestep-plugin) below

## Workflow Step Plugin

Workflow Step plugins execute once at the workflow level.

**Service Name:** `WorkflowStep`

**Use When:**
- You need to call external APIs once
- You want to send notifications
- You need to orchestrate across all nodes
- You're integrating with ticketing systems

**See:** [WorkflowStep Implementation](#workflowstep-plugin) below

---

## Java Plugin Implementation

### Setup

Refer to the [Java Plugin Development](/developer/java-plugin-development.md) guide for:
- Adding Rundeck dependencies to your project
- Packaging as a JAR
- Using `@Plugin` annotations

Your `service` name should be one of:
- `WorkflowStep` - for Workflow Step plugins
- `WorkflowNodeStep` - for Node Step plugins
- `RemoteScriptNodeStep` - for Remote Script plugins

See [ServiceNameConstants]({{$javaDocBase}}/com/dtolabs/rundeck/plugins/ServiceNameConstants.html) for all available service names.

### Plugin Properties

See [Plugin Development - Java Plugins - Plugin Properties](/developer/java-plugin-development.md#plugin-properties)
to learn how to create configuration properties for your plugin using Java annotations.

### WorkflowStep Plugin

**Service Name:** `WorkflowStep`

**Interface:** [StepPlugin]({{$javaDocBase}}/com/dtolabs/rundeck/plugins/step/StepPlugin.html)

**Method to Implement:**

```java
/**
  * Execute the step.
  *
  * @param context       the plugin step context
  * @param configuration Any configuration property values not otherwise applied to the plugin
  *
  * @throws StepException if an error occurs, the failureReason should indicate the reason
  */
public void executeStep(final PluginStepContext context, final Map<String, Object> configuration)
    throws StepException;
```

**Complete Example:**

```java
import com.dtolabs.rundeck.core.plugins.Plugin;
import com.dtolabs.rundeck.plugins.ServiceNameConstants;
import com.dtolabs.rundeck.plugins.step.PluginStepContext;
import com.dtolabs.rundeck.plugins.step.StepException;
import com.dtolabs.rundeck.plugins.step.StepPlugin;
import com.dtolabs.rundeck.plugins.descriptions.*;

@Plugin(name = "ticket-creator", service = ServiceNameConstants.WorkflowStep)
@PluginDescription(title = "Ticket Creator", description = "Creates a ticket in external system")
public class TicketCreatorPlugin implements StepPlugin {
    
    @PluginProperty(title = "API Endpoint", required = true)
    private String apiEndpoint;
    
    @PluginProperty(title = "Summary", required = true)
    private String summary;
    
    @Override
    public void executeStep(PluginStepContext context, Map<String, Object> configuration) 
            throws StepException {
        
        context.getLogger().log(2, "Creating ticket: " + summary);
        
        try {
            // Call external API
            String ticketId = createTicket(apiEndpoint, summary);
            
            context.getLogger().log(2, "Ticket created: " + ticketId);
            
            // Store result in data context (Global Scope)
            context.getExecutionContext().getDataContext()
                .put("ticket", "id", ticketId);
                
        } catch (Exception e) {
            throw new StepException("Failed to create ticket: " + e.getMessage(), e, 
                StepFailureReason.PluginFailed);
        }
    }
    
    private String createTicket(String endpoint, String summary) {
        // Implementation here
        return "TICKET-123";
    }
}
```

Your implementation should throw a [StepException]({{$javaDocBase}}/com/dtolabs/rundeck/core/execution/workflow/steps/StepException.html) if an error occurs.

### WorkflowNodeStep Plugin

**Service Name:** `WorkflowNodeStep`

**Interface:** [NodeStepPlugin]({{$javaDocBase}}/com/dtolabs/rundeck/plugins/step/NodeStepPlugin.html)

**Method to Implement:**

```java
/**
 * Execute the plugin step logic for the given node.
 *
 * @param context       the step context
 * @param configuration Any configuration property values not otherwise applied to the plugin
 * @param entry         the Node
 *
 * @throws NodeStepException if an error occurs
 */
public void executeNodeStep(final PluginStepContext context,
                               final Map<String, Object> configuration,
                               final INodeEntry entry)
    throws NodeStepException;
```

**Complete Example:**

```java
import com.dtolabs.rundeck.core.common.INodeEntry;
import com.dtolabs.rundeck.core.execution.workflow.steps.node.NodeStepException;
import com.dtolabs.rundeck.core.plugins.Plugin;
import com.dtolabs.rundeck.plugins.ServiceNameConstants;
import com.dtolabs.rundeck.plugins.step.NodeStepPlugin;
import com.dtolabs.rundeck.plugins.step.PluginStepContext;
import com.dtolabs.rundeck.plugins.descriptions.*;

@Plugin(name = "health-checker", service = ServiceNameConstants.WorkflowNodeStep)
@PluginDescription(title = "Health Checker", description = "Checks node health status")
public class HealthCheckerPlugin implements NodeStepPlugin {
    
    @PluginProperty(title = "Endpoint Port", defaultValue = "8080")
    private int port;
    
    @PluginProperty(title = "Timeout (seconds)", defaultValue = "30")
    private int timeout;
    
    @Override
    public void executeNodeStep(PluginStepContext context,
                               Map<String, Object> configuration,
                               INodeEntry node) throws NodeStepException {
        
        String hostname = node.getHostname();
        context.getLogger().log(2, "Checking health of: " + hostname);
        
        try {
            // Perform health check using node attributes
            boolean healthy = checkHealth(hostname, port, timeout);
            
            if (!healthy) {
                throw new NodeStepException(
                    "Node health check failed for " + hostname,
                    NodeStepFailureReason.PluginFailed,
                    node.getNodename()
                );
            }
            
            context.getLogger().log(2, hostname + " is healthy");
            
            // Store result in data context (Node Scope)
            context.getExecutionContext().getDataContext().merge(
                ContextView.node(node.getNodename()),
                DataContextUtils.context("healthcheck", 
                    Collections.singletonMap("status", "healthy"))
            );
            
        } catch (Exception e) {
            throw new NodeStepException(
                "Failed to check health: " + e.getMessage(),
                e,
                NodeStepFailureReason.IOFailure,
                node.getNodename()
            );
        }
    }
    
    private boolean checkHealth(String hostname, int port, int timeout) {
        // Implementation here
        return true;
    }
}
```

Your implementation should throw a [NodeStepException]({{$javaDocBase}}/com/dtolabs/rundeck/core/execution/workflow/steps/node/NodeStepException.html) if an error occurs.

### RemoteScriptNodeStep Plugin

**Service Name:** `RemoteScriptNodeStep`

**Interface:** [RemoteScriptNodeStepPlugin]({{$javaDocBase}}/com/dtolabs/rundeck/plugins/step/RemoteScriptNodeStepPlugin.html)

RemoteScriptNodeStep plugins are a specialized type of Node Step that generate scripts or commands to be executed remotely on nodes. Rundeck handles the remote execution via SSH, WinRM, or other configured node executors.

**Use When:**
- You want to execute shell commands on remote nodes
- You need to run scripts in the node's environment
- You want Rundeck to handle the remote execution mechanism

**Method to Implement:**

```java
/**
 * Generate a full script or command string to execute on the remote node
 *
 * @param context       the step context
 * @param configuration Any configuration property values not otherwise applied to the plugin
 * @param entry         the Node
 *
 * @throws NodeStepException if an error occurs
 */
public GeneratedScript generateScript(final PluginStepContext context,
                                      final Map<String, Object> configuration,
                                      final INodeEntry entry)
    throws NodeStepException;
```

**Return Type:**

Your implementation should return a [GeneratedScript]({{$javaDocBase}}/com/dtolabs/rundeck/plugins/step/GeneratedScript.html) object. Use the [GeneratedScriptBuilder]({{$javaDocBase}}/com/dtolabs/rundeck/plugins/step/GeneratedScriptBuilder.html) factory methods:

```java
/**
 * Create a script
 *
 * @param script the script text
 * @param args   the arguments for the script
 */
public static GeneratedScript script(final String script, final String[] args);

/**
 * Create a command
 *
 * @param command the command and arguments
 */
public static GeneratedScript command(final String... command);
```

**Complete Example:**

```java
import com.dtolabs.rundeck.core.common.INodeEntry;
import com.dtolabs.rundeck.core.execution.workflow.steps.node.NodeStepException;
import com.dtolabs.rundeck.core.plugins.Plugin;
import com.dtolabs.rundeck.plugins.ServiceNameConstants;
import com.dtolabs.rundeck.plugins.step.GeneratedScript;
import com.dtolabs.rundeck.plugins.step.GeneratedScriptBuilder;
import com.dtolabs.rundeck.plugins.step.PluginStepContext;
import com.dtolabs.rundeck.plugins.step.RemoteScriptNodeStepPlugin;
import com.dtolabs.rundeck.plugins.descriptions.*;

@Plugin(name = "service-manager", service = ServiceNameConstants.RemoteScriptNodeStep)
@PluginDescription(title = "Service Manager", 
                  description = "Start, stop, or restart services on remote nodes")
public class ServiceManagerPlugin implements RemoteScriptNodeStepPlugin {
    
    @PluginProperty(title = "Service Name", required = true)
    private String serviceName;
    
    @PluginProperty(title = "Action", required = true)
    @SelectValues(values = {"start", "stop", "restart", "status"})
    private String action;
    
    @Override
    public GeneratedScript generateScript(PluginStepContext context,
                                         Map<String, Object> configuration,
                                         INodeEntry node) throws NodeStepException {
        
        context.getLogger().log(2, 
            String.format("Generating %s command for service %s on %s", 
                action, serviceName, node.getNodename()));
        
        // Determine OS type from node attributes
        String osFamily = node.getOsFamily();
        
        if ("windows".equalsIgnoreCase(osFamily)) {
            // Generate Windows PowerShell command
            return GeneratedScriptBuilder.command(
                "powershell.exe",
                "-Command",
                action + "-Service",
                "-Name",
                serviceName
            );
        } else {
            // Generate Linux systemctl command
            return GeneratedScriptBuilder.command(
                "systemctl",
                action,
                serviceName
            );
        }
    }
}
```

**Script Example:**

```java
@Override
public GeneratedScript generateScript(PluginStepContext context,
                                     Map<String, Object> configuration,
                                     INodeEntry node) throws NodeStepException {
    
    // Generate a script to be executed
    String script = "#!/bin/bash\n" +
                   "echo 'Checking disk space...'\n" +
                   "df -h\n" +
                   "echo 'Checking memory...'\n" +
                   "free -m\n";
    
    return GeneratedScriptBuilder.script(script, null);
}
```

### Step context information

Each plugin is passed a [PluginStepContext]({{$javaDocBase}}/com/dtolabs/rundeck/plugins/step/PluginStepContext.html) instance that provides access to
details about the step and its configuration:

```java
public interface PluginStepContext {
    /**
     * Return the logger
     */
    public PluginLogger getLogger();
    /**
     * Return the project name
     */
    public String getFrameworkProject();
    /**
     * Return the data context
     */
    public Map<String, Map<String, String>> getDataContext();

    /**
     * Return the nodes used for this execution
     */
    public INodeSet getNodes();
    /**
     * Return the step number within the current workflow
     */
    public int getStepNumber();
    /**
     * Return the context path of step numbers within the larger workflow context.
     */
    public List<Integer> getStepContext();
}
```

### Example code

See the source directory `examples/example-java-step-plugin` for
examples of all three provider types.

- On github: [example-java-step-plugin](https://github.com/rundeck/rundeck/tree/development/examples/example-java-step-plugin)

## Script Plugin Type

_Note:_ Currently these type of plugins can be implemented as script-based plugins:

- Node Steps - the plugin will execute the script _locally_ on the Rundeck server for each node
- Remote Script Node Steps - the plugin will execute the script _remotely_ on each node

See the [Script Plugin Development](/developer/script-plugin-development.md)
for the basics of developing script-based plugins for Rundeck.

Use the service name for the plugin type:

- `WorkflowNodeStep`
- `RemoteScriptNodeStep`

For configuration properties, see the [Resource Model Source Plugin - Plugin Properties](/developer/resource-model-format-plugins.md).

Two additional [provider metadata properties](/developer/plugin-properties.md#provider-metadata) are available for `RemoteScriptNodeStep` plugins:

- `use-original-extension` - (`true/false`, default `true`), whether to force the remotely
  copied script to have the same file extension as the original specified by `script-file`.
- `script-file-extension` - A file extension to use for the remotely copied script.

To define [property scopes](/developer/plugin-properties.md#property-scopes),
add a `scope` entry in the map for a configuration property:

```yaml
  config:
    - type: Integer
      name: count
      title: Count
      description: Enter the number of nodes to generate
      scope: Project
```

::: warning Default Scope
If `scope` is omitted, `WorkflowNodeStep` and `RemoteScriptNodeStep` properties default to `InstanceOnly` — the value is resolved **only** from the job/step configuration, with no fallback to Project- or System-level configuration. Explicitly set `scope: Instance` (or `Project`, if System-level fallback isn't needed) for any property that should be configurable above the individual job step. See [Default Scope When `scope` Is Omitted](/developer/plugin-properties.md#default-scope-when-scope-is-omitted).
:::
