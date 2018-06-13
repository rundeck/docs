% Quickstart

### What is Rundeck?

Rundeck is an open source web app that lets system operators repeatably and securely execute operations procedures in production and other environment contexts.

### What is Rundeck Pro?

What differentiates Rundeck Pro from the OSS Rundeck version is . . . .

### How can I try out Rundeck Pro?

**Note:** this setup is meant for evaluating Rundeck on your local workstation. For a guide to setting up Rundeck Pro in production see [Installation](../administration/install/index.html).

1. Fill out the [download form](https://www.rundeck.com/download-now) to access the download page.
1. Click on `➤ Cluster` and click on the the file ending in `.jar` to start the download.
1. Once the download is finished verify that the file's checksum matches the expected checksum:

    ```
    shasum -a 1 ~/Downloads/rundeckpro-launcher-cluster-${VERSION}.jar
    ```
1. Run the `.jar` file:

    ```
    java -XX:MaxPermSize=256m -Xmx1024m -jar ~/Downloads/rundeckpro-launcher-cluster-${VERSION}.jar
    ```
1. Once you see something similar to following log output, you know the server is ready:

    ```
    2018-04-23 16:18:58.889:INFO:oejs.ServerConnector:main: Started ServerConnector@2dcf960d{HTTP/1.1}{0.0.0.0:4440}
    ```
1. Navigate to [http://localhost:4440/](http://localhost:4440/user/login) in a browser
1. Log in with the username **admin** and password **admin**

Rundeck Pro is now running on your workstation for you to evaluate!

Next, learn how to [create your first Rundeck Pro project](http://rundeck.org/docs/manual/getting-started.html#project-setup)
