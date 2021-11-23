# Configuration

# Configuration layout

Configuration file layout differs between the RPM and Launcher
installation methods.

## DEB/RPM layout

    /etc/rundeck/
    ├── admin.aclpolicy
    ├── apitoken.aclpolicy
    ├── artifact-repositories.yaml
    ├── framework.properties
    ├── jaas-loginmodule.conf
    ├── log4j.properties
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

## Launcher layout

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

# Configuration files

Configuration is specified in a number of standard Rundeck
configuration files generated during the installation process.

The purpose of each configuration file is described in its own section.

## admin.aclpolicy

Administrator access control policy defined with a [aclpolicy]
document.

This file governs the access for the "admin" group and role.

See [role based access control](/administration/security/authorization.md) for information about setting up policy files for other user groups.

[aclpolicy]: /manual/document-format-reference/aclpolicy-v10

## framework.properties

Configuration file used by shell tools and core Rundeck services. This file will be created for you at install time.

Some important settings:

- `framework.server.hostname`: Hostname of the Rundeck server node
- `framework.server.name`: Name (identity) of the Rundeck server node
- `framework.projects.dir`: Path to the directory containing Rundeck Project directories. Default is `$RDECK_BASE/projects`.
- `framework.var.dir`: Base directory for output and temp files used by the server and CLI tools. Default is `$RDECK_BASE/var`.
- `framework.logs.dir`: Directory for log files written by core services and Rundeck Server's Job executions. Default is `$RDECK_BASE/var/logs`
- `framework.server.username`: Username for connection to the Rundeck server
- `framework.server.password`: Password for connection to the Rundeck server
- `framework.rundeck.url`: Base URL for Rundeck server.

SSH Connection settings (See [Projects - Node Execution - SSH](/manual/projects/node-execution/ssh.md)):

- `framework.ssh.keypath`: Path to the SSH private key file used for SSH connections
- `framework.ssh.user`: Default username for SSH Connections, if not overridden by Node specific value.
- `framework.ssh-connection-timeout`: timeout in milliseconds for SSH connections. The default is "0" (no timeout). You can modify this to change the connect/socket timeout. (Deprecated: `framework.ssh.timeout`.)
- `framework.ssh-command-timeout`: timeout in milliseconds for SSH commands. The default is "0" (no timeout). You can modify this to change the maximum time allowed for SSH commands to run.

Other settings:

