# File Copier Plugins

## Overview

File Copier plugins transfer files and scripts from Rundeck to target nodes before execution. They work hand-in-hand with [Node Executor plugins](/developer/node-executor-plugins.md) to enable remote command execution - the copier sends the file, the executor runs it.

**Why File Copiers Matter:**

When you run a script step in Rundeck, here's what happens:
1. Rundeck has your script content (inline or from a file)
2. **File Copier** transfers the script to the target node
3. **Node Executor** executes the script on the node
4. Results stream back to Rundeck

Without a file copier, you can only run commands that already exist on the target node - no custom scripts, no dynamic content.

**Common Use Cases:**

**Standard Remote Execution:**
- **SSH/SCP** - Copy scripts to Linux servers via SCP, execute via SSH
- **WinRM** - Transfer scripts to Windows servers, execute via PowerShell
- **SFTP** - Alternative secure file transfer for scripts

**Cloud & Container Platforms:**
- **AWS SSM** - Transfer scripts to EC2 instances without SSH
- **Kubernetes** - Copy scripts into pods via kubectl cp
- **Docker** - Copy files into containers via docker cp
- **Azure** - Transfer to VMs via Azure extensions

**Specialized Transfer:**
- **S3 Storage** - Upload script to S3, node downloads and executes
- **HTTP/HTTPS** - Serve script via web server, node curls and runs
- **Shared Storage** - Copy to NFS/SMB mount, node reads from there
- **Custom Protocol** - FTP, TFTP, proprietary transfer methods

**Real-World Examples:**
- **DevOps Team**: SSH copier transfers deployment scripts to 500+ servers, SSH executor runs them
- **Windows Admin**: WinRM copier sends PowerShell scripts to domain controllers, WinRM executes
- **Container Team**: Kubernetes copier uploads maintenance scripts to pods, kubectl exec runs them
- **Network Ops**: Custom TFTP copier sends config files to network devices (no SSH)
- **Security Team**: AWS SSM copier transfers audit scripts to instances in private subnets

**Benefits:**
- **Dynamic Scripts** - Send custom scripts on-demand
- **Centralized Management** - Scripts stored in Rundeck, not on every node
- **Version Control** - Script changes don't require node updates
- **Security** - Scripts transmitted securely, not stored on disk
- **Flexibility** - Support any transfer protocol

**Relationship to Node Executors:**

```
Rundeck Job Step
     ↓
1. File Copier → Transfers script to node
     ↓
2. Node Executor → Executes script on node
     ↓
3. Results → Stream back to Rundeck
```

Node executors specify which file copier to use:
- **SSH** node executor → uses **SCP** file copier
- **WinRM** node executor → uses **WinRM** file copier  
- **Custom** executor → uses **custom** copier

You can mix and match (e.g., SFTP copier + SSH executor).

## When to Create a Custom File Copier

### Built-in Copiers Cover Most Needs

Rundeck includes file copiers for:
- **SCP** - Secure copy via SSH (most common for Linux)
- **WinRM** - Windows Remote Management file transfer
- **Stub** - Local execution (no actual copy needed)

Community plugins add:
- **SFTP** - Alternative SSH file transfer
- **AWS SSM** - Copy to EC2 instances
- **Kubernetes** - kubectl cp for pods

### Create Custom Copier When:

**✅ Unsupported Protocol**
- Custom proprietary transfer method
- FTP, TFTP for legacy systems
- HTTP/HTTPS uploads
- Cloud provider-specific APIs (Azure, GCP)

**✅ Special Requirements**
- Encryption/compression during transfer
- Copy to intermediate staging server
- Multi-hop transfers (bastion → target)
- Custom authentication mechanisms

**✅ Integration Needs**
- Transfer via message queue
- Copy to object storage first (S3, then node downloads)
- Use existing file distribution system
- Network device file copy (TFTP, proprietary)

**✅ Performance Optimization**
- Parallel transfers to multiple nodes
- Chunked uploads for large files
- Resume capability for interrupted transfers
- Caching/de-duplication

### Don't Create When:

**❌ SSH/SCP Works**

Most Linux/Unix use cases are handled by built-in SCP copier.

