# File Upload Plugins

## Overview

File Upload plugins handle storage and retrieval of files uploaded via Job Options. When users upload files as job input (configuration files, data files, certificates, etc.), these plugins store them and make them available during job execution.

**What They Handle:**

1. **Upload** - Receive file from user/API
2. **Storage** - Store file until needed
3. **Retrieval** - Provide file during job execution
4. **Lifecycle** - Manage retention and cleanup

**Common Use Cases:**

**Configuration Management:**
- Upload application config files per deployment
- Custom SSL certificates for installation
- Environment-specific property files

**Data Processing:**
- CSV files for batch processing
- Log files for analysis
- Data import files

**Deployment Artifacts:**
- WAR/JAR files for deployment
- Docker compose files
- Kubernetes manifests

**Certificates & Keys:**
- SSL/TLS certificates
- SSH public keys
- License files

**Real-World Examples:**
- Deploy job accepts WAR file, uploads to S3, deploys to Tomcat
- Database import job takes CSV file, stores in blob storage, imports to DB
- Certificate renewal uploads new cert, distributes to web servers
- Config update job uploads JSON config, deploys to all application nodes

**Benefits:**
- **Flexible Storage** - Store in S3, Azure Blob, database, custom backend
- **Large Files** - Handle multi-GB uploads efficiently
- **Cloud Native** - Ephemeral Rundeck servers, persistent file storage
- **Clustering** - Multiple Rundeck servers access same files
- **Audit Trail** - Track file uploads and usage

**Default Behavior:**

Rundeck includes a default file upload plugin that stores files on local disk (`var/tmp/uploads`). This works for single servers but not for:
- Cloud deployments (ephemeral disk)
- Clustering (files only on one server)
- Large files (disk space constraints)

**File Lifecycle:**

```
User uploads file
    ↓
Plugin stores file (with unique refid)
    ↓
File "retained" until execution starts or timeout
    ↓
Execution starts → Plugin retrieves file
    ↓
File available to job steps
    ↓
Execution completes
    ↓
Plugin transitions state (Used) → Retain or Delete
    ↓
Cleanup after retention period
```

Each uploaded file gets a unique **refid** (reference ID) that identifies it throughout its lifecycle.

## Behavior

A File Upload Plugin is configured globally. The default plugin implementation stores received files on the local disk only.

When a user uploads a file to a Job Option value, or the Job File Upload API is called, the plugin is initialized, and the `uploadFile` method is called. Rundeck creates an internal record for the file with the SHA hash of the contents, and generates the unique "refid" for the uploaded file.

The plugin is expected to "retain" the uploaded file until a state transition occurs. The file might be used in an execution, or it might simply be deleted, for example if the execution fails to start due to invalid input, or if a timeout occurs.

If the timeout occurs before an execution uses the file, the `transitionState` method will be called with an state of `Unused`.
The plugin has the option of deleting the stored file, and should return the new Internal state of the file, which can be `Deleted` or `Retained`.

When the execution that uses the file starts, first the internal record for the file is "attached" to the execution.
This means it cannot be used again for another execution, the removal timeout is cancelled, and it has an internal state of "retained".

Then the plugin's `retrieveLocalFile` method will be called. If the plugin has a local copy of the file,
it should be returned, otherwise `null` is expected. If the local file is not available, the `hasFile` method is called to determine if the
plugin is able to retrieve the file. Finally the `retrieveFile(String,OutputStream)` method is called to copy the contents to a local temp file,
and to verify the SHA checksum. The local file path, file name, and SHA are added to the Execution's context variables.

The execution then runs. After the Execution completes, the `transitionState` method will be called with an state of `Used`, allowing the plugin to retain or delete the file.

If an Execution, Job, or Project is deleted, all file records associated with the given entity are also deleted,
and the plugin `transitionState` method is called with a state of `Deleted`.

## Configuration

