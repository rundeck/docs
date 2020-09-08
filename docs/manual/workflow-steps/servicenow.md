# ServiceNow Plugins

<!---
Original:
http://support.rundeck.com/customer/en/portal/articles/2915300-servicenow-plugins)
--->

For all of the following job steps, you will need to have set the connection credentials. In order to do so, add the following lines of code to your `framework.properties` file:

```
servicenow.url=https://server.service-now.com
servicenow.login=user
servicenow.password-key-storage-path=keys/servicenow/pass
```

## Service Now / Incident / Update State

Rundeck workflow step that changes an incident state

![Service Now / Incident / Update State](~@assets/img/servicenow-incident-updatestate.png)

- **Number**
: The Incident number to be updated.
- **newState**
: The new state of the Incident. It can be the number of the state or the description.

### Adding dynamic list data

With these settings, at project level, the field `state` can be loaded dynamically (calling SN API), for example:

```
project.plugin.WorkflowStep.Service-Now-Incident-Change-State.url=https://server.service-now.com
project.plugin.WorkflowStep.Service-Now-Incident-Change-State.login=user
project.plugin.WorkflowStep.Service-Now-Incident-Change-State.password-key-storage-path=keys/servicenow/pass

```

## Service Now / Incident / Check Assigned

Rundeck workflow step that checks assigned incidents

![Service Now / Incident / Check Assigned](~@assets/img/servicenow-incident-checkassigned.png)

- **Caller**
: The username of the Caller field on the Incident.

- **State (Optional)**: If you want you can enter a state number or description to add to the search, this way the incidents
  assigned to the caller only on this state are going to be considered.

## Service Now / Incident / Check State

Rundeck workflow step that checks an incident state

![Service Now / Incident / Check State](~@assets/img/servicenow-incident-checkstate.png)

- **Number**
: The Incident number to be checked.
- **State**
: The state to be checked. It can be the number of the state or the description.

### Adding dynamic list data

With these settings, at project level, the field `state` can be loaded dynamically (calling SN API), for example:

```
project.plugin.WorkflowStep.Service-Now-Incident-Check-State.login=user
project.plugin.WorkflowStep.Service-Now-Incident-Check-State.password-key-storage-path=keys/servicenow/pass
project.plugin.WorkflowStep.Service-Now-Incident-Check-State.url=https://server.service-now.com

```

## Service Now / Incident / Comment

Rundeck workflow step that comments an incident

![Service Now / Incident / Comment](~@assets/img/servicenow-incident-comment.png)

- **Incident Number**
: This is the incident number of the event that you wish to add the comment to. 
- **Comment**
: This is the comment you wish to add to the incident.

## Service Now / Incident / Create

Rundeck workflow step that creates an incident

![Service Now / Incident / Create](~@assets/img/servicenow-incident-create.png)

- **Caller**
: The username of the Caller field on the Incident.
- **Short Description**
: A short Description of the Incident
- **Urgency (Optional)**
: A number representing the urgency of the incident (usually being 1 the most urgent). The list can be dynamically loaded using project settings (see settings below)
- **Impact (Optional)**
: A number representing the impact of the incident (usually being 1 the higher urgent). The list can be dynamically loaded using project settings (see settings below)
- **Priority (Optional)**
: A number representing the priority of the incident (calculated from urgency and impact).The list can be dynamically loaded using project settings (see settings below)
- **Assignment Group (Optional)**
: list assigned groups. To populate the list dynamically, credentials need to be passed at the project level (see settings below)
- **Description (Optional)**
: Full description of the incident
- **Custom Fields**
: This is a field where you can input any additional data that you would like to be sent in the payload.

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

![Service Now / Incident / Edit](~@assets/img/servicenow-incident-edit.png)

- **Incident Number**
: This is the incident number of the event that you wish to add the comment to. 
- **Comment**
: This is the comment you wish to add to the incident.
- **State (Optional)**
: State code. If not set, the change will be in New status. The list can be dynamically loaded using project settings (see settings below)
- **Urgency (Optional)**
: A number representing the urgency of the incident (usually being 1 the most urgent). The list can be dynamically loaded using project settings (see settings below)
- **Impact (Optional)**
: A number representing the impact of the incident (usually being 1 the higher urgent). The list can be dynamically loaded using project settings (see settings below)
- **Priority (Optional)**
: A number representing the priority of the incident (calculated from urgency and impact).The list can be dynamically loaded using project settings (see settings below)
- **Assignment Group (Optional)**
: list assigned groups. To populate the list dynamically, credentials need to be passed at the project level (see settings below)
- **Custom Fields**
: This is a field where you can input any additional data that you would like to be sent in the payload.

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

![Service Now / Incident / View](~@assets/img/servicenow-incident-view.png)

- **Incident Number**
: This is the incident number of the event that you wish to add the comment to.

## Service Now / Change / Check State

Rundeck workflow step that checks the state of a change request

![Service Now / Change / Check State](~@assets/img/servicenow-change-checkstate.png)


- **Number**
: Number of the change.
- **State**
: State to be checked.

## Service Now / Change / Update State

Rundeck workflow step that updates the state of a change request

![Service Now / Change / Update State](~@assets/img/servicenow-change-updatestate.png)

- **Number**
: Number of the change.
- **New State**
: New State to be used.

## Service Now / Change / Create

Rundeck workflow step that creates a change on Service Now

![Service Now / Change / Create](~@assets/img/servicenow-change-create.png)


- **Assignment group**
: The assignment group name or Id to assign.
- **Description**
: Short description to be used.
- **State**
: State code. If not set, the change will be in New status.
