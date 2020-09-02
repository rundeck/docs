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

This job step allows you to update an existing PagerDuty incident.

![Pager Duty - Incident Update](~@assets/img/pagerduty_update.png)

- **API Token**: The API token associated with the PagerDuty account
- **Email**: The email address associated with the API token
- **Incident ID**: The ID of the incident you want to add a note to
- **Status**: This is where you update the status (acknowledged or resolved)
- **Resolution**: If the incident was resolved, this is where you add the resolution notes
- **Assignees**: This is where you specify assignees, each separated by a comma