**❌ WinRM Works**

Windows servers work with built-in WinRM copier.

**❌ Community Plugin Exists**

Check <https://github.com/rundeck-plugins/> first.

## How File Copiers Work

### Three Copy Methods

The `FileCopier` interface has 3 methods - Rundeck calls the appropriate one based on what needs copying:

```java
public interface FileCopier {
    // Copy from stream (inline script content)
    String copyFileStream(ExecutionContext context, InputStream input,
                         INodeEntry node, String destination);
    
    // Copy from file (script file on Rundeck server)
    String copyFile(ExecutionContext context, File file,
                   INodeEntry node, String destination);
    
    // Copy script text (most common for inline scripts)
    String copyScriptContent(ExecutionContext context, String script,
                            INodeEntry node, String destination);
}
```

**When Each Is Called:**

1. **`copyScriptContent`** - Inline script in job step
   ```yaml
   - type: script
     script: |
       #!/bin/bash
       echo "Hello"
   ```

2. **`copyFile`** - Script file stored on Rundeck server
   ```yaml
   - type: script
     scriptfile: /var/rundeck/scripts/deploy.sh
   ```

3. **`copyFileStream`** - Script from URL or other source
   ```yaml
   - type: script
     scripturl: http://example.com/script.sh
   ```

### Return Value: Remote File Path

**Critical:** Must return the **remote file path** where the file was copied:

```java
// Copy script to node
String remotePath = "/tmp/rundeck-script-12345.sh";
// ... perform copy ...
return remotePath;  // Node executor uses this path
```

The node executor uses this path to execute the script:
```bash
ssh user@node '/tmp/rundeck-script-12345.sh'
```

### Destination Parameter

The `destination` parameter can be:
- **`null`** - Copy to temporary location (most common for scripts)
  - Plugin chooses temp path (e.g., `/tmp/rundeck-script-UUID.sh`)
- **Specific path** - Copy to requested location (file upload steps)
  - Must copy to exact path specified

```java
if (destination == null) {
    // Generate temp file path
    destination = "/tmp/rundeck-script-" + UUID.randomUUID() + ".sh";
} else {
    // Use provided destination
}
```

## Java Plugin Implementation

### Basic Interface

Implement [FileCopier]({{$javaDocBase}}/com/dtolabs/rundeck/core/execution/service/FileCopier.html):

```java
@Plugin(name = "my-copier", service = ServiceNameConstants.FileCopier)
@PluginDescription(title = "My File Copier", description = "Custom file copier")
public class MyFileCopier implements FileCopier {
    
    @Override
    public String copyFileStream(ExecutionContext context, InputStream input,
                                INodeEntry node, String destination)
            throws FileCopierException {
        // Copy from input stream
    }
    
    @Override
    public String copyFile(ExecutionContext context, File file,
                          INodeEntry node, String destination)
            throws FileCopierException {
        // Copy from file
    }
    
    @Override
    public String copyScriptContent(ExecutionContext context, String script,
                                   INodeEntry node, String destination)
            throws FileCopierException {
        // Copy script content (most common)
    }
}
```

### Complete Example: SFTP File Copier

Transfer files via SFTP:

