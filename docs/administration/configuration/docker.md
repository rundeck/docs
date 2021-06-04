# Docker Configuration Reference

:::tip
**Check out the [Docker Zoo](https://github.com/rundeck/docker-zoo) for configuration examples
in Docker Compose!** These examples cover common configuration scenarios including
connecting to each supported database.
:::

## Security

**Environment variables**  
Locally run jobs run as the `rundeck` user, the same as the server, and may carry the
environment variables used when starting the server. By default all environment variables
starting with `RUNDECK_` are unset before starting Rundeck. See `RUNDECK_ENVARS_UNSETALL` and
`RUNDECK_ENVARS_UNSETS` below for unset options.

## SSH Keys

You can provide private ssh keys by mounting them into `/home/rundeck/.ssh`:  
`$ docker run --name some-rundeck -v /home/protip/.ssh:/home/rundeck/.ssh rundeck/rundeck`

**Kubernetes** users may wish to mount a private key in through the secrets system. See
Kubernetes documentation [Use-Case: Pod with ssh keys](https://kubernetes.io/docs/concepts/configuration/secret/#use-cases) for details.

[**Rundeck Key Storage**](https://docs.rundeck.com/docs/administration/projects/node-execution/ssh.html#using-key-storage-for-ssh) can be used to provide ssh keys to the ssh plugin as well.

## Control JVM heap allocation

`$ docker run -m 1024m`

The JVM is configured to use cgroup information to set the max heap allocation size.
The RAM percentage is set to `75` by default, so the JVM will utilize up to about 3/4 the container limit.
See `JVM_MAX_RAM_PERCENTAGE` for information on changing this.

## Key Store Security
By default keystorage is set to use the database, and the encryption converters are
**disabled**. To enable encryption, supply a password for one or both of the default converters:
```
RUNDECK_STORAGE_CONVERTER_1_CONFIG_PASSWORD=supersecret
RUNDECK_CONFIG_STORAGE_CONVERTER_1_CONFIG_PASSWORD=supersecret
```

> **Note:** It is not recommended to enable/disable encryption after initial project setup!
Refer to the [docs](http://rundeck.org/docs/administration/configuration/storage-facility.html) for more information.

## User Authentication
> **NOTE:** For extra reference and clarity, refer to the official docs.
For example configurations check out the Zoo.

* [Docs](/administration/security/authentication.md#ldap)
* [Zoo](https://github.com/rundeck/docker-zoo/tree/master/ldap-combined)

**Default**  
The default setup utilizes the `/home/rundeck/server/config/realm.properties` file. Mount
or otherwise replace this file to manage further users through this method.

**JAAS**  
There is initial support for composing the JAAS modules talk about in the docks.
The convention for listing the modules to use in environment variables:
```
RUNDECK_JAAS_MODULES_0=JettyCombinedLdapLoginModule
RUNDECK_JAAS_MODULES_1=PropertyFileLoginModule
```

Config keys are located under:
```
RUNDECK_JAAS_LDAP_*
RUNDECK_JAAS_FILE_*
```

By convention the module name matches the name in the docs, and the config keys match
the config options listed in the docs uppercase, and all one word.

To configure the LDAP module as sufficient, required, requisite, optional, you can use:
```
RUNDECK_JAAS_LDAP_FLAG
```
For further reference, please check [this documentation](/administration/security/authentication.md#multiple-authentication-modules)

## Extending Configuration

See the [Extending Configuration](/administration/configuration/docker/extending-configuration.md)
for complete details on extending the Docker application configuration.


## Environment Variables

Not all rundeck configuration listed in the official documentation is available for setup yet. Please take a look at the templates to see all available variables.

### Basic

`JVM_MAX_RAM_PERCENTAGE=75`

The JVM will use `x%` of the max RAM for heap. For example, a setting of `50` will cause
the JVM to utilize up to half the container limit for heap. The default is set to `75`.

`RUNDECK_SERVER_UUID`

Identifies Rundeck instances when multiple are running in the same cluster. While hard-coded
to a default for getting started, this should be set manually for more advanced configurations.

`RUNDECK_GRAILS_URL=http://127.0.0.1:4440`

Controls the base URL the app will use for links, redirects, etc.
This is the URL users will use to access the site.

`RUNDECK_SERVER_CONTEXTPATH=/`

Set to path Rundeck is running under(i.e. `http://localhost/rundeck`). Useful if running Rundeck
behind a reverse proxy under a path on the hostname.

`RUNDECK_SERVER_FORWARDED=false`

Set to `true` if running behind a reverse proxy. `X-Forwarded-Proto` header must be set
if running behind a TLS terminating proxy.

`RUNDECK_GRAILS_UPLOAD_MAXSIZE`

Controls both the `maxFileSize` and `maxRequest` for the grails controller config and `maxsize`
for the Rundeck fileUploadService tempfile config.

The internal default is approximately `25Mib` or `26214400`.

`RUNDECK_SERVER_ADDRESS=0.0.0.0`

This is the address or hostname the application will attempt to bind to within
the container.

`RUNDECK_DATABASE_URL`

Defaults to `jdbc:h2:file:/home/rundeck/server/data/grailsdb;MVCC=true`. The default configuration utilizes an h2 file for data storage.

### Database

`RUNDECK_DATABASE_DRIVER`

Set this if using an alternative backend from h2.

- `org.postgresql.Driver`
- `org.mariadb.jdbc.Driver`
- `com.mysql.jdbc.Driver` (Must download the jar.  It is not bundled with Rundeck.)

`RUNDECK_DATABASE_USERNAME`

`RUNDECK_DATABASE_PASSWORD`

### Logging

`RUNDECK_LOGGING_STRATEGY=CONSOLE`

The default console strategy configures log4j to send all output to stdout
to be collected by the container logging driver.

Set to `FILE` to log into `/home/rundeck/server/logs` .

`RUNDECK_LOGGING_AUDIT_ENABLED`

Set to anything enables audit logging. This can be very verbose so use with caution.

### Key Storage

`RUNDECK_STORAGE_PROVIDER_#_[[TYPE|PATH]|CONFIG_[...]]`
`RUNDECK_STORAGE_CONVERTER_#_[[TYPE|PATH]|CONFIG_[...]]`

Configuration options for key storage providers and converts. These map to the
[Storage Facility Docs](/administration/configuration/storage-facility.md).


### Authentication

`RUNDECK_PREAUTH_ENABLED=false`
`RUNDECK_PREAUTH_ATTRIBUTE_NAME=REMOTE_USER_GROUPS`
`RUNDECK_PREAUTH_DELIMITER=,`
`RUNDECK_PREAUTH_USERNAME_HEADER=X-Forwarded-Uuid`
`RUNDECK_PREAUTH_ROLES_HEADER=X-Forwarded-Roles`
`RUNDECK_PREAUTH_REDIRECT_LOGOUT=false`
`RUNDECK_PREAUTH_REDIRECT_URL=/oauth2/sign_in`
Configuration options for using the
[preauthenticated mode](/administration/security/authenticating-users.md#preauthenticated-mode).

`RUNDECK_TOKENS_FILE`
Specify location of a static tokens file. See [configuration file reference](/administration/configuration/configuration-file-reference.md) for details.

### Security Headers

`RUNDECK_SECURITY_HTTPHEADERS_ENABLED=true`
`RUNDECK_SECURITY_HTTPHEADERS_PROVIDER_XCTO_ENABLED=true`
`RUNDECK_SECURITY_HTTPHEADERS_PROVIDER_XXSSP_ENABLED=true`
`RUNDECK_SECURITY_HTTPHEADERS_PROVIDER_XFO_ENABLED=true`
`RUNDECK_SECURITY_HTTPHEADERS_PROVIDER_CSP_ENABLED=true`
`RUNDECK_SECURITY_HTTPHEADERS_PROVIDER_CSP_CONFIG_INCLUDEXCSPHEADER=false`
`RUNDECK_SECURITY_HTTPHEADERS_PROVIDER_CSP_CONFIG_INCLUDEXWKCSPHEADER=false`
`RUNDECK_SECURITY_HTTPHEADERS_PROVIDER_CSP_CONFIG_POLICY`

Controls for CSP headers.

### Email

`RUNDECK_MAIL_SMTP_HOST`
`RUNDECK_MAIL_SMTP_PORT`
`RUNDECK_MAIL_SMTP_USERNAME`
`RUNDECK_MAIL_SMTP_PASSWORD`
`RUNDECK_MAIL_FROM`
Default from address.
`RUNDECK_MAIL_DEFAULT_TEMPLATE_SUBJECT`
`RUNDECK_MAIL_DEFAULT_TEMPLATE_FILE`
`RUNDECK_MAIL_DEFAULT_TEMPLATE_LOG_FORMATTED`

`RUNDECK_MAIL_PROPS`
Mail properties that get passed through to Grails. For example, to use StartTLS(required by many servers including AWS SES), `["mail.smtp.starttls.enable":"true","mail.smtp.port":"587"]`.


`RUNDECK_ENVARS_UNSETALL=true`
Unsets all environment variables starting with `RUNDECK_` before starting Rundeck. Set to `false`
to utilize the `RUNDECK_ENVARS_UNSETS` option.

`RUNDECK_ENVARS_UNSETS`
Set to a space-separated list of environment variables to unset before starting Rundeck.

### Thread Pools

`RUNDECK_QUARTZ_THREADPOOL_THREADCOUNT`
Set the threadCount value to the max number of threads you want to run concurrently. If not set, default to 10.

## Enterprise Environment Variables

`RUNDECK_SERVER_TAGS`

### Authentication

`RUNDECK_SECURITY_DBLOGIN_ENABLED`  
`RUNDECK_SECURITY_DBLOGIN_CREATEADMINUSERANDROLES`  
`RUNDECK_SECURITY_DBLOGIN_ADMINUSERNAME=rdadmin`  
`RUNDECK_SECURITY_DBLOGIN_ADMINPASSWORD`  

#### Okta

`RUNDECK_PLUGIN_OKTAGROUPSOURCE_ENABLED=false`  
`RUNDECK_PLUGIN_OKTAGROUPSOURCE_APITOKEN`  
`RUNDECK_PLUGIN_OKTAGROUPSOURCE_OKTAHOSTNAME`  
`RUNDECK_PLUGIN_OKTAGROUPSOURCE_INCLUDEGROUPTYPES=APP_GROUP`  

#### SSO Options

`RUNDECK_SECURITY_OAUTH_ENABLED=false`  
`RUNDECK_SSO_LOGINBUTTON_ENABLED=true`  
`RUNDECK_SSO_LOGINBUTTON_TITLE=Login With SSO`  
`RUNDECK_SSO_LOGINBUTTON_URL=oauth/okta`  

#### OAUTH
For oauth configuration below replace `XXXX` with the provider name(ie `okta`).
See the [SSO Documentation](/administration/security/sso.md) for more information.

`RUNDECK_SECURITY_OAUTH_XXXX_CLIENTID`
`RUNDECK_SECURITY_OAUTH_XXXX_CLIENTSECRET`

`RUNDECK_SECURITY_OAUTH_XXXX_ACCESSTOKENURI`
`RUNDECK_SECURITY_OAUTH_XXXX_USERAUTHORIZATIONURI`
`RUNDECK_SECURITY_OAUTH_XXXX_USERINFOURI`
`RUNDECK_SECURITY_OAUTH_XXXX_JWKSETURI`

`RUNDECK_SECURITY_OAUTH_XXXX_AUTOCONFIGURL`

`RUNDECK_SECURITY_OAUTH_XXXX_CUSTOMREDIRECTURI`
`RUNDECK_SECURITY_OAUTH_XXXX_AUTHORITYPROPERTY`
`RUNDECK_SECURITY_OAUTH_XXXX_AUTHORITYKEYS`
`RUNDECK_SECURITY_OAUTH_XXXX_AUTHORITYASCOMMASEPARATEDSTRING`
`RUNDECK_SECURITY_OAUTH_XXXX_PRINCIPLEKEYS`
`RUNDECK_SECURITY_OAUTH_XXXX_CLIENTAUTHENTICATIONSCHEMA`
`RUNDECK_SECURITY_OAUTH_XXXX_SCOPE`

### Cluster

`RUNDECK_PLUGIN_CLUSTER_HEARTBEAT_CONSIDERDEAD=180`  
`RUNDECK_PLUGIN_CLUSTER_AUTOTAKEOVER_ENABLED=true`  
`RUNDECK_PLUGIN_CLUSTER_AUTOTAKEOVER_POLICY=any`  
`RUNDECK_PLUGIN_CLUSTER_AUTOTAKEOVER_CONFIG_ALLOWED`  
`RUNDECK_PLUGIN_CLUSTER_AUTOTAKEOVER_DELAY=30`  
`RUNDECK_PLUGIN_CLUSTER_AUTOTAKEOVER_SLEEP=30`  

`RUNDECK_PLUGIN_CLUSTER_REMOTEEXECUTION_ENABLED=true`  
`RUNDECK_PLUGIN_CLUSTER_REMOTEEXECUTION_POLICY=Random`  
`RUNDECK_PLUGIN_CLUSTER_REMOTEEXECUTION_PREFERREDTAGS=*`  
`RUNDECK_PLUGIN_CLUSTER_REMOTEEXECUTION_ACTIVEONLY=true`  

### Execution Log Storage

#### S3

`RUNDECK_PLUGIN_EXECUTIONFILESTORAGE_NAME`  

Set to `com.rundeck.rundeckpro.amazon-s3`

`RUNDECK_PLUGIN_EXECUTIONFILESTORAGE_S3_BUCKET`  
`RUNDECK_PLUGIN_EXECUTIONFILESTORAGE_S3_REGION`  
`RUNDECK_PLUGIN_EXECUTIONFILESTORAGE_S3_AWSACCESSKEYID`  
`RUNDECK_PLUGIN_EXECUTIONFILESTORAGE_S3_AWSSECRETKEY`  
:::warning
It is recommended to use ec2 instance roles or another credential chain source if possible.
:::

`RUNDECK_PLUGIN_EXECUTIONFILESTORAGE_S3_ENDPOINT`  
`RUNDECK_PLUGIN_EXECUTIONFILESTORAGE_S3_PATHSTYLE=false`  
`RUNDECK_PLUGIN_EXECUTIONFILESTORAGE_S3_ALLOWDELETE`  
