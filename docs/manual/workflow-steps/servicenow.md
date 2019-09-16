# ServiceNow Plugins

<!---
Original:
http://support.rundeck.com/customer/en/portal/articles/2915300-servicenow-plugins)
--->

## Service Now / Incident / Update State

Rundeck workflow step that changes an incident state

### Configuration

The Service Now connection credentials are set in the project.properties file
for your project.
Password it's a keystorage path to the password.

```
project.plugin.WorkflowStep.Service-Now-Incident-Change-State.url=https://server.service-now.com
project.plugin.WorkflowStep.Service-Now-Incident-Change-State.login=user
project.plugin.WorkflowStep.Service-Now-Incident-Change-State.password-key-storage-path=keys/servicenow/pass
```

or in `framework.properties`

```
servicenow.url=https://server.service-now.com
servicenow.login=user
servicenow.password-key-storage-path=keys/servicenow/pass
```

### Usage

To use the plugin, configure the following mandatory inputs.

- number: The Incident number to be updated.
- newState: The new state of the Incident. It can be the number of the state or the description.

### Adding dynamic list data

With these settings, at project level, the field `state` can be loaded dynamically (calling SN API), for example:

```
project.plugin.WorkflowStep.Service-Now-Incident-Change-State.url=https://server.service-now.com
project.plugin.WorkflowStep.Service-Now-Incident-Change-State.login=user
project.plugin.WorkflowStep.Service-Now-Incident-Change-State.password-key-storage-path=keys/servicenow/pass

```

## Service Now / Incident / Check Assigned

Rundeck workflow step that checks assigned incidents

### Configuration

The Service Now connection credentials are set in the project.properties file
for your project.
Password it's a keystorage path to the password.

```
project.plugin.WorkflowStep.Service-Now-Incident-Check-Assigned.login=user
project.plugin.WorkflowStep.Service-Now-Incident-Check-Assigned.password-key-storage-path=keys/servicenow/pass
project.plugin.WorkflowStep.Service-Now-Incident-Check-Assigned.url=https://server.service-now.com
```

or in `framework.properties`

```
servicenow.url=https://server.service-now.com
servicenow.login=user
servicenow.password-key-storage-path=keys/servicenow/pass
```

### Usage

To use the plugin, configure the following mandatory inputs.

- caller: the username of the Caller field on the Incident.

This input is optional

- state: If you want you can enter a state number or description to add to the search, this way the incidents
  assigned to the caller only on this state are going to be considered.

## Service Now / Incident / Check State

Rundeck workflow step that checks an incident state

### Configuration

The Service Now connection credentials are set in the project.properties file
for your project.
Password it's a keystorage path to the password.

```
project.plugin.WorkflowStep.Service-Now-Incident-Check-State.login=user
project.plugin.WorkflowStep.Service-Now-Incident-Check-State.password-key-storage-path=keys/servicenow/pass
project.plugin.WorkflowStep.Service-Now-Incident-Check-State.url=https://server.service-now.com
```

or in `framework.properties`

```
servicenow.url=https://server.service-now.com
servicenow.login=user
servicenow.password-key-storage-path=keys/servicenow/pass
```

### Usage

To use the plugin, configure the following mandatory inputs.

- number: The Incident number to be checked.
- state: The state to be checked. It can be the number of the state or the description.

### Adding dynamic list data

With these settings, at project level, the field `state` can be loaded dynamically (calling SN API), for example:

```
project.plugin.WorkflowStep.Service-Now-Incident-Check-State.login=user
project.plugin.WorkflowStep.Service-Now-Incident-Check-State.password-key-storage-path=keys/servicenow/pass
project.plugin.WorkflowStep.Service-Now-Incident-Check-State.url=https://server.service-now.com

```

## Service Now / Incident / Comment

Rundeck workflow step that comments an incident

### Configuration

The Service Now connection credentials are set in the project.properties file
for your project.
Password it's a keystorage path to the password.

```
project.plugin.WorkflowStep.Service-Now-Comment.login=user
project.plugin.WorkflowStep.Service-Now-Comment.password-key-storage-path=keys/servicenow/pass
project.plugin.WorkflowStep.Service-Now-Comment.url=https://server.service-now.com
```

