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
