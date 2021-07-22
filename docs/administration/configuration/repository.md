# Repository

This document describes the Rundeck Repository features, which allow you to install plugins from the official Rundeck Repository, or to configure your own repositories for serving plugins to your own private installation.
You can use the repositories to find plugins using the "Find Plugins" entry under the Plugins menu that is accessed from the gear icon in the GUI. You can also use the `rd` tool to install, uninstall, and upload plugins that are saved in these repositories.

### Prerequisites

In order to use the official Rundeck Repository your Rundeck server must be allowed to connect to the internet and to access `https://api.rundeck.com` based urls.
If you do not wish to allow your Rundeck server to reach the internet you can still use the private repository features, but the official Rundeck repository will be unavailable to you, and should be disabled.


## Enabling the Repository feature

To enable the repositories. Add the flag:

`rundeck.feature.repository.enabled=true`

to your rundeck-config.properties file.

## GUI Usage

Each repository that is enabled will show up in the Rundeck user interface when you click the gear icon then go to Plugins>Find Plugin.

![Find Plugins](~@assets/img/plugins-find.png)

When you go to the plugin page you will see each repository and the plugins they provide.

The plugins are each represented by a card. The following image explains the content of the plugin card.  

![Plugin Card](~@assets/img/plugin-card.png)

If you have the official repository enabled you will see some plugins with an install button. These plugins can be immediately installed by clicking the `Install` button. When the plugin is installed, it will be pulled from the Rundeck repository and copied into the correct location in your Rundeck installation. After installation, it is ready for immediate use. Some plugins do not have an install button. Manual installation is required for those plugins. To install those plugins you need to click on the source link icon ![source link icon](~@assets/img/repo-source-icon.png), which will take you to the plugins source page, and there you can check for instructions regarding the install of that plugin.

Installable plugins are also un-installable. Just click the `Uninstall` button to uninstall the plugin. This will delete the plugin from the correct location immediately.

All plugins that you add to your private repository are installable and un-installable from the GUI.

## Configuration

When you enable the Rundeck Repository the following default files and directories are created for you:

* `RDECK_BASE/server/config/artifact-repositories.yaml` - Repositories are configured in this file.
* `RDECK_BASE/repository/artifacts` - The directory into which your private plugins will be copied when you use the `upload` command to build your private plugin repository.
* `RDECK_BASE/repository/installedPlugins` - The directory into which plugins will be copied when you use install them either from the offical Rundeck repository or your private repository.

Both the `artifacts` and `installedPlugins` locations are configurable using the storage tree mechanism.  

### Installed Plugin Storage

When you install a plugin from a repository into your Rundeck instance, the plugin will be copied into the `libext` folder as usual. The plugin will also be copied to a location
that you can configure using the storage tree mechanism. Optionally, the location can be a central location all of your Rundeck instances share which can keep the plugins they have installed in sync.
You can only have one location specified for storing installed plugins.

The following examples show how to configure the installed plugin location:

##### Save installed plugins to your local filesystem at the location: /opt/repository/installedPlugins
`rundeck-config.properties`

``` properties
rundeck.repository.plugins.provider.1.type=file
rundeck.repository.plugins.provider.1.path=/
rundeck.repository.plugins.provider.1.config.baseDir=/opt/repository/installedPlugins
```

##### Save installed plugins to your local filesystem at the location: /opt/repository/content/installedPlugins
`rundeck-config.properties`

``` properties
rundeck.repository.plugins.provider.1.type=file
#This must match the storageTreePath below
rundeck.repository.plugins.provider.1.path=/installedPlugins
rundeck.repository.plugins.provider.1.config.baseDir=/opt/repository

#Must match the path previously specified in the storage tree configuration
rundeck.feature.repository.installedPlugins.storageTreePath=/installedPlugins
```

Note: In the example above the storage tree path was not the default '/' root location, therefore the extra property:
`rundeck.feature.repository.installedPlugins.storageTreePath` was required. This property is not required if the '/' default root is used.


