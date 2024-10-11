# Rundeck 5.0.x Upgrade Notes

These notes cover any detailed steps necessary when upgrading from a previous version of Rundeck or Runbook Automation to the 5.0.0 version.

## Java 11 Minimum

Before upgrading to version 5.0 please ensure that your system is using Java 11.  The Rundeck 4.x series does support Java 11 so the upgrade can be done in place if your current installation is already on that version.


## Enterprise Runner Upgrade

::: No longer mandatory with 5.0.2
Note: As of version 5.0.2 this update is not mandatory at the time of upgrading, but is recommended for the best performance and full functionality.
:::

::: warning Upgrade Runners
If you plan to or have already upgraded to 5.0.0 or 5.0.1 they reuired an upgraded Enterprise Runner to function properly.
:::

Update the Enterprise Runner by downloading the latest version. Here are the following ways to download the runner:

### Rundeck UI:

1. Access the Runner Management page from the system menu

![Runner Management Menu](/assets/img/runner_management_menu.png)

2. Open action menu for the runner

![Runner Action Menu](/assets/img/runner_download_action.png)

3. Regenerate the credentials

![Runner Regenerate Credentials](/assets/img/runner_regenerate_cred.png)

4. And Download the Runner package

![Runner Download](/assets/img/runner_download_package.png)

### Via API: 
The Runner can be downloaded from `https://[URL]/api/{api_version}/runnerManagement/download/{token}`

### Using Docker Container:
It can be updated by using the newest docker image.  (example `rundeckpro/runner:5.0.1-20240115`)

Once you have downloaded the latest version, follow these steps to update the Runner instance:

1. Stop the runner
2. Replace the installed version with the newest version
3. Restart the runner.

The Runner version can be checked in the Runner Management page by accessing the runner details.

![Runner Details](/assets/img/runner_details.png)

## H2 Database Upgrade

:::tip
Note: If you are using one of the **[supported production databases](/administration/install/index.md#database-configuration)** these migration steps can be ignored.
:::

In release 5.0.0 the lib version of the h2 database was updated to `2.2.220`.  The old version of the H2 database is not compatible with the newer library. Since the old library has a critical security vulnerability we have not included it in the release and there is no mechanism to migrate the 1.x database in the version automatically by Rundeck.  When attempting an in-place upgrade from a previous version to 5.0.0+ using H2 Rundeck startup will fail.

```
[2022-04-14T16:06:22,414] ERROR pool.HikariPool - HikariPool-1 - Exception during pool initialization.
org.h2.jdbc.JdbcSQLNonTransientException: General error: "The write format 2 is smaller than the supported format 3 [2.2.220/5]" [50000-210]
	at org.h2.message.DbException.getJdbcSQLException(DbException.java:573) ~[h2-2.2.220.jar!/:?]
	at org.h2.message.DbException.getJdbcSQLException(DbException.java:496) ~[h2-2.2.220.jar!/:?]
```

### H2 Migration Options

**If you don't need to keep the data in your old H2 database:**

1. Remove the files from `{RUNDECK_HOME}/server/data`.
2. Restart Rundeck.  A new blank database will be created when Rundeck starts up.

:::warning
Note: This will wipe out all data in your Rundeck instance.  At a minimum we suggest backing up the files using the first steps below just in case you change your mind later.
:::

**If you need to keep the data in the old H2 database,** Rundeck has developed a script to help with migration.
### Preparation:

1. Create a backup directory `${backup_directory}` in your local file system to host the backup database files
1. Clone the git repo [h2-v2-migration](https://github.com/rundeck-plugins/h2-v2-migration) into your local file system

### Backup
Before migration - copy and backup the database files somewhere safe:
1. Stop the Rundeck application
1. Copy the H2 database from the Rundeck application directory `{RUNDECK_HOME}/server/data` to the `${backup_directory}` There should be two files
        `grailsdb.mv.db`
        `grailsdb.trace.db`

### Migration from 4.1+ to 5.0

#### STEP 1: Generate the new version database

Open a shell terminal and navigate into the `h2-v2-migration` git repo. Execute the `migration.sh` shell command.

    $_>/bin/sh migration.sh -f ${backup_directory}/grailsdb -u ${username} -p ${password} -s v2 -d v3


- The `-f` parameter is required and should be the full path to the backup database file without the extension.
- The optional `-u` parameter is used for database username. If it is not provided, an empty string will be used.
    - If your Rundeck installation is RPM/Deb/War use `sa` for the user name.
    - If your Rundeck installation is from Docker the user name is blank. (leave `-u` out of command)
- The optional `-p` parameter is used for database password. If it is not provided, an empty string will be used.
- - The optional `-s` parameter is used to set the source h2 database version. Valid values are `v1` or `v2`. If not
  provided, `v2` will be used.
- The optional `-d` parameter is used to set the destination h2 database version. Valid values are `v2` or `v3`. If not
  provided, `v3` will be used.

By default, the `username` and `password` parameters are both empty string. If you have any custom setup, please use your customized values.

The migration.sh script will create a `output` folder at current location and put all generated files (including the v2 database file) into it.

> Migrating the database directly from a 4.0 or lower (`v1`) to the 5.0 version (`v3`) did work in tests, but be sure to review all other upgrade considerations between your old version and new version.


#### STEP 2: Deploy the new version database
- Use the generated database file `./output/v2/data/grails.mv.db` from the above step to replace your the target Rundeck application database at `{RUNDECK_HOME}/server/data/grails.mv.db`
- Set the permission of the file `{RUNDECK_HOME}/server/data/grails.mv.db` correctly, so Rundeck application can access it with write permission. Login to the docker container’s shell to change the ownership of the database files by executing the below command:

       sudo chown rundeck:root {RUNDECK_HOME}/server/data/grailsdb.mv.db
- Add the string `;NON_KEYWORDS=MONTH,HOUR,MINUTE,YEAR,SECONDS` to _datasource.url_ in rundeck-config.properties file, i.e., `datasource.url = jdbc:h2:file:[rdbase]/server/data/grailsdb;NON_KEYWORDS=MONTH,HOUR,MINUTE,YEAR,SECONDS;DB_CLOSE_ON_EXIT=FALSE`
- Restart the Rundeck application