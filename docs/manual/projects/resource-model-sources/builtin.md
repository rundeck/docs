# Open Source Resource Model Source Plugins

Rundeck includes these Built-in plugins in the core installation:

`file`

: Uses a file on the file system, in any of the supported Resources formats.

`url`

: GETs a URL, and expects one of the supported Resources formats.

`directory`

: looks at all files in a directory for supported file extensions, and internally uses the `file` provider for
each file that matches.

`script`

: Executes a script and parses the output as one of the supported formats

To configure these providers use the following configuration properties.

## File Source

The `file` Resource Model Source provider reads a file in one of the supported
Resource Model Document Formats.

| Name                        | Value       | Notes                                                                                                         |
|-----------------------------|-------------|---------------------------------------------------------------------------------------------------------------|
| `file`                      | file path   | Path to a file on disk.                                                                                       |
| `format`                    | format name | Can be used to declare the format explicitly. Otherwise the format is determined from the `file`'s extension. |
| `requireFileExists`         | true/false  | If true and the file is missing, causes a failure to load the nodes. (Default: false)                         |
| `includeServerNode`         | true/false  | If true, include the Project's server node automatically. (Default: false)                                    |
| `generateFileAutomatically` | true/false  | If true, create the file automatically if it is missing. (Default: false)                                     |

Table: Configuration properties for `file` Resource Model Source provider

The value of `format` must be one of the supported Resource Model Document Formats. The built-in formats are: `resourcexml` or `resourceyaml`, but any format provided by a [Resource Format Plugin](#resource-model-document-formats) can be specified as well.

_Example:_

Here's a sample XML document that defines a node called "orion":

```xml
<project>
  <node name="orion"
    description="a foodazzler service host" tags="staging,us-east"
    osFamily="unix" osName="Linux"
    hostname="orion"  username="alexh"
    />
</project>
```

The `node` element has a few
required such as `name`, `osFamily` and `tags`.

You can add any number of nodes in this document. Here's a second node
called homestar:

```xml
<project>
  <node name="orion"
    description="a foodazzler service host" tags="staging,us-east"
    osFamily="unix" osName="Linux"
    hostname="orion"  username="alexh"
    />
  <node name="homestar"
    description="a humdinger" tags="integration,us-west"
    osFamily="unix" hostname="192.168.1.02"  username="alexh">
    <attribute name="flavor" value="medium"/>
    <attribute name="package:version" value="2.0"/>
  </node>
</project>
```

The `hostname` and `username` values are used for the SSH connection
while the `name` and `type` are used to define Node identity in the
resource model. It is possible to overload the hostname value to include
port information (eg, hostname="somehost:2022").
This is useful if your run SSH on a different port.

You can also tell there are two different ways to declare an attribute
using the XML format.
The "flavor" attribute is defined as a separate XML element:

    <attribute name="flavor" value="medium"/>


    resources.source.1.type=file
    resources.source.1.config.file=/home/rundeck/projects/example/etc/resources2.xml
    resources.source.1.config.format=resourcexml
    resources.source.1.config.requireFileExists=true
    resources.source.1.config.includeServerNode=true
    resources.source.1.config.generateFileAutomatically=true

## URL Source

The `url` Resource Model Source provider performs a HTTP GET request to retrieve the Nodes definition.

Configuration properties:

| Name      | Value      | Notes                                                                                                                                                              |
|-----------|------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `url`     | URL        | A valid URL, either `http:`, `https:` or `file:` protocol.                                                                                                         |
| `cache`   | true/false | If true, use ETag/Last-Modified information from the server to only download new content if it has changed. If false, always download the content. (Default: true) |
| `timeout` | seconds    | Number of seconds before request fails due to timeout. `0` means no timeout. (Default: 30)                                                                         |

Table: Configuration properties for `url` Resource Model Source provider

The Resource Model Document Format that is used is determined by the MIME type
sent by the remote server. The built-in formats accept "\*/xml" and "\*/yaml" and "\*/x-yaml".

_Example:_

    resources.source.1.type=url
    resources.source.1.url=file:/home/rundeck/projects/example/etc/resources2.xml
    resources.source.1.cache=true
    resources.source.1.timeout=0

## Directory Source

The `directory` Resource Model Source provider lists all files in a directory, and loads each one that has a supported file extension
as File Resource Model Source with all default configuration options.

| Name        | Value          | Notes                                                                          |
|-------------|----------------|--------------------------------------------------------------------------------|
| `directory` | directory path | All files in the directory that have a supported file extension will be loaded |

_Example:_

    resources.source.2.type=directory
    resources.source.2.directory=/home/rundeck/projects/example/resources

## Script Source

The `script` Resource Model Source provider executes a script file and reads
the output of the script as one of the supported [Resource Model Document Formats](#resource-model-document-formats).

| Name           |  Value                          | Notes |
| -----          |  ------                         | ------ |
| `file`         |  Script file path               | If required by the `interpreter`, the file should be executable |
| `interpreter`  |  Command or interpreter to use  | e.g. "bash -c" |
| `args`         |  Additional arguments to pass   | The arguments will be added after the script file name to the executed commandline |
| `format`       |  Format name                    | Must be used to declare the format explicitly. |

Table: Configuration properties for `script` Resource Model Source provider

The script will be executed in this way:

    [interpreter] file [args]

All output on STDOUT will be passed to a Resource Format Parser to parse. The
format specified must be available.

_Example:_

    resources.source.2.type=script
    resources.source.2.file=/home/rundeck/projects/example/etc/generate.sh
    resources.source.2.interpreter=bash -c
    resources.source.2.args=-project example
    resources.source.2.format=resourceyaml

## Resource Model Document Formats

Resource Model Document Formats are defined by plugins that provide
Generators and Parsers, typically in matched
pairs, with both a parser and generator for the same format name.

### Resource Format Plugins

Rundeck includes three built-in plugins in the core installation:

`resourcexml`

: Supports the Resource XML document format: [resource-XML](/manual/document-format-reference/resource-v13.md).

    Supported MIME types:

    * Generator: `text/xml`
    * Parser: `*/xml`

    Supported File extensions:

    * `.xml`

`resourceyaml`

: Supports the Resource YAML document format: [resource-YAML](/manual/document-format-reference/resource-yaml-v13.md).

    Supported MIME types:

    * Generator: `text/yaml`, `text/x-yaml`, `application/yaml`, `application/x-yaml`
    * Parser: `*/yaml`, `*/x-yaml`

    Supported File extensions:

    * `.yml`, `.yaml`

`resourcejson`

: Supports the Resource JSON document format: [resource-JSON](/manual/document-format-reference/resource-json-v10.md).

    Supported MIME types:

    * Generator: `application/json`, `text/json`
    * Parser: `application/json`, `text/json`

    Supported File extensions:

    * `.json`
