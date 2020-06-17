# Upgrading to Rundeck 3.3


::: tip
See other [Upgrading](/upgrading/) Documents if you are upgrading from 3.1 or earlier.
:::

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

## JSCH Timeout Notes

Old behavior used a timeout config of 0, causing an internal JSCH timeout of 20s, which caused some connections to fail. A new default timeout config is set for JSCH (instead of 0), this fixes the timeout issue in cases where the network is unstable.

By setting the timeout config, JSCH now responds differently to the case when remote sshd does not accept remote env vars, causing connections to fail when env vars are sent.

We added a new config `send-env-var` which is default to false, if you use `RD_*` env vars you can enable this by default using `framework.properties`, at project level using project properties or at node level.

## rd-acl Tool Removed

The `rd-acl` CLI tool has been removed from the Rundeck server package. It has migrated to be an extension for [`rd`][rd], the official Rundeck CLI client tool.

The `rd acl` extension is bundled with `rd` version 1.3.0.

Invoke the command `rd acl` to replace the functionality of `rd-acl`.

Please report any issues on the [rd-ext-acl github](https://github.com/rundeck/rd-ext-acl).

[rd]: https://rundeck.github.io/rundeck-cli/

## Webhook Plugins

:::warning
Webhook plugins must now return a `WebhookResponder` from the `onEvent` method in the plugin. A `null` can be returned to use the `DefaultWebhookResponder`.
:::

## Docker Notes