To enable the plugin, The plugin provider is specified in [rundeck-config.properties](/administration/configuration/config-file-reference.md#rundeck-config.properties):

    rundeck.fileupload.plugin.type=[provider]

"Instance" scoped plugin properties will be configured on each File Option in a Job, and the property values will be pased to the `uploadFile` method.

(Note: currently "Project" scoped properties are not supported.)

"Framework" scoped properties of the plugin you can add configuration values to the framework scope are set in [framework.properties](/administration/configuration/config-file-reference.md#framework-properties)

    framework.plugin.FileUpload.[provider].[property]=value

## Java Plugin Type

Plugins must implement the [FileUploadPlugin] interface, and declare as a provider of service `FileUpload`.

Methods:

- `void initialize();`: Initialize the plugin.
- `String uploadFile(final InputStream content,final long length,final String refid,Map<String, String> config)`: upload a file for a job option, specifies the refid, and instance configuration properties.
- `boolean hasFile(String ref)`: return true if the file with given refid can be retrieved
- `void retrieveFile(String ref, OutputStream out)`: retrieve the file content to the output stream
- `removeFile(String refid)`: (unused) may be called to remove the file
- `InternalState transitionState(String reference, ExternalState state)`: plugin should retain or delete the file

[fileuploadplugin]: {{$javaDocBase}}/com/dtolabs/rundeck/plugins/file/FileUploadPlugin.html

## Complete Java Example: S3 File Upload

```java
package com.example.rundeck.upload;

import com.dtolabs.rundeck.core.plugins.Plugin;
import com.dtolabs.rundeck.plugins.ServiceNameConstants;
import com.dtolabs.rundeck.plugins.descriptions.*;
import com.dtolabs.rundeck.plugins.file.*;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.*;

import java.io.*;
import java.util.Map;

@Plugin(name = "s3-upload", service = ServiceNameConstants.FileUpload)
@PluginDescription(title = "S3 File Upload", description = "Stores uploaded files in S3")
public class S3FileUploadPlugin implements FileUploadPlugin {
    
    @PluginProperty(title = "S3 Bucket", required = true)
    private String bucket;
    
    @PluginProperty(title = "Path Prefix", defaultValue = "rundeck-uploads/")
    private String pathPrefix;
    
    private S3Client s3Client;
    
    @Override
    public void initialize() {
        this.s3Client = S3Client.create();
    }
    
    @Override
    public String uploadFile(InputStream content, long length, String refid,
                           Map<String, String> config) throws IOException {
        String key = pathPrefix + refid;
        
        s3Client.putObject(
            PutObjectRequest.builder().bucket(bucket).key(key).build(),
            RequestBody.fromInputStream(content, length)
        );
        
        return refid;
    }
    
    @Override
    public boolean hasFile(String refid) {
        try {
            String key = pathPrefix + refid;
            s3Client.headObject(HeadObjectRequest.builder()
                .bucket(bucket).key(key).build());
            return true;
        } catch (NoSuchKeyException e) {
            return false;
        }
    }
    
    @Override
    public void retrieveFile(String refid, OutputStream out) throws IOException {
        String key = pathPrefix + refid;
        try (InputStream s3Stream = s3Client.getObject(
                GetObjectRequest.builder().bucket(bucket).key(key).build())) {
            s3Stream.transferTo(out);
        }
    }
    
    @Override
    public InternalState transitionState(String refid, ExternalState state) {
        if (state == ExternalState.Deleted || state == ExternalState.Used) {
            // Delete from S3
            String key = pathPrefix + refid;
            s3Client.deleteObject(DeleteObjectRequest.builder()
                .bucket(bucket).key(key).build());
            return InternalState.Deleted;
        }
        return InternalState.Retained;
    }
}
```

## Best Practices

### 1. Clean Up After Use

```java
@Override
public InternalState transitionState(String refid, ExternalState state) {
    if (state == ExternalState.Used) {
        deleteFile(refid);  // Clean up after execution
        return InternalState.Deleted;
    }
    return InternalState.Retained;
}
```

### 2. Handle Large Files

```java
// Stream, don't load into memory
public String uploadFile(InputStream content, long length, String refid,
                        Map<String, String> config) {
    // Use multipart upload for large files
    if (length > 100 * 1024 * 1024) {  // > 100MB
        return multipartUpload(content, length, refid);
    }
    return regularUpload(content, length, refid);
}
```

### 3. Verify Checksums

```java
String expectedSha = metadata.get("sha");
String actualSha = calculateSha(retrievedFile);
if (!expectedSha.equals(actualSha)) {
    throw new IOException("Checksum mismatch");
}
```

## Related Documentation

- [Key Storage](/manual/key-storage/index.md) - Secure storage for credentials
- [Job Options](/manual/jobs/job-options.md) - File option types
- [Java Plugin Development](/developer/java-plugin-development.md) - General guide
