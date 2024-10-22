---

title: "Learn more about Automated Diagnostics"
date: 2022-10-01
image: /images/chevron-logo-red-on-white.png
feed:
  description: "Did you know the majority of incident duration is spent in diagnosis? Speeding up diagnosis of issues gets you to the the resolution much quicker.  Learn how Automated Diagnostics saves time and reduces interruptions throughout an incident by allowing responders to efficiently triage problems, only escalating to engineers who can resolve the issue. Resolvers have the data they need on hand, and this troubleshooting data is captured in the incident response record for future retrospectives."

---

# Automated Diagnostics

### Overview
Automated diagnostics is a solution provided by integrating PagerDuty's Incident Response and Runbook Automation products. By automating the retrieval of “diagnostic” data during incidents, you can shorten the length of incidents, reduce the number of individuals paged to help with resolution, and gather evidence for fixing the root-cause after the incident.

### Use Cases
There are multiple use-cases and benefits to the Automated Diagnostics solution. Here are a few of the most common examples:
- **Improve Triage**: surfacing diagnostic data can improve the time spent troubleshooting and the number of people pulled into incidents.
- **Capture Environment State**: by capturing the _environment_ or _application_ "state" during an incident, operations engineers and developers have _evidence_ to help them fix code-level bugs and configuration errors - perhaps a while after the incident has been resolved.
- **Realtime Updates**: by querying backend services in realtime, an Incident Commander can more easily provide updates to stakeholders during an incident.

For more details on these use-cases, see [**this section**](/learning/solutions/automated-diagnostics/automation-beyond-triage) of the solution-guide.

### Prebuilt Automation 
PagerDuty provides a solution that helps users start automating diagnostics quickly. This Solution consists of **prebuilt Automation Jobs** that retrieve data from common infrastructure and services for investigating, debugging and diagnosing incidents:

![Automated Diagnostics within PagerDuty](/assets/img/diag-on-pd-timeline.png) 

<br>![Verbose Diagnostics in Runbook Automation](/assets/img/diag-verbose-output.png)

As an example, if an incident is triggered for a service running in Kubernetes, PagerDuty Runbook Automation can retrieve information from logs, API’s, databases and other sources that support this service.  This could be triggered with the click of a button or through event-driven invocation.

### Simplifying and Sharing Diagnostics
Diagnostics retrieved using **Runbook Automation** can be made available in multiple interfaces such as PagerDuty's Mobil App, Slack, and Microsoft Teams:

![Diagnostics in Slack](/assets/img/diag_in_slack.png)

## Examples & Templates
This guide includes a full section on Examples & Best Practices - a preview of that is shown here:


