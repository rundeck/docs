# User Group Source Plugins

## Overview

User Group Source plugins dynamically assign roles/groups to users at login time based on external data sources. Instead of manually managing user roles in Rundeck, you can pull role assignments from LDAP, Active Directory, databases, APIs, or any custom source.

**Common Use Cases:**
- **LDAP/AD Integration** - Pull groups from corporate directory
- **Database-Driven Roles** - Load roles from user management database
- **API-Based Authorization** - Query external authorization service
- **Dynamic Role Assignment** - Assign roles based on user attributes
- **SSO Integration** - Supplement SSO groups with additional roles
- **Multi-Source** - Combine roles from multiple systems

**Real-World Examples:**
- Users in "DevOps" AD group get "admin" role in Rundeck
- Developers get project-specific roles based on team membership table
- Contractors get limited roles that auto-expire
- Users from specific departments get environment-specific access
- On-call engineers get elevated roles during their shift

**Benefits:**
- **Centralized Management** - Roles managed in one place
- **Automatic Updates** - Role changes reflected immediately at next login
- **Reduced Admin Overhead** - No manual role assignment in Rundeck
- **Consistency** - Same role logic across all tools
- **Auditable** - Clear source of truth for user permissions

## Configuring

To configure your plugin you can add configuration values to the framework scope.

_Framework scope property definition in `framework.properties`_

    framework.plugin.UserGroupSource.[your_plugin_name].[property]=value

Please note you cannot configure this plugin at a project level because it executes
before any project information is applicable.

## How It Works

1. **User Logs In** - User authenticates via configured authentication method (LDAP, SSO, etc.)
2. **Plugin Called** - Your plugin's `getGroups()` method is called with the username
3. **Roles Returned** - Plugin returns list of role names for the user
4. **Roles Applied** - Rundeck adds these roles to the user's session
5. **Authorization** - ACL policies use these roles for access control

::: warning Per-Login Execution
The plugin is called on **every login**. Keep processing lightweight - avoid slow API calls or heavy database queries.
:::

## Java Plugin Implementation

### Plugin Interface

Implement [UserGroupSourcePlugin]({{$javaDocBase}}/com/dtolabs/rundeck/plugins/user/groups/UserGroupSourcePlugin.html):

```java
public interface UserGroupSourcePlugin {
    List<String> getGroups(String username, Map<String, Object> config);
}
```

### Basic Example

```java
import com.dtolabs.rundeck.core.plugins.Plugin;
import com.dtolabs.rundeck.plugins.ServiceNameConstants;
import com.dtolabs.rundeck.plugins.user.groups.UserGroupSourcePlugin;
import com.dtolabs.rundeck.plugins.descriptions.*;

import java.util.*;

@Plugin(name = "my-group-source", service = ServiceNameConstants.UserGroupSource)
@PluginDescription(
    title = "My Group Source",
    description = "Loads user groups from custom source"
)
public class MyGroupSourcePlugin implements UserGroupSourcePlugin {
    
    @PluginProperty(
        title = "Default Role",
        description = "Role granted to all users",
        required = false,
        defaultValue = "user"
    )
    private String defaultRole;
    
    @Override
    public List<String> getGroups(String username, Map<String, Object> config) {
        List<String> groups = new ArrayList<>();
        
        // Add default role for all users
        if (defaultRole != null && !defaultRole.isEmpty()) {
            groups.add(defaultRole);
        }
        
        // Add user-specific roles based on logic
        if (username.endsWith("@admin.com")) {
            groups.add("admin");
        }
        
        return groups;
    }
}
```

### Complete Example: Database Group Source

