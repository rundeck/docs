# Extend the Rundeck Docker image

## What is Docker?
Docker is a platform used by many organizations to run virtualized applications.  In addition to managing servers that are Docker containers, it is possible to run Rundeck (or PagerDuty Process Automation) in a Docker container.  The default Rundeck Docker image uses standard [variables](/administration/configuration/docker.html#environment-variables) to configure the main Rundeck settings. However, specific, non-standard variables can be added to use third-party plugins or add specific non-standard functionality.
When using Docker, the image must be complete and nothing extra can be installed once the container is started. All configuration files, required software, etc., must be incorporated when the image is built and custom configurations must be exposed via environment variables.


## What is Remco?
Remco is a lightweight configuration management tool (highly influenced by[ confd](https://github.com/kelseyhightower/confd)) that can be used in conjunction with Docker. Remco’s main benefits are:
* Keeping local configuration files up-to-date using data stored in a key/value store like _etcd_ or _consul_ and processing template resources.
* Reloading applications to pick up new config file changes.

Rundeck uses a template system to build configuration files based on environment variables. Template files such as `rundeck-config.properties`, `framework.properties`, and `log4j2.properties` control the main configuration aspects of Rundeck.  Remco generates these templates. 

Extending the base Rundeck Docker image happens for a variety of reasons, including: 
* Copying plugins/addons to the container
* Adding or modifying configuration files (explained in this article)
* Other files need to be copied to the image

### About the Remco structure
A custom Remco template requires a defined folder structure. For example, a parent folder called `remco` is required, with two folders inside called `resource.d` and `templates`.

Rundeck Docker structure with Remco:
![](/assets/img/dockerstructure.png)

Inside the `resource.d` folder, `.toml` files must be created. These files define the source and destination path where the configuration files will be copied. 

A `.toml` file example:
```
[[template]]
src = "${REMCO_TEMPLATE_DIR}/extra-rundeck-config.properties"
dst = "${REMCO_TMP_DIR}/rundeck-config/extra-rundeck-config.properties"
mode = "0644"
```
## An example: Adding a Docker variable through Remco
### Exercise Goal:
By adding remco template files, create a new `rundeck.feature.joblifecycleplugin.enabled=true` entry in the `rundeck-config.properties` file.

### Exercise Steps
1. Create `rundeck-config-extra.properties` file at `mydocker/remco/templates/` path with the following content:
    ```
    # adding extra stuff to rundeck-config.properties file
    rundeck.feature.jobLifecyclePlugin.enabled={{ getv("/rundeck/feature/joblifecycleplugin/enabled", "true") }}
    ```
2. Create `rundeck-config.properties-extra.toml` file at `mydocker/remco/resources.d/` path with the following content:
    ```
    [[template]]
     src = "${REMCO_TEMPLATE_DIR}/rundeck-config-extra.properties"
     dst = "${REMCO_TMP_DIR}/rundeck-config/rundeck-config-extra.properties" 
     mode = "0644"
    ```
3. Create the `docker-compose.yaml` at `mydocker/` path with the following content:
	```
	version: '3'
	services:
	 rundeckserver:
	   build:
	     context: .
	     dockerfile: Dockerfile
	     args:
	       url: http://localhost:4440
	   ports:
	     - "4440:4440"
	   restart: always
	```
4. Create `Dockerfile` at `mydocker/` path with the following content:
	```
	FROM rundeck/rundeck:4.4.0
	COPY --chown=rundeck:root remco /etc/remco
    COPY --chown=rundeck:root volume/job-lifecycle-3.2.3-20200221.jar /home/rundeck/libext/
	ARG url=""
	ENV RUNDECK_SERVER_ADDRESS=0.0.0.0
	ENV RUNDECK_GRAILS_URL=http://localhost:4440
	```
5. Build the custom image:
	```
	docker-compose build
	```
6. Run and see the container in action:
	```
	docker-compose up
	```
	That adds this line in the rundeck-config.properties file:
	```
    # adding extra stuff to rundeck-config.properties file
    rundeck.feature.jobLifecyclePlugin.enabled=true
	```

## Resources
* [Extending Rundeck Image using Remco](https://docs.rundeck.com/docs/administration/configuration/docker/extending-configuration.html#extending-docker-configuration) (Rundeck documentation).
* [Here](https://github.com/rundeck/docker-zoo/tree/master/config) is a good Remco templating system example.
