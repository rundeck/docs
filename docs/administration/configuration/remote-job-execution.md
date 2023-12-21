# Remote Job Execution

:::enterprise
:::

### Cluster Remote Execution

This feature allows Process Automation cluster members to forward job executions to
other cluster members based on a policy configuration. By default, each member
of the cluster executes jobs locally and does not forward them. You can define
multiple profiles and assign different projects to different profiles. If a job
is executed in a project which is not assigned to a specific profile, the
default policy is used.

Configure the following remote execution policy parameters in `rundeck-config.properties`.

:::tip
Definitions on this page are case-sensitive. Copy and paste the code to ensure no typos.
:::

When a job is saved, it is scheduled to run on a server node in the cluster. It is possible to see how many jobs are scheduled to run on each cluster member as well as each job specifically from the cluster manager page :

![Cluster Members with jobs scheduled in](/assets/img/cluster_members_scheduled_jobs.png)

![Job scheduled in cluster member "3e" (192.168.56.23)](/assets/img/job_remote_exec_node_assigned.png)

After the job runs a couple of times it is possible to see that the executions were run on different cluster members because of the evaluation of the remote execution policy. See The example below of a job assigned to a cluster member *(3e)* and running a local command `hostname -I` on different servers depending on the remote execution policy:

![Remote Execution on server "18" (192.168.56.21)](/assets/img/job_remote_exec_run1.png)

![Remote Execution on server "08" (192.168.56.22)](/assets/img/job_remote_exec_run2.png)

:::tip
Although the remote execution policy is reevaluated on every execution, it is **also** possible to make cluster members **reevaluate** the remote execution policy **only once** when the job is scheduled. This is possible by setting to **false** the following property:
`rundeck.clusterMode.remoteScheduledExecutionPolicy.enabled`
:::

#### Execution Cleaning

For reasons external to the cluster, members may go offline or be interrupted; For this reason Rundeck Cluster can automatically clean up the executions on certain occasions that we will describe below:

- **Stale Executions**: when a cluster member starts running a job, the job enters in 'Running' state, if during the execution, the cluster member goes offline and there are no cluster members that can perform the "Autotakeover" action, the Job execution will be cleaned up when the cluster scales back into replicas, leaving the job with the "Incomplete" status by default.

- **Missed Executions**: When a node has scheduled job runs and go offline before executing them, the rundeck cluster will create a "missed" run to warn that some of the jobs were not executed after the instance restart.

#### Policy

```
rundeck.clusterMode.remoteExecution.policy = <Policy>
```

Choose from the following `<Policy>` settings:

- `None` - Default. Executes locally only
- `Random` - Executes randomly among allowed members
- `RoundRobin` - Executes round-robin style among allowed members
- `Preset` - Executes on one other preset member
- `Load` - Executes on a member based on load (Requires Enterprise Cluster 2.3.0 or a later release. See Enable Load Balanced Policy)

#### List of Allowed Members

```
rundeck.clusterMode.remoteExecution.config.allowed = <List of Allowed Members>
```

The `<List of Allowed Members>` determines additional cluster members that the policy can execute on. Enter values separated by a comma:

- `Self` - Execute locally
- `Other` - Any other member except this one
- `UUID` - A particular UUID
- `/regex/` - A regular expression matching a UUID

**Example**


```
rundeck.clusterMode.remoteExecution.config.allowed = Self,/1C519C5A-4E78-4BE9-85EC-.+/
```

The example configuration shows Self and a regular expression combined.

#### List of Member Tags

The `<List of Member Tags>` parameter allows you to restrict the remote Cluster Members by using tags. The tags are similar to Node Tags. The special tag, Self, is automatically only assigned to the _local_ cluster node. Set tags for a cluster member in the framework.properties file.

```properties
rundeck.clusterMode.remoteExecution.config.allowedTags = <List of Member Tags>
rundeck.clusterMode.remoteExecution.config.preferredTags = <List of Member Tags>
rundeck.clusterMode.remoteExecution.config.activeOnly = true/false
```

**Example**

```properties
rundeck.server.uuid=...
rundeck.server.tags=worker,linux
```

Allowed Tags policy is configured in a similar way, using comma-separated allowed values, or `+` separated tags, which require all tags. The example defines Round Robin execution on any other cluster member tagged as worker or secondary.

**Example**

```properties
rundeck.clusterMode.remoteExecution.policy = RoundRobin
rundeck.clusterMode.remoteExecution.config.allowed = Other
rundeck.clusterMode.remoteExecution.config.allowedTags = worker,secondary
```

Use Preferred Tags to indicate that certain members are preferred. When Preferred Tags are defined, and some of the allowed members match those tags, the Preferred Members will be used. If no Preferred Members are available, the policy falls back to the Allowed Members that are available.

**Example**

This configuration defines Allowed Tags and Preferred Tags for Round Robin execution on any worker or secondary members, if available. Otherwise, use Round Robin on all other members.

```properties
rundeck.clusterMode.remoteExecution.policy = RoundRobin
rundeck.clusterMode.remoteExecution.config.allowed = Other
rundeck.clusterMode.remoteExecution.config.allowedTags = *
rundeck.clusterMode.remoteExecution.config.preferredTags = worker,secondary
```

#### Profile Name

Define additional profiles by name:

```properties
rundeck.clusterMode.remoteExecution.profiles = profile1, profile2
```

#### Project Name

Assign projects to a profile by name:

