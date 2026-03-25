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

## Java Plugin Implementation

### Factory Pattern

Java Node Source plugins use a **Factory pattern**. Your plugin provides a factory class that creates source instances.

**Why?** A project can have multiple node source configurations (e.g., "Production AWS", "Staging AWS", "Development Servers"). Each needs its own instance with different settings. The factory creates a new instance for each configuration.

Your factory must implement [ResourceModelSourceFactory]({{$javaDocBase}}/com/dtolabs/rundeck/core/resources/ResourceModelSourceFactory.html):

```java
public interface ResourceModelSourceFactory {
    ResourceModelSource createResourceModelSource(Properties configuration)
        throws ConfigurationException;
}
```

The returned `ResourceModelSource` must implement:

```java
public interface ResourceModelSource {
    INodeSet getNodes() throws ResourceModelSourceException;
}
```

### Complete Example: REST API Node Source

This example queries a REST API for node inventory:

```java
package com.example.rundeck.nodes;

import com.dtolabs.rundeck.core.common.*;
import com.dtolabs.rundeck.core.plugins.Plugin;
import com.dtolabs.rundeck.core.plugins.configuration.*;
import com.dtolabs.rundeck.core.resources.ResourceModelSource;
import com.dtolabs.rundeck.core.resources.ResourceModelSourceException;
import com.dtolabs.rundeck.core.resources.ResourceModelSourceFactory;
import com.dtolabs.rundeck.plugins.ServiceNameConstants;
import com.dtolabs.rundeck.plugins.descriptions.*;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.net.http.*;
import java.net.URI;
import java.time.Duration;
import java.util.*;

@Plugin(name = "api-node-source", service = ServiceNameConstants.ResourceModelSource)
@PluginDescription(
    title = "API Node Source",
    description = "Discovers nodes from REST API"
)
public class ApiNodeSourceFactory implements ResourceModelSourceFactory, Describable {
    
    @PluginProperty(
        title = "API URL",
        description = "REST API endpoint that returns node data",
        required = true
    )
    private String apiUrl;
    
    @PluginProperty(
        title = "API Token",
        description = "Authentication token",
        required = false
    )
    @RenderingOption(key = "displayType", value = "PASSWORD")
    private String apiToken;
    
    @PluginProperty(
        title = "Environment Filter",
        description = "Filter nodes by environment (leave empty for all)",
        required = false
    )
    @SelectValues(values = {"", "dev", "staging", "prod"}, freeSelect = true)
    private String environment;
    
    @PluginProperty(
        title = "Default Username",
        description = "Default SSH username for nodes",
        required = false,
        defaultValue = "rundeck"
    )
    private String defaultUsername;
    
    @PluginProperty(
        title = "Timeout (seconds)",
        description = "API request timeout",
        required = false,
        defaultValue = "30"
    )
    private Integer timeout;
    
    @Override
    public ResourceModelSource createResourceModelSource(Properties configuration) 
            throws ConfigurationException {
        return new ApiNodeSource(
            apiUrl,
            apiToken,
            environment,
            defaultUsername,
            timeout != null ? timeout : 30
        );
    }
    
    @Override
    public Description getDescription() {
        return DescriptionBuilder.builder()
            .name("api-node-source")
            .title("API Node Source")
            .description("Discovers nodes from REST API")
            .property(PropertyBuilder.builder()
                .string("apiUrl")
                .title("API URL")
                .description("REST API endpoint")
                .required(true)
                .build())
            // ... other properties
            .build();
    }
    
    /**
     * The actual node source implementation
     */
    private static class ApiNodeSource implements ResourceModelSource {
        private final String apiUrl;
        private final String apiToken;
        private final String environment;
        private final String defaultUsername;
        private final int timeout;
        private final HttpClient httpClient;
        private final ObjectMapper objectMapper;
        
        public ApiNodeSource(String apiUrl, String apiToken, String environment,
                           String defaultUsername, int timeout) {
            this.apiUrl = apiUrl;
            this.apiToken = apiToken;
            this.environment = environment;
            this.defaultUsername = defaultUsername;
            this.timeout = timeout;
            
            this.httpClient = HttpClient.newBuilder()
                .connectTimeout(Duration.ofSeconds(timeout))
                .build();
            
            this.objectMapper = new ObjectMapper();
        }
        
        @Override
        public INodeSet getNodes() throws ResourceModelSourceException {
            try {
                // Build API request
                HttpRequest.Builder requestBuilder = HttpRequest.newBuilder()
                    .uri(URI.create(apiUrl))
                    .timeout(Duration.ofSeconds(timeout))
                    .GET();
                
                // Add authentication if provided
                if (apiToken != null && !apiToken.isEmpty()) {
                    requestBuilder.header("Authorization", "Bearer " + apiToken);
                }
                
                // Add environment filter if specified
                if (environment != null && !environment.isEmpty()) {
                    requestBuilder.uri(URI.create(apiUrl + "?environment=" + environment));
                }
                
                HttpRequest request = requestBuilder.build();
                
                // Make API call
                HttpResponse<String> response = httpClient.send(
                    request,
                    HttpResponse.BodyHandlers.ofString()
                );
                
                if (response.statusCode() != 200) {
                    throw new ResourceModelSourceException(
                        "API returned status " + response.statusCode());
                }
                
                // Parse JSON response
                JsonNode root = objectMapper.readTree(response.body());
                JsonNode serversNode = root.get("servers");
                
                if (serversNode == null || !serversNode.isArray()) {
                    throw new ResourceModelSourceException(
                        "API response missing 'servers' array");
                }
                
                // Convert JSON to NodeSet
                return convertToNodeSet(serversNode);
                
            } catch (IOException | InterruptedException e) {
                throw new ResourceModelSourceException(
                    "Error fetching nodes from API: " + e.getMessage(), e);
            }
        }
        
        private INodeSet convertToNodeSet(JsonNode serversNode) {
            NodeSetImpl nodeSet = new NodeSetImpl();
            
            for (JsonNode serverNode : serversNode) {
                try {
                    INodeEntry node = convertToNode(serverNode);
                    nodeSet.putNode(node);
                } catch (Exception e) {
                    // Log error but continue with other nodes
                    System.err.println("Error converting node: " + e.getMessage());
                }
            }
            
            return nodeSet;
        }
        
        private INodeEntry convertToNode(JsonNode serverNode) {
            NodeEntryImpl node = new NodeEntryImpl();
            
            // Required fields
            String hostname = serverNode.get("hostname").asText();
            String nodename = serverNode.has("nodename") 
                ? serverNode.get("nodename").asText() 
                : hostname;
            
            node.setNodename(nodename);
            node.setHostname(hostname);
            
            // Username (use default if not specified)
            String username = serverNode.has("username")
                ? serverNode.get("username").asText()
                : defaultUsername;
            node.setUsername(username);
            
            // OS information
            if (serverNode.has("osFamily")) {
                node.setOsFamily(serverNode.get("osFamily").asText());
            }
            if (serverNode.has("osName")) {
                node.setOsName(serverNode.get("osName").asText());
            }
            if (serverNode.has("osVersion")) {
                node.setOsVersion(serverNode.get("osVersion").asText());
            }
            
            // Tags
            if (serverNode.has("tags")) {
                Set<String> tags = new HashSet<>();
                serverNode.get("tags").forEach(tag -> tags.add(tag.asText()));
                node.setTags(tags);
            }
            
            // Custom attributes
            Map<String, String> attributes = new HashMap<>();
            if (serverNode.has("environment")) {
                attributes.put("environment", serverNode.get("environment").asText());
            }
            if (serverNode.has("application")) {
                attributes.put("application", serverNode.get("application").asText());
            }
            if (serverNode.has("team")) {
                attributes.put("team", serverNode.get("team").asText());
            }
            node.setAttributes(attributes);
            
            // Description
            if (serverNode.has("description")) {
                node.setDescription(serverNode.get("description").asText());
            }
            
            return node;
        }
    }
}
```

