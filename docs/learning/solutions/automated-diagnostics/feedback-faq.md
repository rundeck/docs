## Automated Diagnostics
### Contributing & Providing feedback
We are constantly looking to expand the quantity and quality of our Automated-Diagnostics Solution. We have also open-sourced the Job Definitions for [this project on Github](https://github.com/rundeckpro/automated-diagnostics-project), where you can submit feedback as “Issues,” or contribute directly by making pull-requests. We’d love your feedback to improve this solution for yourself and others.
<br>

### FAQ
#### What licensing is required to have the Automated Diagnostics Solution?
* Runbook Automation or Process Automation users have full access to - and support of - the Auto-Diagnostics Solution. Rundeck Community users can view the Solution and use some Jobs, but will be limited in their ability to use many Jobs due to dependencies on exclusive plugins.

#### Can users modify the prebuilt automation Jobs?
* Yes! Though we hope that the prebuilt Jobs will provide value, the intent of these is also to show you what’s possible with the Runbook Automation product. Treat these as templates for your own use-cases.

#### How does the Automated Diagnostics Solution integrate with PagerDuty?
* Any of the prebuilt automation Jobs can be invoked by Automation Actions or Event Orchestration - as well as through the Runbook Automation interface.  All Jobs are also capable of sending the diagnostic data to the Incident Timeline in PagerDuty.

#### How is Automated Diagnostics different from monitoring tools?
* Whereas monitoring data is used for alert-thresholds and anomaly detection, diagnostic data is used as the first steps of troubleshooting once an issue has already been identified.

* As a basic example, monitoring tools will raise an alert based off of high or anomalous CPU usage, the automation here will pull for the top CPU consuming process - as well as perhaps other information such as locks on the database that the container or VM is using
