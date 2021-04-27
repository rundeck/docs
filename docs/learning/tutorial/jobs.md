# 3 - Jobs / Activity

:::tutorial
:::

Jobs provide a means to encapsulate a process. A Job is a configuration representing input options, the steps in the process, a filter expression that matches the nodes where those steps will execute, and execution control parameters that specify if steps are run in parallel and what to do if an error occurs in one of the steps.
Rundeck lets you organize and execute Jobs and observe the progress as the Job is running. You can view a list of the currently running Jobs or drill down to see the output of individual executing steps. Job executions can also be aborted if they need to be stopped.

### Enterprise / Community Exercise:

Now that we have multiple* nodes let's run a job against those nodes.

1. Click the Jobs link in the left navigation menu.
1. Under the Demo/Linux folder find the Gather Linux Versions job.
1. Click on the Name of the job.
1. Click Run Job Now.
1. This will output version information about the Server node and your new node.

There are additional example jobs in the Welcome Project that gather performance metrics and check the status of services to explore as well.

## Activity

The Activity window shows execution history for commands and Jobs.

By default, the Activity page will list running executions and history recent executions. The page contains a filter control that can be used to expand or limit the executions. Execution detail for each job execution will show options the job was run with, log output, job duration, etc.

Click one of the entries in the Activity window to see the executions you've already run.
