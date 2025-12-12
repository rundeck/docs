# Hashicorp Vault - Key Storage Plugin

[Hashicorp Vault](https://www.vaultproject.io/) is a tool for securely accessing secrets. A secret is anything that you want to tightly control access to, such as API keys, passwords, or certificates. Vault provides a unified interface to any secret, while providing tight access control and recording a detailed audit log.

Rundeck offers a [Key Storage Backend](/manual/key-storage/index.md#key-data-storage-converter) plugin for storing Key Store data in [Vault](https://www.vaultproject.io/) and has been verified to work with HCP Vault.

A more [detailed installation How To](/learning/howto/vault-integration.md) is available in our learning section.

::: tabs
@tab Enterprise Installation

This plugin is bundled with the Enterprise version.  No installation steps required.

@tab Community Installation
  * Download and start [Rundeck](https://www.rundeck.com/downloads). It will automatically create the necessary directories.
  * Clone this repository. Build using `gradle` wrapper:
    ```
      ./gradlew clean build
    ```
  * Drop `rundeck-vault-plugin-<version>.jar` to `libext/` under Rundeck installation directory.
  * Restart Rundeck.

:::

## Configuration

### Quick Start

::: tabs

For existing vault storage, it is recommended to remove the default `keys` path added by default for rundeck.
You can use these settings for an existing vault storage.

@tab Enterprise Config

Example configuration using the *System Configuration* module:

![Vault Storage Config](/assets/img/keystorage-vault-config1.png)

![Vault Storage Config](/assets/img/keystorage-vault-config2.png)

![Vault Storage Config](/assets/img/keystorage-vault-config3.png)

![Vault Storage Config](/assets/img/keystorage-vault-config4.png)

@tab rundeck-config.properties

```
rundeck.storage.provider.1.type=vault-storage
rundeck.storage.provider.1.path=keys
rundeck.storage.provider.1.config.prefix=someprefix
rundeck.storage.provider.1.config.secretBackend=mybackend
rundeck.storage.provider.1.config.address=https://vaulturl.site
rundeck.storage.provider.1.config.token=tokenvalue
rundeck.storage.provider.1.config.storageBehaviour=vault
```

:::

### Settings Descriptions

Add the settings to the **System Configuration** module (3.4.0+ Enterprise) or `$RDECK_BASE/etc/rundeck-config.properties`.

>Note: These settings will require a restart of Rundeck to take effect.

* **prefix**: Vault Prefix in Vault secret backend

```
rundeck.storage.provider.[index].config.prefix=rundeck
```

* **address**: Vault Address of the Vault server

```
rundeck.storage.provider.[index].config.address=https://vaultURL:8200
```

* **authBackend**: Vault Authentication backend

```
rundeck.storage.provider.[index].config.authBackend=authBackend
```

Default value: token

Allowed values: approle, cert, github, token, userpass

* **token**: Vault authentication token. Required, if authentication backend is 'token'

```
rundeck.storage.provider.[index].config.token=xxxxxx
```


* **username**: User name. Required for user/password and LDAP authentication backend

```
rundeck.storage.provider.[index].config.username=username
```

* **password**: Password. Required for user/password and LDAP authentication backend
```
rundeck.storage.provider.[index].config.password=password
```

* **approleId**:  AppRole role ID. The role-id used for authentication
```
rundeck.storage.provider.[index].config.approleId=approleId
```

* **approleSecretId**:  AppRole secret ID. The secret-id used for authentication

```
rundeck.storage.provider.[index].config.approleSecretId=approleSecretId
```

* **approleAuthMount**:  AppRole mount name. The mount name of the AppRole authentication back end
```
rundeck.storage.provider.[index].config.approleAuthMount=approleAuthMount
```

* **githubToken**: GitHub token. The app-id used for authentication
```
rundeck.storage.provider.[index].config.githubToken=githubToken
```

* **certAuthMount**: TLS Certificate auth mount path. The mount path where the TLS Certificate auth method is enabled in Vault. Only required when using `authBackend=cert`.

```
rundeck.storage.provider.[index].config.certAuthMount=cert
```

Default value: cert

### TLS/SSL Certificate Configuration

The plugin supports certificates for two distinct purposes:

#### 1. Client Authentication Certificates (when authBackend=cert)

These certificates authenticate Rundeck to Vault using the [TLS Certificate auth method](https://developer.hashicorp.com/vault/docs/auth/cert). Choose **ONE** of the following options:

**Option A: Java KeyStore (JKS) Format**

* **keyStoreFile**: Path to a Java KeyStore (JKS) file containing both the client certificate and its private key that are registered with Vault's TLS Certificate auth backend.

```
rundeck.storage.provider.[index].config.keyStoreFile=/path/to/client-keystore.jks
```

* **keyStoreFilePassword**: Password to decrypt and access the keystore file.

```
rundeck.storage.provider.[index].config.keyStoreFilePassword=keystorePassword
```

**Option B: PEM Format**

* **clientPemFile**: Path to the client certificate file in PEM format (X.509 certificate) that is registered with Vault's TLS Certificate auth backend.

```
rundeck.storage.provider.[index].config.clientPemFile=/path/to/client-cert.pem
```

* **clientKeyPemFile**: Path to the client's private key file in unencrypted PEM format (RSA or ECDSA private key) corresponding to the client certificate.

```
rundeck.storage.provider.[index].config.clientKeyPemFile=/path/to/client-key.pem
```

#### 2. Server Trust Certificates (SSL Verification)

These certificates verify the Vault server's identity when connecting over HTTPS. Choose **ONE** of the following options:

**Option A: Java TrustStore (JKS) Format**

* **trustStoreFile**: Path to a JKS truststore file containing the Certificate Authority (CA) certificate or the Vault server's certificate used to verify the Vault server's SSL certificate.

```
rundeck.storage.provider.[index].config.trustStoreFile=/path/to/truststore.jks
```

* **trustStoreFilePassword**: Password to decrypt and access the truststore file.

```
rundeck.storage.provider.[index].config.trustStoreFilePassword=truststorePassword
```

**Option B: PEM Format**

* **pemFile**: Path to the Certificate Authority (CA) certificate or Vault server's certificate in PEM format (X.509 certificate) used to verify the Vault server's SSL certificate.

```
rundeck.storage.provider.[index].config.pemFile=/path/to/vault-ca.pem
```

>**Note**: For production environments using TLS certificate authentication, you typically need to configure **both** client authentication certificates (Option A or B from section 1) **and** server trust certificates (Option A or B from section 2).

* **(Enterprise Config) Namespace**: Define the Hashicorp namespace for the integration.  If root is needed leave blank or set to `root/`
```
rundeck.storage.provider.[index].config.namespace=hashicorpNamespace
```

* **authNamespace**: When using Namespaces if the user or AppRole is in a different namespace than the password entries use this to set the namespace where Authentication should take place.  If left blank the _namespace_ entry from above will be used (if set).  To use the _root_ namespace set to `root/`.
```
rundeck.storage.provider.[index].config.authNamespace=namespace_for_auth
```

* **validateSsl**:  Enable/Disable SSL validation. Specifies whether SSL validation is to be performed
```
rundeck.storage.provider.[index].config.validateSsl=true/false
```
Default value: true

* **maxRetries**:  Max retries. Maximum number of connection retries to Vault server
```
rundeck.storage.provider.[index].config.maxRetries=5
```

Default value: 5

* **retryIntervalMilliseconds**:  Retry interval. Connection retry interval, ms
```
rundeck.storage.provider.[index].config.retryIntervalMilliseconds=1000
```

Default value: 1000

* **openTimeout**:  Open timeout. Connection opening timeout, ms
```
rundeck.storage.provider.[index].config.openTimeout=5
```

Default value: 5

* **readTimeout**:  Read timeout. Response read timeout, ms

```
rundeck.storage.provider.[index].config.readTimeout=20
```

Default value: 20

* **secretBackend**:  Secret Backend. The secret backend to use in vault

```
rundeck.storage.provider.[index].config.secretBackend=secret
```

Default value: secret

* **storageBehaviour**:  Storage Behaviour. Use the default Rundeck Behaviour for key storage (with rundeck headers) or use just the key/value behaviour from vault. Options are: rundeck, vault
```
rundeck.storage.provider.[index].config.storageBehaviour=vault/rundeck
```
Default value: rundeck

* **engineVersion**: Vault Engine Version Key/Value Secret Engine Config

```
rundeck.storage.provider.[index].config.engineVersion=1/2
```
Default value: 1

* **removePathPrefix**: Remove Rundeck's prefix path (keys/...) in Vault's items path

```
rundeck.storage.provider.[index].removePathPrefix=true
```
Default value: false

### More Configuration Examples


#### **example basic settings**
```
rundeck.storage.provider.1.type=vault-storage
rundeck.storage.provider.1.path=keys
rundeck.storage.provider.1.removePathPrefix=true
rundeck.storage.provider.1.config.prefix=rundeck
rundeck.storage.provider.1.config.secretBackend=secret
rundeck.storage.provider.1.config.address=$VAULT_URL
rundeck.storage.provider.1.config.token=$VAULT_TOKEN
```

#### **existing vault storage**

For existing vault storage, probably you will need to remove the default `keys` path added by default for rundeck.
You can use these settings for an existing vault storage:

```
rundeck.storage.provider.1.type=vault-storage
rundeck.storage.provider.1.path=keys
rundeck.storage.provider.1.config.prefix=someprefix
rundeck.storage.provider.1.config.secretBackend=mybackend
rundeck.storage.provider.1.config.address=$VAULT_URL
rundeck.storage.provider.1.config.token=$VAULT_TOKEN
rundeck.storage.provider.1.config.storageBehaviour=vault
```

#### **Using APPROLE authentication and Namespaces**

You can use these settings for an existing vault storage:

```
rundeck.storage.provider.1.type=vault-storage
rundeck.storage.provider.1.path=keys
rundeck.storage.provider.1.config.prefix=app
rundeck.storage.provider.1.config.secretBackend=secret
rundeck.storage.provider.1.config.address=$VAULT_URL
rundeck.storage.provider.1.config.engineVersion=2
rundeck.storage.provider.1.config.storageBehaviour=vault
rundeck.storage.provider.1.config.namespace=training/engineering

#auth
rundeck.storage.provider.1.config.authBackend=approle
rundeck.storage.provider.1.config.approleAuthMount=approle
rundeck.storage.provider.1.config.approleId=$VAULT_APPROLE_ID
rundeck.storage.provider.1.config.approleSecretId=$VAULT_APPROLE_SECRET_ID
rundeck.storage.provider.1.config.authNamespace=training

#timeouts
rundeck.storage.provider.1.config.maxRetries=500
rundeck.storage.provider.1.config.retryIntervalMilliseconds=2
rundeck.storage.provider.1.config.openTimeout=2500
rundeck.storage.provider.1.config.readTimeout=2500
```

#### **Using TLS Certificate authentication**

**Example with JKS format (Java KeyStore):**

```
rundeck.storage.provider.1.type=vault-storage
rundeck.storage.provider.1.path=keys
rundeck.storage.provider.1.config.prefix=rundeck
rundeck.storage.provider.1.config.secretBackend=secret
rundeck.storage.provider.1.config.address=https://vault.example.com:8200
rundeck.storage.provider.1.config.engineVersion=2

# TLS Certificate Authentication
rundeck.storage.provider.1.config.authBackend=cert
rundeck.storage.provider.1.config.certAuthMount=cert

# Client authentication certificate (JKS format)
rundeck.storage.provider.1.config.keyStoreFile=/etc/rundeck/certs/client-keystore.jks
rundeck.storage.provider.1.config.keyStoreFilePassword=keystorePassword

# Server trust certificate (JKS format)
rundeck.storage.provider.1.config.trustStoreFile=/etc/rundeck/certs/truststore.jks
rundeck.storage.provider.1.config.trustStoreFilePassword=truststorePassword

# SSL validation
rundeck.storage.provider.1.config.validateSsl=true
```

**Example with PEM format:**

```
rundeck.storage.provider.1.type=vault-storage
rundeck.storage.provider.1.path=keys
rundeck.storage.provider.1.config.prefix=rundeck
rundeck.storage.provider.1.config.secretBackend=secret
rundeck.storage.provider.1.config.address=https://vault.example.com:8200
rundeck.storage.provider.1.config.engineVersion=2

# TLS Certificate Authentication
rundeck.storage.provider.1.config.authBackend=cert
rundeck.storage.provider.1.config.certAuthMount=cert

# Client authentication certificate (PEM format)
rundeck.storage.provider.1.config.clientPemFile=/etc/rundeck/certs/client-cert.pem
rundeck.storage.provider.1.config.clientKeyPemFile=/etc/rundeck/certs/client-key.pem

# Server trust certificate (PEM format)
rundeck.storage.provider.1.config.pemFile=/etc/rundeck/certs/vault-ca.pem

# SSL validation
rundeck.storage.provider.1.config.validateSsl=true
```

**Requirements for TLS Certificate Authentication:**

1. The TLS Certificate auth method must be [enabled in Vault](https://developer.hashicorp.com/vault/docs/auth/cert)
2. The client certificate must be registered with the Vault TLS Certificate auth backend
3. The certificate must have appropriate policies assigned in Vault
4. File paths must be absolute paths accessible by the Rundeck process
5. PEM files must be in unencrypted format with UTF-8 encoding


## Vault API versions

Since version 1.3.1, this plugin can work with `kV Secrets Engine - Version 2`.
A new config variable was added in order to set the API version that you need to use:

rundeck.storage.provider.1.config.engineVersion=1/2

* engineVersion=1 will work with vault version 0.x
* engineVersion=2 will work with vault version 1.x

Example:

```
rundeck.storage.provider.1.type=vault-storage
rundeck.storage.provider.1.path=keys
rundeck.storage.provider.1.config.prefix=rundeck
rundeck.storage.provider.1.config.secretBackend=secret
rundeck.storage.provider.1.config.address=$VAULT_URL
rundeck.storage.provider.1.config.token=$VAULT_TOKEN
rundeck.storage.provider.1.config.engineVersion=2
```

By default, the value is set to v1 (1)

Also note that [V2 of the kV Secrets Engine](https://developer.hashicorp.com/vault/docs/secrets/kv/kv-v2#acl-rules) requires updates/changes to any policies you might be using to limit access.

If access is limited to a specific subfolder the following example policy can be used to confirm you have given the proper access for Rundeck to manage the keys.

```
path "secret_v2/data/your/path/here/*" {
    capabilities = ["create", "read", "update"]
}

path "secret_v2/metadata/your/path/here/*" {
    capabilities = ["read", "delete", "list"]
}

path "secret_v2/delete/your/path/here/*" {
    capabilities = ["update"]
}
```

## Minimal version requirements
  * Rundeck 3.3.0
  * Vault 0.9.0

## Thanks
  * [BetterCloud/vault-java-driver](https://github.com/BetterCloud/vault-java-driver) made this possible.