**API Response Format Expected:**

```json
{
  "servers": [
    {
      "hostname": "web01.example.com",
      "nodename": "web01",
      "username": "ubuntu",
      "osFamily": "Linux",
      "osName": "Ubuntu",
      "osVersion": "22.04",
      "tags": ["web", "production", "loadbalanced"],
      "environment": "prod",
      "application": "ecommerce-frontend",
      "team": "platform",
      "description": "Production web server 1"
    },
    {
      "hostname": "db01.example.com",
      "nodename": "db01",
      "username": "postgres",
      "osFamily": "Linux",
      "tags": ["database", "production", "primary"],
      "environment": "prod",
      "application": "ecommerce-db"
    }
  ]
}
```

### Complete Example: Database Node Source

This example queries a database for node inventory:

```java
package com.example.rundeck.nodes;

import com.dtolabs.rundeck.core.common.*;
import com.dtolabs.rundeck.core.plugins.Plugin;
import com.dtolabs.rundeck.core.resources.*;
import com.dtolabs.rundeck.plugins.ServiceNameConstants;
import com.dtolabs.rundeck.plugins.descriptions.*;

import java.sql.*;
import java.util.*;

@Plugin(name = "db-node-source", service = ServiceNameConstants.ResourceModelSource)
@PluginDescription(
    title = "Database Node Source",
    description = "Loads nodes from database table"
)
public class DatabaseNodeSourceFactory implements ResourceModelSourceFactory {
    
    @PluginProperty(title = "JDBC URL", required = true)
    private String jdbcUrl;
    
    @PluginProperty(title = "Username", required = true)
    private String dbUsername;
    
    @PluginProperty(title = "Password", required = true)
    @RenderingOption(key = "displayType", value = "PASSWORD")
    private String dbPassword;
    
    @PluginProperty(
        title = "Query",
        description = "SQL query to fetch nodes",
        required = false,
        defaultValue = "SELECT * FROM servers WHERE active = 1"
    )
    @RenderingOption(key = "displayType", value = "MULTI_LINE")
    private String query;
    
    @Override
    public ResourceModelSource createResourceModelSource(Properties configuration) 
            throws ConfigurationException {
        return new DatabaseNodeSource(jdbcUrl, dbUsername, dbPassword, query);
    }
    
    private static class DatabaseNodeSource implements ResourceModelSource {
        private final String jdbcUrl;
        private final String dbUsername;
        private final String dbPassword;
        private final String query;
        
        public DatabaseNodeSource(String jdbcUrl, String dbUsername,
                                String dbPassword, String query) {
            this.jdbcUrl = jdbcUrl;
            this.dbUsername = dbUsername;
            this.dbPassword = dbPassword;
            this.query = query;
        }
        
        @Override
        public INodeSet getNodes() throws ResourceModelSourceException {
            NodeSetImpl nodeSet = new NodeSetImpl();
            
            try (Connection conn = DriverManager.getConnection(jdbcUrl, dbUsername, dbPassword);
                 Statement stmt = conn.createStatement();
                 ResultSet rs = stmt.executeQuery(query)) {
                
                while (rs.next()) {
                    try {
                        INodeEntry node = createNodeFromResultSet(rs);
                        nodeSet.putNode(node);
                    } catch (SQLException e) {
                        System.err.println("Error processing row: " + e.getMessage());
                    }
                }
                
            } catch (SQLException e) {
                throw new ResourceModelSourceException(
                    "Database error: " + e.getMessage(), e);
            }
            
            return nodeSet;
        }
        
        private INodeEntry createNodeFromResultSet(ResultSet rs) throws SQLException {
            NodeEntryImpl node = new NodeEntryImpl();
            
            // Required fields
            node.setNodename(rs.getString("nodename"));
            node.setHostname(rs.getString("hostname"));
            node.setUsername(rs.getString("username"));
            
            // Optional fields
            if (hasColumn(rs, "os_family")) {
                node.setOsFamily(rs.getString("os_family"));
            }
            if (hasColumn(rs, "description")) {
                node.setDescription(rs.getString("description"));
            }
            
            // Tags (comma-separated in DB)
            if (hasColumn(rs, "tags")) {
                String tagsStr = rs.getString("tags");
                if (tagsStr != null && !tagsStr.isEmpty()) {
                    Set<String> tags = new HashSet<>(Arrays.asList(tagsStr.split(",")));
                    node.setTags(tags);
                }
            }
            
            // Custom attributes
            Map<String, String> attributes = new HashMap<>();
            if (hasColumn(rs, "environment")) {
                attributes.put("environment", rs.getString("environment"));
            }
            if (hasColumn(rs, "application")) {
                attributes.put("application", rs.getString("application"));
            }
            node.setAttributes(attributes);
            
            return node;
        }
        
        private boolean hasColumn(ResultSet rs, String columnName) {
            try {
                rs.findColumn(columnName);
                return true;
            } catch (SQLException e) {
                return false;
            }
        }
    }
}
```

