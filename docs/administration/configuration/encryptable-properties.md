# Rundeck Enterprise Config Property Encryption

All Rundeck Enterprise bundles come with a feature that allows you to encrypt the values in the rundeck-config.properties file.

### Approach

To use encrypted properties in Rundeck you will have a master password that will be used to encrypt and decrypt the other passwords you wish to use in the rundeck-config.properties file.

For instance you might want to encrypt the bind password to your LDAP server. Let's say your LDAP bind password is `binder123`. You will need a master password to encrypt this value. We will use `1PwdToBindThem$` for the master password.

### Encrypting Property values

Rundeck Enterprise has a feature to allow you to generate encrypted passwords using the Jasypt encryption library. The following instructions show how to encrypt a password with this utility from the command line.

cd into the directory where your rundeck.war is located
run:

```shell
java -jar rundeck.war --encryptpwd Jasypt

```

You will receive prompts for information that look like the following:

```
Required values are marked with: *
Encrypter Config (The base property name used in RD_ENCRYPTION_ or rd.encryption. ('default' is the default value)):

*Master Password (Master password used to encrypt the value):
1PwdToBindThem$ (this won't be displayed)
*Verify Master Password (Verify master password):

*Value To Encrypt (The text you want to encrypt):
binder123 (this won't be displayed)
*Verify Value To Encrypt (Verify the text you want to encrypt):

==ENCRYPTED OUTPUT==
encrypted: bbnJmDtx82/NOeUc9ahULGVAH+RdSLG5
```

You will take the `encrypted:` value from the ENCRYPTED OUTPUT section which will have a value that looks like: `bbnJmDtx82/NOeUc9ahULGVAH+RdSLG5` (note that it will not be this value) and use it in your rundeck-config.properties file like this:
`rundeck.security.ldap.bindPassword=ENC(bbnJmDtx82/NOeUc9ahULGVAH+RdSLG5)`

### Decrypting rundeck-config.properties

To decrypt the encrypted properties in your rundeck-config.properties file you will need to set the java attribute `-Drd.encryption.default.password` with the value of your master password before starting Rundeck.

In our example we would add it to the java variable in `/etc/sysconfig/rundeckd` for RPM install or in `/etc/default/rundeckd` for DEB install :

```shell
RDECK_JVM_SETTINGS=-Drd.encryption.default.password=1PwdToBindThem$
```

Then we would start our Rundeck Enterprise installation. After the application has completed the bootstrap process and is responding to requests, the environment variable can be unset for security purposes.

### Advanced Usage

If you wish to customize the algorithm, provider, or keyObtentions the Jasypt encryptor will use to encrypt the password, you can do this by passing those
values as system properties when you launch the encryption utility.

For example, if you wish to use the `PBEWITHSHA256AND256BITAES-CBC-BC` algorithm to encrypt your password, you could do it like this:

```shell
> java -jar -Drd.encryption.STRONG.algorithm=PBEWITHSHA256AND256BITAES-CBC-BC rundeckpro-cluster-3.0.0-SNAPSHOT.war --encryptpwd Jasypt
Required values are marked with: *
Encrypter Config (The base property name used in RD_ENCRYPTION_ or rd.encryption. ('default' is the default value)):
STRONG
*Master Password (Master password used to encrypt the value):
1PwdToBindThem$ (this won't be displayed)
*Verify Master Password (Verify master password):

*Value To Encrypt (The text you want to encrypt):
binder123 (this won't be displayed)
*Verify Value To Encrypt (Verify the text you want to encrypt):

==ENCRYPTED OUTPUT==
encrypted: i67e4g3jAUML0KCh+KwmnqX9lCflThMuu6CXm++VSqU=
```

Notice we are setting an rd.encryption config with the name STRONG. Then when prompted for the `Encrypter Config` by the tool we type in the value `STRONG`.
This sets the encryptor to use the algorithm passed by `rd.encryption.STRONG.algorithm` instead of the default configuration which uses a different algorithm.

To use your custom encrypted password when you start Rundeck, it is very important to ensure that the same system properties you used at encrypt time
are set at launch time. Otherwise Rundeck will use the default decryptor settings which will not match your customized settings, and startup will fail.

To start Rundeck with the settings in our example, the startup string would be something like:

```shell
java -jar -Drd.encryption.STRONG.algorithm=PBEWITHSHA256AND256BITAES-CBC-BC -Drundeck.encrypter.config.name=STRONG rundeckpro-cluster-3.0.0-SNAPSHOT.war
```

If you would rather use environment variables to set the encryption settings you can use:
`RUNDECK_PROP_DECRYPTER_CONFIG` to set the config to use
and config settings can be supplied like:
`RD_ENCRYPTION_{your config name}_ALGORITHM`

For the example above, these would be:
`export RUNDECK_PROP_DECRYPTER_CONFIG=STRONG`
`export RD_ENCRYPTION_STRONG_ALGORITHM=PBEWITHSHA256AND256BITAES-CBC-BC`
