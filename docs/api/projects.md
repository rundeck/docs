# Projects

## Listing Projects ###

List the existing projects on the server.

**Request:**

    GET /api/1/projects

**Response:**

An Item List of `projects`, each `project` of the form specified in the [Getting Project Info](#getting-project-info) section.

*Since API version 11*: JSON content can be retrieved with `Accept: application/json`

*Since API version 26*: add the project `label` to the response

*Since API version 33*: add the project `created` date to the response. This is based on the creation of the `project.properties` file in the file system or in the DB storage.

``` json
[
    {
        "name":"...",
        "description":"...",
        "url":"...",
    }
]
```

## Project Creation ###

Create a new project.

    POST /api/11/projects

XML content:

`Content-Type: application/xml`

``` xml
<project>
    <name>name</name>
    <config>
        <property key="propname" value="propvalue"/>
        <!-- ... -->
    </config>
</project>
```

JSON content:

`Content-Type: application/json`

``` json
{ "name": "myproject", "config": { "propname":"propvalue" } }
```

Response:  XML or JSON project definition of the form indicated in the [Getting Project Info](#getting-project-info) section.

## Getting Project Info ###

Get information about a project.

    GET /api/1/project/[PROJECT]

**Response:**

An Item List of `projects` with one `project`.  XML or JSON is determined by the `Accept` request header. The `project` is of the form:

`Content-Type: application/xml`

``` xml
<project>
    <name>Project Name</name>
    <description>...</description>
    <!-- additional items -->
</project>
```

If the project defines a Resource Model Provider URL, then the additional items are:

``` xml
<resources>
    <providerURL>URL</providerURL>
</resources>
```

Updated in version 11:

    GET /api/11/project/[PROJECT]


`Content-Type: application/xml`

``` xml
<project url="http://server:4440/api/11/project/NAME">
    <name>Project Name</name>
    <description>...</description>
    <!-- additional items -->
</project>
```

`Content-Type: application/json` *since version 11*

``` json
{
  "description": "",
  "name": "NAME",
  "url": "http://server:4440/api/11/project/NAME",
  "config": {  }
}

```

**API version 11 and later**: If the user has `configure` authorization for the project, then the project configuration properties are included in the response.

``` xml
<config>
    <property key="[name]" value="[value]"/>
    <!-- ... -->
</config>
```

## Project Deletion ###

Delete an existing projects on the server. Requires 'delete' authorization.

    DELETE /api/11/project/[PROJECT]

Response:

    204 No Content

## Project Configuration ###

Retrieve or modify the project configuration data.  Requires `configure` authorization for the project.

###  GET Project Configuration ####

    GET /api/11/project/[PROJECT]/config

Response, based on `Accept` header:

`Content-Type: application/xml`

``` xml
<config>
    <property key="name" value="value"/>
    <!-- ... -->
</config>
```

`Content-Type: application/json`

``` json
{
    "key":"value",
    "key2":"value2..."
}
```

`Content-Type: text/plain` ([Java Properties](https://en.wikipedia.org/wiki/.properties)-formatted text.)

```
key=value
key2=value
```

###  PUT Project Configuration ####

Replaces all configuration data with the submitted values.

**Request:**

    PUT /api/11/project/[PROJECT]/config

Content:

`Content-Type: application/xml`

``` xml
<config>
    <property key="key" value="value"/>
    <!-- ... -->
</config>
```

`Content-Type: application/json`

``` json
{
    "key":"value",
    "key2":"value2..."
}
```

`Content-Type: text/plain` ([Java Properties](https://en.wikipedia.org/wiki/.properties)-formatted text.)

```
key=value
key2=value
```

Response: same as [GET Project Configuration](#get-project-configuration).

## Project Configuration Keys ###

Retrieve, change or delete individual configuration properties by their key.  Requires `configure` authorization for the project.

URL:

    /api/11/project/[PROJECT]/config/[KEY]

Request and response formats:

`application/xml`:

``` xml
<property key="[KEY]" value="key value"/>
```

`application/json`:

``` json
{ "[KEY]" : "key value" }
```

`text/plain`: the plain text key value

```
key value
```

###  GET Project Configuration Key ####

Retrieve the value.

    GET /api/11/project/[PROJECT]/config/[KEY]

###  PUT Project Configuration Key ####

Set the value.

    PUT /api/11/project/[PROJECT]/config/[KEY]

###  DELETE Project Configuration Key ####

Delete the key.

    DELETE /api/11/project/[PROJECT]/config/[KEY]

Response will be

    204 No Content

## Project Archive Export ###

Export a zip archive of the project.  Requires `export` authorization for the project. Performs the export synchronously.
(See [Project Archive Export Async][/api/V/project/\[PROJECT\]/export/async] for asynchronous export.)

    GET /api/11/project/[PROJECT]/export

Response content type is `application/zip`

Optional parameters:

* `executionIds` a list (comma-separated) of execution IDs.  If this is specified then the archive will
contain *only* executions that are specified, and will not contain Jobs, ACLs, or project configuration/readme files.
    * optionally use `POST` method with with `application/x-www-form-urlencoded` content for large lists of execution IDs
    * optionally, specify `executionIds` multiple times, with a single ID per entry.

In APIv19 or later:

* `exportAll` true/false, include all project contents (default: true)
* `exportJobs` true/false, include executions
* `exportExecutions` true/false, include executions
* `exportConfigs` true/false, include project configuration
* `exportReadmes` true/false, include project readme/motd files
* `exportAcls` true/false, include project ACL Policy files, if authorized

In APIv28 or later:

* `exportScm` true/false, include project SCM configuration, if authorized

GET Examples:

    GET /api/11/project/AlphaProject/export?executionIds=1,4,9
    GET /api/11/project/AlphaProject/export?executionIds=1&executionIds=4&executionIds=9

Post:

    POST /api/11/project/AlphaProject/export
    Content-Type: application/x-www-form-urlencoded

    executionIds=1&executionIds=4&executionIds=9&...

## Project Archive Export Async

Export a zip archive of the project asynchronously.  Requires `export` authorization for the project. Use the Token result
to query the export status with [/api/V/project/[PROJECT]/export/status/[TOKEN]][/api/V/project/\[PROJECT\]/export/status/\[TOKEN\]], and retrieve the result once ready
with [/api/V/project/[PROJECT]/export/download/[TOKEN]][/api/V/project/\[PROJECT\]/export/download/\[TOKEN\]].

    GET /api/19/project/[PROJECT]/export/async

**Request:**

Same as [Project Archive Export][/api/V/project/\[PROJECT\]/export].

**Response:**

Same as [Project Archive Export Async Status][/api/V/project/\[PROJECT\]/export/status/\[TOKEN\]].


## Project Archive Export Async Status

Get the status of an async export request. Retrieve the result once ready
with [/api/V/project/[PROJECT]/export/download/[TOKEN]][/api/V/project/\[PROJECT\]/export/download/\[TOKEN\]].

    GET /api/19/project/[PROJECT]/export/status/[TOKEN]

**Response:**

`application/xml`

``` xml
<projectExport token="[TOKEN]" ready="true/false" precentage="#">
</projectExport>
```

`application/json`

``` json
{
    "token":"[TOKEN]",
    "ready":true/false,
    "percentage":int,
}
```

## Project Archive Export Async Download

Download the archive file once the export status is `ready`.

    GET /api/19/project/[PROJECT]/export/download/[TOKEN]

**Response:**

Response content type is `application/zip`

## Project Archive Import ###

**Request:**

Import a zip archive to the project. Requires `import` authorization for the project.

    PUT /api/14/project/[PROJECT]/import{?jobUuidOption,importExecutions,importConfig,importACL,importScm}

Parameters:

+ `jobUuidOption` (optional, string, `preserve/remove`) ... Option declaring how duplicate Job UUIDs should be handled. If `preserve` (default) then imported job UUIDs will not be modified, and may conflict with jobs in other projects. If `remove` then all job UUIDs will be removed before importing.
+ `importExecutions` (optional, boolean, `true/false`) ... If true, import all executions and logs from the archive (default). If false, do not import executions or logs.
+ `importConfig` (optional,boolean,`true/false`) ... If true, import the project configuration from the archive. If false, do not import the project configuration (default).
+ `importACL` (optional,boolean,`true/false`) ... If true, import all of the ACL Policies from the archive. If false, do not import the ACL Policies (default).
+ `importScm` (optional,boolean,`true/false`) ... If true, import SCM configuration from the archive. If false, do not import the SCM configuration (default).

Expected Request Content:

`Content-Type: application/zip`

**Response:**

Note: the import status indicates "failed" if any Jobs had failures,
otherwise it indicates "successful" even if other files in the archive were not imported.

Response will indicate whether the imported contents had any errors:

*All imported jobs and files were successful:*

`application/xml`

``` xml
<import status="successful">
</import>
```

`application/json`

``` json
{"import_status":"successful"}
```

*Some imported files failed:*

`application/xml`

``` xml
<import status="failed">
    <errors count="[#]">
        <error>Job ABC could not be validated: ...</error>
        <error>Job XYZ could not be validated: ...</error>
    </errors>
    <executionErrors count="[#]">
        <error>Execution 123 could not be imported: ...</error>
        <error>Execution 456 could not be imported: ...</error>
    </executionErrors>
    <aclErrors count="[#]">
        <error>file.aclpolicy could not be validated: ...</error>
        <error>file2.aclpolicy could not be validated: ...</error>
    </aclErrors>
</import>
```

`application/json`

``` json
{
    "import_status":"failed",
    "errors": [
        "Job ABC could not be validated: ...",
        "Job XYZ could not be validated: ..."
    ],
    "execution_errors": [
        "Execution 123 could not be imported: ...",
        "Execution 456 could not be imported: ..."
    ],
    "acl_errors": [
        "file.aclpolicy could not be validated: ...",
        "file2.aclpolicy could not be validated: ..."
    ]
}
```

## Updating and Listing Resources for a Project

Update or retrieve the Resources or Sources for a project.

Each Project can have multiple resource Sources.  Sources can be read-only, or writeable.

Use [/api/V/project/[PROJECT]/resources][/api/V/project/\[PROJECT\]/resources] to get all resources from a project.

Use [/api/V/project/[PROJECT]/sources][/api/V/project/\[PROJECT\]/sources] to get all Sources from a project.  Individual Sources
can be retrieved, or their Resources

###  List Resources for a Project

A GET request returns all the resources for the project.

**Request:**

    GET /api/2/project/[PROJECT]/resources

See [Listing Resources](#listing-resources).

###  List Resource Model Sources for a Project

**Request:**

    GET /api/23/project/[PROJECT]/sources

**Response:**

The response contains a set of `source` objects, each describes the `index`, the `type`, and details about the `resources`. If the
source had any error, that is included as `errors`.

Resources data includes any `description` provided by the source, whether it is `empty`, and
whether it is `writeable`.  The `href` indicates the URL for [Listing and Updating the resources for the source][/api/V/project/\[PROJECT\]/source/\[INDEX\]/resources].

`application/json`

``` json
[
    {
        "index": 1,
        "resources": {
            "description": "/Users/greg/rundeck2.11/projects/atest/etc/resources.xml",
            "empty": false,
            "href": "http://ecto1.local:4440/api/23/project/atest/source/1/resources",
            "writeable": true
        },
        "type": "file"
    },
    {
        "errors": "File does not exist: /Users/greg/rundeck2.11/projects/atest/etc/resources2.xml",
        "index": 2,
        "resources": {
            "href": "http://ecto1.local:4440/api/23/project/atest/source/2/resources",
            "writeable": false
        },
        "type": "stub"
    }
]
```

`application/xml`

``` xml
<?xml version="1.0" encoding="utf-8"?>
<sources project="atest" count="2">
  <source index="1" type="file">
    <resources href="http://ecto1.local:4440/api/23/project/atest/source/1/resources"
    writeable="true" empty="false">
      <description>
      /Users/greg/rundeck2.11/projects/atest/etc/resources.xml</description>
    </resources>
  </source>
  <source index="2" type="stub">
    <resources href="http://ecto1.local:4440/api/23/project/atest/source/2/resources"
    writeable="false" />
     <errors>File does not exist:
    /Users/greg/rundeck2.11/projects/atest/etc/resources2.xml</errors>
  </source>
</sources>
```

###  Get a Resource Model Source for a Project

**Request:**

    GET /api/23/project/[PROJECT]/source/[INDEX]

**Response:**

A single `source` for the given index, as described in [List Resource Model Sources For a Project][/api/V/project/\[PROJECT\]/sources].

###  List Resources of a Resource Model Source

**Request:**

    GET /api/23/project/[PROJECT]/source/[INDEX]/resources

**Response:**

Based on the `Accept:` header, the resource model data for the source.

* See [Listing Resources](#listing-resources).

###  Update Resources of a Resource Model Source

**Request:**

    POST /api/23/project/[PROJECT]/source/[INDEX]/resources
    Content-Type: [TYPE]

    [RESOURCE MODEL DATA]

Specify the `Content-Type` header, with a value such as `application/json` or `application/xml` or any supported resource model format.

**Response:**

The resource model data in the format requested via the `Accept:` header.

* See [Listing Resources](#listing-resources).

## Project Readme File

The `readme.md` and `motd.md` files,
which are Markdown formatted and displayed in the Project listing page,
can be managed via the API. (See [Project Readme.md](/administration/projects/project-readme.md).)

**Request:**

    /api/13/project/[PROJECT]/readme.md
    /api/13/project/[PROJECT]/motd.md

Method: `GET`, `PUT` and `DELETE`.

Format: XML, JSON and plain text formats.

###  GET Readme File

    GET /api/13/project/[PROJECT]/readme.md
    GET /api/13/project/[PROJECT]/motd.md

Response format depends on the `Accept:` HTTP header.

`text/plain`:

    The readme contents

`application/xml`:

```xml
<contents>The readme contents</contents>
```

*Note*: XML output will use CDATA to preserve formatting of the contents

`application/json`:

```json
{"contents":"The readme contents"}
```

If the file does not exist, then the response will be : `404 Not Found`

###  PUT Readme File

    PUT /api/13/project/[PROJECT]/readme.md
    PUT /api/13/project/[PROJECT]/motd.md

To create or modify the contents, use a `PUT` request, and `Content-Type` header to specify the same format.  Use the same format as returned by the GET responses.

###  DELETE Readme File

    DELETE /api/13/project/[PROJECT]/readme.md
    DELETE /api/13/project/[PROJECT]/motd.md

Deletes the resource if it exists.

Response: `204 No Content`

## Project ACLs

Manage a set of ACL Policy files for a project.  These files will apply to the specified project only,
and must either have a `context:` section which specifies the project context, or have no `context:` section.

The request and response formats for Project ACL Policies matches that of the
[System ACL Policies][/api/V/system/acl/*],
however the URL is rooted under the Project's URL path: `/api/13/project/[PROJECT]/acl/*`.

For more information about ACL Policies see:

* [ACLPOLICY format][ACLPOLICY]
* [Access Control Policy](/administration/security/authorization.md)

###  List Project ACL Policies

**Request:**

    GET /api/13/project/[PROJECT]/acl/

See [List System ACL Policies](#list-system-acl-policies) for request and response.

###  Get a Project ACL Policy

**Request:**

    GET /api/13/project/[PROJECT]/acl/name.aclpolicy

See [Get an ACL Policy](#get-an-acl-policy) for request and response.

###  Create a Project ACL Policy

**Request:**

    POST /api/13/project/[PROJECT]/acl/name.aclpolicy

See [Create an ACL Policy](#create-an-acl-policy) for request and response.

###  Update a Project ACL Policy

**Request:**

    PUT /api/13/project/[PROJECT]/acl/name.aclpolicy

See [Update an ACL Policy](#update-an-acl-policy) for request and response.

###  Delete a Project ACL Policy

**Request:**

    DELETE /api/13/project/[PROJECT]/acl/name.aclpolicy

See [Delete an ACL Policy](#delete-an-acl-policy)
