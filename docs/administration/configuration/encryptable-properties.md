# Runbook Automation Config Property Encryption

:::enterprise
:::

All Runbook Automation bundles come with a feature that allows you to encrypt the values in the rundeck-config.properties file.

### Approach

To use encrypted properties in Runbook Automation you will have a master password that will be used to encrypt and decrypt the other passwords you wish to use in the rundeck-config.properties file.

For instance you might want to encrypt the bind password to your LDAP server. Let's say your LDAP bind password is `binder123`. You will need a master password to encrypt this value. We will use `1PwdToBindThem$` for the master password.

### Encrypting Property values

Runbook Automation includes a built-in utility to generate encrypted property values using AES-256-GCM authenticated encryption. The following instructions show how to encrypt a password with this utility from the command line.

cd into the directory where your rundeck.war is located
run:

```shell
java -jar rundeck.war --encryptpwd Jasypt
```

:::info
The `Jasypt` argument is a legacy CLI name kept for backward compatibility. The actual encryption now uses AES-256-GCM — the Jasypt library is no longer included.
:::

You will receive prompts for information that look like the following:

```text
Required values are marked with: *
Encrypter Config (The base property name used in RD_ENCRYPTION_ or rd.encryption. ('default' is the default value)):

*Master Password (Master password used to encrypt the value):
1PwdToBindThem$ (this won't be displayed)
*Verify Master Password (Verify master password):

*Value To Encrypt (The text you want to encrypt):
binder123 (this won't be displayed)
*Verify Value To Encrypt (Verify the text you want to encrypt):

==ENCRYPTED OUTPUT==
encrypted: AQD3f8k2...base64-encoded-value...
```

You will take the `encrypted:` value from the ENCRYPTED OUTPUT section and use it in your rundeck-config.properties file like this:
`rundeck.security.ldap.bindPassword=ENC(AQD3f8k2...base64-encoded-value...)`

:::tip Upgrade Note
Starting with Rundeck 6.0, new encrypted values use AES-256-GCM. Existing `ENC()` values encrypted with previous versions are automatically detected and decrypted without any configuration changes.
:::

### Decrypting rundeck-config.properties

To decrypt the encrypted properties in your rundeck-config.properties file you will need to set the java attribute `-Drd.encryption.default.password` with the value of your master password before starting Rundeck.

In our example we would add it to the java variable in `/etc/sysconfig/rundeckd` for RPM install or in `/etc/default/rundeckd` for DEB install :

```shell
RDECK_JVM_SETTINGS=-Drd.encryption.default.password=1PwdToBindThem$
```

Then we would start our Runbook Automation installation. After the application has completed the bootstrap process and is responding to requests, the environment variable can be unset for security purposes.

### Advanced Usage (Legacy Decryption)

If you have existing encrypted values that were generated with a custom algorithm, provider, or keyObtentions in a previous Rundeck version, you can configure those settings so the system can decrypt them correctly.

:::warning
These settings only affect **decryption of legacy values**. All new encryptions use AES-256-GCM regardless of these settings.
:::

For example, if your existing encrypted values were generated with the `PBEWITHSHA256AND256BITAES-CBC-BC` algorithm, set the corresponding system properties when starting Rundeck:

```shell
java -Drd.encryption.STRONG.algorithm=PBEWITHSHA256AND256BITAES-CBC-BC \
     -Drundeck.encrypter.config.name=STRONG \
     -jar rundeck.war
```

The `Encrypter Config` name (`STRONG` in this example) links the algorithm system property to the encrypted values. When the application encounters an `ENC(...)` value, it uses the configured algorithm and provider to decrypt legacy data.

If you would rather use environment variables to set the encryption settings you can use:
`RUNDECK_PROP_DECRYPTER_CONFIG` to set the config to use
and config settings can be supplied like:
`RD_ENCRYPTION_{your config name}_ALGORITHM`

For the example above, these would be:
`export RUNDECK_PROP_DECRYPTER_CONFIG=STRONG`
`export RD_ENCRYPTION_STRONG_ALGORITHM=PBEWITHSHA256AND256BITAES-CBC-BC`

### Re-encrypting Legacy Values

To migrate existing legacy-encrypted values to AES-256-GCM, re-run the encryption utility with the same master password:

```shell
java -jar rundeck.war --encryptpwd Jasypt
```

:::info
The `Jasypt` argument is the legacy CLI provider name retained for backward compatibility. The utility now encrypts using AES-256-GCM.
:::

Enter the plaintext value you want to encrypt. The output will be in the new AES-256-GCM format. Replace the old `ENC(...)` value in your configuration file with the new one. Both old and new formats are supported simultaneously, so migration can be done incrementally.