**Database Schema Example:**

```sql
CREATE TABLE servers (
    id INT PRIMARY KEY,
    nodename VARCHAR(255) NOT NULL,
    hostname VARCHAR(255) NOT NULL,
    username VARCHAR(100),
    os_family VARCHAR(50),
    description TEXT,
    tags VARCHAR(500),  -- Comma-separated
    environment VARCHAR(50),
    application VARCHAR(100),
    active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO servers VALUES
(1, 'web01', 'web01.example.com', 'ubuntu', 'Linux', 'Web server 1', 
 'web,production,frontend', 'prod', 'ecommerce', TRUE, NOW());
```

## Script Plugin Implementation

::: tip When to Use Scripts
Script plugins are **much faster** to develop than Java plugins. Use them for:
- Calling external APIs (curl, wget)
- Querying files or databases (sqlite, csv)
- Running discovery tools (nmap, aws cli, kubectl)
- Simple transformations
:::

See [Script Plugin Development](/developer/script-plugin-development.md) for general script plugin basics.

### Complete Example: AWS CLI Node Source

Query AWS EC2 instances using AWS CLI:

**plugin.yaml:**

```yaml
name: AWS CLI Node Source
version: 1.0
rundeckPluginVersion: 1.2
author: DevOps Team
providers:
  - name: aws-cli-nodes
    service: ResourceModelSource
    plugin-type: script
    script-interpreter: /bin/bash
    script-file: aws-nodes.sh
    resource-format: resourceyaml
    config:
      - type: String
        name: region
        title: AWS Region
        description: AWS region to query
        required: true
        default: us-east-1
      - type: String
        name: environment
        title: Environment Filter
        description: Filter by Environment tag
        required: false
      - type: String
        name: profile
        title: AWS Profile
        description: AWS CLI profile to use
        required: false
        default: default
```

