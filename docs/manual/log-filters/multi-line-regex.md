# Multiline Regex Capture

This log filter creates a Rundeck data variable and fills the contents of that variable via a regular expression.

Provide a regex match with a pattern, and the filter will match against every line in the log returns for that pattern. Every matching value for that pattern will be added to a variable in the data context ( $data.key ) for later steps in the job.

Like the Key Value Data log filter, one capture group is required. Optionally, two capture groups can be provided. If two are provided, then the first match will be the key for each line, while the second will be added as a value. Otherwise, for one capture group, the user must provide a key in the “Name Data” field.

## Usage

This log filter has four fields to configure:

  - Pattern - required. The value is a regular expression that must contain either one or two capture groups, as described above.
  - Name Data - optional. If only one capture group is provided in the Pattern field, then Name Data must have a value. If filled, then this field will be the key for any created key-value pairs.
  - Hide Output - checkbox. If true, log output for the attached job step will be hidden.
  - Log Data - checkbox. If true, the captured data will be passed along in the job log.

::: tip
When multiple values match, then $data.key will equal all of the matched values, separated by a newline.
:::
