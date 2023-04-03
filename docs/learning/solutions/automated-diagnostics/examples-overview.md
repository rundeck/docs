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
    <td class="tg-8jgo"><img src="@assets/img/ecs.png" width="100" height="100" border="0"><br><br>Stopped ECS Task Errors</td>
    <td class="tg-8jgo"><img src="@assets/img/elb.svg" width="100" height="100"><br><br>ELB Targets Health</td>
    <td class="tg-8jgo"><img src="@assets/img/cloudwatch-logo.png" width="100" height="100"><br><br>CloudWatch Logs</td>
    <td class="tg-8jgo"><img src="@assets/img/azure-function.png" width="100" height="100"><br><br>Azure Function App Health</td>
  </tr>
  <tr>
    <td class="tg-8jgo"><img src="@assets/img/azure-logo.png" width="100" height="100"><br><br>Azure File Sync</td>
    <td class="tg-8jgo"><img src="@assets/img/azure-load-balancer.png" width="100" height="100"><br><br>Load Balancer Health Probes</td>
    <td class="tg-8jgo"><img src="@assets/img/gcp-load-balancer.png" width="100" height="100"><br><br>Load Balancer Health Checks</td>
    <td class="tg-8jgo"><img src="@assets/img/gcp-firewall.png" width="100" height="100"><br><br>Troubleshoot Firewall Rules</td>
  </tr>
  <tr>
    <td class="tg-8jgo"><img src="@assets/img/gke-logo.png" width="100" height="100"><br><br>GKE Cluster Connectivity</td>
    <td class="tg-8jgo"><img src="@assets/img/linux-logo.png" width="100" height="100"><br><br>Top CPU Consuming Processes</td>
    <td class="tg-8jgo"><img src="@assets/img/linux-logo.png" width="100" height="100"><br><br>Retrieve Errors from Syslog</td>
    <td class="tg-8jgo"><img src="@assets/img/linux-logo.png" width="100" height="100"><br><br>List Top Disk Consuming Files</td>
  </tr>
  <tr>
    <td class="tg-8jgo"><img src="@assets/img/active-directory-logo.svg" width="100" height="100"><br><br>Active Directory Replication Statistics</td>
    <td class="tg-8jgo"><img src="@assets/img/windows-logo.png" width="100" height="100"><br><br>Retrieve IIS Web Server Logs</td>
    <td class="tg-8jgo"><img src="@assets/img/windows-logo.png" width="100" height="100"><br><br>SMB Connection Failures</td>
    <td class="tg-8jgo"><img src="@assets/img/webhook-logo.jpeg" width="100" height="100"><br><br>API Health Check</td>
    <td class="tg-8jgo"></td>
  </tr>
  <tr>
    <td class="tg-8jgo"><img src="@assets/img/kubernetes-logo.png" width="100" height="100"><br><br>Recent Pod Logs</td>
    <td class="tg-8jgo"><img src="@assets/img/kubernetes-logo.png" width="100" height="100"><br><br>Recent Kubernetes Events</td>
    <td class="tg-8jgo"><img src="@assets/img/kubernetes-logo.png" width="100" height="100"><br><br>Pod Status & Errors</td>
    <td class="tg-8jgo"><img src="@assets/img/kubernetes-logo.png" width="100" height="100"><br><br>Retrieve Deployment Diagnostics</td>
  </tr>
  <tr>
    <td class="tg-8jgo"><img src="@assets/img/mysql-logo.png" width="100" height="100"><br><br>Top Resource Consuming Queries</td>
    <td class="tg-8jgo"><img src="@assets/img/mysql-logo.png" width="100" height="100"><br><br>Blocking Locks</td>
    <td class="tg-8jgo"><img src="@assets/img/mysql-logo.png" width="100" height="100"><br><br>Missing Indexes</td>
    <td class="tg-8jgo"><img src="@assets/img/network-switch.png" width="100" height="100"><br><br>BGP Route Flapping</td>
  </tr>
  <tr>
    <td class="tg-8jgo"><img src="@assets/img/network-switch.png" width="100" height="100"><br><br>Check Spanning Tree</td>
    <td class="tg-8jgo"><img src="@assets/img/network-switch.png" width="100" height="100"><br><br>Check Duplex Mismatch</td>
    <td class="tg-8jgo"><img src="@assets/img/cloudwatch-logo.png" width="100" height="100"><br><br>Retrieve Application Logs</td>
    <td class="tg-8jgo"><img src="@assets/img/cloudwatch-logo.png" width="100" height="100"><br><br>Retrieve Saved Queries</td>
  </tr>
  <tr>
    <td class="tg-8jgo"><img src="@assets/img/redis-logo.jpeg" width="100" height="100"><br><br>Intrinsic Latency Diagnostics Test</td>
    <td class="tg-8jgo"><img src="@assets/img/redis-logo.jpeg" width="100" height="100"><br><br>Check Redis Port Listening</td>
    <td class="tg-8jgo"><img src="@assets/img/redis-logo.jpeg" width="100" height="100"><br><br>Retrieve Redis Memory Statistics</td>
    <td class="tg-8jgo"><img src="@assets/img/redis-logo.jpeg" width="100" height="100"><br><br>Slow Log Entries</td>
  </tr>
  <tr>
    <td class="tg-8jgo"><img src="@assets/img/rds-logo.png" width="100" height="100"><br><br>Check Database Storage Status</td>
    <td class="tg-8jgo"><img src="@assets/img/nginx-logo.png" width="100" height="100"><br><br>Query Nginx Status Endpoint</td>
    <td class="tg-8jgo"><img src="@assets/img/nginx-logo.png" width="100" height="100"><br><br>Retrieve Error Logs</td>
    <td class="tg-8jgo"><img src="@assets/img/nginx-logo.png" width="100" height="100"><br><br>Test Nginx Configuration</td>
  </tr>
  <tr>
    <td class="tg-8jgo"><img src="@assets/img/postgres-logo.png" width="100" height="100"><br><br>Retrieve Recent PostgreSQL Logs</td>
    <td class="tg-8jgo"><img src="@assets/img/postgres-logo.png" width="100" height="100"><br><br>Test for PostgreSQL Server Running</td>
    <td class="tg-8jgo"><img src="@assets/img/cassandra-logo.png" width="100" height="100"><br><br>Check Compaction Statistics</td>
    <td class="tg-8jgo"><img src="@assets/img/kafka-logo.png" width="100" height="100"><br><br>Describe Kafka Topic</td>
  </tr>
  <tr>
    <td class="tg-8jgo"><img src="@assets/img/kafka-logo.png" width="100" height="100"><br><br>View Topic Messages</td>
  </tr>
</tbody>
</table></div>