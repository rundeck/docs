% Installing as an executable .jar

Use the launcher as an alternative to a system package:

1. Download the launcher jar file.
1. Define RDECK_BASE environment variable to the location of the install

    ~~~~~~~ {.bash}
    export RDECK_BASE=$HOME/rundeck; # or where you like it
    ~~~~~~~

1. Create the directory for the installation.

    ~~~~~~~ {.bash}
    mkdir -p $RDECK_BASE 
    ~~~~~~~

1. Copy the launcher jar to the installation directory.

    ~~~~~~~ {.bash}
    cp rundeck-launcher-2.0.0.jar $RDECK_BASE
    ~~~~~~~

1. Change directory and run the jar.

    ~~~~~~~ {.bash}
    cd $RDECK_BASE    
    java -XX:MaxPermSize=256m -Xmx1024m -jar rundeck-launcher-2.0.0.jar
    ~~~~~~~

1. Wait for the Started message.

    ~~~~~~~
    2010-11-19 13:35:51.127::INFO:  Started SocketConnector@0.0.0.0:4440
    ~~~~~~~

1. Update your shell environment 

    ~~~~~~~ {.bash}
    PATH=$PATH:$RDECK_BASE/tools/bin
    MANPATH=$MANPATH:$RDECK_BASE/docs/man
    ~~~~~~~


If you get an error message that resembles the one below, you probably
are using an unsupported Java version.

    Exception in thread "main" java.lang.UnsupportedClassVersionError: Bad version number in .class file

See the [startup and shutdown](../maintenance/startup-and-shutdown.html) section for
instructions on using the ``rundeckd`` shell tool to manage the 
rundeck launcher process.

## Logging in for the first time

1. Navigate to [http://localhost:4440/](http://localhost:4440/user/login) in a browser
1. Log in with the username **admin** and password **admin**

Rundeck is now up and running!

Next, learn how to [create your first Rundeck Pro project](../../manual/getting-started.html#project-setup)

### Updating

When you need to update rundeck and you can not find the relevant section on the docs you are probably on a quite recent version. This worked successfully in all the steps from 2.6.5 to 2.6.10.

* Stop rundeck
* Remove `%RDECK_BASE%\server\exp` and `%RDECK_BASE%\server\lib`, making a backup of any file you modified under those directories (e.g. `%RDECK_BASE%\server\exp\webapp\WEB-INF\classes\log4j.properties`, `%RDECK_BASE%\server\exp\webapp\WEB-INF\web.xml`, etc)
* download the launcher
* open a prompt, optionally setting RDECK_BASE and launch --installonly

    java -jar rundeck-launcher-2.6.10.jar --installonly

* copy over your customizations
* don't forget, e.g., sqljdbc41.jar in `%RDECK_BASE%\server\lib`
* start rundeck

### Launcher Options

The launcher jar can take a number of options to specify how the server should start. If you execute with a "-h" you will see the usage information:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ {.bash}
java -XX:MaxPermSize=256m -Xmx1024m -jar rundeck-launcher-2.1.0.jar -h
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ 

    usage: java [JAVA_OPTIONS] -jar rundeck-launcher.jar  [-c PATH] [-d]
           [--installonly] [-s PATH] [-b PATH] [-p PATH] [-h] [-x PATH]
           [--skipinstall] [--serverdir PATH] [--datadir PATH]

    Run the rundeck server, installing the necessary components if they do not
    exist.
        --skipinstall         Skip the extraction of the utilities from the
                              launcher.
        --installonly         Perform installation only and do not start the
                              server.
     -b,--basedir <PATH>      The basedir
     -c,--configdir <PATH>    The location of the configuration.
     -d                       Show debug information
     -h,--help                Display this message.
     -p,--projectdir <PATH>   The location of Rundeck's project data.
     -s,--sbindir <PATH>      The install directory for the tools used by
                              administrators.
     -x,--bindir <PATH>       The install directory for the tools used by
                              users.
    
These options can be used to customize the directories used by the launcher. 
By default all the directories are organized by convention within the current
working directory where the launcher jar is located.

### System Properties

You can also customize the launcher behavior by using some java system properties.

Specify these properties using the normal `-Dproperty=value` commandline options
to the `java` command:

* `server.http.port` The HTTP port to use for the server, default "4440"
* `server.https.port` The HTTPS port to use or the server, default "4443"
* `server.http.host` Address/hostname to listen on, default is all addresses "0.0.0.0"
* `server.hostname` Hostname to use for the server, default is the system hostname
* `server.web.context` Web context path to use, such as "/rundeck". Default is "/".
* `rdeck.base` Rundeck Basedir to use, default is the directory containing the launcher jar
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
