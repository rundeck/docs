# Quiet Output

Quiets output which does or does not match a certain pattern by changing its log level. This filter does this by changing the loglevel of the output. It does not remove or delete any logs.

## Usage

There are four options for this log filter:

  - Pattern - regular expression tested against the logs of the attached job step. If this is left blank, all lines will match.
  - Test Log Level - Tests only against lines of the log level selected. Default is “Normal.” If “Any” is selected, all log levels will be tested.
  - Quiet Matched Output - if checked, shift loglevels of matching lines. Otherwise, quiet non-matching lines.
  - Result Log Level - Quieted lines will be changed to this log level. Default is “Verbose.”

By default, all Rundeck job step log results are published at the “Normal” loglevel. This filter can be used not just for quiescing log output, but promoting to a higher level as well.

::: tip
Rundeck log filters expect to read logs on the “Normal” loglevel. This means that applying this filter as a global log filter on a Rundeck job can affect other filters that process later than this one.
:::
