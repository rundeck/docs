# PagerDuty Job Steps (Enterprise)

## What is PagerDuty?

PagerDuty is a software that provides incident response management services to IT operations teams. When an incident is created, PagerDuty makes it easy for IT teams to track that incident for the duration of its life. The Rundeck and PagerDuty integration allows teams to run diagnostic and corrective actions to minimize the duration of the incident, as well as get event notifications within PagerDuty.

## PagerDuty Incident Note

This job step allows you to add a note to an existing PagerDuty incident.

![PagerDuty - Add Note](~@assets/img/pagerduty_note.png)

- **API Token**: The API token associated with the PagerDuty account. In PagerDuty go to Configuration, select API access and either create a new key or use an existing one. 
- **Email**: The email address associated with the API token
- **Incident ID**: The ID of the incident you want to add a note to
- **Note**: The note you want to add to the incident

## PagerDuty Escalate Incident

![PagerDuty - Escalate Incident](~@assets/img/pagerduty-escalate-incident.png)

- **API Key**
: The API key for the account that contains the incident you would like to update.

- **Email**
: A valid email associated with the account of the API key. This is required.

- **Escalation Leve**
: The level of the escalation policy that you would like the incident to be escalated to.

- **Incident ID**
: The ID of the incident that you would like to run the response play for.

## PagerDuty Run Response Play

![PagerDuty - Run Response Play](~@assets/img/pagerduty-run-response-play.png)

- **API Key**
: The API key for the account that contains the incident you would like to update.

- **Email**
: A valid email associated with the account of the API key. This is required.

- **Response Play ID**
: The ID of the response play that you would like to be run in response to the incident.

- **Incident ID**
: The ID of the incident that you would like to run the response play for.

## PagerDuty Send Event 

![PagerDuty - Send Event](~@assets/img/pagerduty-send-event.png)

- **Dedupe Key**
: If a dedupe key is specified, it applies all events with matching dedupe key to the same open alert

- **Integration Key**
: This is the integration key for the account where the incident is

- **Event Action**
: These are the actions you can take when creating the event. The options are trigger, acknowledge, and resolve. 

- **Severity**
: This is the current severity level of the event. The options are critical, warning, error, info.

- **Event Summary**
: This is the summary for the event. The default sends execution information as the summary, but you can update it to send whatever you would like.

- **Source**
: This is the source that created the event. By default, it is the job name, but you can put anything you want.

- **Component**
: This is where you can specify the part or component of the affected system is broken. 

- **Group**
: If something is specified here, it allows for a cluster or grouping of sources. For example, sources "prod-datapipe-02" and "prod-datapipe-03" might both be part of "prod-datapipe".

- **Class**
: The class/type of the event.

- **Images**
: This is a comma separated list of image URLS to include in the event.

## PagerDuty Update Status

This job step allows you to update the status of an existing PagerDuty incident.

![PagerDuty - Update Status](~@assets/img/pagerduty_status.png)

- **API Token**: The API token associated with the PagerDuty account
- **Email**: The email address associated with the API token
- **Incident ID**: The ID of the incident you want to add a note to
- **Message**: This is where you update the status (acknowledged or resolved)

## PagerDuty Incident Update

This job step allows you to update an existing PagerDuty incident.

![PagerDuty - Incident Update](~@assets/img/pagerduty_update.png)

- **API Token**: The API token associated with the PagerDuty account
- **Email**: The email address associated with the API token
- **Incident ID**: The ID of the incident you want to add a note to
- **Status**: This is where you update the status (acknowledged or resolved)
- **Resolution**: If the incident was resolved, this is where you add the resolution notes
- **Assignees**: This is where you specify assignees, each separated by a comma

## PagerDuty Get Incident

![PagerDuty - Get Incident](~@assets/img/pd-get.png)

- **Incident ID**: The ID of the Incident you would like to get information on.
- **API Key**: The API key for the account that contains the incident you would like to update.

:::warning
The following job steps require that you specify the key path in either project settings (e.g. project.pagerduty.api_key_path=keys/pd/api) or framework.properties (e.g. pagerduty.api_key_path=keys/pd/api) before running the step as it need to pull users/escalation policies specific to your account.
:::

## PagerDuty Update Escalation Policy

This job step allows you to update the escalation policy on a given incident. 

![PagerDuty - Update Escalation](~@assets/img/pd-update-escalation.png)

- **Escalation Policy**: This is the new escalation policy that you would like the incident to use.
- **Incident ID**: The ID of the incident that you would like to update the escalation policy on. 
- **API Key**: The API key for the account that contains the incident you would like to update.


## PagerDuty Add Additional Responders

This job step allows you to specify another escalation policy or another user to assign to an incident. 

![PagerDuty - Update Escalation](~@assets/img/pd-add.png)

- **Escalation Policy**: This is the new escalation policy that you would like the incident to use.
- **Incident ID (required)**: The ID of the incident that you would like to update the escalation policy on. 
- **API Key (required)**: The API key for the account that contains the incident you would like to update.
- **User**: The user that you would like to assign to the incident.
- **Message (required)**: A message you would like to include when notifying the new responders
- **Requester**: The person requesting the new responders. This user must match the API key you specified in key storage.
