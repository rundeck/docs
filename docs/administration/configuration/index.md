# Rundeck Configuration

This guide helps you configure Rundeck to meet your organization's needs. Configuration approach varies based on your Rundeck edition and deployment method.

## Configuration Methods

### Rundeck Enterprise / Process Automation
**GUI-Based Configuration:** Enterprise editions provide a System Configuration interface in the web UI for managing most settings without editing files directly. Navigate to System Menu → System Configuration to configure plugins, database connections, and other settings through forms.

**File-Based Configuration:** Advanced settings and some deployment-specific configurations still require editing configuration files like `rundeck-config.properties` and `framework.properties`.

### Rundeck Open Source
**File-Based Configuration Only:** All configuration is done by editing files in the Rundeck installation directory. Common files include:
- `rundeck-config.properties` - Primary configuration file
- `framework.properties` - Framework and plugin settings
- `realm.properties` - User authentication

See the [Configuration File Reference](/administration/configuration/config-file-reference.md) for complete details on all available properties.

---

## Getting Started: Configuration Checklist

### First-Time Setup (All Editions)

**Essential configurations to complete after installation:**

1. **Database** - Configure an external database for production use (default H2 is for testing only)
   - [Database Configuration →](/administration/configuration/database/)

2. **Authentication** - Set up user authentication beyond the default admin account
   - [Authentication & Security →](/administration/security/authentication.md)

3. **Email Notifications** - Configure SMTP for job notifications and alerts
   - [Email Settings →](/administration/configuration/email-settings.md)

4. **Base URL** - Set `grails.serverURL` to match your hostname/domain
   - [Configuration File Reference →](/administration/configuration/config-file-reference.md)

### Docker Deployments

If you're running Rundeck in Docker, configuration uses environment variables instead of editing files directly:

- Environment variables override configuration file settings
- Volume mounts for persistent data and custom configurations
- Extended Docker images for custom plugins or dependencies

[View Docker Configuration Guide →](/administration/configuration/docker)

### Cluster Deployments (Enterprise)

Additional requirements for high-availability clusters:

- Shared external database (required)
- Load balancer configuration
- Shared log storage (S3, Azure, or file system)
- Autotakeover and heartbeat settings
- Common authentication source

[View Cluster Configuration →](/administration/cluster/)

---

## Configuration by Use Case

### Production Deployment Essentials

These are critical for any production environment:

- **[Database](/administration/configuration/database/)** - MySQL, PostgreSQL, MS SQL Server, or Oracle
- **[Storage Facility](/administration/configuration/storage-facility.md)** - For keys, plugins, and uploaded files
- **[Email Settings](/administration/configuration/email-settings.md)** - SMTP for notifications
- **[System Properties](/administration/configuration/system-properties.md)** - JVM tuning and performance

### Enterprise/Cluster Features

Available in Rundeck Enterprise and Process Automation:

- **[Remote Job Execution](/administration/configuration/remote-job-execution.md)** - Distribute jobs across cluster members
- **[HashiCorp Consul](/administration/configuration/hashicorp-consul.md)** - Service discovery and configuration management
- **[Encryptable Properties](/administration/configuration/encryptable-properties.md)** - Encrypt sensitive configuration values

### Customization & Branding

Personalize the Rundeck interface:

- **[GUI Customization](/administration/configuration/gui-customization.md)** - Logos, colors, themes, custom branding
- **[Localization](/administration/configuration/localization.md)** - Language and regional format settings

### Plugin Management

Extend Rundeck functionality:

- **[Plugins Configuration](/administration/configuration/plugins/)** - Install and configure plugins
- **[Repository](/administration/configuration/repository.md)** - Artifact repository for plugin distribution

---

## Common Configuration Scenarios

### Scenario: First Production Deployment

**You're deploying Rundeck for the first time in production.**