**aws-nodes.sh:**

```bash
#!/bin/bash
set -e

# Configuration from plugin properties
REGION="${RD_CONFIG_REGION}"
ENVIRONMENT="${RD_CONFIG_ENVIRONMENT}"
PROFILE="${RD_CONFIG_PROFILE:-default}"

# Build AWS CLI query
QUERY="Reservations[].Instances[].[InstanceId,PrivateDnsName,Tags[?Key=='Name'].Value|[0],Tags[?Key=='Environment'].Value|[0],State.Name]"

# Apply environment filter if specified
FILTER="Name=instance-state-name,Values=running"
if [ -n "$ENVIRONMENT" ]; then
    FILTER="$FILTER Name=tag:Environment,Values=$ENVIRONMENT"
fi

# Query AWS EC2
aws ec2 describe-instances \
    --region "$REGION" \
    --profile "$PROFILE" \
    --filters $FILTER \
    --query "$QUERY" \
    --output text | while read -r instance_id dns_name name environment state; do
    
    # Skip if not running
    [ "$state" != "running" ] && continue
    
    # Use instance ID if name not set
    nodename="${name:-$instance_id}"
    hostname="${dns_name:-$instance_id}"
    
    # Generate YAML for this node
    cat <<EOF
$nodename:
  nodename: $nodename
  hostname: $hostname
  description: AWS EC2 Instance
  username: ec2-user
  osFamily: Linux
  tags:
    - aws
    - ec2
    - ${environment:-unknown}
  attributes:
    aws-instance-id: $instance_id
    aws-region: $REGION
    environment: ${environment:-unknown}
EOF
done

exit 0
```

### Complete Example: CSV File Node Source

Read nodes from a CSV file:

**plugin.yaml:**

