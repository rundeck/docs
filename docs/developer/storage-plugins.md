# Storage Plugin

## Overview

Storage plugins provide the backend storage mechanism for Rundeck's [Key Storage](/manual/key-storage/index.md) facility. They determine **where and how** sensitive data like passwords, SSH keys, and API tokens are physically stored.

When you upload keys or passwords to Rundeck's Key Storage, a Storage plugin handles the actual persistence of that data. This allows you to integrate Rundeck with enterprise secret management systems, cloud key vaults, or custom storage solutions.

## What Storage Plugins Do

Storage plugins handle:

- **Storing secrets** - Persist passwords, keys, and tokens
- **Retrieving secrets** - Fetch stored data when needed
- **Managing metadata** - Store and retrieve resource metadata (creation date, owner, etc.)
- **Path-based organization** - Support hierarchical storage paths (e.g., `keys/prod/api-key`)
- **CRUD operations** - Create, read, update, and delete stored resources
- **Backend integration** - Connect to external storage systems

## Storage Architecture

The Storage facility organizes data in a **path-oriented tree structure**:

```
keys/
├── production/
│   ├── database-password
│   └── api-token
├── staging/
│   └── ssh-key
└── shared/
    └── service-account
```

Each **Resource** consists of:
- **Path** - Hierarchical location (e.g., `keys/production/api-token`)
- **Content** - Binary data stream (the actual secret)
- **Metadata** - Key-value pairs (content type, creation date, etc.)

## When to Create a Storage Plugin

Create a Storage plugin when you need to:

- **Integrate with enterprise secret management** - HashiCorp Vault, CyberArk, AWS Secrets Manager, Azure Key Vault
- **Meet compliance requirements** - Store secrets in approved, audited systems
- **Centralize secret management** - Use existing organizational secret stores
- **Add encryption at rest** - Implement custom encryption schemes
- **Use cloud-native storage** - Store secrets in cloud provider key management services
- **Implement custom access controls** - Add additional authorization layers

