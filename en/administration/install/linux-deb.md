% Installing on Ubuntu or Debian Linux distributions

## Open Source Rundeck

### Install with apt-get

You can use this script to add the Rundeck apt repo and install Rundeck:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ {.bash}
echo "deb http://dl.bintray.com/rundeck/rundeck-deb /" | sudo tee -a /etc/apt/sources.list.d/rundeck.list 
echo "deb-src http://dl.bintray.com/rundeck/rundeck-deb /" | sudo tee -a /etc/apt/sources.list.d/rundeck.list
curl 'https://bintray.com/user/downloadSubjectPublicKey?username=bintray' | sudo apt-key add -
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 379CE192D401AB61
sudo apt-get update
sudo apt-get install rundeck
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When new versions of Rundeck are released, you can upgrade to them using the command:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ {.bash}
sudo apt-get update
sudo apt-get install rundeck
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

### Install deb package directly

Download deb package: http://rundeck.org/downloads.html and run:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ {.bash}
sudo dpkg -i rundeck_x.xx.x-x-GA_all.deb
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

## Rundeck Pro

### Install with apt-get

You can use this script to add the Rundeck Pro apt repo and install Rundeck Pro cluster:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ {.bash}
echo "deb https://rundeckpro.bintray.com/deb stable main" | sudo tee /etc/apt/sources.list.d/rundeck.list
sudo apt-get install apt-transport-https
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 379CE192D401AB61
sudo apt-get update
sudo apt-get install rundeckpro-cluster
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When new versions of Rundeck Pro are released, you can upgrade to them using the command:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ {.bash}
sudo apt-get update
sudo apt-get install rundeckpro-cluster
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

### Install deb package directly

Download deb package: http://download.rundeck.com/eval/ and run:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ {.bash}
sudo dpkg -i rundeckpro-EDITION_X.X.X-GA_all.deb
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

### Encrypted key/config storage 

Encrypted key/config storage enabled by default. The default encryption algorithm is stronger than the “Default JCE Policy” used in earlier versions of Java 1.8

Note: If you receive an error message about encryption policy strength with creating projects or keys you will need to upgrade your Java 1.8 version, or set the encryption algorithm in `rundeck-config.properties` to a lower strength algorithm such as `PBEWithMD5AndDES`

Further information about encrypted key/config storage on [this](http://rundeck.org/docs/plugins-user-guide/bundled-plugins.html#jasypt-encryption-plugin) link.


## Starting Rundeck

To start Rundeck Pro:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ {.bash}
sudo service rundeckd start
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

To verify that the service started correctly, tail the logs:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ {.bash}
tail -f /var/log/rundeck/service.log
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The service is ready once you see something similar to:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ {.bash}
2018-04-25 22:21:53.203:INFO:oejs.ServerConnector:main: Started ServerConnector@7d593bbc{HTTP/1.1}{0.0.0.0:4440}
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


## Logging in for the first time

1. Navigate to [http://localhost:4440/](http://localhost:4440/user/login) in a browser
1. Log in with the username **admin** and password **admin**

Rundeck is now up and running!

Next, learn how to [create your first Rundeck Pro project](../../manual/getting-started.html#project-setup)
