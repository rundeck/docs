# Plugin Properties and Configuration

This guide covers configuration properties, scopes, rendering options, localization, and icons that apply to all Rundeck plugin types.

## Overview

Plugin properties allow users to configure your plugin's behavior. Properties can have different types, validation rules, display options, and resolution scopes. This documentation applies to:

- [Java Plugins](/developer/java-plugin-development.md)
- [Script Plugins](/developer/script-plugin-development.md)
- [Groovy Plugins](/developer/groovy-plugin-development.md)

## Property Scopes

The `scope` determines how the value of the property is resolved. Properties can be configured at different levels in Rundeck's configuration hierarchy.

### Available Scopes

These are the available scopes and how the property values can be resolved:

| Scope | Description |
|-------|-------------|
| `Framework` | Only framework-level properties |
| `ProjectOnly` | Only project-level properties |
| `Project` | Project and Framework properties |
| `InstanceOnly` | Only instance properties |
| `Instance` | Instance and all earlier levels |

### Scope Resolution

When resolving a property in a Project or Framework scope, the following properties will be searched:

**Framework scope:**
- File: `$RDECK_BASE/etc/framework.properties`
- Property: `framework.plugin.[ServiceName].[providerName].[propertyname]`

**Project scope:**
- File: `$RDECK_BASE/projects/[ProjectName]/etc/project.properties`
- Property: `project.plugin.[ServiceName].[providerName].[propertyname]`

**Instance scope** refers to the configuration for a plugin "instance". For different plugin types, due to the differences between how they are configured, this scope is resolved in different ways:

**For `ResourceModelSource`:**
- Resolved for each indexed source via the configuration in the `project.properties` file.

