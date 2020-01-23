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

Note: When rundeck repository is configured in your system and you install a new fresh rundeck[pro*], you will be asked to install OpenJDK 11 (which is not supported with rundeck). It's recommended to :

1. Install Java 1.8 .

2. Verify java 1.8 version is installed

Example 
```bash
java -version
openjdk version "1.8.0_242"
OpenJDK Runtime Environment (AdoptOpenJDK)(build 1.8.0_242-b08)
OpenJDK 64-Bit Server VM (AdoptOpenJDK)(build 25.242-b08, mixed mode)
```

3. Install Rundeck 
```bash
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

### Clean Install from deb repository when existing version is present
1. First, Check for existing versions installed 

```bash
dpkg --list | grep -i rundeck
```
2. Then, remove existing version to perform a clean install. 

```bash
apt remove rundeck
dpkg --purge rundeck && apt install rundeck 
```

Note: "rundeck" package may have a different names like 
- rundeckpro-cluster - transitional package
- rundeckpro-dr - Rundeck Pro dr
- rundeckpro-enterprise - Rundeck
- rundeckpro-team - Rundeck team
- rundeck - Rundeck OSS 

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
