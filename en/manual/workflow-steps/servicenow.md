% ServiceNow Plugins

<!---
Original: 
http://support.rundeck.com/customer/en/portal/articles/2915300-servicenow-plugins)
--->

## Change case state Workflowstep
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

To use the plugin, configure the follow mandatory inputs.


* number: The Incident number to be updated.
* newState: The new state of the Incident. It can be the number of the state or the description.

## Check assigned cases Workflowstep
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

To use the plugin, configure the follow mandatory inputs.

* caller: the username of the Caller field on the Incident.

This inputs is optional

* state: If you want you can enter a state number or description to add to the search, this way the incidents
assigned to the caller only on this state are going to be considered.

## Check case state Workflowstep
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

To use the plugin, configure the follow mandatory inputs.

* number: The Incident number to be checked.
* state: The state to be checked. It can be the number of the state or the description.

## Comment case Workflowstep
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

## Create case Workflowstep
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

To use the plugin, configure the follow mandatory inputs.

* caller: the username of the assigned Caller field of the Incident.
* description: Short Description of the Incident

These inputs are optional and if leave empty the default value of Service now it's going to be used

* urgency: A number representing the urgency of the incident (usually being 1 the most urgent)
* impact: A number representing the impact of the incident (usually being 1 the higher urgent)
* priority: A number representing the priority of the incident (calculated from urgency and impact)

## Comment case Notification
Rundeck workflow step that coments an incident

### Configuration

The Service Now connection credentials are set in the project.properties file
for your project.

```
project.plugin.Notification.Service-Now-Notification.login=user
project.plugin.Notification.Service-Now-Notification.password=s3cret
project.plugin.Notification.Service-Now-Notification.url=https://server.service-now.com
```

## Create case Notification
Rundeck workflow step that creates an incident

### Configuration

The Service Now connection credentials are set in the project.properties file
for your project.

```
project.plugin.Notification.Service-Now-Notification.login=user
project.plugin.Notification.Service-Now-Notification.password=s3cret
project.plugin.Notification.Service-Now-Notification.url=https://server.service-now.com
```

### Usage

To use the plugin, configure this mandatory input:

* caller: the username of the assigned Caller field of the Incident.

These inputs are optional and if leave empty the default value of Service now it's going to be used

* urgency: A number representing the urgency of the incident (usually being 1 the most urgent)
* impact: A number representing the impact of the incident (usually being 1 the higher urgent)
* priority: A number representing the priority of the incident (calculated from urgency and impact)
