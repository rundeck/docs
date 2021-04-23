# MySQL Migration Guide

Use this guide to migrate a set of Rundeck projects from the built-in H2 database, to use MySQL.

## Project export all projects

For each project you want to retain, Export the archive via the GUI:

- Navigate to Configure page for the project
  - Either click the cog icon in the header, then choose your project from the list
  - OR click the Configure button next to the project name in the home page
- Click on the "Export Archive" tab
- Click "Export project.rdproject.jar"
- Wait for export process to complete
- Click the link to download the file

Note: make sure to click the final link that is presented to download the file.

Save each project archive file (named "[project name]-XXXX.rdproject.jar")
in a place you can upload it later.

## Backup your Rundeck data

- Make a backup of your Projects
  - RPM/Debian install location: `/var/rundeck/projects`
  - Launcher location: `$RDECK_BASE/projects`
- Make a backup of your H2 database, which you can revert back to in case of error,
  - RPM/Debian install location: `/var/lib/rundeck/data`
  - Launcher location: `$RDECK_BASE/server/data`

## Stop rundeck

Unix:

    sudo service rundeckd stop

## Setup mysql

Install Mysql according to the instructions for your platform.

## Prepare Mysql database

Perform this command to log in as root:

    mysql -u root -p

Then execute this sql:

    > create database rundeck
    > grant ALL on rundeck.* to 'rundeckuser'@'localhost' identified by 'rundeckpassword'

## Configure rundeck-config.properties

Set the datasource URL to point to your Mysql host, with appropriate database name,
username and password.

See [Configure Rundeck](#configure-rundeck) above.

## Configure project config in DB

Enable DB storage for Project configurations, and Key Storage. Optionally enable encryption.

For more info refer to:

- [Security - Key Storage](/administration/security/key-storage.md)
- [Configuring Plugins - Bundled Plugins - Jasypt Encryption Plugin](/administration/configuration/plugins/bundled-plugins.md#jasypt-encryption-plugin)
- [Storage Facility](/administration/configuration/storage-facility.md)

## Start up Rundeck

Start the Rundeck server again.

Unix:

    sudo service rundeckd start

View the "/var/log/rundeck/service.log" file for any error messages.

- Project definitions/configs will be imported to DB automatically
- Resources.xml remain in the same location

## Import archives

For each project you wish to import, go to the Configure page for the project:

- Click the "Import Archive" tab
- Upload the project archive with the corresponding name
- Optionally choose to Import All Executions
- Click Import
