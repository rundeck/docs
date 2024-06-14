# Overview of System Maintenance for On-Premise Servers
In managing a Rundeck server or Runbook Automation cluster, it is worth looking at log management and server tuning. The notes about execution logs are also relevant for Runbook Automation.<br>
### Managing and Pruning Logs
There are two different types of logs that need to be considered and managed.  First, there are system logs that are written and stored on each Rundeck server.  The second type of logs are the logs for each job execution, which are stored by default on the server but could be stored in an alternate location using the S3 plugin.<br>
#### Server System Logs
Server logs are managed using [log4j 2](/administration/configuration/config-file-reference.html#log4j2-properties-new-in-rundeck-3-3-x) and log size can be managed using [logrotate](https://github.com/logrotate/logrotate) on [Linux](/administration/maintenance/logs.html#rotation-of-service-log-linux) and [Windows](/administration/maintenance/logs.html#rotation-of-service-log-windows).  For more mature logging environments, it is also possible to [stream](/administration/maintenance/logs.html#streaming-log-plugins) these logs.  For debugging purposes, the main log to use when investigating is service.log.<br>
#### Execution Logs
Each time a job is executed, a log is written to the server for later review.  By default, these logs will continue to be written and over time this can cause an issue with disk-space so pruning logs on a regular basis is recommended.  This can be accomplished on a per-project basis by using a feature called [“Execution History Clean”](/manual/project-settings.html#execution-history-clean) which ought to be set up early for each project to avoid issues down the line. It is also beneficial to copy the execution logs to an off-server location, typically either an [S3-compatible](/administration/cluster/logstore/s3.html) storage location (using a tool such as [Minio](https://www.google.com/url?q=https://docs.rundeck.com/docs/learning/howto/S3-minio.html&sa=D&source=docs&ust=1686243395663522&usg=AOvVaw1te1RTq9NzBLf5u-9n9VRP)) or using [Azure Log Storage](/administration/cluster/logstore/azure.html).<br>
### Tuning the Server
There can be a number of different elements worth looking at to improve performance but there are three worth addressing from the beginning to prevent later server bottlenecks.<br>
#### [Increase number of file descriptors](/administration/maintenance/tuning-rundeck.html#file-descriptors)
One element that may be a limiter on Linux servers is the number of files that can be open at a time.  Updating the file descriptors can improve server performance.<br>
#### [Managing Java heap size](/administration/maintenance/tuning-rundeck.html#java-heap-size)
Java heap size controls how much memory is allocated to the server’s Java application. For a server with a large amount of system memory, try setting the maximum heap size to something like two-thirds of the total system memory (or half on Windows servers).<br>
#### [Adjusting Quartz job threadCount](/administration/maintenance/tuning-rundeck.html#quartz-job-threadcount)
This setting determines the maximum number of concurrent threads that can be run on the server.  By default, it is set fairly low so increasing this value can make the server more productive, especially for large numbers of concurrent jobs or jobs with large numbers of target nodes.<br>
## Resources
#### [Monitoring the server with JMX](/administration/maintenance/tuning-rundeck.html#jmx-instrumentation)
