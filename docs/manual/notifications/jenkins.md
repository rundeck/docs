# Jenkins Notification Plugin (Enterprise)

Enterprise customers have access to this plugin that allows for triggering a build in Jenkins based off the execution status of a Rundeck job.

## Setup

:::tip
Before using the plugin, make sure an API key has been created in Jenkins and is ready to use. To create these values in Jenkins, select the profile from the top right corner. On the next page on the left side, there will be a "configure" section. Select that and on the next page, create a new API token. It is best to save this key in Rundeck key storage. To do so, navigate to the gear icon in the top right corner of rundeck and select "Key Storage." On the next page, select "Add or Upload Key" and add the API key as a password.
:::

## Configure

![Jenkins Notification - Configuration](~@assets/img/jenkins-notification.png)

- **Jenkins URL**
: This the URL for the Jenkins account. (i.e. http://localhost:8080)

- **User**
: The user for the account that matches the API token and contains the build to trigger. 

- **Token**
: This is the API token that we created and added to Rundeck in the [setup](#Setup)

## Configure in Settings

All of the above properties can also be configured in the project configuration or framework.properties, as shown in the image below:

![Jenkins Notification - Properties](~@assets/img/jenkins-config.png)



