# Amazon Web Services - CloudWatch Logs Workflow Step

AWS CloudWatch can serve as a log-aggregator for the majority of logs generated within your cloud environment. 
This includes logs from the Cloud infrastructure, such as ELB logs and VPC Flow logs, as well as logs from the applications running on VM's and containers.

With CloudWatch Logs Insights, queries can be made to log groups within CloudWatch to retrieve statistics and visualizations from the logs.
You can read more about CloudWatch Logs Insights [here](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/AnalyzingLogData.html)

The CloudWatch Logs workflow step plugin allows you to execute queries to your CloudWatch logs as a step within your Automation Job. This can be useful for generating reports as well as automated-debugging and troubleshooting during incidents.

## Getting Started

Authentication for the CloudWatch Logs plugin can be configured within the Job Step Plugin, at the Project level and at the Framework level. 
Alternatively, if you are self-hosting the Automation product in AWS, you can assign an IAM Role to the EC2 or container where the Automation server or cluster is running.

To configure credentials within the Job Step, place your AWS Access Key into the appropriate field, and choose your AWS Secret Key from Key Storage so that the field is populated with a Key Storage Path:
![plugin-step-creds](@assets/img/aws-cloudwatch-logs-creds.png)<br>
<br>
[Optionally] configure credentials at the Project level, navigate to **Project Settings -> Edit Configuration -> Edit Configuration File** and insert the following properties into the Config File:
**`project.aws.access_key`** and **`project.aws.secret_key_path`** and **`project.aws.region`**:<br><br>
![project-creds](@assets/img/aws-cloudwatch-logs-project-creds.png)<br>

[Optionally] configure credentials at the Framework level (spanning across multiple Projects), use [Configuration Management](/manual/configuration-mgmt/configmgmt.html#configuration-management-enterprise)
and fill in the **AWS Access Key** and **AWS Secret Key Path** and **AWS Region** fields:<br><br>
![framework-creds](@assets/img/aws-cloudwatch-logs-framework-creds.png)

### Permissions

For the plugin to be able to query CloudWatch using Logs Insights, the following permissions must be associated with the AWS Credentials or IAM Role used for authentication:
**`logs:StartQuery`** and **`logs:GetQueryResults`**.

## Making Queries to CloudWatch Logs Insights

1. When configuring your Automation Job, add the **Aws / CloudWatch / Logs** Workflow Step.
2. In the **Query Settings** section provide the CloudWatch log group that should be queries using Logs Insights.
3. Select a **Unit of Time** and **Past Time Range** to filter the Logs Insights query time-range. 
For example, if you want to query logs from the past day, you would select _Days_ as the **Unit of Time** and **_1_** as the **Past Time Range**:
<br><br>![query-settings](@assets/img/aws-cloudwatch-logs-query-setting.png)<br>
4. Insert the Logs Insights query into the **Query String** text-box:
<br><br>![query-string](@assets/img/aws-cloudwatch-logs-query-string.png)<br>

::: tip Tip
You can insert Job Options into the Query String using `${option.my_job_option}` notation. This allows users or events to provide variable parameters to the query at Job execution time.
:::