```java
package com.example.rundeck.auth;

import com.dtolabs.rundeck.core.plugins.Plugin;
import com.dtolabs.rundeck.plugins.ServiceNameConstants;
import com.dtolabs.rundeck.plugins.user.groups.UserGroupSourcePlugin;
import com.dtolabs.rundeck.plugins.descriptions.*;

import java.sql.*;
import java.util.*;

@Plugin(name = "db-group-source", service = ServiceNameConstants.UserGroupSource)
@PluginDescription(
    title = "Database Group Source",
    description = "Loads user groups from database"
)
public class DatabaseGroupSourcePlugin implements UserGroupSourcePlugin {
    
    @PluginProperty(title = "JDBC URL", required = true)
    private String jdbcUrl;
    
    @PluginProperty(title = "Username", required = true)
    private String dbUsername;
    
    @PluginProperty(title = "Password", required = true)
    @RenderingOption(key = "displayType", value = "PASSWORD")
    private String dbPassword;
    
    @PluginProperty(
        title = "Query",
        description = "SQL query with :username parameter",
        required = true,
        defaultValue = "SELECT role FROM user_roles WHERE username = :username"
    )
    private String query;
    
    @Override
    public List<String> getGroups(String username, Map<String, Object> config) {
        List<String> groups = new ArrayList<>();
        
        try (Connection conn = DriverManager.getConnection(jdbcUrl, dbUsername, dbPassword)) {
            String sql = query.replace(":username", "?");
            
            try (PreparedStatement stmt = conn.prepareStatement(sql)) {
                stmt.setString(1, username);
                
                try (ResultSet rs = stmt.executeQuery()) {
                    while (rs.next()) {
                        String role = rs.getString(1);
                        if (role != null && !role.trim().isEmpty()) {
                            groups.add(role.trim());
                        }
                    }
                }
            }
        } catch (SQLException e) {
            // Log error but don't fail login
            System.err.println("Error loading groups for " + username + ": " + e.getMessage());
        }
        
        return groups;
    }
}
```

### Complete Example: API Group Source

```java
package com.example.rundeck.auth;

import com.dtolabs.rundeck.core.plugins.Plugin;
import com.dtolabs.rundeck.plugins.ServiceNameConstants;
import com.dtolabs.rundeck.plugins.user.groups.UserGroupSourcePlugin;
import com.dtolabs.rundeck.plugins.descriptions.*;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.net.http.*;
import java.net.URI;
import java.util.*;

@Plugin(name = "api-group-source", service = ServiceNameConstants.UserGroupSource)
@PluginDescription(
    title = "API Group Source",
    description = "Loads user groups from REST API"
)
public class ApiGroupSourcePlugin implements UserGroupSourcePlugin {
    
    @PluginProperty(title = "API URL", required = true,
        description = "URL with ${username} placeholder")
    private String apiUrl;
    
    @PluginProperty(title = "API Token", required = false)
    @RenderingOption(key = "displayType", value = "PASSWORD")
    private String apiToken;
    
    @PluginProperty(title = "Timeout (seconds)", defaultValue = "5")
    private Integer timeout;
    
    private HttpClient httpClient;
    private ObjectMapper objectMapper = new ObjectMapper();
    
    @Override
    public List<String> getGroups(String username, Map<String, Object> config) {
        List<String> groups = new ArrayList<>();
        
        try {
            // Replace username placeholder
            String url = apiUrl.replace("${username}", username);
            
            // Build request
            HttpRequest.Builder requestBuilder = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .timeout(java.time.Duration.ofSeconds(timeout != null ? timeout : 5))
                .GET();
            
            if (apiToken != null && !apiToken.isEmpty()) {
                requestBuilder.header("Authorization", "Bearer " + apiToken);
            }
            
            // Send request
            if (httpClient == null) {
                httpClient = HttpClient.newHttpClient();
            }
            
            HttpResponse<String> response = httpClient.send(
                requestBuilder.build(),
                HttpResponse.BodyHandlers.ofString()
            );
            
            if (response.statusCode() == 200) {
                // Parse JSON response
                JsonNode json = objectMapper.readTree(response.body());
                JsonNode groupsNode = json.get("groups");
                
                if (groupsNode != null && groupsNode.isArray()) {
                    groupsNode.forEach(node -> groups.add(node.asText()));
                }
            }
            
        } catch (Exception e) {
            System.err.println("Error loading groups for " + username + ": " + e.getMessage());
        }
        
        return groups;
    }
}
```

## Script Plugin Implementation

Script plugins output roles between special markers.

### Basic Structure

