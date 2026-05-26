# Storage Facility

## Overview

The Rundeck Storage Facility is a critical infrastructure component that manages how Rundeck stores and accesses sensitive data and project configurations. It provides a secure, plugin-based storage abstraction layer that allows you to choose where and how data is stored.

**What gets stored:**
- **Secrets:** SSH keys, passwords, API tokens, certificates
- **Project configurations:** Project settings, readme files, MOTDs
- **Key metadata:** Permissions, creation dates, descriptions

**Why it matters:**
- **Security:** Controls encryption and access to sensitive credentials
- **Clustering:** Must be properly configured for high-availability setups
- **Compliance:** Affects audit trails and data retention
- **Performance:** Backend choice impacts execution speed
- **Backup/Recovery:** Critical for disaster recovery planning

## How Storage Facility Works

The Storage Facility provides a filesystem-like structure where files are organized using `/`-separated paths (like `/keys/ssh/prod-server`). Think of it as a virtual filesystem with pluggable backends.

**Architecture:**

```
User/API Request
      ↓
Storage Converter Layer (encryption/decryption)
      ↓
Storage Backend (filesystem, database, or plugin)
      ↓
Actual Storage Location
```

### Two Independent Containers

Rundeck separates storage into two independent containers. Each can be configured with different backends and converters:

| Container | Purpose | Default Location | Cluster Requirement |
|-----------|---------|------------------|---------------------|
| **Key Storage** | Secrets, keys, passwords | `$RDECK_BASE/var/storage` | **Must be shared** |
| **Project Storage** | Project configs, readme files | Database or filesystem | **Must be shared** |

**Critical for clusters:** Both containers MUST be accessible by all cluster members. Using default filesystem storage won't work in clusters unless you use shared storage (NFS, etc.).

---

## Key Storage

**Purpose:** Secure storage for credentials used in job executions and node authentication.

**What's stored:**
- SSH private keys (for remote node authentication)
- Passwords (for sudo, Windows nodes, databases)
- API tokens (for integrations)
- Certificates (SSL/TLS client certs)
- Public keys (for reference)

**How it's used:**
- Jobs reference keys using storage paths: `keys/ssh/prod-server`
- Node executor plugins retrieve credentials at execution time
- API allows writing secrets but only reading public keys (security)
- ACL policies control who can create, read, update, delete keys

### Key Storage Access Control

**Security model:**
- **Write:** API, GUI can write any key type
- **Read:** API/GUI can only read public keys and metadata
- **Use:** Jobs can use private keys/passwords for execution (never exposed to users)
- **ACLs:** Control access at path level (e.g., allow team to use `/keys/team-a/*`)

**See:** [Key Storage Documentation](/manual/key-storage/index.md)

### Key Storage Configuration

Configure in `rundeck-config.properties`:

**Storage backend:**
```properties
# Format: rundeck.storage.provider.[index].[property]
rundeck.storage.provider.1.type=db
rundeck.storage.provider.1.path=/keys
```

**Encryption converter:**
```properties
# Format: rundeck.storage.converter.[index].[property]
rundeck.storage.converter.1.type=aes-gcm-encryption
rundeck.storage.converter.1.path=/keys
rundeck.storage.converter.1.config.password=CHANGE_THIS_PASSWORD
```

### Common Key Storage Issues

**Issue: Keys not accessible in cluster**
- **Cause:** Using filesystem backend without shared storage
- **Solution:** Switch to `db` backend or use NFS-mounted shared filesystem
- **Verification:** Check `rundeck.storage.provider.1.type` in all cluster members

**Issue: "Key not found" errors in jobs**
- **Cause:** Incorrect key path or ACL restrictions
- **Solution:** Verify key exists at exact path (case-sensitive), check ACL permissions
- **Debug:** Test key access via API: `GET /api/VERSION/storage/keys/path/to/key`

