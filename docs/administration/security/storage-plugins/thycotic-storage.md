# Thycotic Storage Plugin (Enterprise)

Thycotic is a leader in Privileged Access Management solutions providing cloud ready, easy to use security solutions across the complete privileged access surface.  A centralized password management system provides visibility and control to protect privileges from attack.  Thycotic's solution is built for the Enterprise to enforce strong password business policies and prevent data breaches.  [Read more about their solution here](https://thycotic.com/solutions/enterprise-password-management/).

Rundeck Enterprise users have access to the Thycotic Storage Plugin which can be used to access password/key data stored in a Thycotic Secret Server.

:::: tabs
::: tab Configuration Management

Below is an example configuration, which can be configured using the *System Configuration* module. Add each setting as a configuration entry.

![Thycotic Configuration](@assets/img/thycotic-config-screen.png)

:::
::: tab rundeck-config.properties
Alternatively the settings can be placed in `rundeck-config.properties`

```
rundeck.storage.provider.1.type=thycotic-storage
rundeck.storage.provider.1.path=keys
rundeck.storage.provider.1.removePathPrefix=true
rundeck.storage.provider.1.config.username=thycotic-username
rundeck.storage.provider.1.config.password=password
rundeck.storage.provider.1.config.address=https://example.secretservercloud.com
rundeck.storage.provider.1.config.allowSelfSignedCert=true
```
:::
::::

### Setting Descriptions

- **Type**
: This specifies the storage plugin to use. For Thycotic, the value should always be `thycotic-storage`.

- **Path**
: The path in Rundeck storage tree to apply the plugin. If just `keys` is specified, then all keys and directories added to Rundeck Key Storage will also be added to Thycotic.

- **removePathPrefix**
: By default, the storage plugin will be invoked using the full path that is requested. If set to true, the path used when invoking the storage plugin would not include the prefix. It is recommended to set it to true. If set to false, keys will not be displayed unless a directory is specified in Rundeck.

- **Username**
: Username for an account with access to the secrets that will be used in Rundeck.

- **Password**
: The password for a user in the account where the secrets should be stored.

- **Address**
: The base URL for the secret server account where the secrets should be saved. For example, `https://example.secretservercloud.com`.

- **allowSelfSignedCert**
: Set to true if wishing to use self-signed certificates to access the Thycotic server.
