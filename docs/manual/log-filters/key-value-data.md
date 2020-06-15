# Key-Value Data

The Key Value Data log filter can parse the output of a workflow step with a regular expression to create a key/value data that is exported to the workflow as a context variable for use in later workflow steps.

::: tip
This plugin can only capture data values which are logged within a single line of log output.

If you want to capture multiple lines of output, see 
the [Multiline Regex Capture](/manual/log-filters/multi-line-regex.html#usage) plugin.
:::

## Usage

There are only three configuration components:
  - Pattern
  - Name Data
  - Log Data (Checkbox)

The Pattern field matches a regular expression and looks for one or two Capture Groups. If there are two Capture Groups, the first will be mapped to a Rundeck variable key in the data context, while the second will be the value. If there is only one Capture Group, the match will be the value.

The Name Data field is only used when a single Capture Group is defined in the regex statement. The value of that field will be used as the variable key.  The variable value will be the content from the Capture Group.

Log Data is a checkbox that, if checked, will add tabular output of what is captured in the filter to the log output of the job that the filter is attached to.

By default, the pattern field is set to: `^RUNDECK:DATA:(.+?)\s*=\s*(.+)$`

This will match output of the attached job if there is a line in the log output that begins with _RUNDECK:DATA:foo=value1_. The data is available in later job steps as the Rundeck variable `$data.foo` with a value of everything after the equals sign to the end of the line. So in this case, the value of `$data.foo` would be _value1_.

Under the Advanced section, there is also an Invalid Character Pattern. This is a regular expression that matches unwanted characters in the matched value of the Pattern field. By default, Rundeck filters out whitespace and characters typical of Rundeck variable calls like `$, {, }, and \`.

## Examples

![](@assets/img/logfilter-keyvalue-example1.png)

The log filter in this example is fully default, with the Log Data field checked:

![](@assets/img/logfilter-keyvalue-example2.png)

The output when the job runs looks like this:

![](@assets/img/logfilter-keyvalue-example3.png)

In later job steps, refer to `$data.EXIP` in commands, or `@data.EXIP@` in scripts for the _10.1.1.2_ value.

## See Also

* [Multiline Regex Capture](/manual/log-filters/multi-line-regex.html#usage) which can capture multiple lines of log output into a data variable.
