# Advanced Run Job Webhook (Enterprise)
::: enterprise
:::

The powerful Enterprise Advanced Run Job webhook handler enables selective execution
of one or more jobs based by evaluating event data.

Each event passes through one or more routing actions. If the event satisfies the action
conditions the target job will be executed with the supplied job options. Conditions and job
options can be constructed from event data!

## General Settings

![](~@assets/img/wh-routing-rule-overview.png)

### Batch Key (optional)
The batch key makes it possible to extract a list from
the event and run each item through the action processing.

**Given:**
```json
{
    "messages": [
        {"msg": "foo"},
        {"msg": "bar"}
    ]
}
```

The batch key `$.messages` could be used to process each item
individually.

:::tip
The batch key supports JsonPath deep scanning. A key
such as `$.messages[*].alerts` could be used to extract nested lists
and process the items individually. Lists are recursively flattened.
:::

### Event ID Key (optional)
The event ID key can be used to replace the ID auto generated when
webhook events are received. This will be reflected in the logs. Batches
are extracted before applying the event ID key to each item.

## Actions
![](~@assets/img/wh-routing-rule-rule-overview.png)
:::tip
Actions can be individually enabled/disabled!
:::

Each webhook event gets evaluated against each action. If the action satisfies the conditions the target job will be executed.

### Name (optional)
A label to identify the action.

### Debug
Action evaluation debug info can be printed to the `INFO` log level by selecting the debug option. This can make it easier to troubleshoot actions while reducing noise.

### Job
Use the job picker to select a job target. If the action evaluation is a match the target
job will be executed with the Job Options.

