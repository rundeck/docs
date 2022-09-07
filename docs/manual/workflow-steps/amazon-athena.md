# Amazon Athena Query Workflow Step

::: enterprise
:::

## About Amazon Athena

Amazon Athena is an interactive query service that makes it easy to analyze data in Amazon S3 using standard SQL.

Athena is out-of-the-box integrated with AWS Glue Data Catalog, allowing users to create a unified metadata repository across various services, 
crawl data sources to discover schemas and populate their Catalog with new and modified table and partition definitions, and maintain schema versioning.

To learn more about Amazon Athena, click [here](https://aws.amazon.com/athena).

## About the Amazon Athena Query Workflow Step Plugin

The Athena Query Workflow Step plugin allows users to make queries through Athena to their S3 data as part of their automated-runbook workflows:
<img style='border:1px solid #327af6' src="@assets/img/aws-athena-job-step-config.png" /><br>

## Configuration

Before queries can be made through Athena, data must be made available in S3. For documentation on connecting to data sources, click [here](https://docs.aws.amazon.com/athena/latest/ug/work-with-data-stores.html).

Once Athena has been connected with a data source, it is recommended by AWS to start with the **AWS Managed Policies** for Athena.  These can be found [here](https://docs.aws.amazon.com/athena/latest/ug/managed-policies.html).
Permissions can then be modified to suit the specific use-case for Process Automation.

### Authentication

The IAM Role used for Athena can then be added into Process Automation using **Access Keys** or **Instance or Container Profile**.

#### Option 1: Authentication with Access Keys
These steps outline how to set the AWS Access Keys for a given project.  The credentials can be set for the entire Process Automation _system_ using [Configuration Management](/manual/configuration-mgmt/configmgmt.html).

1. To create an Access Key ID and Secret that is associated with an IAM Role, follow [these instructions](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html).<br><br>
2. Once the keys have been downloaded, add the Secret Key into Project or System **Key Storage** using the **Password** key type, following [these instructions](/manual/system-configs.html#key-storage).<br><br>
3. Navigate to **Project Settings -> Edit Configuration -> Edit Configuration File**. <br><br>
4. Insert **`project.aws.access_key=YOUR_ACCESS_KEY`** with the Access Key from the IAM credentials.<br><br>
5. Insert **`project.aws.secret_key_path=keys/path/to/secret_key`** with the path to the **Secret Key** in Key Storage.<br><br>
6. Click **Save**.

#### Option 2: Authentication with Instance or Container Role

If Process Automation is self-hosted and running on either an EC2 instance or an ECS container, then the Node Executor can leverage the IAM Role that has been associated with the instance or container.
For instructions on how to associate an IAM Role to an EC2, click [here](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html), and for ECS Task Roles, click [here](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-iam-roles.html).

1. Navigate to **Project Settings -> Edit Configuration -> Edit Configuration File**.<br><br>
2. If Process Automation is installed on an EC2, then add **`project.aws.credentialProvider=instance`**.  
   If it is installed on ECS, then add **`project.aws.credentialProvider=container`**.<br><br>
3. Click **Save** to commit the changes to the Project Configuration File.

### Job Step Configuration

1. In a new or existing Job, click on **Add a step**.<br><br>
2. In the **Workflow Steps** tab, search for and select **AWS / Athena / Query**.<br><br>
3. Insert the SQL Query for Athena into the **Query** field.<br><br>
4. Provide the Athena database into the **Database Field**.<br><br>
5. Provide the S3 Bucket for the results of the SQL query into the **Bucket** field.<br><br>
6. Select the **Region** where the Athena client and database resides.<br><br>
7. Optionally provide the **Access Key ID** and **Secret Key** to set the AWS credential on a per Job basis - rather than at the Project or System levels.<br><br>
<img style='border:1px solid #327af6' src="@assets/img/aws-athena-job-step-config.png" /><br>

## Viewing Query Results

When a query to Athena is made through Process Automation, the **first 50 rows** of results from that query are visible in the Log Output of the Job execution:
<img style='border:1px solid #327af6' src="@assets/img/aws-athena-output.png" /><br>

To view the full log output of the Athena query, navigate to the link provided in the log-output.