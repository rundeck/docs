# Passing Data Between Steps

## Overview
Rundeck offers powerful Runbook Automation. Most Runbooks are complicated, multi-step processes.

This guide will show various examples of how to share data from one step to another through the use of Log Filters.

> Note: If you haven't followed the Exercise Steps in the [Tutorial](/learning/tutorial/preparing.md) we encourage starting with that walk-through.

### Type of Variables
When a Job step is executed, it has a set of *context variables* that you can access in the Job step. There are several sets of context variables, including: the Job context `job`, the Node context `node`, the Option context `option`, and the Step Data Context `data`.

Click here for more documentation on: [Context Variables](/manual/job-workflows.md#context-variables)

### Other Terminology

These are some key terms we'll be using throughout this tour in addition to terms used in our [Terminology](/learning/tutorial/terminology.md) documentation.

#### Log Filters
Log Filters are applied to a Job step to act on the output from that step. Certain Job Filters can set variables based on information in the log output. There is a separate guide _(coming soon)_ to cover different types of Log Filters and how they are used.

#### RegEx
Log Filters use Regular Expression syntax (RegEx) to collect information from the log output. Familiarity with Regex will be key to successfully gathering data from your own job steps. You will not need to know it for these Exercises.

## Exercises Intro
As part of the Welcome Projects we have built some example jobs to highlight how variables can be passed from one job step to another.  For more information about the Welcome Projects check out the [Learning Overview](/learning/index.md).

It's important to note that Node Steps (steps run against nodes) and Workflow Steps (steps run from the Rundeck server) store variables differently. The examples will also show how to use the variables from different types of steps and highlight common trouble spots.

::: tip Important Exercise Prerequisite
If you are new to Rundeck, we recommend finishing the exercises in the [Getting Started Tutorial](/learning/tutorial/preparing.md) first. Terminology and actions in the following exercise will assume you have completed that Tutorial.
:::

## Using Input Option Variables
Input Option are values that are provided at the start of running a job. They may be represented as a form on the Job Execution page or populated by a Webhook or other call.
:::: tabs

This Exercise shows an example of how to use an Input Variables.

::: tab Enterprise Exercise
1. Open the **Jobs** section in the Welcome Project.
1. Expand the **Variables > Variables in Job Steps** folders.
1. *Edit* the **Using Input Options in command and scripts** job.
1. On the *Workflow* tab under *Options* Click the `input_key` option entry.
1. The Option Name is `input` and the Option Label is `My Input`
1. To reference this variable Job Steps will use `${option.input_key}` and Script Steps would use `@option.input_key@`

:::
::: tab Community Exercise
1. Open the **Jobs** section in the Welcome Project.
1. Expand the **Variables > Variables in Job Steps** folders.
1. *Edit* the **Using Input Options in command and scripts** job.
1. On the *Workflow* tab under *Options* Click the `input_key` option entry.
1. The Option Name is `input` and the Option Label is `My Input`
1. To reference this variable Job Steps will use `${option.input_key}` and Script Steps would use `@option.input_key@`
:::
::::

## Using Step Data Variables

Step Data variables are data gathered using Log Filters and stored in memory while the job is running. _(See the Log Filters How To for specifics on each type)_.

How Step Data variables are referenced in Jobs depend on a few things:
- The type of Job Step we are running (Node Step vs. Workflow Step)
- Whether the variable is being accessed from a Command Step or a Script

### Job Step Types
There are two types of Job Steps.
- **Node Steps**: These are steps that are run against every node associated with this job.
- **Workflow Steps**: These steps are run from the Rundeck server without being associated to a specific node.

This is important to keep in mind because when a job is run against more than one node a variable may have multiple entries, one for each node it was run against.

### Command Steps vs Scripts
Referencing variables from Command Steps use a different syntax than referencing them from within a Script. Most Job Steps are Command Steps and will follow a format of:
`${data.MyKeyName}`.  Scripts will reference variables by enclosing them in @ symbols: `@data.MyKeyName@`

:::: tabs
In this Exercise we'll highlight the dynamics between all of these scenarios.
::: tab Enterprise Exercise
1. Open the **Jobs** section in the Welcome Project.
1. Expand the **Variables > Variables in Job Steps** folders.
1. Edit the **Using Step Data Variables** job.
1. Job Step 1 is executing a simple `hostname` command and capturing that output with a **Log Filter**. The Log Filter sets the variable name to `MyKeyName`.
1. Job Step 2 is an example of a **Node _Command_ Step** using data from Step 1 by calling `${data.MyKeyName}`.
1. Job Step 3 is an example of a **Node _Script_ Step** using data from Step 1 by calling `@data.MyKeyName@`.
:::
::: tab Community Exercise
1. Open the **Jobs** section in the Welcome Project.
1. Expand the **Variables > Variables in Job Steps** folders.
1. Edit the **Using Step Data Variables** job.
1. Job Step 1 is executing a simple `hostname` command and capturing that output with a **Log Filter**. The Log Filter sets the variable name to `MyKeyName`.
1. Job Step 2 is an example of a **Node _Command_ Step** using data from Step 1 by calling `${data.MyKeyName}`.
1. Job Step 3 is an example of a **Node _Script_ Step** using data from Step 1 by calling `@data.MyKeyName@`.
:::
::::

### Node vs Workflow Steps (Multi-Node Example)
The **Using Step Data Variables** job in the previous section was configured to only execute against the Rundeck Server.
To highlight the difference when running against multiple nodes, let's run the **Multi-Node Example** job and explore its output and configuration.
>Note: It is recommended to configure multiple Nodes as detailed in the Getting Started Tutorial.

:::: tabs
::: tab Enterprise Exercise
1. Open the **Jobs** section in the Welcome Project.
1. Expand the **Variables > Variables in Job Steps** folders.
1. Run the **Multi-Node Example Job**
1. Note that the code within the job is exactly the same as the _Using Step Data Variables_ job we ran with one added step.
1. Since there are now multiple nodes that the _Command_ and _Script_ steps are run against we will see more output than before.
2. Each Node will have different output for the `hostname` command. This is because those job steps are *Node Steps*. Each step output line will have a node associated with it on the right. (If you are in *Log Output* view look for the blue text)

:::
::: tab Community Exercise
1. Open the **Jobs** section in the Welcome Project.
1. Expand the **Variables > Variables in Job Steps** folders.
1. Run the **Multi-Node Example Job**
1. Note that the code within the job is exactly the same as the _Using Step Data Variables_ job we ran with one added step.
1. Since there are now multiple nodes that the _Command_ and _Script_ steps are run against we will see more output than before.
2. Each Node will have different output for the `hostname` command. This is because those job steps are *Node Steps*. Each step output line will have a node associated with it on the right. (If you are in *Log Output* view look for the blue text)
:::
::::

A common sticking point is when _Workflow Steps_ need to use a variable value from a _Node Step_.

Accessing the variable from the node would need to be called using `${data.MyKeyName@hostname}` to get the specific value. Note the `@hostname` portion of that string.

If your job is run against a single node it is also possible to use the `*` character `${data.MyKeyName*}`. The `*` is used in Step 4 but as you can see in the output when used on jobs with multiple nodes the variables are joined with a comma `,`.  If you want to use a character other than `,`, you can add it after the `*` like `${data.MyKeyName*;}` which will separate all values with `;`.

## Using Other Context Variables
Using other Context variables follows the same format.

To see what variables might be available check out the list here:
[Context Variables Documentation](/manual/job-workflows.html#context-variables)

To check variable values during your workflow use the Workflow Step titled **Log Data Step**.
