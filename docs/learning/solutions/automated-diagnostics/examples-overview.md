<style>
.reveal section img { background:none; border:none; box-shadow:none; }
</style>

# Automated Diagnostics
---

## Examples & Best Practices

The following sections outline common diagnostics for different types of infrastructure and applications.  
Details are also provided on the various mechanisms that can be used to integrate with the various environments.  
For example, with many technologies, there are options to integrate using plugins, command-line interfaces (CLIs), or API calls.

In addition, many sections include example Jobs that can be imported into your Automation Instance - helping you get started quickly with Automated Diagnostics.  
Other prebuilt Jobs are included in the Automated Diagnostics Solution package, which is preinstalled for Runbook Automation customers and can be downloaded for Process Automation customers from the [getting started](/learning/solutions/automated-diagnostics/getting-started) section.

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