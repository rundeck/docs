# Cyberark Key Storage Plugin (Enterprise)

Cyberark is a leader in Privileged Access Management solutions providing cloud ready, easy to use security solutions across the complete privileged access surface.  A centralized password management system provides visibility and control to protect privileges from attack.  Cyberark's solution is built for the Enterprise to enforce strong password business policies and prevent data breaches.

This storage plugin requires having the JRE installed, as well as the java keytool. In order to provide the correct authentication to the plugin, store the RootCA certificate, the client certificate and the client private key in key stores and specify them in `rundeck-config.properties`. For more information on creating/using a keystore, see [Java Keystore](https://www.ibm.com/docs/en/cognos-tm1/10.2.2?topic=ictocyoiatwas-add-certificates-jre-keystore). 

**Below is an example of how to import a certificate using the command-line:**
```bash
keytool -import -file "C:\Path\to\certificateFile.crt" -keystore "C:\Path\to\Keystore\Keystorename" -storepass "password"
```

**Below is an example of how to import another key store, likely containing the private key:**
```bash
keytool -importkeystore -deststorepass [password] -destkeystore [new-keystore.jks] -srckeystore [keystore-filename.p12] -srcstoretype PKCS12```
```

:::warning
If a full path is not specified for the new keystore, it will create the keystore in the directory the command was run from. Take note of all the keystore names and passwords as they are created, they will be needed to configure Rundeck. Once the certificates and private key are in keystore(s), add them to Rundeck using `rundeck-config.properties` or Rundeck Config Management, as shown below:
:::

:::: tabs
::: tab Configuration Management

Below is an example configuration, which can be configured using the *System Configuration* module. Add each setting as a configuration entry.

![Cyberark Configuration](@assets/img/cyberark-config.png)

![Cyberark Configuration - continued](@assets/img/cyberark-config2.png)

![Cyberark Configuration - continued](@assets/img/cyberark-config3.png)

:::

::: tab rundeck-config.properties
Alternatively the settings can be placed in `rundeck-config.properties`

```
rundeck.storage.provider.1.type=cyberark-storage
rundeck.storage.provider.1.path=keys
rundeck.storage.provider.1.removePathPrefix=true
rundeck.storage.provider.1.config.baseURL=https://your.cyberarkserver.com
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

- **type**
: This specifies the storage plugin to use. For Cyberark, the value should always be `cyberark-storage`.

- **path**
: The path in Rundeck storage tree to apply the plugin. If just `keys` is specified, then all keys added to Rundeck Key Storage will also be added to Cyberark.

- **removePathPrefix**
: By default, the storage plugin will be invoked using the full path that is requested. If set to true, the path used when invoking the storage plugin would not include the prefix. It is recommended to set it to true. If set to false, keys will not be displayed unless a directory is specified in Rundeck.

- **baseURL**
: The base URL for the cyberark account where the secrets should be saved. For example, `https://services-uscentral.skytap.com:18246`.

- **username**
: Username for an account with access to the secrets that will be used in Rundeck.

- **password**
: The password for a user in the account where the secrets should be stored.

- **appId**
: The app ID for the application with the safes to use secrets from.

- **platformId**
: Platform ID to use when creating a new secret from Rundeck's key storage. I.e. WinServerLocal

- **createUsername**
: Default user name applied when creating a new password entry in Cyberark.

- **clientKeystore**
: The path to the key store that contains the client certificate. (Must be of type `JKS`)

- **clientKeystorePassword**
: The password for the key store that contains the client certificate.

- **rootCAKeystore**
: The path to the key store containing the RootCA certificate. (Must be of type `JKS`)

- **rootCAKeystorePassword**
: The password for the key store containing the RootCA certificate.

- **privateKeyKeystore**
: The path to the key store containing the user's private key. (Must be of type `JKS`)

- **privateKeyKeystorePassword**
: The password for the key store containing the user's private key.

- **privateKeyAlias**
: The name the private key is saved under in the key store.

- **privateKeyPassword**
: Password to access the private key.

- **rootCAName**
: The name that the Root CA Certificate is saved under in the key store.

- **clientCertName**
: The name that the Client Certificate is saved under in the key store.

Once the configuration settings have been added to Rundeck, restart Rundeck. Following the restart and logging in, click on the gears icon in the top right corner of Rundeck. In that menu, there is "Key Storage." Select it and Cyberark keys will be shown at the path specified in the config above.  