- `framework.log.dispatch.console.format`: Default format for non-terse node execution logging run by the `dispatch` CLI tool.
- `execution.script.tokenexpansion.enabled`: Whether inline script token expansion is enabled, default `true`. If `false`, the "Inline Script Content" syntax described in [User Guide - Creating Job Workflows - Context Variables](/manual/job-workflows.md#context-variables) is disabled.
- `communityNews.disabled`: Default is not set, or false. Disables the external polling of Community News feed. Link will persist but will not poll, and clicking this link will open a new browser tab and navigate to the web-based version of Community News.

Static authentication tokens for API access:

You can define the location of a .properties file in framework.properties:

- `rundeck.tokens.file=/etc/rundeck/tokens.properties`

The `tokens.properties` file should contain static authentication tokens you wish to use, keyed by the associated username. You MUST also specify the role of the user:

    username: token_string, role1
    username2: token_string2, role2
    ...

The token_strings can be used as Authentication tokens to the [API](/api/rundeck-api.md#token-authentication).

### Global execution variables

Entries in `framework.properties` in the form `framework.globals.X=Y` Adds a variable `X` available in all execution contexts as `${globals.X}`.

Global variables can be overridden in the [`project.properties`](#project-properties) by adding a line in the form of `project.globals.X=Y` and then accessing it as `${globals.X}`.

## log4.properties - Legacy

Rundeck uses [log4j](http://logging.apache.org/log4j/1.2/) as its application logging facility. This file
defines the logging configuration for the Rundeck server.

## log4j2.properties - New in Rundeck 3.3.x

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

## profile

Shell environment variables used by the shell tools. This file
contains several parameters needed during the startup of the shell
tools like umask, Java home and classpath, and SSL options.

## project.properties

Rundeck project configuration file when using Filesystem based project definitions (see [Project Setup - Project Definitions](https://rundeck.org/docs/manual/projects/configuration.html)).

One of these is
generated at project setup time. Each project has a directory within the Rundeck projects directory, and the config file is within the `etc` subdirectory:

    $RDECK_BASE/projects/[PROJECT-NAME]/etc/project.properties

| Property | Description |
| --- | --- |
| `project.name`                           | Declare the project name. |
| `project.ssh-authentication`             | SSH authentication type (eg, privateKey). |
| `project.ssh-keypath`                    | SSH identify file. |
| `service.FileCopier.default.provider`    | Default script file copier plugin. |
| `service.NodeExecutor.default.provider`  | Default node executor plugin. |
| `resources.source.N...`                  | Defines a Resource model source see [Resource Model Sources](/manual/projects/resource-model-sources/). |
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

## Session timeout

See [rundeck-config.properties > Server Settings](#server-settings)

Or set `server.servlet.session.timeout` via [System Properties Configuration](/administration/configuration/system-properties.md).

## rundeck-config.properties

This is the primary Rundeck webapp configuration file. Defines default
loglevel, datasource configuration, and
[GUI customization](/administration/configuration/gui-customization.md).

The following sections describe configuration values for this file.

#### Live Configuration Refreshing (Enterprise)

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

- `rundeck.security.useHMacRequestTokens` : `true/false`. Default: `true`.
  Switches between HMac based request tokens, and the default grails UUID
  tokens. HMac tokens have a timeout, which may cause submitted forms or
  actions to fail with a message like "Token has expired".
  If set to false, UUIDs will be used instead of HMac tokens,
  and they have no timeouts.
  The default timeout for tokens can be changed with the java system property
  `-Dorg.rundeck.web.infosec.HMacSynchronizerTokensHolder.DEFAULT_DURATION=[timeout in ms]`.

- `rundeck.security.apiCookieAccess.enabled`: `true/false`. Default: `true`.
  Determines whether access to the API is allowed if the API client
  authenticates via session cookies (i.e. username and password login.) If
  set to `false`, the current CLI tools and API libraries will not operate
  correctly if they use username and password login.

- `rundeck.api.tokens.duration.max`: Duration string indicating maximum lifetime of API Tokens. If unset, the value
  will be "30d" (30 days). Format: "##{ydhms}" (years, days, hours, minutes, seconds).
  If you want to disable the max expiration you can set it to 0 and create token with 0 duration that don't expire.

- `rundeck.security.csrf.referer.filterMethod`:`NONE|POST|*`. Set HTTP Method to filter based on Referer header. Can be POST, or "\*" for all methods. Default: NONE (disabled)

- `rundeck.security.csrf.referer.allowApi`: `true|false`. Allow /api/\* requests without requiring matching Referer header. Default: true.

- `rundeck.security.csrf.referer.requireHttps`: `true|false`. If server URL is HTTPS, Require referer header to be from HTTPS version of server URL, if false allow HTTP as well. Default: true.

- `rundeck.security.enforceMaxSessions`: `true|false`. Only allow users to log in a configured number of times. Oldest sessions are automatically logged out. `Default: false`.

  Note: If you use the rd tool with the RD_USERNAME/RD_PASSWORD authentication this will use an active session each time your run the command. If you log into the
  user interface then execute rd commands you could be logged out of your web session. If you have multiple long running rd commands and you exceed the maxSessions
  limit, you may experience unexpected behavior. If you use api tokens with the rd tool it will not log out your interactive session. If you enable this setting and also
  use the rd tool, it is recommended that you use api tokens with the rd tool.

- `rundeck.security.maxSessions`: If enforceMaxSessions is true, this setting controls the number of active sessions a user is allowed to have. `Default: 1`

- `rundeck.security.jaasRolePrefix`: Prefix string to add to each _role_ determined via [JAAS Authentication](/administration/security/authentication.md#jetty-and-jaas-authentication). Default: none.

- `rundeck.security.requiredRole`: `roleName`. If this property is set, all users must be a member of the role specified.

- `rundeck.security.dblogin.enabled`: `true|false`. (Enterprise) This option is enabled by default in version 3.3.0 to allow creation of local Rundeck users.  [More Info](/manual/user-management/user-mgmt.html#manage-local-users)

- `rundeck.security.dblogin.createAdminUserAndRoles`: `true|false`.  Enabling this feature adds the admin user and roles . (See `rundeck.security.dblogin.enabled`) Default is `false` so that no admin user or role is created by default.

- `rundeck.security.dblogin.adminUsername`: `[String]` The user name for the admin account that is created if the `createAdminUserAndRoles` value is set to *true*. Default is `rdadmin`.

- `rundeck.security.dblogin.adminPassword`: `[String]` A password value for the admin user created above.  If this entry is left blank or missing a password will be generated on boot of Rundeck.  The printed message will look like this:
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

### Security HTTP Headers

Rundeck adds some HTTP headers for XSS prevention and other security reasons, as described below.

By default, these headers are enabled, but they can be individually disabled, or reconfigured.

Additionally, custom headers can be enabled if required.

```properties
# enable security headers filter to add these headers (default: true)
rundeck.security.httpHeaders.enabled=true

#########
# enable x-content-type-options: nosniff  (default: true)
rundeck.security.httpHeaders.provider.xcto.enabled=true

#########
# enable x-xss-protection: 1  (default: true)

rundeck.security.httpHeaders.provider.xxssp.enabled=true

# Alternates for x-xss-protection:
#
# use x-xss-protection: 1; mode=block
#

# rundeck.security.httpHeaders.provider.xxssp.config.block=true

#
# use x-xss-protection: 1; report=https://some-uri

# rundeck.security.httpHeaders.provider.xxssp.config.report=https://some-uri

########
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

Note: This setting applies _only_ to the embedded Jetty server, which is used for standalone war launcher, rpm or deb installs. It does not work for Tomcat installation.

If you are deploying the Rundeck war file to Tomcat, you can manage the session timeout setting in the `$TomcatBase/conf/web.xml` file. The setting is in minutes.

```xml
    <session-config> <session-timeout>30</session-timeout> </session-config>
```

### Primary Server Id

If you are running Rundeck in a cluster set up you'll want to set one of the servers as the primary server.
Once set as primary, that server will be the one that applies any data updates that might need to be run on bootstrap.
If no server is set as primary in a cluster set up, then all servers will try to apply the updates on startup. This can
lead to record contention in the database that will cause the updates to fail.

To set a server as primary set the server UUID in the property: `rundeck.primaryServerId`

```properties
rundeck.primaryServerId=70a4af69-74d6-4319-b923-16eec8c742d3
```

### Execution Mode

- `rundeck.executionMode`:`active/passive`. Default `active`. Set the Execution
  Mode for the Rundeck server.

Rundeck can be in `active` or `passive` execution mode.

- `active` mode: Jobs, scheduled Jobs, and adhoc executions can be run.
- `passive` mode: No Jobs or adhoc executions can be run.

Setting Rundeck to `passive` mode prevents users from running anything on the
system and is useful when managing Rundeck server clusters.

### Project Configuration Storage settings

The [Project Setup - Project Definitions](/manual/projects/project-create.md#project-definitions) mechanism is configured within this file, see:

- [Project Storage](/administration/configuration/storage-facility.md#project-storage)

### Key Storage settings

The [Key storage](/manual/key-storage/key-storage.md) mechanism is configured within this file, see:

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

### Metrics Capturing

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

See: [API > List Metrics](/api/rundeck-api.md#list-metrics).

### Pagination defaults

Default paging size for the Activity page and results from execution API queries can be changed.

```properties
rundeck.pagination.default.max=20
```

### Job Remote Option URL connection parameters

Change the defaults for for [Job Remote Option Value URLs](/manual/job-options.md#remote-option-values) loading.

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

Default value: 3

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

Max temp file expiration (duration in milliseconds).
The uploaded file will be removed if not used as a job option within ths time period.
(This primarily affects Job executions performed via API
because the File Upload and Job Run are performed as separate steps.)

```properties
# default is 10 minutes
rundeck.fileUploadService.tempfile.expiration=600000
```

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
