# Process Automation Licensing

## Overview

While Rundeck is an open source project maintained by PagerDuty, Process Automation is commercial software for which you can purchase a license from PagerDuty. Process Automation provides a tested, supported, and enterprise-ready distribution of Rundeck with additional features and capabilities for enterprise scale use. Also, a Process Automation subscription license is the only way to receive professional support from PagerDuty and the core Rundeck team.

[Contact the PagerDuty sales team to get started with Process Automation today.](https://www.pagerduty.com/contact-us/)

## License Key Installation

>Note: this is only required on Process Automation version.  Runbook Automation (Cloud offering) will come pre-installed with your license.

Ask for the license key to the support team. Then install the license key via the GUI or on the filesystem directly.

### Via GUI

Upload the license key using the GUI:

![Upload the license key using the GUI](/assets/img/license-key-gui-1.png)

Click on "No License Key File is installed"

![Click on "No License Key File is installed"](/assets/img/license-key-gui-2.png)

Click on "Upload License File"

![Click on "Upload License File"](/assets/img/license-key-gui-3.png)

Select the license key file and press "Upload License File"

![Agree to the Rundeck Master Software License Agreement](/assets/img/license-key-gui-3-a.png)

Agree to the Rundeck Master Software License Agreement and Rundeck Support Policy then click "Confirm"

![View of installed license](/assets/img/license-key-gui-4.png)

### Via filesystem

Copy the license file to the correct directory depending of the kind of installation.

License file name : `rundeckpro-license.key` ( don't change to a different name )

File location:

Rundeck package RPM (Redhat/centos) or DEB (debian/ubuntu):

```
/etc/rundeck/
```

Rundeck Launcher:

```
$RDECK_BASE/etc/
```

Rundeck + Tomcat:

```
$RDECK_BASE/etc/
```

### Store license in database

If you would like to store your license in your database rather than your filesystem, turn on the following setting:

`rundeck.license.useStorageTree=true`

If you have a license file installed in your Rundeck server it will be migrated automatically into the database.

When Rundeck boots it will check the license file on the filesystem if it exists, and if the issue date of
that license is more recent than the license in the database, the database will be updated with the license
on the filesystem.

### Store the license using a custom storage tree

If you would like to store your license in a storage tree, you can configure a storage tree using the standard
storage tree config options.  

Turn on license storage tree usage then provide your configuration using the prefix: `rundeck.license.storage`

Example storing the license on Amazon S3 root folder

```
rundeck.license.useStorageTree=true
rundeck.license.storage.provider.1.type=object
rundeck.license.storage.provider.1.path=/
rundeck.license.storage.provider.1.config.bucket=rundeck
rundeck.license.storage.provider.1.config.objectStoreUrl=https://s3.amazonaws.com
rundeck.license.storage.provider.1.config.accessKey=YOUR_ACCESS_KEY
rundeck.license.storage.provider.1.config.secretKey=YOUR_SECRET_KEY
```

Example storing the license on Amazon S3 using a specific folder

Use the property `rundeck.license.file` to declare the specific path, and the license name.

Use the property `rundeck.license.storage.provider.1.path` to declare the license path.

Both properties must be used as show below.

```
rundeck.license.useStorageTree=true
rundeck.license.storage.provider.1.type=object
rundeck.license.storage.provider.1.config.bucket=rundeck
rundeck.license.storage.provider.1.config.objectStoreUrl=https://s3.amazonaws.com
rundeck.license.storage.provider.1.config.accessKey=YOUR_ACCESS_KEY
rundeck.license.storage.provider.1.config.secretKey=YOUR_SECRET_KEY

rundeck.license.storage.provider.1.path=/FOLDER_NAME/SUB_FOLDER_NAME/
rundeck.license.file=/FOLDER_NAME/SUB_FOLDER_NAME/rundeckpro-license.key
```
