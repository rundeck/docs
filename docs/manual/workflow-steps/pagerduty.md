# Pager Duty Job Steps (Enterprise)

## What is PagerDuty?

PagerDuty is a software that provides incident response management services to IT operations teams. When an incident is created, PagerDuty makes it easy for IT teams to track that incident for the duration of its life. The Rundeck and PagerDuty integration allows teams to run diagnostic and corrective actions to minimize the duration of the incident, as well as get event notifications within PagerDuty.

## Pager Duty Incident Note

This job step allows you to add a note to an existing PagerDuty incident.

![Pager Duty - Add Note](~@assets/img/pagerduty_note.png)

- **API Token**: The API token associated with the PagerDuty account. In PagerDuty go to Configuration, select API access and either create a new key or use an existing one. 
- **Email**: The email address associated with the API token
- **Incident ID**: The ID of the incident you want to add a note to
- **Note**: The note you want to add to the incident

## Pager Duty Update Status

This job step allows you to update the status of an existing PagerDuty incident.

![Pager Duty - Update Status](~@assets/img/pagerduty_status.png)

- **API Token**: The API token associated with the PagerDuty account
- **Email**: The email address associated with the API token
- **Incident ID**: The ID of the incident you want to add a note to
- **Message**: This is where you update the status (acknowledged or resolved)

## Pager Duty Incident Update

This job step allows you to update an existin PagerDuty incident.

![Pager Duty - Incident Update](~@assets/img/pagerduty_update.png)

- **API Token**: The API token associated with the PagerDuty account
- **Email**: The email address associated with the API token
- **Incident ID**: The ID of the incident you want to add a note to
- **Status**: This is where you update the status (acknowledged or resolved)
- **Resolution**: If the incident was resolved, this is where you add the resolution notes
- **Assignees**: This is where you specify assignees, each separated by a comma

# Pager Duty Notifications Plugin (Enterprise)

A PagerDuty notification plugin can be added to jobs within Rundeck so alerts go to pager duty. When one of the following conditions is met, it will create an event in PagerDuty:

- **On Start**: the job was started
- **On Success**: the job completed successfully
- **On Failure**: the job failed or was aborted
- **On Avg. Duration**: the execution exceeded the average duration of the job
- **On Retryable Failure**: the job failed but will be retried

![Pager Duty - Notification Plugin](~@assets/img/pagerduty_notification.png)

The example photo above is for a notification following a job completing successfully. Select the PagerDuty plugin in a different section to have a different condition trigger the notification.

- **Dedupe Key**: This is the event ID
- **Integration Key**: In order to generate a new integration key, you need to add a new Rundeck integration into the service you wish to get notifications for
- **Action**: The action can be trigger, acknowledge or resolve based on the status of the event
- **Payload Severity**: Specify the severity
- **Images**: Provide the list of image URLs to include, separated by a comma




