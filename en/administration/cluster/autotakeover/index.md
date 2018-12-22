% Autotakeover

To support Autotakeover, you must first:

* [Configure a loadbalancer][page:administration/cluster/loadbalancer/index.md]
* [Configure an external database][page:administration/configuration/database/index.md]

### Configure Autotakeover

Scheduled jobs are owned by the last cluster member who modified them. Jobs can also be controlled using Cluster Manager. If a cluster member goes down, all scheduled jobs on that cluster member must be moved to another cluster node. This process can be performed automatically using the heartbeat and Autotakeover features in Rundeck Pro version 2.1.0 and later releases.

Configure the heartbeat by adding the following settings in `rundeck-config.properties`:

```
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

```
# enables autotakeover for members detected as "dead"
rundeck.clusterMode.autotakeover.enabled=true

# policy indicates which nodes to take over. "Any": all dead nodes. "Static": only allowed uuids
rundeck.clusterMode.autotakeover.policy=any

# delay in seconds to wait after sending autotakeover proposal
rundeck.clusterMode.autotakeover.delay = 60

# sleep in minimum seconds between autotakeover atttempts for a particular destination
rundeck.clusterMode.autotakeover.sleep = 300
```

If using static policy, you can configure a list of allowed member UUIDs to proceed with auto take-over if they are marked as dead. If a member is marked as dead and not in this list, auto take-over will not be performed. For example:

```
rundeck.clusterMode.autotakeover.config.allowed=<uuid1>,<uuid2>,...
```
