# Amazon - CloudWatch Logs Workflow Step Plugins

AWS CloudWatch can serve as a log-aggregator for the majority of logs generated within your cloud environment. 
This includes logs from the Cloud infrastructure, such as ELB logs and VPC Flow logs, as well as logs from the applications running on VM's and containers.

With CloudWatch Logs Insights, queries can be made to log groups within CloudWatch to retrieve statistics and visualizations from the logs.
You can read more about CloudWatch Logs Insights [here](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/AnalyzingLogData.html)

The CloudWatch Logs workflow step plugins allows users to execute queries to your CloudWatch logs as a step within your Automation Job. This can be useful for generating reports as well as automated-debugging and troubleshooting during incidents.

There are two CloudWatch Logs plugins:

[AWS / CloudWatch / Logs](#execute-ad-hoc-cloudwatch-logs-query): Users can insert CloudWatch Logs Insights queries directly into the Runbook and Process Automation Job Step.

[AWS / CloudWatch / Execute Saved Query](#execute-saved-cloudwatch-logs-query): Users specify a saved Logs Insights query in CloudWatch for Runbook and Process Automation to execute.

## Getting Started

### Permissions
Both CloudWatch plugins require the following permissions to be associated with the AWS Credentials or IAM Role used for authentication:
**`logs:StartQuery`** and **`logs:GetQueryResults`**.

The [**Execute Saved Query**](#execute-saved-cloudwatch-logs-query) plugin _**also**_ requires **`logs:DescribeQueryDefinitions`**.

### Authentication
Authentication to AWS can be performed from Process and Runbook Automation using **Instance or Container Profile** or **Access Keys**:

#### Option 1: Authentication with Instance or Container Role

If Process Automation is self-hosted and running on either an EC2 instance or an ECS container, then the Node Executor can leverage the IAM Role that has been associated with the instance or container.
For instructions on how to associate an IAM Role to an EC2, click [here](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html), and for ECS Task Roles, click [here](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-iam-roles.html).

1. Navigate to **Project Settings -> Edit Configuration -> Edit Configuration File**.<br><br>
2. If Process Automation is installed on an EC2, then add **`project.aws.credentialProvider=instance`**.  
   If it is installed in an ECS container, then add **`project.aws.credentialProvider=container`**.<br><br>
3. Click **Save** to commit the changes to the Project Configuration File.

#### Option 2: Authentication with Access Keys
These steps outline how to set the AWS Access Keys for a given project.  The credentials can be set for the entire Process Automation _system_ using [Configuration Management](/manual/configuration-mgmt/configmgmt.html).

1. To create an Access Key ID and Secret that is associated with an IAM Role, follow [these instructions](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html).<br><br>
2. Once the keys have been downloaded, add the Secret Key into Project or System **Key Storage** using the **Password** key type, following [these instructions](/manual/system-configs.html#key-storage).<br><br>
3. Navigate to **Project Settings -> Edit Configuration -> Edit Configuration File**. <br><br>
4. Insert **`project.aws.access_key=YOUR_ACCESS_KEY`** with the Access Key from the IAM credentials.<br><br>
5. Insert **`project.aws.secret_key_path=keys/path/to/secret_key`** with the path to the **Secret Key** in Key Storage.<br><br>
6. Click **Save**.

## Execute Ad-Hoc CloudWatch Logs Query

1. When configuring your Automation Job, add the **Aws / CloudWatch / Logs** Workflow Step.
2. In the **Query Settings** section provide the CloudWatch log group that should be queried using Logs Insights.
3. Select a **Unit of Time** and **Past Time Range** to filter the Logs Insights query time-range. 
For example, if you want to query logs from the past day, you would select _Days_ as the **Unit of Time** and **_1_** as the **Past Time Range**:
<br><br><img style='border:1px solid #327af6' src="@assets/img/aws-cloudwatch-logs-query-setting.png" /><br><br>
4. Insert the Logs Insights query into the **Query String** text-box:
<br><br><img style='border:1px solid #327af6' src="@assets/img/aws-cloudwatch-logs-query-string.png" /><br>

::: tip Tip
You can insert Job Options into the Query String using `${option.my_job_option}` notation. This allows users or events to provide variable parameters to the query at Job execution time.
:::

### See it in Action
This plugin is used in one of the prebuilt Jobs in our [**_Automated Diagnostics Solution_**](/learning/solutions/automated-diagnostics/solution-overview).
Try out the Solution to see how this plugin can be used as part of incident-response workflows.

## Execute Saved CloudWatch Logs Query

1. When configuring an Automation Job, add the **Aws / CloudWatch / Execute Saved Query** Workflow Step.
2. **Query Path**: Provide the folder path where the saved query resides:<br>
   <img style='border:1px solid #327af6' src="@assets/img/cloudwatch-saved-query-console.png" /><figcaption>Example: The saved query _**fetch-nginx**_ resides in the _**infra/nginx**_ folder path</figcaption><br>
   <img style='border:1px solid #327af6' src="@assets/img/cloudwatch-saved-query-fields.png"/>
3. **Query Name**: Provide the name of the saved query.  In the example above, **`fetch-nginx`** is the name of the saved query.
4. **Log Groups**: Provide a list of the CloudWatch Log Groups that the saved query will use as the source of logs.  This can be one or multiple Log Groups.
5. **Unit of Time**: Select a unit of time to define the time-range for the CloudWatch Logs query.
6. **Past Time Range**: Define a time-range for the CloudWatch Logs query. 
For example, if **`Minutes`** was chosen for **Unit of Time**, and **`30`** was chosen for **Past Time Range**, then when the saved query is executed, it will retrieve logs from the past 30 minutes.

### Log Queries Output

The output of the CloudWatch Logs queries is presented in a table as shown here:
![CW Log Queries Output](@assets/img/cloudwatch-log-queries-output.png)
