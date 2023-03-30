---
title: "Installation"
---

# Enterprise Runner - Installation

## Installing Runners in remote locations

Once you have [configured and downloaded a Runner](/administration/runner/runner-config.md), upload the binary to the environment where it will run, follow the install instructions and launch the runner.

### Pre-Requisites

- Same [OS requirements as Rundeck](/administration/install/system-requirements.md)
- Java 11 is required to run the Runner JAR file.
- The Runner binary size is 61MB. 

### Install steps

1. Copy the Runner JAR file that was saved when the Runner was created to the server and directory where it will run.
1. Execute `java -jar runner_filename.jar` to start the service.
1. Connection can be confirmed on the Runner Management page on the Last Checkin line. If there are errors in the output resolve those using troubleshooting steps below: 
1. Runner Logs are located in the ./runner/logs folder under the folder where the jar was executed from. The runner.log file contains operational and important messages about the runner. operations.log tracks an operation starts and if it succeeds or fails. 
Read more about [Runner logging configuration](/administration/runner/runner-logging.md) to customize logging.

## Linux service for the Runner 
We recommend setting up the Runners to run as services through systemd.

1. Create a systemd configuration file `/etc/systemd/system/runner.service` with the following contents:
```
[Unit]
Description=Process Automation Runner 

[Service]
WorkingDirectory=/opt/apps/runner
Type=simple
User=rundeck
Group=rundeck

# Put your runner's filename here
ExecStart=/usr/bin/java -jar runner-b40ff722-feac-4f02-9dd1-9b31f677e5a1.jar

Restart=on-failure

[Install]
WantedBy=multi-user.target
```

1. Run the following shell commands to enable and start the service.
```
# sudo systemctl daemon-reload
# sudo systemctl enable runner
# sudo service runner start
```

## Using Runners in containers

A Runner docker image is available from [Dockerhub](https://hub.docker.com/r/rundeckpro/runner). 

	docker pull rundeckpro/runner

You can use the tag `rundeckpro/runner:latest` for the latest version, or `rundeckpro/runner:$VERSION` for a specific version.

You can use either Environment Variables, or a Volume Mount to specify the Connection parameters for the Runner.  

:::warning API Usage Required
Currently, to obtain the token for a Runner, you must use the Runner Management API to create the Runner.

See:

* [API > Create A New Runner](/api/rundeck-api.html#create-a-new-runner)
* [API > Regenerate Credentials For the Runner](/api/rundeck-api.html#regenerate-credentials-for-the-runner)

:::

### Docker Environment Variables

Specify connection info and credentials via Env Vars:

`RUNNER_RUNDECK_SERVER_TOKEN`
:  The Runner secret token

`RUNNER_RUNDECK_SERVER_URL`
:  The Server URL

`RUNNER_RUNDECK_CLIENT_ID`
:  The Runner ID

Example:

```shell
docker run -it \
	-e RUNNER_RUNDECK_SERVER_TOKEN=$RUNDECK_RUNNER_TOKEN \
	-e RUNNER_RUNDECK_SERVER_URL=$RUNDECK_SERVER_URL \
	-e RUNNER_RUNDECK_CLIENT_ID=$RUNDECK_RUNNER_ID \
	 rundeckpro/runner:latest
```

### Docker Volume Mount

`/app/.rdrunner-creds`
:  Volume Mount path

The contents are in this format:

```shell
# .rdrunner-creds file contents
RUNDECK_RUNNER_TOKEN=<TOKEN>
RUNDECK_SERVER_URL=<URL>
RUNDECK_RUNNER_ID=<ID>
```

Example:

```shell
docker run -it \
	-v "$(pwd)/rdrunner-creds:/app/.rdrunner-creds:" \
	 rundeckpro/runner:latest
```

### Extending the Docker Image

If you are using certain plugins, such as Ansible, Docker, Kubernetes, etc, you may need additional software that is not included in the base image for the Runner.

You will need to create a custom docker image based on the base image.

#### Using Ansible 

Example Dockerfile to add ansible:

```Dockerfile
ARG RUNNER_VERSION=latest
FROM rundeckpro/runner:${RUNNER_VERSION}

USER root
## Install python, pip and ansible
RUN apt-get update && \
    DEBIAN_FRONTEND=noninteractive apt-get install -y --no-install-recommends \
    python3-pip && \
    pip3 install --upgrade pip && \
    pip3 install ansible

# include any other necessary packages
#RUN apt-get -y install sshpass

USER runner
```

Working with ansible you will need to provide the inventory information. You can reach that using:

- pass the inventory "inline" in the Jobs definition
- Copy the inventory or ansible config files to the Dockerfile 

```Dockerfile
COPY path/ansible.cfg /app/ansible/ansible.cfg
COPY path/hosts /app/ansible/hosts
```

- Mount the inventory or ansible config files to the container

```
docker run -it \
	-v "$(pwd)/rdrunner-creds:/app/.rdrunner-creds:" \
	-v "$(pwd)/path/ansible.cfg:/app/ansible/ansible.cfg:" \
	-v "$(pwd)/path/hosts:/app/ansible/hosts:" \	
	 rundeckpro/runner:latest
```

## Runner on Windows OS

The “Runner Management” menu will appear on under the “System” settings:

![Runner Architecture](@assets/img/runner-management.png)

If you are installing a Runner on a Windows OS as localhost node, you have to specify the “OS Family” setting as “windows”.

- Choose related to the project.
- Go to the left side bar menu and choose "EDIT NODES".
- Click on "Resources" tab.
- Click on "Edit" on the local node.
- On the field "OS Family" set "windows".

![Runner Architecture](@assets/img/runner-edit-nodes.png)

![Runner Architecture](@assets/img/runner-resource-tab.png)

![Runner Architecture](@assets/img/runner-edit-local.png)

![Runner Architecture](@assets/img/runner-os-family.png)

Powershell script steps are fully supported on the Runner. Commands that run through the cmd.exe shell are not supported at the moment.

### Secure Your Deployment

Please make sure to install the Runner jar into the current user's private directory e.g. The `HOME` direcotry of the user. If the runner was installed in a public accessbile directory, script files created by the runner can be modified by other users in the same OS. Not well-isolated runner installation is exposed to potential security risks:

	1. Privilege escalation, in the case that the runner agent runs with Administrator privileges
	2. Local user impersonation by allowing code execution in the session of the runner
	3. Denial of service of the Job functionality for the specific runner
	4. AV / EDR evasion by facilitating code execution in remote processes

## Configure using environment variables 

The Runner properties can be updated through environment variables which can be set when the Runner process is started. This approach is suitable for secure environments where the Runner is deployed because tokens can be kept externally in keystores and updated at runtime when the Runner is launched. Here is an example of the env variables:

```
RUNNER_RUNDECK_CLIENT_ID=6cd5c8c0-3824-463f-addb-cf2df1e882ef3
RUNNER_RUNDECK_SERVER_TOKEN=8FpagGtalnxnv1fmllyYYz4quhNHpBR8
RUNNER_RUNDECK_SERVER_URL=http://192.168.100.2:4440/
```

## Removing Runners

Before removing a Runner it is advisable to verify that there are other active runners tagged with the same tags. This will ensure that jobs that are configured with those tags have at least one available Remote runner to carry out the tasks for the job.

