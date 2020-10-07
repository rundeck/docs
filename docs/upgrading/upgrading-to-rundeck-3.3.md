# Upgrading to Rundeck 3.3


::: tip
This document highlights changes for users upgrading from Rundeck 3.2.
See other [Upgrading](/upgrading/) Documents if you are upgrading from 3.1 or earlier.
:::

## MySQL
:::danger
**For MySQL users**: Starting with Rundeck `3.3.4` the MySQL JDBC driver will no longer
be bundled in any of the distributions(war, deb, rpm, Docker, etc). You must
take action for Rundeck to continue connecting to the database after upgrading.
:::

The MariaDB Connector/J JDBC driver will continue to be bundled with Rundeck,
and can be used as a replacement.

**For deb, rpm, and war**  
Set the following in `rundeck-config.properties`
```properties
dataSource.driverClassName=org.mariadb.jdbc.Driver
```

**For Docker**  
Set the following environment variable:
```bash
RUNDECK_DATABASE_DRIVER=org.mariadb.jdbc.Driver
```

## Single-Sign On Changes
The Login Redirect URI has changed and will need to be updated for SSO to work.

#### Okta
The new Okta Rundeck Base URL has changed to `<rundeck base url>/login/oauth2/code/okta`

#### Ping
The Ping redirect callback url will be: `https://{your-rundeck-host}/login/oauth2/code/ping` (Ping requires this to be an https endpoint)

#### Auto Configuration
The Rundeck Oauth2 configuration now has support for auto configuration from your OIDC compliant provider.
To use the auto configuration you only need to supply the base url to your oauth provider endpoint, your client id and client secret, and Rundeck will do the rest.  For full details on Auto configurations use [the documentation here](/administration/security/sso.md).

#### jskSetUri
:::warning
In order to enhance the security of the communication between your oauth provider and Rundeck, you must supply
an additional `jwkSetUri` property.
:::
This allows Rundeck to obtain the signing keys necessary to verify the jwt tokens sent from your oauth provider.

Please see [the documentation here](/administration/security/sso.md) for detailed instructions and property format.

## Incompatible plugin versions

You must delete old versions of the following plugins from your `libext` folder.

Any prior version of http-notification-1.0.7.jar   
Any prior version of rundeck-jasypt-encryption-plugin-3.3.0.jar

(Enterprise Only)  
Any prior version of rundeckpro-pagerduty-plugins-3.3.0.jar

## Log4j 2 Notes
#### Upgrading to log4j 2

:::warning
If you have custom plugins that used log4j 1.x or logback to do logging, you will need to upgrade them to use slf4j logging apis or log4j2 logging apis.
:::

If you are using the launcher or war in a container, the first time you run Rundeck 3.3.x a log4j2.properties file will be created for you.

If you are using the rpm or deb package a log4j2.properties file should be added to your configuration directory when you upgrade the package.

If you have customized your old log4j.properties file you will need to ensure that it complies to the log4j2 format, then you can rename it to `log4j2.properties` in your configuration directory

