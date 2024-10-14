# ServiceNow&reg; Notification Plugins
::: enterprise
:::
<!---
Original:
http://support.rundeck.com/customer/en/portal/articles/2915300-servicenow-plugins)
--->

To configure authentication with ServiceNow for these notification plugins, follow the steps outlined in [ServiceNow Plugins Overview](/manual/plugins/servicenow-plugins-overview.md)
 to set credentials at either a System or Project level.

## ServiceNow / Incident / Comment

Notification plugin to comment an incident.

### Usage

To use the plugin, configure this mandatory input:

- incident key: ServiceNow incident ID.
- Comment: Comment to add.

## ServiceNow / Incident / Create

Notification plugin that creates an incident.

### Usage

To use the plugin, configure this mandatory input:

- caller: the username of the assigned Caller field of the Incident.

These inputs are optional and if left empty the default value of Service now it's going to be used

- urgency: A number representing the urgency of the incident (usually being 1 the most urgent)
- impact: A number representing the impact of the incident (usually being 1 the higher urgent)
- priority: A number representing the priority of the incident (calculated from urgency and impact)
- Assignment Group: Assignment Group. If not set, no value will be sent
- Description: Description to be used

## ServiceNow / Change / Create

Notification plugin to create a ServiceNow Change.

### Usage

To use the plugin, configure this mandatory input:

- assignment group: ServiceNow&reg; incident ID.
- state: State code. If not set, the change will be in New status.
