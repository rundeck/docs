# Configure Rundeck behind an Egress Proxy

:::tip
Though these instructions reference Rundeck, they can also be applied to environments running the Enterprise versions of the product, PagerDuty [Runbook Automation](https://www.pagerduty.com/platform/automation/runbook/) or [Process Automation](https://www.pagerduty.com/platform/automation/process-software/).
:::

## Overview
In most organizations, all network infrastructure (including servers) stays isolated from the Internet by default for security reasons. 

In this specific scenario, the only way for Rundeck to reach the Internet is by using a proxy server. While in most situations Rundeck does not need internet access to operate, there are cases where job steps need to be able to reach out to SaaS tools such as AWS, ServiceNow, or Jira.

This guide demonstrates how to add the correct parameters to reach a proxy server.

## Set proxy server parameters

### Linux based Rundeck instance

If your Rundeck instance needs a proxy server to access the internet add the following line in the `rundeckd` [file](https://docs.rundeck.com/docs/administration/configuration/system-properties.html#rpm-and-deb), located at` /etc/sysconfig/rundeckd `in RedHat/CentOS/Rocky based Linux distributions or `/etc/default/rundeckd `on Debian/Ubuntu based Linux distributions. If the file isn't present, you can create it.

```
RDECK_JVM_OPTS="-Dhttp.proxySet=true -Dhttp.proxyHost=proxy_server_hostname -Dhttp.proxyPort=8888 -Dhttps.proxySet=true -Dhttps.proxyHost=proxy_server_hostname -Dhttps.proxyPort=8888 -Dhttp.nonProxyHosts=any_direct_host"
```

### Windows based Rundeck instance

On [Windows](https://docs.rundeck.com/docs/administration/install/windows.html#installing-on-windows) based instances, the process is quite different. Just add these parameters to the `RDECK_CLI_OPTS` variable in the `profile.bat` file:

```
set RDECK_CLI_OPTS=-Xms2048m -Xmx4096m -Dhttp.proxySet=true -Dhttp.proxyHost=proxy_server_hostname -Dhttp.proxyPort=8888 -Dhttps.proxySet=true -Dhttps.proxyHost=proxy_server_hostname -Dhttps.proxyPort=8888 -Dhttp.nonProxyHosts=any_direct_host
```

Then save the file and restart the server.

### Parameters explained
* `http.proxySet` & `https.proxySet`: Enables the proxy config on the java app.
* `http.proxyHost` & `https.proxyHost:` The host name of the proxy server.
* `http.proxyPort` & `https.proxyPort`: The port number, (default value is 80, 8888 in the example).
* `http.nonProxyHosts`: A list of hosts to be reached directly, bypassing the proxy.

### Config testing environment
To test these concepts quickly, a Docker environment is useful. Docker is a container system that provides a computer network abstraction, providing a using a virtual network. 

Each container is a computer in a virtual network. The easiest way to use Docker is to install Docker Desktop, [instructions](https://docs.docker.com/desktop/) depending on your main Operating System. [Here](https://docker-curriculum.com/) is a basic guide to understand how it works.

This Docker environment contains two containers (nodes): the official Rundeck container (extended to add the custom JVM parameters explained above) and the `reiz/nginx_proxy `container as a preconfigured Egress Proxy. You can find the full nginx_proxy project [here](https://github.com/reiz/nginx_proxy).

1. Create a directory called "egress_test" and then create a `docker-compose.yml` file with the following content:
	```
	version: '3'
	services:

	  rundeck:
		build:
	  	context: .
	  	args:
	    	IMAGE: rundeck/rundeck:4.8.0
		command: "-Dhttp.proxySet=true -Dhttp.proxyHost=proxysrv -Dhttp.proxyPort=8888 -Dhttps.proxySet=true -Dhttps.proxySet=true -Dhttps.proxyHost=proxysrv -Dhttps.proxyPort=8888 -Dhttp.nonProxyHosts=proxysrv"
		ports:
	  	- 4440:4440
		environment:
	  	RUNDECK_GRAILS_URL: http://localhost:4440
		networks:
	  	- int

	  proxysrv:
		image: reiz/nginx_proxy:0.0.3
		volumes:
	  	- ./conf/nginx_denylist.conf:/usr/local/nginx/conf/nginx.conf
		ports:
	  	- 8888:8888
		networks:
	  	- ext
	  	- int

	networks:
	  int:
		internal: true

	  ext:
		external: true
	```
2. Now create a new file called `Dockerfile` with the following content:
	```
	ARG IMAGE

	FROM rundeck/rundeck:4.8.0

	USER root

	# base network tools
	RUN apt-get update && apt-get -y install iputils-ping curl nmap mc

	# rd cli to interact with rundeck instance
	RUN curl -s https://packagecloud.io/install/repositories/pagerduty/rundeck/script.deb.sh | os=any dist=any bash && apt-get update && apt-get install rundeck-cli

	USER rundeck

	# rd cli env vars
	ENV RD_AUTH_PROMPT false
	ENV RD_URL http://localhost:4440
	ENV RD_USER admin
	ENV RD_PASSWORD admin
	```
	This file allows you to build a custom container, adding the RD CLI tool to the Rundeck base container.
3. Create a new directory called "conf" and create a new file called "`nginx_denylist.conf`" with the following content:
	```
	user www-data;
	worker_processes auto;
	daemon off; # Don't run Nginx as a daemon, as we run it in Docker we need a foreground process.
	events { }

	http {
		server_names_hash_bucket_size 128;

		access_log /var/log/nginx_access.log;
		error_log /var/log/nginx_errors.log;

		# Denylist Google
		server {
	    	listen   	8888;
	    	server_name  google.com;
	    	server_name  *.google.com;
	    	return 404;
		}
	

		# Everything else is allowed
		server {
	    	  listen   	8888;
	    	  server_name ~.+;
	    	  proxy_connect;
	    	  proxy_max_temp_file_size 0;
	    	  resolver 8.8.8.8;
	    	  location / {
	       	  proxy_pass http://$http_host;
	       	  proxy_set_header Host $http_host;
	    	  }
		}
	}
	```
	This is just the proxy configuration for the NGINX web server (check [this](https://www.nginx.com/resources/wiki/start/topics/examples/full/) basic example). It blocks any connection from the google domain. In this environment, if any system needs to get "outside" to the Internet, it needs to pass through this proxy server. It's based on [this](https://github.com/reiz/nginx_proxy) project.

## Running and testing
1. Create the network, this is needed by the whole environment and allows you to create the basic external network to reach the Internet using your current network device.
	```
	docker network create --driver bridge ex
	```
2.  Build the environment:
	```
	docker compose build
	```
3. Run the Docker environment:
	```
	docker compose up
	```
4. Now, enter to the rundeck container using:
	```
	docker exec -it rundeck_container bash
	```
5. Execute the following command to test that the Rundeck instance container can't access the internet: 
	```
	curl https://kernel.org
	```
6. Now, test the Proxy connection:
	```
	curl https://kernerl.org -x srvproxy:8888
	```
7. List all available plugins from the official repository (using Rundeck you can see all plugins available from the external Rundeck repository via Egress Proxy):
	```
	rd plugins list
	```
8. And finally, download a plugin using RD CLI:
	```
	rd plugins install -r official -i <plugin_id>
	```
This command downloads and installs the plugin from the official plugin repository via proxy server configured at the JVM level.

## Resources
* [Oracle proxy documentation.](https://docs.oracle.com/javase/8/docs/technotes/guides/net/proxies.html)
* [Rundeck JVM settings.](https://docs.rundeck.com/docs/administration/configuration/system-properties.html#rpm-and-deb)