Please refer to the Log4j 2 [documentation](https://logging.apache.org/log4j/2.x/manual/migration.html) to see how to update your old log4j.properties to be compliant with the new log4j2 format.

#### Tomcat Installations

:::warning
Rundeck 3.3.x requires a new system property to define the destination for your Rundeck logs to be set in your Tomcat launch JAVA_OPTS.  
:::

Ensure you have set the `rundeck.server.logDir` to the directory that will hold your Rundeck logs. [Full Tomcat setup instructions](/administration/install/tomcat.html).

```bash
$ cat setenv.sh
JAVA_OPTS="$JAVA_OPTS -XX:MaxPermSize=512m -Xmx2048m -Xms512m -server -Drdeck.base=/path/to/rundeck.base -Drundeck.config.location=/path/to/rundeck.base/server/config/rundeck-config.properties -Drundeck.server.logDir=/path/to/rundeck.base/server/logs"
```

## Context Path Property Change
:::warning
If you operate Rundeck under a custom URL path it may fail to function properly without this configuration change!
:::
When running Rundeck under Tomcat or behind a load balancer on a custom path (ie `mycorp.com/rundeck`)
it is necessary to inform Rundeck of the base path. This configuration property has changed with the upgrade to
Grails 4 and Spring Boot 2.x. The new property is `server.servlet.context-path` and is placed in `rundeck-config.properties`:

**Old Property**  
`server.contextPath`

**New Property**  
`server.servlet.context-path`

Docker images will utilize the same environment variable.

## JSCH Node Executor timeouts and environment variables

::: warning
`RD_*` remote environment variables will no longer be sent by default when using JSCH node executor. You can turn them back on with a configuration change.
:::

A [bug fix](https://github.com/rundeck/rundeck/pull/6130) has changed the default behavior of the built-in SSH node executor (JSCH).

This will affect you if:

* You make use of `RD_*` environment variables sent to remote nodes, which require the sshd server to configure `AcceptEnv` to accept them.

**Old Behavior**:

Rundeck would always send `RD_*` environment variables when making a SSH connection via JSCH.  However if the remote sshd server did not accept those variables, it would send an error that JSCH would quietly ignore.

**New Behavior**:

Because of the fix for connection timeout, JSCH no longer ignores the error response from remote sshd.  This can cause the SSH connection to fail unless the remote sshd server uses the `AcceptEnv` configuration.

As a safer default, Rundeck *no longer* sends `RD_*` environment variables by default.

You can turn on sending the remote environment variables with a new SSH configuration option `ssh-send-env` which is default to false.

You can enable this using at a global, project, or node level:

* Framework default for all nodes in all projects: `framework.ssh-send-env=true`
* Project default for all nodes in a project: `project.ssh-send-env=true`
* Node attribute for a single node: `ssh-send-env: true`

## rd-acl Tool Removed

The `rd-acl` CLI tool has been removed from the Rundeck server package. It has migrated to be an extension for [`rd`][rd], the official Rundeck CLI client tool.

The `rd acl` extension is bundled with `rd` version 1.3.0.

Invoke the command `rd acl` to replace the functionality of `rd-acl`.

Please report any issues on the [rd-ext-acl github](https://github.com/rundeck/rd-ext-acl).

[rd]: https://rundeck.github.io/rundeck-cli/

## Webhook Plugins

::: warning
Webhook Plugins built for Rundeck 3.2 will no longer work due to a Java interface change.
:::

Webhook plugins must now return a `WebhookResponder` from the `onEvent` method in the plugin. A `null` can be returned to use the `DefaultWebhookResponder`.

Please see the [Development > Webhook Plugins](/developer/16-webhook-plugins.md) document for more detail.

## Node step error handler behavior change

::: warning
Node Step error handlers will no longer run on all nodes from the original step, only on the failed nodes.
:::

A [bug fix](https://github.com/rundeck/rundeck/pull/6118) changes the behavior of Error Handlers for Node Steps: the error handler step will run only on the failed nodes of the step. Previously the error handler would execute on all nodes of the original step, regardless of which individual nodes failed.

## API Version Deprecation

API Version `11` is the current **API Deprecation Level**, and will become the **API Minimum Version** in future Rundeck release version `3.4.0`.

Clients using API version `10` or earlier should upgrade to use API version `11` minimum before then.

## Server session timeout property name change

If you have customized the `server.session.timeout` property in your installation, please update the property name to `server.servlet.session.timeout`
as this is the new correct property name.

## Docker Image Upgraded
:::warning
Installed plugins must be compatible with OpenJDK 11 for use with the official Docker image.
:::

The official Docker images have had their base OS upgraded from **Ubuntu 16.04 to Ubuntu 18.04**.

The installed JVM in this image is now **OpenJDK 11**.
