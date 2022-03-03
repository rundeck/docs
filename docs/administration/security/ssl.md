# Configuring SSL

This document describes how to configure Rundeck for SSL/HTTPS support, and assumes you are using the rundeck-launcher standalone launcher. If you are using RPM/DEB install, refer to the appropriate configuration file paths from
[Rundeck Configuration - Configuration File Reference - Configuration Layout](/administration/configuration/config-file-reference.md#configuration-layout).

(1) Before beginning, do a first-run of the launcher, as it will create the base directory for Rundeck and generate configuration files.

```properties
cd $RDECK_BASE;  java -jar {{{rundeckVersion}}}.war
```

This will start the server and generate necessary config files. Press control-c to shut down the server after you get below message from terminal:

```log
Grails application running at http://localhost:4440 in environment: production
```

(2) Using the [keytool] command, generate a keystore for use as the server cert and client truststore. Specify passwords for key and keystore:

[keytool]: https://linux.die.net/man/1/keytool-java-1.6.0-openjdk

```shell
keytool -keystore etc/keystore -alias rundeck -genkey -keyalg RSA -keypass adminadmin -storepass adminadmin
```

Be sure to specify the correct hostname of the server as the response to the question "What is your first and last name?". Answer "yes" to the final question.

You can pass all the answers to the tool on the command-line by using a HERE document.

Replace the first line "Venkman.local" with the hostname for your server, and use any other organizational values you like:

```shell
keytool -keystore etc/keystore -alias rundeck -genkey -keyalg RSA -keypass adminadmin -storepass adminadmin  <<!
Venkman.local
devops
My org
my city
my state
US
yes
!
```

(3) CLI tools that communicate to the Rundeck server need to trust the SSL certificate provided by the server. They are preconfigured to look for a truststore at the location:
`$RDECK_BASE/etc/truststore`. Copy the keystore as the truststore for CLI tools:

```shell
cp etc/keystore etc/truststore
```

(4) Modify the ssl.properties file to specify the full path location of the keystore and the appropriate passwords:

```shell
vi server/config/ssl.properties
```

An example ssl.properties file (from the RPM and DEB packages).

```properties
keystore=/etc/rundeck/ssl/keystore
keystore.password=adminadmin
key.password=adminadmin
truststore=/etc/rundeck/ssl/truststore
truststore.password=adminadmin
```

The ssl.properties default keystore and truststore location path for war installation is \$RDECK_BASE/etc/

(5) Configure client properties. Modify the file
`$RDECK_BASE/etc/framework.properties` and change these properties:

* framework.server.url
* framework.rundeck.url
* framework.server.port


Set them to the appropriate https protocol, and change the port to 4443, or to the value of your `-Dserver.https.port` runtime configuration property.

(6) Configure server URL so that Rundeck knows its external address. Modify the file `$RDECK_BASE/server/config/rundeck-config.properties` and change the `grails.serverURL`:

```properties
grails.serverURL=https://myhostname:4443
```

Set the URL to include the appropriate https protocol, and change the port to 4443, or to the value of your `-Dserver.https.port` runtime configuration property.

(7) For Debian installation, create/edit `/etc/default/rundeckd`, for RPM installation, create/edit `/etc/sysconfig/rundeckd`:

```properties
RUNDECK_WITH_SSL=true
RDECK_HTTPS_PORT=1234
```

(8) Start the server. For the rundeck launcher, tell it where to read the ssl.properties

```shell
java -Drundeck.ssl.config=$RDECK_BASE/server/config/ssl.properties -jar rundeck-{{{rundeckVersionFull}}}.war
```

You can change port by adding `-Dserver.https.port`:

```shell
java -Drundeck.ssl.config=$RDECK_BASE/server/config/ssl.properties -Dserver.https.port=1234 -jar rundeck-{{{rundeckVersionFull}}}.war
```

If successful, you will see a line indicating the SSl connector has started:

```log
Grails application running at https://localhost:1234 in environment: production
```

### Securing passwords

Passwords have to be stored in the ssl.config. If they are not set, then the server will return a NullPointerException.

The passwords stored in ssl.properties can be obfuscated so they are not in plaintext:

Run the jetty "Password" utility:

```shell
java -jar rundeck.war --encryptpwd Jetty
```

This will produce two lines, one starting with "OBF:"

Use the entire OBF: output as the password in the ssl.properties file, eg:

```properties
key.password=OBF:1lk2j1lkj321lj13lj
```

### Troubleshooting keystore

Some common error messages and causes:

```log
java.io.IOException: Keystore was tampered with, or password was incorrect
```

: A password specified in the file was incorrect.

2010-12-02 10:07:29.958::WARN: failed SslSocketConnector@0.0.0.0:4443: java.io.FileNotFoundException: /Users/greg/rundeck/etc/keystore (No such file or directory)

: The keystore/truststore file specified in ssl.properties doesn't exist

### Optional PEM export

You can export the PEM formatted server certificate for use by HTTPS clients (web browsers or e.g. curl).

Export pem cacert for use by e.g. curl:

```shell
keytool -export -keystore etc/keystore -rfc -alias rundeck > rundeck.server.pem
```

## Using an SSL Terminated Proxy

You can tell Jetty to honor
`X-Forwarded-Proto`, `X-Forwarded-Host`,
`X-Forwarded-Server` and `X-Forwarded-For` headers in two ways:

In [rundeck-config.properties](/administration/configuration/config-file-reference.md#rundeck-config.properties) you can set:

```properties
server.useForwardHeaders=true
```

Or by declaring the following JVM property:

- `rundeck.jetty.connector.forwarded` set to "true" to enable proxy forwarded support.

For the executable war you can specify it on the commandline `-Drundeck.jetty.connector.forwarded=true`.

For RPM/DEB install you can export the `RDECK_JVM_OPTS` variable in the file `/etc/sysconfig/rundeckd` (RPM) or `/etc/default/rundeckd` (DEB) and add:

```properties
RDECK_JVM_OPTS=-Drundeck.jetty.connector.forwarded=true
```

This will enable Jetty to respond correctly when a forwarded request is first received.

**Note:** You will still need to modify the `grails.serverURL` value in [rundeck-config.properties](/administration/configuration/config-file-reference.md#rundeck-config.properties) to let Rundeck know how to properly generate absolute URLs.

## Disabling SSL Protocols

### Rundeck 3

Rundeck 3 by default uses TLSv1.2. To use other protocols, it's necessary to enable them and Ciphers needed for the connection.

#### Flags for enabling TLS Protocols in Rundeck 3 using JVM

Use -Dserver.ssl.enabledProtocols to enable the protocol

```shell
-Dserver.ssl.enabledProtocols=YourProtocols`
```

#### Flags for enabling Ciphers in Rundeck 3 using JVM
Use -Dserver.ssl.ciphers to enable the Ciphers

```shell
-Dserver.ssl.ciphers=YourCiphers`
```

#### For .RPM and .DEB Systems
Edit /etc/sysconfig/rundeckd (for .RMP) or /etc/default/rundeckd (for .DEB) and add the flags

```properties
RDECK_JVM_OPTS="-Dserver.ssl.enabledProtocols=YourProtocols -Dserver.ssl.ciphers=YourCiphers`
```

### Check if the connection is successfully
Run this command from a terminal:

```shell
openssl s_client -connect HOST:PORT`
```

Example output:
```shell
SSL handshake has read 1359 bytes and written 439 bytes`
New, TLSv1/SSLv3, Cipher is ECDHE-RSA-AES128-SHA
Server public key is 2048 bit
Secure Renegotiation IS supported
Compression: NONE
Expansion: NONE
No ALPN negotiated
SSL-Session:
    Protocol  : TLSv1
    Cipher    : ECDHE-RSA-AES128-SHA
    Session-ID: 5E443B400D0D89F1665E451EDCDFF367BC702D008B7ED91FD34C23CF771D29A6
    Session-ID-ctx:
    Master-Key: 0D4E01C9B6B1BD6425CDB718B58B4C1197AEB02DB3E048981EB1FAA13772F8E22257BC10CBAA47FDE676597A7CADA5C1
    Key-Arg   : None
    PSK identity: None
    PSK identity hint: None
    SRP username: None
    Start Time: 1581529920
    Timeout   : 300 (sec)
    Verify return code: 18 (self signed certificate)
```

## Rundeck 3 SSL Configuration with Tomcat Servlet

#### Create a Keystore file

From Linux Prompt:

```shell
keytool -keystore ./keystore -alias rundeck -genkey -keyalg RSA -keypass adminadmin -storepass adminadmin`
```

#### Copy the file to a desired directory (if not already created there):
```shell
cp keystore $Rdeck_Base/server/config
```

#### Configure $Tomcat_Base/conf/server.xml file with https protocol and properties
E.g.:    

```xml
    <Connector port="8443" protocol="org.apache.coyote.http11.Http11Protocol"
               maxThreads="150"
               SSLEnabled="true"
               scheme="https" secure="true"
               clientAuth="false" sslProtocol="TLS"
               keystoreFile="/usr/local/rundeckpro/server/config/keystore"
               keystorePass="adminadmin"
                 ciphers="TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256,TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA,TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384,TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA,TLS_RSA_WITH_AES_128_CBC_SHA25,TLS_RSA_WITH_AES_128_CBC_SHA,TLS_RSA_WITH_AES_256_CBC_SHA256,TLS_RSA_WITH_AES_256_CBC_SHA"/>
```

#### Configure rundeck-config properties file with port 8443 and https protocol in grails URL
E.g.:
```properties
grails.serverURL=https://192.168.0.27:8443/rundeckpro
```

#### Configure framework.propeties file with port and https protocol
E.g.:
```properties
framework.server.port = 8443
framework.server.url = https://192.168.0.27:8443/rundeckpro
```

#### Restart Tomcat Service and enter new Rundeck URL
