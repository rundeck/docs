# Establishing A ServiceNow Connection at the Project Level

For all the different ServiceNow job steps, the connection can also be established at the project level. In order to do so, add the following to your project configuration file, depending on which job step you are utilizing: 

## Service Now / Incident / Update State

```
project.plugin.WorkflowStep.Service-Now-Incident-Change-State.url=https://server.service-now.com
project.plugin.WorkflowStep.Service-Now-Incident-Change-State.login=user
project.plugin.WorkflowStep.Service-Now-Incident-Change-State.password-key-storage-path=keys/servicenow/pass
```

## Service Now / Incident / Check Assigned

```
project.plugin.WorkflowStep.Service-Now-Incident-Check-Assigned.login=user
project.plugin.WorkflowStep.Service-Now-Incident-Check-Assigned.password-key-storage-path=keys/servicenow/pass
project.plugin.WorkflowStep.Service-Now-Incident-Check-Assigned.url=https://server.service-now.com
```

## Service Now / Incident / Check State

```
project.plugin.WorkflowStep.Service-Now-Incident-Check-State.login=user
project.plugin.WorkflowStep.Service-Now-Incident-Check-State.password-key-storage-path=keys/servicenow/pass
project.plugin.WorkflowStep.Service-Now-Incident-Check-State.url=https://server.service-now.com
```

## Service Now / Incident / Comment

```
project.plugin.WorkflowStep.Service-Now-Comment.login=user
project.plugin.WorkflowStep.Service-Now-Comment.password-key-storage-path=keys/servicenow/pass
project.plugin.WorkflowStep.Service-Now-Comment.url=https://server.service-now.com
```

## Service Now / Incident / Create

```
project.plugin.WorkflowStep.Service-Now-Incident-Create.login=user
project.plugin.WorkflowStep.Service-Now-Incident-Create.password-key-storage-path=keys/servicenow/pass
project.plugin.WorkflowStep.Service-Now-Incident-Create.url=https://server.service-now.com
```

## Service Now / Incident / Edit

```project.plugin.WorkflowStep.Service-Now-Incident-Edit.login=admin
   project.plugin.WorkflowStep.Service-Now-Incident-Edit.password-key-storage-path=keys/servicenow/pass
   project.plugin.WorkflowStep.Service-Now-Incident-Edit.url=https\://dev63229.service-now.com
```

## Service Now / Incident / View

```
project.plugin.WorkflowStep.Service-Now-Incident-View.login=admin
project.plugin.WorkflowStep.Service-Now-Incident-View.password=keys/servicenow/pass
project.plugin.WorkflowStep.Service-Now-Incident-View.url=https\://dev63229.service-now.com
```

## Service Now / Change / Check State

```
project.plugin.WorkflowStep.Service-Now-Change-Check-State.url=https://server.service-now.com
project.plugin.WorkflowStep.Service-Now-Change-Check-State.login=user
project.plugin.WorkflowStep.Service-Now-Change-Check-State.password-key-storage-path=keys/servicenow/pass
```

## Service Now / Change / Update State

```
project.plugin.WorkflowStep.Service-Now-Change-Update-State.url=https://server.service-now.com
project.plugin.WorkflowStep.Service-Now-Change-Update-State.login=user
project.plugin.WorkflowStep.Service-Now-Change-Update-State.password-key-storage-path=keys/servicenow/pass
```

## Service Now / Change / Create

```
project.plugin.WorkflowStep.Service-Now-Change-Create.url=https://server.service-now.com
project.plugin.WorkflowStep.Service-Now-Change-Create.login=user
project.plugin.WorkflowStep.Service-Now-Change-Create.password-key-storage-path=keys/servicenow/pass
```