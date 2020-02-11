# Configuring SSL

This document describes how to configure Rundeck for SSL/HTTPS support, and assumes you are using the rundeck-launcher standalone launcher. If you are using RPM/DEB install, refer to the appropriate configuration file paths from
[Rundeck Configuration - Configuration File Reference - Configuration Layout](/administration/configuration/config-file-reference.md#configuration-layout).

(1) Before beginning, do a first-run of the launcher, as it will create the base directory for Rundeck and generate configuration files.

        cd $RDECK_BASE;  java -jar rundeck-3.0.1.war

This will start the server and generate necessary config files. Press control-c to shut down the server after you get below message from terminal:

    Grails application running at http://localhost:4440 in environment: production

(2) Using the [keytool] command, generate a keystore for use as the server cert and client truststore. Specify passwords for key and keystore:

[keytool]: https://linux.die.net/man/1/keytool-java-1.6.0-openjdk

        keytool -keystore etc/keystore -alias rundeck -genkey -keyalg RSA -keypass adminadmin -storepass adminadmin

Be sure to specify the correct hostname of the server as the response to the question "What is your first and last name?". Answer "yes" to the final question.

You can pass all the answers to the tool on the command-line by using a HERE document.

Replace the first line "Venkman.local" with the hostname for your server, and use any other organizational values you like:

            keytool -keystore etc/keystore -alias rundeck -genkey -keyalg RSA -keypass adminadmin -storepass adminadmin  <<!
            Venkman.local
            devops
            My org
            my city
            my state
            US
            yes
            !

(3) CLI tools that communicate to the Rundeck server need to trust the SSL certificate provided by the server. They are preconfigured to look for a truststore at the location:
`$RDECK_BASE/etc/truststore`. Copy the keystore as the truststore for CLI tools:

        cp etc/keystore etc/truststore

(4) Modify the ssl.properties file to specify the full path location of the keystore and the appropriate passwords:

        vi server/config/ssl.properties

An example ssl.properties file (from the RPM and DEB packages).

        keystore=/etc/rundeck/ssl/keystore
        keystore.password=adminadmin
        key.password=adminadmin
        truststore=/etc/rundeck/ssl/truststore
        truststore.password=adminadmin

The ssl.properties default keystore and truststore location path for war installation is \$RDECK_BASE/etc/

(5) Configure client properties. Modify the file
`$RDECK_BASE/etc/framework.properties` and change these properties:

    * `framework.server.url`
    * `framework.rundeck.url`
    * `framework.server.port`

Set them to the appropriate https protocol, and change the port to 4443, or to the value of your `-Dserver.https.port` runtime configuration property.

(6) Configure server URL so that Rundeck knows its external address. Modify the file `$RDECK_BASE/server/config/rundeck-config.properties` and change the `grails.serverURL`:

    * `grails.serverURL=https://myhostname:4443`

Set the URL to include the appropriate https protocol, and change the port to 4443, or to the value of your `-Dserver.https.port` runtime configuration property.

(7) For Debian installation, create/edit `/etc/default/rundeckd`, for RPM installation, create/edit `/etc/sysconfig/rundeckd`:

        export RUNDECK_WITH_SSL=true
        export RDECK_HTTPS_PORT=1234

(8) Start the server. For the rundeck launcher, tell it where to read the ssl.properties

     java -Drundeck.ssl.config=$RDECK_BASE/server/config/ssl.properties -jar rundeck-3.0.1.war

You can change port by adding `-Dserver.https.port`:

     java -Drundeck.ssl.config=$RDECK_BASE/server/config/ssl.properties -Dserver.https.port=1234 -jar rundeck-3.0.1.war

If successful, you will see a line indicating the SSl connector has started:

     Grails application running at https://localhost:1234 in environment: production

### Securing passwords

Passwords do not have to be stored in the ssl.config. If they are not set, then the server will prompt on the console for a user to enter the passwords.

If you want the server to start without prompting then you need to set the passwords in the config file.

The passwords stored in ssl.properties can be obfuscated so they are not in plaintext:

Run the jetty "Password" utility:

    $ java -cp server/lib/jetty-all-7.6.0.v20120127.jar org.eclipse.jetty.util.security.Password [username] [password]

This will produce two lines, one starting with "OBF:"

Use the entire OBF: output as the password in the ssl.properties file, eg:

    key.password=OBF:1lk2j1lkj321lj13lj

### Troubleshooting keystore

Some common error messages and causes:

java.io.IOException: Keystore was tampered with, or password was incorrect

: A password specified in the file was incorrect.

2010-12-02 10:07:29.958::WARN: failed SslSocketConnector@0.0.0.0:4443: java.io.FileNotFoundException: /Users/greg/rundeck/etc/keystore (No such file or directory)

: The keystore/truststore file specified in ssl.properties doesn't exist

### Optional PEM export

You can export the PEM formatted server certificate for use by HTTPS clients (web browsers or e.g. curl).

Export pem cacert for use by e.g. curl:

    keytool -export -keystore etc/keystore -rfc -alias rundeck > rundeck.server.pem

## Using an SSL Terminated Proxy

You can tell Jetty to honor
`X-Forwarded-Proto`, `X-Forwarded-Host`,
`X-Forwarded-Server` and `X-Forwarded-For` headers in two ways:

In [rundeck-config.properties](/administration/configuration/config-file-reference.md#rundeck-config.properties) you can set:

    server.useForwardHeaders=true

Or by declaring the following JVM property:

- `rundeck.jetty.connector.forwarded` set to "true" to enable proxy forwarded support.

For the executable war you can specify it on the commandline `-Drundeck.jetty.connector.forwarded=true`.

For RPM/DEB install you can export the `RDECK_JVM_OPTS` variable in the file `/etc/sysconfig/rundeckd` (RPM) or `/etc/default/rundeckd` (DEB) and add:

    RDECK_JVM_OPTS=-Drundeck.jetty.connector.forwarded=true

This will enable Jetty to respond correctly when a forwarded request is first received.

**Note:** You will still need to modify the `grails.serverURL` value in [rundeck-config.properties](/administration/configuration/config-file-reference.md#rundeck-config.properties) to let Rundeck know how to properly generate absolute URLs.

## Disabling SSL Protocols
### Rundeck 2

You can disable SSL protocols or cipher suites using these JVM variables:

- `rundeck.jetty.connector.ssl.includedProtocols` set to a comma-separated list of SSL protocols to enable. Default will be based on the available protocols.
- `rundeck.jetty.connector.ssl.excludedProtocols` set to a comma-separated list of SSL protocols to disable. Default value: 'SSLv3'
- `rundeck.jetty.connector.ssl.includedCipherSuites` set to a comma-separated list of Cipher suites to enable. Default will be based on the available cipher suites.
- `rundeck.jetty.connector.ssl.excludedCipherSuites` set to a comma-separated list of Cipher suites to disable. No default value.

The `included` settings determine what protocols or cipher suites are enabled, and the `excluded` settings then remove values from that list.

E.g. modify the `RDECK_JVM` variable in the file `/etc/rundeck/profile` and add:

    -Drundeck.jetty.connector.ssl.excludedProtocols=SSLv3,SSLv2Hello

When starting up the Jetty container will log a list of the disabled protocols:

    2014-10-27 11:08:41.225:INFO:oejus.SslContextFactory:Enabled Protocols [SSLv2Hello, TLSv1] of [SSLv2Hello, SSLv3, TLSv1]

To see the list of enabled Cipher Suites, turn on DEBUG level logging for Jetty SSL utils: `-Dorg.eclipse.jetty.util.ssl.LEVEL=DEBUG`.

### Rundeck 3

Rundeck 3 by default uses TLSv1.2. To enable other protocols like TLSv1 it is necessary to re-enable it and also the ciphers
the connection will need.

#### Example for enabling TLSv1 in Rundeck 3 using JVM

Use -Dserver.ssl.enabledProtocols to enable the protocol TLSv1
`-Dserver.ssl.enabledProtocols=TLSv1`

Use -Dserver.ssl.ciphers to enable the necesarry Ciphers
`-Dserver.ssl.ciphers=TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA,TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA"`

Note: The necesarry Ciphers for a Rundeck TLSv1 connection are 
##### TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA and TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA


#### Example for enabling TLSv1 in Rundeck 3 exporting the flags to the rundeckd file

### Check if the connection is successfull
Run this command from a linux prompt:
`#openssl s_client -connect 192.168.43.233:4443`
Example output:



## Rundeck 3 SSL Configuration with Tomcat Servlet

#### Create a Keystore file-Dserver.ssl.ciphers=TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA,TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA"

From Linux Prompt:

`$: keytool -keystore ./keystore -alias rundeck -genkey -keyalg RSA -keypass adminadmin -storepass adminadmin`

#### Copy the file to a desired directory (if not already created there):
cp keystore $Rdeck_Base/server/config

#### Configure $Tomcat_Base/conf/server.xml file with https protocol and properties
E.g.:    

    <Connector port="8443" protocol="org.apache.coyote.http11.Http11Protocol"
               maxThreads="150"
               SSLEnabled="true"
               scheme="https" secure="true"
               clientAuth="false" sslProtocol="TLS"
               keystoreFile="/usr/local/rundeckpro/server/config/keystore"
               keystorePass="adminadmin"
                 ciphers="TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA256,TLS_ECDHE_RSA_WITH_AES_128_CBC_SHA,TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA384,TLS_ECDHE_RSA_WITH_AES_256_CBC_SHA,TLS_RSA_WITH_AES_128_CBC_SHA25,TLS_RSA_WITH_AES_128_CBC_SHA,TLS_RSA_WITH_AES_256_CBC_SHA256,TLS_RSA_WITH_AES_256_CBC_SHA"/>


#### Configure rundeck-config properties file with port 8443 and https protocol in grails URL
E.g.:
grails.serverURL=https://192.168.0.27:8443/rundeckpro

#### Configure framework.propeties file with port and https protocol
E.g.:
framework.server.port = 8443
framework.server.url = https://192.168.0.27:8443/rundeckpro

#### Restart Tomcat Service and enter new Rundeck URL


![Rundeck SSL Login](/docs/assets/img/tomcat_ssl.png)