**Required configurations:**
1. [Database](/administration/configuration/database/) - Set up PostgreSQL or MySQL
2. [Base URL configuration](/administration/configuration/config-file-reference.md#grails-serverurl) - Set `grails.serverURL`
3. [Authentication](/administration/security/authentication.md) - Configure LDAP, Active Directory, or SSO
4. [Email Settings](/administration/configuration/email-settings.md) - Enable notifications

**Recommended configurations:**
5. [Storage Facility](/administration/configuration/storage-facility.md) - Configure key storage backend
6. [System Properties](/administration/configuration/system-properties.md) - Tune JVM settings for your workload
7. [GUI Customization](/administration/configuration/gui-customization.md) - Add company branding

### Scenario: Docker Deployment

**You're deploying Rundeck using Docker containers.**

**Key differences:**
- Configuration via environment variables instead of editing files
- Volume mounts for persistent data (`/home/rundeck/server/data`)
- Custom plugins require extending the Docker image or volume mounts

**Start here:** [Docker Configuration Guide →](/administration/configuration/docker)

**Also configure:**
- [Database](/administration/configuration/database/) - External database (don't use embedded H2)
- [Storage Facility](/administration/configuration/storage-facility.md) - External storage (S3, database, etc.)

### Scenario: High-Availability Cluster (Enterprise)

**You need multiple Rundeck instances for high availability.**

**Required configurations:**
1. [Cluster Overview](/administration/cluster/) - Understand cluster architecture
2. [Database](/administration/configuration/database/) - Shared external database
3. [Log Storage](/administration/cluster/logstore/) - Shared log storage (S3, Azure, NFS)
4. [Load Balancer](/administration/cluster/loadbalancer/) - Configure sticky sessions
5. [Autotakeover](/administration/cluster/autotakeover/) - Automatic failover for scheduled jobs

**Optional configurations:**
6. [Remote Job Execution](/administration/configuration/remote-job-execution.md) - Distribute job execution
7. [HashiCorp Consul](/administration/configuration/hashicorp-consul.md) - Configuration management

### Scenario: Migration or Upgrade

**You're migrating Rundeck or upgrading to Enterprise.**

**Important configurations to preserve:**
- Export existing jobs, projects, and keys before migration
- Note current database type and version
- Document authentication configuration
- Back up `rundeck-config.properties` and `framework.properties`

**After migration/upgrade:**
- [Database](/administration/configuration/database/) - Verify connection strings
- [Storage Facility](/administration/configuration/storage-facility.md) - Migrate key storage if needed
- Test authentication and authorization
- For Enterprise: Explore [System Configuration UI](/manual/configuration-mgmt/configmgmt.md)

### Scenario: Security Hardening

**You need to secure Rundeck for compliance or security requirements.**

**Critical configurations:**
1. [Authentication](/administration/security/authentication.md) - Enterprise SSO or MFA
2. [SSL/HTTPS Configuration](/administration/security/ssl.md) - Enable HTTPS
3. [Access Control](/administration/security/authorization.md) - Configure ACL policies
4. [Encryptable Properties](/administration/configuration/encryptable-properties.md) (Enterprise) - Encrypt sensitive values
5. [Audit Stream Plugin](/administration/security/audit-stream-plugin.md) (Enterprise) - Send audit logs to SIEM

**Also review:**
- [Key Storage](/manual/key-storage/) - Secure credential management
- [System Properties](/administration/configuration/system-properties.md) - Disable unnecessary features

---

## Complete Configuration Reference

### Core Configuration

| Topic | Description | Edition |
|-------|-------------|---------|
| [Configuration File Reference](/administration/configuration/config-file-reference.md) | Complete reference for all properties in configuration files | All |
| [Database](/administration/configuration/database/) | External database setup (MySQL, PostgreSQL, MS SQL, Oracle) | All |
| [Storage Facility](/administration/configuration/storage-facility.md) | Configure storage for keys, plugins, and uploaded files | All |
| [System Properties](/administration/configuration/system-properties.md) | JVM settings and advanced configuration | All |
| [Email Settings](/administration/configuration/email-settings.md) | SMTP configuration for notifications | All |

### Deployment-Specific

| Topic | Description | Edition |
|-------|-------------|---------|
| [Docker Configuration](/administration/configuration/docker) | Environment variables, volumes, and Docker-specific settings | All |
| [System Configuration](/manual/configuration-mgmt/configmgmt.md) | GUI-based configuration interface | Enterprise |
| [Cluster Configuration](/administration/cluster/) | High-availability cluster setup | Enterprise |

### Enterprise Features

| Topic | Description | Edition |
|-------|-------------|---------|
| [Remote Job Execution](/administration/configuration/remote-job-execution.md) | Distribute jobs across cluster members | Enterprise |
| [HashiCorp Consul](/administration/configuration/hashicorp-consul.md) | Service discovery and configuration management | Enterprise |
| [Encryptable Properties](/administration/configuration/encryptable-properties.md) | Encrypt sensitive configuration values | Enterprise |

### Customization

| Topic | Description | Edition |
|-------|-------------|---------|
| [GUI Customization](/administration/configuration/gui-customization.md) | Logos, colors, themes, branding | All |
| [Localization](/administration/configuration/localization.md) | Language and regional settings | All |
| [Plugins](/administration/configuration/plugins/) | Install and configure plugins | All |
| [Repository](/administration/configuration/repository.md) | Plugin distribution and artifact management | All |

---

## Quick Tips

**Finding Configuration Files:**
- **Linux/Unix:** `/etc/rundeck/` (RPM/DEB packages) or `$RDECK_BASE/etc/`
- **Docker:** Mount volumes or use environment variables
- **Windows:** `%RDECK_BASE%\etc\`

**Applying Configuration Changes:**
- Most changes require restarting Rundeck
- Some plugin configurations can be changed via System Configuration UI (Enterprise) without restart
- Docker: Restart container after changing environment variables

**Configuration Priority (from highest to lowest):**
1. Environment variables (Docker)
2. `rundeck-config.properties`
3. System properties
4. Default values

**Getting Help:**
- Check [Troubleshooting Guide](/learning/howto/troubleshooting.md)
- Review [Rundeck Logs](/administration/maintenance/logs.md)
- Search [Rundeck Discussions](https://github.com/rundeck/rundeck/discussions)
- Contact [PagerDuty Rundeck Support](https://support.pagerduty.com)

---

## What's Next?

After completing initial configuration:

1. **[Create Your First Project](/manual/projects/)** - Set up projects to organize jobs
2. **[Configure Node Sources](/manual/projects/resource-model-sources/)** - Add servers/nodes to manage
3. **[Create Jobs](/manual/jobs/creating-jobs.md)** - Define automation workflows
4. **[Set Up Access Control](/administration/security/authorization.md)** - Configure user permissions
5. **[Configure Integrations](/learning/solutions/)** - Connect to external systems
