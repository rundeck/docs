# Missed Job Fires (Enterprise Only)
::: enterprise
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

Misfire detection is enabled by default.  If there is a need to change settings use the information below.

> Note: Please make sure all the systems in your cluster have the same configuration. Otherwise, you may experience unexpected results.

1. Open **System Menu > Configuration Management**
1. Click **Add Config**
1. Add the setting from the list below that needs to be changed.

![Job Misfire Config](@assets/img/misfire-config-mgmt.png)

[More information about Configuration Management](/manual/configuration-mgmt/configmgmt.md)

Alternatively it's possible to configure the Missed Job Fires feature by adding the following settings in [`rundeck-config.properties`](/administration/configuration/config-file-reference.html#rundeck-config-properties):

```properties
#Enable the misfire marking feature
rundeck.feature.misfireDetection.enabled=true
#Set the threshold at which a schedule will be marked as missed. Default is 60000ms. The value should be in milliseconds.
rundeck.scheduler.misfire.threshold=60000
#Set the rate at which the server will check for misfires. Default is 60000ms. The value should be in milliseconds.
rundeck.scheduler.misfire.checkRate=60000
```
