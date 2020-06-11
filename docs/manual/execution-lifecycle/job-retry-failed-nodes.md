# Job Retry Failed Nodes (Enterprise)
::: enterprise
:::

This plugin allows Jobs to *retry* failed executions just on failed nodes.

When you enable this plugin for a job, with retry options set, the plugin will review the previous execution's list of succeeded nodes and will just select on the next execution the nodes that either *failed* or were *not started*.

## Requirements

::: warning
This plugin works in conjunction with the "Retry" options for Jobs enabled.  [Please read more about those settings here](https://docs.rundeck.com/docs/manual/creating-jobs.html#retry).
:::



## Usage

To use this plugin, edit or create a Job, and under the "Execution Plugins" tab,  and configure the [Retry options](https://docs.rundeck.com/docs/manual/creating-jobs.html#retry).
![Retry Job Settings](~@assets/img/retry-failed-jobs-retry.png)

On the Execution Plug-ins tab enable the checkbox next to the "Retry on failed nodes" plugin.

![Execution Plugins](~@assets/img/retry-failed-jobs-conf.png)

When the job runs and fails, subsequent retry executions will only run on the nodes that didn't succeed.

## Example
The following job ran on 4 nodes: 2 succeeded, 1 failed, and 1 wasn't started.

![Failed Execution](~@assets/img/retry-failed-jobs-execution-failed.png)

Then, on the next retry executions, just the remaining nodes were targeted.

![Next Retry Execution Resume](~@assets/img/retry-failed-jobs-execution-succeed-resume.png)

![Next Retry Execution Log](~@assets/img/retry-failed-jobs-execution-succeed-log.png)