```yaml
name: CSV Node Source
version: 1.0
rundeckPluginVersion: 1.2
providers:
  - name: csv-nodes
    service: ResourceModelSource
    plugin-type: script
    script-interpreter: /bin/bash
    script-file: csv-nodes.sh
    resource-format: resourceyaml
    config:
      - type: String
        name: csv_path
        title: CSV File Path
        description: Path to CSV file with node data
        required: true
      - type: String
        name: default_username
        title: Default Username
        description: Default SSH username if not in CSV
        required: false
        default: rundeck
```

**csv-nodes.sh:**

```bash
#!/bin/bash
set -e

CSV_PATH="${RD_CONFIG_CSV_PATH}"
DEFAULT_USERNAME="${RD_CONFIG_DEFAULT_USERNAME:-rundeck}"

# Check if file exists
if [ ! -f "$CSV_PATH" ]; then
    echo "ERROR: CSV file not found: $CSV_PATH" >&2
    exit 1
fi

# Read CSV (skip header) and generate YAML
# Expected CSV format: nodename,hostname,username,environment,tags
tail -n +2 "$CSV_PATH" | while IFS=',' read -r nodename hostname username environment tags; do
    # Skip empty lines
    [ -z "$nodename" ] && continue
    
    # Use default username if not specified
    username="${username:-$DEFAULT_USERNAME}"
    
    # Convert comma-separated tags to YAML list
    tag_list=""
    if [ -n "$tags" ]; then
        IFS=';' read -ra TAG_ARRAY <<< "$tags"
        for tag in "${TAG_ARRAY[@]}"; do
            tag_list="$tag_list
    - $tag"
        done
    fi
    
    # Generate YAML
    cat <<EOF
$nodename:
  nodename: $nodename
  hostname: $hostname
  username: $username
  osFamily: Linux
  tags:$tag_list
  attributes:
    environment: ${environment:-unknown}
EOF
done

exit 0
```

**Example CSV (`servers.csv`):**

```csv
nodename,hostname,username,environment,tags
web01,web01.example.com,ubuntu,prod,web;frontend;loadbalanced
web02,web02.example.com,ubuntu,prod,web;frontend;loadbalanced
db01,db01.example.com,postgres,prod,database;primary
app01,app01.example.com,appuser,staging,application;backend
```

### Complete Example: HTTP API Node Source

Call a REST API to get nodes:

**plugin.yaml:**

```yaml
name: HTTP API Node Source
version: 1.0
rundeckPluginVersion: 1.2
providers:
  - name: http-api-nodes
    service: ResourceModelSource
    plugin-type: script
    script-interpreter: /bin/bash
    script-file: api-nodes.sh
    resource-format: resourceyaml
    config:
      - type: String
        name: api_url
        title: API URL
        description: REST API endpoint that returns JSON
        required: true
      - type: String
        name: api_token
        title: API Token
        description: Bearer token for authentication
        required: false
        renderingOptions:
          displayType: PASSWORD
      - type: Integer
        name: timeout
        title: Timeout (seconds)
        description: Request timeout
        required: false
        default: 30
```

**api-nodes.sh:**

```bash
#!/bin/bash
set -e

API_URL="${RD_CONFIG_API_URL}"
API_TOKEN="${RD_CONFIG_API_TOKEN}"
TIMEOUT="${RD_CONFIG_TIMEOUT:-30}"

# Build curl command
CURL_OPTS="-s -f --max-time $TIMEOUT"
if [ -n "$API_TOKEN" ]; then
    CURL_OPTS="$CURL_OPTS -H 'Authorization: Bearer $API_TOKEN'"
fi

# Fetch JSON from API
JSON=$(eval curl $CURL_OPTS "$API_URL")

# Check for errors
if [ $? -ne 0 ]; then
    echo "ERROR: API request failed" >&2
    exit 1
fi

# Parse JSON and convert to YAML
# This example assumes JSON format:
# { "servers": [ {"hostname": "...", "nodename": "...", ...} ] }
echo "$JSON" | jq -r '.servers[] | 
@text "
\(.nodename):
  nodename: \(.nodename)
  hostname: \(.hostname)
  username: \(.username // "rundeck")
  osFamily: \(.osFamily // "Linux")
  tags:
\((.tags // []) | map("    - \(.)") | join("\n"))
  attributes:
    environment: \(.environment // "unknown")
    application: \(.application // "")
"'

exit 0
```

