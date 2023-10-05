# Configure S3 or Minio for Storing Execution Logs
Rundeck execution logs are a set of files generated after each job execution. By default, Rundeck stores them on the local filesystem. Another way to store these logs is on a dedicated file storage service like [AWS S3](https://aws.amazon.com/s3/).<br><br>
By delegating this storage to AWS S3 (or any other S3-compatible bucket system like [Minio](https://min.io/)) it’s possible to use some [features](https://aws.amazon.com/s3/features/) like S3 replication, security management, data persistence, and saving space on the local filesystem.<br><br>
In PagerDuty Process Automation (formerly “Rundeck Enterprise”) [cluster](/administration/cluster/#cluster-overview), S3-compatible storage should be the default configuration to ensure access to logs from any cluster member.<br><br>
This article explains how to configure Rundeck so that these execution logs are stored on services such as Amazon S3 or Minio.

## Steps to configure S3 execution logs on Rundeck OSS / Process Automation for Global Config

1. Stop the Rundeck service<br>
   ```
   systemctl stop rundeckd
   ``` 
1. S3 Log Storage Plugin<br>
   ::: tabs
   @tab Rundeck
   Add the S3 log storage [plugin](https://github.com/rundeck-plugins/rundeck-s3-log-plugin) on the `libext` directory (at `$RDECK_BASE/libext` directory).<br>
   ```
   wget https://github.com/rundeck-plugins/rundeck-s3-log-plugin/releases/download/v1.0.12/rundeck-s3-log-plugin-1.0.12.jar -P $RDECK_BASE/libext
   ```
   :::
   @tab PagerDuty Process Automation
   Process Automation includes its own plugin for this out of the box<br>  
   :::
   ::::
1. To enable the S3 / Minio log storage plugin, add the following line on the `rundeck-config.properties` file<br>
   ::: tabs
   @tab Rundeck
   ```
   rundeck.execution.logs.fileStoragePlugin=org.rundeck.amazon-s3
   ``` 
   :::
   @tab PagerDuty Process Automation

   ```
   rundeck.execution.logs.fileStoragePlugin=com.rundeck.rundeckpro.amazon-s3
   ```
   
   :::
   :::: 
1. Then open the `framework.properties` file and add the S3 / Minio bucket info as follow:

::: tabs
@tab Rundeck Community

```
framework.plugin.ExecutionFileStorage.org.rundeck.amazon-s3.endpoint=http://192.168.1.14:9000
framework.plugin.ExecutionFileStorage.org.rundeck.amazon-s3.AWSAccessKeyId=your_s3_or_minio_access_key
framework.plugin.ExecutionFileStorage.org.rundeck.amazon-s3.AWSSecretKey=your_s3_or_minio_access_key
framework.plugin.ExecutionFileStorage.org.rundeck.amazon-s3.bucket=test-rundeck-logs
framework.plugin.ExecutionFileStorage.org.rundeck.amazon-s3.path=logs/${job.project}/${job.execid}.log
framework.plugin.ExecutionFileStorage.com.rundeck.amazon-s3.region=your_instance_region
```
@tab PagerDuty Process Automation

```
framework.plugin.ExecutionFileStorage.com.rundeck.rundeckpro.amazon-s3.endpoint=http://192.168.1.14:9000
framework.plugin.ExecutionFileStorage.com.rundeck.rundeckpro.amazon-s3.AWSAccessKeyId=your_s3_or_minio_access_key
framework.plugin.ExecutionFileStorage.com.rundeck.rundeckpro.amazon-s3.AWSSecretKey=your_s3_or_minio_access_key
framework.plugin.ExecutionFileStorage.com.rundeck.rundeckpro.amazon-s3.bucket=test-rundeck-logs
framework.plugin.ExecutionFileStorage.com.rundeck.rundeckpro.amazon-s3.path=logs/${job.project}/${job.execid}.log
framework.plugin.ExecutionFileStorage.com.rundeck.rundeckpro.amazon-s3.region=your_instance_region
```
:::

**Definitions:**

* `endpoint`: A custom S3 compatible endpoint to use, such as `https://my-host.com/s3`
* `pathStyle`: Optional, boolean, `default=False`, set to `True` if you need to define the bucket in your S3 like endpoint URL. e.g: `https://<s3_like_end_point_url\>/<your_bucket_name\>`
* `AWSAccessKeyId`: AWS access key, required if using `AWSSecretKey`.
* `AWSSecretKey`: AWS secret key, required if using `AWSAccessKeyId`.
* `AWSCredentialsFile`: Properties file which contains `accessKey` and `secretKey` entries. The alternative to specifying the `AWSAccessKeyId` and `AWSSecretKey`
* `bucket`: The name of the S3 bucket to use. This is the shorthand name, eg `test-rundeck-logs`
* `region`: The Region your Instance is located, eg `us-east-1`

## Test basic setup

1. Start the Rundeck service.<br>
1. Create a new project.<br>
1. Create a new job and then execute it, now the execution log is stored in the S3/Minio bucket.<br>
![ ](/assets/img/minio1.png)<br>
1. From Rundeck click on the Gear Icon and then to the Log Storage option, now you can see the Log Storage Activity.<br>
![ ](/assets/img/minio2.png)<br>

## PagerDuty Process Automation (formerly “Rundeck Enterprise”) System Configuration

1. As admin rights users click on the Gear Icon and then click on “System Configuration”.<br>
![ ](/assets/img/minio3.png)<br>
1. Then click on the “+ Add Config” button.<br>
![ ](/assets/img/minio4.png)<br>
1. Add the following property `rundeck.execution.logs.fileStoragePlugin` with the following value `com.rundeck.rundeckpro.amazon-s3`.<br>
![ ](/assets/img/minio5.png)<br>
1. Add the following custom properties:<br>
![ ](/assets/img/minio6.png)<br>
1. Restart the PagerDuty Process Automation service.<br>

## Steps to configure S3 execution logs on Rundeck OSS / Process Automation for individual projects

1. As admin rights users click on `Project Settings` then `Edit Configuration` and then Edit `Configuration File`<br>
![ ](/assets/img/minio3.png)<br>
2. Then add these lines with your information:
```
project.plugin.ExecutionFileStorage.com.rundeck.rundeckpro.amazon-s3.AWSAccessKeyId=your_aws_access_key
project.plugin.ExecutionFileStorage.com.rundeck.rundeckpro.amazon-s3.AWSSecretKey=your_aws_secret_key
project.plugin.ExecutionFileStorage.com.rundeck.rundeckpro.amazon-s3.bucket=your_s3_bucket_name
project.plugin.ExecutionFileStorage.com.rundeck.rundeckpro.amazon-s3.path=logs/${job.project}/${job.execid}.log
project.plugin.ExecutionFileStorage.com.rundeck.rundeckpro.amazon-s3.region=your_instance_region
```

3. Then click Save button.
4. Restart the PagerDuty Process Automation service.<br>

## Docker Config
::: tabs
@tab Rundeck Community

### Extending the image
The  S3 Log Storage Plugin isn’t bundled out of the box with Rundeck. To use it on a Docker image it is necessary to extend the image using Remco.  [Remco](https://github.com/HeavyHorst/remco) is used to generate the Rundeck configuration files from templates. This allows storing parts of the configuration space in different backends. The default configuration uses environment variables.

The Remco documentation is available [here](/administration/configuration/docker/extending-configuration.html#extending-docker-configuration).

### Full Docker Minio / Rundeck example

This is the example file structure of a custom Rundeck image with the S3 Log Storage Plugin.<br>

![ ](/assets/img/minio8.png)<br>

The` Dockerfile` file content (inside docker project base directory)<br>

```
FROM rundeck/rundeck:4.5.0

# root user tasks
USER root

# install python
RUN apt-get -y update && \
   apt-get -y install python3-pip && \
   pip install --upgrade pip

# rundeck user tasks
USER rundeck

ADD --chown=rundeck:root https://github.com/rundeck-plugins/rundeck-s3-log-plugin/releases/download/v1.0.13/rundeck-s3-log-plugin-1.0.13.jar libext/
COPY --chown=rundeck:root remco /etc/remco
COPY --chown=rundeck:root plugins/* ./libext/
```


The` docker-compose.yml` file content (inside docker project base directory):


```
version: '3'
services:
 rundeck:
   build:
     context: .
     args:
       IMAGE: rundeck/rundeck:4.5.0
   ports:
   - 4440:4440
   environment:
     RUNDECK_GRAILS_URL: 'http://localhost:4440'
     RUNDECK_PLUGIN_EXECUTIONFILESTORAGE_NAME: org.rundeck.amazon-s3
     RUNDECK_PLUGIN_EXECUTIONFILESTORAGE_S3_ENDPOINT: http://minio:9000/
     RUNDECK_PLUGIN_EXECUTIONFILESTORAGE_S3_BUCKET: rundeck
     RUNDECK_PLUGIN_EXECUTIONFILESTORAGE_S3_REGION: us-east-1
     RUNDECK_PLUGIN_EXECUTIONFILESTORAGE_S3_PATHSTYLE: "true"
     RUNDECK_PLUGIN_EXECUTIONFILESTORAGE_S3_ACCESSKEY: minioadmin
     RUNDECK_PLUGIN_EXECUTIONFILESTORAGE_S3_SECRETKEY: minioadmin
 minio:
   image: minio/minio:latest
   ports:
     - 9000:9000
     - 9001:9001
   entrypoint: sh
   command: -c 'mkdir /rundeck && /opt/bin/minio server /rundeck --console-address ":9001"'
   environment:
       MINIO_ACCESS_KEY: minioadmin
       MINIO_SECRET_KEY: minioadmin
 createbuckets:
    image: minio/mc:latest
    depends_on:
      - minio
    entrypoint: >
      /bin/sh -c "
      /usr/bin/mc config host add myminio http://minio:9000 minioadmin minioadmin;
      /usr/bin/mc mb myminio/rundeck;
      /usr/bin/mc policy download myminio/rundeck;
      exit
      "
```


The` custom-framework.properties.toml` file content (inside `myrundeck/remco/resources.d/`directory):


```
[[template]]
	src     	= "${REMCO_TEMPLATE_DIR}/custom-framework.properties"
	dst     	= "${REMCO_TMP_DIR}/framework/custom-framework.properties"
	mode    	= "0644"
```


The` plugin-rundeck-config.properties.toml` file (inside `myrundeck/remco/resources.d/`directory):


```
[[template]]
	src     	= "${REMCO_TEMPLATE_DIR}/plugin-rundeck-config.properties"
	dst     	= "${REMCO_TMP_DIR}/rundeck-config/plugin-rundeck-config.properties"
	mode    	= "0644"
```


The` custom-framework.properties` file (inside `myrundeck/remco/templates/`directory)


```
framework.plugin.ExecutionFileStorage.org.rundeck.amazon-s3.path=logs/${job.project}/${job.execid}.log
framework.plugin.ExecutionFileStorage.org.rundeck.amazon-s3.AWSAccessKeyId={{ getv("/rundeck/plugin/executionfilestorage/s3/accesskey") }}
framework.plugin.ExecutionFileStorage.org.rundeck.amazon-s3.AWSSecretKey={{ getv("/rundeck/plugin/executionfilestorage/s3/secretkey") }}
framework.plugin.ExecutionFileStorage.org.rundeck.amazon-s3.endpoint={{  getv("/rundeck/plugin/executionfilestorage/s3/endpoint") }}
framework.plugin.ExecutionFileStorage.org.rundeck.amazon-s3.pathStyle={{ getv("/rundeck/plugin/executionfilestorage/s3/pathstyle") }}
```


`Plugin-rundeck-config.properties `(inside `myrundeck/remco/templates/` directory):


```
rundeck.execution.logs.fileStorage.storageRetryDelay=5
rundeck.execution.logs.fileStorage.retrievalRetryDelay=5
rundeck.execution.logs.fileStorage.checkpoint.time.minimum=5s
rundeck.execution.logs.fileStorage.checkpoint.time.interval=5s
rundeck.feature.pagedjoblist.enabled=true
```


### Building and Running



1. With all environment set, build the image doing: `docker-compose build`
1. After that, run the project using the following command: `docker-compose up`
1. Enter the Rundeck instance in the following URL: `http://localhost:4000`, user: `admin`, password: `admin`.
1. Create a new Project.
1. Go to the “Commands” Section and dispatch any command against the local node.
1. Check the Minio web interface (<code>[http://localhost:9001](http://localhost:9001), </code>user:<code> minioadmin, </code>password:<code> minioadmin</code>), now all Rundeck executions are stored on the “rundeck” bucket.<br>

![ ](/assets/img/minio9.png)<br>

@tab PagerDuty Process Automation

The following env vars are included on the Process Automation Docker image by default and are needed to enable S3/Minio log storage on the Docker container:

```
RUNDECK_PLUGIN_EXECUTIONFILESTORAGE_NAME
```

(With the following value: `com.rundeck.rundeckpro.amazon-s3`)

```
RUNDECK_PLUGIN_EXECUTIONFILESTORAGE_S3_BUCKET
RUNDECK_PLUGIN_EXECUTIONFILESTORAGE_S3_REGION 
RUNDECK_PLUGIN_EXECUTIONFILESTORAGE_S3_PATH 
RUNDECK_PLUGIN_EXECUTIONFILESTORAGE_S3_AWSACCESSKEYID
RUNDECK_PLUGIN_EXECUTIONFILESTORAGE_S3_AWSSECRETKEY
```

Full Docker example:

1. Run this `docker-compose.yml` example with `docker-compose up` command:<br>
   ```
   version: '3'
   services:
     rundeck:
         image: rundeckpro/enterprise:4.3.1
         environment:
           RUNDECK_GRAILS_URL: 'http://localhost:4440'
           RUNDECK_PLUGIN_EXECUTIONFILESTORAGE_NAME: com.rundeck.rundeckpro.amazon-s3
           RUNDECK_PLUGIN_EXECUTIONFILESTORAGE_S3_BUCKET: rundeck
           RUNDECK_PLUGIN_EXECUTIONFILESTORAGE_S3_REGION: us-east-1
           RUNDECK_PLUGIN_EXECUTIONFILESTORAGE_S3_AWSACCESSKEYID: minioadmin
           RUNDECK_PLUGIN_EXECUTIONFILESTORAGE_S3_AWSSECRETKEY: minioadmin
           RUNDECK_PLUGIN_EXECUTIONFILESTORAGE_S3_ENDPOINT: http://minio:9000
           RUNDECK_PLUGIN_EXECUTIONFILESTORAGE_S3_PATHSTYLE: "true"
         ports:
           - 4440:4440
     minio:
       image: minio/minio:latest
       ports:
         - 9000:9000
         - 9001:9001
       entrypoint: sh
       command: -c 'mkdir /rundeck && /opt/bin/minio server /rundeck --console-address ":9001"'
       environment:
           MINIO_ACCESS_KEY: minioadmin
           MINIO_SECRET_KEY: minioadmin
     createbuckets:
        image: minio/mc:latest
        depends_on:
          - minio
        entrypoint: >
          /bin/sh -c "
          /usr/bin/mc config host add myminio http://minio:9000 minioadmin minioadmin;
          /usr/bin/mc mb myminio/rundeck;
          /usr/bin/mc policy download myminio/rundeck;
          exit
          "
   ```
1. Enter the Rundeck instance in another browser tab: `http://localhost:4440`, user: `admin`, password: `admin`.<br>
1. Create a new Project.<br>
1. Go to the “Commands” Section and dispatch any command against the local node.<br>
1. Check the Minio web interface in another browser tab (<code>[http://localhost:9001](http://localhost:9001), </code>user:<code> minioadmin, </code>password:<code> minioadmin</code>), now, all Rundeck executions are stored on the “rundeck” bucket.<br>

![ ](/assets/img/minio10.png)<br>

:::

## Resources

* [S3/Minio Log Storage configuration](/administration/cluster/logstore/s3.html#s3-log-storage-plugin) (Rundeck documentation).
* [S3 Log Storage Plugin GitHub space](https://github.com/rundeck-plugins/rundeck-s3-log-plugin).
* [Extending Rundeck Docker Image](/administration/configuration/docker/extending-configuration.html#extending-configuration) (Rundeck Documentation).
