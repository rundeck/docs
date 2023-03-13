---
title: "Runner Installation"
---


# Enterprise Runner - Installation
## Installing Runners in remote locations
Once you have [configured and downloaded a Runner](/administration/runner/runner-config.md), upload the binary to the environment where it will run, follow the install instructions and launch the runner.

### Pre-Requisites:
- Same [OS requirements as Rundeck](/administration/install/system-requirements.md)
- Java 11 is required to run the Runner JAR file.

### Install steps
1. Copy the Runner JAR file that was saved when the Runner was created to the server and directory where it will run.
1. Execute `java -jar runner_filename.jar` to start the service.
1. Connection can be confirmed on the Runner Management page on the Last Checkin line. If there are errors in the output resolve those using troubleshooting steps below: 
1. Runner Logs are located in the ./runner/logs folder under the folder where the jar was executed from. The runner.log file contains operational and important messages about the runner. operations.log tracks an operation starts and if it succeeds or fails. 
Read more about [Runner logging configuration](/administration/runner/runner-logging.md) to customize logging.

## Updating runners properties and tokens through environment variables 
The Runner properties can be updated through environment variables which can be set when the Runner process is started. This approach is suitable for secure environments where the Runner is deployed because tokens can be kept externally in keystores and updated at runtime when the Runner is launched. Here is an example of the env variables:

```
RUNNER_RUNDECK_CLIENT_ID=6cd5c8c0-3824-463f-addb-cf2df1e882ef3
RUNNER_RUNDECK_SERVER_TOKEN=8FpagGtalnxnv1fmllyYYz4quhNHpBR8
RUNNER_RUNDECK_SERVER_URL=http://192.168.100.2:4440/
```
## Removing Runners
Before removing a Runner it is advisable to verify that there are other active runners tagged with the same tags. This will ensure that jobs that are configured with those tags have at least one available Remote runner to carry out the tasks for the job.