### Script Requirements

**Exit Codes:**
- `0` = Success (nodes will be loaded)
- Any other = Failure (error logged, no nodes loaded)

**Output:**
- Write node data to `STDOUT` in the specified `resource-format`
- Common formats: `resourceyaml`, `resourcejson`, `resourcexml`
- Output is parsed by [Resource Format Parser](/developer/resource-model-format-plugins.md)

**Error Handling:**
- Write errors to `STDERR`
- Use `set -e` to exit on first error
- Validate configuration before querying external systems

**Best Practices for Scripts:**
- Check for required tools (`command -v jq` or `which aws`)
- Validate configuration variables
- Add timeouts for external calls
- Log errors clearly to STDERR
- Use `set -e` and `set -u` for safety

## Best Practices

### 1. Handle Errors Gracefully

```java
@Override
public INodeSet getNodes() throws ResourceModelSourceException {
    try {
        return fetchNodesFromAPI();
    } catch (IOException e) {
        // Log error but don't crash Rundeck
        System.err.println("Error fetching nodes: " + e.getMessage());
        // Return empty set rather than failing
        return new NodeSetImpl();
    }
}
```

**Why:** Node source errors shouldn't break Rundeck. Return empty set and log errors for troubleshooting.

### 2. Implement Timeouts

```java
HttpClient httpClient = HttpClient.newBuilder()
    .connectTimeout(Duration.ofSeconds(10))
    .build();

HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create(apiUrl))
    .timeout(Duration.ofSeconds(30))  // Overall request timeout
    .build();
```

**Why:** External systems can hang. Always set connection and request timeouts.

### 3. Cache Expensive Operations

```java
private Map<String, INodeSet> cache = new ConcurrentHashMap<>();
private long cacheExpiry = 0;
private final long CACHE_TTL = 60_000;  // 1 minute

@Override
public INodeSet getNodes() throws ResourceModelSourceException {
    long now = System.currentTimeMillis();
    
    if (cache.containsKey("nodes") && now < cacheExpiry) {
        return cache.get("nodes");  // Return cached
    }
    
    INodeSet nodes = fetchNodesFromAPI();
    cache.put("nodes", nodes);
    cacheExpiry = now + CACHE_TTL;
    return nodes;
}
```

**Why:** Node sources refresh every 30s. Cache expensive API calls to avoid hammering external systems.

### 4. Validate Configuration Early

```java
@Override
public ResourceModelSource createResourceModelSource(Properties configuration) 
        throws ConfigurationException {
    String apiUrl = configuration.getProperty("apiUrl");
    
    if (apiUrl == null || apiUrl.trim().isEmpty()) {
        throw new ConfigurationException("API URL is required");
    }
    
    if (!apiUrl.startsWith("http")) {
        throw new ConfigurationException("API URL must start with http:// or https://");
    }
    
    return new ApiNodeSource(apiUrl);
}
```

**Why:** Fail fast with clear errors. Don't wait until `getNodes()` to discover bad configuration.

### 5. Set Sensible Defaults

```java
@PluginProperty(
    title = "Default Username",
    description = "SSH username for nodes",
    required = false,
    defaultValue = "rundeck"  // Sensible default
)
private String defaultUsername;

@PluginProperty(
    title = "Timeout",
    required = false,
    defaultValue = "30"  // 30 second default
)
private Integer timeout;
```

**Why:** Reduce configuration burden. Most users can accept defaults.

### 6. Use Descriptive Node Names

```java
// Bad - opaque identifier
node.setNodename(instance.getId());  // "i-abc123"

// Good - descriptive name
String nodename = instance.getTags().get("Name");
if (nodename == null || nodename.isEmpty()) {
    nodename = instance.getId();  // Fallback to ID
}
node.setNodename(nodename);  // "web-prod-01" or "i-abc123"
```

**Why:** Users target nodes by name. Descriptive names make job creation easier.

### 7. Add Useful Tags and Attributes

