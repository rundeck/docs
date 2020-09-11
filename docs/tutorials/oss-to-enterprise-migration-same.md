# Upgrading from Open Source to Enteprise Using the Same Server

Congratulations, you have decided to use Rundeck Enterpise! You are on you way to automating your workflows. Before that happens, you need to get your Rundeck Enterprise set up. Fear not, this guide will get you set up no matter what kind of Rundeck user you are. 

## RPM Upgrade

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
* Start your new Rundeck enterprise instance by running the following command:
```      
        service rundeckd restart
```
* Install license by choosing the license key file that was sent to you by a Rundeck team member. 
* Set execution mode to active
* Go to cluster manager, select  jobs, and select all orphan jobs and click action button/Change Job Schedule Owner and assign to a cluster member.

## Debian/Ubuntu Upgrade

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
* Install license. Navigate to Rundeck and in the top right corner click the “No License Key.” On the next page, upload the file that contains your license key. If you do not have one, reach out to a Rundeck team member with your UUID.
* Set execution mode to active. Click on the gears icon in the top right corner and select “Execution Mode.” On the next page, ensure that execution mode is set to Active.
* Go to cluster manager, select the jobs tab, select all orphan jobs that you wish to assign to a cluster and click action button/Change Job Schedule Owner and assign to a cluster member

# WAR Upgrade

* Download the executable War from [here](https://download.rundeck.com/versions.html).
* To begin, make sure that Rundeck Open Source is no longer running. 
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
        cp rundeck-3.3.2-20200817.war $RDECK_BASE
```
* Add any other configuration from your old rundeck config files
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
* Install license. Navigate to Rundeck and in the top right corner click the “No License Key.” On the next page, upload the file that contains your license key. If you do not have one, reach out to a Rundeck team member. 
* Set execution mode to active. Click on the gears icon in the top right corner and select “Execution Mode.” On the next page, ensure that execution mode is set to Active.
* Go to cluster manager, select the jobs tab, select all orphan jobs and click action button/Change Job Schedule Owner and assign to a cluster member



