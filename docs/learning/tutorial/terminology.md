# Rundeck Terminology

## Projects
A project is a place within Rundeck to separate management activity. All Rundeck activities occur within the context of a project. Multiple projects can be maintained on the same Rundeck server. Projects are independent from one another, so you can use them to organize unrelated systems within a single Rundeck installation. This can be useful for managing different teams, infrastructures, environments or applications.

## Nodes
A Node is a resource that is either a physical or virtual instance of a network accessible host. Nodes have a few basic attributes but a Node's attributes can be extended to include arbitrary named key/value pairs. Attributes typically describe the properties of a node or reflect the state of the node. One of a Node's built in attributes is called "tags" which are a list of classifications or categories about that Node.

## Key Storage
The Key Storage facility provides GUI backed by an [API](/api/rundeck-api.md#key-storage) to manage public, private keys and passwords.
These stored keys are used by many different types of Rundeck plugins.  The Key Storage entries can also be used in Job definitions as secure value inputs.

## Commands
A command is a single executable string executed on a [Node](#nodes). Rundeck invokes commands on nodes via a node executor which evaluates the command string and executes it. [Node executors](#node-executors) evaluate the command string in a data context containing information about the Node resource. Command strings can reference this data and thus avoid hard coding node or environment specific values.

The Rundeck graphical console provides the ability to execute commands to a set of filtered Node resources. The Command page can accept any command string you might run via on the node's console.

## Jobs
Jobs provide a means to encapsulate a process. A Job is a configuration representing input options, the steps in the process, a filter expression that matches the nodes where those steps will execute, and execution control parameters that specify if steps are run in parallel and what to do if an error occurs in one of the steps.
Rundeck lets you organize and execute Jobs and observe the progress as the Job is running. You can view a list of the currently running Jobs or drill down to see the output of individual executing steps.

## Job Steps
A Job Step is an individual unit of work that a Job might do.  A job can have multiple, ordered steps that each do a different unit of work.  There are two types of job steps available. *Workflow Steps* execute once during the Job execution.  *Node Steps* are run once on each node associated with a job.

## Activity / Executions
The Activity window shows execution history for commands and Jobs. By default, the Activity page will list running executions and history of recent executions. The page contains a filter control that can be used to expand or limit the executions. Execution detail for each job execution will show options the job was run with, log output, job duration, etc.

## Tours
Rundeck Guided Tours provide interactive walk-throughs to end users to help demonstrate Rundeck processes. They can be used to help first time users get familiar with the system, or provide step-by-step instructions for how to execute complicated processes. Tours are only available in Rundeck Enterprise.

## Plugins
Rundeck is built over a flexible platform architecture.  Extending Rundeck functionality is done through _plugins_. Plugins exist to execute commands on nodes, perform steps in a job, send a notification about job status, gather information about the hosts in your network, copy a file to a remote server, store and stream logs, talk to a user directory, and so much more.

The Rundeck Enterprise version includes built-in plugins to further enhance functionality for [Scheduling](schedules/project-schedules.md) job executions, providing [Guided Tours](tour-manager.md), incorporating [Health Checks](healthchecks.md), and much more.

See [Job Plugins](/manual/job-plugins.md) and [Plugin Developer Guide](/developer/index.md) and [Rundeck Plugins](/plugins/index.md) for more information.

## Node Executors
Rundeck executes Command items on Nodes. The command may be part of a Workflow as defined in a Job, and it may be executed multiple times on different nodes. Rundeck uses the NodeExecutor and FileCopier services as part of the process of executing these commands.

## Log Filters
Log Filters are applied to a Job step to act on the output from that step. Certain Job Filters can set variables based on information in the log output. Check out the Passing Variables in Jobs How To for more information.

## Role-based Access Control Policies
A Rundeck _[access control policy](/administration/security/authorization.md)_ grants users and user groups certain privileges to perform actions against rundeck resources like projects, jobs, nodes, commands and API.

## Webhooks
Webhooks are an industry standard way for internet applications to communicate with each other.  Rundeck Webhooks are an entry point to automation with Rundeck.  A Webhook can be configured to accept incoming payloads and trigger Rundeck Job(s).  For more information about how to use Webhooks [check out this tutorial](/learning/howto/using-webhooks.md).