```java
// Tags for targeting
Set<String> tags = new HashSet<>();
tags.add(instance.getEnvironment());  // "prod", "staging"
tags.add(instance.getRole());         // "web", "database"
tags.add(instance.getRegion());       // "us-east-1"
node.setTags(tags);

// Custom attributes for filtering
Map<String, String> attributes = new HashMap<>();
attributes.put("environment", instance.getEnvironment());
attributes.put("application", instance.getApplication());
attributes.put("team", instance.getTeam());
attributes.put("cost-center", instance.getCostCenter());
node.setAttributes(attributes);
```

**Why:** Rich metadata enables powerful job targeting (`tags: web+prod`, filters by attribute).

### 8. Handle Partial Failures

```java
for (JsonNode serverNode : serversArray) {
    try {
        INodeEntry node = convertToNode(serverNode);
        nodeSet.putNode(node);
    } catch (Exception e) {
        // Log error but continue with other nodes
        System.err.println("Error converting node " + 
            serverNode.get("hostname") + ": " + e.getMessage());
    }
}
```

**Why:** One bad node shouldn't prevent loading others. Log errors and continue.

### 9. Secure Sensitive Data

```java
@PluginProperty(title = "API Token", required = false)
@RenderingOption(key = "displayType", value = "PASSWORD")  // Mask in UI
private String apiToken;

@PluginProperty(title = "DB Password", required = true)
@RenderingOption(key = "displayType", value = "PASSWORD")
private String dbPassword;

// Or reference Key Storage
@PluginProperty(
    title = "API Token Path",
    description = "Key Storage path (e.g., keys/project/myapp/api-token)"
)
private String apiTokenPath;
```

**Why:** Credentials are visible in UI and logs. Use PASSWORD rendering or Key Storage.

### 10. Log Activity Appropriately

```java
@Override
public INodeSet getNodes() throws ResourceModelSourceException {
    System.out.println("Fetching nodes from: " + apiUrl);
    
    INodeSet nodes = fetchNodes();
    
    System.out.println("Loaded " + nodes.getNodeNames().size() + " nodes");
    
    // Debug logging (visible with -Drundeck.debug=true)
    if (Boolean.getBoolean("rundeck.debug")) {
        System.out.println("Node names: " + nodes.getNodeNames());
    }
    
    return nodes;
}
```

**Why:** Logs appear in Rundeck service log. Helps troubleshoot but avoid verbose output.

## Troubleshooting

### No Nodes Appearing

**Problem:** Node source configured but no nodes appear in project.

**Check:**
1. **Configuration:** Verify all required properties are set correctly
2. **Rundeck Service Log:** Check `/var/log/rundeck/service.log` for errors:
   ```bash
   tail -f /var/log/rundeck/service.log | grep -i "resourcemodelsource\|node"
   ```
3. **Permissions:** Verify API credentials, database access
4. **Network:** Can Rundeck reach the external system?
5. **Manual Test:** For scripts, run manually with same environment:
   ```bash
   cd /var/lib/rundeck/libext/
   RD_CONFIG_API_URL="https://api.example.com" bash myscript.sh
   ```

**Debug:**
```java
@Override
public INodeSet getNodes() throws ResourceModelSourceException {
    System.out.println("DEBUG: Querying " + apiUrl);
    try {
        INodeSet nodes = fetchNodes();
        System.out.println("DEBUG: Found " + nodes.getNodeNames().size() + " nodes");
        return nodes;
    } catch (Exception e) {
        System.err.println("ERROR: " + e.getMessage());
        e.printStackTrace();
        throw new ResourceModelSourceException(e);
    }
}
```

### Nodes Not Refreshing

**Problem:** Nodes loaded once but not updating.

**Causes:**
- Plugin throwing exceptions (check logs)
- External system unavailable (node source returns empty set)
- Caching too aggressive

**Fix:**
- Check Rundeck service log for errors
- Verify external system is accessible
- Adjust cache TTL if using caching
- Click "Refresh" button in UI to force update

### Connection Timeouts

**Problem:** "Connection timeout" errors in logs.

**Causes:**
- External system is slow or unresponsive
- Network connectivity issues
- Firewall blocking access
- Timeout values too low

**Fix:**
```java
// Increase timeouts
HttpClient httpClient = HttpClient.newBuilder()
    .connectTimeout(Duration.ofSeconds(30))  // Increased
    .build();

HttpRequest request = HttpRequest.newBuilder()
    .timeout(Duration.ofSeconds(60))  // Increased
    .build();
```

