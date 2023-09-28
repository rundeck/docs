# Job Queue (Enterprise)

By default, jobs can only have a single execution running at a time, and further attempts
to execute it will be prevented unless the [Multiple Executions](/manual/creating-jobs.md#multiple-executions)
settings is enabled to allow parallel execution of jobs.

In contrast, Job Queuing allow jobs to run a single execution at a time, but accepting new executions and placing
them in a queue, to run them sequentially in the order they were created. Each job has its own queue which is not shared with other jobs,
and this queue is persistent, so it will preserve queued jobs after a system restart.

Executions triggered by a schedule will be scheduled normally, and only be queued at the moment of being triggered
if there are already executions running.


::: warning
Enabling a job's queue will override Multiple Execution settings.
:::

::: warning
As of 3.4.0, jobs with [secure options](/manual/job-options.md#secure-options) don't support job queuing.
:::


## Enabling the queue for a Job.

To enable a job queue, go to the Job Edition page, and look for the `Job Queue` section, then
check the `Enable Job Queue` option.

You can also set a queue size limit. When this limit is reached further executions will be rejected until space is
available. Set empty or 0 for an unlimited queue size.

![Job Queue Config](~@assets/img/jobqueue-config.png)

## Queuing executions

To queue an execution just run the job. If executions are already running then the new one
will be automatically placed at the tail of the queue.

## Display queued executions.

To view currently queued executions, go to the [Activity Page](/manual/08-activity.md), which will show currently
running and queued executions.

![Job Queue Activity](~@assets/img/jobqueue-activity.png)

## Removing an execution from the queue.

To cancel a queued execution, go to the execution detail page and [kill it](/manual/04-jobs.md#killing-jobs). 

## Disabling queue system entirely.

To disable the job queue system entirely, add the following setting to rundeck-config.properties

  ```properties
  rundeck.jobQueue.enabled=false
  ```

This will remove all queuing options and functions from the system. 
Note that if the queue system is disabled, existing queued executions will stay in that status
unless killed.

Disabling job queue will not erase job queue configuration, so when enabled again it will resume queuing on
all previously configured jobs.

## Advanced configuration

Job queuing offers the following advanced configuration:

### Queue polling delay.

By default, the job queue is checked every 10 seconds for executions elegible to be dequeued and run.
Increasing this delay is recommended if you have a big cluster with a large amount of jobs with its queue enabled, 
in order to reduce polling pressure on the database.

To change this delay set the following property at `rundeck-config.properties`:

  ```properties
  # Queue poll delay in seconds.
  rundeck.jobQueue.pollDelay=10
  ```

### Queue startup delay.

By default, job queue processing will begin 10 seconds after rundeck startup. To change this delay
set the following property at `rundeck-config.properties`:

  ```properties
  # Queue startup delay in seconds.
  rundeck.jobQueue.startupDelay=10
  ```

