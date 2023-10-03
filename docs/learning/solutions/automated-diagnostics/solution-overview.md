---

title: "Learn more about Automated Diagnostics"
date: 2022-10-01
image: /images/chevron-logo-red-on-white.png
feed:
  description: "Did you know the majority of incident duration is spent in diagnosis? Speeding up diagnosis of issues gets you to the the resolution much quicker.  Learn how Automated Diagnostics saves time and reduces interruptions throughout an incident by allowing responders to efficiently triage problems, only escalating to engineers who can resolve the issue. Resolvers have the data they need on hand, and this troubleshooting data is captured in the incident response record for future retrospectives."

---

# Automated Diagnostics

## What is PagerDuty's Automated Diagnostics Solution?
Automated diagnostics is a solution provided by integrating PagerDuty's Incident Response and Runbook Automation products. By automating the retrieval of “diagnostic” data during incidents, you can shorten the length of incidents, reduce the number of individuals paged to help with resolution, and gather evidence for fixing the root-cause after the incident.

### Use Cases
There are multiple use-cases and benefits to the Automated Diagnostics solution. Here are a few of the most common examples:
1. **Improve Triage**: surfacing diagnostic data can improve the time spent troubleshooting and the number of people pulled into incidents.
2. **Capture Environment State**: by capturing the _environment_ or _application_ "state" during an incident, operations engineers and developers have _evidence_ to help them fix code-level bugs and configuration errors - perhaps a while after the incident has been resolved.
3. **Realtime Updates**: by querying backend services in realtime, an Incident Commander can more easily provide updates to stakeholders during an incident.

For more details on these use-cases, see [**this section**](/learning/solutions/automated-diagnostics/automation-beyond-triage) of the solution-guide.

### Prebuilt Automation 
PagerDuty provides a solution that helps users start automating diagnostics quickly. This Solution consists of **prebuilt Automation Jobs** that retrieve data from common infrastructure and services for investigating, debugging and diagnosing incidents:

![Automated Diagnostics within PagerDuty](/assets/img/diag-on-pd-timeline.png) 

<br>

![Verbose Diagnostics in Process Automation](/assets/img/diag-verbose-output.png)

As an example, if an incident is triggered for a service running in Kubernetes, PagerDuty Runbook Automation can retrieve information from logs, API’s, databases and other sources that support this service.  This could be triggered with the click of a button or through event-driven invocation.

### Simplifying and Sharing Diagnostics
Diagnostics retrieved using **Runbook Automation** can be made available in multiple interfaces such as PagerDuty's Mobil App, Slack, and Microsoft Teams:

![Diagnostics in Slack](/assets/img/diag_in_slack.png)

## Examples & Templates
This guide includes a full section on Examples & Best Practices - a preview of that is shown here:

<style type="text/css">
.tg  {border:none;border-collapse:collapse;border-spacing:0;margin:0px auto;}
.tg td{border-style:solid;border-width:0px;font-family:Arial, sans-serif;font-size:14px;overflow:hidden;
  padding:10px 5px;word-break:normal;}
.tg th{border-style:solid;border-width:0px;font-family:Arial, sans-serif;font-size:14px;font-weight:normal;
  overflow:hidden;padding:10px 5px;word-break:normal;}