##### Save installed plugins to a Minio object store
`rundeck-config.properties`

``` properties
rundeck.repository.plugins.provider.1.type=object
rundeck.repository.plugins.provider.1.path=/
rundeck.repository.plugins.provider.1.config.bucket=repository
rundeck.repository.plugins.provider.1.config.objectStoreUrl=http://your-minio-server:9000
rundeck.repository.plugins.provider.1.config.secretKey=YOUR_SECRET_KEY
rundeck.repository.plugins.provider.1.config.accessKey=YOUR_ACCESS_KEY
```

##### Save installed plugins to a Minio object store for cluster where all members sync their plugins on bootstrap
`rundeck-config.properties`

``` properties
rundeck.repository.plugins.provider.1.type=object
rundeck.repository.plugins.provider.1.path=/
rundeck.repository.plugins.provider.1.config.bucket=repository
rundeck.repository.plugins.provider.1.config.objectStoreUrl=http://your-minio-server:9000
rundeck.repository.plugins.provider.1.config.secretKey=YOUR_SECRET_KEY
rundeck.repository.plugins.provider.1.config.accessKey=YOUR_ACCESS_KEY
#Set this property so that the object store directory will not be cached on the Rundeck instance
#rundeck.repository.artifacts.provider.1.config.uncachedObjectLookup=true
#This cluster member will pull it's plugins from the installed plugin location and install them when it bootstraps
rundeck.feature.repository.syncOnBootstrap=true
```

### Repositories

Repositories are locations that store plugin jar and zip files that may be installed into a Rundeck instance.

Here are some examples for various configurations of private artifact repositories.

#### Filesystem

##### Save private repository plugin artifacts to your local filesystem at the location: /opt/repository/content/artifacts
`rundeck-config.properties`

``` properties
rundeck.repository.artifacts.provider.1.type=file
rundeck.repository.artifacts.provider.1.path=/artifacts
rundeck.repository.artifacts.provider.1.config.baseDir=/opt/repository
```

`artifact-repositories.yaml`

```yaml
-   repositoryName: Private
    type: STORAGE_TREE
    configProperties:
        storageTreePath: /artifacts
```

#### Object Store

##### Save private repository plugin artifacts to a minio object store
`rundeck-config.properties`

``` properties
rundeck.repository.artifacts.provider.1.type=object
rundeck.repository.artifacts.provider.1.path=/minio
rundeck.repository.artifacts.provider.1.config.bucket=repository
rundeck.repository.artifacts.provider.1.config.objectStoreUrl=http://your-minio-server:9000
rundeck.repository.artifacts.provider.1.config.secretKey=YOUR_SECRET_KEY
rundeck.repository.artifacts.provider.1.config.accessKey=YOUR_ACCESS_KEY
```

`artifact-repositories.yaml`

```yaml
-   repositoryName: MinioRepo
    type: STORAGE_TREE
    configProperties:
        storageTreePath: /minio
```

##### Use a file store for one repo and an object store for another
`rundeck-config.properties`

``` properties
rundeck.repository.artifacts.provider.1.type=file
rundeck.repository.artifacts.provider.1.path=/repo1
rundeck.repository.artifacts.provider.1.config.baseDir=/opt/repository

rundeck.repository.artifacts.provider.2.type=object
rundeck.repository.artifacts.provider.2.path=/minio
rundeck.repository.artifacts.provider.2.config.bucket=repository
rundeck.repository.artifacts.provider.2.config.objectStoreUrl=http://your-minio-server:9000
rundeck.repository.artifacts.provider.2.config.secretKey=YOUR_SECRET_KEY
rundeck.repository.artifacts.provider.2.config.accessKey=YOUR_ACCESS_KEY
```

`artifact-repositories.yaml`

