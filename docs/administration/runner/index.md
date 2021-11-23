# Enterprise Runner

:::warning
This feature is a feature of Rundeck Enterprise that requires specific licenses to use.
:::

The Rundeck Enterprise Runner securely opens up network/communication between data centers and the Rundeck Enterprise Cluster.  The Runner is a Remote Execution hub for Node Steps to run on specified endpoints, rather than from the Rundeck server itself.  

## Architecture

The Enterprise Runner is a Java based program which uses a polling model to pick up work from Rundeck Enterprise.  During each polling cycle (every 5 seconds) the Runner checks for executions that it is responsible for.  Communication from the Runner to Rundeck Enterprise happens over https and is initiated from the Runner.  This allows for enhanced firewall security as ports no longer need to be open for Rundeck to talk to nodes over more sensitive ports. _(e.g. SSH/22)_

![Runner Architecture](@assets/img/runner-arch-diagram.png)


## Installation

> During Incubating phase it is necessary to turn the feature on manually using the following settings in your rundeck-config.properties `rundeck.feature.runner.enabled = true`.  (`RUNDECK_FEATURE_RUNNER_ENABLED: 'true'` for docker-compose files)

Follow these steps to install a Runner to Rundeck Enterprise:

:::: tabs
::: tab Rundeck Enterprise Steps

1. Under the _System Menu_ (gear icon upper-right) choose **Runner Management**
1. Choose **Create Runner**.
1. Type in a unique _Name_ and relevant _Description_ for this Runner and Click **Add Runner**.
1. On the next screen choose **Download ID and Secret** to save the credentials for this Runner installation.  (You will need this file when setting up Runner Binaries)
1. Click **Next** to go to _Project Assignment_
1. [This step is optional] On this page choose which project(s) the Runner is active for.  The Assigned toggle will enable the Runner for _All Nodes_ (`.*`) in that project.  
    _([This step is optional] If the Runner should only act on a subset of Nodes it's recommended to do that in the Runner Edit page.)_

:::
::: tab Runner Installation

Pre-Requisites:
- Same OS requirements as Rundeck Enterprise
- Java 11 is required to run the Runner JAR file.

1. Download the latest Runner code using our [Downloads](https://rundeck.com/downloads) site.
1. Copy the credentials file to the same directory as the Runner JAR file with the name of `.rdrunner-creds`
1. Execute `java -jar pd-runner.jar` and the service should start.

Connection can be confirmed on the Runner Management page on the Last Checkin line.  If there are errors in the output resolve those using troubleshooting steps below.

:::
::::

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

Runner Logs are located in the `./runner/logs` folder under the folder where the jar was executed from.  The `runner.log` file contains operational and important messages about the runner.  `operations.log` tracks an operation starts and if it succeeds or fails.


## FAQ

**Does this replace Clustering?**

This feature is intended to be used in situations where execution of Node Steps is needed in a network segment or security zone that is different from the Rundeck Cluster.  A Rundeck Enterprise Cluster still provides high-availability and fault tolerance for the User Interface, Job Management/Execution and system management tasks.

**Does this work for all communication into the remote data center?**

The Runner will handle Node Step execution.  Node Sources, Health Checks, and other communication are not included in this version of the Runner.
