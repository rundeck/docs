# Key-Value Data

The Key Value Data log filter can parse the output of a workflow step with a regular expression to create a key/value data that is exported to the workflow as a context variable for use in later workflow steps.

::: tip
By default, this plugin captures only the first match per line of log output. To capture multiple matches from a single log line, enable the **Allow Multiple Matches** option.

If you want to capture multiple lines of output, see 
the [Multiline Regex Capture](/manual/log-filters/multi-line-regex.md#usage) plugin.
:::

## Usage

There are only three configuration components:
  - Pattern
  - Name Data
  - Log Data (Checkbox)
  - Match Substrings (Checkbox)
The main configuration components are:
  - **Pattern** - Regular expression with capture groups
  - **Name Data** - Variable key name (used with single capture group)
  - **Log Data** - Display captured data in logs (Checkbox)
  - **Allow Multiple Matches** - Capture multiple matches per line (Checkbox)

### Pattern Matching

The Pattern field matches a regular expression and looks for one or two Capture Groups. If there are two Capture Groups, the first will be mapped to a Rundeck variable key in the data context, while the second will be the value. If there is only one Capture Group, the match will be the value.

#### Advanced Options

Under the Advanced section, there is an **Invalid Character Pattern**. This is a regular expression that matches unwanted characters in the matched value of the Pattern field. By default, Rundeck filters out whitespace and characters typical of Rundeck variable calls like `$, {, }, and \`.

### Name Data

The Name Data field is only used when a single Capture Group is defined in the regex statement. The value of that field will be used as the variable key.  The variable value will be the content from the Capture Group.

### Log Data

Log Data is a checkbox that, if checked, will add tabular output of what is captured in the filter to the log output of the job that the filter is attached to.

Match Substrings is a checkbox that, if checked, will allow the Pattern to match substrings within a line of log output. If unchecked, the Pattern must match the entire line of log output.

By default, the pattern field is set to: `^RUNDECK:DATA:(.+?)\s*=\s*(.+)$`
### Allow Multiple Matches

When enabled, this option allows the plugin to capture multiple key-value pairs from a single log line. This is useful when:
- Processing log lines with multiple key=value pairs (e.g., `user=john role=admin session=abc123`)
- Extracting multiple IDs from formatted logs (e.g., `Processing ID:123, ID:456, ID:789`)
- Capturing repeated patterns in structured logs

## Examples

### Single Match 

![](/assets/img/logfilter-keyvalue-example1.png)

The log filter in this example is fully default, with the Log Data field checked:

![](/assets/img/logfilter-keyvalue-example2.png)

The output when the job runs looks like this:

![](/assets/img/logfilter-keyvalue-example3.png)

In later job steps, refer to `$data.EXIP` in commands, or `@data.EXIP@` in scripts for the _10.1.1.2_ value.

### Multiple Matches Example

When you need to capture multiple key-value pairs from a single log line, enable the **Allow Multiple Matches** checkbox.

#### Example 1: Multiple Key-Value Pairs

Consider a log line like:
```
RUNDECK:DATA:user=john RUNDECK:DATA:role=admin RUNDECK:DATA:session=abc123
```

With the following configuration:
- **Pattern**: `(\w+)=([^\s]+)`
- **Match Substrings**: Enabled
- **Allow Multiple Matches**: Enabled
- **Log Data**: Enabled

The filter will capture:
- `$data.user` = `john`
- `$data.role` = `admin`
- `$data.session` = `abc123`

#### Example 2: Extracting Multiple IDs

For a log line like:
```
Processing IDs: ID:123, ID:456, ID:789
```

**Option A: Using single capture group with Name Data**

With the configuration:
- **Pattern**: `ID:(\d+)`
- **Name Data**: `ID`
- **Match Substrings**: Enabled
- **Allow Multiple Matches**: Enabled

The filter will capture:
- `$data.ID` = `789` (only the last value is retained since all have the same key)

**Option B: Using two capture groups**

With the configuration:
- **Pattern**: `(ID):(\d+)`
- **Match Substrings**: Enabled
- **Allow Multiple Matches**: Enabled

The filter will capture:
- `$data.ID` = `789` (only the last value is retained since all have the same key)

**Option C: Creating unique keys**

To capture all values with unique keys, modify your log output to include an index like `ID1:123, ID2:456, ID3:789`, then use:
- **Pattern**: `(ID\d+):(\d+)`
- **Match Substrings**: Enabled
- **Allow Multiple Matches**: Enabled

This will create:
- `$data.ID1` = `123`
- `$data.ID2` = `456`
- `$data.ID3` = `789`

::: warning
When multiple matches use the same key name, only the last value is retained. To preserve all values, ensure each match creates a unique key (see Option C).
:::

#### Example 3: Structured Log Format

For application logs with multiple attributes:
```
[INFO] Request processed: method=POST status=200 duration=150ms user_id=42
```

With the configuration:
- **Pattern**: `(\w+)=(\S+)`
- **Match Substrings**: Enabled
- **Allow Multiple Matches**: Enabled
- **Log Data**: Enabled

The filter will capture:
- `$data.method` = `POST`
- `$data.status` = `200`
- `$data.duration` = `150ms`
- `$data.user_id` = `42`

## See Also

* [Multiline Regex Capture](/manual/log-filters/multi-line-regex.md#usage) which can capture multiple lines of log output into a data variable.