```java
package com.example.rundeck.copier;

import com.dtolabs.rundeck.core.common.INodeEntry;
import com.dtolabs.rundeck.core.execution.ExecutionContext;
import com.dtolabs.rundeck.core.execution.service.FileCopier;
import com.dtolabs.rundeck.core.execution.service.FileCopierException;
import com.dtolabs.rundeck.core.plugins.Plugin;
import com.dtolabs.rundeck.plugins.ServiceNameConstants;
import com.dtolabs.rundeck.plugins.descriptions.*;
import com.jcraft.jsch.*;

import java.io.*;
import java.util.Properties;
import java.util.UUID;

@Plugin(name = "sftp-copier", service = ServiceNameConstants.FileCopier)
@PluginDescription(
    title = "SFTP File Copier",
    description = "Copies files via SFTP"
)
public class SftpFileCopier implements FileCopier {
    
    @PluginProperty(
        title = "Temp Directory",
        description = "Remote temp directory for scripts",
        required = false,
        defaultValue = "/tmp"
    )
    private String tempDirectory;
    
    @PluginProperty(
        title = "Connection Timeout",
        description = "Connection timeout in seconds",
        required = false,
        defaultValue = "30"
    )
    private Integer timeout;
    
    @Override
    public String copyFileStream(ExecutionContext context, InputStream input,
                                INodeEntry node, String destination)
            throws FileCopierException {
        
        // Generate temp file if destination not specified
        if (destination == null) {
            destination = tempDirectory + "/rundeck-script-" + 
                         UUID.randomUUID() + ".sh";
        }
        
        JSch jsch = new JSch();
        Session session = null;
        ChannelSftp sftpChannel = null;
        
        try {
            // Get connection details from node
            String hostname = node.getHostname();
            String username = node.getUsername();
            int port = node.getAttributes().containsKey("ssh-port")
                ? Integer.parseInt(node.getAttributes().get("ssh-port"))
                : 22;
            
            // Setup SSH key authentication
            String keyPath = node.getAttributes().get("ssh-key-storage-path");
            if (keyPath != null) {
                // Load private key from Key Storage
                String keyContent = context.getStorageTree()
                    .getResource(keyPath)
                    .getContents()
                    .getString();
                jsch.addIdentity("key", keyContent.getBytes(), null, null);
            }
            
            // Create session
            session = jsch.getSession(username, hostname, port);
            session.setTimeout(timeout * 1000);
            
            Properties config = new Properties();
            config.put("StrictHostKeyChecking", "no");  // Or implement host key checking
            session.setConfig(config);
            
            session.connect();
            
            // Open SFTP channel
            Channel channel = session.openChannel("sftp");
            channel.connect();
            sftpChannel = (ChannelSftp) channel;
            
            // Ensure remote directory exists
            String remoteDir = new File(destination).getParent();
            try {
                sftpChannel.mkdir(remoteDir);
            } catch (SftpException e) {
                // Directory might already exist
            }
            
            // Copy file
            sftpChannel.put(input, destination);
            
            // Make executable (for scripts)
            sftpChannel.chmod(0755, destination);
            
            return destination;
            
        } catch (JSchException | SftpException e) {
            throw new FileCopierException(
                "SFTP transfer failed: " + e.getMessage(), e);
        } finally {
            if (sftpChannel != null && sftpChannel.isConnected()) {
                sftpChannel.disconnect();
            }
            if (session != null && session.isConnected()) {
                session.disconnect();
            }
        }
    }
    
    @Override
    public String copyFile(ExecutionContext context, File file,
                          INodeEntry node, String destination)
            throws FileCopierException {
        try (FileInputStream fis = new FileInputStream(file)) {
            return copyFileStream(context, fis, node, destination);
        } catch (IOException e) {
            throw new FileCopierException("Error reading file: " + e.getMessage(), e);
        }
    }
    
    @Override
    public String copyScriptContent(ExecutionContext context, String script,
                                   INodeEntry node, String destination)
            throws FileCopierException {
        ByteArrayInputStream input = new ByteArrayInputStream(script.getBytes());
        return copyFileStream(context, input, node, destination);
    }
}
```

### Complete Example: HTTP Upload Copier

Upload file to HTTP endpoint, node downloads it:

