## Docker Container Plugins

The Docker node step plugins provide job steps to manage and inspect Docker containers. The following plugins are available:

- [Docker Container Plugins](#docker-container-plugins)
- [Docker Container Plugins](#docker-container-plugins-1)
  - [Execute Command in Container](#execute-command-in-container)
  - [Inspect Docker Container](#inspect-docker-container)
  - [Pause Docker Container](#pause-docker-container)
  - [Unpause Docker Container](#unpause-docker-container)
  - [Kill Docker Container](#kill-docker-container)
  - [Docker Container Stats](#docker-container-stats)
  - [Run Docker Image](#run-docker-image)

## Docker Container Plugins

The Docker node step plugins work in tandem with the [**Docker Node Source**](/manual/projects/resource-model-sources/docker.md). While the Node Source is not required, it provides an easy mechanism for iterating an automation task over multiple containers.

### Execute Command in Container

The **docker / container / execute** plugin is a Workflow Node Step that executes a command in an existing container. The plugin requires the following fields:

* **container**: The container to dispatch the command.
  * Example: `my-container` or use `${node.name}` if the Docker Node Source is configured in tandem.
* **command**: The command string to execute in the container.
  * Example: `ls -la`
* **user**: User to execute command as.
  * Default: `root`
* **debug**: Write debug messages to stderr.
* **docker-cert-path**: The certificate path.
* **docker-host**: The docker host.
* **docker-tls-verify**: Verify TLS.
  * Values: `true`, `false`

![**Example Configuration**](/assets/img/docker-execute-command-node-step.png)<br>

### Inspect Docker Container

The **docker / container / inspect** plugin is a Workflow Node Step that inspects the state of the container. The plugin requires the following fields:

* **container**: The container ID.
  * Example: `my-container-id` or use `${node.name}` if the Docker Node Source is configured in tandem.
* **debug**: Write debug messages to stderr.

![inspect container](/assets/img/docker-inspect-container-node-step.png)<br>

### Pause Docker Container

The **docker / container / pause** plugin is a Workflow Node Step that pauses all processes within the container. The plugin requires the following fields:

* **container**: The container ID.
  * Example: `my-container-id` or use `${node.name}` if the Docker Node Source is configured in tandem.
* **debug**: Write debug messages to stderr.

![Pause container](/assets/img/docker-pause-container-node-step.png)<br>

### Unpause Docker Container

The **docker / container / unpause** plugin is a Workflow Node Step that unpauses all processes within the container. The plugin requires the following fields:

* **container**: The container ID.
  * Example: `my-container-id` or use `${node.name}` if the Docker Node Source is configured in tandem.
* **debug**: Write debug messages to stderr.

### Kill Docker Container

The **docker / container / kill** plugin is a Workflow Node Step that kills the running container. The plugin requires the following fields:

* **container**: The container ID.
  * Example: `my-container-id` or use `${node.name}` if the Docker Node Source is configured in tandem.
* **signal**: Signal to send to the container.
  * Default: `KILL`
* **debug**: Write debug messages to stderr.

### Docker Container Stats

The **docker / container / stats** plugin is a Workflow Node Step that displays container resource usage statistics (no-stream). The plugin requires the following fields:

* **container**: The container ID.
  * Example: `my-container-id` or use `${node.name}` if the Docker Node Source is configured in tandem.
* **format**: Pretty-print images using a Go template.
  * Default: `table {{.Container}}\t{{.CPUPerc}}\t{{.MemUsage}}\t{{.NetIO}}\t{{.BlockIO}}`
* **debug**: Write debug messages to stderr.

### Run Docker Image

The **docker / image / run** plugin is a Workflow Node Step that runs the image and executes a command. The plugin requires the following fields:

* **name**: The identifying name.
  * Example: `my-container`
* **image**: The container image identifier.
  * Example: `my-image`
* **env**: Set of environment variables.
* **env-file**: Set path of file with environment variables (in the filesystem where Rundeck runs).
* **volume**: Bind mount a volume (from the filesystem where Docker engine runs).
* **volumes-from**: Mount volumes from the specified container(s).
* **publish**: Publish a container port (e.g., `xxxx:yyyy`).
* **pull**: Pull image before running.
  * Values: `always`, `missing`, `never`
* **cidfile**: Write the container ID to the file.
* **command**: Run this command at start up.
* **detach**: Run container in background and print container ID.
  * Values: `true`, `false`
* **tty**: Allocate a pseudo-TTY.
  * Values: `true`, `false`
* **interactive**: Keep STDIN open even if not attached.
  * Values: `true`, `false`
* **add-host**: Add a line to /etc/hosts (host:IP).
* **blkio-weight**: Block IO weight (relative weight) accepts a weight value between 10 and 1000.
* **cap-add**: Add Linux capabilities.
* **cap-drop**: Drop Linux capabilities.
* **cpu-period**: Limit the CPU CFS (Completely Fair Scheduler) period.
* **cpu-quota**: Limit the CPU CFS (Completely Fair Scheduler) quota.
* **cpu-shares**: CPU shares (relative weight).
* **cpuset-cpus**: CPUs in which to allow execution (0-3, 0,1).
* **cpuset-mems**: Memory nodes (MEMs) in which to allow execution (0-3, 0,1).
* **device**: Allows you to run devices inside the container without the --privileged flag.
* **dns**: Set custom DNS servers for the container.
* **ipc**: Set the IPC mode for the container.
  * Values: `host`, `container:<name|id>`
* **log-driver**: Logging driver for container.
  * Values: `none`, `json-file`, `splunk`, `syslog`, `journald`
* **log-opt**: Log driver options.
* **lxc-conf**: Add custom LXC options.
* **memory**: Memory limit (format: `<number><optional unit>`, where unit = b, k, m or g).
* **memory-swap**: Total memory limit (memory + swap, format: `<number><optional unit>`, where unit = b, k, m or g).
* **net**: Set the Network mode for the container.
  * Values: `bridge`, `none`, `host`, `container:<name|id>`
* **oom-kill-disable**: Whether to disable OOM Killer for the container or not.
  * Values: `true`, `false`
* **privileged**: Give extended privileges to this container.
  * Values: `true`, `false`
* **restart**: Restart policy to apply when a container exits.
  * Values: `no`, `always`, `on-failure[:max-retries]`
* **rm**: Automatically remove the container when it exits.
  * Values: `true`, `false`
* **security-opt**: Security Options.
* **read-only**: Mount the container's root filesystem as read-only.
* **ulimit**: Ulimit options.
* **uts**: UTS namespace to use.
* **label**: Set metadata on a container.
* **workdir**: Working directory inside the container.
* **user**: Username or UID (format: `<name|uid>[:<group|gid>]`).
* **debug**: Write debug messages to stderr.
* **docker-cert-path**: The certificate path.
* **docker-host**: The docker host.
* **docker-tls-verify**: Verify TLS.
  * Values: `true`, `false`