# Amazon Web Services Athena - Workflow Step

:::enterprise
:::

## Getting Started

[Amazon's Athena](https://aws.amazon.com/athena/) is an interactive query service that makes it easy to analyze data in Amazon S3 using standard SQL. Athena is serverless, so there is no infrastructure to manage, and you pay only for the queries that you run.

### AWS Configuration:

**Access Key ID**
: Specify your AWS Access key

- **Project setting**: project.aws.access_key
- **Configuration Management**/**Framework Setting**: aws.access_key

**Secret Key**
: Specify the path to your AWS Secret Key in the Rundeck Key Storage

- **Project setting**: project.aws.secret_key_path
- **Configuration Management**/**Framework Setting**: aws.secret_key_path

**Region**
: Specify the region for the AWS server to target

- **Project setting**: project.aws.region
- **Configuration Management**/**Framework Setting**: aws.region

## Athena Query Workflow Step

The **AWS / Athena / Query** plugin allows you to create a custom SQL query that it automatically sent to Athena as a workflow step when a Rundeck job is run or triggered. 


**Query**
: Enter the SQL query you would like to make within the multi line text interface. Here is an example query that pulls all the column names from a table:

        SELECT *
        FROM INFORMATION_SCHEMA.COLUMNS
        WHERE TABLE_NAME = 'example-table-name-here';

**Database**
: The name of the database that this query will be sent to. If you want to target a specific table, make sure that table is located inside that database. You can create tables and databases yourself with [Amazon's Glue](https://aws.amazon.com/glue/).

**Bucket**
: The name of the s3 bucket that the results of this query will be stored in. Make sure that the user credentials entered above have access to write in AWS s3 buckets either through user permissions, or by belonging to a user group with access.
