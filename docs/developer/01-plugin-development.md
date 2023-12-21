# Plugin Development

There are currently three ways to develop plugins:

1. [Java plugin development](#java-plugin-development): Develop Java code that is distributed within a Jar file.
2. [Script Plugin Development](#script-plugin-development): Write shell/system scripts that implement your desired behavior and put them in a zip file with some metadata.
3. [Groovy Plugin Development](#groovy-plugin-development): Write groovy scripts to implement Notification and Logging plugins.

Either way, the resultant plugin archive file, either a .jar java archive,
or a .zip file archive, will be placed in the plugin directory
(Launcher: `$RDECK_BASE/libext`, RPM,DEB: `/var/lib/rundeck/libext`).

## Java Plugin Development

Java plugins are distributed as .jar files containing the necessary classes for
one or more service provider, as well as any other java jar dependency files.

Each classname listed must be a valid "[Provider Class](#provider-classes)" as defined below,
and must have a `@Plugin` annotation to define its service type and provider name.

The `.jar` file you distribute must have this metadata within the main Manifest
for the jar file to be correctly loaded by the system:

- `Rundeck-Plugin-Version: 1.2`
- `Rundeck-Plugin-Archive: true`
- `Rundeck-Plugin-Classnames: classname,..`
- `Rundeck-Plugin-Libs: lib/something.jar ...` _(optional)_
- `Rundeck-Plugin-Author: Author name` _(optional)_
- `Rundeck-Plugin-URL: Website URL` _(optional)_
- `Rundeck-Plugin-Date: Publication date` _(optional)_ in ISO8601 format

Additionally, you should include a manifest entry to indicate the plugin file's version:

- `Rundeck-Plugin-File-Version: 1.x`

This version number will be used to load only the newest plugin file, if more than one provider of
the same name and type is defined.

### Plugin Version

`Rundeck-Plugin-Version` indicates the plugin mechanism version

### Build dependencies

Rundeck's jars are published to the central Maven repository so you can simply specify a dependency in your build file.

- `rundeck-core` is the primary build dependency for most plugin types
  - [org.rundeck:rundeck-core:{{ $rundeckVersionFull }}](https://search.maven.org/artifact/org.rundeck/rundeck-core/{{ $rundeckVersionFull }}/jar)

- `rundeck-storage-api` is also required for [Storage Plugin](/developer/07-storage-plugin.md).
  - [org.rundeck:rundeck-storage-api:{{$rundeckVersionFull}}](https://search.maven.org/artifact/org.rundeck/rundeck-storage-api/{{$rundeckVersionFull}}/jar)

For gradle, use:

```java
compile(group:'org.rundeck', name: 'rundeck-core', version: '{{$rundeckVersionFull}}')
```

For maven use:

```xml
<dependencies>
   <dependency>
      <groupId>org.rundeck</groupId>
      <artifactId>rundeck-core</artifactId>
      <version>{{$rundeckVersionFull}}</version>
      <scope>compile</scope>
   </dependency>
</dependencies>
```

If your Java classes require external libraries that are not included with
the Rundeck runtime, you can include them in your .jar archive. (Look in
`/var/lib/rundeck/lib` to see the set of
third-party jars that are available for your classes by default at runtime).

Specify the `Rundeck-Plugin-Libs` attribute in the Main attributes of the
Manifest for the jar, set the value to a space-separated list of jar file names
as you have included them in the jar.

E.g.:

    Rundeck-Plugin-Libs: lib/somejar-1.2.jar lib/anotherjar-1.3.jar

Then include the jar files in the Plugin's jar contents:

    META-INF/
    META-INF/MANIFEST.MF
    com/
    com/mycompany/
    com/mycompany/rundeck/
    com/mycompany/rundeck/plugin/
    com/mycompany/rundeck/plugin/test/
    com/mycompany/rundeck/plugin/test/TestNodeExecutor.class
    lib/
    lib/somejar-1.2.jar
    lib/anotherjar-1.3.jar

### Available Services

The Rundeck core makes use of several different "Services" that provide functionality for
executing steps, getting information about Nodes or sending notifications.

Plugins can contain one or more Service Provider implementations.
Each plugin file could contain multiple Providers for different types of services,
however typically each plugin file would contain only providers related in some fashion.

Node Execution services:

- `NodeExecutor` - executes a command on a node [javadoc]({{{javaDocBase}}}/com/dtolabs/rundeck/core/execution/service/NodeExecutor.html).
- `FileCopier` - copies a file to a node [javadoc]({{{javaDocBase}}}/com/dtolabs/rundeck/core/execution/service/FileCopier.html).

Resource model services:

- `ResourceModelSource` - produces a set of Node definitions for a project [javadoc]({{{javaDocBase}}}/com/dtolabs/rundeck/core/resources/ResourceModelSource.html).
- `ResourceFormatParser` - parses a document into a set of Node resources [javadoc]({{{javaDocBase}}}/com/dtolabs/rundeck/core/resources/format/ResourceFormatParser.html).
- `ResourceFormatGenerator` - generates a document from a set of Node resources [javadoc]({{{javaDocBase}}}/com/dtolabs/rundeck/core/resources/format/ResourceFormatGenerator.html).

Workflow Step services (described in [Workflow Step Plugin](/developer/03-step-plugins.md)):

- `WorkflowStep` - runs a single step in a workflow.
- `WorkflowNodeStep` - runs a single step for each node in a workflow.
- `RemoteScriptNodeStep` - generates a script or command to execute remotely for each node in a workflow.

Notification services (described in [Notification Plugin](/developer/05-notification-plugins.md)):

- `Notification` - performs an action after a Job state trigger.

Storage services:

- `Storage` - backend for storing data: [Storage Plugin](/developer/07-storage-plugin.md)
- `StorageConverter` - modifies stored content or metadata: [Storage Converter Plugin](/developer/08-storage-converter-plugins.md)

Logging services:

- `ExecutionFileStorage` - stores and retrieves execution files to another location: [Execution File Storage Plugin](/developer/06-logging-plugins.md)
- `StreamingLogWriter` - writes execution log events to a destination: [Streaming Log Writer Plugin](/developer/06-logging-plugins.md)
- `StreamingLogReader` - reads execution log events from a destination: [Streaming Log Reader Plugin](/developer/06-logging-plugins.md)

Orchestrator:

- `Orchestrator` - orchestrates node dispatching: [Orchestrator Plugin](/developer/09-orchestrator-plugin.md)

### Provider Classes

A "Provider Class" is a java class that implements a particular interface and declares
itself as a provider for a particular Rundeck "Service".

Each plugin also defines a "Name" that identifies it for use in Rundeck. The Name
of a plugin is also referred to as a "Provider Name", as the plugin class is a
provider of a particular service.

You should choose a unique but simple name for your provider.

Each plugin class must have the
[Plugin]({{{javaDocBase}}}/com/dtolabs/rundeck/core/plugins/Plugin.html) annotation applied to it.

```java
@Plugin(name="myprovider", service="NodeExecutor")
public class MyProvider implements NodeExecutor {
...
}
```

Your provider class must have at least a zero-argument constructor, and optionally
can have a single-argument constructor with a
`com.dtolabs.rundeck.core.common.Framework` parameter, in which case your
class will be constructed with this constructor and passed the Framework
instance.

You may log messages to the ExecutionListener available via
[ExecutionContext#getExecutionListener()]({{{javaDocBase}}}/com/dtolabs/rundeck/core/execution/ExecutionContext.html) method.

You can also send output to `System.err` and `System.out` and it will be
captured as output of the execution.

### Provider Lifecycle

Provider classes are instantiated when needed by the Framework object, and the
instance is retained within the Service for future reuse. The Framework
object may exist across multiple executions, and the provider instance may be
reused.

Provider instances may also be used by multiple threads.

Your provider class should not use any instance fields and should be
careful not to use un-threadsafe operations.

### Plugin failure results

Some plugin methods return a "Result" interface which indicates the result status of the call to the plugin class. If there is an error, some plugins allow an Exception to be thrown or for the error to be included in the Result class. In both cases, there is a "FailureReason" that must be specified.
See the javadoc:
[FailureReason]({{{javaDocBase}}}/com/dtolabs/rundeck/core/execution/workflow/steps/FailureReason.html).

This can be any implementation of the FailureReason interface, and this object's `toString()` method will be used to return the reason value (for example, it is passed to Error Handler steps in a Workflow as the "result.reason" string). The mechanism used internally is to provide an Enum implementation of the FailureReason interface, and to enumerate the possible reasons for failure within the enum.

You are encouraged to re-use existing FailureReasons as much as possible as they provide some basic failure causes. Existing classes:

- [NodeStepFailureReason]({{{javaDocBase}}}/com/dtolabs/rundeck/core/execution/workflow/steps/node/NodeStepFailureReason.html)
- [StepFailureReason]({{{javaDocBase}}}/com/dtolabs/rundeck/core/execution/workflow/steps/StepFailureReason.html)

### Plugin Descriptions

To define a plugin that presents custom GUI configuration properties and/or
uses Project/Framework level configuration, you need to provide a Description
of your plugin. The Description defines metadata about the plugin, such as the
display name and descriptive text, as well as the list of all
configuration Properties that it supports.

There are several ways to declare your plugin's Description:

**Collaborator interface**

Implement the
[DescriptionBuilder.Collaborator]({{{javaDocBase}}}/com/dtolabs/rundeck/plugins/util/DescriptionBuilder.Collaborator.html) interface
in your plugin class, and it will be given an opportunity to perform actions on the Builder object before it finally constructs a Description.

**Describable interface**

If you want to build the Description object yourself, you can do so by
implementing the
[Describable]({{{javaDocBase}}}/com/dtolabs/rundeck/core/plugins/configuration/Describable.html)
interface. Return a
[Description]({{{javaDocBase}}}/com/dtolabs/rundeck/core/plugins/configuration/Description.html) instance. You can
construct one by using the
[DescriptionBuilder]({{{javaDocBase}}}/com/dtolabs/rundeck/plugins/util/DescriptionBuilder.html) builder class.

**Description Annotations**

Newer plugin types support using java annotations to create a Description object.
See [Plugin Annotations](/developer/02-plugin-annotations.md).

**Provider Metadata**

See [Plugin Annotations - Plugin Provider Metadata](/developer/02-plugin-annotations.md#plugin-provider-metadata).

#### Description Properties

Within a Description object you can define a set of Property objects, which represent the input properties for the plugin.

Some plugin types support using Java Annotations to define properties, see [Plugin Annotations](/developer/02-plugin-annotations.md).

For the remaining plugin types, the Properties must be defined using the other interfaces described above, typically with the use of a [PropertyBuilder]({{{javaDocBase}}}/com/dtolabs/rundeck/plugins/util/PropertyBuilder.html).

**Rendering Options**

You can specify "rendering options" to affect the property being rendered in the Rundeck GUI. These affect Property type _String_ only:

- Textarea: renders the input as a multi-line text area.
- Password: renders the input as a password input.

For more information see the options under [Property Rendering options](#property-rendering-options).

A set of constants for the supported rendering option keys and some values are provided in the [StringRenderingConstants]({{{javaDocBase}}}/com/dtolabs/rundeck/core/plugins/configuration/StringRenderingConstants.html).

### Internationalization/Localization for Jar files

Since Rundeck 2.6.10, Plugins support Internationalization ("i18n") using Java properties files.

Include a `resources/i18n` directory in your jar file, with localized versions of your Plugin messages.

See [Plugin Localization][].

## Groovy Plugin Development

Some types of plugins can be created with a simple Groovy-based DSL.
This gives you a simpler way to develop plugins, but still provides the power of Java. Of course, you can build a Java plugin using Groovy, however this DSL allows you to create a plugin within a single file for simple
use cases.

To create a Groovy based plugin, create a file named `MyXYZPlugin.groovy` in the plugins directory for Rundeck.

You must restart rundeck to make the plugin available the first time, but you can subsequently update the .groovy script without restarting Rundeck.

### Groovy DSL

Within the Groovy script, you define your plugin by calling the `rundeckPlugin` method, and pass it both the Class of the type of plugin, and a Closure used to build the plugin object.

```java
import  com.dtolabs.rundeck.plugins.notification.NotificationPlugin
rundeckPlugin(NotificationPlugin){
    //plugin definition goes here...
}
```

In this case we use the same `NotificationPlugin` interface used for Java [Notification Plugins](/developer/05-notification-plugins.md).

However, for other plugin types you would specify the correct Java interface for the specific plugin type.

Note: Be sure to `import` all necessary types used in the Groovy script.

#### Definition

Within the definition section you can define your plugin's Description to be shown in the Rundeck GUI, as well as
configuration properties to present to the user.

_Properties_

Set these properties to change the GUI display of your plugin:

```java
title='My Plugin'
description='Does some action'
version = "0.0.1"
url = "http://example"
author = "© 2018, me"
metadata = [:] //a map defining *Provider Metadata*
```

See [Provider Metadata](#provider-metadata) for information about what metadata keys may be used.

_Configuration_

Use a `configuration` closure to define configuration properties:

```java
configuration{
    //property definitions go here...
}
```

Note: not all plugin types support `configuration`.

_Property Definitions_

User configuration properties can be defined in a few ways. To define a property within the `configuration` section, you can use either of these forms:

1. method call form, specifying the attributes of the property:

```java
myproperty (title: "My Property", description: "Something", type: 'Integer')
```

2. assignment form. This form guesses the data type and sets the defaultValue, but does not add any other attributes.

```java
myproperty2="default value"
//the above is equivalent to:
myproperty2(defaultValue:"default value", type: 'String')

myproperty3=["value","another","text"]
//the above is equivalent to:
myproperty3(type:'FreeSelect',values:["value","another","text"])
```

Each property has several attributes you can define, but only `name` and `type` are required:

- `name` - the unique identifier for this property
- `type` - the data type to use for the property, defaults to String. Available types:
  - `String` - user can enter text
  - `Integer`, `Long` - user can enter a number
  - `Boolean` - user is shown a checkbox
  - `Select` or `FreeSelect` - user can choose from a list. With `FreeSelect`, the user can also type in any value
- `title` - a user-readable string to describe the property
- `description` - a string describing the property
- `required` - whether the property is required to have a value
- `defaultValue` - any default value for the property
- `scope` - defines the scope for the property. Allowed values are described under the chapter [Plugin Annotations - Property Scopes](/developer/02-plugin-annotations.md#property-scopes). You may also simply use a String matching the name of the scope, e.g. "Instance". The default scope if unspecified is "Instance".

In addition to these properties, for `Select` or `FreeSelect` type, you can define:

- `values` - list of string values the user can select from

To define a validation check for a property, use the first form and supply a closure. The implicit `it` variable will be the value of the property to check, and your closure should return `true` if the value is valid.

```java
phone_number(title: "Phone number"){
   it.replaceAll(/[^\d]/,'')==~/^\d{10}$/
}
```

**A Note about Scopes and Validation**:

The user is presented with any `Instance` scoped properties in the Rundeck GUI when defining a Job, and any invalid configuration values will present an error when saving the Job. This includes failing to set a value for a "required" property. However, if you have properties that are scoped for `Project` or lower, those properties will not be shown in the GUI. In that case, the validation will not be checked for the properties when saving the Job definition, and will only be performed when the plugin is invoked.

### Supported Groovy Plugin Types

- [Notification Plugin - Groovy Plugin Type](/developer/05-notification-plugins.md#groovy-plugin-type)
- [Streaming Log Reader](/developer/06-logging-plugins.md#groovy-streaminglogreader)
- [Streaming Log Writer](/developer/06-logging-plugins.md#groovy-streaminglogwriter)
- [Execution File Storage](/developer/06-logging-plugins.md#groovy-executionfilestorage)
- [Log Filter](/developer/log-filter-plugins.md#groovy-logfilter)
- [Content Converter Plugin](/developer/content-converter-plugins.md#groovy-contentconverter)

## Script Plugin Development

Script plugins can provide the same services as Java plugins, but they do so
with a script that is invoked in an external system processes by the JVM.

These Services support Script Plugins:

- [NodeExecutor](/developer/04-node-execution-plugins.md#script-plugin-type)
- [FileCopier](/developer/04-file-copier-plugins.md#script-plugin-type)
- [ResourceModelSource](/developer/03-model-source-plugins.md#script-plugin-type)
- [WorkflowNodeStep](/developer/03-step-plugins.md#script-plugin-type) and RemoteScriptNodeStep

### UI Plugin Development

UI Plugins are supported with a `ui` plugin type, which is similar to a Script Plugin.

See: [UI Plugins](/developer/11-ui-plugins.md).

### Script plugin zip structure

You must create a zip file with the following structure:

    [name]-plugin.zip
    \- [name]-plugin/ -- root directory of zip contents, same name as zip file
       |- plugin.yaml -- plugin metadata file
       |- contents/
       |  |- ...      -- script or resource files
       |  \- ...
       \- resources/  -- i18n resources, icons, (and for UI plugins: scripts/css)
          |- i18n/
          |- ...

Here is an example:

    $ unzip -l example-1.0-plugin.zip
    Archive:  example-1.0-plugin.zip
      Length     Date   Time    Name
     --------    ----   ----    ----
            0  04-12-11 11:31   example-1.0-plugin/
            0  04-11-11 15:31   example-1.0-plugin/contents/
         2142  04-11-11 15:31   example-1.0-plugin/contents/script1.sh
         1591  04-11-11 13:10   example-1.0-plugin/contents/script2.sh
          576  04-12-11 10:58   example-1.0-plugin/plugin.yaml
     --------                   -------
         4309                   5 files

The filename of the plugin zip must end with "-plugin.zip" to be recognized as a
plugin archive. The zip must contain a top-level directory with the same base name
as the zip file (sans ".zip").

The file `plugin.yaml` must have this structure:

```yaml
# yaml plugin metadata

name: plugin name
version: plugin version
rundeckPluginVersion: 1.2
author: author name
date: release date (ISO8601)
url: website URL
providers:
    - name: provider
      service: service name
      plugin-type: script
      script-interpreter: [interpreter]
      script-file: [script file name]
      script-args: [script file args]
```

The main metadata that is required:

- `name` - name for the plugin
- `version` - version number of the plugin
- `rundeckPluginVersion` - Rundeck Plugin type version, currently "1.2"
- `providers` - list of provider metadata maps

These are optional:

- `author` - optional author info
- `date` - optional release date info in ISO8601 format
- `url` - optional website URL

This provides the necessary metadata about the plugin, including one or more
entries in the `providers` list to declare those providers defined in the plugin.

### Plugin version changes

The value of `rundeckPluginVersion` defines some features of the loaded plugin.

- `1.2`
  - allows use of [Plugin Localization][] with message resources and [Plugin Icons][].
- `1.1`
  - uses a default of `true` for `mergeEnvironment` (see below)
- `1.0` first release
  - uses a default of `false` for `mergeEnvironment` (see below)

### Provider metadata

Required provider entries:

- `name` - provider name
- `service` - service name, one of these valid services:
  - `NodeExecutor`
  - `FileCopier`
  - `ResourceModelSource`
  - `WorkflowNodeStep`
  - `RemoteScriptNodeStep`
- `plugin-type` - must be `script` for these types (or `ui` for [UI Plugins](/developer/11-ui-plugins.md))
- `plugin-meta` - an optional Map defining additional [Provider Metadata](#provider-metadata) entries. (Since rundeck 3.0.14)
- `script-file` - must be the name of a file relative to the `contents` directory

For `ResourceModelSource` service, this additional entry is required:

- `resource-format` - Must be the name of one of the supported
  [Resource Model Document Formats](/manual/projects/resource-model-sources/builtin.md#resource-model-document-formats).

Optional entries:

- `script-interpreter` - A system command that should be used to execute the
  script. This can be a single binary path, e.g. `/bin/bash`, or include
  any args to the command, such as `/bin/bash -c`.
- `script-args` - the arguments to use when executing the script file.
- `interpreter-args-quoted` - true/false - (default false). If true, the execution will
  be done by passing the file and args as a single argument to the interpreter:
  `${interpreter} "${file} ${arg1} ${arg2}..."`. If false,
  the execution will be done by passing the file and args as separate arguments:
  `${interpreter} ${file} ${arg1} ${arg2}...`

- `use-original-extension`: (`true/false`, default `true`), whether to force the
  remotely copied script to have the same file extension as the original specified by `script-file`.
  (Available for `RemoteScriptNodeStep` only.)
- `script-file-extension`: A file extension to use for the remotely copied script.
  (Available for `RemoteScriptNodeStep` only.)
- `mergeEnvironment` - boolean, if true (default for `rundeckPluginVersion: 1.1+`), when the script
  is executed the Environment variables from the Rundeck server
  will be merged with the context environment variables provided to the script.
  If false (default for `rundeckPluginVersion: 1.0`), then
  only the context environment variables will be provided.
- `config` - a Map defining custom [Plugin properties](#plugin-properties) (see below.)

### Plugin properties

Custom plugin properties are supported in script-based plugins for these plugin types:

- `ResourceModelSource`
- `NodeExecutor`
- `FileCopier`
- `WorkflowNodeStep`
- `RemoteScriptNodeStep`

You can use the metadata entries to declare properties about your plugin.

Create a `config` entry in each provider definition, containing a sequence of
map entries for each configuration property you want to define. In the map entry include:

- `type` - The type of property. Must be one of:
  - `String`
  - `Boolean` value must be "true" or "false"
  - `Integer`
  - `Long`
  - `Select` must be on of a set of values
  - `FreeSelect` may be one of a set of values
  - `Options` may be more than one of a set of values, the result will be the values joined with a `,` (comma)
- `name` - Name to identify the property
- `title` - Title to display in the GUI (optional)
- `description` - Description to display in the GUI (optional)
- `required` - (true/false) if true, require a non-empty value (optional)
- `default` - A default value to use (optional)
- `values` - A comma-separated list of values to use for Select or FreeSelect. Required for Select/FreeSelect.
- `scope` - Resolution scope for the property. Default: "Instance".
- `renderingOptions` - A Map containing a definition of rendering option keys/values. (See [Property Rendering Options](#property-rendering-options) below.)

When your script is invoked, each configuration property defined for the plugin will be set as `RD_CONFIG_[PROPERTY]` variables passed to your script (see below). "_PROPERTY_" refers to your plugin property name in uppercase. A plugin property named "foo" will translate to the shell variable `RD_CONFIG_FOO`.

See [Property Scopes](#property-scopes) below.

#### Example script plugin property

Here is an example:

```yaml
# yaml plugin metadata

name: plugin name
version: plugin version
rundeckPluginVersion: 1.0
author: author name
date: release date
providers:
    - name: provider
      service: service name
      plugin-type: script
      script-interpreter: [interpreter]
      script-file: [script file name]
      script-args: [script file args]
      config:
        - name: myprop
          title: My Property
          type: String
          required: false
          description: "A custom property"
          scope: Instance
          renderingOptions:
            instance-scope-node-attribute: "my-prop"
        - name: myprop2
          title: Another Property
          type: Integer
          required: true
          description: "Must be present"
          default: '123'
          scope: Framework
```

### How script plugin providers are invoked

When the provider is used for node execution or file copying, the script file,
interpreter, and args are combined into a commandline executed by the system in
this pattern:

    [interpreter] [filename] [args...]

If the interpreter is not specified, then the script file is executed directly,
and that means it must be acceptable by the system to be executed directly (include
any necessary `#!` line, etc).

`script-args` can
contain data-context properties such as `${node.name}`. Additionally, the
specific Service will provide some additional context properties that can be used:

- NodeExecutor will define `${exec.command}` containing the command to be executed
- FileCopier will define `${file-copy.file}` containing the local path to the file
  that needs to be copied, and `${file-copy.destination}` containing the remote destination path that is requested, if available.
- ResourceModelSource will define `${config.KEY}` for each configuration property KEY that is defined.

All script-plugins will also be provided with these context entries:

- `rundeck.base` - base directory of the Rundeck installation
- `rundeck.project` - project name
- `plugin.base` - base directory of the expanded 'contents' dir of the plugin
- `plugin.file` - the plugin file itself
- `plugin.scriptfile` - the path to the script file being executed for the plugin
- `plugin.vardir` - var dir the plugin can use for caching data, local to the project
- `plugin.tmpdir` - temp dir the plugin can use

In addition, all of the data-context properties that are available in the
`script-args` are provided as environment variables to the
script or interpreter when it is executed.

Environment variables are generated in all-caps with this format:

    RD_[KEY]_[NAME]

The `KEY` and `NAME` are the same as `${key.name}`. Any characters in the key or name
that are not valid Bash shell variable characters are replaced with underscore '\_'.

Examples:

- `${node.name}` becomes `$RD_NODE_NAME`
- `${node.some-attribute}` becomes `$RD_NODE_SOME_ATTRIBUTE`
- `${exec.command}` becomes `$RD_EXEC_COMMAND`
- `${file-copy.file}` becomes `$RD_FILE_COPY_FILE`

### Access to private context variables

When a job defines a [Secure Remote Authentication Option](/manual/job-options.md#secure-options), this value is saved on the `Private Data Context` at the execution time.

These `Private Data Context` properties will be available as environment variables to the script or interpreter when it is executed on the Node Executor Script Plugin.

For example, if the job as an input secure option called `password`:

-  `${option.password}` becomes `$RD_PRIVATE_PASSWORD`


### Script provider requirements

The specific service has expectations about
the way your provider script behaves.

#### Exit code

- Exit code of 0 indicates success
- Any other exit code indicates failure

#### Output

For `NodeExecutor`

: All output to `STDOUT`/`STDERR` will be captured for the job's output.

For `FileCopier`

: The first line of output of `STDOUT` MUST be the filepath of the file copied
to the target node. Other output is ignored. All output to `STDERR` will be
captured for the job's output.

For `ResourceModelSource`

: All output on `STDOUT` will be captured and passed to a `ResourceFormatParser` for the specified `resource-format` to create the Node definitions.

### Internationalization/Localization for Zip files

Since Rundeck 2.6.10, Plugins support Internationalization ("i18n") using Java properties files.

Include a `resources/i18n` directory in your zip file, with localized versions of your Plugin messages.

See [Plugin Localization][].

## Property scopes

The `scope` determines how the value of the property is resolved.

These are the available scopes and how the property values can be resolved:

- `Framework` - Only framework properties
- `ProjectOnly` - Only Project properties
- `Project` - Project and Framework properties
- `InstanceOnly` - Only instance properties
- `Instance` - Instance and all earlier levels

When resolving a property in a Project or Framework scope, the following properties will be searched:

- Framework scope

  - file: `$RDECK_BASE/etc/framework.properties`
  - property: `framework.plugin.[ServiceName].[providerName].[propertyname]`

- Project scope
  - file: `$RDECK_BASE/projects/[ProjectName]/etc/project.properties`
  - property: `project.plugin.[ServiceName].[providerName].[propertyname]`

Instance scope refers to the configuration for a plugin "instance". For different plugin types, due to the differences between how they are configured, this scope is resolved in different ways.

For `ResourceModelSource`:

: Resolved for each indexed source via the configuration in the `project.properties` file.

For `NodeExecutor`, and `FileCopier`:

: Custom properties are _only_ supported in Script-based plugins. The instance scoped-property values are only loaded via Node attributes at execution time, based on the mapping provided in the `renderingOptions`. See [Node services instance scope](#node-services-instance-scope).

For Workflow Step services:

: Resolved from the step configuration defined in the workflow.

For `Notification`:

: Resolved from the notification trigger configuration defined in the workflow.

### Node services instance scope

For script-based `NodeExecutor` and `FileCopier` plugins, Instance-scope properties can be defined to retrieve values from the Node's attributes at execution time.

Define the `renderingOptions` property entry, and add a `instance-scope-node-attribute` key:

```yaml
      config:
        - name: myprop
          title: My Property
          type: String
          required: false
          description: "A custom property"
          scope: Instance
          renderingOptions:
            instance-scope-node-attribute: "my-prop"
```

When resolving the property value at execution time
the node attribute "my-prop" will be used for the value (if present),
before resolving other allowed scopes.

## Property Rendering Options

Rendering options define special attributes of a property, which can be used to declare how it is shown in the GUI, or how the value is loaded at resolution time.

Available rendering option keys:

- `displayType`, values:
  - `SINGLE_LINE` - display input as a single text field.
  - `MULTI_LINE` - display input as a multi-line text area.
  - `CODE` - display input as a multi-line text area with syntax highlighting
  - `PASSWORD` - display input as a password field
  - `STATIC_TEXT` - display static text without an input field, using the default value as the text
- `instance-scope-node-attribute`
  - Value is the name of a Node attribute to use for instance-scoped properties for _Node Services_ plugins `NodeExecutor` and `FileCopier` only.
- `selectionAccessor`, values:
  - `STORAGE_PATH` - display an additional input to select a Storage Path string from Rundeck's [Key Storage Facility](/manual/key-storage/key-storage.md).
- `storage-path-root`
  - Value is a Storage Path indicating the root to use if the selectionAccessor is `STORAGE_PATH`.
- `storage-file-meta-filter`
  - Value is a Storage metadata filter string, indicating the types of Storage Files to select from if selectionAccessor is `STORAGE_PATH`. Filter string format: `metadatakey=value`, e.g. `Rundeck-key-type=private`.
- `valueConversion` defines a way to convert a the value of the resolved property. Allowed values:
  - `STORAGE_PATH_AUTOMATIC_READ` - automatically loads the storage contents from the given Storage Path, replacing the path with the loaded file contents as a String. E.g. can be used to load a Password file contents.
  - `PRIVATE_DATA_CONTEXT` - automatically read a value from the Private data context, which contains Secure Authentication Job Option values. E.g. With this conversion enabled, a config value of "option.mypassword" would be replaced with the value of a secure authentication job option named "mypassword".
- `valueConversionFailure` can be used to indicate that if the Private data context, or Storage path data is not present,
    then the config data key should be removed. Allowed values:
    - `remove` - remove the original config property value if the conversion is not successful
    - `skip` - keep the original config property value if the conversion is not successful.  (version 4.14+ this should be set if a password value is stored directly in the field, not in Key Storage)
- `staticTextContentType` if displayType is `STATIC_TEXT`, the content type for the defaultValue text. values:
    - `text/html` render as sanitized HTML
    - `text/x-markdown` convert markdown text to sanitized HTML
    - any other value or if not specified: render text directly
- `groupName` specifies a group that the input field belongs to. If not specified the field will be in the
    primary, unnamed group. If specified, all fields with the same `groupName` value will be
    displayed in a common area under the group name.
- `grouping` allowed value: `secondary`, indicates that the specified `groupName` should be shown in a
    collapsed state if no input values in that group have been set. If no `groupName` is set, then the field
    will be displayed under a group with a heading of "More".
- `codeSyntaxMode` - if displayType is `CODE`, name of a [ACE editor mode][acejs] supported by Rundeck. One of: `batchfile`, `diff`, `dockerfile`, `golang`, `groovy`, `html`, `java`, `javscript`, `json`, `markdown`, `perl`, `php`, `powershell`, `properties`, `python`, `ruby`, `sh`, `sql`, `xml`, `yaml`.
- `codeSyntaxSelectable` - if displayType is `CODE`, `true/false`: if true, show a select box for choosing from the available syntax highlighting modes.

  [acejs]: https://ace.c9.io

## Plugin Localization

Since Rundeck Plugin Version 1.2 (Rundeck 2.6.10), Plugins support Internationalization ("i18n") using Java properties files.

Specify `rundeckPluginVersion: 1.2` in your plugin.yaml (script plugins) or `Rundeck-Plugin-Version: 1.2` in your
jar Manifest (jar plugins) to enable Localization support.

Include a `resources/i18n` directory in your jar/zip file, with localized versions of your Plugin messages.

### Resolving Localization Message Files

The mechanism for looking up the appropriate localization messages file is similar to the Spring Java library mechanism.

- `resources/i18n/messages.properties` The default messages for the plugin provider(s). This file will be loaded if
  no other more specific messages file is found.

When loading messages for a locale/language, this search order will be used,:

1. `resources/i18n/messages_LANG_COUNTRY.properties` for requested Locale
2. `resources/i18n/messages_LANG.properties` for requested Locale
3. `resources/i18n/messages_LANG_COUNTRY.properties` for Default Locale for the JVM
4. `resources/i18n/messages_LANG.properties` for Default Locale for the JVM
5. `resources/i18n/messages.properties` as fallback

In addition, specific messages files can be created for each Provider defined in your plugin file.

1. `resources/i18n/SERVICE.PROVIDER.messages.properties` for requested Plugin Service and Provider names.
1. `resources/i18n/PROVIDER.messages.properties` for requested Provider name.
1. `resources/i18n/SERVICE.messages.properties` for requested Service name.
1. `resources/i18n/messages.properties` as fallback

If you have multiple Providers in your plugin file, can use separate messages files for each provider.

You can combine the Locale and Service/Provider:

- `resources/i18n/SERVICE.PROVIDER.messages_LANG_COUNTRY.properties`

Here is an example:

`resources/i18n/WorkflowNodeStep.flow-control.messages_es_419.properties`

### Defining Plugin Localization Messages

When displaying a plugin in the GUI, Rundeck will look for localized versions of text for the plugin, using the
localization messages if they are found. If they are not found, it will use the text
versions defined in the Plugin Description (Java annotations or plugin.yaml file).

The `messages.properties` file is a [Java Properties Format](<https://docs.oracle.com/javase/7/docs/api/java/util/Properties.html#load(java.io.Reader)>) in `UTF-8` encoding.

The following message Codes will be used:

- `plugin.title` Plugin Title
- `plugin.description` Plugin Description
- `property.NAME.title` Title for configuration property named "NAME"
- `property.NAME.description` Description for configuration property named "NAME"

(_Note_: SCM Plugins have additional message codes. See: [SCM Plugins - Localization](/developer/10-scm-plugins.md#localization)).

Additionally, if a property has a [Property Rendering Option](#property-rendering-options) marking it as `STATIC_TEXT`
normally the `defaultValue` of the property is used to render it as text or HTML. This value can be localized as well:

- `plugin.NAME.defaultValue` Static text/html for a STATIC_TEXT property named "NAME"

The message code will be resolved using the following search pattern using the Service and Provider names:

1. `SERVICE.PROVIDER.CODE`
2. `PROVIDER.CODE`
3. `SERVICE.CODE`
4. `CODE`

Where `CODE` is one of the messages codes mentioned above.

So for example you could define the titles of two different providers using this file:

`messages.properties`

```properties
provider1.plugin.title=My Provider 1
provider2.plugin.title=My Provider 2
```

## Plugin Icons

Since Rundeck Plugin Version 1.2 (Rundeck 2.6.10), Custom Icons can now be defined for your plugin.

You can use an [Icon Image Files](#icon-image-files), or specify [Provider Metadata](#provider-metadata) to use a CSS icon, such as Glyphicon or Font Awesome icon.

### Icon Image Files

Specify `rundeckPluginVersion: 1.2` in your plugin.yaml (script plugins) or `Rundeck-Plugin-Version: 1.2` in your
jar Manifest (jar plugins) to enable custom icon support.

Include a `resources/` directory in your jar/zip file with your icon file. The icon is resolved by looking for
a file in the resources directory using the following search pattern:

1. `resources/SERVICE.PROVIDER.icon.png`
1. `resources/PROVIDER.icon.png`
1. `resources/SERVICE.icon.png`
1. `resources/icon.png`

You can define a custom icon for each Provider in your plugin file, or a single icon for all providers.

## Provider Metadata

(Since Rundeck 3.0.14)

These metadata keys may be available:

- `glyphicon` - name of a Glyphicon icon to use for the plugin, as alternative to providing an icon image resource.
- `faicon` - name of a Font Awesome icon to use for the plugin.
- `fabicon` - name of a Font Awesome "brand" icon to use

[plugin localization]: #plugin-localization
[plugin icons]: #plugin-icons
