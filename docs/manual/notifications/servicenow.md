# ServiceNow&reg; Notification Plugins
::: enterprise
:::
<!---
Original:
http://support.rundeck.com/customer/en/portal/articles/2915300-servicenow-plugins)
--->

## ServiceNow / Incident / Comment

Rundeck Notification plugin to comment an incident

### Configuration

The ServiceNow connection credentials are set in the project.properties file
for your project.

```
project.plugin.Notification.Service-Now-Notification.login=user
project.plugin.Notification.Service-Now-Notification.password=s3cret
project.plugin.Notification.Service-Now-Notification.url=https://server.service-now.com
```

### Usage

To use the plugin, configure this mandatory input:

- incident key: ServiceNow incident ID.
- Comment: Comment to add.

## ServiceNow / Incident / Create

Rundeck Notification plugin that creates an incident

### Configuration

The ServiceNow&reg; connection credentials are set in the project.properties file
for your project.

```
project.plugin.Notification.Service-Now-Notification-Create.login=user
project.plugin.Notification.Service-Now-Notification-Create.password=s3cret
project.plugin.Notification.Service-Now-Notification-Create.url=https://server.service-now.com
```

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

Rundeck Notification plugin to create a ServiceNow&reg; Change

### Configuration

The ServiceNow&reg; connection credentials are set in the project.properties file
for your project.

```
project.plugin.Notification.Service-Now-Notification-Change-Create.login=user
project.plugin.Notification.Service-Now-Notification-Change-Create.password=s3cret
project.plugin.Notification.Service-Now-Notification-Change-Create.url=https://server.service-now.com
```

### Usage

To use the plugin, configure this mandatory input:

- assignment group: ServiceNow&reg; incident ID.
- state: State code. If not set, the change will be in New status.
