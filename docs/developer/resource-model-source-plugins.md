# Node Source Plugins
## (Resource Model Source Plugins)

## Overview

**Node Source plugins** (also called "Resource Model Source" plugins in the API) dynamically discover and import nodes into Rundeck from external systems. Instead of manually defining nodes in Rundeck, you can automatically pull them from your infrastructure providers, CMDBs, container orchestrators, cloud platforms, and monitoring systems.

::: tip Terminology Note
In the Rundeck API and code, these are called "ResourceModelSource" plugins, but in user-facing documentation and the UI, they're referred to as "Node Sources." They're the same thing - we use "Node Source" in this guide as it's clearer and matches what users see in the interface.
:::

**What Are Nodes?**

Nodes represent the targets where Rundeck executes commands - servers, containers, cloud instances, network devices, or any system you want to automate. Each node has attributes like hostname, username, tags, and connection settings.

**Why Use Node Source Plugins?**

**Dynamic Infrastructure:**
- **AWS EC2** - Auto-discover EC2 instances, import tags and metadata
- **Azure VMs** - Pull Azure virtual machines into Rundeck
- **Google Cloud** - Import GCE instances automatically
- **Kubernetes** - Discover pods, deployments, services as nodes
- **Docker** - Import running containers as execution targets

**Configuration Management Databases (CMDB):**
- **ServiceNow** - Sync nodes from CMDB configuration items
- **Device42** - Import discovered infrastructure
- **Custom CMDB** - Query your internal asset database

**Monitoring & Observability:**
- **Datadog** - Import monitored hosts and their tags
- **Sensu** - Use monitoring data to populate nodes
- **Prometheus** - Discover targets from service discovery

**Container Orchestration:**
- **Kubernetes** - Pods, services, deployments
- **AWS ECS/Fargate** - Container tasks
- **Azure AKS** - Kubernetes nodes and pods
- **GCP GKE** - GKE cluster resources

**Common Scenarios:**
- Auto-scaling environments where nodes come and go
- Multi-cloud deployments (AWS + Azure + GCP)
- Hybrid infrastructure (on-prem + cloud)
- Microservices (hundreds/thousands of containers)
- Network device management (routers, switches)
- Database fleet management

**Real-World Examples:**
- **E-commerce**: Auto-discover 500+ EC2 instances across dev/staging/prod, import tags for environment, team, app name
- **SaaS Startup**: Kubernetes pods auto-populate as nodes, Rundeck jobs target by label selectors
- **Enterprise**: ServiceNow CMDB as single source of truth, 10K+ servers synced every 5 minutes
- **DevOps Team**: Docker containers discovered on-demand, temporary nodes for batch jobs
- **Network Ops**: Custom SNMP-based plugin discovers all network devices, imports device type and location

**Benefits:**
- **Always Up-to-Date** - Nodes refresh automatically (every 30s by default)
- **Zero Manual Maintenance** - No manual node management required
- **Source of Truth** - Infrastructure provider is authoritative
- **Automatic Attributes** - Tags, metadata imported automatically
- **Scale** - Handles thousands of dynamic nodes
- **Consistency** - Same data across teams and tools

## When to Create a Custom Node Source

### Existing Plugins Cover Most Needs

Rundeck and the community already provide node source plugins for:
- AWS EC2, Azure VMs, Google Cloud
- Kubernetes, Docker, ECS/Fargate
- ServiceNow, VMware, Oracle Cloud
- Static files (JSON, YAML, XML)
- HTTP/REST APIs

**Check first:** <https://github.com/rundeck-plugins/>

### Create a Custom Plugin When:

**✅ Your Infrastructure Provider Isn't Supported**
- Proprietary CMDB or asset management system
- Custom cloud platform or hypervisor
- Internal service registry or discovery system
- Legacy systems with unique APIs

**✅ You Need Custom Logic**
- Filter or transform nodes based on business rules
- Combine data from multiple sources
- Add computed attributes or enrichment
- Implement custom tagging schemes

**✅ You Have a Unique Data Source**
- CSV files from external team
- Excel spreadsheets (converted to CSV)
- Custom database schemas
- LDAP/Active Directory queries
- Network discovery tools (Nmap, etc.)

**✅ Integration Requirements**
- Internal API that returns infrastructure data
- ETL pipeline outputs node inventory
- Monitoring system with custom metadata
- Ticketing system (JIRA, etc.) as source

### Don't Create a Plugin When:

**❌ A Simple Script Suffices**

