# Rundeck Enterprise Licensing and Support

## Licensing

While Rundeck is an open source project maintained by Rundeck Inc, Rundeck Enterprise is commercial software for which you can purchase a license from Rundeck Inc. Rundeck Enterprise provides a tested, supported, and enterprise-ready distribution of Rundeck with additional features and capabilities for enterprise scale use. Also, a Rundeck Enterprise subscription license is the only way to receive professional support from Rundeck and the core Rundeck team.

Rundeck Enterprise is available under an annual subscription license and comes bundled with support. You can renew the right to use the software and receive access to support on an annual basis. Multi-year subscription purchases can also be made.

Rundeck Enterprise is licensed per a combination of Rundeck Enterprise clusters (consisting of two servers), any additional servers, and the number of users using Rundeck Enterprise. There are no restrictions on the number of projects, nodes, or jobs run.

No software with GPL or other “copyleft” licenses are used in Rundeck Enterprise. All license rights for using Rundeck Enterprise are contained within the single Rundeck Enterprise license.

Rundeck Inc. guarantees that Rundeck Enterprise does not infringe on any patents, copyrights or misappropriates any trade secrets. Rundeck will defend licensees against such claims. For details, see [Rundeck Enterprise Master Software License Agreement](http://support.rundeck.com/customer/portal/articles/2723878-rundeckpro-license).

## License key installation

Ask for the license key to the support team. Then install the license key via the gui or on the filesystem directly.

### Via GUI

Upload the license key using the GUI:

![Upload the license key using the GUI](~@assets/img/license-key-gui-1.png)

Click on "No License Key File is installed"

![Click on "No License Key File is installed"](~@assets/img/license-key-gui-2.png)

Click on "Upload License File"

![Click on "Upload License File"](~@assets/img/license-key-gui-3.png)

Select the license key file and press "Upload License File"

![Agree to the Rundeck Master Software License Agreement](~@assets/img/license-key-gui-3-a.png)

Agree to the Rundeck Master Software License Agreement and Rundeck Support Policy then click "Confirm"

![View of installed license](~@assets/img/license-key-gui-4.png)

### Via filesystem

Copy the license file to the correct directory depending of the kind of installation.

License file name : rundeckpro-license.key ( don't change to a different name )

File location

Rundeck package RPM(Redhat/centos) or DEB (debian/ubuntu)
/etc/rundeck/

Rundeck Launcher
\$RD_BASE/etc/

Rundeck + Tomcat
\$RDECK_BASE/etc/