```java
package com.example.rundeck.copier;

import com.dtolabs.rundeck.core.common.INodeEntry;
import com.dtolabs.rundeck.core.execution.ExecutionContext;
import com.dtolabs.rundeck.core.execution.service.FileCopier;
import com.dtolabs.rundeck.core.execution.service.FileCopierException;
import com.dtolabs.rundeck.core.plugins.Plugin;
import com.dtolabs.rundeck.plugins.ServiceNameConstants;
import com.dtolabs.rundeck.plugins.descriptions.*;

import java.io.*;
import java.net.URI;
import java.net.http.*;
import java.time.Duration;
import java.util.UUID;

@Plugin(name = "http-upload-copier", service = ServiceNameConstants.FileCopier)
@PluginDescription(
    title = "HTTP Upload Copier",
    description = "Uploads file to HTTP server, returns download URL for node"
)
public class HttpUploadCopier implements FileCopier {
    
    @PluginProperty(title = "Upload URL", description = "HTTP endpoint to upload files", required = true)
    private String uploadUrl;
    
    @PluginProperty(title = "Download URL Base", description = "Base URL for downloads", required = true)
    private String downloadUrlBase;
    
    @PluginProperty(title = "API Token", required = false)
    @RenderingOption(key = "displayType", value = "PASSWORD")
    private String apiToken;
    
    private HttpClient httpClient = HttpClient.newBuilder()
        .connectTimeout(Duration.ofSeconds(30))
        .build();
    
    @Override
    public String copyFileStream(ExecutionContext context, InputStream input,
                                INodeEntry node, String destination)
            throws FileCopierException {
        
        try {
            // Generate unique filename
            String filename = "script-" + UUID.randomUUID() + ".sh";
            
            // Read input stream
            byte[] fileContent = input.readAllBytes();
            
            // Build upload request
            HttpRequest.Builder requestBuilder = HttpRequest.newBuilder()
                .uri(URI.create(uploadUrl + "/" + filename))
                .timeout(Duration.ofSeconds(60))
                .POST(HttpRequest.BodyPublishers.ofByteArray(fileContent));
            
            if (apiToken != null && !apiToken.isEmpty()) {
                requestBuilder.header("Authorization", "Bearer " + apiToken);
            }
            
            HttpRequest request = requestBuilder.build();
            
            // Upload file
            HttpResponse<String> response = httpClient.send(
                request,
                HttpResponse.BodyHandlers.ofString()
            );
            
            if (response.statusCode() != 200 && response.statusCode() != 201) {
                throw new FileCopierException(
                    "Upload failed with status " + response.statusCode());
            }
            
            // Return download URL (this is what node uses)
            String downloadUrl = downloadUrlBase + "/" + filename;
            
            // Node executor would then:
            // ssh node "curl -o /tmp/script.sh $downloadUrl && chmod +x /tmp/script.sh && /tmp/script.sh"
            
            return downloadUrl;
            
        } catch (IOException | InterruptedException e) {
            throw new FileCopierException("HTTP upload failed: " + e.getMessage(), e);
        }
    }
    
    @Override
    public String copyFile(ExecutionContext context, File file,
                          INodeEntry node, String destination)
            throws FileCopierException {
        try (FileInputStream fis = new FileInputStream(file)) {
            return copyFileStream(context, fis, node, destination);
        } catch (IOException e) {
            throw new FileCopierException("Error reading file: " + e.getMessage(), e);
        }
    }
    
    @Override
    public String copyScriptContent(ExecutionContext context, String script,
                                   INodeEntry node, String destination)
            throws FileCopierException {
        ByteArrayInputStream input = new ByteArrayInputStream(script.getBytes());
        return copyFileStream(context, input, node, destination);
    }
}
```

### MultiFileCopier (Optional)

For efficiency when copying many files, implement [MultiFileCopier]({{$javaDocBase}}/com/dtolabs/rundeck/core/execution/service/MultiFileCopier.html):

```java
public interface MultiFileCopier extends FileCopier {
    String[] copyFiles(ExecutionContext context, File[] files,
                      INodeEntry node, String[] destinations)
        throws FileCopierException;
}
```

This allows batch transfers (one connection, multiple files) instead of separate transfers per file.

## Script Plugin Implementation

::: tip When to Use Scripts
Script plugins are **much faster** to develop than Java. Use them for:
- Wrapping existing CLI tools (rsync, curl, scp)
- Simple protocol implementations
- Quick prototypes
:::

See [Script Plugin Development](/developer/script-plugin-development.md) for script plugin basics.

### Available Context Variables

Your script receives these variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `${file-copy.file}` | Local path to file being copied | `/tmp/rundeck-file-123.sh` |
| `${file-copy.destination}` | Requested remote destination (may be empty) | `/opt/scripts/deploy.sh` |
| `${node.hostname}` | Target node hostname | `web01.example.com` |
| `${node.username}` | Target node username | `ubuntu` |
| `${node.*}` | All node attributes | Various |

### Script Requirements

