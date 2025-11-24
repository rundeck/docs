# Slack Notification Plugin (Commercial)

The slack notification plugin offers Enterprise users the ability to send execution notifications to a certain slack channel given a certain event. When one of the following conditions is met, a notification will be sent to slack, depending which you chose:

- **On Start**: the job was started
- **On Success**: the job completed successfully
- **On Failure**: the job failed or was aborted
- **On Avg. Duration**: the execution exceeded the average duration of the job
- **On Retryable Failure**: the job failed but will be retried

![Slack - Notification Plugin](/assets/img/slack-notification.png)

- **Webhook Base URL**
: This is the base API URL to send the notification to. To find it, go to your slack app's dashboard. Select "Incoming Webhooks" and make sure the "Activate Incoming Webhooks" is set to on. Now that is is on, choose "Add new Webhook to Workspace" and choose the channel you would like the notifications to be posted in. After it is created, you will see a URL that looks like this:
`https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX`. 
Your base URL would look like this: `https://hooks.slack.com/services`

- **Webhook Token**
: This is the token used to validate your account. In the example URL above, the following would be your webhook token:
`T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX`. Anything after the `services/` should be places in this box. 

- **Slack Channel**
: This is the slack channel where you would like the notification to be posted. It should be in the following format: #slack-channel.

- **Custom Template Path**
  : This is the directory where custom FreeMarker (.ftl) templates can be loaded from.
  If left blank, Rundeck will automatically use: `${rdeck.base}/libext/templates`.

- **Custom Template**
  : This is the name of the .ftl file (template) to use when sending Slack messages.
  The plugin first attempts to load this file from the path defined in Custom Template Path.
  If the template is not found, the plugin will automatically fall back to its built-in default message format.