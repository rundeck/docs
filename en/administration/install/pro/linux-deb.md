% Installing on Ubuntu or Debian Linux distributions

## Install with apt-get

You can use this script to add the Rundeck Pro apt repo and install Rundeck Pro cluster:

```
echo "deb https://rundeckpro.bintray.com/deb stable main" | sudo tee /etc/apt/sources.list.d/rundeck.list
sudo apt-get install apt-transport-https
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 379CE192D401AB61
sudo apt-get update
sudo apt-get install rundeckpro-cluster
```

When new versions of Rundeck Pro are released, you can upgrade to them using the command:

```
sudo apt-get update
sudo apt-get install rundeckpro-cluster
```

## Install deb package directly

Download deb package: http://download.rundeck.com/eval/ and run:

```
sudo dpkg -i rundeckpro-EDITION_X.X.X-GA_all.deb
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

