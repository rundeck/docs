# Orchestrator Plugins

## Overview

Orchestrator plugins control **how** and **in what order** nodes are executed during job runs. They manage the flow of execution across multiple nodes, enabling sophisticated deployment strategies, rolling updates, and controlled releases.

**What Orchestrators Control:**

- **Order** - Which nodes execute first, which wait
- **Parallelism** - How many nodes execute simultaneously
- **Dependencies** - Node B waits for Node A to complete
- **Conditions** - Execute only if previous nodes succeeded
- **Grouping** - Process nodes in batches/waves

**Without Orchestrator:** All nodes execute simultaneously (up to threadcount)  
**With Orchestrator:** Controlled, strategic execution flow

**Real-World Scenarios:**

**Rolling Deployments:**
- Deploy to 10% of web servers first (canary)
- If successful, deploy to next 40% (wave 2)
- Finally deploy to remaining 50% (wave 3)
- Stop immediately if any wave fails

**Blue-Green Deployments:**
- Deploy to "green" environment nodes
- Run health checks
- Switch traffic from "blue" to "green"
- Keep "blue" as rollback option

**Database Migrations:**
- Execute on primary database first
- Wait for replication to secondaries
- Then update application servers
- Specific execution order critical

**Load Balancer Management:**
- Remove node from load balancer
- Deploy/update software
- Run smoke tests
- Add back to load balancer
- Repeat for next node

**Tiered Architecture:**
- Update database tier first
- Then application tier
- Then cache tier
- Then web tier
- Dependencies matter!

**Percentage-Based Rollout:**
- Start with 1% of production servers
- Monitor metrics for 10 minutes
- If healthy, increase to 10%
- Then 25%, 50%, 100%
- Automatic rollback on errors

**Common Use Cases:**

- **Minimize Risk** - Test on small subset before full deployment
- **Zero Downtime** - Never take all servers offline simultaneously
- **Resource Constraints** - Don't overwhelm network/database
- **Compliance** - Maintain minimum availability requirements
- **Complex Dependencies** - Respect service dependencies

**Built-in Orchestrators:**

Rundeck includes several orchestrators:
- **Default** - All nodes in parallel (up to threadcount)
- **Max Percentage** - Limit nodes to % of total
- **Random Subset** - Execute on random subset of nodes
- **Rank Attribute** - Order by node attribute value
- **Highest/Lowest** - Specific ranking strategies

**Benefits:**
- **Controlled Risk** - Progressive rollout limits blast radius
- **High Availability** - Maintain service during updates
- **Smart Scheduling** - Optimize execution order
- **Automatic Rollback** - Stop on first failure
- **Resource Management** - Prevent overload

## Java Plugin Type

::: tip
Refer to [Java Development](/developer/java-plugin-development.md) for information about developing a Java plugin for Rundeck.
:::

The plugin interface is [OrchestratorPlugin]({{$javaDocBase}}/com/dtolabs/rundeck/plugins/orchestrator/OrchestratorPlugin.html).

This is actually a Factory pattern, which produces an [Orchestrator]({{$javaDocBase}}/com/dtolabs/rundeck/plugins/orchestrator/Orchestrator.html) instance.

The `Orchestrator` instance is responsible for determining what order and how many nodes are available to execute on.

All of the methods on the orchestrator will be called on the same thread,
so your Orchestrator implementation does not need to worry about synchronization.

The `getNode()` method will be called multiple times to retrieve any available Nodes for processing.
If it returns `null`, that indicates no nodes are currently available.
`isComplete` method will be called to determine if any nodes will be available in the future if `null` has been returned.
Note that `isComplete` does not need to wait for all nodes to be returned via `returnNode`,
it merely has to indicate if any new nodes will be returned from `getNode()`.

The Orchestrator should return a node from getNode when it is ready to be executed on.
Once the execution is completed on a node the `returnNode(OrchestratorNodeResult)` method will be called with the node and information about the success status of the execution,
allowing the Orchestrator to mark new nodes to be released.

Nodes may be executed on in the same or on multiple threads,
the Orchestrator processor will manage the threads based on the configured Threadcount for the job.

In this manner, the Orchestrator allows some number of nodes to be executed on simultaneously, and manages
when new nodes are available.

Note: The Orchestrator must abide by these limitations:

1. A node may not be processed more than once, so getNode should always return a new node, or null.
2. The Orchestrator must return nodes from the original set given to the OrchestratorPlugin, it cannot introduce new nodes

## When to Create a Custom Orchestrator

### Built-in Orchestrators Cover Many Needs

Rundeck includes:
- **Max Percentage** - Limit execution to % of nodes
- **Random Subset** - Random node selection
- **Rank Attribute** - Order by node attribute
- **Highest/Lowest** - Ranked execution

### Create Custom Orchestrator When:

