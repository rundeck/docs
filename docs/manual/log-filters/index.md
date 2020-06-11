# Log Filters

Workflow steps may have one or more Log Filters. A Log Filter processes the output of a workflow step to transform that output to feed values into Rundeck variables, or to transform the output for better usability.

For example, given a job that pulls API results from a web service, the results from the API might be formatted in JSON. The Render Formatted Data log filter can format the output as an HTML table for users running the job.

Conversely, as a different example, for workflow steps that need to feed data to following steps, the Key Value Data filter will parse the assigned step’s output with a regular expression to create key-value data pairs for use in other workflow steps.

Log Filters:

- [Mask Passwords](/manual/log-filters/mask-passwords.md)
- [Render Formatted Data](/manual/log-filters/render-formatted-data.md)
- [Key Value Data](/manual/log-filters/key-value-data.md)
- [Quiet Output](/manual/log-filters/quiet-output.md)
- [Highlight Output](/manual/log-filters/highlight-output.md)
- [Progress Badge](/manual/log-filters/progress-badge.md)