**Issue: Cannot update or delete keys**
- **Cause:** Encrypted keys with lost encryption password
- **Solution:** See [Migration and Recovery](#migration-and-recovery) section below
- **Prevention:** Document encryption passwords in secure vault

**Issue: Performance degradation with many keys**
- **Cause:** Filesystem backend inefficient for large datasets
- **Solution:** Migrate to database backend
- **Benchmark:** Database backend typically 3-5x faster for 1000+ keys

---

## Project Storage

**Purpose:** Store project-level configuration and documentation files.

**What's stored:**
- `project.properties` - Project configuration (node sources, executors, etc.)
- `readme.md` - Project documentation displayed in UI
- `motd.md` - Message of the day shown when users access project
- Project metadata (name, description, labels)

**Default behavior:**
- **Before Rundeck 2.4:** Filesystem only (`$RDECK_BASE/projects/[PROJECT]/etc/`)
- **Rundeck 2.4+:** Database storage by default (recommended)
- **Current:** Can be configured to use filesystem, database, or plugins

**Why database storage is recommended:**
- **Cluster support:** Automatically shared across cluster members
- **Backup:** Included in database backups
- **Performance:** Faster access than filesystem
- **Consistency:** No file sync issues in clusters

### Project Storage vs Filesystem

**Database-backed projects (recommended):**

**Pros:**
- Cluster-ready out of the box
- Included in database backups
- Faster project loading
- No file permissions issues
- Version control via database snapshots

**Cons:**
- Requires external database (not H2)
- Slightly more complex initial setup

**Filesystem-backed projects:**

**Pros:**
- Simple for single-server setups
- Easy manual editing of configuration
- Familiar structure for admins

**Cons:**
- Requires shared filesystem (NFS) for clusters
- File permission issues
- Not included in database backups
- Sync delays in clustered environments

### Project Storage Configuration

Configure in `rundeck-config.properties`:

**Database backend (recommended for production/clusters):**
```properties
rundeck.projectsStorageType=db
```

**Filesystem backend (single server only):**
```properties
rundeck.projectsStorageType=filesystem
```

**Custom configuration:**
```properties
# Storage backend
rundeck.config.storage.provider.1.type=db
rundeck.config.storage.provider.1.path=/

# Optional: Encryption for project configs
rundeck.config.storage.converter.1.type=aes-gcm-encryption
rundeck.config.storage.converter.1.path=/
rundeck.config.storage.converter.1.config.password=CHANGE_THIS_PASSWORD
```

**See:** [Project Configuration](/manual/projects/configuration.md)

### Common Project Storage Issues

**Issue: Projects not visible in cluster members**
- **Cause:** Using filesystem storage without shared mount
- **Solution:** Set `rundeck.projectsStorageType=db` and restart all cluster members
- **Verification:** Create test project on one node, check visibility on others

**Issue: "Project not found" after configuration change**
- **Cause:** Changed storage type but didn't migrate existing projects
- **Solution:** See [Migration](#migrating-between-storage-backends) section
- **Prevention:** Test configuration changes in non-production first

**Issue: Project configuration changes not reflected**
- **Cause:** Cached configuration in filesystem-backed projects
- **Solution:** Restart Rundeck or use API to refresh: `POST /api/VERSION/project/[PROJECT]/config/refresh`

**Issue: Project import/export failures**
- **Cause:** Inconsistent storage configuration between source and destination
- **Solution:** Ensure both systems use compatible storage backends
- **Workaround:** Use project archive export (includes all configuration)

---

## Storage Backends

Storage backends determine where data is physically stored. Choose based on your deployment architecture and requirements.

### Available Backend Types

| Backend | Best For | Pros | Cons | Cluster Support |
|---------|----------|------|------|-----------------|
| `filesystem` | Single server, development | Simple, human-readable | No cluster support | Requires NFS |
| `db` | Production, clusters | Cluster-ready, fast, backed up | Requires external DB | Built-in |
| Custom Plugin | Special requirements (S3, Vault, etc.) | Flexibility | Development required | Depends on plugin |

### Filesystem Backend

**Storage location:** Files stored in `$RDECK_BASE/var/storage` (key storage) or `$RDECK_BASE/projects` (project storage)

**When to use:**
- Single-server deployments
- Development/testing environments
- When you need to manually inspect/edit files

**Configuration:**

```properties
# Key Storage - filesystem
rundeck.storage.provider.1.type=filesystem
rundeck.storage.provider.1.path=/keys
rundeck.storage.provider.1.config.baseDir=$RDECK_BASE/var/storage

# Project Storage - filesystem
rundeck.projectsStorageType=filesystem
```

**Filesystem structure:**
```
$RDECK_BASE/var/storage/
├── keys/
│   ├── ssh/
│   │   ├── prod-server.pub
│   │   ├── prod-server.pub.meta.json
│   │   └── prod-server.private
│   └── passwords/
│       └── db-password.password
```

**Cluster considerations:**
- **Not cluster-ready by default**
- Requires shared filesystem (NFS, EFS, Azure Files, etc.)
- All cluster members must mount same path
- Watch for NFS locking issues and permissions

**Backup:**
- Include `$RDECK_BASE/var/storage` in filesystem backups
- Separate from database backups
- Test restoration procedures

### Database Backend (Recommended)

**Storage location:** Files stored as BLOBs in Rundeck's database

**When to use:**
- Production deployments (strongly recommended)
- Clustered environments (required unless using shared filesystem)
- When you want unified backup strategy
- For better performance with many keys

**Configuration:**

```properties
# Key Storage - database
rundeck.storage.provider.1.type=db
rundeck.storage.provider.1.path=/keys

# Project Storage - database
rundeck.projectsStorageType=db
```

**Database requirements:**
- **Must use external database** (PostgreSQL, MySQL, MariaDB, MS SQL Server, Oracle)
- **Cannot use H2** for production (default embedded database)
- Database must support BLOB storage
- Ensure adequate BLOB size limits (defaults usually sufficient)

**Configuration:** See [Database Configuration](/administration/configuration/database/index.md)

**Cluster considerations:**
- **Cluster-ready out of the box**
- All cluster members automatically share keys and projects
- No additional filesystem configuration needed
- Backed up with database

**Backup:**
- Keys and projects included in database backups
- Use database-native backup tools
- Test restore procedures including BLOB data

**Performance characteristics:**
- **Small datasets (< 100 keys):** Similar to filesystem
- **Medium datasets (100-1000 keys):** 2-3x faster than filesystem
- **Large datasets (> 1000 keys):** 3-5x faster than filesystem
- Database indexes improve lookup performance

### Storage Backend Configuration Examples

#### Example 1: Single Server (Filesystem)

```properties
# Key Storage - filesystem
rundeck.storage.provider.1.type=filesystem
rundeck.storage.provider.1.path=/keys

# Project Storage - filesystem
rundeck.projectsStorageType=filesystem
```

#### Example 2: Production Single Server (Database)

```properties
# Key Storage - database
rundeck.storage.provider.1.type=db
rundeck.storage.provider.1.path=/keys

# Project Storage - database
rundeck.projectsStorageType=db

# Database connection configured separately
dataSource.url=jdbc:postgresql://dbhost:5432/rundeck
```

#### Example 3: Cluster with Shared Database

```properties
# Same configuration on ALL cluster members

# Key Storage - database (shared automatically)
rundeck.storage.provider.1.type=db
rundeck.storage.provider.1.path=/keys

# Project Storage - database (shared automatically)
rundeck.projectsStorageType=db

# Shared database
dataSource.url=jdbc:mysql://shared-db-host:3306/rundeck
```

#### Example 4: Hybrid (Keys in DB, Projects on Shared Filesystem)

```properties
# Key Storage - database
rundeck.storage.provider.1.type=db
rundeck.storage.provider.1.path=/keys

# Project Storage - shared NFS mount
rundeck.projectsStorageType=filesystem
framework.projects.dir=/mnt/shared-nfs/rundeck/projects
```

**Use case:** Legacy migration where projects are on shared filesystem but you want keys in database.

### Choosing the Right Backend

**Decision tree:**

```
Are you running a cluster?
├─ Yes → Use db backend (required)
├─ No, but might in future → Use db backend (easier migration)
└─ No, single server forever
    ├─ Development/Testing → filesystem ok
    └─ Production → db backend recommended
```

**Migration complexity:**

| From → To | Difficulty | Process |
|-----------|-----------|---------|
| filesystem → db | Easy | Use migration tools, documented below |
| db → filesystem | Medium | Export, change config, import |
| filesystem → filesystem (different path) | Easy | Copy files, update config |
| db → db (different server) | Easy | Database export/import |

**See also:**
- [Database Configuration](/administration/configuration/database/index.md) - External database setup
- [Storage Plugin Development](/developer/storage-plugins.md) - Custom backends

---

## Storage Converters

Storage converters sit between the API/application layer and the storage backend, transforming data as it's written and read. The most common use is encryption.

**How converters work:**

```
Write Flow:
User/API → [Converter: Encrypt] → Storage Backend → Disk/Database

Read Flow:
Disk/Database → Storage Backend → [Converter: Decrypt] → User/API
```

**Key concepts:**
- **Multiple converters:** Can chain converters (e.g., compress then encrypt)
- **Path-based:** Apply to specific paths (e.g., only encrypt `/keys/*`)
- **Transparent:** Application doesn't know encryption is happening
- **Metadata stored separately:** Encryption info stored with file metadata

### Encryption with AES-GCM Plugin

Rundeck includes the **AES-GCM Encryption Plugin** for encrypting stored data using AES-256-GCM authenticated encryption. This is the most common converter configuration.

:::tip Upgrade Note
Prior to Rundeck 6.0, this plugin was called `jasypt-encryption`. The legacy name still works as an alias — existing configurations do not need to be changed.
:::

**When to use encryption:**
- **Required:** Production environments storing sensitive keys/passwords
- **Compliance:** HIPAA, PCI-DSS, SOC 2, and similar regulations
- **Best practice:** Anytime you're using database backend (BLOB encryption)
- **Defense in depth:** Even with database encryption, this adds application-layer protection

#### Basic Encryption Configuration

**Key Storage encryption:**

```properties
# Encrypt all keys
rundeck.storage.converter.1.type=aes-gcm-encryption
rundeck.storage.converter.1.path=keys
rundeck.storage.converter.1.config.password=YOUR_ENCRYPTION_PASSWORD_HERE
```

**Project Storage encryption (optional):**

```properties
# Encrypt project configurations
rundeck.config.storage.converter.1.type=aes-gcm-encryption
rundeck.config.storage.converter.1.path=projects
rundeck.config.storage.converter.1.config.password=YOUR_ENCRYPTION_PASSWORD_HERE
```

#### Encryption Algorithm

Starting with Rundeck 6.0, the encryption algorithm is **AES-256-GCM** (authenticated encryption with PBKDF2-SHA256 key derivation). This is not configurable — all new data is encrypted with the strongest available standard. There is no need to choose an algorithm.

:::info
The `algorithm`, `provider`, and `encryptorType` properties are only relevant for **decrypting legacy data** from previous Rundeck versions. See the [AES-GCM Encryption Plugin](/administration/configuration/plugins/bundled-plugins.md#aes-gcm-encryption-plugin) documentation for details.
:::

#### Managing Encryption Passwords

**Critical: The encryption password is NOT stored in Rundeck**

You must provide it every time Rundeck starts. Common approaches:

**Option 1: Environment Variable (Recommended)**

```bash
# Set in /etc/sysconfig/rundeckd or /etc/default/rundeckd
export RD_STORAGE_PASSWORD="your_encryption_password"
```

```properties
# Reference in rundeck-config.properties
rundeck.storage.converter.1.config.password=${RD_STORAGE_PASSWORD}
```

**Option 2: External Configuration File**

```bash
# Create secure password file (readable only by rundeck user)
echo "your_encryption_password" > /etc/rundeck/.storage-password
chmod 400 /etc/rundeck/.storage-password
chown rundeck:rundeck /etc/rundeck/.storage-password
```

```properties
# Reference file in rundeck-config.properties
rundeck.storage.converter.1.config.passwordFile=/etc/rundeck/.storage-password
```

**Option 3: Key Management Service (Enterprise)**

```properties
# Use KMS to retrieve encryption key
rundeck.storage.converter.1.config.password=${KMS_RETRIEVED_PASSWORD}
```

**Security best practices:**
- **Never commit** encryption passwords to version control
- **Document location** in runbooks (not the password itself)
- **Test recovery** procedure before production
- **Rotate regularly** (requires re-encryption, see below)
- **Use different passwords** for different environments

#### Enabling Encryption on Existing Storage

**Scenario:** You have unencrypted keys and want to add encryption.

**Important:** Existing keys remain unencrypted. Encryption only applies to new/updated keys.

**Steps:**

1. **Back up existing storage** (filesystem or database)

2. **Add converter configuration:**
```properties
rundeck.storage.converter.1.type=aes-gcm-encryption
rundeck.storage.converter.1.path=/keys
rundeck.storage.converter.1.config.password=${RD_STORAGE_PASSWORD}
```

3. **Restart Rundeck**

4. **Re-save each key** to encrypt it:
   - Via GUI: Open key, click "Save" (even without changes)
   - Via API: GET key, PUT it back
   - Via script: See [Re-encryption Script](#re-encryption-script) below

**Verify encryption:**
- Database: Check BLOB data is not plain text
- Filesystem: Key file contents should be encrypted (not human-readable)

#### Re-encryption Script

Script to re-encrypt all keys after enabling encryption:

```bash
#!/bin/bash
# Re-encrypt all keys in Key Storage

RUNDECK_URL="http://localhost:4440"
API_TOKEN="your_api_token_here"
API_VERSION="41"

# Get list of all keys
KEYS=$(curl -s -H "X-Rundeck-Auth-Token: $API_TOKEN" \
  "$RUNDECK_URL/api/$API_VERSION/storage/keys/?list=true" | \
  jq -r '.resources[].path')

# Re-save each key to trigger encryption
for KEY_PATH in $KEYS; do
  echo "Re-encrypting: $KEY_PATH"
  
  # Get current key data
  KEY_DATA=$(curl -s -H "X-Rundeck-Auth-Token: $API_TOKEN" \
    "$RUNDECK_URL/api/$API_VERSION/storage/keys/$KEY_PATH")
  
  # Put it back (triggers encryption)
  curl -X PUT -H "X-Rundeck-Auth-Token: $API_TOKEN" \
    -H "Content-Type: application/octet-stream" \
    -d "$KEY_DATA" \
    "$RUNDECK_URL/api/$API_VERSION/storage/keys/$KEY_PATH"
  
  sleep 1
done

echo "Re-encryption complete"
```

### Common Storage Converter Issues

**Issue: "Encryption error" or keys not accessible after enabling encryption**
- **Cause:** Missing or incorrect encryption password
- **Solution:** Verify password is correctly set in environment variable or file
- **Debug:** Check Rundeck logs for encryption errors at startup

**Issue: Keys encrypted with old password, can't access after password change**
- **Cause:** Encryption password changed but keys not re-encrypted
- **Solution:** 
  1. Restore old password temporarily
  2. Access and re-save all keys with new password
  3. Or restore from backup before password change
- **Prevention:** Use rotation procedure (document both old and new passwords during transition)

**Issue: "Lost encryption password, keys inaccessible"**
- **Cause:** Encryption password not documented/forgotten
- **Solution:** 
  - **If you have filesystem backup:** Restore unencrypted backups
  - **If you have database backup:** Restore from before encryption was enabled
  - **No backup:** Keys are **permanently inaccessible** - must recreate
- **Prevention:** Document password in secure vault, test recovery procedures

**Issue: Performance degradation after enabling encryption**
- **Cause:** Encryption adds CPU overhead
- **Solution:** 
  - Use faster algorithm (but less secure)
  - Increase JVM memory allocation
  - Consider hardware crypto acceleration
- **Benchmark:** Encryption typically adds 5-15% overhead

**Issue: Cluster members can't access encrypted keys**
- **Cause:** Different encryption passwords on different cluster members
- **Solution:** Ensure ALL cluster members have identical converter configuration
- **Verification:** Check `rundeck-config.properties` on all nodes

**See also:**
- [AES-GCM Encryption Plugin](/administration/configuration/plugins/bundled-plugins.md#aes-gcm-encryption-plugin) - Detailed configuration
- [Storage Converter Plugin Development](/developer/storage-converter-plugins.md) - Custom converters

---

## Migrating Between Storage Backends

Common scenarios for migrating storage backends.

### Filesystem to Database (Most Common)

**When:** Moving from single server to cluster, or improving performance/reliability.

**Prerequisites:**
- External database configured (PostgreSQL, MySQL, etc.)
- Backup of current filesystem storage
- Downtime window (keys cannot be accessed during migration)

**Migration steps:**

1. **Back up current storage:**
```bash
tar -czf storage-backup-$(date +%Y%m%d).tar.gz $RDECK_BASE/var/storage
```

2. **Export keys via API** (creates importable format):
```bash
#!/bin/bash
# Export all keys
RUNDECK_URL="http://localhost:4440"
API_TOKEN="your_api_token"
API_VERSION="41"
EXPORT_DIR="/tmp/key-export"

mkdir -p $EXPORT_DIR

# Get all key paths
curl -s -H "X-Rundeck-Auth-Token: $API_TOKEN" \
  "$RUNDECK_URL/api/$API_VERSION/storage/keys/?list=true" | \
  jq -r '.resources[].path' > $EXPORT_DIR/key-paths.txt

# Export each key
while read KEY_PATH; do
  echo "Exporting: $KEY_PATH"
  curl -s -H "X-Rundeck-Auth-Token: $API_TOKEN" \
    "$RUNDECK_URL/api/$API_VERSION/storage/keys/$KEY_PATH" \
    -o "$EXPORT_DIR/${KEY_PATH//\//_}"
done < $EXPORT_DIR/key-paths.txt
```

3. **Stop Rundeck:**
```bash
sudo systemctl stop rundeckd
```

4. **Change configuration** in `rundeck-config.properties`:
```properties
# Old configuration (comment out):
# rundeck.storage.provider.1.type=filesystem
# rundeck.storage.provider.1.path=/keys

# New configuration:
rundeck.storage.provider.1.type=db
rundeck.storage.provider.1.path=/keys

# Also migrate project storage if needed:
rundeck.projectsStorageType=db
```

5. **Start Rundeck:**
```bash
sudo systemctl start rundeckd
```

6. **Verify empty key storage:**
Check that database storage is active but empty.

7. **Import keys** via API:
```bash
# Import each key back
while read KEY_PATH; do
  echo "Importing: $KEY_PATH"
  curl -X PUT -H "X-Rundeck-Auth-Token: $API_TOKEN" \
    -H "Content-Type: application/octet-stream" \
    --data-binary "@$EXPORT_DIR/${KEY_PATH//\//_}" \
    "$RUNDECK_URL/api/$API_VERSION/storage/keys/$KEY_PATH"
done < $EXPORT_DIR/key-paths.txt
```

8. **Verify keys accessible:**
Test a few keys in jobs to ensure they work.

9. **Clean up:**
Keep filesystem backup for recovery, delete export directory.

### Database to Filesystem

**When:** Simplifying single-server setup, or troubleshooting.

**Migration steps:**

1. **Export keys** using script from previous section

2. **Stop Rundeck**

3. **Change configuration:**
```properties
rundeck.storage.provider.1.type=filesystem
rundeck.storage.provider.1.path=/keys
rundeck.storage.provider.1.config.baseDir=$RDECK_BASE/var/storage
```

4. **Start Rundeck**

5. **Import keys** using API script

### Migrating Projects

**Filesystem to Database:**

```bash
# 1. Stop Rundeck
sudo systemctl stop rundeckd

# 2. Change configuration
# In rundeck-config.properties:
# rundeck.projectsStorageType=db

# 3. Start Rundeck
sudo systemctl start rundeckd

# 4. Projects are automatically migrated to database on first access
```

**Note:** Rundeck automatically migrates filesystem projects to database on first access when you change the storage type.

### Adding Encryption During Migration

Combine backend migration with encryption enablement:

1. **Export keys** (will be unencrypted)
2. **Stop Rundeck**
3. **Change backend** to database
4. **Add encryption converter** configuration
5. **Set encryption password** environment variable
6. **Start Rundeck**
7. **Import keys** (will be automatically encrypted)

---

## Backup and Recovery

Critical procedures for protecting stored data.

### What to Back Up

| Data Type | Storage Location | Backup Method | Frequency |
|-----------|------------------|---------------|-----------|
| **Keys (filesystem)** | `$RDECK_BASE/var/storage` | Filesystem backup | Daily |
| **Keys (database)** | Database BLOBs | Database backup | Daily |
| **Projects (filesystem)** | `$RDECK_BASE/projects/*/etc/` | Filesystem backup | Daily |
| **Projects (database)** | Database | Database backup | Daily |
| **Encryption passwords** | Secure vault | Documentation | N/A |
| **Storage configuration** | `rundeck-config.properties` | Config backup | On change |

### Backup Procedures

**Filesystem Storage:**

```bash
#!/bin/bash
# Backup filesystem storage
BACKUP_DIR="/backup/rundeck"
DATE=$(date +%Y%m%d_%H%M%S)

# Backup key storage
tar -czf $BACKUP_DIR/storage-$DATE.tar.gz $RDECK_BASE/var/storage

# Backup projects
tar -czf $BACKUP_DIR/projects-$DATE.tar.gz $RDECK_BASE/projects

# Backup configuration
cp /etc/rundeck/rundeck-config.properties $BACKUP_DIR/rundeck-config-$DATE.properties

# Retention (keep 30 days)
find $BACKUP_DIR -name "*.tar.gz" -mtime +30 -delete
```

**Database Storage:**

```bash
#!/bin/bash
# PostgreSQL example
BACKUP_DIR="/backup/rundeck"
DATE=$(date +%Y%m%d_%H%M%S)

pg_dump -h dbhost -U rundeck -d rundeck \
  --format=custom \
  --file=$BACKUP_DIR/rundeck-db-$DATE.dump

# Verify backup includes BLOBs
pg_restore --list $BACKUP_DIR/rundeck-db-$DATE.dump | grep -i blob
```

### Recovery Procedures

**Restore Keys (Filesystem):**

```bash
# Stop Rundeck
sudo systemctl stop rundeckd

# Restore from backup
rm -rf $RDECK_BASE/var/storage
tar -xzf /backup/rundeck/storage-20240101_120000.tar.gz -C /

# Fix permissions
chown -R rundeck:rundeck $RDECK_BASE/var/storage

# Start Rundeck
sudo systemctl start rundeckd
```

**Restore Keys (Database):**

```bash
# Restore entire database (includes keys as BLOBs)
pg_restore -h dbhost -U rundeck -d rundeck \
  --clean \
  /backup/rundeck/rundeck-db-20240101_120000.dump

# Verify restoration
psql -h dbhost -U rundeck -d rundeck -c \
  "SELECT COUNT(*) FROM storage_content WHERE namespace='keys';"
```

**Selective Key Restore:**

If you need to restore specific keys without full database restore:

```bash
# Extract specific key from backup database
pg_restore -h dbhost -U rundeck \
  --table=storage_content \
  --data-only \
  /backup/rundeck/rundeck-db-backup.dump | \
  psql -h dbhost -U rundeck -d rundeck
```

### Testing Recovery

**Schedule quarterly:**

1. **Test backup validity:**
   - Restore to test environment
   - Verify keys accessible
   - Test job execution with restored keys

2. **Verify encryption password:**
   - Retrieve password from secure vault
   - Test decryption in test environment
   - Update password documentation if needed

3. **Document procedures:**
   - Time to restore (RTO)
   - Data loss acceptable (RPO)
   - Staff training on procedures

---

## Cluster Configuration

Special considerations for high-availability clusters.

### Cluster Requirements

**Mandatory:**
- **Shared database** for key and project storage
- **Identical converter configuration** on all cluster members
- **Same encryption passwords** across all nodes
- **Synchronized configuration files**

### Cluster Storage Configuration

**All cluster members must have identical configuration:**

```properties
# SAME ON ALL CLUSTER MEMBERS

# Key Storage - shared database
rundeck.storage.provider.1.type=db
rundeck.storage.provider.1.path=/keys

# Project Storage - shared database
rundeck.projectsStorageType=db

# Encryption - MUST be identical
rundeck.storage.converter.1.type=aes-gcm-encryption
rundeck.storage.converter.1.path=/keys
rundeck.storage.converter.1.config.password=${RD_STORAGE_PASSWORD}

# Database - same connection
dataSource.url=jdbc:postgresql://shared-db-host:5432/rundeck
dataSource.username=rundeck
dataSource.password=${DB_PASSWORD}
```

**Environment variables (same on all nodes):**

```bash
# /etc/sysconfig/rundeckd or /etc/default/rundeckd
export RD_STORAGE_PASSWORD="your_encryption_password"
export DB_PASSWORD="your_database_password"
```

### Cluster Validation

**After cluster setup:**

1. **Create test key on Node 1:**
```bash
# Via API or GUI, create key: /keys/test/cluster-test
```

2. **Verify on Node 2:**
```bash
# Check key exists on Node 2
curl -H "X-Rundeck-Auth-Token: $TOKEN" \
  http://node2:4440/api/41/storage/keys/test/cluster-test
```

3. **Test job execution:**
   - Create job on Node 1 using the test key
   - Run job on Node 2
   - Verify key access works

4. **Monitor logs:**
```bash
# On all nodes, check for encryption errors
tail -f /var/log/rundeck/rundeck.log | grep -i "encryption\|storage"
```

### Common Cluster Issues

**Issue: Keys visible on one node but not others**
- **Cause:** Nodes using different storage backends
- **Solution:** Verify all nodes have `rundeck.storage.provider.1.type=db`
- **Debug:** Check configuration files on all nodes

**Issue: "Decryption failed" on some cluster members**
- **Cause:** Different encryption passwords on different nodes
- **Solution:** Ensure `RD_STORAGE_PASSWORD` environment variable is identical
- **Verification:** Check environment on all nodes

**Issue: New keys not appearing on other nodes**
- **Cause:** Database connection issues on some nodes
- **Solution:** Check database connectivity from all cluster members
- **Debug:** Test database connection: `psql -h dbhost -U rundeck -d rundeck`

**Issue: Performance degradation in cluster**
- **Cause:** Database BLOB performance issues
- **Solution:** 
  - Add database indexes on storage tables
  - Increase database connection pool size
  - Consider database caching
- **Monitoring:** Track database query times

---

## Troubleshooting and Debugging

### Diagnostic Commands

**Check current storage configuration:**

```bash
# Via API
curl -H "X-Rundeck-Auth-Token: $TOKEN" \
  http://localhost:4440/api/41/system/info | jq '.system.storage'

# Via logs (at Rundeck startup)
grep -i "storage provider" /var/log/rundeck/rundeck.log
```

**List all stored keys:**

```bash
curl -H "X-Rundeck-Auth-Token: $TOKEN" \
  http://localhost:4440/api/41/storage/keys/?list=true | jq .
```

**Test key access:**

```bash
# Public keys can be read via API
curl -H "X-Rundeck-Auth-Token: $TOKEN" \
  http://localhost:4440/api/41/storage/keys/path/to/public.pub

# Private keys return metadata only (security)
curl -H "X-Rundeck-Auth-Token: $TOKEN" \
  http://localhost:4440/api/41/storage/keys/path/to/private.key
```

**Check database storage:**

```sql
-- PostgreSQL: Count keys in database
SELECT namespace, COUNT(*) as key_count
FROM storage_content
GROUP BY namespace;

-- Check encrypted vs unencrypted
SELECT 
  namespace,
  path,
  CASE 
    WHEN data::text LIKE '%ENCRYPTED%' THEN 'encrypted'
    ELSE 'plaintext'
  END as encryption_status
FROM storage_content
WHERE namespace = 'keys';
```

**Check filesystem storage:**

```bash
# List keys on filesystem
find $RDECK_BASE/var/storage/keys -type f

# Check if key is encrypted (will be binary/unreadable if encrypted)
cat $RDECK_BASE/var/storage/keys/ssh/server.key

# Check key metadata
cat $RDECK_BASE/var/storage/keys/ssh/server.key.meta.json | jq .
```

### Debug Logging

Enable debug logging for storage in `log4j2.properties`:

```properties
# Enable storage debug logging
logger.storage.name = com.dtolabs.rundeck.core.storage
logger.storage.level = debug

logger.encryption.name = org.rundeck.storage.data.file
logger.encryption.level = debug
```

**Restart Rundeck and monitor:**

```bash
tail -f /var/log/rundeck/rundeck.log | grep -i storage
```

### Common Error Messages

**Error: "Storage provider [type] not found"**
- **Cause:** Invalid provider type in configuration
- **Solution:** Check provider type is `filesystem` or `db`
- **Configuration:** Verify `rundeck.storage.provider.1.type`

**Error: "Failed to decrypt storage content"**
- **Cause:** Wrong encryption password or algorithm mismatch
- **Solution:** Verify `RD_STORAGE_PASSWORD` matches password used to encrypt
- **Check:** Look for encryption configuration changes

**Error: "BLOB too large for database"**
- **Cause:** Database BLOB size limit exceeded (rare)
- **Solution:** Increase database BLOB size limits or use filesystem backend
- **Workaround:** Split large files or use external storage

**Error: "Permission denied" on filesystem storage**
- **Cause:** Rundeck process doesn't have access to storage directory
- **Solution:** Fix permissions: `chown -R rundeck:rundeck $RDECK_BASE/var/storage`
- **Prevention:** Ensure proper permissions during installation

---

## Complete Configuration Examples

### Example 1: Development (Unencrypted Filesystem)

**Scenario:** Single developer machine, no sensitive data

```properties
# rundeck-config.properties

# Key Storage - filesystem (no encryption)
rundeck.storage.provider.1.type=filesystem
rundeck.storage.provider.1.path=/keys
rundeck.storage.provider.1.config.baseDir=$RDECK_BASE/var/storage

# Project Storage - filesystem
rundeck.projectsStorageType=filesystem
```

**Use case:** Quick setup, easy debugging, no production use

### Example 2: Production Single Server (Encrypted Database)

**Scenario:** Single production server with encrypted keys

```properties
# rundeck-config.properties

# Key Storage - database with encryption
rundeck.storage.provider.1.type=db
rundeck.storage.provider.1.path=/keys

rundeck.storage.converter.1.type=aes-gcm-encryption
rundeck.storage.converter.1.path=/keys
rundeck.storage.converter.1.config.password=${RD_STORAGE_PASSWORD}

# Project Storage - database
rundeck.projectsStorageType=db

# Database
dataSource.url=jdbc:postgresql://localhost:5432/rundeck
dataSource.username=rundeck
dataSource.password=${DB_PASSWORD}
```

```bash
# /etc/sysconfig/rundeckd or /etc/default/rundeckd
export RD_STORAGE_PASSWORD="strong_encryption_password_here"
export DB_PASSWORD="database_password_here"
```

### Example 3: High-Availability Cluster (Encrypted Database)

**Scenario:** 3-node cluster with encrypted keys and projects

**Configuration (identical on all 3 nodes):**

```properties
# rundeck-config.properties

# Cluster mode
rundeck.clusterMode.enabled=true

# Key Storage - shared database with encryption
rundeck.storage.provider.1.type=db
rundeck.storage.provider.1.path=/keys

rundeck.storage.converter.1.type=aes-gcm-encryption
rundeck.storage.converter.1.path=/keys
rundeck.storage.converter.1.config.password=${RD_STORAGE_PASSWORD}

# Project Storage - shared database with encryption
rundeck.projectsStorageType=db

rundeck.config.storage.converter.1.type=aes-gcm-encryption
rundeck.config.storage.converter.1.path=/
rundeck.config.storage.converter.1.config.password=${RD_PROJECT_STORAGE_PASSWORD}

# Shared Database
dataSource.url=jdbc:postgresql://shared-db-cluster:5432/rundeck
dataSource.username=rundeck
dataSource.password=${DB_PASSWORD}

# Cluster heartbeat
rundeck.clusterMode.heartbeat.interval=30
rundeck.clusterMode.autotakeover.enabled=true
```

```bash
# /etc/sysconfig/rundeckd or /etc/default/rundeckd (all nodes)
export RD_STORAGE_PASSWORD="strong_encryption_password"
export RD_PROJECT_STORAGE_PASSWORD="different_encryption_password"
export DB_PASSWORD="database_password"
```

### Example 4: Hybrid Storage (Keys in DB, Projects on Shared NFS)

**Scenario:** Migrating from filesystem to database, keeping projects on NFS temporarily

```properties
# rundeck-config.properties

# Key Storage - database with encryption
rundeck.storage.provider.1.type=db
rundeck.storage.provider.1.path=/keys

rundeck.storage.converter.1.type=aes-gcm-encryption
rundeck.storage.converter.1.path=/keys
rundeck.storage.converter.1.config.password=${RD_STORAGE_PASSWORD}

# Project Storage - shared NFS mount
rundeck.projectsStorageType=filesystem
framework.projects.dir=/mnt/shared-nfs/rundeck/projects

# Database
dataSource.url=jdbc:mysql://dbhost:3306/rundeck
```

---

## Best Practices

### Security

1. **Always encrypt in production** - Use aes-gcm-encryption converter for key storage
2. **Separate encryption passwords** - Use different passwords for keys vs projects
3. **Secure password storage** - Store encryption passwords in external vault (not in config files)
4. **Rotate passwords** - Plan for periodic encryption password rotation
5. **Least privilege database** - Rundeck database user should only have necessary permissions
6. **Audit access** - Enable database audit logs for BLOB access

### Reliability

1. **Use database backend** - More reliable than filesystem for production
2. **Regular backups** - Daily backups of database, test restoration quarterly
3. **Document procedures** - Maintain runbooks for backup/recovery
4. **Monitor storage** - Alert on failed storage operations
5. **Test failover** - Regularly test cluster failover including key access

### Performance

1. **Database indexes** - Ensure storage tables have proper indexes
2. **Connection pooling** - Configure adequate database connection pool size
3. **Limit key size** - Keep keys small (large certificates can cause issues)
4. **Monitor BLOB performance** - Track database BLOB read/write times
5. **Consider caching** - Use database query caching for frequently accessed keys

### Operations

1. **Consistent configuration** - Use configuration management (Ansible, Puppet) to ensure consistency
2. **Version control** - Keep configuration files in version control (without passwords)
3. **Change management** - Test storage configuration changes in non-production first
4. **Monitoring and alerting** - Alert on key access failures
5. **Documentation** - Document custom storage configurations and encryption passwords location

### Migration

1. **Test first** - Always test migration in non-production environment
2. **Backup before** - Full backup before any storage migration
3. **Plan downtime** - Schedule maintenance window for migration
4. **Verify after** - Test key access and job execution after migration
5. **Keep backups** - Retain pre-migration backups for rollback

---

## Additional Resources

- [Key Storage](/manual/key-storage/index.md) - User guide for managing keys
- [Project Configuration](/manual/projects/configuration.md) - Project setup and storage
- [Database Configuration](/administration/configuration/database/index.md) - External database setup
- [AES-GCM Encryption Plugin](/administration/configuration/plugins/bundled-plugins.md#aes-gcm-encryption-plugin) - Encryption details
- [Storage Plugin Development](/developer/storage-plugins.md) - Custom storage backends
- [Storage Converter Plugin Development](/developer/storage-converter-plugins.md) - Custom converters
- [Cluster Configuration](/administration/cluster/) - High-availability setup
