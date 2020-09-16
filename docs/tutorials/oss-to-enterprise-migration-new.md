# Upgrading from Open Source to Enteprise Using a New Server

Congratulations, you have decided to use Rundeck Enterpise! You are on you way to automating your workflows. Before that happens, you need to get your Rundeck Enterprise set up. Fear not, this guide will get you set up no matter what kind of Rundeck user you are. 

## Getting Started

Before we get started, you have the option to delete unnecessary job execution history. By trimming this history exporting the jobs will proceed much faster and have you up and running sooner. This can be done by going to activity and choosing bulk delete. Then you can select all the executions you want deleted or click on the  "Toggle All," "Select All," or "Select None" links to change the selection.

## RPM Upgrade

* Export project setting from Rundeck Open Source. Go to the project that you wish to export, go to project settings and select "Export Archive." On the next page, you will be able to choose what all you want exported (Jobs, Executions, Configurations, etc.)
* To begin, stop your Rundeck OSS with the following command:
```
        service rundeckd stop
```
* Remove Rundeck using the following command:
```
        yum remove rundeck -y
```
Following the last command, modified files from `/etc/rundeck` will get .rpmsave extension
* Now, we are going to install rundeck enterprise by running the following commands:
 ```
    curl https://bintray.com/rundeckpro/rpm/rpm | sudo tee /etc/yum.repos.d/bintray-rundeckpro-rpm.repo
    sudo yum install java rundeckpro-enterprise
    yum install rundeckpro-enterprise -y
 ```   
* New files are in `/etc/rundeck/` among the .rpmsave. Do not restore full old files, just custom settings from .rpmsave to the new ones (except profile file), because enterprise files have new options.
* Now, need to restore converter passwords (and custom settings) in new rundeck-config-properties
* Do not edit profile file, add your custom config from it (if any) to /etc/sysconfig/rundeckd (create the file if it is not there)
* Restore other useful information from other files like ssl.properties or realm.properties.
* If you are going to use an external database, now is the time to set it up. In order to do so, follow the directions [here](https://docs.rundeck.com/docs/administration/configuration/database/#database-overview)
* Start your new Rundeck enterprise instance by running the following command:
```      
        service rundeckd restart
```
* Once in Rundeck, import the project archive files that you created in step 2. Create a new project, go to project settings and select "Import Archive." On the next page, you will be able to choose what all you want imported (Jobs, Executions, Configurations, etc.)
* Install license by choosing the license key file that was sent to you by a Rundeck team member. 
* Set execution mode to active
* Go to cluster manager, select  jobs, and select all orphan jobs and click action button/Change Job Schedule Owner and assign to a cluster member.

## Debian/Ubuntu Upgrade

* Export project setting from Rundeck Open Source. 
* Stop your Rundeck Open Source using the following command:
```
        service rundeckd stop
```
* Delete Rundeck Open Source using the following command:
```
        apt remove rundeck
```
* Install Rundeck Enterprise:
```
        apt install rundeckpro-enterprise
```
* Do not edit the profile file, add your custom config from it (if any) to /etc/default/rundeckd (create the file if it is not there)
* Start Rundeck Enterprise:
```
        service rundeckd restart
```
* Once in Rundeck, import the project archive files that you created in step 2. Create a new project, go to project settings and select "Import Archive." On the next page, you will be able to choose what all you want imported (Jobs, Executions, Configurations, etc.)
* Install license. Navigate to Rundeck and in the top right corner click the “No License Key.” On the next page, upload the file that contains your license key. If you do not have one, reach out to a Rundeck team member with your UUID.
* Set execution mode to active. Click on the gears icon in the top right corner and select “Execution Mode.” On the next page, ensure that execution mode is set to Active.
* Go to cluster manager, select the jobs tab, select all orphan jobs that you wish to assign to a cluster and click action button/Change Job Schedule Owner and assign to a cluster member

# WAR Upgrade

* Download the executable War from [here](https://download.rundeck.com/versions.html).
* Delete job execution history. If you do not, then the exporting of projects will take a much longer time.
* Export project setting from Rundeck Open Source. 
* Now, make sure that Rundeck Open Source is no longer running. 
* After the war is downloaded, define RDECK_BASE environment variable to the location of the install:
```
        export RDECK_BASE=$HOME/rundeck; # or where you like it
```
* Create the directory for the installation:
```
        mkdir -p $RDECK_BASE
```
* Copy the executable war to the installation directory:
```
        cp rundeck-{{{rundeckVersionFull}}}.war $RDECK_BASE
```
* Add any other configuration from your old Rundeck config files
* Change directories and start Rundeck:
```
        cd $RDECK_BASE
        java -Xmx4g -jar rundeck-{{{rundeckVersionFull}}}.war
```
* Update your shell environment:
```
        PATH=$PATH:$RDECK_BASE/tools/bin
        MANPATH=$MANPATH:$RDECK_BASE/docs/man
```
* Once in Rundeck, import the project archive files that you created in step 3. Create a new project, go to project settings and select "Import Archive." On the next page, you will be able to choose what all you want imported (Jobs, Executions, Configurations, etc.)
* Install license. Navigate to Rundeck and in the top right corner click the “No License Key.” On the next page, upload the file that contains your license key. If you do not have one, reach out to a Rundeck team member. 
* Set execution mode to active. Click on the gears icon in the top right corner and select “Execution Mode.” On the next page, ensure that execution mode is set to Active.
* Go to cluster manager, select the jobs tab, select all orphan jobs and click action button/Change Job Schedule Owner and assign to a cluster member



