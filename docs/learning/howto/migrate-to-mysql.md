# MySQL Migration Guide

Use this guide to migrate a set of Rundeck projects from the built-in H2 database, to use MySQL.  
The instructions assume Rundeck and MySQL are running on Linux/Unix server.

## Project Export All Projects

For each project that needs to be migrated export the archive via the GUI:

1. Open the Project to be archived.
1. Choose **Project Settings > Export Archive**
1. Select appropriate options
1. Click "Export project.rdproject.jar"
1. Wait for export process to complete
1. Click the link to download the file

>Note: make sure to click the final link that is presented to download the file.

Save each project archive file (named "[project name]-XXXX.rdproject.jar")
in a safe place.  They will be needed in a future step.

## Backup Rundeck Data

- Make a backup of the H2 database to use in case of error,
  - RPM/Debian install location: `/var/lib/rundeck/data`
  - Launcher location: `$RDECK_BASE/server/data`

Older versions may also backup file based project definitions.

- Make a backup of all Projects
  - RPM/Debian install location: `/var/rundeck/projects`
  - Launcher location: `$RDECK_BASE/projects`

## Stop Rundeck

Linux/Unix:

    sudo service rundeckd stop

## Setup MySQL

Install MySQL according to the instructions for the destination platform.

## Prepare MySQL database

Perform this command to log in as root:

    mysql -u root -p

Then execute this sql:

    > create database rundeck
    > grant ALL on rundeck.* to 'rundeckuser'@'localhost' identified by 'rundeckpassword'

## Configure rundeck-config.properties

Set the datasource URL to point to the Mysql host, with appropriate database name,
username and password.

See [Configuring Rundeck](/administration/configuration/database/mysql.html#configuring-rundeck) for details.

## Configure Project Config in DB

Enable DB storage for Project configurations, and Key Storage. Optionally enable encryption.

For more info refer to:

- [Security - Key Storage](/manual/key-storage/key-storage.md)
- [Configuring Plugins - Bundled Plugins - Jasypt Encryption Plugin](/administration/configuration/plugins/bundled-plugins.md#jasypt-encryption-plugin)
- [Storage Facility](/administration/configuration/storage-facility.md)

## Start Rundeck

Start the Rundeck server again.

Linux/Unix:

    sudo service rundeckd start

View the "/var/log/rundeck/service.log" file for any error messages.

- Project definitions/configs will be imported to DB automatically
- Resources.xml remain in the same location

## Import Archives

:::danger
NEED TO REVISIT THIS SECTION
:::

Import each project into the new database.

1. Click the "Import Archive" tab
1. Upload the project archive with the corresponding name
1. Optionally choose to Import All Executions
1. Click Import
