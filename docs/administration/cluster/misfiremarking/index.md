# Misfire Marking

Misfire marking is a feature that will keep track of the jobs scheduled in your cluster, and if one of the jobs doesn't run at the time when it was scheduled
to run, an execution with a status of "missed" will be added to the activity page. Additionally, if the job is configured with a failure notification, the notification
will be triggered reporting that the job was missed.

:::tip 
This feature does not try to deduce from the job's cron expression how many times the job should've run between the time the server went down, and when the misfire was detected.
You will only get 1 entry or triggered notification in the event that a schedule was missed.
:::

### Configuration

Please make sure all the systems in your cluster have the same configuration. Otherwise, you may experience unexpected results.

Configure the misfire marking feature by adding the following settings in `rundeck-config.properties`:

```properties
#Enable the misfire marking feature
rundeck.feature.misfireDetection.enabled=true
#Set the threshold at which a schedule will be marked as missed. Default is 60000ms. The value should be in milliseconds.
rundeck.scheduler.misfire.threshold=60000
#Set the rate at which the server will check for misfires. Default is 60000ms. The value should be in milliseconds.
rundeck.scheduler.misfire.checkRate=60000
```
