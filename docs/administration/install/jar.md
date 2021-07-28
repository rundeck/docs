# Installing as an executable war

Use the executable war as an alternative to a system package:

1. [Download](https://download.rundeck.com) the executable war (Java) file.
1. Define RDECK_BASE environment variable to the location of the install
    ```bash
    export RDECK_BASE=$HOME/rundeck; # or where you like it
    ```
1. Create the directory for the installation.
    ```bash
    mkdir -p $RDECK_BASE
    ```
1. Copy the executable war to the installation directory.
    ```bash
    cp rundeck-{{{rundeckVersionFull}}}.war $RDECK_BASE
    ```
1. Change directory and run the WAR.
    ```bash
    cd $RDECK_BASE
    java -Xmx4g -jar rundeck-{{{rundeckVersionFull}}}.war
    ```
1. Wait for the Started message.
    ```
    Grails application running at http://ecto1.local:4440 in environment: production
    ```
1. Update your shell environment
    ```bash
    PATH=$PATH:$RDECK_BASE/tools/bin
    MANPATH=$MANPATH:$RDECK_BASE/docs/man
    ```

If you get an error message that resembles the one below, you probably are using an unsupported Java version.

```
Exception in thread "main" java.lang.UnsupportedClassVersionError: Bad version number in .class file
```

See the [startup and shutdown](/administration/maintenance/startup.md) section for
instructions on using the `rundeckd` shell tool to manage the
rundeck server process.

## Logging in for the first time

1. Navigate to [http://localhost:4440/](http://localhost:4440/user/login) in a browser
1. Log in with the username **admin** and password **admin**

Rundeck is now up and running!

Next, learn how to [create your first Rundeck Enterprise project](/manual/03-getting-started.md#project-setup)

### Updating

When you need to update rundeck and you can not find the relevant section on the docs you are probably on a quite recent version.

- Stop rundeck
- download the new war
- open a prompt, optionally setting RDECK_BASE and launch --installonly
    ```sh
    java -jar rundeck-{{{rundeckVersionFull}}}.war --installonly
    ```
- copy over your customizations
- don't forget, e.g., sqljdbc41.jar in `%RDECK_BASE%\server\lib`
- start rundeck

### Executable War Options

The executable war can take a number of options to specify how the server should start. If you execute with a "-h" you will see the usage information:

```bash
java -Xmx4g -jar rundeck-{{{rundeckVersionFull}}}.war -h
```

```
usage: java [JAVA_OPTIONS] -jar rundeck.war  [-c PATH] [-d]
       [--installonly] [-s PATH] [-b PATH] [-p PATH] [-h] [-x PATH]
       [--skipinstall] [--serverdir PATH] [--datadir PATH]

Run the rundeck server, installing the necessary components if they do not exist.
    --skipinstall         Skip the extraction of the utilities from the launcher.
    --installonly         Perform installation only and do not start the server.
 -b,--basedir <PATH>      The basedir
 -c,--configdir <PATH>    The location of the configuration.
 -d                       Show debug information
 -h,--help                Display this message.
 -p,--projectdir <PATH>   The location of Rundeck's project data.
 -s,--sbindir <PATH>      The install directory for the tools used by administrators.
 -x,--bindir <PATH>       The install directory for the tools used by users.
```

These options can be used to customize the directories used by the executable war.
By default all the directories are organized by convention within the current
working directory where the executable war is located.

### System Properties

See [Rundeck Configuration - System Properties Configuration](/administration/configuration/system-properties.md)

For more information about using SSL, see [Configuring Rundeck for SSL](/administration/security/ssl.md).
