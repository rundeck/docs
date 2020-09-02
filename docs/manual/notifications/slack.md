# Slack Notification

Rundeck users have the option of sending notifications about a job execution to slack. They can send the notification for each of the following scenarios:

- **On Start**: the job was started
- **On Success**: the job completed successfully
- **On Failure**: the job failed or was aborted
- **On Avg. Duration**: the execution exceeded the average duration of the job
- **On Retryable Failure**: the job failed but will be retried

![Slack Notification](~@assets/img/slack-notification.png)

- **Webhook Base URL**
: This is the URL where you would like to have the webhook sent. To find it, go to your app's management dashboard, select "Incoming Webhooks" and click "Activate Incoming Webhooks." Now, select "Add New Webhook to Workspace" and choose the channel you want to receive the notifications. The first part is going to be the URL: https://hooks.slack.com/services. The rest we will use for the token.

- **Webhook Toker**
: Now that you have entered the URL, you can take your token from the end of the link. The token begins after "services/". It should look something like this T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX.

- **Slack Channel**
: This is the channel you want the notifications sent to. Should be in the following format: #this-channel
