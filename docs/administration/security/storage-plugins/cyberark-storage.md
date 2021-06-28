# Cyberark Key Storage Plugin (Enterprise)

Cyberark is a leader in Privileged Access Management solutions providing cloud ready, easy to use security solutions across the complete privileged access surface.  A centralized password management system provides visibility and control to protect privileges from attack.  Cyberark's solution is built for the Enterprise to enforce strong password business policies and prevent data breaches.

Note: this storage plugin requires having the JRE installed, as well as the java keytool. In order to provide the correct authentication to the plugin, you will need to store all keys and certificates in key stores and specify them in `rundeck-config.properties`. For more information on creating/using a keystore, see [Java Keystore](https://www.ibm.com/docs/en/cognos-tm1/10.2.2?topic=ictocyoiatwas-add-certificates-jre-keystore). 

:::: tabs
::: tab Configuration Management

Below is an example configuration, which can be configured using the *System Configuration* module. Add each setting as a configuration entry.

![Cyberark Configuration](@assets/img/cyberark-config.png)

![Cyberark Configuration - continued](@assets/img/cyberark-config2.png)

:::
::: tab rundeck-config.properties
Alternatively the settings can be placed in `rundeck-config.properties`

```
rundeck.storage.provider.1.type=cyberark-storage
rundeck.storage.provider.1.path=keys
rundeck.storage.provider.1.removePathPrefix=true
rundeck.storage.provider.1.config.baseURL=https://services-uscentral.skytap.com:18246
rundeck.storage.provider.1.config.username=[username]
rundeck.storage.provider.1.config.password=[password]
rundeck.storage.provider.1.config.appId=testappid
rundeck.storage.provider.1.config.platformId=WinServerLocal
rundeck.storage.provider.1.config.createUsername=[createUsername]
rundeck.storage.provider.1.config.clientKeyStore=/Users/chrismcg/cyberark_test_app/cyberArkKeyStore
rundeck.storage.provider.1.config.clientKeyStorePassword=[password]
rundeck.storage.provider.1.config.rootCAKeyStore=/Users/chrismcg/cyberark_test_app/cyberArkKeyStore
rundeck.storage.provider.1.config.rootCAKeyStorePassword=[password]
rundeck.storage.provider.1.config.privateKeyStore=/Users/chrismcg/cyberark_test_app/privateKeyStore
rundeck.storage.provider.1.config.privateKeyStorePassword=[password]
rundeck.storage.provider.1.config.privateKeyPassword=[password]
rundeck.storage.provider.1.config.privateKeyName=client_1-28
rundeck.storage.provider.1.config.rootCAName=rootca
rundeck.storage.provider.1.config.clientCertName=clientcert
```
:::
::::

### Setting Descriptions
All of the following are required.

- **Type**
: This specifies the storage plugin to use. For Cyberark, the value should always be `cyberark-storage`.

- **Path**
: The path in Rundeck storage tree to apply the plugin. If just `keys` is specified, then all keys added to Rundeck Key Storage will also be added to Cyberark.

- **removePathPrefix**
: By default, the storage plugin will be invoked using the full path that is requested. If set to true, the path used when invoking the storage plugin would not include the prefix. It is recommended to set it to true. If set to false, keys will not be displayed unless a directory is specified in Rundeck.

- **Base URL**
: The base URL for the cyberark account where the secrets should be saved. For example, `https://services-uscentral.skytap.com:18246`.

- **Username**
: Username for an account with access to the secrets that will be used in Rundeck.

- **Password**
: The password for a user in the account where the secrets should be stored.

- **AppID**
: The app ID for the application with the safes to use secrets from.

- **Platform ID**
: Platform ID to use when creating a new secret from Rundeck's key storage. I.e. WinServerLocal

- **Create Username**
: Username to create new accounts in Cyberark with.

- **Client Keystore**
: The path to the key store that contains the client certificate. (Must be of type `JKS`)

- **Client Keystore Password**
: The password for the key store that contains the client certificate.

- **Root CA Keystore**
: The path to the key store containing the RootCA certificate. (Must be of type `JKS`)

- **Root CA Keystore Password**
: The password for the key store containing the RootCA certificate.

- **Private Key Keystore**
: The path to the key store containing the user's private key. (Must be of type `JKS`)

- **Private Key Keystore Password**
: The password for the key store containing the user's private key.

- **Private Key Alias**
: The name the private key is saved under in the key store.

- **Private Key Password**
: Password to access the private key.

- **Root CA Certificate Alias**
: The name that the Root CA Certificate is saved under in the key store.

- **Client Certificate Alias**
: The name that the Client Certificate is saved under in the key store.
