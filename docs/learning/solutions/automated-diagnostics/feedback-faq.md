## Automated Diagnostics
### Contributing & Providing feedback
We are constantly looking to expand the quantity and quality of our Automated-Diagnostics Solution. 
We have also open-sourced the Job Definitions for [this project on Github](https://github.com/rundeckpro/automated-diagnostics-project).  
Your feedback is appreciated - to improve this solution for yourself and others. You can submit feedback as “Issues,” or contribute directly by making pull-requests.
<br>

### FAQ
#### What products do I need to use the Automated Diagnostics Solution?
* Runbook Automation users have full access to the Auto-Diagnostics Solution. Rundeck Community users can view the Solution and use some Jobs, but will be limited in their ability to use many Jobs due to dependencies on commercial-only plugins.
* To get the most value out of the Auto-Diagnostics Solution, it is also recommended to have access to [PagerDuty Automation Actions](https://www.pagerduty.com/platform/automation/actions/).

#### Can users modify the prebuilt automation Jobs?
* Yes! The prebuilt Jobs will provide you with value almost immediately, however the intent of these is also to show you what’s possible with the Runbook Automation product. You can treat these as templates for your own use-cases.

#### How does the Automated Diagnostics Solution integrate with other PagerDuty products?
* Any of the prebuilt automation Jobs can be invoked by PagerDuty Automation Actions or Event Orchestration - as well as through the Runbook Automation interface.  All Jobs are also capable of sending the diagnostic data to the Incident Timeline in PagerDuty.

#### How is Automated Diagnostics different from monitoring tools?
* Whereas monitoring data is used for alert-thresholds and anomaly detection, diagnostic data is used as the first steps of troubleshooting once an issue has already been identified.

* As a basic example, monitoring tools will raise an alert based off of high or anomalous CPU usage, the automation here will pull for the top CPU consuming processes - as well as other information such as locks on the database that the container or VM is using.
