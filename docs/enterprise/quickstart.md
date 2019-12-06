# Enterprise Quickstart

### What is Rundeck?

Rundeck is an open source web app that lets system operators repeatably and securely execute operations procedures in production and other environment contexts.

### What is Rundeck Enterprise?

What differentiates Rundeck Enterprise from the OSS Rundeck version is . . . .

### How can I try out Rundeck Enterprise?

**Note:** this setup is meant for evaluating Rundeck on your local workstation. For a guide to setting up Rundeck Enterprise in production see [Installation](/administration/install/index.md).

1. Fill out the [download form](https://www.rundeck.com/download-now) to access the download page.
1. Click on `➤ Cluster` and click on the the file ending in `.jar` to start the download.
1. Once the download is finished verify that the file's checksum matches the expected checksum:

   ```
   shasum -a 1 ~/Downloads/rundeckpro-launcher-cluster-{{{rundeckVersionFull}}}.jar
   ```

1. Run the `.jar` file:

   ```
   java -XX:MaxPermSize=256m -Xmx1024m -jar ~/Downloads/rundeckpro-launcher-cluster-{{{rundeckVersionFull}}}.jar
   ```

1. Once you see something similar to following log output, you know the server is ready:

   ```
   2018-04-23 16:18:58.889:INFO:oejs.ServerConnector:main: Started ServerConnector@2dcf960d{HTTP/1.1}{0.0.0.0:4440}
   ```

1. Navigate to [http://localhost:4440/](http://localhost:4440/user/login) in a browser
1. Log in with the username **admin** and password **admin**

Rundeck Enterprise is now running on your workstation for you to evaluate!

### Encrypted key/config storage

Encrypted key/config storage enabled by default. The default encryption algorithm is stronger than the “Default JCE Policy” used in earlier versions of Java 1.8

Note: If you receive an error message about encryption policy strength with creating projects or keys you will need to upgrade your Java 1.8 version, or set the encryption algorithm in `rundeck-config.properties` to a lower strength algorithm such as `PBEWithMD5AndDES`

Further information about encrypted key/config storage on [this](/administration/configuration/plugins/bundled-plugins.md#jasypt-encryption-plugin) link.

### What is next?

Next, learn how to [create your first Rundeck Enterprise project](/manual/03-getting-started.md#project-setup)
