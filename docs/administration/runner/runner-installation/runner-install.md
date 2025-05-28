---
title: "Advanced Installation Options"
---

# Enterprise Runner - Advanced Installation Options

For most use-cases, the steps outlined in the [Creating Runner](/administration/runner/runner-installation/creating-runners.md) documentation will be sufficient to get your Runner installed. 

However, there are some advanced installation options that you may want to consider depending on your environment and requirements.

## Linux Service for the Runner 
The Runner can be installed as a `systemd` service on Linux systems.

1. Create a systemd configuration file `/etc/systemd/system/runner.service` with the following contents:
    ```
    [Unit]
    Description=Runbook Automation Runner 
    
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

2. Create the Runner folder (e.g. /opt/apps/runner ) and set the permissions for the rundeck user and group.
    ```
    sudo mkdir -p /opt/apps/runner
    sudo chown rundeck:rundeck /opt/apps/runner
    ```

3. Run the following shell commands to enable and start the service.
    ```
    # sudo systemctl daemon-reload
    # sudo systemctl enable runner
    # sudo service runner start
    ```

## Manual Docker Installation

The standard method for deploying the Runner with Docker is with `docker-compose` as outlined in the [Creating Runner](/administration/runner/runner-installation/creating-runners.md) documentation by selecting **`Docker`** for the **Platform**.

However, you can also manually install the Runner using the Docker image.

1. Pull the Runner docker image from [Dockerhub](https://hub.docker.com/r/rundeckpro/runner). 
    ```
    docker pull rundeckpro/runner
    ```
    Use the tag `rundeckpro/runner:$VERSION` for a specific version, where `$VERSION` is set with:
    ```
    export $VERSION=5.1.0
    ```

2. Use either Environment Variables, or a Volume Mount to specify the Connection parameters for the Runner.  

    :::warning API Usage Required
    Currently, to obtain the token for a Runner, use the Runner Management API to create the Runner:

    * [API > Create A New Runner](/api/index.md#create-a-new-runner)
    * [API > Regenerate Credentials For the Runner](/api/index.md#regenerate-credentials-for-the-runner)
    
    :::

    #### Docker Environment Variables
    
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
         rundeckpro/runner:{{ $rundeckVersion }}
    ```

    #### Docker Volume Mount
    
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
         rundeckpro/runner:{{ $rundeckVersion }}
    ```

## Extending the Docker Image

If you are using certain plugins, such as Ansible, Docker or PyWinRM, you may need additional software that is not included in the base image for the Runner.

You will need to create a custom docker image based on the base image.

#### Example: Install Runner & Ansible in Container 

Example Dockerfile to add ansible:

```Dockerfile
ARG RUNNER_VERSION={{ $rundeckVersion }}
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
	 rundeckpro/runner:{{ $rundeckVersion }}
```


## Secure the Runner Deployment

We recommend installing Runners in private directories that are only accessible by the user/group holding the runner process (e.g.: `C:\Users\runnerUser\` directory) so that other users are not able to access or even modify script files created by the runner. 
::: warning
Runner installations that are not isolated properly are exposed to potential security risks:

	1. Privilege escalation, in the case that the runner agent runs with Administrator privileges
	2. Local user impersonation by allowing code execution in the session of the runner
	3. Denial of service of the Job functionality for the specific runner
	4. AV / EDR evasion by facilitating code execution in remote processes
:::

#### Configure using environment variables 

The Runner properties can be updated through environment variables which can be set when the Runner process is started. This approach is suitable for secure environments where the Runner is deployed because tokens can be kept externally in keystores and updated at runtime when the Runner is launched. Here is an example of the env variables:

```
RUNNER_RUNDECK_CLIENT_ID=6cd5c8c0-3824-463f-addb-cf2df1e882ef3
RUNNER_RUNDECK_SERVER_TOKEN=8FpagGtalnxnv1fmllyYYz4quhNHpBR8
RUNNER_RUNDECK_SERVER_URL=http://192.168.100.2:4440/
```

