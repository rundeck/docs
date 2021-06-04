# Installing on CentOS or Red Hat Linux distributions


## Installing Rundeck
:::: tabs

::: tab Enterprise
### Quick install with yum

You can use this script to add the Rundeck Enterprise yum repo:

```bash
curl https://raw.githubusercontent.com/rundeck/packaging/main/scripts/rpm-setup.sh 2> /dev/null | sudo bash -s rundeckpro
```


### Manual yum setup

Remove `bintray-rundeckpro-rpm.repo` if it exists.

Add the following entries to `/etc/yum.repos.d/rundeck.repo` replacing any existing entries:
```properties
[rundeckpro]
name=rundeckpro
baseurl=https://packages.rundeck.com/pagerduty/rundeckpro/rpm_any/rpm_any/$basearch
repo_gpgcheck=1
gpgcheck=0
enabled=1
gpgkey=https://packages.rundeck.com/pagerduty/rundeckpro/gpgkey
sslverify=1
sslcacert=/etc/pki/tls/certs/ca-bundle.crt
metadata_expire=300
```

```bash
sudo yum install java rundeckpro-enterprise
```

When new versions of Rundeck Enterprise are released, you can upgrade to them using the command:

```bash
sudo yum update rundeckpro-enterprise
```

### Install rpm package directly

Download rpm package from the [download page](https://download.rundeck.com/eval/) and run:

```bash
sudo rpm -i rundeckpro-enterprise-{{{rundeckVersionFull}}}-1.noarch.rpm
```
:::

::: tab Community
### Quick install with yum

You can use this script to add the Rundeck yum repo and install Rundeck:

```bash
curl https://raw.githubusercontent.com/rundeck/packaging/main/scripts/rpm-setup.sh 2> /dev/null | sudo bash -s rundeck
```

When new versions of Rundeck are released, you can upgrade to them using the command:

```bash
sudo yum update rundeck
```

### Manual yum setup
Add the following entries to `/etc/yum.repos.d/rundeck.repo` replacing any existing entries:

```properties
[rundeck]
name=rundeck
baseurl=https://packages.rundeck.com/pagerduty/rundeck/rpm_any/rpm_any/$basearch
repo_gpgcheck=1
gpgcheck=0
enabled=1
gpgkey=https://packages.rundeck.com/pagerduty/rundeck/gpgkey
sslverify=1
sslcacert=/etc/pki/tls/certs/ca-bundle.crt
metadata_expire=300
```

### Install rpm package directly

Download rpm package from the [download page](http://docs.rundeck.com/docs/downloads.html) and run:

```bash
sudo rpm -i rundeck-{{{rundeckVersionFull}}}-1.noarch.rpm
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

1. Navigate to [http://localhost:4440/](http://localhost:4440/user/login) in a browser
1. Log in with the username **admin** and password **admin**

Rundeck is now up and running!

Next, learn how to [create your first Rundeck Enterprise project](/manual/03-getting-started.md#project-setup)