::: tip Real-World Example
See the [Vault Storage Plugin](https://github.com/rundeck-plugins/vault-storage) on GitHub for a complete, production-ready example of integrating Rundeck with HashiCorp Vault. This open-source plugin demonstrates best practices for Storage plugin development.
:::

## Built-in Storage Providers

Rundeck includes two built-in storage providers:

**`db` (Database)**
- Stores secrets in Rundeck's database
- Good for: Small deployments, simple setups
- Limitations: Secrets stored with Rundeck data

**`file` (Filesystem)**
- Stores secrets as files on the Rundeck server
- Good for: File-based backups, simple deployments
- Limitations: Limited to single server (not cluster-friendly)

**For production environments**, consider using a dedicated secret management system via a Storage plugin.

## Storage Plugin vs. Storage Converter Plugin

**Storage Plugin** - WHERE secrets are stored (backend)
- Examples: Vault, database, filesystem, cloud key vaults
- Handles: Persistence, retrieval, CRUD operations

**[Storage Converter Plugin](/developer/storage-converter-plugins.md)** - HOW secrets are encrypted/transformed
- Examples: Encryption, encoding, compression
- Handles: Transformation of data before storage

::: tip Use Together
Storage and Storage Converter plugins work together:
1. Converter encrypts the secret
2. Storage plugin persists the encrypted data
3. On retrieval, Storage plugin fetches data
4. Converter decrypts the secret
:::

## Path-Based Configuration

Storage plugins can be configured to handle:

- **All storage** - Plugin handles everything in Key Storage
- **Specific paths** - Plugin handles only certain paths (e.g., `keys/production/*`)

This allows you to use different storage backends for different types of secrets:
- Production secrets → Vault
- Development secrets → Database
- Shared keys → Filesystem

See [Configuring Storage Plugins](/manual/key-storage/index.md#configuring-the-storage-plugins) for configuration details.

## Java Plugin Implementation

::: tip Only Java Supported
Storage plugins can **only** be implemented in Java. Script and Groovy plugins are not supported for this service type.
:::

### Dependencies

Add these dependencies to your build:

**Gradle:**
```groovy
dependencies {
    implementation 'org.rundeck:rundeck-core:{{$rundeckVersionFull}}'
    implementation 'org.rundeck:rundeck-storage-api:{{$rundeckVersionFull}}'
}
```

**Maven:**
```xml
<dependencies>
    <dependency>
        <groupId>org.rundeck</groupId>
        <artifactId>rundeck-core</artifactId>
        <version>{{$rundeckVersionFull}}</version>
    </dependency>
    <dependency>
        <groupId>org.rundeck</groupId>
        <artifactId>rundeck-storage-api</artifactId>
        <version>{{$rundeckVersionFull}}</version>
    </dependency>
</dependencies>
```

See: [org.rundeck:rundeck-storage-api](https://search.maven.org/artifact/org.rundeck/rundeck-storage-api/{{$rundeckVersionFull}}/jar)

### Interface

Storage plugins implement the [StoragePlugin]({{$javaDocBase}}/com/dtolabs/rundeck/plugins/storage/StoragePlugin.html) interface, which extends [Tree]({{$javaDocBase}}/org/rundeck/storage/api/Tree.html) to store resources of type [ResourceMeta]({{$javaDocBase}}/com/dtolabs/rundeck/core/storage/ResourceMeta.html).

**Service Name:** `Storage` ([ServiceNameConstants.Storage]({{$javaDocBase}}/com/dtolabs/rundeck/plugins/ServiceNameConstants.html#Storage))

### Key Methods

The `Tree` interface requires implementing these core operations:

```java
// Check if resource exists at path
boolean hasPath(Path path);

// Check if directory exists at path
boolean hasDirectory(Path path);

// Check if resource (file) exists at path
boolean hasResource(Path path);

// Get resource at path
Resource<ResourceMeta> getPath(Path path);

// Get resource content
Resource<ResourceMeta> getResource(Path path);

// List resources in directory
Set<Resource<ResourceMeta>> listDirectoryResources(Path path);

// List subdirectories
Set<Resource<ResourceMeta>> listDirectory(Path path);

// List all subdirectories recursively
Set<Resource<ResourceMeta>> listDirectorySubdirs(Path path);

// Create resource
Resource<ResourceMeta> createResource(Path path, ResourceMeta content);

// Update resource
Resource<ResourceMeta> updateResource(Path path, ResourceMeta content);

// Delete resource
boolean deleteResource(Path path);
```

### Basic Example

```java
package com.example.rundeck.storage;

import com.dtolabs.rundeck.core.plugins.Plugin;
import com.dtolabs.rundeck.plugins.ServiceNameConstants;
import com.dtolabs.rundeck.plugins.descriptions.*;
import com.dtolabs.rundeck.plugins.storage.StoragePlugin;
import com.dtolabs.rundeck.core.storage.ResourceMeta;
import org.rundeck.storage.api.Path;
import org.rundeck.storage.api.Resource;

import java.io.*;
import java.util.*;

@Plugin(service = ServiceNameConstants.Storage, name = "custom-storage")
@PluginDescription(title = "Custom Storage", 
                  description = "Custom storage backend")
public class CustomStoragePlugin implements StoragePlugin {
    
    @PluginProperty(title = "Storage Root", 
                   description = "Root directory for storage",
                   required = true)
    private String storageRoot;
    
    @Override
    public boolean hasPath(Path path) {
        File file = getFile(path);
        return file.exists();
    }
    
    @Override
    public boolean hasResource(Path path) {
        File file = getFile(path);
        return file.exists() && file.isFile();
    }
    
    @Override
    public boolean hasDirectory(Path path) {
        File file = getFile(path);
        return file.exists() && file.isDirectory();
    }
    
    @Override
    public Resource<ResourceMeta> getPath(Path path) {
        if (hasResource(path)) {
            return getResource(path);
        } else if (hasDirectory(path)) {
            return getDirectory(path);
        }
        throw new IllegalArgumentException("Path does not exist: " + path);
    }
    
    @Override
    public Resource<ResourceMeta> getResource(Path path) {
        File file = getFile(path);
        if (!file.exists() || !file.isFile()) {
            throw new IllegalArgumentException("Resource not found: " + path);
        }
        
        // Read file content
        byte[] content = readFile(file);
        
        // Create metadata
        Map<String, String> meta = new HashMap<>();
        meta.put("content-type", "application/octet-stream");
        meta.put("content-length", String.valueOf(content.length));
        meta.put("modified-date", String.valueOf(file.lastModified()));
        
        return createResource(path, content, meta);
    }
    
    @Override
    public Resource<ResourceMeta> createResource(Path path, ResourceMeta content) {
        File file = getFile(path);
        
        // Create parent directories
        file.getParentFile().mkdirs();
        
        // Write content
        writeFile(file, content.getInputStream());
        
        return getResource(path);
    }
    
    @Override
    public Resource<ResourceMeta> updateResource(Path path, ResourceMeta content) {
        if (!hasResource(path)) {
            throw new IllegalArgumentException("Resource not found: " + path);
        }
        return createResource(path, content);
    }
    
    @Override
    public boolean deleteResource(Path path) {
        File file = getFile(path);
        return file.delete();
    }
    
    @Override
    public Set<Resource<ResourceMeta>> listDirectory(Path path) {
        File dir = getFile(path);
        if (!dir.isDirectory()) {
            throw new IllegalArgumentException("Not a directory: " + path);
        }
        
        Set<Resource<ResourceMeta>> resources = new HashSet<>();
        File[] files = dir.listFiles();
        
        if (files != null) {
            for (File file : files) {
                Path childPath = path.appendPath(file.getName());
                if (file.isFile()) {
                    resources.add(getResource(childPath));
                } else {
                    resources.add(getDirectory(childPath));
                }
            }
        }
        
        return resources;
    }
    
    @Override
    public Set<Resource<ResourceMeta>> listDirectoryResources(Path path) {
        return listDirectory(path).stream()
            .filter(r -> !r.isDirectory())
            .collect(Collectors.toSet());
    }
    
    @Override
    public Set<Resource<ResourceMeta>> listDirectorySubdirs(Path path) {
        return listDirectory(path).stream()
            .filter(Resource::isDirectory)
            .collect(Collectors.toSet());
    }
    
    // Helper methods
    private File getFile(Path path) {
        return new File(storageRoot, path.getPath());
    }
    
    private byte[] readFile(File file) {
        try (FileInputStream fis = new FileInputStream(file)) {
            return fis.readAllBytes();
        } catch (IOException e) {
            throw new RuntimeException("Failed to read file: " + e.getMessage(), e);
        }
    }
    
    private void writeFile(File file, InputStream content) {
        try (FileOutputStream fos = new FileOutputStream(file)) {
            content.transferTo(fos);
        } catch (IOException e) {
            throw new RuntimeException("Failed to write file: " + e.getMessage(), e);
        }
    }
    
    private Resource<ResourceMeta> getDirectory(Path path) {
        // Implementation for directory resource
        // Returns metadata about the directory
        return null; // Simplified for example
    }
    
    private Resource<ResourceMeta> createResource(Path path, byte[] content, 
                                                  Map<String, String> meta) {
        // Implementation to create Resource object
        // Wraps content and metadata
        return null; // Simplified for example
    }
}
```

### API Documentation

For complete API documentation, refer to:

- [Rundeck Storage API Javadocs]({{$javaDocStorageApiBase}})
- [StoragePlugin Interface]({{$javaDocBase}}/com/dtolabs/rundeck/plugins/storage/StoragePlugin.html)
- [Tree Interface]({{$javaDocBase}}/org/rundeck/storage/api/Tree.html)
- [ResourceMeta]({{$javaDocBase}}/com/dtolabs/rundeck/core/storage/ResourceMeta.html)

## Best Practices

### Error Handling

Always provide clear error messages:

```java
if (!hasResource(path)) {
    throw new IllegalArgumentException(
        "Resource not found at path: " + path.getPath()
    );
}
```

### Resource Cleanup

Ensure streams are properly closed:

```java
try (InputStream is = content.getInputStream();
     OutputStream os = new FileOutputStream(file)) {
    is.transferTo(os);
} catch (IOException e) {
    throw new RuntimeException("Failed to write resource", e);
}
```

### Thread Safety

Storage plugins may be accessed concurrently:

```java
private final Object lock = new Object();

public Resource<ResourceMeta> createResource(Path path, ResourceMeta content) {
    synchronized (lock) {
        // Ensure thread-safe operations
    }
}
```

### Metadata Management

Store useful metadata with resources:

```java
Map<String, String> meta = new HashMap<>();
meta.put("content-type", detectContentType(path));
meta.put("content-length", String.valueOf(size));
meta.put("created-date", String.valueOf(System.currentTimeMillis()));
meta.put("created-by", username);
```

## Configuration

See [Configuring Storage Plugins](/manual/key-storage/index.md#configuring-the-storage-plugins) for:
- How to configure storage plugins in Rundeck
- Path-based storage configuration
- Using multiple storage backends
- Storage converter integration

## Example Implementations

### Open Source Reference

**[Vault Storage Plugin](https://github.com/rundeck-plugins/vault-storage)** - Production-ready HashiCorp Vault integration
- Complete working implementation
- Demonstrates best practices
- Shows path-based configuration
- Includes error handling and testing
- Good starting point for your own storage plugin

## Related Documentation

- [Key Storage (User Guide)](/manual/key-storage/index.md) - Using Key Storage
- [Storage Converter Plugins](/developer/storage-converter-plugins.md) - Encryption/transformation layer
- [Java Plugin Development](/developer/java-plugin-development.md) - General Java plugin development
- [Key Storage API](/api/index.md#key-storage) - REST API for Key Storage
- [Vault Storage Plugin](https://github.com/rundeck-plugins/vault-storage) - Open source example implementation
