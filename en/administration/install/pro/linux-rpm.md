% Installing on CentOS or Red Hat Linux distributions

## Install with yum 

You can use this script to add the Rundeck Pro apt repo and install Rundeck Pro cluster:

```
curl https://bintray.com/rundeckpro/rpm/rpm | sudo tee /etc/yum.repos.d/bintray-rundeckpro-rpm.repo
sudo yum install java rundeckpro-cluster # NOTE: Should java be include as an rpm dep?
```

When new versions of Rundeck Pro are released, you can upgrade to them using the command:

```
sudo yum update rundeckpro-cluster
```

## Install rpm package directly

Download rpm package: http://download.rundeck.com/eval/ and run:

```
sudo rpm -i rundeckpro-cluster-X.X.X-GA.noarch.rpm
```

## Starting Rundeck Pro

To start Rundeck Pro:

```
sudo service rundeckd start
```

To verify that the service started correctly, tail the logs:

```
tail -f /var/log/rundeck/service.log
```

The service is ready once you see something similar to:
```
2018-04-25 22:21:53.203:INFO:oejs.ServerConnector:main: Started ServerConnector@7d593bbc{HTTP/1.1}{0.0.0.0:4440}
```

