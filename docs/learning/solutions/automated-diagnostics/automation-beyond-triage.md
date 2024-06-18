# Automated Diagnostics

## Automation Beyond Triage for Incident Response

This guide has walked you through many examples of using diagnostics to improve triage and investigation by retrieving diagnostic data at the onset of an incident.  
However, there are many other ways that Automated Diagnostics can be implemented to provide value to you and your team.

### Capture Environment State
There are many cases where incidents occur, but because they are less severe, the root-cause fix is not implemented immediately.  In this case, it is helpful to capture and store the “state” of the environment so that when developers have bandwidth to fix the root cause, they have evidence of the circumstances surrounding the issue when it occurred.
An example of this would be capturing application logs, infrastructure logs, and current-database statistics and storing these in a S3 bucket and providing a link to the bucket in a Jira ticket.  Optionally, if this is a recurring issue, evidence can be gathered on each occurrence, and stored so that developers can more quickly determine the root-cause of the issue.

### Retrieving & Storing Debug-Level Diagnostics
Similar to Capturing Environment State, there are instances when there are known “quick fixes” for issues - such as restarting a service or re-deploying a Kubernetes pod - but this does not solve the root-cause of the issue.  
In these cases, it is helpful to capture debug-level diagnostics and store them to be used when the team has bandwidth to investigate and develop a fix for the root-cause.  
An example of this is to capture a thread-dump or memory-dump of a service running on a Kubernetes pod as soon as a performance issue is detected.  Once the thread or memory-dump has been successfully stored in a location like AWS S3, then the pod can be quickly redeployed so as to restore service.  Now when the developers of that service have time to investigate and fix the bug in the app, they have debug-level data to help guide them to the root-cause.

### Recurring Checks During an Incident
When there are major incidents, it is common for multiple components or services to be impacted.  
In these circumstances, it is beneficial to not only invoke diagnostic runbooks at the onset of the incident, but to retrieve diagnostics at various times during the incident as well.  
This can help keep stakeholders up to date on the progress of achieving full-service restoration, as well as provide useful information during postmortem.

## Remediation
While Automated Diagnostics is an excellent first-step for introducing “machine automation” into the incident-response process, auto-remediation is the logical next step.  
Automation Actions and Runbook Automation provide all the necessary features and functionality to allow you to implement safe, known fixes as part of your reliability practices.  
Here are a few common categories of auto-remediation:

**1. Restarting a service running on a Windows or Linux operating system.**<br>
**2. Rebooting a virtual-machine.**<br>
**3. Redeploying a Kubernetes pod.**<br>
**4. Adding infrastructure resources - such as CPU cores or expanding disk-drive space.**<br>
**5. Performing a “fail-over,” or rerouting traffic from unhealthy endpoints to healthy endpoints.**<br>
**6. Executing a rollback from an unhealthy deployment to the last known healthy deployment.**<br>
**7. Rotating an unhealthy virtual-machine out of a load-balancer-group.**

For an example implementation, here is a [**webinar recording**](https://www.youtube.com/watch?v=4jAf6cbxsgo&ab_channel=Rundeck) of implementing auto-remediation with Rundeck and Sensu.

## Service-Request & Self-Service Automation
Beyond the incident-response use-cases outlined above, **Runbook Automation** can be used to automate and delegate a number of technical tasks spanning categories such as:

**Environment provisioning**<br>
**Configuration changes**<br>
**Environment reporting**<br>
**User access provisioning / onboarding**<br>
**Support ops**<br>
**Security ops**

For more information on these use-cases, check out the [User Stories](https://www.rundeck.com/user-stories) of Rundeck and our webinar on [Self Service Operations](https://www.pagerduty.com/resources/webinar/safely-delegate-your-cloud-operations-with-self-service-automation/).