**Exit Code:**
- `0` = Success
- Any other = Failure

**Output:**
- **First line of STDOUT** = Remote file path where file was copied
- All other STDOUT = Ignored
- All STDERR = Captured in job output

### Complete Example: rsync Copier

**plugin.yaml:**

```yaml
name: Rsync File Copier
version: 1.0
rundeckPluginVersion: 1.2
providers:
  - name: rsync-copier
    service: FileCopier
    plugin-type: script
    script-interpreter: /bin/bash
    script-file: rsync-copy.sh
    config:
      - name: remote_basedir
        title: Remote Base Directory
        description: Base directory on remote nodes
        type: String
        required: false
        default: /tmp
```

**rsync-copy.sh:**

```bash
#!/bin/bash
set -e

# Configuration
REMOTE_BASEDIR="${RD_CONFIG_REMOTE_BASEDIR:-/tmp}"

# File to copy (provided by Rundeck)
SOURCE_FILE="${RD_FILE_COPY_FILE}"

# Destination (may be empty)
DEST="${RD_FILE_COPY_DESTINATION}"

# Node details
NODE_HOST="${RD_NODE_HOSTNAME}"
NODE_USER="${RD_NODE_USERNAME}"
SSH_PORT="${RD_NODE_SSH_PORT:-22}"

# Generate destination if not provided
if [ -z "$DEST" ]; then
    FILENAME=$(basename "$SOURCE_FILE")
    DEST="$REMOTE_BASEDIR/rundeck-$(uuidgen)-${FILENAME}"
fi

# Perform rsync
rsync -az -e "ssh -p $SSH_PORT" \
    "$SOURCE_FILE" \
    "${NODE_USER}@${NODE_HOST}:${DEST}"

# Make executable if it's a script
if [[ "$SOURCE_FILE" == *.sh ]] || [[ "$SOURCE_FILE" == *.py ]]; then
    ssh -p "$SSH_PORT" "${NODE_USER}@${NODE_HOST}" "chmod +x '$DEST'"
fi

# Output remote path (MUST be first line of STDOUT)
echo "$DEST"

# Additional info to STDERR (captured in job output)
echo "Copied $SOURCE_FILE to $NODE_HOST:$DEST" >&2

exit 0
```

### Complete Example: S3 + wget Copier

Upload to S3, node downloads via wget:

**plugin.yaml:**

```yaml
name: S3 wget Copier
version: 1.0
rundeckPluginVersion: 1.2
providers:
  - name: s3-wget-copier
    service: FileCopier
    plugin-type: script
    script-interpreter: /bin/bash
    script-file: s3-copy.sh
    config:
      - name: s3_bucket
        title: S3 Bucket
        description: S3 bucket for temporary files
        type: String
        required: true
      - name: s3_region
        title: AWS Region
        type: String
        required: false
        default: us-east-1
      - name: expiry_seconds
        title: URL Expiry (seconds)
        description: Presigned URL expiry time
        type: Integer
        required: false
        default: 3600
```

**s3-copy.sh:**

```bash
#!/bin/bash
set -e

S3_BUCKET="${RD_CONFIG_S3_BUCKET}"
S3_REGION="${RD_CONFIG_S3_REGION:-us-east-1}"
EXPIRY="${RD_CONFIG_EXPIRY_SECONDS:-3600}"

SOURCE_FILE="${RD_FILE_COPY_FILE}"
NODE_HOST="${RD_NODE_HOSTNAME}"

# Generate unique S3 key
S3_KEY="rundeck-temp/$(uuidgen)/$(basename "$SOURCE_FILE")"

# Upload to S3
aws s3 cp "$SOURCE_FILE" "s3://${S3_BUCKET}/${S3_KEY}" \
    --region "$S3_REGION" >&2

# Generate presigned URL
DOWNLOAD_URL=$(aws s3 presign \
    "s3://${S3_BUCKET}/${S3_KEY}" \
    --region "$S3_REGION" \
    --expires-in "$EXPIRY")

# Remote path format: URL (node executor handles download)
# Node executor would: wget -O /tmp/script.sh "$DOWNLOAD_URL" && chmod +x /tmp/script.sh
echo "$DOWNLOAD_URL"

echo "Uploaded to S3, download URL expires in ${EXPIRY}s" >&2

exit 0
```

