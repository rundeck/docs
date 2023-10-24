# Integrate PagerDuty Event Orchestration with Runbook Automation
Users can use PagerDuty Event Orchestration to route events to an endpoint and establish nested rules, which specify sets of actions based on event content. Event Orchestration is PagerDuty's modern approach to addressing your current and future automation needs.  
Event Orchestration is now the most effective option for users to condense rule volumes, increase noise reduction, and automate well-understood human effort. In this how-to, we will use a basic example of how to call Runbook Automation jobs from PagerDuty in case an integration/monitoring tool triggers an incident.  

## Requirements
The following requirements are necessary to follow this guide:  
1. A PagerDuty valid account with the following roles can create/edit/delete Event Orchestrations:  
* User  
* Admin  
* Manager base roles and team roles. Manager team roles can create/edit/delete Event Orchestrations associated with their team.  
* Global Admin  
* Account Owner  
2. A Runbook Automation instance.  

## Runbook Automation Configuration
First, create a Runbook Automation job and webhook to be called by PagerDuty in case of an incident creation.  
1. Create a new Project.  
2. Create a Job. This job takes the current hostname and stores this value in a data value. Learn more about passing data between steps [here](/learning/howto/passing-variables.html#passing-data-between-steps). Check the following job definition example:  

```
- defaultTab: nodes
  description: ''
  executionEnabled: true
  id: 4635cbe3-7f8d-4a30-be1b-79c4adb76786
  loglevel: INFO
  name: HelloWorld
  nodeFilterEditable: false
  nodefilters:
    dispatch:
      excludePrecedence: true
      keepgoing: false
      rankOrder: ascending
      successOnEmptyNodeFilter: false
      threadcount: '1'
    filter: 'name: localhost'
  nodesSelectedByDefault: true
  plugins:
    ExecutionLifecycle: null
  scheduleEnabled: true
  sequence:
    commands:
    - exec: whoami
      plugins:
        LogFilter:
        - config:
            invalidKeyPattern: \s|\$|\{|\}|\\
            logData: 'true'
            name: mydata
            regex: (.*)
            replaceFilteredResult: 'false'
          type: key-value-data
    - exec: echo ${data.node}
    keepgoing: false
    strategy: node-first
  uuid: 4635cbe3-7f8d-4a30-be1b-79c4adb76786
```

3. Next, create a new "Run Job" Webhook. To do so, go to the "Webhooks" icon (left menu) and then click on the "Create Webhook" button.  
![](/assets/img/eventrba1.png)  
4. On the "General" tab, give it a name.  
![](/assets/img/eventrba2.png)  
5. Click on the "Handler Configuration" tab, thenselect "Run Job" on the "Choose Webhook Plugin" menu.  
6. Check the Option and node filter fields. The Option defined there is to pass a comment to the PagerDuty Incident and the Node Filter is the node defined in the Incident call, this allows the job execution on remote nodes.  
7. Then save the Webhook and save the webhook URL.  
![](/assets/img/eventrba3.png)  
The Runbook Automation instance and job are ready to receive calls from PagerDuty.  

## PagerDuty Configuration
For an active PagerDuty Service, the following steps enable [Event Orchestration](https://support.pagerduty.com/docs/event-orchestration) in case of a new Incident.  
1. On your current Service, click on the "Automation" section and then on the "Event Orchestration" link.  
![](/assets/img/eventrba4.png)  
2. Click on the "New Orchestration" button, give it a name, and assign this Event Orchestration to a Team. Optionally give it a description, then click the "Save" button". Click to learn more about PagerDuty [users](https://support.pagerduty.com/docs/users) and [teams](https://support.pagerduty.com/docs/teams).  
![](/assets/img/eventrba5.png)  
3. On the "Integrations" tab, some values are generated automatically. Save the "Integration Key" value in a safe place as this is crucial to call the PagerDuty API later in this example.  
![](/assets/img/eventrba6.png)  
4. On the "Service Route" tab, click on the "New Service Route" button. Give it a name, select `if events match certain conditions` on "When should events be routed here?", and put `event.component`, "matches part (contains)" and `LDAP` on the "IF" section and then click on the "Save" button.  
![](/assets/img/eventrba7.png)  
Learn more about Service Routes [here](https://support.pagerduty.com/docs/event-orchestration#create-a-routing-rule).  
5. Click on the Event Orchestration name link and click the pencil icon in the event rule.  
![](/assets/img/eventrba8.png)  
6. Check the information filled in Step 4, and click on the "Next" button.  
7. On the "Incident Data" section put the severity level and a test note.  
![](/assets/img/eventrba9.png)  
8. Click on the "Transformations" section and put a `node` on the Custom Variable Name, `.*` on the Regex field, and `event_custom_details.machine` in the Source field.  
![](/assets/img/eventrba10.png)  
9. In the "Webhooks" section, click on "Enable webhook to the specified endpoint for these incidents" and select the "Automatically triggered on incident creation" radio button option. In the Name field, put a Name and in the "endpoint" field put the Runbook Automation Webhook URL (Step 5 of the "Runbook Automation Configuration" section in this guide).  
![](/assets/img/eventrba11.png)  
Based on the earlier Runbook Automation Webhook creation, we must give the node variable to the webhook, as defined in the "JSON Body Fields" section "Name" (with "node") and "Value" `{{variables.node}}`. This allows us to pass the Runbook Automation Job's node filter and an option to give a comment on the PagerDuty Incident.  
Save the Event Rule.  

## Create an Incident by using a basic shell script.
To imitate a Monitoring Tool, use a simple curl-based bash script to create an incident in a PagerDuty Service; this call will require the Event Orchestration Integration Key generated in the previous section (step 3):  

```
curl --request POST \
  --url https://events.pagerduty.com/v2/enqueue \
  --header 'Content-Type: application/json' \
  --data '{
	"payload": {
    "summary": "Ldap: High CPU",
    "severity": "critical",
    "source": "my_node,
    "component": "ldap",
    "group": "prod-ldap",
    "class": "cpu",
    "custom_details": {
			"machine": "localhost",
      "free space": "20%",
      "ping time": "1500ms",
      "load avg": 0.99
		}
	},
	"routing_key": "EO_ROUTING_KEY", 
	"event_action": "trigger",
	"client": "datadog",
	"client_url": "https://datadog.com",
	"links": [
    {
      "href": "http://pagerduty.example.com",
      "text": "An example link."
    }
  ],
  "images": [
    {
      "src": "https://chart.googleapis.com/chart?chs=600x400&chd=t:6,2,9,5,2,5,7,4,8,2,1&cht=lc&chds=a&chxt=y&chm=D,0033FF,0,0,5,1",
      "href": "https://google.com",
      "alt": "An example link with an image"
    }
  ]
}'
```

The execution of this script generates a PagerDuty API call that generates an Incident.  

```
{"dedup_key":"xxx","message":"Event processed","status":"success"}
```

Check the Runbook Automation Activity to validate that the job was triggered by the PagerDuty Event Orchestration Webhook call.  

### Resources
[PagerDuty Basics.](https://support.pagerduty.com/docs/introduction)
[Runbook Automation Terminology.](/learning/#essential-concepts)
[PagerDuty Event Orchestration.](https://support.pagerduty.com/docs/event-orchestration)
[Runbook Automation Webhooks.](/manual/webhooks.html#webhooks)