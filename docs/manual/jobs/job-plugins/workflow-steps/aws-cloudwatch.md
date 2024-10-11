# Amazon - CloudWatch Logs Workflow Step Plugins

AWS CloudWatch can serve as a log-aggregator for the majority of logs generated within your cloud environment. 
This includes logs from the Cloud infrastructure, such as ELB logs and VPC Flow logs, as well as logs from the applications running on VM's and containers.

With CloudWatch Logs Insights, queries can be made to log groups within CloudWatch to retrieve statistics and visualizations from the logs.
You can read more about CloudWatch Logs Insights [here](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/AnalyzingLogData.html)

The CloudWatch Logs workflow step plugins allows users to execute queries to your CloudWatch logs as a step within your Automation Job. This can be useful for generating reports as well as automated-debugging and troubleshooting during incidents.

There are two CloudWatch Logs plugins:

[AWS / CloudWatch / Logs](#execute-ad-hoc-cloudwatch-logs-query): Users can insert CloudWatch Logs Insights queries directly into the Runbook Automation Job Step.

[AWS / CloudWatch / Execute Saved Query](#execute-saved-cloudwatch-logs-query): Users specify a saved Logs Insights query in CloudWatch for Runbook Automation to execute.

## Getting Started

### Authentication
Follow the instructions outlined in the [AWS Plugins Overview](/manual/plugins/aws-plugins-overview.md) for Runbook Automation to authenticate with AWS.

When defining the IAM Role for Runbook Automation, be sure to include the following permissions in the Policy associated with the role:

* **`logs:StartQuery`**
* **`logs:GetQueryResults`**
* The [**Execute Saved Query**](#execute-saved-cloudwatch-logs-query) plugin _**also**_ requires **`logs:DescribeQueryDefinitions`**.

## Execute Ad-Hoc CloudWatch Logs Query

1. When configuring your Automation Job, add the **Aws / CloudWatch / Logs** Workflow Step.
2. In the **Query Settings** section provide the CloudWatch log group that should be queried using Logs Insights.
3. Select a **Unit of Time** and **Past Time Range** to filter the Logs Insights query time-range. 
For example, if you want to query logs from the past day, you would select _Days_ as the **Unit of Time** and **_1_** as the **Past Time Range**:
![CloudWatch Logs Query Setting](/assets/img/aws-cloudwatch-logs-query-setting.png)<br><br>
4. Insert the Logs Insights query into the **Query String** text-box:
![Ad Hoc CloudWatch Logs Query](/assets/img/aws-cloudwatch-logs-query-string.png)<br>

::: tip Tip
You can insert Job Options into the Query String using `${option.my_job_option}` notation. This allows users or events to provide variable parameters to the query at Job execution time.
:::

### See it in Action
This plugin is used in one of the prebuilt Jobs in our [**_Automated Diagnostics Solution_**](/learning/solutions/automated-diagnostics/index.md).
Try out the Solution to see how this plugin can be used as part of incident-response workflows.

## Execute Saved CloudWatch Logs Query

1. When configuring an Automation Job, add the **Aws / CloudWatch / Execute Saved Query** Workflow Step.
2. **Query Path**: Provide the folder path where the saved query resides:
   ![Example: The saved query _**fetch-nginx**_ resides in the _**infra/nginx**_ folder path](/assets/img/cloudwatch-saved-query-console.png)
   ![Execute Saved Query](/assets/img/cloudwatch-saved-query-fields.png)<br><br>
3. **Query Name**: Provide the name of the saved query.  In the example above, **`fetch-nginx`** is the name of the saved query.
4. **Log Groups**: Provide a list of the CloudWatch Log Groups that the saved query will use as the source of logs.  This can be one or multiple Log Groups.
5. **Unit of Time**: Select a unit of time to define the time-range for the CloudWatch Logs query.
6. **Past Time Range**: Define a time-range for the CloudWatch Logs query. 
For example, if **`Minutes`** was chosen for **Unit of Time**, and **`30`** was chosen for **Past Time Range**, then when the saved query is executed, it will retrieve logs from the past 30 minutes.

### Log Queries Output

The output of the CloudWatch Logs queries is presented in a table as shown here:
![CW Log Queries Output](/assets/img/cloudwatch-log-queries-output.png)