| Examples |
| --- |
| <img src="/assets/img/ecs.png" width="30" height="30"> [Stopped ECS Task Error](/learning/solutions/automated-diagnostics/examples/public-cloud-providers.md) |
|<img src="/assets/img/elb.svg" width="30" height="30">[ELB Targets Health](/docs/learning/solutions/automated-diagnostics/examples/public-cloud-providers.html)|
|<img src="/assets/img/cloudwatch-logo.png" width="30" height="30">[CloudWatch Logs](/docs/learning/solutions/automated-diagnostics/examples/public-cloud-providers.html)|
|<img src="/assets/img/azure-function.png" width="30" height="30">[Azure Function App Health](/docs/learning/solutions/automated-diagnostics/examples/public-cloud-providers.html#azure)|
|<img src="/assets/img/azure-logo.png" width="30" height="30">[Azure File Sync](/docs/learning/solutions/automated-diagnostics/examples/public-cloud-providers.html#azure)|
|<img src="/assets/img/azure-load-balancer.png" width="30" height="30">[Load Balancer Health Probes](/docs/learning/solutions/automated-diagnostics/examples/public-cloud-providers.html#azure)|
|<img src="/assets/img/gcp-load-balancer.png" width="30" height="30">[Load Balancer Health Checks](/docs/learning/solutions/automated-diagnostics/examples/public-cloud-providers.html#google-cloud-platform-gcp)|
|<img src="/assets/img/gcp-firewall.png" width="30" height="30">[Troubleshoot Firewall Rules](/docs/learning/solutions/automated-diagnostics/examples/public-cloud-providers.html#google-cloud-platform-gcp)|
|<img src="/assets/img/gke-logo.png" width="30" height="30">[GKE Cluster Connectivity](/docs/learning/solutions/automated-diagnostics/examples/public-cloud-providers.html#google-cloud-platform-gcp)|
|<img src="/assets/img/linux-logo.png" width="30" height="30">[Top CPU Consuming Processes](/docs/learning/solutions/automated-diagnostics/examples/linux.html)|
|<img src="/assets/img/linux-logo.png" width="30" height="30">[Retrieve Errors from Syslog](/docs/learning/solutions/automated-diagnostics/examples/linux.html)|
|<img src="/assets/img/linux-logo.png" width="30" height="30">[List Top Disk Consuming Files](/docs/learning/solutions/automated-diagnostics/examples/linux.html)|
|<img src="/assets/img/active-directory-logo.svg" width="30" height="30">[Active Directory Replication Statistics](/docs/learning/solutions/automated-diagnostics/examples/windows.html)|
|<img src="/assets/img/windows-logo.png" width="30" height="30">[Retrieve IIS Web Server Logs](/docs/learning/solutions/automated-diagnostics/examples/windows.html)|
|<img src="/assets/img/windows-logo.png" width="30" height="30">[SMB Connection Failures](/docs/learning/solutions/automated-diagnostics/examples/windows.html)|
|<img src="/assets/img/webhook-logo.jpeg" width="30" height="30">[API Health Check](/docs/learning/solutions/automated-diagnostics/examples/apis.html)|
|<img src="/assets/img/kubernetes-logo.png" width="30" height="30">[Recent Pod Logs](/docs/learning/solutions/automated-diagnostics/examples/kubernetes.html)|
|<img src="/assets/img/kubernetes-logo.png" width="30" height="30">[Recent Kubernetes Events](/docs/learning/solutions/automated-diagnostics/examples/kubernetes.html)|
|<img src="/assets/img/kubernetes-logo.png" width="30" height="30">[Pod Status & Errors](/docs/learning/solutions/automated-diagnostics/examples/kubernetes.html)|
|<img src="/assets/img/kubernetes-logo.png" width="30" height="30">[Retrieve Deployment Diagnostics](/docs/learning/solutions/automated-diagnostics/examples/kubernetes.html)|
|<img src="/assets/img/mysql-logo.png" width="30" height="30">[Top Resource Consuming Queries](/docs/learning/solutions/automated-diagnostics/examples/databases.html)|
|<img src="/assets/img/mysql-logo.png" width="30" height="30">[Blocking Locks](/docs/learning/solutions/automated-diagnostics/examples/databases.html)|
|<img src="/assets/img/mysql-logo.png" width="30" height="30">[Missing Indexes](/docs/learning/solutions/automated-diagnostics/examples/databases.html)|
|<img src="/assets/img/network-switch.png" width="30" height="30">[BGP Route Flapping](/docs/learning/solutions/automated-diagnostics/examples/network-devices.html)|
|<img src="/assets/img/network-switch.png" width="30" height="30">[Check Spanning Tree](/docs/learning/solutions/automated-diagnostics/examples/network-devices.html)|
|<img src="/assets/img/network-switch.png" width="30" height="30">[Check Duplex Mismatch](/docs/learning/solutions/automated-diagnostics/examples/network-devices.html)|
|<img src="/assets/img/cloudwatch-logo.png" width="30" height="30">[Retrieve Application Logs](/docs/learning/solutions/automated-diagnostics/examples/observability-integrations.html)|
|<img src="/assets/img/cloudwatch-logo.png" width="30" height="30">[Retrieve Saved Queries](/docs/learning/solutions/automated-diagnostics/examples/observability-integrations.html)|
|<img src="/assets/img/redis-logo.jpeg" width="30" height="30">[Intrinsic Latency Diagnostics Test](#)|
|<img src="/assets/img/redis-logo.jpeg" width="30" height="30">[Check Redis Port Listening](#)|
|<img src="/assets/img/redis-logo.jpeg" width="30" height="30">[Retrieve Redis Memory Statistics](#)|
|<img src="/assets/img/redis-logo.jpeg" width="30" height="30">[Slow Log Entries](#)|
|<img src="/assets/img/rds-logo.png" width="30" height="30">[Check Database Storage Status](#)|
|<img src="/assets/img/nginx-logo.png" width="30" height="30">[Query Nginx Status Endpoint](#)|
|<img src="/assets/img/nginx-logo.png" width="30" height="30">[Retrieve Error Logs](#)|
|<img src="/assets/img/nginx-logo.png" width="30" height="30">[Test Nginx Configuration](#)|
|<img src="/assets/img/postgres-logo.png" width="30" height="30">[Retrieve Recent PostgreSQL Logs](#)|
|<img src="/assets/img/postgres-logo.png" width="30" height="30">[Test for PostgreSQL Server Running](#)|
|<img src="/assets/img/cassandra-logo.png" width="30" height="30">[Check Compaction Statistics](#)|
|<img src="/assets/img/kafka-logo.png" width="30" height="30">[Describe Kafka Topic](#)|
|<img src="/assets/img/kafka-logo.png" width="30" height="30">[View Topic Messages](#)|
|<img src="/assets/img/java-logo.png" width="30" height="30">[Retrieve Java Thread Dump](#)|
|<img src="/assets/img/java-logo.png" width="30" height="30">[Retrieve Java Heap Dump](#)|
|<img src="/assets/img/rabbitmq-logo.png" width="30" height="30">[RabbitMQ Node Health](#)|