or in `framework.properties`

```
servicenow.url=https://server.service-now.com
servicenow.login=user
servicenow.password-key-storage-path=keys/servicenow/pass
```

## Service Now / Incident / Create

Rundeck workflow step that creates an incident

### Configuration

The Service Now connection credentials are set in the project.properties file
for your project.
Password it's a keystorage path to the password.

```
project.plugin.WorkflowStep.Service-Now-Incident-Create.login=user
project.plugin.WorkflowStep.Service-Now-Incident-Create.password-key-storage-path=keys/servicenow/pass
project.plugin.WorkflowStep.Service-Now-Incident-Create.url=https://server.service-now.com
```

or in `framework.properties`

```
servicenow.url=https://server.service-now.com
servicenow.login=user
servicenow.password-key-storage-path=keys/servicenow/pass
```

### Usage

To use the plugin, configure the following mandatory inputs.

- caller: the username of the assigned Caller field of the Incident.
- Short Description: Short Description of the Incident

These inputs are optional and if left empty the default value of Service now it's going to be used

- urgency: A number representing the urgency of the incident (usually being 1 the most urgent). The list can be dynamically loaded using project settings (see settings below)
- impact: A number representing the impact of the incident (usually being 1 the higher urgent). The list can be dynamically loaded using project settings (see settings below)
- priority: A number representing the priority of the incident (calculated from urgency and impact).The list can be dynamically loaded using project settings (see settings below)
- Assignment Group: list assigned groups. To populate the list dynamically, credentials need to be passed at the project level (see settings below)
- Description: Full description of the incident

### Adding dynamic list data

With these settings, at project level, the fields urgency, impact, priority and Assignment Group can be loaded dynamically, for example:

```
project.plugin.WorkflowStep.Service-Now-Incident-Create.login=admin
project.plugin.WorkflowStep.Service-Now-Incident-Create.password-key-storage-path=keys/somepath/pass
project.plugin.WorkflowStep.Service-Now-Incident-Create.select-impact-list={"1"\:"1 - High","2"\:"2 - Medium","3"\:"3 - Low"}
project.plugin.WorkflowStep.Service-Now-Incident-Create.select-priority-list={"1"\:"1 - Critical","2"\:"2 - High","3"\:"3 - Moderate","4"\:"4 - Low","5"\:"5 - Planning"}
project.plugin.WorkflowStep.Service-Now-Incident-Create.select-urgency-list={"1"\:"1 - High","2"\:"2 - Medium","3"\:"3 - Low"}
project.plugin.WorkflowStep.Service-Now-Incident-Create.url=https\://XXX.service-now.com

```

For `Assignment Group` the list is loaded with an SN API call.

## Service Now / Incident / Edit

Rundeck workflow step that edits an incident

### Configuration

The Service Now connection credentials are set in the project.properties file
for your project.
Password it's a keystorage path to the password.

```
project.plugin.WorkflowStep.Service-Now-Incident-Edit.login=admin
project.plugin.WorkflowStep.Service-Now-Incident-Edit.password-key-storage-path=keys/servicenow/pass
project.plugin.WorkflowStep.Service-Now-Incident-Edit.url=https\://dev63229.service-now.com
```

or in `framework.properties`

```
servicenow.url=https://server.service-now.com
servicenow.login=user
servicenow.password-key-storage-path=keys/servicenow/pass
```

### Usage

To use the plugin, configure the following mandatory inputs.

- Incident Number: Incident number to be updated
- Comment: Comment on incident

These inputs are optional and if left empty the default value of Service now it's going to be used

- state: State code. If not set, the change will be in New status. The list can be dynamically loaded using project settings (see settings below)
- urgency: A number representing the urgency of the incident (usually being 1 the most urgent). The list can be dynamically loaded using project settings (see settings below)
- impact: A number representing the impact of the incident (usually being 1 the higher urgent). The list can be dynamically loaded using project settings (see settings below)
- priority: A number representing the priority of the incident (calculated from urgency and impact).The list can be dynamically loaded using project settings (see settings below)
- Assignment Group: list assigned groups. To populate the list dynamically, credentials need to be passed at the project level (see settings below)

### Adding dynamic list data

With these settings, at project level, the fields urgency, impact, priority , Assignment Group, state can be loaded dynamically, for example:

