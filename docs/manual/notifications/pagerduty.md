# PagerDuty Notifications Plugins (Enterprise)

PagerDuty notification plugins can be added to jobs within Rundeck so alerts go to PagerDuty. When one of the following conditions is met, it will create an event in PagerDuty:

- **On Start**: the job was started
- **On Success**: the job completed successfully
- **On Failure**: the job failed or was aborted
- **On Avg. Duration**: the execution exceeded the average duration of the job
- **On Retryable Failure**: the job failed but will be retried

## Send Event Notification

![PagerDuty - Notification Plugin](~@assets/img/pagerduty_notification.png)

The example photo above is for a notification following a job completing successfully. Select the PagerDuty plugin in a different section to have a different condition trigger the notification.

- **Dedupe Key**: This is the incident key
- **Integration Key**: In order to generate a new integration key, you need to add a new Rundeck integration into the service you wish to get notifications for
- **Action**: The action can be trigger, acknowledge or resolve based on the status of the event
- **Payload Severity**: Specify the severity
- **Images**: Provide the list of image URLs to include, separated by a comma

## Escalate Incident Notification

![PagerDuty - Escalate Incident Notification Plugin](~@assets/img/pd_escalate_notification.png)

- **API Key**: The API key for the account containing the incident.
- **Email**: A valid email associated with the account containing the incident.
- **Incident ID**: The ID of the incident you want to escalate
- **Escalation Level**: The level of the escalation policy to move the incident to.


## Run Response Play Notification

![PagerDuty - Escalate Incident Notification Plugin](~@assets/img/notification_runresponse.png)

- **Incident ID**: The ID of the incident to run a response play on.
- **Response Play ID**: The ID of the response play you would like to be run on the incident.
- **Email**: A valid email address associated with the account the incident is in.
- **API Key**: The API key for the account containing the incident.