# Job Resume Plugin (Enterprise)
::: enterprise
:::

This plugin allows resuming a job if one or more steps fail.

When you enable this plugin for a Job, the plugin will record the internal *Workflow State*
as the Execution progresses.  When one or more steps fail, the Workflow State prior to executing the failed step(s) is
recorded and stored.

You can then choose to "Resume" the execution, which will load the stored state and start a new execution, proceeding to execute the previously failed step(s) with the same inputs.

## Requirements

::: warning
This plugin does not work for "Node First" Workflow Strategy.
:::


::: betafeature
This plugin now works with "Parallel" and "Ruleset" Strategies.
:::


1. The Job cannot use the "Node FIrst" Workflow Strategy.
2. The Job's workflow sequence should not be modified before resuming the execution. The plugin will store a "snapshot" of the workflow sequence within the resume state, allowing it to compare that to the workflow sequence used to resume it. If the Job workflow sequence has been modified, the plugin will fail to start. This means that you should not reorder, add/remove, or replace steps in the Workflow before resuming the execution.  However, modifying existing steps should be possible.

## Caveats - Workflow Strategies

Does not work with "Node First" workflow strategy.

Only works with these workflow strategies:

* Sequential
* Parallel (**BETA** feature)
* Ruleset (**BETA** feature)

## Caveats - Secure Options

The runtime values for "Secure" or "Secure Remote Authentication" options **will not** be 
persisted with the Resumable workflow state.  

This means that Secure Option values will only be available when Resuming a job in these cases:

* If a secure option defines a Storage Path, the Key Storage value will be loaded when the execution is Resumed.
* If "Other > Retry" is configured for the Job, and "Resume On Retry" is checked, secure option values will be available when the execution is automatically retried.

In other words, manually-entered Secure Option values will not be available when a manual "Resume" action is performed.  


## Usage

To use this plugin, edit or create a Job, and under the "Execution Plugins" tab, enable the checkbox next to the "Resumable" plugin.

![Execution Plugins](~@assets/img/figure-job-resume-edit-job-execution-plugins.png)

When an execution fails at some step, a new menu option is available under the "Run Again…" drop down.

![Resume Execution Menu Item](~@assets/img/figure-job-resume-resume-execution-menuitem.png)

You will see a confirmation page to begin the resumed execution.

![Confirm Resume Execution](~@assets/img/figure-job-resume-confirm-resume.png)

After confirming, the new execution will begin at the step(s) that previously failed.

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

This plugin works with Clustering in Process Automation.  The serialized "Resume state" is stored alongside the execution log and execution state file in
your configured [Log Storage](/administration/cluster/logstore/index.md) system, with a file extension of `.resume.json`.

You can initiate the **Resume Execution** from any Cluster member if the Resume state file has been copied to the Log Storage system.  Before the execution starts, the
file will be loaded from the Log Storage system.

## Limitations

- Currently only the top level workflow steps will be tracked for resume. Referenced jobs will not
resume at their internally failed step.
- If the Rundeck server is interrupted, such as an application or server crash, before the workflow state
is serialized and stored the execution will not be able to resume from the failed step.
- Currently, if you kill manually a job during its execution, this job cannot be resumed. The plugin does not allow this action. Only a job can be resumed when this fails by itself.
