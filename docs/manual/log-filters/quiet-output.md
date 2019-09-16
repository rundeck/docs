# Quiet Output

Quiets all output which does or does not match a certain pattern by changing its log level.

## Configuration

Pattern
: Regular Expression to test. If blank, all lines will match. See the [Java Pattern](https://docs.oracle.com/javase/8/docs/api/java/util/regex/Pattern.html) documentation.

Test Log Level
: Test the pattern against only log lines of the given log level. (Default: normal). If `any` is specified, all log levels will be tested.

Quiet Matched Output
: If true, quiet matching lines. Otherwise quiet non-matching lines

Result Log Level
: Quieted lines will be changed to this log level. (Default: verbose)