If you just need to generate static nodes or call a simple API, use a [Script Plugin](#script-plugin-type) - much faster than Java.

**❌ Manual Management Is Fine**

For small, static environments (<20 nodes), manually defining nodes in `resources.xml` or the Resource Editor is simpler.

**❌ Data Changes Rarely**

If your node list updates monthly, a scheduled script that generates a static file might be easier than maintaining a plugin.

## How Node Source Plugins Work

### Refresh Cycle

```
Rundeck Project
  ↓
1. Calls Node Source Plugin (every 30s default)
  ↓
2. Plugin queries external system (API, DB, file, etc.)
  ↓
3. Plugin returns nodes in standard format
  ↓
4. Rundeck updates node list
  ↓
5. Jobs can target the latest nodes
```

### Node Attributes

Each node must have:
- **nodename** - Unique identifier (required)
- **hostname** - Target hostname or IP (required)
- **username** - SSH/WinRM username
- **osFamily** - Linux, Windows, etc.
- **tags** - For filtering and targeting

Additional attributes:
- Custom attributes (environment, app, team, etc.)
- Connection settings (ssh-port, winrm-port)
- Authentication method
- Any metadata useful for job targeting

### Plugin Responsibilities

Your plugin must:
1. **Query** the external system for current node data
2. **Transform** data into Rundeck node format
3. **Handle errors** gracefully (network issues, auth failures)
4. **Return** nodes in the specified format (YAML, JSON, XML)

Rundeck handles:
- Scheduling refresh (every 30s default)
- Caching nodes between refreshes
- Merging nodes from multiple sources
- Filtering by tags/attributes in jobs

## Configuration

Node Source plugins can be configured via:
- Rundeck Web UI (Project Settings → Edit Nodes → Sources)
- `project.properties` file (for advanced users)

The `ResourceModelSource` service ([javadoc]({{$javaDocBase}}/com/dtolabs/rundeck/core/resources/ResourceModelSource.html)) automatically generates configuration forms from your plugin properties.

## Java Plugin Type

A ResourceModelSource provider is actually a Factory class.
An instance of your ResourceModelSource provider will be
re-used, so each time a new ResourceModelSource with a new configuration is required,
your Factory class will be invoked to produce it.

Your provider class must implement the interface
[ResourceModelSourceFactory]({{$javaDocBase}}/com/dtolabs/rundeck/core/resources/ResourceModelSourceFactory.html):

```java
public interface ResourceModelSourceFactory {
    /**
     * Return a resource model source for the given configuration
     */
    public ResourceModelSource createResourceModelSource(Properties configuration)
       throws ConfigurationException;
}
```

### Plugin properties

See [Plugin Development - Java Plugins - Descriptions](/developer/java-plugin-development.md#plugin-descriptions)
to learn how to create configuration properties for your ResourceModelSource plugin.

## Script Plugin Type

See the [Script Plugin Development](/developer/script-plugin-development.md)
for the basics of developing script-based plugins for Rundeck.

### Instance scope properties

Instance scoped properties for ResourceModelSources are loaded from the project's Resource Model Source entries. A project can define multiple entries, and at execution time, the Instance scoped values come from those entries.

### Example

Here is an example `plugin.yaml` script-based ResourceModelSource plugin
declaring a provider called "mysource" that produces resource-format `resourceyaml` output.
The provider declares three config properties (account, url, region)
and illustrates the use
of three different types (Integer, String, FreeSelect).

Example: plugin.yaml

```yaml .numberLines
name: My Resource Model Source
version: 1.0
rundeckPluginVersion: 1.0
author: alexh
date: 05/10/12
providers:
    - name: mysource
      service: ResourceModelSource
      plugin-type: script
      script-interpreter: bash -c
      script-file: nodes.sh
      resource-format: resourceyaml
      config:
        - type: Integer
          name: account
          title: Account
          description: Enter the account number.
        - type: String
          name: url
          title: URL
          description: Enter the URL to the inventory service.
        - type: FreeSelect
          name: region
          title: Region
          description: Select a region.
          required: true
          default: east
          values: east,north,south,west
```

The `script-file` entry on line 11 references a script called "nodes.sh" referencing
the plugin properties (see script below).

Example script-file: nodes.sh

```bash
#!/usr/bin/env bash

# variables set by plugin properties:
: ${RD_CONFIG_ACCOUNT:?"account plugin property not specified"}
: ${RD_CONFIG_REGION:?"region plugin property not specified"}
: ${RD_CONFIG_URL:?"url plugin property not specified"}

#
# Generate node data here.
#
exit $?
```

Example: Connecting to a linux node by password

```yaml .numberLines
name: My Resource Model Source
version: 1.0
rundeckPluginVersion: 1.2
author: Pagerduty
date: 01/01/23
providers:
    - name: My Linux Source
        service: ResourceModelSource
        plugin-type: script
        script-interpreter: bash -c
        script-file: script.sh
        resource-format: resourceyaml
        config:
          - type: String
            name: password
            title: Password
            description: Password from key storage.
          - type: String
            name: username
            title: Username
            description: Username of node.
          - type: String
            name: hostname
            title: Hostname
            description: Hostname of node.
```

Example script-file: script.sh

```bash
#!/bin/bash
echo "linux-node:
  description: Linux node
  hostname: $RD_CONFIG_HOSTNAME
  nodename: linux-node
  username: $RD_CONFIG_USERNAME
  osArch: x86_64
  osFamily: Linux
  osName: Ubuntu
  osVersion: 7.4.1708
  ssh-port: 22
  ssh-authentication: password
  ssh-password-storage-path: $RD_CONFIG_PASSWORD"
exit $?
```

### Provider Script Requirements

The ResourceModelSource service has expectations about the way your provider script behaves.

Exit code:

- Exit code of 0 indicates success.
- Any other exit code indicates failure.

Script output:

- All output on `STDOUT` will be captured and passed to a
  [ResourceFormatParser](/developer/resource-model-format-plugins.md#resourceformatparser) for the specified `resource-format` to create the Node definitions.
