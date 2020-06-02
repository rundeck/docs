# Enterprise Quickstart

## What is Rundeck Enterprise?

Rundeck Enterprise is the enterprise-ready edition of Rundeck, the most popular open-source runbook automation solution.  More details about the features that distinguish Enterprise from our Open Source version are [covered here](https://www.rundeck.com/enterprise).

## How can I try out Rundeck Enterprise?

**Note:** this setup is meant for evaluating Rundeck on your local workstation. For a guide to setting up Rundeck Enterprise in production see [Installation](/administration/install/index.md).

1. Visit our [Download Site](https://download.rundeck.com/) and get the latest rundeckpro-enterprise-{{{rundeckVersionFull}}}.war file.
2. Once the download is finished verify that the file's checksum matches the expected checksum:

```sh
shasum -a 1 ~/Downloads/rundeckpro-enterprise-{{{rundeckVersionFull}}}.war
```

3. Run the `.war` file:

```sh
java -XX:MaxPermSize=256m -Xmx1024m -jar ~/Downloads/rundeckpro-enterprise-{{{rundeckVersionFull}}}.war
```

4. Once you see something similar to following log output, you know the server is ready:

```
Grails application running at http://0.0.0.0:4440 in environment: production
```

5. Navigate to [http://localhost:4440/](http://localhost:4440/user/login) in a browser
6. Log in with the username **admin** and password **admin**

Rundeck Enterprise is now running on your workstation for you to evaluate!

If you'd like assistance or more help feel free to reach out at: https://www.rundeck.com/see-demo

## Encrypted key/config storage

Encrypted key/config storage enabled by default. The default encryption algorithm is stronger than the “Default JCE Policy” used in earlier versions of Java.

Note: If you receive an error message about encryption policy strength with creating projects or keys you will need to upgrade your Java version, or set the encryption algorithm in `rundeck-config.properties` to a lower strength algorithm such as `PBEWithMD5AndDES`

Further information about encrypted key/config storage on [this](/administration/configuration/plugins/bundled-plugins.md#jasypt-encryption-plugin) link.

## What is next?

Next, learn how to [create your first Rundeck Enterprise project](/manual/03-getting-started.md#project-setup)
