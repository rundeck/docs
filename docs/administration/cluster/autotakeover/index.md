# Autotakeover

To support Autotakeover, you must first:

- [Configure a loadbalancer](/administration/cluster/loadbalancer/index.md)
- [Configure an external database](/administration/configuration/database/index.md)

### Configure Autotakeover

Scheduled jobs are owned by the last cluster member who modified them. Jobs can also be controlled using Cluster Manager. If a cluster member goes down, all scheduled jobs on that cluster member must be moved to another cluster node. This process can be performed automatically using the heartbeat and Autotakeover features in Rundeck Enterprise version 2.1.0 and later releases.

Configure the heartbeat by adding the following settings in `rundeck-config.properties`:

```properties
# heartbeat interval in seconds
rundeck.clusterMode.heartbeat.interval=30

# initial delay after startup to send heartbeat
rundeck.clusterMode.heartbeat.delay=10

# remote execute/abort message processing interval in seconds
rundeck.clusterMode.remoteExec.process.interval=10

# age in seconds since last heartbeat to consider another member inactive
rundeck.clusterMode.heartbeat.considerInactive=150

# age in seconds since last heartbeat to consider another member dead
rundeck.clusterMode.heartbeat.considerDead=300
```

Then configure Autotakeover by adding the following settings in `rundeck-config.properties`:

```properties
# enables autotakeover for members detected as "dead"
rundeck.clusterMode.autotakeover.enabled=true

# policy indicates which nodes to take over. "Any": all dead nodes. "Static": only allowed uuids
rundeck.clusterMode.autotakeover.policy=any

# delay in seconds to wait after sending autotakeover proposal
rundeck.clusterMode.autotakeover.delay = 60

# sleep in minimum seconds between autotakeover atttempts for a particular destination
rundeck.clusterMode.autotakeover.sleep = 300
```
#### Autotakeover Recover Executions

If for some reason, your Rundeck instance goes offline while a job is running and that job gets marked as incomplete, jobs configured with retry settings are taken over by another online instance using the recover execution policy. To use the recover execution policy, add the following to your `rundeck-config.properties` file:

```properties
# enable auto cleanup of stale jobs on member death
rundeck.clusterMode.recoverExecutions.enabled=true

# policy for members to accept as targets of auto cleanup. Can be 'Any' or 'Static'
# if static, config requires 'allowed' setting
rundeck.clusterMode.recoverExecutions.policy=Any

# delay in seconds before proceeding with auto-retry proposal
rundeck.clusterMode.recoverExecutions.delay=30

# delay in seconds before doing another auto-retry of the same member
rundeck.clusterMode.recoverExecutions.sleep=60
```

#### Autotakeover policies

The options are:

* **Any**: the auto take-over process will assign the scheduled owner of a job to `any` cluster active member

* **Static**: If using static policy, you can configure a list of allowed member UUIDs to proceed with auto take-over if they are marked as dead. If a member is marked as dead and not in this list, auto take-over will not be performed. For example:

```
rundeck.clusterMode.autotakeover.config.allowed=<uuid1>,<uuid2>,...
```

* **RemoteExecution**: This policy is used when you have the remote execution enabled, and the auto take-over process will `respect` the remote execution policy defined on the cluster.
see [Remote Job Execution](/administration/configuration/remote-job-execution.md)