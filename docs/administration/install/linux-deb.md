# Installing on Ubuntu or Debian Linux distributions

## Installing Rundeck

:::warning 
Rundeck depends on **Java 11** or **Java 8**. The **Java 14**
packages will satisfy this dependency however Rundeck will not function properly
with them. It is recommended to install the `openjdk-11-jre-headless` package manually.
:::

```bash
sudo apt-get install openjdk-11-jre-headless
```

:::: tabs

::: tab Enterprise

### Quick install with apt
```bash
curl https://raw.githubusercontent.com/rundeck/packaging/main/scripts/deb-setup.sh 2> /dev/null | sudo bash -s rundeckpro
```

### Manual install with apt

Import the repo signing key:
```bash
curl -L https://packages.rundeck.com/pagerduty/rundeckpro/gpgkey | sudo apt-key add -
```

Add the following to `/etc/apt/sources.list.d/rundeck.list` replacing existing entries:
```bash
deb https://packages.rundeck.com/pagerduty/rundeckpro/any/ any main
deb-src https://packages.rundeck.com/pagerduty/rundeckpro/any/ any main
```

Update apt cache and install:
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

### Install deb package directly

Download `deb` package from [the download page](https://download.rundeck.com/eval/) and run:

```bash
sudo dpkg -i rundeckpro-enterprise_{{{rundeckVersionFull}}}-1_all.deb
```
:::

::: tab Community
### Quick install with apt

```bash
curl https://raw.githubusercontent.com/rundeck/packaging/main/scripts/deb-setup.sh 2> /dev/null | sudo bash -s rundeck
```

### Manual install with apt

Import the repo signing key:
```bash
curl -L https://packages.rundeck.com/pagerduty/rundeck/gpgkey | sudo apt-key add -
```

Add the following to `/etc/apt/sources.list.d/rundeck.list` replacing existing entries:
```bash
deb https://packages.rundeck.com/pagerduty/rundeck/any/ any main
deb-src https://packages.rundeck.com/pagerduty/rundeck/any/ any main
```

Update apt cache and install:
```bash
sudo apt-get update
sudo apt-get install rundeck
```
### Install deb package directly

Download deb package from [the download page](https://docs.rundeck.com/downloads.html) and run:

```bash
sudo dpkg -i rundeck_{{{rundeckVersionFull}}}-1_all.deb
```
:::

::::
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
