% Installing on CentOS or Red Hat Linux distributions

## Open Source Rundeck

### Install with yum

You can use this script to add the Rundeck yum repo and install Rundeck:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ {.bash}
rpm -Uvh http://repo.rundeck.org/latest.rpm
sudo yum install rundeck java
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When new versions of Rundeck are released, you can upgrade to them using the command:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ {.bash}
sudo yum update rundeck
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

### Install rpm package directly

Download rpm package: http://rundeck.org/downloads.html and run:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ {.bash}
sudo rpm -i rundeck-x.x.x.noarch.rpm rundeck-config-x.x.x.noarch.rpm
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

## Rundeck Pro

### Install with yum 

You can use this script to add the Rundeck Pro yum repo and install Rundeck Pro cluster:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ {.bash}
curl https://bintray.com/rundeckpro/rpm/rpm | sudo tee /etc/yum.repos.d/bintray-rundeckpro-rpm.repo
sudo yum install java rundeckpro-cluster
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When new versions of Rundeck Pro are released, you can upgrade to them using the command:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ {.bash}
sudo yum update rundeckpro-cluster
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

### Install rpm package directly

Download rpm package: http://download.rundeck.com/eval/ and run:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ {.bash}
sudo rpm -i rundeckpro-cluster-X.X.X-GA.noarch.rpm
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

### Encrypted key/config storage 

Encrypted key/config storage enabled by default. The default encryption algorithm is stronger than the “Default JCE Policy” used in earlier versions of Java 1.8

Note: If you receive an error message about encryption policy strength with creating projects or keys you will need to upgrade your Java 1.8 version, or set the encryption algorithm in `rundeck-config.properties` to a lower strength algorithm such as `PBEWithMD5AndDES`

Further information about encrypted key/config storage on [this](http://rundeck.org/docs/plugins-user-guide/bundled-plugins.html#jasypt-encryption-plugin) link.


## Starting Rundeck

To start Rundeck:

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
