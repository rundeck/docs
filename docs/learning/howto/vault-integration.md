# How to integrate Hashicorp Vault with PagerDuty Process Automation & Rundeck Community

Out-of-the-box, both PagerDuty Process Automation (PPA) & Rundeck Community store all the keys and passwords in their own Key Storage using the database backend. Many people prefer to use a central Key Storage server to access all keys and passwords from a single secure location. This avoids saving secrets in multiple locations and reduces the risk of key/password leaks. 

Some users prefer to integrate PPA/Rundeck Community with their Secrets Management solution rather than using the native product functionality. In this article, we demonstrate how to integrate PPA/Rundeck Community with the Hashicorp Vault plugin.

## Hashicorp Vault

[Vault](https://www.vaultproject.io/) is an identity-based secret and encryption management system. A secret is anything that you want to tightly control access to, such as API encryption keys, passwords, or certificates. Vault provides encryption services that are gated by authentication and authorization methods. Using Vault’s UI, CLI, or HTTP API, access to secrets and other sensitive data can be securely stored and managed, tightly controlled (restricted), and auditable.

### Test Vault server

Before integrating Vault with PPA or Rundeck you need to test the Vault server. If you don’t already have Vault installed, To do that follow these steps: 



1. Download the Vault binary [here](https://www.vaultproject.io/downloads).
1. Uncompress the file and save the executable in a specific location in this example is saved on `/home/user/Programs/vault`
1. Start the server with `./vault server -dev` command.
1. Check the output, you can see the Vault server URL and use the token to access it.<br>
![](~@assets/img/Vault1.png)<br>
Checking the VAULT_ADDR URL in any browser you can see the Vault web interface.  Use the Vault output’s Root Token to enter.<br>
![](~@assets/img/Vault2.png)<br>
![](~@assets/img/Vault3.png)<br>


## Configuring Vault with PPA / Rundeck

:::: tabs
::: tab PagerDuty Process Automation

The Vault Storage plugin is bundled by default with PagerDuty Process Automation (formerly Rundeck Enterprise).  To use the plugin, you need to add properties using the [System Configuration](https://docs.rundeck.com/docs/manual/configuration-mgmt/configmgmt.html#managing-configuration) feature.

PPA includes a Configuration Management module to set configuration settings via the GUI and store them in the product database. Database storage shares configuration options with all your cluster members and centralizes configuration. 



1. Click on the gear icon (upper right) and select “System Configuration”.
1. Add these properties:<br>
    ![](~@assets/img/Vault4.png)<br>
    Replace “someprefix” by `rundeck`, “mybackend” by `secret`, “https://vaulturl.site” by <code>[http://127.0.0.1:8200](http://127.0.0.1:8200) (</code>VAULT_ADDR)<code>, </code>“tokenvalue”<code> </code>by<code> </code>the Vault access token<code>, </code>and ”vault” by <code>rundeck.</code><br>
1. Restart the PDPA / Rundeck service.
1. To save a key or password, just click on the Gear Icon (Up to right) select “Key Storage” and save the password or key on any path.<br>
![](~@assets/img/Vault5.png)<br>
1. From the Vault side, check the secret/rundeck path and see the stored key.<br>
![](~@assets/img/Vault6.png)<br>

:::
::: tab Rundeck Community
1. Stop the Rundeck service.
1. Download the Vault Storage Plugin jar file from [here](https://github.com/rundeck-plugins/vault-storage/releases) and save it to the `libext` directory.
1. Open the `rundeck-config.properties` file, comment the following lines:
    ```
    rundeck.storage.provider.1.type=db
    rundeck.storage.provider.1.path=keys

    ```
1. Then add the following config:
    ```
    rundeck.storage.provider.1.type=vault-storage
    rundeck.storage.provider.1.path=keys
    rundeck.storage.provider.1.removePathPrefix=false
    rundeck.storage.provider.1.config.prefix=rundeck
    rundeck.storage.provider.1.config.address=http://127.0.0.1:8200
    rundeck.storage.provider.1.config.token=hvs.uN51uG4C3Tg5PGNX7KzmPYFY
    rundeck.storage.provider.1.config.storageBehaviour=rundeck
    rundeck.storage.provider.1.config.secretBackend=secret
    rundeck.storage.provider.1.config.maxRetries=3
    rundeck.storage.provider.1.config.retryIntervalMilliseconds=100
    rundeck.storage.provider.1.config.openTimeout=3
    rundeck.storage.provider.1.config.readTimeout=5
    rundeck.storage.provider.1.config.engineVersion=2
    ```
    Some properties explained:<br>
    * `rundeck.storage.provider.[index].config.prefix`: Vault Prefix in Vault secret backend.<br>
    * `rundeck.storage.provider.[index].config.address`: Vault Address of the Vault server<br>
    * `rundeck.storage.provider.[index].config.token`: Vault authentication token. Required, if authentication backend is 'token'<br>
    * `rundeck.storage.provider.[index].config.maxRetries`: Maximum number of connection retries to Vault server.<br>
    * `rundeck.storage.provider.[index].config.retryIntervalMilliseconds`: Retry interval. Connection retry interval, defined in ms.<br>
    * `rundeck.storage.provider.[index].config.openTimeout:` Open timeout. Connection opening timeout, in seconds.<br>
    * `rundeck.storage.provider.[index].config.readTimeout`: Read timeout. Response read timeout, in seconds.<br>
    * `rundeck.storage.provider.[index].config.secretBackend`: Secret Backend. The secret backend to use in Vault.<br>
    * `rundeck.storage.provider.[index].config.storageBehaviour`: Storage Behaviour. Use the default Rundeck behavior for key storage (with Rundeck headers) or use just the key/value behavior from Vault. Options are `rundeck` and `vault`.<br>
    * `rundeck.storage.provider.[index].config.engineVersion`: Vault Engine Version Key/Value Secret Engine Config.<br>
1. Start the Rundeck service.<br>
1. To save any key or password, just click on the Gear Icon (Up to right) select “Key Storage” and save any password or key.<br>
![](~@assets/img/Vault7.png)<br>
1. From the Vault side, check the secret/rundeck path and see the Rundeck stored key.<br>
![](~@assets/img/Vault8.png)<br>