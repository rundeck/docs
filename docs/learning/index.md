# Learning Rundeck

PagerDuty provides three different process automation versions.  The open source version is Rundeck.  Previously, the commercial version was referred to as Rundeck Enterprise, since renamed as Process Automation for the traditional on premise product and Runbook Automation for cloud users.

The Learning section includes _[Tutorials](/learning/tutorial/preparing.md)_, a _[Getting Started section](/learning/getting-started/overview.md)_ and _[How to Guides](/learning/howto/overview.md)_ that help new users quickly become productive with the Rundeck server and tools. Instructions are provided for both Enterprise and Community versions of Rundeck.

The _[Tutorials](/learning/tutorial/preparing.md)_ are practical step-by-step guides for getting Rundeck installed, configured and running on your system.  They are built around our Welcome Project and provide product simulations for the open source Rundeck, Process Automation and Runbook Automation versions.  

The [How To Guides](/learning/howto/overview.md) provide step by step instructions for accomplishing specific tasks using Process Automation/Runbook Automation and where applicable, Rundeck. New How To guides are developed and added periodically as our team realizes a need for them.

## Where to Begin

### Essential Concepts

Several essential concepts underly and drive the Rundeck system. Understanding them will help you more effectively use and integrate Rundeck into your environment.  New users are encouraged to review the concepts provided in the [Getting Started section](/learning/getting-started/jobs/overview.md) and the terms in the [Terminology](/learning/tutorial/terminology.md) section.

### Using Rundeck

If a running Rundeck instance isn't already available to you,
there are a couple ways you can try it.

#### Welcome Projects

Both the commercial (Process/Runbook Automation) and open source (Rundeck) versions have a companion set of code at the following links. These code bases allow running automation in a Docker environment with the Welcome Project preloaded.

- Process Automation/Runbook Automation: [https://github.com/rundeckpro/welcome-project](https://github.com/rundeckpro/welcome-project)
- Rundeck: [https://github.com/rundeck/welcome-project-community](https://github.com/rundeck/welcome-project-community)

Use the [Welcome Projects Starter How To guide](/learning/howto/welcome-project-starter.md) to learn how to get started with these environments.

:::tip License Required
Note: The Process Automation version will require a license file. If you are not currently a Process Automation customer and you’re interested in using that please [contact us here](https://www.rundeck.com/see-demo).
:::

:::warning
It is possible to run the Welcome Projects in other environments, but some exercise steps will need to be adjusted for your specific environment
:::

#### Download and Install
Get the latest release at our [download](https://download.rundeck.com/) site and install the Rundeck software. There are several package formats.  Choose the one that best suits the target infrastructure.

After installation, be sure Rundeck has been started.
::: tip
See [Startup](/administration/maintenance/startup.md) to learn how to  startup and shutdown rundeck.
:::

The default port for the web interface is `4440`. If you
installed Rundeck on your local machine, go to this URL: `http://localhost:4440`

### Login

Rundeck requires every user to login. The default installation
defines an "admin" user with access to perform all actions.
Use "admin" for username and password.

![Login form](~@assets/img/fig0202.png)