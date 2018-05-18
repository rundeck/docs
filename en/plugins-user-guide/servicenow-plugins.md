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

## Servers Resource Model Source
This is a Resource Model Source plugin that provides
Server information from Server Now CMDB.

To obtain the data, the Service Now connection parameters must be passed as parameters to the plugin
(username, password and url), and a list of server types, this can be:

* all : Retrieve al types of servers
* linux : Retrieve only linux machines
* win : Retrieve only Windows machines
* unix : Retrieve only unix machines
* esx: Retrieve only ESX machines
* solaris: Retrieve Solaris linux machines
* aix: Retrieve only AIX machines
* hpux: Retrieve only HPUX machines
* osx: Retrieve only OS X machines
* netware: Retrieve only Netware machines
* comma separated list : as example 'linux,win'

### Mapping and default values

* `mappingParams`: A set of ";" separated mapping entries. This values are going to override the default mapping
one by one.
The minimal maping needed is the `username, because Service Now servers lacks a username field to map:

```
username.default=root
```

### Default Mapping

```
nodename.selector=name
hostname.selector=host_name,ip_address,dns_domain
sshport.default=22
description.default=Service Now node instance
description.selector=short_description
osFamily.default=unix
osName.selector=os
osName.default=Linux
osVersion.selector=os_version
ipAddress.selector=ip_address
cpuCoreCount.selector=cpu_core_count
cpuCount.selector=cpu_count
cpuCpeed.selector=cpu_speed
cpuType.selector=cpu_type
osDomain.selector=os_domain
tags.selector=asset_tag
tags.default=servicenow
```

### Configuration of the Mapping

The node requieres at least the nodename, hostname and user.
A selector with a list like this:

```
hostname.selector=host_name,ip_address,dns_domain
```

Are going to search on the result of the query the value of `host_name`, if is not set, the `ip_address` or the
`dns_domain`.

A selector with a defualt value like this example:

```
osName.selector=os
osName.default=Linux
```
Are going to search the `os` value, if not set, are going to use the default value `Linux`.

The special case of the tags, if multiple tags are set using comma, all are going to be searched and used.

```
tags.selector=asset_tag,os
tags.default=servicenow
```
If is none of the `asset_tag` or `os` exists, the default tag are going to be used `servicenow`.

In the case only the default value exists, this fixed value are going to be set.

```
osFamily.default=unix
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
