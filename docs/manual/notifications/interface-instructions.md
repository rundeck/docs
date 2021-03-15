# Notification Interface

## Creating A New Notification

The second iteration of the Rundeck notification user interface includes dropdowns to make creating a new notification more seamless for the user. Now, when creating a new notification for a job, you will be prompted to select from two dropdown menus:

![Notifications - Trigger](~@assets/img/notification-ontrigger.png)

 The first specifies the trigger for the notification (i.e. on start of the job, on successful completion of the job, on failure of the job, etc.). 

![Notifications - Type](~@assets/img/notification-type.png)
 The second dropdown menu will be where the user selects the type of notification they would like to receive (i.e. Email, Webhook, PagerDuty, Jira, etc.). 

 ## Reverting to the Legacy Interface

 There is an updated user interface for notifications in v3.3.4 and later. If you prefer to continue to use the legacy interface, set the following property in rundeck-config.properties:
 'rundeck.feature.notificationsEditorVue.enabled = false'

 If you decide that you would rather use the legacy interface you may run into issues.

 For more specific information on the types of notifications and in-depth instructions on how to use them, see [here](/manual/job-plugins.md#notifications).