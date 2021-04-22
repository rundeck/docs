# Rundeck Terminology

### Projects
Project organize stuff

### Nodes
Nodes are things

### Key Storage
Where we store passwords

### Commands
A command is a single executable string executed on a Node. Rundeck invokes commands on nodes via a node executor which evaluates the command string and executes it. Node executors evaluate the command string in a data context containing information about the Node resource. Command strings can reference this data and thus avoid hard coding node or environment specific values.

The Rundeck graphical console provides the ability to execute commands to a set of filtered Node resources. The Command page can accept any command string you might run via on the node's console.

### Jobs
Jobs provide a means to encapsulate a process. A Job is a configuration representing input options, the steps in the process, a filter expression that matches the nodes where those steps will execute, and execution control parameters that specify if steps are run in parallel and what to do if an error occurs in one of the steps.
Rundeck lets you organize and execute Jobs and observe the progress as the Job is running. You can view a list of the currently running Jobs or drill down to see the output of individual executing steps.

### Activity
The Activity window shows execution history for commands and Jobs. By default, the Activity page will list running executions and history recent executions. The page contains a filter control that can be used to expand or limit the executions. Execution detail for each job execution will show options the job was run with, log output, job duration, etc.

### Tours
Show people stuff

### Plugins