**For `NodeExecutor` and `FileCopier`:**
- Custom properties are _only_ supported in Script-based plugins
- Instance scoped-property values are only loaded via Node attributes at execution time, based on the mapping provided in the `renderingOptions`
- See [Node Services Instance Scope](#node-services-instance-scope)

**For Workflow Step services:**
- Resolved from the step configuration defined in the workflow

**For `Notification`:**
- Resolved from the notification trigger configuration defined in the workflow

### Node Services Instance Scope

For script-based `NodeExecutor` and `FileCopier` plugins, Instance-scope properties can be defined to retrieve values from the Node's attributes at execution time.

Define the `renderingOptions` property entry, and add an `instance-scope-node-attribute` key:

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

When resolving the property value at execution time, the node attribute "my-prop" will be used for the value (if present), before resolving other allowed scopes.

## Property Rendering Options

Rendering options define special attributes of a property, which can be used to declare how it is shown in the GUI, or how the value is loaded at resolution time.

### Display Type

Control how the input field is displayed:

| Display Type | Description |
|--------------|-------------|
| `SINGLE_LINE` | Display input as a single text field (default) |
| `MULTI_LINE` | Display input as a multi-line text area |
| `CODE` | Display input as a multi-line text area with syntax highlighting |
| `PASSWORD` | Display input as a password field |
| `STATIC_TEXT` | Display static text without an input field, using the default value as the text |

**Example (Script Plugin):**

```yaml
config:
  - name: script_content
    title: Script Content
    type: String
    renderingOptions:
      displayType: CODE
      codeSyntaxMode: bash
```

### Storage Path Selection

Enable selection of keys/passwords from Rundeck's [Key Storage](/manual/key-storage/index.md):

```yaml
config:
  - name: ssh_key
    title: SSH Key
    type: String
    renderingOptions:
      selectionAccessor: STORAGE_PATH
      storage-path-root: keys/
      storage-file-meta-filter: Rundeck-key-type=private
```

**Rendering Options:**
- `selectionAccessor: STORAGE_PATH` - Display an additional input to select a Storage Path
- `storage-path-root` - Storage Path indicating the root to use
- `storage-file-meta-filter` - Filter string for file types: `metadatakey=value`

### Value Conversion

Automatically convert or load property values:

| Conversion Type | Description |
|----------------|-------------|
| `STORAGE_PATH_AUTOMATIC_READ` | Automatically loads the storage contents from the given Storage Path, replacing the path with the loaded file contents as a String |
| `PRIVATE_DATA_CONTEXT` | Automatically read a value from the Private data context, which contains Secure Authentication Job Option values |

**Example:**

```yaml
config:
  - name: api_token
    title: API Token
    type: String
    renderingOptions:
      selectionAccessor: STORAGE_PATH
      valueConversion: STORAGE_PATH_AUTOMATIC_READ
      valueConversionFailure: remove
```

**Value Conversion Failure Options:**
- `remove` - Remove the original config property value if the conversion is not successful
- `skip` - Keep the original config property value if the conversion is not successful (version 4.14+ this should be set if a password value is stored directly in the field, not in Key Storage)

### Code Syntax Highlighting

When using `displayType: CODE`, configure syntax highlighting:

```yaml
renderingOptions:
  displayType: CODE
  codeSyntaxMode: python
  codeSyntaxSelectable: true
```

**Available syntax modes:** `batchfile`, `diff`, `dockerfile`, `golang`, `groovy`, `html`, `java`, `javascript`, `json`, `markdown`, `perl`, `php`, `powershell`, `properties`, `python`, `ruby`, `sh`, `sql`, `xml`, `yaml`

**Options:**
- `codeSyntaxMode` - Name of an [ACE editor mode][acejs] supported by Rundeck
- `codeSyntaxSelectable` - If `true`, show a select box for choosing from the available syntax highlighting modes

[acejs]: https://ace.c9.io

### Static Text

Display informational text to users:

```yaml
config:
  - name: instructions
    title: Instructions
    type: String
    default: "## Important\nFollow these steps..."
    renderingOptions:
      displayType: STATIC_TEXT
      staticTextContentType: text/x-markdown
```

**Content Types:**
- `text/html` - Render as sanitized HTML
- `text/x-markdown` - Convert markdown text to sanitized HTML
- Any other value or if not specified: render text directly

### Grouping Properties

Organize properties into groups:

```yaml
config:
  - name: basic_setting
    title: Basic Setting
    type: String
  
  - name: advanced_setting
    title: Advanced Setting
    type: String
    renderingOptions:
      groupName: Advanced
      grouping: secondary
```

**Options:**
- `groupName` - Specifies a group that the input field belongs to. All fields with the same `groupName` value will be displayed in a common area under the group name.
- `grouping: secondary` - Indicates that the specified `groupName` should be shown in a collapsed state if no input values in that group have been set. If no `groupName` is set, then the field will be displayed under a group with a heading of "More".

### Complete Rendering Options Reference

All available rendering option keys:

```yaml
renderingOptions:
  # Display
  displayType: SINGLE_LINE | MULTI_LINE | CODE | PASSWORD | STATIC_TEXT
  
  # Storage Path
  selectionAccessor: STORAGE_PATH
  storage-path-root: keys/
  storage-file-meta-filter: Rundeck-key-type=private
  
  # Value Conversion
  valueConversion: STORAGE_PATH_AUTOMATIC_READ | PRIVATE_DATA_CONTEXT
  valueConversionFailure: remove | skip
  
  # Node Services
  instance-scope-node-attribute: "node-attr-name"
  
  # Code Display
  codeSyntaxMode: bash | python | java | etc.
  codeSyntaxSelectable: true | false
  
  # Static Text
  staticTextContentType: text/html | text/x-markdown
  
  # Grouping
  groupName: "Group Name"
  grouping: secondary
```

## Plugin Localization

Since Rundeck Plugin Version 1.2 (Rundeck 2.6.10), Plugins support Internationalization ("i18n") using Java properties files.

### Enabling Localization

**For Script/Groovy Plugins:**
Specify `rundeckPluginVersion: 1.2` in your `plugin.yaml`

**For Java Plugins:**
Specify `Rundeck-Plugin-Version: 1.2` in your jar Manifest

Include a `resources/i18n` directory in your jar/zip file, with localized versions of your Plugin messages.

### Localization File Structure

The mechanism for looking up the appropriate localization messages file is similar to the Spring Java library mechanism.

**Default messages file:**
- `resources/i18n/messages.properties` - The default messages for the plugin provider(s). This file will be loaded if no other more specific messages file is found.

**Search order for a locale/language:**

1. `resources/i18n/messages_LANG_COUNTRY.properties` for requested Locale
2. `resources/i18n/messages_LANG.properties` for requested Locale
3. `resources/i18n/messages_LANG_COUNTRY.properties` for Default Locale for the JVM
4. `resources/i18n/messages_LANG.properties` for Default Locale for the JVM
5. `resources/i18n/messages.properties` as fallback

### Provider-Specific Messages

In addition, specific messages files can be created for each Provider defined in your plugin file:

1. `resources/i18n/SERVICE.PROVIDER.messages.properties` for requested Plugin Service and Provider names
2. `resources/i18n/PROVIDER.messages.properties` for requested Provider name
3. `resources/i18n/SERVICE.messages.properties` for requested Service name
4. `resources/i18n/messages.properties` as fallback

If you have multiple Providers in your plugin file, you can use separate messages files for each provider.

You can combine the Locale and Service/Provider:
- `resources/i18n/SERVICE.PROVIDER.messages_LANG_COUNTRY.properties`

**Example:**
`resources/i18n/WorkflowNodeStep.flow-control.messages_es_419.properties`

### Message Codes

When displaying a plugin in the GUI, Rundeck will look for localized versions of text for the plugin, using the localization messages if they are found. If they are not found, it will use the text versions defined in the Plugin Description (Java annotations or plugin.yaml file).

The `messages.properties` file is a [Java Properties Format](https://docs.oracle.com/javase/7/docs/api/java/util/Properties.html#load(java.io.Reader)) in `UTF-8` encoding.

**Available message codes:**

| Code | Description |
|------|-------------|
| `plugin.title` | Plugin Title |
| `plugin.description` | Plugin Description |
| `property.NAME.title` | Title for configuration property named "NAME" |
| `property.NAME.description` | Description for configuration property named "NAME" |
| `property.NAME.defaultValue` | Static text/html for a STATIC_TEXT property named "NAME" |

### Message Code Resolution

The message code will be resolved using the following search pattern using the Service and Provider names:

1. `SERVICE.PROVIDER.CODE`
2. `PROVIDER.CODE`
3. `SERVICE.CODE`
4. `CODE`

Where `CODE` is one of the messages codes mentioned above.

**Example:** Define the titles of two different providers using this file:

`messages.properties`

```properties
provider1.plugin.title=My Provider 1
provider2.plugin.title=My Provider 2
```

### Localizing Static Text

If a property has a [Property Rendering Option](#property-rendering-options) marking it as `STATIC_TEXT`, normally the `defaultValue` of the property is used to render it as text or HTML. This value can be localized as well:

```properties
property.instructions.defaultValue=<h2>Instructions</h2><p>Follow these steps...</p>
```

## Plugin Icons

Since Rundeck Plugin Version 1.2 (Rundeck 2.6.10), Custom Icons can now be defined for your plugin.

You can use [Icon Image Files](#icon-image-files), or specify [Provider Metadata](#provider-metadata) to use a CSS icon, such as Glyphicon or Font Awesome icon.

### Icon Image Files

**Enable custom icon support:**

**For Script/Groovy Plugins:**
Specify `rundeckPluginVersion: 1.2` in your `plugin.yaml`

**For Java Plugins:**
Specify `Rundeck-Plugin-Version: 1.2` in your jar Manifest

Include a `resources/` directory in your jar/zip file with your icon file. The icon is resolved by looking for a file in the resources directory using the following search pattern:

1. `resources/SERVICE.PROVIDER.icon.png`
2. `resources/PROVIDER.icon.png`
3. `resources/SERVICE.icon.png`
4. `resources/icon.png`

You can define a custom icon for each Provider in your plugin file, or a single icon for all providers.

**Example directory structure:**

```
my-plugin.zip
├── resources/
│   └── WorkflowNodeStep.my-step.icon.png
├── contents/
│   └── my-script.sh
└── plugin.yaml
```

### Provider Metadata

(Since Rundeck 3.0.14)

Instead of providing image files, you can use CSS icons by defining metadata.

**Available metadata keys:**

| Key | Description |
|-----|-------------|
| `glyphicon` | Name of a Glyphicon icon to use for the plugin |
| `faicon` | Name of a Font Awesome icon to use for the plugin |
| `fabicon` | Name of a Font Awesome "brand" icon to use |

**For Java Plugins:**

Use the `@PluginMetadata` annotation:

```java
@Plugin(name="myplugin", service=ServiceNameConstants.WorkflowStep)
@PluginMetadata(key="faicon", value="check-circle")
public class MyPlugin implements StepPlugin{
    ...
}
```

See [Java Plugin Development - Provider Metadata](/developer/java-plugin-development.md#provider-metadata) for more details.

**For Script/Groovy Plugins:**

Add to the `plugin.yaml` metadata:

```yaml
name: my-plugin
rundeckPluginVersion: 1.2
version: 1.0
metadata:
  - name: faicon
    value: check-circle
providers:
  - name: my-step
    service: WorkflowNodeStep
    # ...
```

### Icon Selection Guide

**Use Glyphicon when:**
- You want simple, monochrome icons
- Available in Rundeck by default

**Use Font Awesome when:**
- You want more icon choices
- Need brand icons (`fabicon`)
- Available in Rundeck by default

**Use Image Files when:**
- You need custom graphics
- Want colorful or complex icons
- Need specific branding

## Common Property Patterns

### Password/Secret Property

```yaml
- name: password
  title: Password
  type: String
  required: true
  renderingOptions:
    displayType: PASSWORD
    selectionAccessor: STORAGE_PATH
    valueConversion: STORAGE_PATH_AUTOMATIC_READ
    valueConversionFailure: skip
```

### Multi-line Script Content

```yaml
- name: script
  title: Script Content
  type: String
  required: true
  renderingOptions:
    displayType: CODE
    codeSyntaxMode: bash
    codeSyntaxSelectable: true
```

### Optional Advanced Settings

```yaml
- name: timeout
  title: Timeout (seconds)
  type: Integer
  default: "300"
  renderingOptions:
    groupName: Advanced
    grouping: secondary
```

### Help Text

```yaml
- name: help_text
  title: Configuration Help
  type: String
  default: |
    # Configuration Guide
    
    1. Enter your API endpoint
    2. Provide authentication credentials
    3. Test the connection
  renderingOptions:
    displayType: STATIC_TEXT
    staticTextContentType: text/x-markdown
```

## Related Documentation

- [Java Plugin Development](/developer/java-plugin-development.md) - Using annotations for properties
- [Script Plugin Development](/developer/script-plugin-development.md) - Defining properties in plugin.yaml
- [Groovy Plugin Development](/developer/groovy-plugin-development.md) - Using the Groovy DSL
- [Key Storage](/manual/key-storage/index.md) - Storing and accessing secrets
