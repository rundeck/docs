## Docker Node Source

The **Docker Node Source** (docker / container / model) is a Resource Model Source that populates the node inventory with Docker containers.

:::tip Open Source Plugin
This plugin is available as an open-source plugin. You can find the source code [here](https://github.com/rundeck-plugins/docker).
:::

### Configuration

The plugin queries the Docker daemon for a list of containers.  To add the Docker Node Source to a Project: 
1. Navigate to **Project Settings** -> **Edit Nodes** -> **Nodes** 
2. Click on **Add a New Node Source** and select **docker / container / model**.

![Docker Node Source](/assets/img/docker-node-source-plugin.png)<br>

The following fields are used for configuration of the Docker Node Source:

* **Default Attributes**: List of key=value pairs (space separated). For example: `username=root osFamily=linux`.
* **Custom Mapping**: Use attributes retrieved from `docker inspect` to add node attributes to the nodes added to the inventory. The default mapping values are:
    ```yaml
    'docker:Id': Container ID,
    'docker:Created': Created Date,
    'docker:Name': Container Name,
    'docker:Image': Container Image ID,
    'docker:State.Status': Container Statis,
    'docker:State.Pid':  Container PID,
    'docker:State.StartedAt': Container Started At,
    'docker:Config.Image': Container Image Name,
    'docker:Config.Hostname': Container Hostname,
    'docker:Config.Cmd': Container Command,
    'docker:Config.Labels': Container Labels,
    'docker:IPAddress': Container IP
    ```
  * By default, these values will be mapped to the docker group attributes on nodes. The nodename and hostname will be taken from `docker:Id` and `docker:Config.Hostname`.
  * These values can be changed. For example: **`nodename.selector=docker:Name,hostname.selector=docker:IPAddress`**.  This will define the nodename attribute with the value of `docker:Name` and hostname attribute with the value of `docker:IPAddress`.
* **Tags**: List of tags (space separated or comma separated). These can be custom tags. For example: `tag.selector=docker:Config.Image`.
* **Filter**: Filter the list of containers using syntax from `docker ps --filter`. For example: `name=rundeck*,status=running`. Further information [here](https://docs.docker.com/engine/reference/commandline/ps/).
* **All Containers**: If checked, all containers will be added to the inventory. If unchecked, only running containers will be added.
* **Debug**: Write debug messages to the stderr log.
* **Docker Host**: The Docker host to connect to. If not specified, the default Docker host will be used.
* **Docker Cert Path**: The path to the Docker certificates. If not specified, the default Docker certificates will be used.
* **Docker TLS Verify**: Verify TLS. Values: `true`, `false`.