## Best Practices

### 1. Handle Destination Parameter Correctly

```java
@Override
public String copyFileStream(ExecutionContext context, InputStream input,
                            INodeEntry node, String destination)
        throws FileCopierException {
    
    // Destination might be null - generate temp path
    if (destination == null || destination.isEmpty()) {
        String tempDir = node.getAttributes().getOrDefault("temp-dir", "/tmp");
        destination = tempDir + "/rundeck-script-" + UUID.randomUUID() + ".sh";
    }
    
    // Now copy to destination...
}
```

**Why:** Scripts don't always specify destination. Generate unique temp path when null.

### 2. Make Scripts Executable

```java
// After copying script, make it executable
sftpChannel.chmod(0755, remotePath);

// Or via SSH command
sshChannel.exec("chmod +x " + remotePath);
```

**Why:** Scripts must be executable. Default upload permissions might be 0644.

### 3. Clean Up Temp Files

```java
// Option 1: Delete immediately after execution (in node executor)
// Option 2: Set temp directory that auto-cleans
String tempDir = "/tmp";  // Linux auto-cleans /tmp

// Option 3: Background cleanup job
// Create cron job that cleans old rundeck-script-* files
```

**Why:** Temp scripts accumulate on nodes. Implement cleanup strategy.

### 4. Handle Connection Failures Gracefully

```java
try {
    return copyViaSftp(input, node, destination);
} catch (FileCopierException e) {
    // Log error with details
    System.err.println("SFTP copy failed to " + node.getNodename() + 
                       ": " + e.getMessage());
    // Rethrow - Rundeck will mark step as failed
    throw e;
}
```

**Why:** Network issues are common. Log detailed errors for troubleshooting.

### 5. Implement Timeouts

```java
Session session = jsch.getSession(username, hostname, port);
session.setTimeout(30000);  // 30 second timeout
session.connect(10000);      // 10 second connect timeout
```

**Why:** Prevent hanging on unresponsive nodes. Always set connection timeouts.

### 6. Validate File Transfer

```java
// Calculate checksum before upload
String localChecksum = calculateMD5(file);

// Upload file
copyFile(file, node, remotePath);

// Verify on remote (via SSH)
String remoteChecksum = sshChannel.exec("md5sum " + remotePath);

if (!localChecksum.equals(remoteChecksum)) {
    throw new FileCopierException("Checksum mismatch - transfer corrupted");
}
```

**Why:** Detect corrupted transfers, especially for large files or unreliable networks.

### 7. Use Key Storage for Credentials

```java
// Get SSH key from Rundeck Key Storage
String keyPath = node.getAttributes().get("ssh-key-storage-path");
if (keyPath != null) {
    String keyContent = context.getStorageTree()
        .getResource(keyPath)
        .getContents()
        .getString();
    jsch.addIdentity("key", keyContent.getBytes(), null, null);
}
```

**Why:** Never hardcode credentials. Use Rundeck's Key Storage for secure credential management.

### 8. Support Large Files

```java
// Use streaming, not loading entire file into memory
try (InputStream input = new FileInputStream(file)) {
    // Stream directly to network
    sftpChannel.put(input, remotePath);
}

// Don't do this for large files:
// byte[] content = Files.readAllBytes(file.toPath());  // OOM risk!
```

**Why:** Large deployment packages can be GBs. Stream to avoid memory issues.

### 9. Log Transfer Details

```java
long fileSize = file.length();
long startTime = System.currentTimeMillis();

// Perform copy...

long elapsed = System.currentTimeMillis() - startTime;
double mbps = (fileSize / 1024.0 / 1024.0) / (elapsed / 1000.0);

System.out.println(String.format(
    "Copied %d bytes to %s in %dms (%.2f MB/s)",
    fileSize, node.getNodename(), elapsed, mbps
));
```

**Why:** Transfer metrics help diagnose performance issues.

### 10. Handle Platform Differences

