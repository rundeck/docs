# Key-Value Data

Captures simple Key/Value data using a simple text format
from a regular expresssion.

By default, to produce a key/value entry, echo a line similar to this:

    RUNDECK:DATA:(key) = (value)

Where `(key)` is the key name, and `(value)` is the value.

If you provide a regular expression with only one group, the `name` input is required.

You can define the regular expression used.

## Configuration

Pattern
: Regular Expression for matching key/value data. Default: `^RUNDECK:DATA:(.+?)\s*=\s*(.+)$`

Name Data
: Regular Expression for matching key/value data.

    The regular expression must define two Capturing Groups. The first group matched defines
    the data key, and the second group defines the data value.

    See the [Java Pattern](https://docs.oracle.com/javase/8/docs/api/java/util/regex/Pattern.html) documentation.

Log Data
: If true, log the captured data
