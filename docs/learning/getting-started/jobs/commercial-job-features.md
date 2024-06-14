# Commercial Job Features
While most of what has been covered in this Jobs 101 guide has been true for Rundeck, as well as the commercial products under Runbook Automation, there are a few commercial-only features related to Jobs that are worth mentioning.<br>
## Job logic - ruleset strategy
Unlike the relatively simple strategies used in Rundeck (Node First, Parallel and Sequential), Ruleset Strategy provides a method for customizing how workflows will execute in a much more refined manner.  It includes a [scripting language](/manual/workflow-strategies/ruleset.md#writing-rules) to define the Job behavior. This allows you to skip steps and make decisions in case of a specific option value, etc.  In general, if you can think of a way to change how your workflow runs, it is probably possible to do it with a ruleset.<br>
![](/assets/img/commercialfeatures1.gif)<br>
Example of a Ruleset Strategy in the commercial products<br>
## Project Schedules
[As discussed previously](/learning/getting-started/jobs/pieces-of-a-job.md#schedule), any Job can have a schedule associated with it, allowing it to run on some predictable schedule. Using the advanced crontab scheduling options, it is possible to set up a more complex schedule, but each Job is still limited to a single schedule. The project schedules available in the commercial products allow a Job to be executed on more than one schedule at a time.<br>
Where traditional schedules are part of the Job definition and get stored as part of a definition file, project schedules are created and maintained at the Project level instead.  Project schedules give users the ability to manage when Jobs are run with much more granularity. They can be applied to multiple Jobs and multiple schedules could be applied to a single Job.  Managing schedules at the Project level makes them easier to maintain and makes it easier to see and/or modify existing schedules from a single location.<br>
## Calendars
[Calendars](/manual/calendars.md#calendars) are another time-related feature in the commercial products that can be maintained at the project or system level. Calendars are applied to scheduled Jobs and either identify specific blackout windows or allowed windows.  Blackout windows will prevent execution during a specific window of all or some scheduled Jobs.  Allowed windows identify windows during which scheduled Jobs may be run and otherwise no schedules could run.<br>
## Job replication for DR
For situations where it’s necessary to maintain a backup server or cluster for disaster recovery purposes, the self-hosted commercial product, PagerDuty Runbook Automation, comes with two plugins that help syncing data to that backup server set. The Job Replication plugin uses SCM to copy updates to Jobs within a project to a comparable project in the DR environment. The Execution Replication plugin copies execution history in a comparable way.<br>
## Copying a Job directly to another project
Though it is relatively easy in all versions of the product to copy a Job from one project or server to another one, the commercial products include an option to copy a Job directly from one project to another without needing to export the Job definition.<br>
## Commercial node sources
Based on the needs of enterprise customers, the commercial Runbook Automation products include several node sources that are not available in Rundeck. The following is a partial list of those node sources:<br>
[Amazon ECS-Fargate](/manual/projects/resource-model-sources/ecs-fargate.md)<br>
[Datadog](/manual/projects/resource-model-sources/datadog.md)<br>
[ServiceNow](/manual/projects/resource-model-sources/servicenow.md)<br>
[Sensu](/manual/projects/resource-model-sources/sensu.md#setup)<br>
[VMWare](/manual/projects/resource-model-sources/vmware.md)<br>
Additionally, Runbook Automation comes with a special static node source called the [Node Wizard](/manual/projects/resource-model-sources/node-wizard.md).  Rather than connecting to an external source of information, the Node Wizard provides an easy-to-use interface to create and maintain a set of nodes directly in the web interface.<br>