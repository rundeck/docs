# SCM Plugins

## About

SCM Plugins come in two flavors: `ScmExport` and `ScmImport`.

`ScmExport`
: Allows exporting Job changes.

`ScmImport`
: Allows importing Job changes.

The two types can be combined or used separately.

## Configuring

Each Project can enable a single `ScmImport` and/or `ScmExport` plugin.

This is done in the SCM Configuration page in the Rundeck GUI.

Alternately, you can use the [Rundeck API - SCM](/api/rundeck-api.md#scm).

SCM Configuration for a project is _not_ stored in the `project.properties`
configuration contents.

## Tuning 

The following properties control how Process Automation interacts with external version control systems, such as Git or Subversion, to fetch and manage project definitions and job configurations. Here's a breakdown of each property:

The properties for the SCM plugin can be added to the system scope in `rundeck-config.properties` or using the `System Configuration` UI.

`rundeck.scmLoader.delay=value`

   - **Purpose**: This property sets the delay (in seconds) before the SCM loader begins its first execution after Rundeck starts.
   - **Default Value**: 0 (i.e., no initial delay)
   - **Usage**: You can adjust this value if you want to introduce a delay before Rundeck starts loading projects and job configurations from the SCM repository after the Rundeck service is launched. This can be helpful to ensure that other components or services are fully ready before Rundeck begins its synchronization.

`rundeck.scmLoader.interval=value`

   - **Purpose**: This property determines the interval (in seconds) at which the SCM loader will check the SCM repository for changes and update the Rundeck project accordingly.
   - **Default Value**: 20 seconds
   - **Usage**: You can modify this value to specify how often Rundeck should poll the SCM repository for updates. A shorter interval means more frequent checks for changes, while a longer interval reduces the frequency of checks. Choose an appropriate value based on your SCM repository's update frequency and performance considerations.

`rundeck.scmLoader.init.delay=value`

   - **Purpose**: This property sets an initial delay (in seconds) before the SCM loader performs its first check after Rundeck has started.
   - **Default Value**: 10 seconds
   - **Usage**: Similar to the first property, this one introduces a delay, but it affects the initial check for updates after Rundeck has started. You might use this delay to allow other components or services to complete their startup procedures before SCM synchronization begins.

`rundeck.scmLoader.init.retry=value`

   - **Purpose**: This property defines the number of times Rundeck will retry the initial SCM synchronization if it encounters errors during the initial synchronization attempt.
   - **Default Value**: 5 retries
   - **Usage**: If there are transient issues during the initial synchronization, such as temporary network problems or SCM repository unavailability, Rundeck will retry the synchronization up to the specified number of times. You can adjust this value to control how many retries are attempted before Rundeck gives up on the initial synchronization.

## Java Plugin Type

- _Note_: Refer to [Java Development](/developer/01-plugin-development.md#java-plugin-development) for information about developing a Java plugin for Rundeck.

The plugin interface is [ScmExportPluginFactory]({{{javaDocBase}}}/com/dtolabs/rundeck/plugins/scm/ScmExportPluginFactory.html).
This factory type should produce a [ScmExportPlugin][] object.

The plugin interface is [ScmImportPluginFactory]({{{javaDocBase}}}/com/dtolabs/rundeck/plugins/scm/ScmImportPluginFactory.html).
This factory type should produce a [ScmImportPlugin][] object.

[scmexportplugin]: {{{javaDocBase}}}/com/dtolabs/rundeck/plugins/scm/ScmExportPlugin.html
[scmimportplugin]: {{{javaDocBase}}}/com/dtolabs/rundeck/plugins/scm/ScmImportPlugin.html

## Localization

For the basics of plugin localization see: [Plugin Development - Plugin Localization](/developer/01-plugin-development.md#plugin-localization).

### Message Codes

In addition to the [basic plugin message codes](/developer/01-plugin-development.md#defining-plugin-localization-messages), SCM Plugins can have multiple "input views" with a set of properties,
as well as a set of "setup" properties.
The codes for these properties can be defined in your "messages.properties"
file using the following patterns:

- `setup.property.NAME.title` Title for setup property named "NAME"
- `setup.property.NAME.description` Description for setup property named "NAME"
- `action.ID.title` Title for action view with ID "ID"
- `action.ID.description` Description for action view with ID "ID"
- `action.ID.buttonTitle` Button Title for action view with ID "ID"
- `action.ID.property.NAME.title` Title for property named "NAME" for action view with ID "ID"
- `action.ID.property.NAME.description` Description for property named "NAME" for action view with ID "ID"

## Example

The Git Plugin bundled with rundeck provides an example.

View: [Git Plugin Source](https://github.com/rundeck/rundeck/tree/master/plugins/git-plugin).