```properties
rundeck.clusterMode.remoteExecution.profile.profile1.projects=projectA, projectB
```

The following example defines a policy type and configuration for profile1:

```properties
rundeck.clusterMode.remoteExecution.profile.profile1.policy= <Policy>
rundeck.clusterMode.remoteExecution.profile.profile1.config.allowed = <List of Allowed Members>
rundeck.clusterMode.remoteExecution.profile.profile1.config.allowedTags = <List of Member Tags>
rundeck.clusterMode.remoteExecution.profile.profile1.config.preferredTags = <List of Member Tags>
rundeck.clusterMode.remoteExecution.profile.profile1.config.activeOnly = true/false
```

### Preset Policy

Enterprise customers have the ability to forward job executions to other cluster members based on a policy (None, Random, RoundRobin, Preset, and Load). The preset option offers you the ability to execute on another member of the cluster, that is predefined. If you choose to use the preset policy, then you need to specify that you want to use the preset policy, and on top of that you need to specify the UUID of the cluster member which you would like the execution to be performed on.

```properties
rundeck.clusterMode.remoteExecution.config.activeOnly = true
rundeck.clusterMode.remoteExecution.profiles =Linux
rundeck.clusterMode.remoteExecution.profile.Linux.projects=Example, Test1, Test2
rundeck.clusterMode.remoteExecution.profile.Linux.policy=Preset
rundeck.clusterMode.remoteExecution.profile.Linux.config.uuid=<UUID1>
```

### Load Balanced Execution Policy

This feature allows Process Automation cluster members to forward job executions to
other cluster members based on statistics calculated by the heartbeat process
of each cluster member. Load is calculated for each member based on thread
ratio and the percentage of CPU.

> **Note:** You must be running Process Automation 2.3.1 or a later release to use this feature.

**Example**

```properties
rundeck.clusterMode.remoteExecution.config.criteria = threadRatio,load
```

> **Note:** These are the only criteria available so far.

Each criteria can be weighted using a relative value:

```properties
rundeck.clusterMode.remoteExecution.config.weights = 1.0,1.5
```

Cluster members are sorted by the weighted load and placed into groups. Each
group is given a weight, and the policy randomly chooses a group based on the
proportional weight of the group. A member of the group is chosen randomly and
used.

With the property `groupWeight` it is possible to define the amount of groups and its weights, the groups will be as many as defined weights, and the sum of all weights must be divisible by the number of members.

**Examples**

```properties
# Four groups, each with 25% of the members. The weights define 100% chance of the first group being used.
rundeck.clusterMode.remoteExecution.config.groupWeight=1,0,0,0

# Three groups, each with 30% of the members. The weights define 44.4%, 33.3% and 22.2% chance of each group respectively being used.
rundeck.clusterMode.remoteExecution.config.groupWeight=4,3,2
```

### Cluster Remote Execution with Secure Options

When forwarding executions which include [Secure Options](/manual/job-options.md#secure-options), option values will be delivered
between cluster members using encrypted messaging by default.

This behavior and the encryption configuration can be changed configuring the following parameters in `rundeck-config.properties`:

#### Disable encrypted messaging

Set this property if you need to completely disable encrypted messaging between cluster members. (Default: enabled)
```
rundeck.clusterMode.messaging.encryption.enabled = false
```

**Note:** Jobs with secure options will **NOT** be remotely executed if encryption is disabled, falling back to local execution only.

#### Configuring encryption parameters

Message encryption currently implements the CMS/PKCS#7 standard, using RSA as signature algorithm. You can configure many parameters
for the encryption stack with the following properties. **Note**: All cluster instances must have the same cyphers configured in order to work properly.

**Signature key size**

Sets the key size to use for the RSA public/private key generation. Minimum key size supported is 512. (Default: 2048)  
```
rundeck.clusterMode.messaging.encryption.simplecms.keySize=2048
```

**Signature Algorithm**

Set the algorithms to use for the signature generation. (Default: SHA256withRSA)
```
rundeck.clusterMode.messaging.encryption.simplecms.signatureAlgorithm=SHA256withRSA
```
Currently supported modes are:
- SHA1withRSA
- SHA224withRSA
- SHA256withRSA
- SHA384withRSA
- SHA512withRSA
- SHA512/224withRSA
- SHA512/256withRSA
- SHA3-224withRSA
- SHA3-256withRSA
- SHA3-384withRSA
- SHA3-512withRSA

**Certificate Validity**

Set the validity in days for the instance self-signed certificate. (default 10 years)
```
rundeck.clusterMode.messaging.encryption.simplecms.certValidityDays=3650
```

**Encryption Algorithm**

Specify the algorithm to use for content encryption. (Default: AES128_CBC)
```
rundeck.clusterMode.messaging.encryption.simplecms.encryptionAlgorithm=AES128_CBC
```

Recommended cypher modes:
- AES256_CBC
- AES192_CBC
- AES128_CBC (default)

Other available cyphers: https://www.bouncycastle.org/docs/pkixdocs1.5on/org/bouncycastle/cms/CMSAlgorithm.html

**Cleanup process for cluster remote execution messages**

A property is available to set a timer to cleanup the remote execution messages when running on cluster mode. Unit of measure is in minutes with a default value of '30', in order to change this value, you need to add the following property in rundeck-config.properties file and set the desired value.

The user could want to change this value to keep a longer track of remote executions, for auditing or troubleshooting purposes.
```
rundeck.clusterMode.remoteExecution.cleanup.older.messages=25
```