```yaml
-   repositoryName: Repo1
    type: STORAGE_TREE
    configProperties:
        storageTreePath: /repo1
-   repositoryName: Repo2
    type: STORAGE_TREE
    configProperties:
        storageTreePath: /minio
```

### Using the repositories with the `rd` tool

The `rd` tool can be used to list plugins, install plugins from a repository, upload to a private repository, and uninstall plugins.

#### List Plugins

```rd plugins```

```bash
==Official Repository==
2e51ce08c836 : rundeck-http-workflow-step-plugin : 1.0.11 (not installed)
def44eeac568 : nixy-local-steps : v1.2.6 (installed)
ee1e33e004e0 : nixy-file : v1.2.6 (not installed)
681c33f5c3fd : openssh-bastion-host : 1.0.0 (installed)
86177619503e : slack-notification-plugin : 1.2.6 (not installed)
1d56241b6d14 : rundeck-azure-storage-plugin : 1.0.0 (not installed)
5c3a72ab196c : http-notification-plugin : 0.1.0-SNAPSHOT (installed)  (Updateable to 1.0.5)
452e4837ebb6 : jira-notification-2 : 1.0.1 (not installed)
15712f2421d1 : kubernetes-plugin-2 : 1.0.0 (installed)  (Updatable to 1.0.12)
59ed572534b2 : py-winrm-plugin : 1.0.7 (installed)  (Updateable to 2.0.1)
01a78578d6d9 : hashicorp-vault : 1.3.0 (installed)
d8a7e2981805 : s3-log-storage-plugin : 1.0.7 (installed)
d4338c89f3f6 : nixy-step-plugin-waitfor : v1.2.6 (not installed)
904beafe241b : aws-s3-step-plugin : 1.2.1 (installed)
765bd99fd03b : puppet-apply-step : 1.0 (installed)
f39ba031afe7 : rundeckansible : 3.0.1 (not installed)
7b324410cef0 : rundeck-ec2-nodes-plugin : 1.5.10 (not installed)
01a78578d6d9 : vault-storage : 1.3.0 (installed)
36cc72f36df7 : jq-json-log-filter : 1.0.2 (not installed)
3eb57b31591f : rundeck-winrm : 1.3.5 (installed)
55e70e8b52d7 : rundeck-rainbow : 0.1.2 (installed)
681c33f5c3fd : openssh-bastion-host-node-execution : 1.0.0 (installed)
904beafe241b : aws-cli-plugin : 1.2.1 (installed)
ac67623a4999 : pagerduty-notification : 1.2.1 (not installed)
fa61f23b7a1c : jira-workflow-step : 1.0.1 (not installed)
==Private Repository==
01843c9fbe3d : Icon Nodes Enhancer : 0.1.4-SNAPSHOT (not installed)
```

#### Install Plugin

This would install the Icon Node Enhancer plugin listed previously

```rd plugins install -r Private -i 01843c9fbe3d```

```bash
Plugin Installed
```

#### Uninstall Plugin

This would uninstall the Icon Node Enhancer plugin that was previously installed

```rd plugins uninstall -i 01843c9fbe3d```

```bash
Plugin Uninstalled
```

#### Upload Plugin

To upload a plugin into your private plugin repository execute:

```rd plugins upload -r Private -f /path/to/your/plugin.jar```

or

```rd plugins upload -r Private -f /path/to/your/plugin.zip```

which will give you the message:

```bash
Upload succeeded
```

At this time only java and script plugin types are uploadable into a repository

### How to disable a repository

If you need to disable a repository for some reason, but would like to retain the entry in your
`artifact-repositories.yaml` file, you can add an `enabled: false` property to the repository
entry and it will be disabled. Once disabled, the repository will no longer show up in the Find Plugins GUI or
when using the `rd` tool.

Example:

```yaml
-   repositoryName: Private
    enabled: false
    type: STORAGE_TREE
    configProperties:
        storageTreePath: /artifacts
```
