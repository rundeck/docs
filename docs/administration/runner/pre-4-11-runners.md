# Runner

:::enterprise
:::

The Runner, available for both Process Automation and Runbook Automation securely opens up network/communication between data centers and the Automation Cluster.  The Runner is a Remote Execution hub for Node Steps to run on specified endpoints, rather than from the Automation server itself.  

## Architecture

The Runner is a Java based program which uses a polling model to pick up work from the Automation Server.  During each polling cycle (every 5 seconds) the Runner checks for executions that it is responsible for.  Communication from the Runner to the Automation Server happens over https and is initiated from the Runner.  This allows for enhanced firewall security as ports no longer need to be open for the Automation Server to talk to nodes over more sensitive ports. _(e.g. SSH/22)_

![Runner Architecture](/assets/img/runner-arch-diagram.png)


## Installation

Follow these steps to install a Runner:

::: tabs
@tab Creating and configuring a Runner

1. Under the _System Menu_ (gear icon upper-right) choose **Runner Management**
1. Choose **Create Runner**.
1. Type in a unique _Name_ and relevant _Description_ for this Runner and Click **Add Runner**.
1. Click **Next** to go to _Project Assignment_
1. [This step is optional] On this page choose which project(s) the Runner is active for.  The Assigned toggle will enable the Runner for _All Nodes_ (`.*`) in that project. After the Runner is created you can edit the Runner assignment and adjust the node filter to target a subset of nodes. Click **Next**.
1. On the **Confirmation** step, click on **Download** and save the Runner JAR binary file. Note that the JAR file must be used only for the environment that it is configured for. Click **Finish**.

@tab Installing a Runner

Pre-Requisites:
- Same [OS requirements as Rundeck](/administration/install/system-requirements.md)
- Java 11 is required to run the Runner JAR file.

1. Copy the Runner JAR file that was saved when the Runner was created to the server and directory where it will run.
1. Execute `java -jar runner_filename.jar` to start the service.

Connection can be confirmed on the Runner Management page on the _Last Checkin_ line.  If there are errors in the output resolve those using troubleshooting steps below.

:::

:::tip
To enable the Runner features you have to add the following property in `rundeck-config.properties` file and restart the Process Automation cluster or instance. This feature has been enabled on Docker installations since v4.5.0 and is also enabled by default for Runbook Automation.	
```
rundeck.feature.runner.enabled=true
```
:::

## Runner Management

### Assigning Projects/Nodes to a Runner

Runners will execute Node Steps on Nodes within a project based on a Node Filter assigned to the Runner.  To assign Projects and specific nodes to a Runner follow these steps:

1. In the Runner Management screen click on the name of the Runner instance to be edited.
1. If the project is not listed already choose **Add Projects**
1. Toggle the Projects that should be added.
1. The Node Filter section is used to identify Nodes that this runner is responsible for.  By default `.*` will apply it to all nodes in the project.
1. Click **Add** and the projects are now listed under the Runner configuration.

It is possible to edit each project Node Filter individually if needed.  Use the _Actions_ menu to _Edit_ the project entry's Node Filter.

### Troubleshooting

Runner Logs are located in the `./runner/logs` folder under the folder where the jar was executed from.  The `runner.log` file contains operational and important messages about the runner.  `operations.log` tracks an operation starts and if it succeeds or fails.  [Read more about logging and setting up custom logging](runner-management/runner-logging.md).

### Proxying Runner connections
Runners can be configured to connect through a HTTP/HTTPS proxy. Proxies are commonly used to centralize and secure outbound traffic from the datacenter to internet services. The proxy configuration is optional and is added as java command line arguments when the runner process is started.

#### Proxy configuration without proxy authentication
The following example will allow the runner to connect through the secure company proxy with address wp.acme.corp.

```
java -Dmicronaut.http.client.proxy-type=http -Dmicronaut.http.client.proxy-address=wp.acme.corp:443 -jar pdrunner.jar
```

1. `-Dmicronaut.http.client.proxy-type` is set to `http`
1. `-Dmicronaut.http.client.proxy-address` is set to the secure proxy company address.

#### Proxy configuration with proxy authentication
The following example adds basic auth proxy configuration to the runner. The proxy-type and proxy-address settings are the same as the unauthenticated access example.

```
java -Dmicronaut.http.client.proxy-type=http -Dmicronaut.http.client.proxy-address=wp.acme.corp:443 -Dmicronaut.http.client.proxy-username=proxyUsernameString -Dmicronaut.http.client.proxy-password=proxyPassString -jar pdrunner.jar
```

1. `-Dmicronaut.http.client.proxy-username` is set to the user that is allowed to connect through the secure proxy.
1. `-Dmicronaut.http.client.proxy-password` is set to the secure proxy user password.

### Runner on Windows OS

The “Runner Management” menu will appear on under the “System” settings:

![Runner Architecture](/assets/img/runner-management.png)

If you are installing a Runner on a Windows OS as localhost node, you have to specify the “OS Family” setting as “windows”.

- Choose related to the project.
- Go to the left side bar menu and choose "EDIT NODES".
- Click on "Resources" tab.
- Click on "Edit" on the local node.
- On the field "OS Family" set "windows".

![Runner Architecture](/assets/img/runner-edit-nodes.png)

![Runner Architecture](/assets/img/runner-resource-tab.png)

![Runner Architecture](/assets/img/runner-edit-local.png)

![Runner Architecture](/assets/img/runner-os-family.png)

Powershell script steps are fully supported on the Runner. Commands that run through the cmd.exe shell are not supported at the moment.

## FAQ

**Does this replace Clustering?**

This feature is intended to be used in situations where execution of Node Steps is needed in a network segment or security zone that is different from the Cluster feature(s).  An Automation Server Cluster still provides high-availability and fault tolerance for the User Interface, Job Management/Execution and system management tasks.

**Does this work for all communication into the remote data center?**

At this time, the Runner will execute Node Executor and File Copier steps.  This includes node steps such as Remote Command, Inline Script, Script File, and Copy File, as well as commands executed from the Commands tab. Node Sources, Health Checks, and other communication are not included in this version of the Runner.

**Do Runners participate in node discovery?**

Not at this time.  To dynamically update nodes use custom scripting and the [APIs](/api/index.md#updating-and-listing-resources-for-a-project) to update the node lists remotely.

**Can multiple Runners run in parallel?**

Yes, multiple runners can be configured for the same project. If multiple runners have the same node scope, they race to retrieve the relevant task list. Multiple runners can be used to increase scale or add more redundancy in the automation architecture.