### Node Filter (optional)
Used to override the job node filter. You can use a [JsonPath](#jsonpath) or [Template](#template) to craft a node filter from the event data.

### User (optional)
Optionally override the user the job runs as. This can be crafted from event data just
like [Node Filter](#node-filter)

### Job Options
Job options to be supplied during job execution. Use [JsonPath](#jsonpath) or
[Templates](#templates) to construct the `value` from event data.

## Conditions

Each action can have multiple Conditions. Based on the [Policy](#policy), the action will apply when all or any of the conditions are satisfied.  Each Condition defines a Field selector using JsonPath, a particular match type (defined below), and a value.

![Oh noes :O](~@assets/img/wh-routing-rule-conditions-overview.png)

### Policy

When more than one Condition is added to the Action, you can select which policy to use for evaluating the Conditions.

* **all** All conditions must match
* **any** At least one condition must match

### Match Types

`equals`
:   Satisfied if the Field _equals_ the value of
the provided `value` string. Note: currently the selected Field will be converted to a String if it is not one, to compare it to the string `value`.

`contains`
:   Satisfied if the Field is equal to, or contains a substring equal to, the provided `value`.
	For fields whose [JsonPath](#jsonpath) query returns a list of strings, it will be satisfied
	if the list contains the provided `value`.

`dateTimeAfter`/`dateTimeBefore`
:   Satisfied if the Field, parsed as a Zoned DateTime, compares with the provided DateTime.

	:::warning
	Must be a Date with Time.
	:::

	Supported formats for the Field and the value are:

	* [ISO_DATE_TIME](https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html#ISO_DATE_TIME)
	* [ISO_INSTANT](https://docs.oracle.com/javase/8/docs/api/java/time/format/DateTimeFormatter.html#ISO_INSTANT)
	* Unix EPOCH (assumed to be in milliseconds if year >=2970)

`exists`
:   Satisfied if the Field is non-null.
>Note: A bug exists that this setting still requires a value in the value field.  The value is ignored, and bug will be fixed in a future release.


`isA`
:   Satisfied if the *type* of the Field is one of these `values`:
	- `string`
	- `number`
	- `map`
	- `list`
	- `null`

## JsonPath/Templates
Many fields accept a JsonPath or Template string.
They will be evaluated as one or the other, based on the following critiera:
* **JsonPath:** If the string starts with `$`, the entire value will be treated as JsonPath.
* **Template:** If the string starts with `\$` or if the first character is anything other than `$`, it will be evaluated as a Template string.

You can use JsonPath to easily access JSON data content on its own, or use the Template mechanism to embed the JSON data within another string.

See below for some examples.

### JsonPath

JsonPath allows for very flexible event data extraction.

See [Path Examples](https://github.com/json-path/JsonPath#path-examples) in the JsonPath
repo for easy examples and inspiration.

When using JsonPath, the JSON Webhook event content can be referenced with the basic JsonPath expression of `$.`.

Given this example Webhook event content:

```json
{"foo":"bar"}
```

The data can be accessed like:

* `$.foo` -> evaluates to `bar`

:::tip
A JsonPath expression that evaluates to a data structure (list or map)
will return the data structure as serialized JSON.
:::

:::tip
If you want to embed a simple JsonPath expression within a larger string (for example, to add a prefix or suffix), you should use the [Template](#template) syntax.
:::

### Template
Template Strings use the Groovy "GString" expansion syntax, which is designed for embedding variable values into a string.

With in a Template, the JSON Webhook event content can be referenced with the variable name `data`.

GString Templates use the syntax `${VAR}` to expand to the value of the `VAR` variable, or `${VAR.key}` to access map entries or fields within the `VAR` variable.

Array access can be achieved with `${VAR.some.array[0]}`.

Given this example Webhook event content:

```json
{"foo":"bar"}
```

The data can be accessed in `${data}`:  
`The value is ${data.foo}` -> `The value is bar`

JsonPath can also be embedded in the Template string using the `${path('$.foo')}` syntax:

`The value is ${path('$.foo')}` -> `The value is bar`

## Debugging
![](~@assets/img/wh-debug-button-highlight.png)

The Advanced Run Job handler(and most Enterprise webhook handlers based in its action engine)
provides a debug view into webhook processing. Detailed evaluation results from recently received
webhook requests is made available to assist in setup and troubleshooting.
This view is accessible by pressing the `Debug` button at the top of the configuration.

::: tip Note
Debug information is *historical*. The information displayed including the batch key, events,
actions, and conditions are as they were when the webhook request was evaluated.
:::

### Overview
![](~@assets/img/wh-debug-batch-sample.png)

**Refresh**  
Clicking the refresh button will fetch the latest results. The selected result will automatically change
to the most recent.

**Select Received Webhook Request**  
The debug view offers a selection of recently received webhook payload requests from the past **24 hours**.
Each available option is labeled with the timestamp when it was recevied.

**Batch Key**  
This field will display the batch key if configured.

**Select Batch Event**  
If a batch key was specified a sub-select will be available to choose individual extracted events.

**Event**  
The received webhook request payload will be visible in the **Event** code box. For webhooks with batch keys
this will refelct the selected batch event.

**Action Results**
This section will display the action evaluation results for each configured action, for the selected event. It
will include the rendered job options, condition results with extracted request data, and the job run status.

### Action Results
![](~@assets/img/wh-debug-rule-results.png)

In this sample the action **was not satisfied** because one of the conditions did not match. The received webhook
is missing the property `$.fizz` which was required to *equals* `buzz`.

**Job Options**  
This section displays the configured job options rendered with the received wehook data.

**Conditions**  
A table is rendered summerizing the evaluation results of each condition. The `Condition Expression` column maps to
the configured `Event Field` and `Received Value` displays the value extracted from the webhook request.

### Errors
Errors encountered processing the webhook or running the job will be displayed in the debug view. Below are
a few common errors.

#### Job Already Running
![](~@assets/img/wh-debug-error-already-running.png)

This error is encountered if the job is not configured for parallel execution.

#### Batch Key Path Missing
![](~@assets/img/wh-debug-error-batch-missing.png)

If the the webhook is configured with a batch key, and the path does not exist, this error will appear.

#### Executions Disabled
![](~@assets/img/wh-debug-error-executions-disabled.png)

Encountered if the job could not be run due to Rundeck executions being disabled.

## FAQ
### How do I pass the raw event data to a job?
You can use the [JsonPath](#jsonpath) `$` as a job option value to send the event as a serialized
JSON. You can also send parts of the event by crafting a JsonPath that returns structured
data!
