# Plugin Developer Guide

## Overview

Rundeck plugins allow you to extend Rundeck's functionality by adding new capabilities for job execution, notifications, logging, resource discovery, and more. This guide will help you develop custom plugins to meet your specific automation needs.

**Plugin Types Available:**
- [Node Steps](/developer/step-plugins.md) - Execute actions on remote nodes
- [Workflow Steps](/developer/step-plugins.md) - Execute workflow-level orchestration
- [Node Executors](/developer/node-executor-plugins.md) - Define how to execute commands on nodes
- [File Copiers](/developer/file-copier-plugins.md) - Define how to copy files to nodes
- [Resource Model Sources](/developer/resource-model-source-plugins.md) - Provide node inventory from external systems
- [Notifications](/developer/notification-plugins.md) - Send notifications on job events
- [Log Filters](/developer/log-filter-plugins.md) - Transform or capture log output
- [Storage Plugins](/developer/storage-plugins.md) - Store key/password data in external systems
- [SCM Plugins](/developer/scm-plugins.md) - Integrate with source control systems
- [And many more...](#available-plugin-types)

## Choosing Your Plugin Development Approach

Rundeck supports three different methods for developing plugins, each with its own strengths and use cases.

### Quick Comparison

| Feature | Java Plugins | Script Plugins | Groovy Plugins |
|---------|-------------|----------------|----------------|
| **Development Language** | Java | Any scripting language | Groovy |
| **Best For** | Complex logic, performance | Quick prototypes, shell commands | Medium complexity |
| **Learning Curve** | Higher | Lower | Medium |
| **Available Plugin Types** | All types | Most types | Notification, Logging |
| **IDE Support** | Excellent | N/A | Good |
| **Distribution** | JAR file | ZIP file | ZIP file |
| **Dependencies** | Maven/Gradle | System dependencies | Groovy libraries |
| **Performance** | Best | Good | Good |

### When to Use Java Plugins

**Choose Java when you need:**
- Maximum performance and efficiency
- Complex business logic or algorithms
- Integration with Java libraries or frameworks
- Type safety and compile-time error checking
- Full access to Rundeck's internal APIs
- Professional IDE support and debugging

**Common Use Cases:**
- Complex workflow orchestration
- Integration with enterprise systems (APIs, databases)
- Custom authentication or authorization
- Performance-critical operations
- Plugins that will be widely distributed

**Get Started:** [Java Plugin Development Guide](/developer/java-plugin-development.md)

### When to Use Script Plugins

**Choose Script plugins when you:**
- Want to prototype quickly
- Already have working shell/Python/Ruby scripts
- Need simple command execution or file operations
- Want minimal setup and configuration
- Prefer not to set up a Java development environment

**Common Use Cases:**
- Wrapping existing scripts or command-line tools
- Simple file operations or system commands
- Quick automation tasks
- Prototyping before developing a Java plugin
- Environment-specific customizations

**Get Started:** [Script Plugin Development Guide](/developer/script-plugin-development.md)

### When to Use Groovy Plugins

**Choose Groovy when you need:**
- Dynamic scripting capabilities with Java ecosystem access
- Notification or logging functionality
- Balance between script flexibility and Java power
- Ability to use Java libraries without full Java setup

**Limitations:**
- Currently only supports Notification and Logging plugin types

**Get Started:** [Groovy Plugin Development Guide](/developer/groovy-plugin-development.md)

## Decision Tree

```
Need a plugin? Start here:
│
├─ Is it for Notifications or Logging only?
│  ├─ Yes → Use Groovy or Java plugins
│  └─ No → Continue...
│
├─ Do you have existing shell/Python/Ruby scripts?
│  ├─ Yes → Start with Script plugins
│  └─ No → Continue...
│
├─ Need maximum performance or complex logic?
│  ├─ Yes → Use Java plugins
│  └─ No → Continue...
│
├─ Comfortable with Java development?
│  ├─ Yes → Use Java plugins (most flexible)
│  └─ No → Use Script plugins (easiest to start)
```

## Getting Started Steps

### 1. Identify Your Plugin Type

Determine which [plugin service type](#available-plugin-types) you need to implement based on what you want to extend in Rundeck.

### 2. Choose Your Development Method

Based on your requirements, select [Java](#when-to-use-java-plugins), [Script](#when-to-use-script-plugins), or [Groovy](#when-to-use-groovy-plugins) plugins.

### 3. Set Up Your Development Environment

**For Java Plugins:**
- Install JDK 11 or later
- Set up Maven or Gradle
- Add Rundeck dependencies
- Configure your IDE

**For Script Plugins:**
- Install your scripting language runtime
- Create plugin directory structure
- Write your script
- Create plugin metadata

**For Groovy Plugins:**
- Install Groovy runtime
- Create plugin directory structure
- Write your Groovy script
- Create plugin metadata

### 4. Develop and Test

Follow the specific guide for your chosen method:
- [Java Plugin Development](/developer/java-plugin-development.md)
- [Script Plugin Development](/developer/script-plugin-development.md)
- [Groovy Plugin Development](/developer/groovy-plugin-development.md)

### 5. Package and Deploy

- **Java**: Build JAR file with proper manifest
- **Script/Groovy**: Create ZIP file with metadata
- Deploy to Rundeck's `libext` directory
- Restart Rundeck or use dynamic plugin loading (if enabled)

## Available Plugin Types

Rundeck supports many different types of plugins. Each type serves a specific purpose in the automation workflow:

### Job Execution Plugins

- **[Node Steps](/developer/step-plugins.md#node-step-plugin)** - Execute once per target node
- **[Workflow Steps](/developer/step-plugins.md#workflow-step-plugin)** - Execute once per job invocation
- **[Node Executors](/developer/node-executor-plugins.md)** - Control how commands execute on nodes
- **[File Copiers](/developer/file-copier-plugins.md)** - Control how files are copied to nodes

### Resource Discovery

- **[Resource Model Sources](/developer/resource-model-source-plugins.md)** - Provide node inventory data
- **[Resource Format Parsers](/developer/resource-model-format-plugins.md)** - Parse resource data formats
- **[Resource Format Generators](/developer/resource-model-format-plugins.md)** - Generate resource data formats

### Logging and Output

- **[Log Filters](/developer/log-filter-plugins.md)** - Transform or capture log output
- **[Logging Plugins](/developer/logging-plugins.md)** - Stream logs to external systems
- **[Content Converters](/developer/content-converter-plugins.md)** - Render log output as HTML/Markdown

### Notifications and Events

- **[Notification Plugins](/developer/notification-plugins.md)** - Send notifications on job events
- **[Webhook Plugins](/developer/webhook-plugins.md)** - Receive and process webhooks
- **[Audit Event Listeners](/developer/audit-events-listeners.md)** - Respond to audit events

### Security and Storage

- **[Storage Plugins](/developer/storage-plugins.md)** - Store keys/passwords in external systems
- **[Storage Converter Plugins](/developer/storage-converter-plugins.md)** - Encrypt/decrypt stored data
- **[User Group Source Plugins](/developer/user-group-source-plugins.md)** - Integrate with authentication systems

### Orchestration and Control

- **[Orchestrator Plugins](/developer/orchestrator-plugins.md)** - Control node execution order
- **[Workflow Strategy Plugins](/developer/step-plugins.md#workflow-step-plugin)** - Define custom workflow execution patterns

### Configuration and Options

- **[Option Values Plugins](/developer/option-values-plugins.md)** - Provide dynamic option values
- **[File Upload Plugins](/developer/file-upload-plugins.md)** - Handle file uploads for job options

### Lifecycle Plugins

- **[Execution Lifecycle Plugins](/developer/execution-lifecycle.md)** - Hook into execution lifecycle events
- **[Job Lifecycle Plugins](/developer/job-lifecycle.md)** - Hook into job definition lifecycle

### Source Control Integration

- **[SCM Plugins](/developer/scm-plugins.md)** - Integrate jobs with Git or other SCM systems

### User Interface

- **[UI Plugins](/developer/ui-plugins.md)** - Add custom UI components

## Common Plugin Development Topics

### Configuration Properties

Learn how to define configuration properties for your plugin:
- [Plugin Properties Reference](/developer/plugin-properties.md) - Property types, scopes, and rendering options
- [Property Annotations](/developer/java-plugin-development.md#plugin-properties) (Java plugins)
- [Plugin Metadata](/developer/script-plugin-development.md#plugin-properties) (Script/Groovy plugins)

### Localization and Icons

Make your plugin user-friendly:
- [Plugin Localization](/developer/plugin-properties.md#plugin-localization) - Translate plugin UI text
- [Plugin Icons](/developer/plugin-properties.md#plugin-icons) - Add custom icons

### Plugin Groups

Organize related plugins:
- [Plugin Groups](/developer/plugin-groups.md) - Group related plugins in the UI

## Additional Resources

### Tools and Utilities

- **[Plugin Bootstrap Tool](/developer/plugin-bootstrap.md)** - Generate complete plugin projects in seconds (RECOMMENDED)
  - Supports Java, Script, and UI plugins
  - Creates project structure, build files, template code, and tests
  - Get started immediately with working plugin scaffold
- **[Password Utility](/developer/password-encrypt-utility.md)** - Encrypt passwords for configuration
- **[Rundeck Plugin Archetype](https://github.com/rundeck/rundeck-plugin-archetype)** - Maven archetype for Java plugins

### API Documentation

- **[API Reference](/api/)** - REST API documentation
- **[Java API Documentation](https://javadoc.io/doc/org.rundeck/rundeck-core/)** - JavaDoc for core classes

### Community and Support

- **[Plugin Repository](https://plugins.rundeck.com/)** - Browse and download community plugins
- **[GitHub Discussions](https://github.com/rundeck/rundeck/discussions)** - Ask questions and share knowledge
- **[Rundeck Slack](https://rundeck.slack.com/)** - Chat with the community

## Next Steps

1. **Choose your approach**: Review the [comparison table](#quick-comparison) above
2. **Use the Plugin Bootstrap Tool** (Recommended): Generate a complete plugin project instantly
   - See [Plugin Bootstrap Tool](/developer/plugin-bootstrap.md) for commands and examples
   - Saves hours of setup time
3. **Read the specific guide**: 
   - [Java Plugin Development](/developer/java-plugin-development.md)
   - [Script Plugin Development](/developer/script-plugin-development.md)
   - [Groovy Plugin Development](/developer/groovy-plugin-development.md)
4. **Select a plugin type**: Pick from the [available types](#available-plugin-types)
5. **Start developing**: Implement your plugin logic in the generated scaffold
6. **Test and deploy**: Build, test, and deploy to Rundeck

::: tip Quick Start
The fastest way to start: Use the [Plugin Bootstrap Tool](/developer/plugin-bootstrap.md) to generate your project, then follow the specific guide for your chosen approach.
:::

Good luck with your plugin development! If you have questions, reach out to the Rundeck community.
