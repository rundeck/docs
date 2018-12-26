% Installing on Ubuntu or Debian Linux distributions

## Open Source Rundeck

### Install with apt-get

You can use this script to add the Rundeck apt repo and install Rundeck:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ {.bash}
echo "deb https://rundeck.bintray.com/rundeck-deb /" | sudo tee -a /etc/apt/sources.list.d/rundeck.list 
curl 'https://bintray.com/user/downloadSubjectPublicKey?username=bintray' | sudo apt-key add -
sudo apt-get update
sudo apt-get install rundeck
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When new versions of Rundeck are released, you can upgrade to them using the command:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ {.bash}
sudo apt-get update
sudo apt-get install rundeck
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

### Install deb package directly

Download deb package: http://rundeck.org/download/deb/ and run:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ {.bash}
sudo dpkg -i rundeckpro-cluster_3.0.x.deb
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

## Rundeck Pro

### Install with apt-get

You can use this script to add the Rundeck Pro apt repo and install Rundeck Pro cluster:

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ {.bash}
echo "deb https://rundeckpro.bintray.com/deb stable main" | sudo tee /etc/apt/sources.list.d/rundeck.list
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
sudo dpkg -i rundeckpro-cluster_3.0.x.deb
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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
Grails application running at http://localhost:4440 in environment: production
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

## Logging in for the first time

1. Navigate to [http://localhost:4440/](http://localhost:4440/user/login) in a browser
2. Log in with the username **admin** and password **admin**

Rundeck is now up and running!

Next, learn how to [create your first Rundeck Pro project][page:manual/02-getting-started.md#project-setup]
