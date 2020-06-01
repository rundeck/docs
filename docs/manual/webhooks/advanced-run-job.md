# Advanced Run Job (Enterprise)

The powerful Enterprise Advanced Run Job webhook handler enables selective execution
of one or more jobs based by evaluating event data.

Each event passes through one or more routing rules. If the event satisfies the rule
conditions the target job will be executed with the supplied job options. Conditions and job
options can be constructed from event data!

## General Settings

![](~@assets/img/wh-routing-rule-overview.png)

### Batch Key (optional)
The batch key makes it possible to extract a list from
the event and run each item through the rule processing.

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

## Rules
![](~@assets/img/wh-routing-rule-rule-overview.png)
:::tip
Rules can be individually enabled/disabled!
:::

Each webhook event gets evaluated against each rule. If the rule satisfies the conditions the target job will be executed.

### Name (optional)
A label to identify the rule.

### Debug
Rule evaluation debug info can be printed to the `INFO` log level by selecting the debug option. This can make it easier to troubleshoot rules while reducing noise.

### Job
Use the job picker to select a job target. If the rule evaluation is a match the target
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

Each rule can have multiple Conditions. Based on the [Policy](#policy), the rule will apply when all or any of the conditions are satisfied.  Each Condition defines a Field selector using JsonPath, a particular match type (defined below), and a value.

![Oh noes :O](~@assets/img/wh-routing-rule-conditions-overview.png)

### Policy

When more than one Condition is added to the Rule, you can select which policy to use for evaluating the Conditions.

* **all** All conditions must match
* **any** At least one condition must match

### Match Types

`equals`
:   Satisfied if the Field _equals_ the value of
the provided `value` string. Note: currently the selected Field will be converted to a String if it is not one, to compare it to the string `value`.

`contains`
:   Satisfied if the Field is equal to, or contains a substring equal to, the provided `value`.

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


## FAQ
### How do I pass the raw event data to a job?
You can use the [JsonPath](#jsonpath) `$` as a job option value to send the event as a serialized
JSON. You can also send parts of the event by crafting a JsonPath that returns structured
data!
