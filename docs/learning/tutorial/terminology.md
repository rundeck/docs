# Rundeck Terminology

## Activity / Executions
The Activity window shows execution history for commands and jobs. By default, the Activity page lists the running executions and history of previous executions. Clicking on any execution shows the details and the job output result.

## Commands
A command is a single executable string executed on a [Node](#nodes). Rundeck invokes commands on nodes via a node executor which evaluates the command string and executes it. [Node executors](#node-executors) evaluate the command string in a data context containing information about the Node resource. Command strings can reference this data and thus avoid hard coding node or environment specific values.

The Rundeck graphical console provides the ability to execute commands to a set of filtered Node resources. The Command page can accept any command string you might run via on the node's console.

## Job Definition
Job definitions are files in either the XML or YAML file format that contain the job code.
These files, which are the standard job format for exchanging jobs between instances, can be imported or exported to transfer jobs between projects or automation servers.

## Job Notifications
Job events may result in messages known as job notifications.
Common notifications include sending an email or calling a webhook. Notifications can be set to happen based on various job events or statuses.
The following are the available events to assign a Job Notification:
 - **Start**: When the Job starts, all "start" notifications will be triggered.
 - **On Success**: When the Job finishes executing, all "success" notifications will be triggered if the Job is successful.
 - **On Failure**: All "failure" notifications will be triggered if the Job fails or is canceled.
 - **On Retryable Failure**: All "failure" notifications that are retryable will be triggered if the Job fails.
 - **Average Duration Exceeded**: Sends a notification when the specified duration threshold has been exceeded. If not specified, the Job Average duration will be used.
 
## Job Options
An option represents a named Job parameter (required or optional) that will be offered to the user when the Job is executed. Users supply options by either entering in a value or making a choice from a menu. Once selected, the option's value is available to Job steps or potentially to child jobs called by the main job.

## Job Steps
A Job Step is an individual unit of work that a Job might do. A job can have multiple, ordered steps that each do a different unit of work. 
There are two types of steps available:
 - [Node steps](/manual/job-plugins.html#node-steps) are designed to be dispatched to one or more nodes, based on a filter defined in the Nodes section. An example of a node step is a single command or an inline script to be executed on each targeted node.
 - [Workflow steps](/manual/job-plugins.html#workflow-steps) don't operate in a node context. Instead, these steps run on the local Rundeck server and run only once in a workflow. For example, the "Refresh Project Nodes" workflow step refreshes the Rundeck node cache in case of any change.

## Jobs
Job definitions are files in either the XML or YAML file format that contain the job code.
These files, which are the standard job format for exchanging jobs between instances, can be imported or exported to transfer jobs between projects or automation servers.
Rundeck lets you organize and execute Jobs and observe the progress as the Job is running. You can view a list of the currently running Jobs or drill down to see the output of individual executing steps.

## Key Storage
The Key Storage facility provides GUI backed by an [API](/api/rundeck-api.md#key-storage) to manage public, private keys and passwords.
These stored keys are used by many different types of Rundeck plugins.  The Key Storage entries can also be used in Job definitions as secure value inputs.

## Log Filters
Log Filters are applied to a Job step to act on the output from that step. Certain Job Filters can set variables based on information in the log output. Check out the Passing Variables in Jobs How To for more information.

## Node Executors
Rundeck executes Command items on Nodes. The command may be part of a Workflow as defined in a Job, and it may be executed multiple times on different nodes. Rundeck uses the NodeExecutor and FileCopier services as part of the process of executing these commands.

## Node Filter
Node filters are expressions that define a set of nodes, usually to be targeted by a job. The filter is composed of one or more `attributename: value` pairs.  The combination of those attributes will designate which nodes to match. You can negate a match by using `!attributename: value`. If you do not specify an attribute name, then the nodename is matched against the bare value.

## Nodes
A Node is a resource that is either a physical or virtual instance of a network accessible host. Nodes have a few basic attributes but a Node's attributes can be extended to include arbitrary named key/value pairs. Attributes typically describe the properties of a node or reflect the state of the node. One of a Node's built in attributes is called "tags" which are a list of classifications or categories about that Node.

## Plugins
Rundeck is built over a flexible platform architecture.  Extending Rundeck functionality is done through _plugins_. Plugins exist to execute commands on nodes, perform steps in a job, send a notification about job status, gather information about the hosts in your network, copy a file to a remote server, store and stream logs, talk to a user directory, and so much more.

The Process Automation version includes built-in plugins to further enhance functionality for [Scheduling](/manual/schedules/project-schedules.md) job executions, providing [Guided Tours](/manual/tour-manager.md), incorporating [Health Checks](/manual/healthchecks.md), and much more.

See [Job Plugins](/manual/job-plugins.md) and [Plugin Developer Guide](/developer/index.md) and [Rundeck Plugins](/plugins/index.md) for more information.

## Projects
A project is a place within Rundeck to separate management activity. All Rundeck activities (such as jobs or commands) occur within the context of a project. Multiple projects can be maintained on the same Rundeck server. 
Projects are independent from one another, so you can use them to organize unrelated systems within a single Rundeck installation. This can be useful for managing different teams, infrastructures, environments or applications.

## Role-based Access Control Policies
A Rundeck _[access control policy](/administration/security/authorization.md)_ grants users and user groups certain privileges to perform actions against rundeck resources like projects, jobs, nodes, commands and API.

## Tours
Rundeck Guided Tours provide interactive walk-throughs to end users to help demonstrate Rundeck processes. They can be used to help first time users get familiar with the system, or provide step-by-step instructions for how to execute complicated processes. Tours are only available in Process Automation.

## Webhooks
Webhooks are an industry standard way for internet applications to communicate with each other.  Rundeck Webhooks are an entry point to automation with Rundeck.  A Webhook can be configured to accept incoming payloads and trigger Rundeck Job(s).  For more information about how to use Webhooks [check out this tutorial](/learning/howto/using-webhooks.md).