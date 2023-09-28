# Log Filters

A Log Filter processes the output of a workflow step and may transform that output, apply metadata to the output for use by later filters or renderers, or process the output in some way. Some Log Filters can be used to capture output as Rundeck variables for use in later steps, or to transform the output for better usability in the Rundeck GUI.

A Rundeck Job may define multiple Log Filters to process the output of steps within the workflow. A Job may define *global* Log Filters that apply to all steps, as well as *step* log filters that apply only to individual steps. All of the *global* Log Filters for a Job will be processed before individual step filters.

For example, given a job that pulls API results from a web service, the results from the API might be formatted in JSON. The Render Formatted Data log filter can format the output as an HTML table for users running the job.

Conversely, as a different example, for workflow steps that need to feed data to following steps, the Key Value Data filter will parse the assigned step’s output with a regular expression to create key-value data pairs for use in other workflow steps.

## Types of Log Filters:

- [Mask Passwords](/manual/log-filters/mask-passwords.md)
- [Render Formatted Data](/manual/log-filters/render-formatted-data.md)
- [Key Value Data](/manual/log-filters/key-value-data.md)
- [Quiet Output](/manual/log-filters/quiet-output.md)
- [Highlight Output](/manual/log-filters/highlight-output.md)
- [Progress Badge](/manual/log-filters/progress-badge.md)
- [JSON JQ](/manual/log-filters/json-jq.md)
- [Multi-line Regex](/manual/log-filters/multi-line-regex.md)

## Implmentation

Log Filters can be configured at a Job Step, Job, and some can be configured at the Project, or Globally across all projects and jobs.

### Job Step Log Filters

Job Filters are added to a Job Step using the Add Log Filter button on the step:

![Add Job Step Log Filter](@assets/img/logfilter-jobstep-add.png)

Choose the type of Log Filter and configure it using the instruction in the links above for that Filter type.

### Job Log Filters

Log Filters can be configured to apply to all Job Steps by configuring them on the "Global Log Filters" section within the Job Edit screen.

![Add Job Log Filter](@assets/img/logfilter-job-add.png)

### Project Log Filters

The [Mask Passwords](/manual/log-filters/mask-passwords.md) and [Highlight Output](/manual/log-filters/highlight-output.md) Log Filters can be configured at the Project Level and would apply to all Jobs within that project.  They are configured in the Project Configuration Settings window.

Open the Project > Click _Project Settings_ > Click _Edit Configuration_ > Click **Edit Configuration File**

The example below will configure a blue Password Mask filter, and match the word "input" and highlight it yellow.

```
project.globalfilter.1.config.color=blue
project.globalfilter.1.config.replacement=[SECURE]
project.globalfilter.1.type=mask-passwords
project.globalfilter.2.config.bgcolor=yellow
project.globalfilter.2.config.regex=input
project.globalfilter.2.type=highlight-output
```

### Application Global Log Filters

The [Mask Passwords](/manual/log-filters/mask-passwords.md) and [Highlight Output](/manual/log-filters/highlight-output.md) Log Filters can be configured in the Framework file to apply to all jobs run within Rundeck/Process Automation.  

The example below will configure a blue Password Mask filter, and match the word "input" and highlight it yellow for any job run on the server.

```
framework.globalfilter.1.config.color=blue
framework.globalfilter.1.config.replacement=[SECURE]
framework.globalfilter.1.type=mask-passwords
framework.globalfilter.2.config.bgcolor=yellow
framework.globalfilter.2.config.regex=input
framework.globalfilter.2.type=highlight-output
```