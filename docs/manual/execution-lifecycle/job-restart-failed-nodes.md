# Job Restart Failed Nodes (Enterprise)

This plugin allows Jobs to *retry* its failed executions just on failed nodes.

When you enable this plugin for a job, with retry options set, 
the plugin will review the previous execution's list of succeeded nodes and will just select on the next execution the nodes that either *failed* or were *not started*.

## Requirements

::: warning
This plugin currently works only for the Jobs with the "Retry" option enabled.
:::

## Usage

To use this plugin, edit or create a Job, and under the "Execution Plugins" tab, enable the checkbox next to the "Retry on failed nodes" plugin.

![Execution Plugins](~@assets/img/retry-failed-jobs-conf.png)


The retry option must be set in order to use the plugin

![Retry Job Settings](~@assets/img/retry-failed-jobs-retry.png)

When the job runs and fails, next retry executions will run just on the nodes that didn't succeed.

For example, the following job ran on 4 nodes: 2 succeeded, 1 failed, and 1 wasn't started.

![Failed Execution](~@assets/img/retry-failed-jobs-execution-failed.png)

Then, on the next retry executions, just the remaining nodes were targetted.

![Next Retry Execution Resume](~@assets/img/retry-failed-jobs-execution-succeed-resume.png)

![Next Retry Execution Log](~@assets/img/retry-failed-jobs-execution-succeed-log.png)