**✅ Complex Rollout Strategy**
- Multi-wave deployments (10%, 25%, 50%, 100%)
- Blue-green with automated traffic switching
- Canary deployments with metric monitoring
- Geographic/regional rollout patterns

**✅ External System Integration**
- Check monitoring system before next batch
- Query load balancer status
- Wait for health check endpoints
- Integrate with change management system

**✅ Dynamic Node Selection**
- Choose nodes based on current load
- Avoid overloaded nodes
- Prefer nodes with lower latency
- Balance across availability zones

**✅ Advanced Dependencies**
- Wait for database replication
- Respect service dependencies
- Coordinate with external jobs
- Time-based releases (business hours only)

**✅ Custom Failure Handling**
- Retry failed nodes before next batch
- Skip problematic nodes
- Implement circuit breaker pattern
- Custom rollback logic

### Don't Create When:

**❌ Simple Percentage Limits**

Use built-in Max Percentage orchestrator.

**❌ Fixed Ordering**

Use Rank Attribute orchestrator with node attributes.

**❌ Random Selection**

Use Random Subset orchestrator.

## How Orchestrators Work

### Execution Flow

```
Job Starts
  ↓
Orchestrator Factory creates Orchestrator instance
  ↓
Rundeck calls getNode() repeatedly
  ├→ Returns node → Thread executes step on node
  ├→ Returns null → No nodes currently available
  └→ More nodes? Check isComplete()
       ↓
Node completes execution
  ↓
Rundeck calls returnNode(result)
  ↓
Orchestrator decides if more nodes ready
  ↓
Rundeck calls getNode() again...
```

### Key Methods

**Factory Pattern:**
```java
public interface OrchestratorPlugin {
    Orchestrator createOrchestrator(
        StepExecutionContext context,
        Collection<INodeEntry> nodes
    );
}
```

**Orchestrator Instance:**
```java
public interface Orchestrator {
    // Called repeatedly: return next node to process, or null
    INodeEntry getNode();
    
    // Called after each node completes
    void returnNode(INodeEntry node, boolean success, OrchestratorNodeResult result);
    
    // Are more nodes coming? (after getNode returns null)
    boolean isComplete();
}
```

### Threading Model

- **Single-threaded calls** - All orchestrator methods called on same thread (no synchronization needed)
- **Multi-threaded execution** - Nodes may execute in parallel on multiple threads (up to job's threadcount)
- **Your responsibility** - Return nodes in desired order
- **Rundeck's responsibility** - Manage thread pool, call your methods

### Rules You Must Follow

1. **Each node once** - `getNode()` must never return same node twice
2. **From provided set** - Can't introduce new nodes not in original collection
3. **Return null when done** - Signal no more nodes available now
4. **isComplete() accuracy** - Return true only when no more nodes will ever be available

## Configuration

See [Jobs - Orchestrator](/manual/jobs/creating-jobs.md#orchestrator) for configuring orchestrators in job definitions.

## Related Documentation

- [Jobs - Orchestrator](/manual/jobs/creating-jobs.md#orchestrator) - Configuring orchestrators in jobs
- [Java Plugin Development](/developer/java-plugin-development.md) - General Java plugin guide
- [Node Executor Plugins](/developer/node-executor-plugins.md) - Executing commands on nodes
- [Step Plugins](/developer/step-plugins.md) - Creating workflow steps

## Quick Reference

### Factory Method

```java
@Override
public Orchestrator createOrchestrator(StepExecutionContext context,
                                      Collection<INodeEntry> nodes) {
    return new MyOrchestrator(nodes, /* config */);
}
```

### Orchestrator Methods

| Method | Purpose | Return Value |
|--------|---------|--------------|
| `getNode()` | Get next node to execute | Node or null (none available now) |
| `returnNode(node, success, result)` | Node completed execution | void |
| `isComplete()` | Are more nodes coming? | true = done, false = more possible |

### Rules

1. **Each node once** - Never return same node twice from `getNode()`
2. **From provided set** - Can't introduce new nodes
3. **Return null when none ready** - Not when permanently done
4. **isComplete() = true** - Only when permanently done (no more nodes ever)

### Common Patterns

**Sequential Execution:**
```java
Queue<INodeEntry> queue = new LinkedList<>(nodes);
public INodeEntry getNode() { return queue.poll(); }
```

**Percentage-Based:**
```java
int processed = 0;
int maxThisWave = (int)(nodes.size() * 0.10); // 10%
public INodeEntry getNode() {
    if (processed >= maxThisWave) return null;
    processed++;
    return nextNode();
}
```

**Wait Between Batches:**
```java
long waitUntil = 0;
public INodeEntry getNode() {
    if (System.currentTimeMillis() < waitUntil) return null;
    // ... return next node
}
```
