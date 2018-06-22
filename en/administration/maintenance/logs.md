% Logs

Depending on the installer used, the log files will be under a base
directory:

*   RPM: `/var/log/rundeck`
*   Launcher: `$RDECK_BASE/server/logs`

The following files will be found in the log directory:

     .
     |-- command.log
     |-- rundeck.audit.log
     |-- rundeck.jobs.log
     |-- rundeck.options.log
     |-- rundeck.log
     `-- service.log

Different facilities log to their own files:

* `command.log`: Shell tools log their activity to the command.log
* `rundeck.audit.log`: Authorization messages pertaining to aclpolicy
* `rundeck.job.log`: Log of all job definition changes
* `rundeck.options.log`: Logs remote HTTP requests for Options JSON data
* `rundeck.log`: General Rundeck application messages
* `service.log`: Standard input and output generated during runtime

See the [#log4j.properties](../configuration/configuration-file-reference.html#log4j.properties) section for information 
about customizing log message formats and location.

## Streaming log plugins

Streaming log plugins have two forms:

Streaming Log Writers
:   can write log data to another system (e.g. a search or log storage system) as the log data is received.  Multiple Log Writers can be configured for a server, and Rundeck's filesystem-based log writer is used by default.

Streaming Log Readers
:   can load the log data from another system, rather than from the local file system.  Only a single Log Reader can be configured for the a server, and Rundeck's filesystem-based log reader is used by default.

To learn how to develop your own Logging plugin
see [Plugin Developer Guide - Logging Plugin](../../developer/logging-plugin.html).
