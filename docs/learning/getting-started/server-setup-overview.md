# Intro to Setting up a New Server
Installing a Rundeck server involves a series of crucial steps that must be executed with precision and attention to detail. When done correctly, it can provide organizations with a powerful platform to automate routine tasks, improve operational efficiency, and enhance collaboration between teams.<br>
The following steps show you how to prepare the Server properly.  These steps are also valid for PagerDuty Runbook Automation.<br>
### Step 1: [Prepare the Server](/administration/install/system-requirements.md)
Ensure that your server meets the minimum system requirements for Rundeck and keep all the server packages updated.<br>
### Step 2: [Install Java](/administration/install/system-requirements.md#java)
Rundeck requires Java JRE to run. Install the Java Runtime Environment (JRE).<br>
For example, on Ubuntu, you can use `sudo apt install openjdk-11-jre`<br>
### Step 3: [Install Rundeck](/administration/install/index.md)
Add the Rundeck repository to your package manager and install the latest Rundeck version depending on your operating system. For Windows-based servers, follow [this](/administration/install/windows.html#installing-on-windows).<br>
### Step 4: [Set the right server URL for Rundeck server](/administration/install/index.md#server-url)
Out of the box the Rundeck configurations set the `grails.ServerURL` (`rundeck-config.properties` file) value to `localhost`. To get access from another host, the `grails.ServerURL` must be defined using the server IP address or domain name. <br>
### Step 5: [Configure Rundeck against a database](/administration/install/index.md#database-configuration)
By default, Rundeck includes a testing database ([H2](/administration/configuration/database/#default-database-h2)). However, this backend isn't recommended for production environments. Configure Rundeck to use an external database as the backend as a best practice.<br>
### Step 6: [Start the Rundeck Server](/administration/maintenance/startup.md#startup-and-shutdown)
To start the Rundeck service, for systemd based systems (like the most popular Linux distributions) you can use the [service tool](/administration/maintenance/startup.html#rpm-and-deb). On a war launcher based installation, you can use the [rundeckd script](/administration/maintenance/startup.html#launcher).  For Windows servers, set the process up as a [service](/administration/install/windows.html#run-rundeck-as-a-service).<br>
### Step 7: Accessing Rundeck
To access Rundeck, open your favorite web browser and go to `http://ip_or_domainname:4440`. The default admin user name is `admin` (password: `admin`).<br>
## Resources
[Introduction to Rundeck](/about/introduction.html)<br>
[Startup and Shutdown Rundeck](/about/introduction.html)<br>
[Welcome Project tutorial](/learning/tutorial/index.html)<br>