```java
String remotePath;
String osFamily = node.getOsFamily();

if ("windows".equalsIgnoreCase(osFamily)) {
    // Windows path
    remotePath = "C:\\Temp\\script-" + UUID.randomUUID() + ".ps1";
} else {
    // Unix/Linux path
    remotePath = "/tmp/rundeck-script-" + UUID.randomUUID() + ".sh";
}
```

**Why:** Path separators and conventions differ between platforms.

## Troubleshooting

### File Not Found on Node

**Problem:** Node executor reports "file not found" after copy.

**Causes:**
- File copier failed silently
- Returned wrong path
- File deleted before execution
- Permission issues

**Debug:**
```java
System.out.println("Copied file to: " + remotePath);

// Verify file exists via SSH
sshChannel.exec("ls -la " + remotePath);
```

### Permission Denied

**Problem:** Cannot execute copied script.

**Causes:**
- Script not made executable (chmod +x)
- Written to read-only filesystem
- SELinux/AppArmor blocking execution

**Fix:**
```java
// Make executable after copy
sftpChannel.chmod(0755, remotePath);

// Or via SSH
sshChannel.exec("chmod +x " + remotePath);
```

### Transfer Timeouts

**Problem:** Copy operation times out.

**Causes:**
- Large file, slow network
- Node unreachable/firewalled
- No timeout configured (hangs forever)

**Fix:**
```java
// Set appropriate timeouts
session.setTimeout(60000);  // Increase for large files
session.connect(10000);

// Or use compression
sftpChannel.setCompressionLevel(6);
```

### Authentication Failures

**Problem:** "Auth fail" or "Permission denied" errors.

**Causes:**
- Wrong username/password
- SSH key not loaded
- Key format incompatible
- Host key checking failed

**Debug:**
```java
// Enable JSch logging
JSch.setLogger(new com.jcraft.jsch.Logger() {
    public boolean isEnabled(int level) { return true; }
    public void log(int level, String message) {
        System.err.println("JSch: " + message);
    }
});
```

### Disk Space Issues

**Problem:** "No space left on device" errors.

**Causes:**
- /tmp full on node
- Large script files
- Not cleaning up old scripts

**Fix:**
```bash
# Check disk space before copy
ssh node "df -h /tmp | tail -1"

# Clean old rundeck scripts
ssh node "find /tmp -name 'rundeck-script-*' -mtime +1 -delete"
```

## Related Documentation

- [Node Executor Plugins](/developer/node-executor-plugins.md) - Execute commands on nodes
- [Java Plugin Development](/developer/java-plugin-development.md) - General Java plugin guide
- [Script Plugin Development](/developer/script-plugin-development.md) - Script plugin basics
- [SSH Configuration](/manual/projects/node-execution/ssh.md) - SSH executor setup

## Quick Reference

### Return Value

**Critical:** Must return the remote file path:

```java
String remotePath = "/tmp/rundeck-script-abc123.sh";
// ... copy file ...
return remotePath;  // Node executor uses this
```

### Three Copy Methods

| Method | When Called | Input |
|--------|-------------|-------|
| `copyScriptContent` | Inline script | Script text as String |
| `copyFile` | Script file on Rundeck server | File object |
| `copyFileStream` | Script from URL/stream | InputStream |

### Node Attributes

Common node attributes used by file copiers:

| Attribute | Purpose | Example |
|-----------|---------|---------|
| `hostname` | Target host | `web01.example.com` |
| `username` | SSH/login username | `ubuntu` |
| `ssh-port` | SSH port | `22` |
| `ssh-key-storage-path` | Path to SSH key in Key Storage | `keys/project/ssh-key` |
| `temp-dir` | Temp directory on node | `/tmp` |
| `os-family` | Operating system | `Linux`, `Windows` |

### Common Libraries

| Library | Purpose | Maven Coordinates |
|---------|---------|-------------------|
| JSch | SSH/SFTP (Java) | `com.jcraft:jsch:0.1.55` |
| Apache Commons VFS | Virtual filesystem (S3, FTP, etc.) | `org.apache.commons:commons-vfs2` |
| AWS SDK | S3 operations | `software.amazon.awssdk:s3` |
| Azure SDK | Azure Blob Storage | `com.azure:azure-storage-blob` |
