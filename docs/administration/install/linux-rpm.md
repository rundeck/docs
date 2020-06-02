# Installing on CentOS or Red Hat Linux distributions

## Rundeck Enterprise

### Install with yum

You can use this script to add the Rundeck Enterprise yum repo and install Rundeck Enterprise cluster:

```bash
curl https://bintray.com/rundeckpro/rpm/rpm | sudo tee /etc/yum.repos.d/bintray-rundeckpro-rpm.repo
sudo yum install java rundeckpro-enterprise
```

When new versions of Rundeck Enterprise are released, you can upgrade to them using the command:

```bash
sudo yum update rundeckpro-enterprise
```

### Install rpm package directly

Download rpm package: http://download.rundeck.com/eval/ and run:

```bash
sudo rpm -i rundeckpro-enterprise-{{{rundeckVersionFull}}}-1.noarch.rpm
```


## Open Source Rundeck

### Install with yum

You can use this script to add the Rundeck yum repo and install Rundeck:

```bash
rpm -Uvh http://repo.rundeck.org/latest.rpm
sudo yum install rundeck java
```

When new versions of Rundeck are released, you can upgrade to them using the command:

```bash
sudo yum update rundeck
```

### Install rpm package directly

Download rpm package: http://rundeck.org/downloads.html and run:

```bash
sudo rpm -i rundeck-{{{rundeckVersionFull}}}-1.noarch.rpm
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

1. Navigate to [http://localhost:4440/](http://localhost:4440/user/login) in a browser
1. Log in with the username **admin** and password **admin**

Rundeck is now up and running!

Next, learn how to [create your first Rundeck Enterprise project](/manual/03-getting-started.md#project-setup)
