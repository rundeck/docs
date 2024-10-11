## Automated Diagnostics
### Prebuilt Jobs

Jobs are arranged in Job Groups (folders) based on their purpose or related technology.

:::tip Note
Many of these Jobs depend on a method of sending of commands to remote-nodes (such as EC2's). 
Follow the SSM Tour outlined in the [Tours section](/learning/solutions/automated-diagnostics/tours) to use Systems Manager, or install an [Enterprise Runner](/administration/runner/) for SSH so that Runbook Automation can send commands to the remote-nodes.  
:::

Group|Job Name
----|--------
AWS / CloudWatch|Nginx Rejected Requests
AWS / CloudWatch|Top 10 Hosts by Throughput on Subnet
AWS / CloudWatch|Top 10 Source IP Addresses with Highest Rejected Requests
AWS / CloudWatch|Top 10 Web-Server Requesters by Public IP
AWS / CloudWatch|UDP Transfer Protocol IP Addresses Identification
AWS / EC2|Instance Status
AWS / ECS|Java Thread Dump from Container
AWS / ECS|Stopped ECS Task Errors
AWS / ELB|Retrieve ELB Targets Health Status
AWS / RDS|Check Database Storage Status
Kubernetes|Describe Deployment
Kubernetes|Describe Replicaset
Kubernetes|Describe Specific Pod
Kubernetes|Execute Command in Pod
Kubernetes|List Recent Events
Kubernetes|Retrieve Logs from Kubernetes by Selector Label
Kubernetes|Tail Logs from Individual Kubernetes Pod
Linux|CPU, Memory & Disk to PagerDuty Incident
Linux|Retrieve Errors from Syslog
Linux|Retrieve Service Status
Linux|Top CPU & Memory Consuming Processes
Linux|Top Disk Consuming Files
Nginx|Curl Localhost Endpoint
Nginx|Retrieve Error Logs
Nginx|Test Nginx Configuration
PostGreSQL|Tail PostgreSQL Logs Files
PostGreSQL|Test is PostgreSQL Server is Running
Redis|Check Port 6379 is Listening
Redis|Redis Memory Statistics
Redis|Slow Log Entries

### How to Use the Node Filter Job Option
All Jobs that send commands to a remote-node have a predefined Node Filter set to `{$option.node_filter}`:

![Node Filter](/assets/img/solutions-auto-diag-node-filter.png)<br>

This is so that target-nodes can be specified in the Job invocations from [**PagerDuty Automation Actions**](https://www.pagerduty.com/platform/automation/actions/) - as described in the next section of this Solution Guide.

#### Target Specific Nodes
To target specific Nodes for the prebuilt Jobs within the Runbook Automation Interface:

1. Select **`Change the Target Nodes`**
2. Click the dropdown to the left of **`${option.node_filter}`**
3. Click on **Show all nodes**
![Change Nodes](/assets/img/solutions-auto-diag-change-nodes.png)<br><br>
4. Click on an individual Node, and click the small **Arrow** to the right of the Node Name:
![Select Node](/assets/img/solutions-auto-diag-select-node.png)<br>

This will allow you to target the _individual_ node selected.  If you want to target multiple Nodes, see the [Node Filter Documentation](/manual/11-node-filters).

### **With the Prebuilt Jobs, you can [<span style="color:green"><ins>integrate with Automation Actions!</ins></span>](/learning/solutions/automated-diagnostics/automation-actions.md)**