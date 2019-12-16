# General Upgrade Guide

Updated December 16, 2019

## Rundeck War Launcher

To upgrade Rundeck 3 using war launcher use the following steps:

**NOTE: replace `$RDECK_BASE` below with the real path.**

* Stop Rundeck Service, eg: `$RDECK_BASE/server/sbin/rundeckd stop`
* Copy the new war file to `$RDECK_BASE` and install it:
* Start Rundeck 3: `$RDECK_BASE/server/sbin/rundeckd start`

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
- Delete `$tomcat.base/webapps/rundeck`
- Delete `$tomcat.base/webapps/rundeck.war`
- Place Rundeck 3 as the old war file `$tomcat.base/webapps/rundeck.war`
- Start Tomcat

### NOTES FOR TOMCAT:

- Due to changes in authentication, `tomcat-users.xml` and other Tomcat's authentication modules no longer work, you should configure users as described in [Authenticating Users](/administration/security/authentication.md#authenticating-users).
- If you do not have `-Drundeck.config.location` defined or configured in `$tomcat.base/bin/setenv.sh` file (`tomcat.base\bin\setenv.bat` for Windows), Rundeck will read its config file from this location: `$rdeck.base/server/config/rundeck-config.properties`.
- You **must** define the `server.contextPath` value in `rundeck-config.properties` to properly tell Rundeck about the context path used by tomcat.  See [Installation on Tomcat](/administration/install/tomcat.md).