```bash
#!/usr/bin/env bash

# Username provided as environment variable
USERNAME="$RD_USER"

echo "==START_GROUPS=="
# Output one role per line
echo "user"
echo "developer"
echo "==END_GROUPS=="
```

### Complete Example: LDAP Query Script

```bash
#!/usr/bin/env bash

USERNAME="$RD_USER"
LDAP_SERVER="${RD_CONFIG_LDAP_SERVER:-ldap://localhost}"
LDAP_BASE="${RD_CONFIG_LDAP_BASE:-dc=example,dc=com}"

# Query LDAP for user groups
GROUPS=$(ldapsearch -x -h "$LDAP_SERVER" -b "$LDAP_BASE" \
    -LLL "(uid=$USERNAME)" memberOf | \
    grep "^memberOf:" | \
    sed 's/^memberOf: cn=\([^,]*\),.*/\1/')

echo "==START_GROUPS=="
echo "$GROUPS"
echo "==END_GROUPS=="
```

### plugin.yaml Example

```yaml
name: LDAP Group Source
version: 1.0
rundeckPluginVersion: 1.2
author: Your Name
providers:
  - name: ldap-groups
    service: UserGroupSource
    plugin-type: script
    script-interpreter: /bin/bash
    script-file: ldap-groups.sh
    config:
      - name: ldap_server
        title: LDAP Server
        type: String
        required: true
        defaultValue: "ldap://localhost"
      - name: ldap_base
        title: LDAP Base DN
        type: String
        required: true
        defaultValue: "dc=example,dc=com"
```

## Best Practices

### 1. Performance Matters

**Problem:** Plugin called on every login  
**Solution:** Keep processing fast

```java
// Bad - slow on every login
List<String> groups = querySlowExternalAPI(username);  // 2-3 seconds

// Good - cache where possible
private Cache<String, List<String>> cache = CacheBuilder.newBuilder()
    .expireAfterWrite(5, TimeUnit.MINUTES)
    .build();

List<String> groups = cache.get(username, () -> queryExternalAPI(username));
```

### 2. Handle Errors Gracefully

```java
@Override
public List<String> getGroups(String username, Map<String, Object> config) {
    try {
        return loadGroupsFromSource(username);
    } catch (Exception e) {
        // Log error but don't fail login
        System.err.println("Error loading groups: " + e.getMessage());
        // Return default/fallback groups
        return Collections.singletonList("user");
    }
}
```

### 3. Validate and Sanitize

```java
@Override
public List<String> getGroups(String username, Map<String, Object> config) {
    List<String> groups = new ArrayList<>();
    
    // Validate username to prevent injection
    if (!username.matches("^[a-zA-Z0-9._@-]+$")) {
        return Collections.emptyList();
    }
    
    // Load groups
    List<String> rawGroups = loadGroups(username);
    
    // Sanitize group names
    for (String group : rawGroups) {
        if (group != null && !group.trim().isEmpty()) {
            groups.add(group.trim().toLowerCase());
        }
    }
    
    return groups;
}
```

### 4. Implement Timeouts

```java
// Set connection and read timeouts
HttpClient client = HttpClient.newBuilder()
    .connectTimeout(Duration.ofSeconds(5))
    .build();

HttpRequest request = HttpRequest.newBuilder()
    .uri(uri)
    .timeout(Duration.ofSeconds(10))
    .build();
```

### 5. Log Appropriately

```java
@Override
public List<String> getGroups(String username, Map<String, Object> config) {
    List<String> groups = loadGroups(username);
    
    // Log at INFO level (visible in logs)
    System.out.println("Loaded " + groups.size() + " groups for user: " + username);
    
    // Log groups at DEBUG level (verbose)
    if (Boolean.getBoolean("rundeck.auth.debug")) {
        System.out.println("Groups for " + username + ": " + groups);
    }
    
    return groups;
}
```

## Related Documentation

- [Java Plugin Development](/developer/java-plugin-development.md) - General plugin development
- [Script Plugin Development](/developer/script-plugin-development.md) - Script plugin guide
- [Access Control Policy](/manual/document-format-reference/aclpolicy-v10.md) - ACL configuration
- [User Management](/administration/security/authentication.md) - Authentication setup
