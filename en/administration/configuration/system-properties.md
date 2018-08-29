% System Properties Configuration

This document explains how to declare Java System Properties used for configuring rundecRundeck.

These properties must be declared on the Java commandline when starting Rundeck.


## Executable War

If you are using [Executable War][page:administration/install/jar.md] to start Rundeck, you would set the properties directly
on the commandline, using the `-Dpropertyname=value` syntax. Add a `-D` for each property:

    java -server -Dserver.session.timeout=3600 -Dserver.port=8080 -jar rundeck-3.0.5-20180828.war

## Profile

For RPM or DEB installations, you can use environment variables set in a "defaults" file to add
additional Java Sytem Properties.

* RPM install: `/etc/sysconfig/rundeckd`
* DEB install: `/etc/default/rundeckd`

Within the `rundeckd` defaults file, declare a `RDECK_JVM_OPTS` variable:

    RDECK_JVM_OPTS="-Dserver.session.timeout=3600 -Dserver.port=8080"

## Properties Reference


* `server.port` The HTTP port to use for the server, default "4440"
* `server.https.port` The HTTPS port to use or the server, default "4443"
* `server.address` Address/hostname to listen on, default is "localhost"
* `server.contextPath` Web context path to use, such as "/rundeck". Default is "/".
* `server.session.timeout` Session timeout in seconds.
* `rdeck.base` Rundeck Basedir to use, default is the directory containing the executable war
* `server.datastore.path` Path to server datastore dir
* `default.user.name`  Username for default user account to create
* `default.user.password` Password for default user account to create
* `rundeck.jaaslogin` "true/false" - if true, enable JAAS login. If false, use the realm.properties file for login information.
* `loginmodule.name` Custom JAAS loginmodule name to use
* `loginmodule.conf.name` Name of a custom JAAS config file, located in the server's config dir.
* `rundeck.config.name` Name of a custom rundeck config file, located in the server's config dir.
* `rundeck.ssl.config` Path to the SSL config properties file to enable SSL. If not set, SSL is not enabled.
* `rundeck.jetty.connector.forwarded` true/false. Set to true to enable support for "X-forwarded-\*" headers which may be sent by a front-end proxy to the rundeck server. See [Using an SSL Terminated Proxy](../security/configuring-ssl.html#using-an-ssl-terminated-proxy).
* `rundeck.jetty.connector.ssl.excludedProtocols` Comma-separated list of SSL protocols to disable. Default: 'SSLv3'. See [Disabling SSL Protocols](../security/configuring-ssl.html#disabling-ssl-protocols).
* `rundeck.jetty.connector.ssl.includedProtocols` Comma-separated list of SSL protocols to include. Default is based on available protocols. See [Disabling SSL Protocols](../security/configuring-ssl.html#disabling-ssl-protocols).
* `rundeck.jetty.connector.ssl.excludedCipherSuites` Comma-separated list of Cipher suites to disable. No default. See [Disabling SSL Protocols](../security/configuring-ssl.html#disabling-ssl-protocols).
* `rundeck.jetty.connector.ssl.includedCipherSuites` Comma-separated list of Cipher suites to enable. Default is based on available cipher suites. See [Disabling SSL Protocols](../security/configuring-ssl.html#disabling-ssl-protocols).


For more information about using SSL, see [Configuring Rundeck for SSL](../security/configuring-ssl.html).