### Authentication Failures

**Problem:** 401/403 errors when querying API.

**Check:**
- Credentials are correct
- API token hasn't expired
- Permissions are sufficient
- Token is passed correctly:
  ```java
  requestBuilder.header("Authorization", "Bearer " + apiToken);
  // vs
  requestBuilder.header("X-API-Key", apiToken);  // Different header?
  ```

### Performance Issues

**Problem:** Node refresh takes too long, slowing down Rundeck.

**Causes:**
- Large number of nodes (10,000+)
- Slow external API
- No caching
- Complex transformations

**Optimize:**
```java
// 1. Add caching
private INodeSet cachedNodes;
private long cacheTime = 0;

@Override
public INodeSet getNodes() {
    if (System.currentTimeMillis() - cacheTime < 60000) {
        return cachedNodes;
    }
    cachedNodes = fetchNodes();
    cacheTime = System.currentTimeMillis();
    return cachedNodes;
}

// 2. Use pagination/filtering
String apiUrl = baseUrl + "?limit=1000&environment=prod";

// 3. Fetch only needed fields
String query = "SELECT nodename, hostname, username FROM servers";
```

## Related Documentation

- [Java Plugin Development](/developer/java-plugin-development.md) - General Java plugin guide
- [Script Plugin Development](/developer/script-plugin-development.md) - Script plugin basics
- [Resource Format Plugins](/developer/resource-model-format-plugins.md) - Parsing node data formats
- [Node Management User Guide](/manual/05-nodes.md) - How to use nodes in Rundeck
- [AWS Plugins](/manual/plugins/aws-plugins-overview.md) - Example AWS integration
- [Kubernetes Plugins](/manual/plugins/kubernetes-plugins-overview.md) - Example K8s integration

## Example Implementations

### Community Plugins

Popular open-source node source plugins:

- **AWS EC2** - <https://github.com/rundeck-plugins/rundeck-ec2-nodes-plugin>
- **Azure** - <https://github.com/rundeck-plugins/rundeck-azure-plugin>
- **Google Cloud** - <https://github.com/rundeck-plugins/gcp-plugin>
- **Kubernetes** - <https://github.com/rundeck-plugins/kubernetes>
- **ServiceNow** - <https://github.com/rundeck-plugins/servicenow-plugin>
- **Docker** - <https://github.com/rundeck-plugins/docker>

Check the [Rundeck Plugin Registry](https://github.com/rundeck-plugins/) for more.

## Quick Reference

### Required Node Attributes

| Attribute | Required | Description | Example |
|-----------|----------|-------------|---------|
| `nodename` | Yes | Unique identifier | `web-prod-01` |
| `hostname` | Yes | Target hostname/IP | `web01.example.com` |
| `username` | Recommended | SSH/WinRM username | `ubuntu` |
| `osFamily` | Recommended | Operating system | `Linux`, `Windows` |
| `tags` | Optional | Tags for targeting | `["web", "prod"]` |
| `description` | Optional | Human description | `"Production web server"` |

### Common Custom Attributes

| Attribute | Purpose | Example |
|-----------|---------|---------|
| `environment` | Environment tier | `prod`, `staging`, `dev` |
| `application` | Application name | `ecommerce-frontend` |
| `team` | Owning team | `platform`, `backend` |
| `region` | Geographic region | `us-east-1`, `eu-west-1` |
| `cost-center` | Billing/accounting | `engineering`, `ops` |
| `instance-id` | Cloud provider ID | `i-abc123` |
| `ip-address` | IP address | `10.0.1.50` |

### Resource Formats

| Format | File Extension | Use Case |
|--------|----------------|----------|
| `resourceyaml` | `.yaml` | Most common, human-readable |
| `resourcejson` | `.json` | JSON APIs, JavaScript |
| `resourcexml` | `.xml` | Legacy systems, XML APIs |

### Refresh Interval

Default: **30 seconds**

Configure in `project.properties`:
```properties
resources.source.1.config.interval=60  # Seconds
```

Or via UI: Project Settings → Edit Nodes → Sources → (Edit Source) → "Update Interval"
