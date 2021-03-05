# Job Notifications

Job notifications are messages triggered by a job event.
You can configure notifications to occur based on different job events or statuses and choose the notification plugin to use like send email, or call webhook.

## Notification Events

- **Start**: When the Job starts, all "start" notifications will be triggered.
- **On Success**: When the Job finishes executing, all "success" notifications will be triggered if the Job is successful.
- **On Failure**: All "failure" notifications will be triggered if the Job fails or is cancelled.
- **On Retryable Failure**: all "failure" notifications that are retryable will be triggered if the Job fails.
- **Average Duration Exceeded**: Sends a notification when the specified duration threshold has been exceeded. If not specified, the Job Average duration will be used. (See below information for configuration options)

![Notification Events List](~@assets/img/notifications-events.png)


### Configuring Average Duration Exceeded
Percentage of average: 20%
Time delta from the average: +20s, +20
Absolute time: 30s, 5m Use s,m,h,d,w,y etc as time units for seconds, minutes, hours, etc. Unit will be seconds if it is not specified.
NoteCan include option value references like ${option.avgDurationThreshold}.

##  Notification Types:

Notification Types the actions that can be performed at each of the events above.

For a full list of notification plugins, see [Job Plugins - Notifications](/manual/job-plugins.md#notifications)

## Configuring Notifications

- Click the Notifications tab of the job.
- Choose the event for your notification and click the `+ Add Notification` button.
- Choose the **Notification Type** from the drop down and configure it per the specific plugin details.

![Notification Events Types](~@assets/img/notifications-addtype.png)
