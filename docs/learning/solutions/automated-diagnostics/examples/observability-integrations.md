# Automated Diagnostics

## Observability Integrations
Retrieving diagnostics from monitoring tools is a common strategy for easily surfacing relevant logs and other diagnostic data to improve triage.

## Examples

### Log Queries
Retrieving logs from a monitoring tool or log-aggregator is a common first step for addressing alerts and incidents.  
It is common to have saved queries in these tools to quickly surface relevant logs for similar types of issues.

### Diagnostic Metrics
Some monitoring tools provide "diagnostic level" statistics - such as top cpu consuming processes. Retrieving these datapoints can help shorten the duration of incidents.

## Mechanisms for Automated Diagnostics

**Runbook Automation** and **Process Automation** provide a handful of plugins that make it easy to integrate with common monitoring tools:

### CloudWatch Logs
The [CloudWatch Logs Ad Hoc Query](/manual/workflow-steps/aws-cloudwatch#execute-ad-hoc-cloudwatch-logs-query) plugin allows users to insert a Logs Insights query into a Job to surface logs from CloudWatch.
![CloudWatch Logs Ad Hoc Query](@assets/img/aws-cloudwatch-logs-query-string.png)<br>

In addition, there is the [CloudWatch Logs Saved Query](/manual/workflow-steps/aws-cloudwatch#execute-saved-cloudwatch-logs-query) plugin, which can trigger a saved query in CloudWatch against one or multiple CloudWatch log groups.
![Execute Saved CloudWatch Logs Query](@assets/img/cloudwatch-saved-query-fields.png)

### Sumo Logic Logs Query
Insert a Sumo Logic logs query into your Automation instance to surface logs from Sumo Logic:
![Sumo Logic logs Query](@assets/img/sumo-logic-create-query-example.png)<br>

### HTTP Request Step Plugin
The [HTTP Request Plugin](/manual/node-steps/builtin.html#http-node-step) can make an API call to your monitoring tools to retrieve relevant diagnostic data.