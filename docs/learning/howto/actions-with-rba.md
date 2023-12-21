# Integrate PagerDuty Automation Actions with Runbook Automation  
PagerDuty Automation Actions invoke jobs staged in Runbook Automation. An Action can also invoke a script run by an installed Process Automation Runner. By associating Automation Actions with a PagerDuty service, PagerDuty responders get push-button access to a library of defined diagnostic or remediation actions, resulting in shorter resolution times and fewer disruptive escalations.  
![](/assets/img/aarba1.png)  
Automation Actions can also be used as part of an Event Orchestration to enrich incident data with diagnostics information or perform remediation actions on incidents automatically.  

## How to integrate Rundeck with PagerDuty Automation Actions  
This how-to guide shows how to integrate PagerDuty Automation Actions with Runbook Automation. We will need to create a Runner that calls Runbook Automation in case of invocation from a PagerDuty event.

### In Runbook Automation: Create an API token
First, let's create a Runbook Automation API token. This is necessary to run a Job through an Action from a PagerDuty event.  
1. Click on the User icon (top right) and then click on the "Profile" link.  
![](/assets/img/aarba2.png)  
2. Click on the "+" icon (besides "User API Tokens" title).  
![](/assets/img/aarba3.png)  
3. Generate the token and save it in a safe place. For more info on creating an API token and the available options, click [here](/api/api_basics.html#running-the-welcome-project-and-new-user-token-creation).  Once you have closed the pop-up window  you won't be able to see the token again.  
![](/assets/img/aarba4.png)  
4. Now create a new test Project and then create a new job.  For details on creating a job, click [here](/learning/getting-started/jobs/creating-a-job.html#create-a-basic-rundeck-job).  

### In PagerDuty: Generate the Actions Runner
The PagerDuty Actions Runner is essential for carrying out certain tasks triggered from an incident. The following steps are necessary to create the Actions Runner:  
1. In PagerDuty go to the top menu, click on "Automation" and then "Automation Actions".  
![](/assets/img/aarba5.png)  
2. Now, click the "+ Add Action" blue button (top right).  
![](/assets/img/aarba6.png)  
3. Click the "set up and configure one" link which allows creation of a new PagerDuty Actions Runner.  
![](/assets/img/aarba7.png)  
4. Select "Runbook Automation" as the type of Runner.  This will require some instance details such as Token. Click the "Next" button.  
![](/assets/img/aarba8.png)  
5. Give it a name and an optional description, then click the "Next" button.  
![](/assets/img/aarba9.png)  
6. Fill up the RBA subdomain instance URL, as well as the key produced in the previous section (in the "Runbook Automation API Key*" field), and select the desired responders teams (in the "Teams" section). Choosing teams here will limit which teams can use this Runner.  When done, click the "Create Runner" button.  
![](/assets/img/aarba10.png)  
7. Now, the runner is ready to be assigned to an Automated Action.  
![](/assets/img/aarba11.png)  

### In PagerDuty: Define an Automated Action
In order for Actions to be triggered from a PagerDuty event, some additional configuration is necessary:  
1. In the top menu, click the "Automation" link, followed by the "+ Add Actions" button.  
![](/assets/img/aarba12.png)  
2. Enter the Runner's name in the "Search" field and then choose it. Press the "Next" button.  
![](/assets/img/aarba13.png)  
3. Next, choose the desired job from the list. Press the "Next" button.  The available jobs will be based on what is available in Runbook Automation.  
![](/assets/img/aarba14.png)  
4. Fill out the Action information, including a name and description, a category (Diagnostics or Remediation), which services are affected, and which teams can access this action.  Any team not selected will be unable to run this Action.  Leave blank to make it available for all teams on the chosen services.  
![](/assets/img/aarba15.png)  
5. Finally, simply click the "Create Action" button.  
![](/assets/img/aarba16.png)  

## Testing
On your PagerDuty service:  
1. Create a new incident on your PagerDuty's Service.  
2. Select the Action generated in the previous section from the "Run Actions" list.  
![](/assets/img/aarba17.png)  
3. This starts the job as defined in Automation Actions.  

## Resources
* [PagerDuty Automation Actions](https://support.pagerduty.com/docs/automation-actions).
* [Process Automation Tokens](/manual/10-user.html#user-api-tokens).