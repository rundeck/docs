# Configuration File Reference

This reference guide documents all Rundeck configuration files and properties. If you're just getting started, see the [Configuration Overview](/administration/configuration/) for guided setup paths.

**What you'll find here:**
- Location of configuration files for your installation type
- Complete property reference with descriptions
- Common configuration scenarios
- Security and performance tuning options

**Quick navigation:**
- [Essential Properties](#essential-configuration-properties) - Start here for production deployments
- [Configuration Files Overview](#configuration-files) - What each file does
- [rundeck-config.properties](#rundeck-config-properties) - Primary configuration file
- [framework.properties](#framework-properties) - Framework and plugin settings
- [Security Settings](#security) - Authentication, sessions, and HTTP headers

---

## Where Are My Configuration Files?

Configuration file locations depend on how you installed Rundeck.

### DEB/RPM layout

    /etc/rundeck/
    ├── admin.aclpolicy
    ├── apitoken.aclpolicy
    ├── artifact-repositories.yaml
    ├── framework.properties
    ├── jaas-loginmodule.conf
    ├── log4j2.properties
    ├── profile
    ├── project.properties
    ├── realm.properties
    ├── rundeck-config.properties
    ├── rundeckpro-license.key
    ├── ssl
    │   ├── ssl.properties
    │   ├── keystore (not packaged)
    │   └── truststore (not packaged)
    ├── system-job_reader.aclpolicy_template
    ├── system-job_runner.aclpolicy_template
    ├── system-job_viewer.aclpolicy_template
    ├── system-job_writer.aclpolicy_template
    └── system-project_admin.aclpolicy_template

    /var/lib/rundeck/
    ├── bootstrap
    ├── data
    ├── libext
    ├── logs
    ├── projects
    ├── repository
    ├── var
    └── work

### Launcher layout

    $RDECK_BASE/etc/
    ├── admin.aclpolicy
    ├── apitoken.aclpolicy
    ├── framework.properties
    ├── preferences.properties
    ├── profile
    ├── profile.bat
    └── project.properties

    $RDECK_BASE/server/config/
    ├── artifact-repositories.yaml
    ├── jaas-loginmodule.conf
    ├── log4j.properties
    ├── realm.properties
    ├── rundeck-config.properties
    └── ssl.properties

---

## Essential Configuration Properties

**First-time setup? Configure these properties first:**

### Must Configure (Production Requirements)

These settings are critical for any production deployment:

| Property | File | Description | Example |
|----------|------|-------------|---------|
| `grails.serverURL` | rundeck-config.properties | Your Rundeck URL (hostname/domain) | `https://rundeck.company.com` |
| `dataSource.url` | rundeck-config.properties | Database connection (don't use H2 in production) | See [Database Config](/administration/configuration/database/) |
| `server.servlet.session.timeout` | rundeck-config.properties | Session inactivity timeout in seconds | `7200` (2 hours) |
| `framework.server.url` | framework.properties | Base URL for Rundeck server | Same as `grails.serverURL` |

**Why these matter:**
- `grails.serverURL`: Used in emails, webhooks, and API responses. Must match your actual URL.
- `dataSource.url`: H2 database (default) is only for testing. Production needs PostgreSQL, MySQL, etc.
- `server.servlet.session.timeout`: Default is 1 hour. Set appropriate for your security needs.

### Highly Recommended

Configure these for a complete production setup:

| Property | File | Description | Default |
|----------|------|-------------|---------|
| `grails.mail.host` | rundeck-config.properties | SMTP server for notifications | None |
| `rundeck.executionMode` | rundeck-config.properties | Active or passive mode | `active` |
| `framework.ssh.keypath` | framework.properties | SSH private key for node access | None |
| `framework.ssh.user` | framework.properties | Default SSH username | Current user |

**See also:**
- [Email Configuration](/administration/configuration/email-settings.md) - Complete SMTP setup
- [Authentication](/administration/security/authentication.md) - Beyond default admin user
- [SSL/HTTPS Setup](/administration/security/ssl.md) - Enable HTTPS

### Common Scenarios Quick Reference

**Scenario: Setting up database (PostgreSQL)**
```properties
# In rundeck-config.properties
dataSource.url=jdbc:postgresql://dbhost:5432/rundeck
dataSource.username=rundeck
dataSource.password=your_password
dataSource.driverClassName=org.postgresql.Driver
```
[Full Database Configuration →](/administration/configuration/database/)

**Scenario: Enabling email notifications**
```properties
# In rundeck-config.properties
grails.mail.host=smtp.gmail.com
grails.mail.port=587
grails.mail.username=rundeck@company.com
grails.mail.password=your_password
grails.mail.props.mail.smtp.starttls.enable=true
grails.mail.props.mail.smtp.auth=true
```
[Full Email Configuration →](/administration/configuration/email-settings.md)

**Scenario: Cluster setup (Enterprise)**
```properties
# In rundeck-config.properties
rundeck.clusterMode.enabled=true
dataSource.url=jdbc:mysql://shared-db-host:3306/rundeck
rundeck.clusterMode.heartbeat.interval=30
rundeck.clusterMode.autotakeover.enabled=true
```
[Full Cluster Configuration →](/administration/cluster/)

---

## Configuration Files Overview

Rundeck uses multiple configuration files, each serving a specific purpose. Here's what each file does and when you'll need to edit it.

| File | Purpose | When to Edit | Edition |
|------|---------|--------------|---------|
| **rundeck-config.properties** | Primary configuration (database, security, features) | First setup, feature configuration | All |
| **framework.properties** | Framework settings (SSH, plugins, global variables) | Node connections, plugin config | All |
| **realm.properties** | Local user accounts and passwords | Adding local users (if not using LDAP/SSO) | All |
| **admin.aclpolicy** | Admin role permissions | Customizing admin access | All |
| **jaas-loginmodule.conf** | Authentication method configuration | Changing auth from file-based to LDAP/AD | All |
| **profile** | Environment variables for Rundeck process | JVM options, memory settings | All |
| **log4j2.properties** | Logging configuration | Changing log levels, log file locations | All |
| **ssl.properties** | SSL/HTTPS settings | Enabling HTTPS | All |
| **project.properties** | Per-project settings | Within each project directory | All |

**Configuration priority:** Environment variables > rundeck-config.properties > framework.properties > defaults

---

## Configuration Files Detailed Reference

### admin.aclpolicy

**Purpose:** Defines permissions for users with the "admin" role.

**When to edit:** 
- Customize what admin users can do
- Create additional role-based access policies
- Restrict admin access to specific projects

This file uses the [aclpolicy document format](/manual/document-format-reference/aclpolicy-v10).

**See also:** [Role-Based Access Control](/administration/security/authorization.md) for creating policies for other roles.

---

### framework.properties

**Purpose:** Core framework configuration used by Rundeck services and command-line tools.

**Common reasons to edit:**
- Configure SSH connections to nodes
- Set up plugin configurations
- Define global execution variables
- Specify API authentication tokens

This file is automatically created during installation.

#### Server Identity Settings

| Property | Description | When to Set |
|----------|-------------|-------------|
| `framework.server.hostname` | Hostname of this Rundeck server | Set during installation, important for clusters |
| `framework.server.name` | Display name for this server | Optional, helpful in multi-server setups |
| `framework.server.url` | Base URL for Rundeck | **Must match `grails.serverURL`** |
| `framework.server.username` | API username (if needed) | Rarely used, for CLI tools |
| `framework.server.password` | API password (if needed) | Rarely used, for CLI tools |
| `rundeck.server.uuid` | Manual server UUID | Only for cluster or licensing needs |

#### Directory Paths

| Property | Description | Default | When to Change |
|----------|-------------|---------|----------------|
| `framework.projects.dir` | Projects directory location | `$RDECK_BASE/projects` | Custom storage location |
| `framework.var.dir` | Temp files and output | `$RDECK_BASE/var` | Custom storage location |
| `framework.logs.dir` | Log file location | `$RDECK_BASE/var/logs` | Custom log location, separate disk |

#### SSH Connection Settings

**Configure these to connect to remote nodes via SSH.** See [SSH Node Execution](/manual/projects/node-execution/ssh.md) for details.

- `framework.ssh.keypath`: Path to the SSH private key file used for SSH connections
- `framework.ssh.user`: Default username for SSH Connections, if not overridden by Node specific value.
- `framework.ssh-connection-timeout`: timeout in milliseconds for SSH connections. The default is "0" (no timeout). You can modify this to change the connect/socket timeout. (Deprecated: `framework.ssh.timeout`.)
- `framework.ssh-command-timeout`: timeout in milliseconds for SSH commands. The default is "0" (no timeout). You can modify this to change the maximum time allowed for SSH commands to run.

Other settings:

- `rundeck.server.uuid`: This is used to manually specify the server UUID for certain cluster and licensing needs.
- `framework.log.dispatch.console.format`: Default format for non-terse node execution logging run by the `dispatch` CLI tool.
- `execution.script.tokenexpansion.enabled`: Whether inline script token expansion is enabled, default `true`. If `false`, the "Inline Script Content" syntax described in [Job Variables Reference](/manual/jobs/job-variables.md#inline-script-content) is disabled.
- `communityNews.disabled`: Default is not set, or false. Disables the external polling of Community News feed. Link will persist but will not poll, and clicking this link will open a new browser tab and navigate to the web-based version of Community News.

#### Static authentication tokens for API access:

:::tip
Make sure your $RDECK_BASE environment variable is pointed correctly to your current installation, otherwise the tokens wont be loaded in runtime.
:::

You can define the location of a .properties file in framework.properties:

- `rundeck.tokens.file=/etc/rundeck/tokens.properties`

The `tokens.properties` file should contain static authentication tokens you wish to use, keyed by the associated username. You MUST also specify the role of the user:

    username: token_string, role1
    username2: token_string1;token_string2, role2
    ...

The token_strings can be used as Authentication tokens to the [API](/api/index.md#token-authentication).

To ease the rotation of tokens, several tokens can be specified by separating them with a semicolon.

#### Global execution variables

Entries in `framework.properties` in the form `framework.globals.X=Y` Adds a variable `X` available in all execution contexts as `${globals.X}`.

Global variables can be overridden in the [`project.properties`](#project-properties) by adding a line in the form of `project.globals.X=Y` and then accessing it as `${globals.X}`.

### log4.properties - Legacy

Rundeck uses [log4j](http://logging.apache.org/log4j/1.2/) as its application logging facility. This file
defines the logging configuration for the Rundeck server.

### log4j2.properties - New in Rundeck 3.3.x

Rundeck uses [log4j2](https://logging.apache.org/log4j/2.x/) as its application logging facility. This file
defines the logging configuration for the Rundeck server.

#### Upgrading to log4j 2

:::warning
If you have custom plugins that used log4j 1.x or logback to do logging, you will need to upgrade them to use slf4j logging apis or log4j2 logging apis.
:::

If you are using the launcher or war in a container, the first time you run Rundeck 3.3.x a log4j2.properties file will be created for you.    
If you are using the rpm or deb package a log4j2.properties file should be added to your configuration directory when you upgrade the package.
If you have customized your old log4j.properties file you will need to ensure that it complies to the log4j2 format, then you can rename it to `log4j2.properties` in your configuration directory

Please refer to the log4j2 [documentation](https://logging.apache.org/log4j/2.x/manual/migration.html) to see how to update your old log4j.properties to be compliant with the new log4j2 format.

### profile

Shell environment variables used by the shell tools. This file
contains several parameters needed during the startup of the shell
tools like umask, Java home and classpath, and SSL options.

### project.properties

Rundeck project configuration file when using Filesystem based project definitions (see [Project Setup - Project Definitions](https://rundeck.org/docs/manual/projects/configuration.html)).

One of these is
generated at project setup time. Each project has a directory within the Rundeck projects directory, and the config file is within the `etc` subdirectory:

    $RDECK_BASE/projects/[PROJECT-NAME]/etc/project.properties

| Property | Description |
| --- | --- |
| `project.name`                           | Declare the project name. |
| `project.ssh-authentication`             | SSH authentication type (eg, privateKey). |
| `project.ssh-keypath`                    | Load SSH identify file. (Note: this is not a keystorage path but a local file system path.)|
| `service.FileCopier.default.provider`    | Default script file copier plugin. |
| `service.NodeExecutor.default.provider`  | Default node executor plugin. |
| `resources.source.N...`                  | Defines a Resource model source see [Resource Model Sources](/manual/projects/resource-model-sources/index.md). |
| `project.globals.X` | [Defines a Project Global variable](#project-global-execution-variables) |

Here's an example that configures a File source:

```properties
resources.source.1.config.file=/var/rundeck/projects/${project.name}/etc/resources.xml
resources.source.1.config.generateFileAutomatically=true
resources.source.1.config.includeServerNode=true
resources.source.1.type=file
```

Another that configures a URL source:

```properties
resources.source.2.config.cache=true
resources.source.2.config.timeout=30
resources.source.2.config.url=http\://example.com/nodes
resources.source.2.type=url
```

And one that configures a Directory source:

```properties
resources.source.3.config.directory=/var/rundeck/projects/${project.name}/site_nodes
resources.source.3.type=directory
```

Additional sources increment the source number. You can reference the project name by using the `${project.name}` context variable.

### File copier destination directory

When executing a Script step, the destination file path to be used when copying the script can be set using Node, Project, or Framework configuration values. Please see the plugin [documentation](https://rundeck.org/docs/manual/projects/node-execution/built-in-plugins.html#file-copier-destination-directory)

### Project Global execution variables

Project configuration entries of the form `project.globals.X=Y` Adds a variable `X` available in all execution contexts as `${globals.X}`, and overrides
any global with the same name defined in [`framework.properties`](#framework-properties).

## jaas-loginmodule.conf

[JAAS] configuration for the Rundeck server. The listing below
shows the file content for a normal RPM installation. One can see it
specifies the use of the PropertyFileLoginModule:

    RDpropertyfilelogin {
      org.eclipse.jetty.plus.jaas.spi.PropertyFileLoginModule required
      debug="true"
      file="/etc/rundeck/realm.properties";
    };

[jaas]: https://wiki.eclipse.org/Jetty/Feature/JAAS

## realm.properties

Property file user directory when PropertyFileLoginModule is
used. Specified from [jaas-loginmodule.conf](#jaas-loginmodule-conf).

---

## Session timeout

**Purpose:** Control how long users stay logged in before requiring re-authentication.

**Two timeout mechanisms:**

1. **Activity-based timeout** (standard): Sessions end after period of inactivity
2. **Forced re-authentication** (Enterprise): Sessions end after maximum duration regardless of activity

### How Session Timeouts Work

- **Activity-based timeout**: User sessions expire after inactivity period defined in `server.servlet.session.timeout` (default: 3600 seconds = 1 hour)
- **Forced re-authentication**: When enabled, sessions expire after `rundeck.userSessionDuration.maxMinutes` regardless of user activity
- **Combined**: Both can work together - session expires at whichever limit is reached first

**Choose your approach:**
- **Activity-only (default):** Users stay logged in as long as they're active - good for interactive workflows
- **Forced timeout (Enterprise):** Users must re-authenticate after set duration - good for compliance requirements

:::tip
**Warning:** Forced re-authentication may cause data loss if users have unsaved work when session expires. Consider longer timeouts or save prompts.
:::

### Inactivity Timeout

To configure the inactivity timeout use `server.servlet.session.timeout`. The default is 3600 seconds. 

Example configurations:

```properties
# Standard activity-based timeout (2 hours)
server.servlet.session.timeout=7200
```

Also see [rundeck-config.properties > Server Settings](#server-settings)

### Forced re-authentication (Commercial Products Only)

It is also possible to force re-authentication regardless of activity levels.

- `rundeck.userSessionDuration.maxMinutes`: Maximum duration in minutes for user sessions. Default: 60 minutes.
- `rundeck.userSessionDuration.forceReauthentication`: Default: `false`. When set to `true`, enforces session timeout regardless of user activity. When set to `false` (default), no forced re-authentication occurs and sessions only time out based on inactivity.

All of these can be set via [System Properties Configuration](/administration/configuration/system-properties.md) or in `rundeck-config.properties`.

Example configurations:

```properties
# Force reauthentication after 8 hours regardless of activity
rundeck.userSessionDuration.maxMinutes=480
rundeck.userSessionDuration.forceReauthentication=true

# Force reauthentication regardless of activity with default 60-minute timeout
rundeck.userSessionDuration.forceReauthentication=true
```
---

## rundeck-config.properties

**Purpose:** Primary Rundeck application configuration file.

**What's configured here:**
- Database connection
- Security settings (sessions, authentication, HTTPS)
- Email/SMTP settings
- Execution behavior and limits
- GUI customization
- Feature flags and advanced options

**Location:**
- **RPM/DEB:** `/etc/rundeck/rundeck-config.properties`
- **Launcher:** `$RDECK_BASE/server/config/rundeck-config.properties`
- **Docker:** Use environment variables instead

**Important:** Most changes require restarting Rundeck to take effect. Enterprise editions can use [Live Configuration Refreshing](#live-configuration-refreshing-commercial) for some properties.

The sections below document all available properties grouped by category.

#### Live Configuration Refreshing (Commercial)

You can make changes in the rundeck-config.properties file and then get Rundeck to reload the config without having to restart.  
The following steps give the process for live reloading:
* Make the change to the property
* Save the rundeck-config.properties file
* Issue an http POST request to the api endpoint `/api/36/config/refresh`

**Caveats**

Live reloading only works with a small set of properties at this time. Any properties that affect services, storage, or the http server
still require the server to be restarted to take effect.

Some of the properties that work with live reloading:
* All Rundeck remote execution policy settings (e.g. `rundeck.clusterMode.remoteExecution.*`)
* `rundeck.security.ldap.bindPassword`
* `rundeck.gui.login.welcomeHtml`
* `rundeck.gui.instanceName`



### Security

Configure authentication, session management, and security policies.

#### Request Token Security

**Purpose:** Protects against CSRF (Cross-Site Request Forgery) attacks.

**Property:** `rundeck.security.useHMacRequestTokens`
- **Default:** `true` (recommended)
- **Options:** `true` (HMac tokens with timeout) or `false` (UUID tokens, no timeout)

**When to change:** Only set to `false` if users frequently see "Token has expired" errors due to long idle times on forms.

**Advanced:** Adjust HMac timeout with JVM property:
```
-Dorg.rundeck.web.infosec.HMacSynchronizerTokensHolder.DEFAULT_DURATION=[milliseconds]
```

#### API Authentication

**Cookie-based API access**

**Property:** `rundeck.security.apiCookieAccess.enabled`
- **Default:** `true`
- **Purpose:** Allow API access using session cookies (username/password authentication)

**When to disable:** If you want to force all API access to use API tokens only. **Warning:** Disabling breaks CLI tools using username/password.

**API Token Expiration**

**Property:** `rundeck.api.tokens.duration.max`
- **Default:** `30d` (30 days)
- **Format:** `##{ydhms}` - years, days, hours, minutes, seconds
- **Examples:** 
  - `90d` - 90 days
  - `1y` - 1 year
  - `0` - Never expire (not recommended for security)

**Security tip:** Set shorter expiration for compliance requirements (e.g., `7d` for weekly rotation).

#### CSRF Protection

**Referer Header Validation**

| Property | Default | Options | Purpose |
|----------|---------|---------|---------|
| `rundeck.security.csrf.referer.filterMethod` | `NONE` | `NONE`, `POST`, `*` | Which HTTP methods require Referer header validation |
| `rundeck.security.csrf.referer.allowApi` | `true` | `true`, `false` | Skip Referer check for `/api/*` endpoints |
| `rundeck.security.csrf.referer.requireHttps` | `true` | `true`, `false` | Require HTTPS Referer if server URL is HTTPS |

**When to configure:**
- Set `filterMethod` to `POST` or `*` if using a reverse proxy
- Set `requireHttps=false` if transitioning from HTTP to HTTPS

#### Session Limits

**Concurrent Session Control**

**Purpose:** Prevent users from having too many active sessions simultaneously.

| Property | Default | Description |
|----------|---------|-------------|
| `rundeck.security.enforceMaxSessions` | `false` | Enable session limit enforcement |
| `rundeck.security.maxSessions` | `1` | Maximum concurrent sessions per user |

**Important:** If enabled, the oldest session is automatically logged out when the limit is exceeded.

**Using `rd` CLI tool?**
- Username/password authentication uses sessions - may cause unexpected logouts
- **Recommended:** Use API tokens with `rd` tool to avoid session conflicts
- API token usage doesn't count against session limits

#### Additional Security Settings

| Property | Default | Description |
|----------|---------|-------------|
| `rundeck.feature.debug.showTracesOnResponse` | `false` | Show stack traces in 5xx errors (disable in production) |
| `rundeck.security.jaasRolePrefix` | None | Prefix to add to roles from JAAS auth (e.g., `ROLE_`) |
| `rundeck.security.requiredRole` | None | Require all users to have this role |

**Security tip:** Keep `showTracesOnResponse=false` in production to avoid exposing internal details.

#### Conditional Logic Feature

**Early Access Feature**

| Property | Default | Description |
|----------|---------|-------------|
| `rundeck.feature.earlyAccessJobConditional.enabled` | `false` | Enable Conditional Logic workflow steps (Early Access) |

Enables dynamic conditional execution in workflows based on runtime conditions. When enabled, users can add Conditional Logic steps to jobs that evaluate conditions (job options, node attributes, job context) and execute substeps only when conditions are met. Requires Sequential or Parallel workflow strategy. See [Conditional Logic Steps](/manual/jobs/conditional-logic.md) for complete documentation.

#### Local User Management (Enterprise)

**Purpose:** Create and manage users directly in Rundeck's database (alternative to LDAP/SSO).

| Property | Default | Description |
|----------|---------|-------------|
| `rundeck.security.dblogin.enabled` | `true` | Enable local user creation |
| `rundeck.security.dblogin.createAdminUserAndRoles` | `false` | Auto-create admin user on startup |
| `rundeck.security.dblogin.adminUsername` | `rdadmin` | Username for auto-created admin |
| `rundeck.security.dblogin.adminPassword` | (generated) | Password for auto-created admin |

**How it works:**
1. Enable `dblogin.enabled=true`
2. Optionally enable `createAdminUserAndRoles=true` for automatic admin creation
3. If `adminPassword` is blank, a random password is generated and printed at startup:

```
************************************
* YOUR GENERATED DB ADMIN PASSWORD *
*                                  *
*     <<RANDOMSTRING>>             *
*                                  *
* PLEASE LOGIN WITH THIS PASSWORD  *
* AND CHANGE IT IMMEDIATELY        *
************************************
```

**See also:** [User Management Guide](/manual/user-management/user-mgmt.md#manage-local-users)

### Security HTTP Headers

**Purpose:** Add security headers to HTTP responses to protect against common web vulnerabilities.

**What they protect against:**
- **XSS (Cross-Site Scripting)** - Malicious scripts injected into pages
- **Clickjacking** - Embedding Rundeck in malicious iframes
- **MIME sniffing attacks** - Browser misinterpreting content types
- **Cache-based attacks** - Sensitive data cached in browsers

**Default behavior:** All security headers are enabled by default. You can customize or disable individual headers if needed for specific integrations or reverse proxy configurations.

:::warning
**Deprecated:** The `X-XSS-Protection` header has been deprecated as of Rundeck 4.3.0. Modern browsers have deprecated this header as it can introduce additional security issues.
:::

#### Enabling/Disabling Security Headers

**Master switch:**

```properties
# enable security headers filter to add these headers (default: true)
rundeck.security.httpHeaders.enabled=true

#########
# enable x-content-type-options: nosniff  (default: true)
rundeck.security.httpHeaders.provider.xcto.enabled=true

# enable x-frame-options: deny  (default: true)

rundeck.security.httpHeaders.provider.xfo.enabled=true

# Alternate settings for x-frame-options:
#
# use x-frame-options: sameorigin

# rundeck.security.httpHeaders.provider.xfo.config.sameorigin=true

#
# use x-frame-options: allow-from: src

# rundeck.security.httpHeaders.provider.xfo.config.allowFrom=src

#######
# enable Content-Security-Policy header (default:true)

rundeck.security.httpHeaders.provider.csp.enabled=true

# You can enable the `X-` variants of Content-Security-Policy if desired, but they are disabled by default:
#
# This enables the X-Content-Security-Policy header name

# rundeck.security.httpHeaders.provider.csp.config.include-xcsp-header=true

#
# This enables the X-WebKit-CSP header name

# rundeck.security.httpHeaders.provider.csp.config.include-xwkcsp-header=true

# You can specify an explicit policy, which will override directives declared below
#

# rundeck.security.httpHeaders.provider.csp.config.policy=default-src 'none'; connect-src 'self' ; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; font-src 'self' data: ; img-src 'self' https://media.rundeck.org ; form-action 'self' ;

#
# Or you can specify individual directives:
#

rundeck.security.httpHeaders.provider.csp.config.default-src=none
rundeck.security.httpHeaders.provider.csp.config.connect-src=self
rundeck.security.httpHeaders.provider.csp.config.style-src=self unsafe-inline
rundeck.security.httpHeaders.provider.csp.config.script-src=self unsafe-inline unsafe-eval
rundeck.security.httpHeaders.provider.csp.config.font-src=self data:
rundeck.security.httpHeaders.provider.csp.config.img-src=self https://media.rundeck.org
rundeck.security.httpHeaders.provider.csp.config.form-action=self

#######
# Enable Cache Control headers (default true).

# This will add the following headers to prevent caching of responses:
#    Cache-Control: no-cache, no-store, max-age=0, must-revalidate
#    Pragma: no-cache
#    Expires: 0

rundeck.security.httpHeaders.provider.cache-control.enabled=true

#######
# enable any custom additional headers (default: false)
#
# rundeck.security.httpHeaders.provider.custom.enabled=true
# rundeck.security.httpHeaders.provider.custom.config.name=X-Other-Security-Policy
# rundeck.security.httpHeaders.provider.custom.config.value=default-src 'none';
# rundeck.security.httpHeaders.provider.custom.config.name2=X-other-header
# rundeck.security.httpHeaders.provider.custom.config.value2=some value
```

References:

- <https://www.owasp.org/index.php/OWASP_Secure_Headers_Project>
- <https://content-security-policy.com>


### Security HTTP Firewall

The [Spring Security StrictHttpFirewall](https://docs.spring.io/spring-security/site/docs/current/api/org/springframework/security/web/firewall/StrictHttpFirewall.html) allows the Rundeck Application to validate HTTP requests based on their headers, URL and body. Any invalid request will be rejected with a BAD REQUEST 400 error. To enable use the following setting below in framework.properties or Configuration Management.

- `rundeck.security.httpFirewall.enabled`:`true/false`. Default `false`

#### [Host Head Injection Attack](https://portswigger.net/web-security/host-header) Protection

To protect the web application from Host Header Injection attacks it is possible to add a list of trusted hosts:

- `rundeck.security.httpFirewall.allowedHostnames`:`Comma separated hostnames`

The value for this parameter should be a string of comma separated hostnames. E.g.
 
```properties
rundeck.security.httpFirewall.allowedHostnames = localhost, 192.168.0.1, www.example.com 
```

The hostname derived from the `grails.serverURL` parameter is always trusted so there is no need to configure it explicitly. 

System Admin needs to configure the trusted hostnames based on the deployment strategy. For example:

1. If the Rundeck Application Server is exposed directly through a domain name (e.g. `my.domain.name`) or IP address, the domain name or IP address must be added into the allowedHostName list
2. If the Rundeck Application Server is exposed through a reverse proxy or load balancer which overwrites the HTTP Host head, then Host head value provided by reserve proxy and load balancer should be added into the allowedHostName list.

### Local Login Form Visibility

- `rundeck.login.localLogin.enabled`:`true/false`. Default `true`

If you have Single Sign On enabled(Enterprise only) and you want to prevent the ability
for your users to login with the non-SSO form, you can set this property to false and it
will suppress the non-SSO login form.

### Logout behaviors

- `rundeck.logout.expire.cookies`: comma separated list of cookie names to expire on logout

- `rundeck.logout.redirect.url`: Redirect to this url after logout. This can either be a fully qualified url or a relative path.

### Server Settings

- `server.servlet.session.timeout`: timeout in seconds.

In order to add the HSTS (HTTP Strict Transport Security) security header to the static resources of Rundeck, the configuration must be set directly on the server. The following two flags are used for the embedded Jetty server:

- `rundeck.web.jetty.servlet.stsMaxAgeSeconds`: time in seconds.

- `rundeck.web.jetty.servlet.stsIncludeSubdomains` : `true/false`. Default `false`

### Multi-URL Setting
Make sure the `grails.serverURL` is specified (with or without server.servlet.context-path), Set `rundeck.multiURL.enabled=true` and access the service through `grails.serverURL` using a secondary DNS pointing to the same server, the server IP, etc.

- Each of accessed urls will ask for login and password
- The address in navigation bar will not change
- Notifications will use `grails.serverURL`


### Primary Server Id (optional)

If you are running Rundeck in a cluster set up you'll want to set one of the servers as the primary server.
Once set as primary, that server will be the one that applies any data updates that might need to be run on bootstrap.
If no server is set as primary in a cluster set up, then all servers will try to apply the updates on startup. This can
lead to record contention in the database that will cause the updates to fail.

To set a server as primary set the server UUID in the property: `rundeck.primaryServerId`

```properties
rundeck.primaryServerId=70a4af69-74d6-4319-b923-16eec8c742d3
```

### Execution Mode

**Purpose:** Control whether this Rundeck server can execute jobs.

**Property:** `rundeck.executionMode`
- **Default:** `active`
- **Options:** `active` or `passive`

#### Mode Comparison

| Mode | Jobs Can Run | Scheduled Jobs | Ad-hoc Commands | When to Use |
|------|--------------|----------------|-----------------|-------------|
| `active` | Yes | Yes | Yes | Normal operation |
| `passive` | No | No | No | Maintenance, cluster member removal, read-only access |

#### Common Use Cases for Passive Mode

**Cluster Management:**
- Taking a cluster member offline for maintenance
- Draining executions before shutdown
- Temporarily disabling a cluster member

**Maintenance Windows:**
- Preventing new executions during database maintenance
- Testing configuration changes without allowing execution
- Read-only mode for auditing/review

**Planned Decommissioning:**
- Gracefully removing a server from a cluster
- Migrating executions to other cluster members

**How to change mode:**
1. Edit `rundeck-config.properties` and set `rundeck.executionMode=passive`
2. Restart Rundeck
3. Or use CLI: [System Mode Documentation](/administration/maintenance/index.md)

**Cluster note:** Each cluster member has its own execution mode. Set individual members to passive without affecting others.

### Project Configuration Storage settings

The [Project Setup - Project Definitions](/manual/projects/project-create.md#project-definitions) mechanism is configured within this file, see:

- [Project Storage](/administration/configuration/storage-facility.md#project-storage)

### Key Storage settings

The [Key storage](/manual/key-storage/index.md) mechanism is configured within this file, see:

- [Configuring Storage Plugins](/administration/configuration/plugins/configuring.md#storage-plugins)
- [Configuring Storage Converter Plugins](/administration/configuration/plugins/configuring.md#storage-converter-plugins)

### Notification email settings

See [Email Settings: Notification email settings](/administration/configuration/email-settings.md#notification-email-settings)

### Custom Email Templates

See [Email Settings: Custom Email Templates](/administration/configuration/email-settings.md#custom-email-templates)

### Execution finalize retry settings

If a sporadic DB connection failure happens when an execution finishes, Rundeck may fail to update the state of the execution in the database, causing the execution to appear is if it is still "running".

Rundeck now attempts to retry the update to correctly register the final state of the execution. You can tune how many times and how often this retry occurs with these config values:

```properties
# attempt to retry the final state update
rundeck.execution.finalize.retryMax=10
rundeck.execution.finalize.retryDelay=5000

# attempt to retry updating job statistics after execution finishes
rundeck.execution.stats.retryMax=3
rundeck.execution.stats.retryDelay=5000
```

Delay is in milliseconds. If a max is set to `-1`, then retries will happen indefinitely.

### Execution log settings

You can globally specify for all your jobs (regardless of which project they belong to) a log size limit and action as needed. If a job is configured with other values, the process will take the minimum value for output limit and prioritize "Halt" over "Truncate".

```properties
rundeck.execution.logs.output.limit = 5MB
rundeck.execution.logs.output.limitAction = truncate
```
* `rundeck.execution.logs.output.limit`. Show an error when that limit is exceeded. Could be entered either maximum total line-count (e.g. "100"), maximum per-node line-count ("100/node"), or maximum log file size ("100MB", "100KB", etc.), using "GB","MB","KB","B" as Giga- Mega- Kilo- and bytes.
* `rundeck.execution.logs.output.limitAction`. Is the action applied when the limit is achieved. It is triggered only if there is a value at rundeck.execution.logs.output.limit. The values accepted are ‘truncate' or 'halt’. The default value if it does not set is 'halt'.
    * a. `halt`: kills the step and leave the job with status 'failed'.
    * b. `truncate`: the step will not stop, but no more log output will be generated.

**Logviewer Max Size**:

The maximum size for the logs viewed in the GUI can be set with the following property: 

`rundeck.logviewer.maxLogSize`

If the log file is larger than this value, the log viewer will display a "Whale Log" message indicating that the log is too large to display:

![Whale Log](/assets/img/whale-log-error.png)<br>

The default value for this property is 3MB.

### Execution daily metrics

**Purpose:** Record per-day execution aggregates into scheduled execution stats as executions complete. That data backs the stats-based mode of the [execution metrics API](/api/index.md#execution-query-metrics) (`useStats=true`, API v57+), which avoids scanning the execution table and is intended for large environments.

| Property | Default | Description |
|----------|---------|-------------|
| `rundeck.executionDailyMetrics.enabled` | `false` | When `true`, daily metrics are updated when executions finish. Required for meaningful results when using `useStats=true` on the metrics API. |
| `rundeck.feature.guiUseExecutionDailyMetrics.enabled` | `false` | When `true`, enables the `guiUseExecutionDailyMetrics` feature for the GUI so compatible views can use the stats-based metrics path. |

**Collection window:** Metrics exist only for executions that complete after `rundeck.executionDailyMetrics.enabled` is turned on. Older executions are not backfilled into the daily aggregates.

**Operational order:** Turn on `rundeck.executionDailyMetrics.enabled` first and allow executions to run so aggregates populate; then enable the GUI feature when your UI and plugins expect the stats-based flow.

**Job Metrics UI plugin:** After you enable `rundeck.feature.guiUseExecutionDailyMetrics.enabled`, a Job Metrics UI plugin that still relies on the legacy metrics behavior may show all jobs as having no executions. That is expected until the plugin uses the updated stats-based API (`useStats=true`, API v57+).

### Job Metrics and ROI Summary UI

**Purpose:** Control visibility of the bundled Job Metrics and ROI Summary UI. These settings do not remove plugins from the installation; they stop the UI from loading those integrations.

Set properties in `rundeck-config.properties`. Most deployments require a Rundeck restart for changes to take effect.

| Property | Default | Description |
|----------|---------|-------------|
| `rundeck.plugin.jobmetrics.disabled` | `false` | When `true`, disables the Job Metrics UI. |
| `rundeck.plugin.roisummary.disabled` | `false` | When `true`, disables the ROI Summary UI. |

### Metrics Capturing

:::tip
Note: Metrics capturing is only available in our Runbook Automation Self Hosted products.
:::


Rundeck captures metrics using the [Metrics](http://metrics.dropwizard.io/3.0.2/) library.

You can disable all metrics capturing with:

```properties
rundeck.metrics.enabled=true/false
```

Additional configuration for metrics:

```properties
# capture metrics for requests via a filter
rundeck.metrics.requestFilterEnabled=true/false

# use JMX
rundeck.metrics.jmxEnabled=true/false
```

#### Metrics API Endpoints

Rundeck exposes Metrics data via API endpoints, which are enabled by default.

You can disable all metrics API endpoints with:

```properties
rundeck.metrics.api.enabled=true/false
```

You can also selectively disable each endpoint by setting these config values:

```properties
rundeck.metrics.api.[name].enabled=true/false
```

Metrics names are:

- `metrics`
- `threads`
- `ping`
- `healthcheck`

See: [API > List Metrics](/api/index.md#list-metrics).

### Pagination defaults

Default paging size for the Activity page and results from execution API queries can be changed.

```properties
rundeck.pagination.default.max=20
```

### Job Remote Option URL connection parameters

Change the defaults for for [Job Remote Option Value URLs](/manual/jobs/job-options.md#remote-option-values) loading.

**Socket read timeout**

Max wait time reading from socket.

Default value: `10` (seconds)

Change this by setting:

```properties
rundeck.jobs.options.remoteUrlTimeout=[seconds]
```

**Connection timeout**

Max wait time attempting to make the connection.

Default value: (no timeout)

Change this by setting:

```properties
rundeck.jobs.options.remoteUrlConnectionTimeout=[seconds]
```

**No response retry**

If the request is sent, but the server disconnects without a response (e.g. server is overloaded), retry the request this many times.

Default value: 5

Change this by setting:

```properties
rundeck.jobs.options.remoteUrlRetry=[total]
```

### Job File Option Uploads

Values to configure file uploads for File type Job options:

Max temp file size.
File size in bytes or with a suffix of `k`,`m`,`g`,`t` (kilo,mega,giga,tera).

```properties
rundeck.fileUploadService.tempfile.maxsize=200M
```
Max controller file size. File size in bytes. In example: `4096000000` is equivalent to `4g`.
```properties
grails.controllers.upload.maxFileSize=4096000000
grails.controllers.upload.maxRequestSize=4096000000
```

Max temp file expiration (duration in milliseconds).
The uploaded file will be removed if not used as a job option within ths time period.
(This primarily affects Job executions performed via API
because the File Upload and Job Run are performed as separate steps.)

```properties
# default is 10 minutes
rundeck.fileUploadService.tempfile.expiration=600000
```
If you need to use large files, make sure your JVM settings have enough free memory to handle it.

_For 1GB ~ 2GB files, is recommended to set:_
```properties
java -Xms4g -Xmx8g -jar rundeck.war
```

:::tip
It is also possible to reconfigure the default path for files according to [this page](/developer/file-upload-plugins.md#about) using the property in this form:

`framework.plugin.FileUpload.filesystem-temp.basePath=/desired/path`

'''NOTE:
In a clustered mode it is important to note that this option, by default, will only upload the file to a single cluster member (whichever server you are uploading the file on). It is recommended to set the desired path to a directory that is shared across all cluster members. (e.g. NFS share mounted on same server path location to each server) By doing so, when a file is uploaded, it will be available for all cluster members.
:::

### Job YAML format

In order to get a human readable export of a Job, all of the line endings in the workflow scripts must not end with
a space. Otherwise the YAML exporter will resort to a format the preserves the exact line spaces, but is not as human readable.
The following setting will trim all line endings in the job's workflow scripts so that the YAML exporter produces a nice human readable document.

```properties
rundeck.job.export.yaml.trimSpaces=true
```
### Load balancer Health endpoint

The endpoint `/health` will respond with `200 OK` without authentication.

You can disable this behavior using a feature flag.

Node Balancer Health endpoint feature flag
: `rundeck.feature.healthEndpoint.enabled=false`

### Node Cache

Defaults for the Node caches

Enabled: true/false (default true).

: `rundeck.nodeService.nodeCache.enabled=true` If set to false, no caching is performed.

First Load Asynch: true/false
: `rundeck.nodeService.nodeCache.firstLoadAsynch=false` The default for whether the first load of a project's nodes should be performed synchronously or not. If set to `true`, and the [Project Nodes > Synchronous First Load](/manual/projects/project-create.md#project-nodes) value is unset, then the initial load of a Project's nodes when the cache is empty will be done in the background asynchronously. Otherwise the initial load is done synchronously, possibly causing a delay at Rundeck startup or Job execution startup. A Project level configuration value will override this default.

### Limit displayed Job execution Log Output

Limit the amount of lines displayed in Log Output when following the execution of a Job that is running (not finished yet) after a configurable limit has been reached.
If the value is not defined, default behavior is to display all the generated output

Trim Output: Max size of visible Log Output (not present by default).

: `rundeck.logviewer.trimOutput=250kb` Remove the oldest lines in Log Output after displaying 250kb of logs


### Runner report processing (Commercial)

:::enterprise
:::

The Rundeck server includes an optional compact processor that consolidates incoming runner reports into a single, compressed database row per operation. This significantly reduces database transaction pressure and improves log update responsiveness under high report load.

:::tip Recommended: configure via System Configuration
These properties are registered in the System Configuration GUI under **System Menu → System Configuration → Runner → Advanced**. Configuring them there stores the values in the database, shares them across all cluster members, and takes effect without a restart. See [System Configuration](/manual/configuration-mgmt/configmgmt.md) for instructions.
:::

#### `rundeck.runner.compactProcessor.enabled`

| | |
|---|---|
| **Default** | `false` |
| **Restart required** | No (live-refreshable) |

Enables the compact report processing mode. When `true`, the server stores the complete runner report message in a single compressed row (zlib) instead of one row per data object. This greatly reduces the number of database write transactions and can noticeably improve log update speed in the UI under high load.

**When to enable:** When runners handle jobs with large log volumes and you observe elevated database load or slow log updates in the UI.

```properties
rundeck.runner.compactProcessor.enabled=true
```

#### `rundeck.runner.compactProcessor.maxReportDataSize`

| | |
|---|---|
| **Default** | `1gb` |
| **Restart required** | No (live-refreshable) |

Sets the maximum amount of runner report data the server will store in the database per operation. Once the limit is reached, older report data for that operation is pruned. This acts as a safeguard against unbounded data growth from long-running or highly verbose jobs.

**Accepted values:** Size strings — for example, `500mb`, `1gb`, `2gb`.

```properties
rundeck.runner.compactProcessor.maxReportDataSize=1gb
```

### Groovy config format

If you would prefer to use Groovy for the config file, you can use rundeck-config.groovy instead of rundeck-config.properties. Or, you can use a combination of the two (i.e. some settings configured in the properties file and some in the Groovy file).

The groovy format is a java-like language, and it is not the same as properties.

Make sure you put quotes around all string values, but it is not necessary for true/false or numbers.

java properties format:

```properties
some.property=value
```

groovy format:

```groovy
some.property="value"
```

You can also use nested values using curly brackets, or use dot-notation "a.b.c",
but since it is not simple text properties, strings have to be quoted.

E.g. : a.b.c="blah" is the same as:

```groovy
a{
    b{
        c="blah"
    }
}
```

### Specify config file location

You will need to point rundeck at the new filename when you start up rundeck:

- Launcher:

        java -jar -Drundeck.config.name=rundeck-config.groovy rundeck-launcher.jar

RPM: Add this to the `/etc/sysconfig/rundeckd` file:

        export RDECK_CONFIG_FILE="/etc/rundeck/rundeck-config.groovy"

RPM/DEB: Add this to the `/etc/default/rundeckd` file:

        export RDECK_CONFIG_FILE="/etc/rundeck/rundeck-config.groovy"
