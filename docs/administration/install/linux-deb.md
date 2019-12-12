# Installing on Ubuntu or Debian Linux distributions

## Open Source Rundeck

### Install with apt-get

You can use this script to add the Rundeck apt repo and install Rundeck:

```bash
echo "deb https://rundeck.bintray.com/rundeck-deb /" | sudo tee -a /etc/apt/sources.list.d/rundeck.list
curl 'https://bintray.com/user/downloadSubjectPublicKey?username=bintray' | sudo apt-key add -
sudo apt-get update
sudo apt-get install rundeck
```

When new versions of Rundeck are released, you can upgrade to them using the command:

```bash
sudo apt-get update
sudo apt-get install rundeck
```

### Install deb package directly

Download deb package: http://rundeck.org/download/deb/ and run:

```bash
sudo dpkg -i rundeckpro-enterprise_3.1.x.deb
```

## Rundeck Enterprise

### Install with apt-get

You can use this script to add the Rundeck Enterprise apt repo and install Rundeck Enterprise cluster:

```bash
echo "deb https://rundeckpro.bintray.com/deb stable main" | sudo tee /etc/apt/sources.list.d/rundeck.list
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 379CE192D401AB61
sudo apt-get update
sudo apt-get install rundeckpro-enterprise
```

When new versions of Rundeck Enterprise are released, you can upgrade to them using the command:

```bash
sudo apt-get update
sudo apt-get install rundeckpro-enterprise
```

### Install deb package directly

Download deb package: http://download.rundeck.com/eval/ and run:

```bash
sudo dpkg -i rundeckpro-enterprise_3.1.x.deb
```

## Starting Rundeck

To start Rundeck:

```bash
sudo service rundeckd start
```

To verify that the service started correctly, tail the logs:

```bash
tail -f /var/log/rundeck/service.log
```

The service is ready once you see something similar to:

```
Grails application running at http://localhost:4440 in environment: production
```

## Logging in for the first time

1. Navigate to [http://localhost:4440/](http://localhost:4440) in a browser.
2. Log in with the username **admin** and password **admin**

Rundeck is now up and running!

Next, learn how to [create your first Rundeck Enterprise project](/manual/03-getting-started.md#project-setup)
