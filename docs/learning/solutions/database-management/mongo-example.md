# MongoDB - Build an Example Database

This solution demonstrates how to use the MongoDB plugin in Rundeck through a practical example job. The example creates a sample database structure that you can use to test and learn MongoDB operations within Rundeck.

## Pre-requisites & Environment Setup

- Environment setup with active Enterprise Runner
- MongoDB installed and accessible from your Enterprise Runner
- MongoDB user with appropriate permissions for database operations
- Password stored in KeyStorage (default path: keys/mongodb)
- Be sure to select a runner before starting the job. No Runners are selected by default.

## MongoDB Plugin Overview

The MongoDB plugin allows you to execute MongoDB commands directly from Rundeck jobs. Each step in the job demonstrates different capabilities of the plugin:

### Key Plugin Parameters

For specific docs on these parameters check out the [Plugin documentation](/manual/jobs/job-plugins/workflow-steps/mongodb.md).  The list below explains how the default job definition is configured.

- Database Deployment: Default "MongoDB".  If you are using Atlas this will need to be changed. 
- MongoDB Server: Default "mongodb".  The runner will use this DNS name to connect to the MongoDB Server.  Adjust for your environment or ensure "mongodb" resolves to the host you want to connect to.
- Database Name: Default "ecommerce_db". 
- Username: Default "admin".  If you need to use a different user change this value
- Password from Key Storage: Default "keys/mongodb".  If the path to your stored MongoDB password in KeyStorage is different use the selection tool to pick it.
- MongoDB Command: The MongoDB command the step will execute

## Example Job Structure

The example job demonstrates these operations in sequence, creating a sample e-commerce database:

1. Database cleanup/creation
2. Collection creation
3. Sample data insertion
4. Index creation
5. Verification query

## Troubleshooting

Common issues and their solutions:

- **Connection Failures:** Verify MongoDB host accessibility from the Enterprise Runner
- **Authentication Errors:** Check user permissions and KeyStorage path