```
project.plugin.WorkflowStep.Service-Now-Incident-Edit.login=admin
project.plugin.WorkflowStep.Service-Now-Incident-Edit.password-key-storage-path=keys/servicenow/pass
project.plugin.WorkflowStep.Service-Now-Incident-Edit.select-impact-list={"1"\:"1 - High","2"\:"2 - Medium","3"\:"3 - Low"}
project.plugin.WorkflowStep.Service-Now-Incident-Edit.select-priority-list={"1"\:"1 - Critical","2"\:"2 - High","3"\:"3 - Moderate","4"\:"4 - Low","5"\:"5 - Planning"}
project.plugin.WorkflowStep.Service-Now-Incident-Edit.select-urgency-list={"1"\:"1 - High","2"\:"2 - Medium","3"\:"3 - Low"}
project.plugin.WorkflowStep.Service-Now-Incident-Edit.url=https\://dev63229.service-now.com

```

For `Assignment Group` and `state` the list is loaded with SN API call.

## Service Now / Incident / View

Rundeck workflow step that views an incident

### Configuration

The Service Now connection credentials are set in the project.properties file
for your project.
Password it's a keystorage path to the password.

```
project.plugin.WorkflowStep.Service-Now-Incident-View.login=admin
project.plugin.WorkflowStep.Service-Now-Incident-View.password=keys/servicenow/pass
project.plugin.WorkflowStep.Service-Now-Incident-View.url=https\://dev63229.service-now.com
```

or in `framework.properties`

```
servicenow.url=https://server.service-now.com
servicenow.login=user
servicenow.password-key-storage-path=keys/servicenow/pass
```

### Usage

To use the plugin, configure the following mandatory inputs.

- Incident Number: Incident number to be updated

## Service Now / Change / Check State

Rundeck workflow step that checks the state of a change request

### Configuration

The Service Now connection credentials are set in the project.properties file
for your project.
Password it's a keystorage path to the password.

```
project.plugin.WorkflowStep.Service-Now-Change-Check-State.url=https://server.service-now.com
project.plugin.WorkflowStep.Service-Now-Change-Check-State.login=user
project.plugin.WorkflowStep.Service-Now-Change-Check-State.password-key-storage-path=keys/servicenow/pass
```

or in `framework.properties`

```
servicenow.url=https://server.service-now.com
servicenow.login=user
servicenow.password-key-storage-path=keys/servicenow/pass
```

### Usage

To use the plugin, configure the following mandatory inputs.

- number: Number of the change.
- State: State to be checked.

## Service Now / Change / Update State

Rundeck workflow step that updates the state of a change request

### Configuration

The Service Now connection credentials are set in the project.properties file
for your project.
Password it's a keystorage path to the password.

```
project.plugin.WorkflowStep.Service-Now-Change-Update-State.url=https://server.service-now.com
project.plugin.WorkflowStep.Service-Now-Change-Update-State.login=user
project.plugin.WorkflowStep.Service-Now-Change-Update-State.password-key-storage-path=keys/servicenow/pass
```

or in `framework.properties`

```
servicenow.url=https://server.service-now.com
servicenow.login=user
servicenow.password-key-storage-path=keys/servicenow/pass
```

### Usage

To use the plugin, configure the following mandatory inputs.

- number: Number of the change.
- New State: New State State to be used.

## Service Now / Change / Create

Rundeck workflow step that creates a change on Service Now

### Configuration

The Service Now connection credentials are set in the project.properties file
for your project.
Password it's a keystorage path to the password.

```
project.plugin.WorkflowStep.Service-Now-Change-Create.url=https://server.service-now.com
project.plugin.WorkflowStep.Service-Now-Change-Create.login=user
project.plugin.WorkflowStep.Service-Now-Change-Create.password-key-storage-path=keys/servicenow/pass
```

or in `framework.properties`

```
servicenow.url=https://server.service-now.com
servicenow.login=user
servicenow.password-key-storage-path=keys/servicenow/pass
```

### Usage

To use the plugin, configure the following mandatory inputs.

- assignment group: The assignment group name or Id to assign.
- Description: Short description to be used.
- state: State code. If not set, the change will be in New status.
