% Rundeck PRO Config Property Encryption

All Rundeck PRO bundles come with a feature that allows you to encrypt the values in the rundeck-config.properties file.

### Approach
To use encrypted properties in Rundeck you will have a master password that will be used to encrypt and decrypt the other passwords you wish to use in the rundeck-config.properties file.

For instance you might want to encrypt the bind password to your LDAP server. Let's say your LDAP bind password is `binder123`. You will need a master password to encrypt this value. We will use `1PwdToBindThem$` for the master password.

### Encrypting Property values
To encrypt your passwords you will need to download the Jasypt encryption tools that can be found at http://www.jasypt.org/

After downloading the zip distribution of the latest verison, you will unzip the archive to your desired location. The unzipped Jasypt folder has a bin folder inside it. Navigate to that location, and use the encrypt.sh or encrypt.bat script to run the following command: `./encrypt.sh input="binder123" password="1PwdToBindThem$"`

The script will print various information. You are interested in the OUTPUT section which will have a value that looks like: `axxXQWvbRT3pBNqhpsM4wxNBzJc6gSPw` (note that it will not be this value)

You will take the encrypted string: `axxXQWvbRT3pBNqhpsM4wxNBzJc6gSPw` and use it in your rundeck-config.properties file like this:
`rundeck.security.ldap.bindPassword=ENC(axxXQWvbRT3pBNqhpsM4wxNBzJc6gSPw)`

### Decrypting rundeck-config.properties
To decrypt the encrypted properties in your rundeck-config.properties file you will need to set the environment variable `RUNDECK_PROP_DECRYPTER_PWD` with the value of your master password before starting Rundeck.

In our example we would do: `export RUNDECK_PROP_DECRYPTER_PWD=1PwdToBindThem$`
then we would start our Rundeck PRO installation. After the application has completed the bootstrap process and is responding to requests, the environment variable can be unset for security purposes.
