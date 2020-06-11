# Job Resume Plugin (Enterprise)
::: enterprise
:::

This plugin allows Jobs to *Resume* execution at a failed workflow step.

When you enable this plugin for a Job, the plugin will record the internal *Workflow State*
as the Execution progresses.  When a step fails, the state from immediately before the step started is
serialized and stored.  You can then choose to "Resume" the execution at the failed step.
The plugin will load the stored state contents, and start a new execution with the
resume state, proceeding to execute the previously failed step with the same inputs.

## Requirements

::: warning
This plugin currently works only for Jobs which use the "Sequential" (aka "Step-first") Workflow Strategy.
:::

1. The Job must use the "Sequential" Workflow Strategy. With this strategy, we know that the internal state of the workflow engine before the failed step runs can be used to resume the same Job execution again.
2. The Job's workflow sequence should not be modified before resuming the execution. The plugin will store a "snapshot" of the workflow sequence within the resume state, allowing it to compare that to the workflow sequence used to resume it. If the Job workflow sequence has been modified, the plugin will fail to start. This means that you should not reorder, add/remove, or replace steps in the Workflow before resuming the execution.  However, modifying existing steps should be possible.


## Usage

To use this plugin, edit or create a Job, and under the "Execution Plugins" tab, enable the checkbox next to the "Resumable Job" plugin.

![Execution Plugins](~@assets/img/figure-job-resume-edit-job-execution-plugins.png)

When an execution fails at some step, a new menu option is available under the "Run Again…" drop down.

![Resume Execution Menu Item](~@assets/img/figure-job-resume-resume-execution-menuitem.png)

::: tip
Note: The page might need to be refreshed to show the menu item.
:::

You will see a confirmation page to begin the resumed execution.

![Confirm Resume Execution](~@assets/img/figure-job-resume-confirm-resume.png)

After confirming, the new execution will start at the step that previously failed.

![Resumed Execution](~@assets/img/figure-job-resume-resumed-execution.png)

## Resume On Retry

When a Job uses the "Retry" feature, it normally will automatically start a fresh Execution when it fails, after an optional delay.

The Job Resume plugin can be configured to automatically use the Resume state when the execution is retried.

## Configuration

The configuration of this plugin is simple. Once added to a Job definition, it is enabled by default.  

```xml
<joblist>
  <job>
  	<!-- ... -->
    <plugins>
      <ExecutionLifecycle type='resume'/>
    </plugins>
   </job>
</joblist>
```

If you also want to enable it for automatic Retries, set `onRetry` to `true`.

```xml
<joblist>
  <job>
  	<!-- ... -->
	<plugins>
	  <ExecutionLifecycle type='resume'>
	    <configuration data='true'>
	      <map>
		<string key='onRetry'>true</string>
	      </map>
	    </configuration>
	  </ExecutionLifecycle>
	</plugins>
   </job>
</joblist>
```

## Clustering

This plugin works with Clustering in Rundeck Enterprise.  The serialized "Resume state" is stored alongside the execution log and execution state file in
your configured [Log Storage](/administration/cluster/logstore/index.md) system, with a file extension of `.resume.json`.

You can initiate the **Resume Execution** from any Cluster member if the Resume state file has been copied to the Log Storage system.  Before the execution starts, the
file will be loaded from the Log Storage system.

## Limitations

- Currently only the top level workflow steps will be tracked for resume. Referenced jobs will not
resume at their internally failed step.
- If the Rundeck server is interrupted, such as an application or server crash, before the workflow state
is serialized and stored the execution will not be able to resume from the failed step.
- Currently, if you kill manually a job during its execution, this job cannot be resumed. The plugin does not allow this action. Only a job can be resumed when this fails by itself.
