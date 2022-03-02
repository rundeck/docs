# Types of Plugins

Plugins are files that contain one or more Service Provider implementations. Each
plugin file could contain multiple Providers for different types of services,
however typically each plugin file would contain only providers related in some
fashion.

Rundeck includes a number of "built-in" providers, as well as a few
"included" plugin files.

In this document "plugin" and "provider" are used somewhat interchangeably. When
referring to an actual file containing the provider implementations we will say
"plugin file".

![Rundeck Providers and Plugin Files](~@assets/img/fig1102.png)

Rundeck supports several different types of plugins to perform different kinds
of services:

- [Workflow Step](/manual/job-plugins.md#workflow-steps) - defines an action that can be a distinct step within a workflow, either for an individual Node or a set of Nodes
- [Node Execution](/manual/projects/node-execution/index.md) - defines a mechanism to connect to a remote Node and execute a command
- [File Copier](/manual/projects/node-execution/index.md) - defines a mechanism to copy a file to a remote node
- [Resource Model Source](/manual/projects/resource-model-sources/index.md) - defines a mechanism to retrieve Resource Model data (Node definitions) for use by a Rundeck project
- [Resource Format](/developer/03-model-source-format-parser-generator-plugins.md) - defines a data format for Resource Models
- [Notification](/manual/job-plugins.md#notifications) - defines a mechanism for notification that can be triggered when a Job starts or finishes
- [Streaming Logging](/administration/maintenance/logs.md#streaming-log-plugins) - defines a mechanism for reading and writing log events
- [Execution File Storage](/administration/maintenance/logs.md#execution-file-storage) - defines a mechanism for storage of log files
- [Storage Facility](/administration/configuration/storage-facility.md) - defines storage backends and content conversion
- [Orchestrator](/manual/job-plugins.md#node-orchestrator) - defines a mechanism for orchestrating nodes when performing dispatched commands
- [Log Filters](/manual/job-plugins.md#log-filters) - can capture data from, or modify, the log output from a workflow

## About Services and Providers

The Rundeck core makes use of several different "Services" that provide
functionality for the different steps necessary to execute workflows, jobs,
and commands across multiple nodes.

Each Service makes use of "Providers". Each Provider has a unique "Provider Name"
that is used to identify it, and most Services have default Providers unless
you specify different ones to use.

![Rundeck Services and Providers](~@assets/img/fig1101.png)
![Rundeck Services and Providers](~@assets/img/fig1101_2.png)
![Rundeck Services and Providers](~@assets/img/fig1101_3.png)

Rundeck Plugin Files can contain more than one Provider.

## Service Categories

Services fall into different categories, which determine how and where they are used.

1. **Node Execution services** - providers of these services operate in the context of a single Node definition, and
   can be configured at Node scope or higher:

   1. Node Executor - these providers define ways of executing a command on a Node (local or remote)
   2. File Copier - these providers define ways of copying files to a Node.

2. **Project services**

   1. Resource Model Source - (aka "Resource Providers") these define ways of retrieving Node resources for a Project

3. **Global services** (framework level)

   1. Resource Format Parser - these define document format parsers
   2. Resource Format Generators - these define document format generators
   3. Storage Facility - these define storage backends and converters
   4. Logging - these define log file storage and log streaming input and output

4. **Workflow services**

   1. Workflow Step - providers define behavior for all nodes
   2. Workflow Node Step - providers define behavior for a single node
   3. Remote Script Node Step - a specific use-case for Node Step providers
   4. Orchestrator - providers define how nodes are iterated over during node dispatch steps

5. **Notification services**

   1. Notifications - external actions that are triggered when a Job starts or finishes.
