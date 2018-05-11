% Remote Job Execution

* [Configuring remote execution](http://support.rundeck.com/customer/en/portal/articles/2864130-configuring-cluster-remote-execution)

### Cluster Remote Execution

This feature allows Rundeck Pro cluster members to forward job executions to
other cluster members based on a policy configuration. By default, each member
of the cluster executes jobs locally and does not forward them. You can define
multiple profiles and assign different projects to different profiles. If a job
is executed in a project which is not assigned to a specific profile, the
default policy is used. 

Configure the following remote execution policy parameters in `rundeck-config.properties`.

#### Policy

```
rundeck.clusterMode.remoteExecution.policy = <Policy>
```

Choose from the following <Policy> settings: 
None - Default. Executes locally only
Random - Executes randomly among allowed members
RoundRobin - Executes round-robin style among allowed members
Preset - Executes on one other preset member
Load - Executes on a member based on load (Requires Pro Cluster 2.3.0 or a later release. See Enable Load Balanced Policy)

#### List of Allowed Members

```
rundeck.clusterMode.remoteExecution.config.allowed = <List of Allowed Members>
```

The <List of Allowed Members> determines additional cluster members that the policy can execute on. Enter values separated by a comma:
Self - Execute locally
Other - Any other member except this one
UUID - A particular UUID
/regex/ - A regular expression matching a UUID

**Example**

```
rundeck.clusterMode.remoteExecution.config.allowed = self,/1C519C5A-4E78-4BE9-85EC-.+/
```

The example configuration shows Self and a regular expression combined.

#### List of Member Tags

The <List of Member Tags> parameter allows you to restrict the remote Cluster Members by using tags. The tags are similar to Node Tags. The special tag, Self, is automatically only assigned to the *local* cluster node. Set tags for a cluster member in the framework.properties file.

```
rundeck.clusterMode.remoteExecution.config.allowedTags = <List of Member Tags>
rundeck.clusterMode.remoteExecution.config.preferredTags = <List of Member Tags>
rundeck.clusterMode.remoteExecution.config.activeOnly = true/false
```

**Example**

```
rundeck.server.uuid=...
rundeck.server.tags=worker,linux
```

Allowed Tags policy is configured in a similar way, using comma-separated allowed values, or `+` separated tags, which require all tags. The example defines Round Robin execution on any other cluster member tagged as worker or secondary.

**Example**

```
rundeck.clusterMode.remoteExecution.policy = RoundRobin
rundeck.clusterMode.remoteExecution.config.allowed = other
rundeck.clusterMode.remoteExecution.config.allowedTags = worker,secondary
```

Use Preferred Tags to indicate that certain members are preferred. When Preferred Tags are defined, and some of the allowed members match those tags, the Preferred Members will be used. If no Preferred Members are available, the policy falls back to the Allowed Members that are available.

**Example**

This configuration defines Allowed Tags and Preferred Tags for Round Robin execution on any worker or secondary members, if available. Otherwise, use Round Robin on all other members.

```
rundeck.clusterMode.remoteExecution.policy = RoundRobin
rundeck.clusterMode.remoteExecution.config.allowed = other
rundeck.clusterMode.remoteExecution.config.allowedTags = *
rundeck.clusterMode.remoteExecution.config.allowedTags = worker,secondary
```

#### Profile Name

Define additional profiles by name:

```
rundeck.clusterMode.remoteExecution.profiles = profile1, profile2
```

#### Project Name

Assign projects to a profile by name:

```
rundeck.clusterMode.remoteExecution.profile.profile1.projects=projectA, projectB
```

The following example defines a policy type and configuration for profile1:

```
rundeck.clusterMode.remoteExecution.profile.profile1.policy= <Policy>
rundeck.clusterMode.remoteExecution.profile.profile1.config.allowed = <List of Allowed Members>
rundeck.clusterMode.remoteExecution.profile.profile1.config.allowedTags = <List of Member Tags>
rundeck.clusterMode.remoteExecution.profile.profile1.config.preferredTags = <List of Member Tags>
rundeck.clusterMode.remoteExecution.profile.profile1.config.activeOnly = true/false
```

### Load Balanced Execution Policy 

This feature allows Rundeck Pro cluster members to forward job executions to
other cluster members based on statistics calculated by the heartbeat process
of each cluster member. Load is calculated for each member based on thread
ratio and the percentage of CPU.
 
Note: You must be running Rundeck Pro 2.3.1 or a later release to use this feature.
 
**Example**

```
rundeck.clusterMode.remoteExecution.config.criteria = threadRatio,load
```
 
Each criteria can be weighted using a relative value:

```
rundeck.clusterMode.remoteExecution.config.weights = 1.0,1.5
```
 
Cluster members are sorted by the weighted load and placed into groups. Each
group is given a weight, and the policy randomly chooses a group based on the
proportional weight of the group. A member of the group is chosen randomly and
used.
 
**Example**

```
rundeck.clusterMode.remoteExecution.config.groupWeight=1,0,0,0
```

The example defines four groups, each with 25% of the members. The weights define 100% chance of the first group being used.
