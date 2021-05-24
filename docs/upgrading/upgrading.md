# General Upgrade Guide


## Runnable War

To upgrade Rundeck 3 using the runnable war use the following steps:

- Stop Rundeck Service:
```sh
$RDECK_BASE/server/sbin/rundeckd stop
```

- In case you have customs plugins in `libext` folder, backup them. For example, you can move the full `libext`:
```sh
mv $RDECK_BASE/libext $RDECK_BASE/libext.3
```

- Remove previous "source" folders:
```sh
rm -rf $RDECK_BASE/server/lib/rundeck-core*jar $RDECK_BASE/server/sbin/ $RDECK_BASE/tools/ $RDECK_BASE/var/.install_complete-missing-ver
```

- Run the following command to ensure that all files and directories are created properly:
```sh
rm var/.install_complete-missing-ver
```

- Copy the new war file to `$RDECK_BASE` and install it:
```sh
java -jar rundeck-{{{rundeckVersionFull}}}.war --installonly
```

- Start Rundeck 3:
```sh
$RDECK_BASE/server/sbin/rundeckd start
```

- Copy the "custom" plugins back to `$RDECK_BASE/libext` folder.


## Rundeck DEB Package

The upgrade process can be done using the `.deb` file or using the command `apt-get`:

**If using deb package**

```sh
sudo dpkg -i rundeck-{{{rundeckVersionFull}}}.deb
```

**If using apt-get**

```sh
sudo apt-get upgrade rundeck
```

## Rundeck RPM Package

The upgrade process can be done using the `.rpm` file or using the command `yum`.

In the case of the RPM or Yum upgrade, any changed config files will not be modified, and new files are saved with the extension `.rpmnew`. If you have changed
your config file, please compare it to the `.rpmnew` file to see what changes might need to be included.


```sh
$ ls -lrt
total 56
-rw-r----- 1 rundeck rundeck  455 Jun  1 19:34 rundeck-config.properties.rpmnew
-rw-r----- 1 rundeck rundeck  986 Jun  1 19:34 realm.properties
-rw-r----- 1 rundeck rundeck  729 Jun  1 19:34 project.properties
-rw-r----- 1 rundeck rundeck 3426 Jun  1 19:34 profile
-rw-r----- 1 rundeck rundeck 7538 Jun  1 19:34 log4j.properties
-rw-r----- 1 rundeck rundeck  136 Jun  1 19:34 jaas-loginmodule.conf
-rw-r----- 1 rundeck rundeck 1177 Jun  1 19:34 framework.properties.rpmnew
-rw-r----- 1 rundeck rundeck  511 Jun  1 19:34 cli-log4j.properties
-rw-r----- 1 rundeck rundeck 1104 Jun  1 19:34 apitoken.aclpolicy
-rw-r----- 1 rundeck rundeck  738 Jun  1 19:34 admin.aclpolicy
-rw-r----- 1 rundeck rundeck  673 Jun  4 16:02 rundeck-config.properties
-rw-r----- 1 rundeck rundeck 1505 Jun  4 16:02 framework.properties
drwxr-x--- 1 rundeck rundeck 4096 Jun  4 16:08 ssl
```

### Using rpm package


```sh
$ rpm -U rundeck-{{{rundeckVersionFull}}}.rpm

warning: /etc/rundeck/framework.properties created as /etc/rundeck/framework.properties.rpmnew
warning: /etc/rundeck/rundeck-config.properties created as /etc/rundeck/rundeck-config.properties.rpmnew
rundeck.server.uuid = XXXXXXXXXXXXXXX

```

### Using yum

```sh
$ yum upgrade rundeck
```

## Tomcat War deployment

- Stop Tomcat

- In case you have customs plugins in `libext` folder, backup them. For example, you can move the full `libext`:
```sh
mv $rdeck.base/libext $rdeck.base/libext.3
```

- Remove old version deployment and war file:
```sh
rm $tomcat.base/webapps/rundeck $tomcat.base/webapps/rundeck.war
```

- Remove previous "source" content:
```sh
rm -rf $rdeck.base/server/lib/rundeck-core* $rdeck.base/var/.install_complete-missing-ver
```

- Place the new Rundeck 3 version as the old war file:
```sh
mv rundeck-{{{rundeckVersionFull}}}.war $tomcat.base/webapps/rundeck.war
```

- Start Tomcat

- Copy the "custom" plugins back to `$rdeck.base/libext` folder.

### NOTES FOR TOMCAT:

- Due to changes in authentication, `tomcat-users.xml` and other Tomcat's authentication modules no longer work, you should configure users as described in [Authenticating Users](/administration/security/authentication.md#authenticating-users).
- If you do not have `-Drundeck.config.location` defined or configured in `$tomcat.base/bin/setenv.sh` file (`tomcat.base\bin\setenv.bat` for Windows), Rundeck will read its config file from this location: `$rdeck.base/server/config/rundeck-config.properties`.
- You **must** define the `server.servlet.context-path` (`server.contextPath` for versions prior to 3.3) value in `rundeck-config.properties` to properly tell Rundeck about the context path used by tomcat. See [Installation on Tomcat](/administration/install/tomcat.md).


## Windows As a Service

**Before performing this upgrade, we highly recommend you stop all cluster members and do the following steps, one cluster member, at a time.**

- Download the latest Rundeck version .war from [Rundeck Downloads](https://download.rundeck.com/)

- Copy or move the downloaded rundeck war file into your` $RDECK_BASE` folder

- Stop Rundeck (stop service or kill the process)

- Edit the file start_rundeck.bat located on your `$RDECK_BASE` dir and change the name of your rundeck.war file with the name of the downloaded file, e.g. "rundeckpro-enterprise-3.3.6-20201111.war"

```
 java %RDECK_CLI_OPTS% %RDECK_SSL_OPTS% -jar rundeckpro-enterprise-3.3.6-20201111.war --skipinstall -d >> %CURDIR%\var\logs\service.log 2>&1

```

- Backup your `$RDECK_BASE\libext` folder (in case you have any custom plugins)

- Backup both folders, `$RDECK_BASE/server/config` and` $RDECK_BASE/etc`, just in case

- Delete these files and dirs:

```
$RDECK_BASE/libext/
$RDECK_BASE/tools/
$RDECK_BASE/server/lib/
$RDECK_BASE/server/sbin/
$RDECK_BASE/var/.firstLogin
$RDECK_BASE/var/.first-run-3.0.22-20190512
$RDECK_BASE/var/.install-complete-missing-ver
```

- Start Rundeck from the console and wait until it boots up successfully

```
java -jar rundeckpro-enterprise-{{{rundeckVersionFull}}}.war

```