.tg .tg-8jgo{border-color:#ffffff;text-align:center;vertical-align:top}
@media screen and (max-width: 767px) {.tg {width: auto !important;}.tg col {width: auto !important;}.tg-wrap {overflow-x: auto;-webkit-overflow-scrolling: touch;margin: auto 0px;}}</style>
<div class="tg-wrap"><table class="tg" style="undefined;table-layout: fixed; width: 1213px">
<colgroup>
<col style="width: 286px">
<col style="width: 274px">
<col style="width: 325px">
<col style="width: 328px">
</colgroup>
<tbody>
  <tr>
    <td class="tg-8jgo">
        <a href="/docs/learning/solutions/automated-diagnostics/examples/public-cloud-providers">
        <img src="/assets/img/ecs.png" width="100" height="100" border="0"><br><br>Stopped ECS Task Errors</a>
    </td>
    <td class="tg-8jgo">
        <a href="/docs/learning/solutions/automated-diagnostics/examples/public-cloud-providers">
        <img src="/assets/img/elb.svg" width="100" height="100"><br><br>ELB Targets Health</a>
    </td>
    <td class="tg-8jgo">
        <a href="/docs/learning/solutions/automated-diagnostics/examples/public-cloud-providers">
        <img src="/assets/img/cloudwatch-logo.png" width="100" height="100"><br><br>CloudWatch Logs</a>
    </td>
    <td class="tg-8jgo">
        <a href="/docs/learning/solutions/automated-diagnostics/examples/public-cloud-providers.html#azure">
        <img src="/assets/img/azure-function.png" width="100" height="100"><br><br>Azure Function App Health</a>
    </td>
  </tr>
  <tr>
    <td class="tg-8jgo">
        <a href="/docs/learning/solutions/automated-diagnostics/examples/public-cloud-providers.html#azure">
        <img src="/assets/img/azure-logo.png" width="100" height="100"><br><br>Azure File Sync</a>
    </td>
    <td class="tg-8jgo">
        <a href="/docs/learning/solutions/automated-diagnostics/examples/public-cloud-providers.html#azure">
        <img src="/assets/img/azure-load-balancer.png" width="100" height="100"><br><br>Load Balancer Health Probes</a>
    </td>
    <td class="tg-8jgo">
        <a href="/docs/learning/solutions/automated-diagnostics/examples/public-cloud-providers.html#google-cloud-platform-gcp">
        <img src="/assets/img/gcp-load-balancer.png" width="100" height="100"><br><br>Load Balancer Health Checks</a>
    </td>
    <td class="tg-8jgo">
        <a href="/docs/learning/solutions/automated-diagnostics/examples/public-cloud-providers.html#google-cloud-platform-gcp">
        <img src="/assets/img/gcp-firewall.png" width="100" height="100"><br><br>Troubleshoot Firewall Rules</a>
    </td>
  </tr>
  <tr>
    <td class="tg-8jgo">
        <a href="/docs/learning/solutions/automated-diagnostics/examples/public-cloud-providers.html#google-cloud-platform-gcp">
        <img src="/assets/img/gke-logo.png" width="100" height="100"><br><br>GKE Cluster Connectivity</a>
    </td>
    <td class="tg-8jgo">
        <a href="/docs/learning/solutions/automated-diagnostics/examples/linux">
        <img src="/assets/img/linux-logo.png" width="100" height="100"><br><br>Top CPU Consuming Processes</a>
    </td>
    <td class="tg-8jgo">
        <a href="/docs/learning/solutions/automated-diagnostics/examples/linux">
        <img src="/assets/img/linux-logo.png" width="100" height="100"><br><br>Retrieve Errors from Syslog</a>
    </td>
    <td class="tg-8jgo">
        <a href="/docs/learning/solutions/automated-diagnostics/examples/linux">
        <img src="/assets/img/linux-logo.png" width="100" height="100"><br><br>List Top Disk Consuming Files</a>
    </td>
  </tr>
  <tr>
    <td class="tg-8jgo">
        <a href="/docs/learning/solutions/automated-diagnostics/examples/windows">
        <img src="/assets/img/active-directory-logo.svg" width="100" height="100"><br><br>Active Directory Replication Statistics</a>
    </td>
    <td class="tg-8jgo">
        <a href="/docs/learning/solutions/automated-diagnostics/examples/windows">
        <img src="/assets/img/windows-logo.png" width="100" height="100"><br><br>Retrieve IIS Web Server Logs</a>
    </td>
    <td class="tg-8jgo">
        <a href="/docs/learning/solutions/automated-diagnostics/examples/windows">
        <img src="/assets/img/windows-logo.png" width="100" height="100"><br><br>SMB Connection Failures</a>
    </td>
    <td class="tg-8jgo">
        <a href="/docs/learning/solutions/automated-diagnostics/examples/apis">
        <img src="/assets/img/webhook-logo.jpeg" width="100" height="100"><br><br>API Health Check</a>
    </td>
    <td class="tg-8jgo"></td>
  </tr>
  <tr>
    <td class="tg-8jgo">
        <a href="/docs/learning/solutions/automated-diagnostics/examples/kubernetes">
        <img src="/assets/img/kubernetes-logo.png" width="100" height="100"><br><br>Recent Pod Logs</a>
    </td>
    <td class="tg-8jgo">
        <a href="/docs/learning/solutions/automated-diagnostics/examples/kubernetes">
        <img src="/assets/img/kubernetes-logo.png" width="100" height="100"><br><br>Recent Kubernetes Events</a>
    </td>
    <td class="tg-8jgo">
        <a href="/docs/learning/solutions/automated-diagnostics/examples/kubernetes">
        <img src="/assets/img/kubernetes-logo.png" width="100" height="100"><br><br>Pod Status & Errors</a>
    </td>
    <td class="tg-8jgo">
        <a href="/docs/learning/solutions/automated-diagnostics/examples/kubernetes">
        <img src="/assets/img/kubernetes-logo.png" width="100" height="100"><br><br>Retrieve Deployment Diagnostics</a>
    </td>
  </tr>
  <tr>
    <td class="tg-8jgo">
        <a href="/docs/learning/solutions/automated-diagnostics/examples/databases">
        <img src="/assets/img/mysql-logo.png" width="100" height="100"><br><br>Top Resource Consuming Queries</a>
    </td>
    <td class="tg-8jgo">
        <a href="/docs/learning/solutions/automated-diagnostics/examples/databases">
        <img src="/assets/img/mysql-logo.png" width="100" height="100"><br><br>Blocking Locks</a>
    </td>
    <td class="tg-8jgo">
        <a href="/docs/learning/solutions/automated-diagnostics/examples/databases">
        <img src="/assets/img/mysql-logo.png" width="100" height="100"><br><br>Missing Indexes</a>
    </td>
    <td class="tg-8jgo">
        <a href="/docs/learning/solutions/automated-diagnostics/examples/network-devices">
        <img src="/assets/img/network-switch.png" width="100" height="100"><br><br>BGP Route Flapping</a>
    </td>
  </tr>
  <tr>
    <td class="tg-8jgo">
        <a href="/docs/learning/solutions/automated-diagnostics/examples/network-devices">
        <img src="/assets/img/network-switch.png" width="100" height="100"><br><br>Check Spanning Tree</a>
    </td>
    <td class="tg-8jgo">
        <a href="/docs/learning/solutions/automated-diagnostics/examples/network-devices">
        <img src="/assets/img/network-switch.png" width="100" height="100"><br><br>Check Duplex Mismatch</a>
    </td>
    <td class="tg-8jgo">
        <a href="/docs/learning/solutions/automated-diagnostics/examples/observability-integrations">
        <img src="/assets/img/cloudwatch-logo.png" width="100" height="100"><br><br>Retrieve Application Logs</a>
    </td>
    <td class="tg-8jgo">
        <a href="/docs/learning/solutions/automated-diagnostics/examples/observability-integrations">
        <img src="/assets/img/cloudwatch-logo.png" width="100" height="100"><br><br>Retrieve Saved Queries</a>
    </td>
  </tr>
  <tr>
    <td class="tg-8jgo"><img src="/assets/img/redis-logo.jpeg" width="100" height="100"><br><br>Intrinsic Latency Diagnostics Test</td>
    <td class="tg-8jgo"><img src="/assets/img/redis-logo.jpeg" width="100" height="100"><br><br>Check Redis Port Listening</td>
    <td class="tg-8jgo"><img src="/assets/img/redis-logo.jpeg" width="100" height="100"><br><br>Retrieve Redis Memory Statistics</td>
    <td class="tg-8jgo"><img src="/assets/img/redis-logo.jpeg" width="100" height="100"><br><br>Slow Log Entries</td>
  </tr>
  <tr>
    <td class="tg-8jgo"><img src="/assets/img/rds-logo.png" width="100" height="100"><br><br>Check Database Storage Status</td>
    <td class="tg-8jgo"><img src="/assets/img/nginx-logo.png" width="100" height="100"><br><br>Query Nginx Status Endpoint</td>
    <td class="tg-8jgo"><img src="/assets/img/nginx-logo.png" width="100" height="100"><br><br>Retrieve Error Logs</td>
    <td class="tg-8jgo"><img src="/assets/img/nginx-logo.png" width="100" height="100"><br><br>Test Nginx Configuration</td>
  </tr>
  <tr>
    <td class="tg-8jgo"><img src="/assets/img/postgres-logo.png" width="100" height="100"><br><br>Retrieve Recent PostgreSQL Logs</td>
    <td class="tg-8jgo"><img src="/assets/img/postgres-logo.png" width="100" height="100"><br><br>Test for PostgreSQL Server Running</td>
    <td class="tg-8jgo"><img src="/assets/img/cassandra-logo.png" width="100" height="100"><br><br>Check Compaction Statistics</td>
    <td class="tg-8jgo"><img src="/assets/img/kafka-logo.png" width="100" height="100"><br><br>Describe Kafka Topic</td>
  </tr>
  <tr>
    <td class="tg-8jgo"><img src="/assets/img/kafka-logo.png" width="100" height="100"><br><br>View Topic Messages</td>
    <td class="tg-8jgo"><img src="/assets/img/java-logo.png" width="100" height="100"><br><br>Retrieve Java Thread Dump</td>
    <td class="tg-8jgo"><img src="/assets/img/java-logo.png" width="100" height="100"><br><br>Retrieve Java Heap Dump</td>
    <td class="tg-8jgo"><img src="/assets/img/rabbitmq-logo.png" width="100" height="100"><br><br>RabbitMQ Node Health</td>
  </tr>
</tbody>
</table></div>