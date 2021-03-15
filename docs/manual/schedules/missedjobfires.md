# Missed Job Fires (Enterprise Only)
::: enterprise
:::

:::warning Beta Feature
  This feature is currently available as a Beta feature offering.  It is not enabled by default.  Follow steps below to turn it on.
:::

Scheduled business tasks are essential to internal processes that keep the business running (Financial operations, inventory operations, fulfillment requests, etc.) Scheduled operations tasks are essential to keeping infrastructure running (rotating logs, cleaning up temp files, restarting known faulty services, validating configuration and security settings/conditions, etc.). Unknowingly missing either is a business continuity issue. Also unknowingly missing a run and then running again can cause bigger problems. (data corruption, bad configuration, runaway processes, etc)

Missed Jobs marking will keep track of the jobs scheduled, and if one of the jobs doesn't run at the time when it was scheduled
to run, an execution with a status of "missed" will be added to the activity page. Additionally, if the job is configured with a failure notification, the notification
will be triggered reporting that the job was missed.

:::tip
This feature does not try to deduce from the job's cron expression how many times the job should've run between the time the server went down, and when the misfire was detected.
You will only get 1 entry or triggered notification in the event that a schedule was missed.
:::

### Configuration

Please make sure all the systems in your cluster have the same configuration. Otherwise, you may experience unexpected results.

Configure the Missed Job marking feature by adding the following settings in [`rundeck-config.properties`](/administration/configuration/config-file-reference.html#rundeck-config-properties):

```properties
#Enable the misfire marking feature
rundeck.feature.misfireDetection.enabled=true
#Set the threshold at which a schedule will be marked as missed. Default is 60000ms. The value should be in milliseconds.
rundeck.scheduler.misfire.threshold=60000
#Set the rate at which the server will check for misfires. Default is 60000ms. The value should be in milliseconds.
rundeck.scheduler.misfire.checkRate=60000
```
