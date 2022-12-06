# Automated Diagnostics

## What is PagerDuty's Automated Diagnostics Solution?
Automated diagnostics can be of huge value when managing incidents. By pulling “diagnostic” data into your incidents, you can shorten the length of incidents, simplify results for the first responder and reduce the number of individuals paged to help with resolution.  Once you have implemented and configured the Diagnostic Solution, your responders can respond or draw in the right resources more quickly based on up-to-date diagnostics that they can understand. 
See [this blog post](https://www.pagerduty.com/blog/democratize-capabilities-automation-actions) to learn more about the value of automated diagnostics.

PagerDuty provides a solution that helps users start automating diagnostics quickly. This Solution consists of **prebuilt Automation Jobs** that retrieve data from common infrastructure and services for investigating, debugging and diagnosing incidents:

![Automated Diagnostics within PagerDuty](@assets/img/diag-on-pd-timeline.png) 

<br>

![Verbose Diagnostics in Process Automation](@assets/img/diag-verbose-output.png)

As an example, if an incident is triggered for a service running in Kubernetes, PagerDuty Runbook Automation can retrieve information from logs, API’s, databases and other sources that support this service.  This could be triggered with the click of a button or through event-driven invocation.<br>
This information is then available in multiple interfaces such as PagerDuty's Mobil App, Slack, and Microsoft Teams:

![Diagnostics in Slack](@assets/img/diag_in_slack.png)

## Examples & Templates
This guide includes a full section on Examples & Best Practices - a preview of that is shown here:


|Category|Examples|
|:----:|:--------|
[<img src="@assets/img/aws-logo.png" style="border:none;">](/learning/solutions/automated-diagnostics/examples/public-cloud-providers.html)<br>[**Amazon Web Services**](/learning/solutions/automated-diagnostics/examples/public-cloud-providers.html)| _Stopped ECS Task Errors_<br><br> _ELB Targets Health_<br><br> _CloudWatch Logs_
[<img src="@assets/img/azure-logo.png" style="border:none;">](/learning/solutions/automated-diagnostics/examples/public-cloud-providers.html#azure)<br>[**Microsoft Azure**](/learning/solutions/automated-diagnostics/examples/public-cloud-providers.html#azure)|_Function App Health_<br><br> _Troubleshoot Azure File Sync_<br><br> _Load Balancer Health Probes_
[<img src="@assets/img/google-cloud-logo.png" style="border:none;">](/learning/solutions/automated-diagnostics/examples/public-cloud-providers.html#google-cloud-platform-gcp)<br>[**Google Cloud Platform**](/learning/solutions/automated-diagnostics/examples/public-cloud-providers.html#google-cloud-platform)|_Debug Load Balancer Health Checks_<br><br> _Troubleshooting Firewall Rules_<br><br> _GKE Cluster Connectivity_
[<img src="@assets/img/linux-logo.png" style="border:none;">](/learning/solutions/automated-diagnostics/examples/linux.html)<br>[**Linux OS**](/learning/solutions/automated-diagnostics/examples/linux.html)|_List Top CPU Consuming Processes_<br><br> _Retrieve Errors from Syslog_<br><br> _List Top Disk Consuming Files_
[<img src="@assets/img/windows-logo.png" style="border:none;">](/learning/solutions/automated-diagnostics/examples/windows.html)<br>[**Windows OS**](/learning/solutions/automated-diagnostics/examples/windows.html)|_Active Directory Replication Diagnostics_<br><br> _Retrieve IIS Web Server Logs_<br><br> _SMB Connection Failures_
[<img src="@assets/img/rest-api-logo.png" style="border:none;">](/learning/solutions/automated-diagnostics/examples/apis.html)<br>[**APIs**](/learning/solutions/automated-diagnostics/examples/apis.html)|_Check Internal API Response Body_<br><br> _Retrieve Diagnostics from SaaS Tools_<br><br>
[<img src="@assets/img/kubernetes-logo.png" style="border:none;">](/learning/solutions/automated-diagnostics/examples/kubernetes.html)<br>[**Kubernetes**](/learning/solutions/automated-diagnostics/examples/kubernetes.html)|_Retrieve Recent Pod Logs_<br><br> _Recent Kubernetes Events_<br><br> _Pod Status & Error Messages_
[<img src="@assets/img/mysql-logo.png" style="border:none;">](/learning/solutions/automated-diagnostics/examples/databases.html)<br>[**Databases**](/learning/solutions/automated-diagnostics/examples/Databases.html)|_Top Resource Consuming Queries_<br><br> _Blocking Locks_<br><br> _Missing Indexes_
[<img src="@assets/img/network-switch.png" style="border:none;">](/learning/solutions/automated-diagnostics/examples/network-devices.html)<br>[**Network Devices**](/learning/solutions/automated-diagnostics/examples/network-devices.html)|_BGP Route Flapping_<br><br> _Spanning Tree Issues_<br><br> _Duplex Mismatch_
[<img src="@assets/img/cloudwatch-logo.png" style="border:none;">](/learning/solutions/automated-diagnostics/examples/observability-integrations.html)<br>[**Observability Integrations**](/learning/solutions/automated-diagnostics/examples/observability-integrations.html)|_Retrieve Application Logs_<br><br> _Surface Relevant Graphs_<br><br> _Capture Time Sensitive Diagnostics_

### **Get started now with the Automated Diagnostics [<span style="color:green"><ins>Solution Guide</ins></span>](/learning/solutions/automated-diagnostics/getting-started.html)**