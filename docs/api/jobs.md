# Jobs

## Listing Jobs ###

List the jobs that exist for a project.

**Request:**

    GET  /api/14/project/[PROJECT]/jobs

(**Deprecated URL**: `/api/14/jobs` with required parameter: `project`.)

The following parameters can also be used to narrow down the result set.

* `idlist`: specify a comma-separated list of Job IDs to include
* `groupPath`: specify a group or partial group path to include all jobs within that group path. (Default value: "*", all groups). Set to the special value "-" to match the top level jobs only
* `jobFilter`: specify a filter for the job Name. Matches any job name that contains this value.
* `jobExactFilter`: specify an exact job name to match.
* `groupPathExact`: specify an exact group path to match.  Set to the special value "-" to match the top level jobs only
* `scheduledFilter`: `true/false` specify whether to return only scheduled or only not scheduled jobs.
* `serverNodeUUIDFilter`: Value: a UUID. In cluster mode, use to select scheduled jobs assigned to the server with given UUID.

Note: If neither `groupPath` nor `groupPathExact` are specified, then the default `groupPath` value of "*" will be used (matching jobs in all groups).  `groupPathExact` cannot be combined with `groupPath`.  You can set either one to "-" to match only the top-level jobs which are not within a group.

**Response**

`Content-Type: application/xml`:  An Item List of `jobs`. Each `job` is of the form:

``` xml
<job id="ID" href="[API url]" permalink="[GUI URL]" scheduled="true/false" scheduleEnabled="true/false"
   enabled="true/false"
   >
    <name>Job Name</name>
    <group>Job Name</group>
    <project>Project Name</project>
    <description>...</description>
</job>
```

`Content-Type: application/json`

``` json
[
  {
    "id": "[UUID]",
    "name": "[name]",
    "group": "[group]",
    "project": "[project]",
    "description": "...",
    "href": "[API url]",
    "permalink": "[GUI url]",
    "scheduled": true/false,
    "scheduleEnabled": true/false,
    "enabled": true/false
  }
]
```

**Since v17**:

* `scheduled` indicates whether the job has a schedule
* `scheduleEnabled` indicates whether the job's schedule is enabled or not
* `enabled` indicates whether executions are enabled or not

In Cluster mode, additional information about what server UUID is the schedule owner will be included:

* `serverNodeUUID` UUID of the schedule owner server for this job
* `serverOwner` boolean value whether the target server is the owner, `true/false`.

`Content-Type: application/xml`:

``` xml
<job id="ID" href="[API url]" permalink="[GUI URL]" scheduled="true/false" scheduleEnabled="true/false"
  enabled="true/false"
  serverNodeUUID="[UUID]"
  serverOwner="true/false"
  >
    <name>Job Name</name>
    <group>Job Name</group>
    <project>Project Name</project>
    <description>...</description>
</job>
```

`Content-Type: application/json`

``` json
[
  {
    "id": "[UUID]",
    "name": "[name]",
    "group": "[group]",
    "project": "[project]",
    "description": "...",
    "href": "[API url]",
    "permalink": "[GUI url]",
    "scheduled": true/false,
    "scheduleEnabled": true/false,
    "enabled": true/false,
    "serverNodeUUID": "[UUID]",
    "serverOwner": true/false
  }
]
```


## Running a Job

Run a job specified by ID.

**Request:**

    POST /api/1/job/[ID]/run
    POST /api/12/job/[ID]/executions

Optional parameters:

* `argString`: argument string to pass to the job, of the form: `-opt value -opt2 value ...`.
* `loglevel`: argument specifying the loglevel to use, one of: 'DEBUG','VERBOSE','INFO','WARN','ERROR'
* `asUser` : specifies a username identifying the user who ran the job. Requires `runAs` permission.
* Node filter parameters as described under [Using Node Filters](#using-node-filters)
* `filter` can be a node filter string.
* `runAtTime`: Specify a time to run the job (**API v18** or later).
* `option.OPTNAME`: Option value for option named `OPTNAME`. If any `option.OPTNAME` parameters are specified,
    the `argString` value is ignored (**API v18** or later).

`runAtTime`
:    This is a ISO-8601 date and time stamp with timezone, with optional milliseconds.,
        e.g. `2016-11-23T12:20:55-0800` or `2016-11-23T12:20:55.123-0800`

(**API v14**) If the request has `Content-Type: application/json`, then the parameters will be ignored,
and this format is expected in the content:

``` json
{
    "argString":"...",
    "loglevel":"...",
    "asUser":"...",
    "filter":"...",
    "runAtTime":"...",
    "options": {
        "myopt1":"value",
        ...
    }
}
```

(**API v18** or later): The `options` entry can contain a map of option name -> value, in which case the `argString` is ignored.


**Response**:

See [Listing Running Executions](#listing-running-executions).

## Retry a Job based on execution

Retry a failed execution on failed nodes only or on the same as the execution.
This is the same functionality as the `Retry Failed Nodes ...` button on the execution page.

**Request:**

    POST /api/24/job/[ID]/retry/[EXECID]

Optional parameters.
All of this parameters are going to be populated with the execution values unless they are included in the call:

* `argString`: argument string to pass to the job, of the form: `-opt value -opt2 value ...`.
* `loglevel`: argument specifying the loglevel to use, one of: 'DEBUG','VERBOSE','INFO','WARN','ERROR'
* `asUser` : specifies a username identifying the user who ran the job. Requires `runAs` permission.
* `option.OPTNAME`: Option value for option named `OPTNAME`. If any `option.OPTNAME` parameters are specified,
    the `argString` value is ignored.
* `failedNodes` : `false` to run on the same nodes as the original execution, `true`or empty to run only on failed nodes.


If the request has `Content-Type: application/json`, then the parameters will be ignored,
and this format is expected in the content:

``` json
{
    "argString":"...",
    "loglevel":"...",
    "asUser":"...",
    "options": {
        "myopt1":"value",
        ...
    }
}
```

The `options` entry can contain a map of option name -> value, in which case the `argString` is ignored.

**Response**:

See [Listing Running Executions](#listing-running-executions).

## Exporting Jobs

Export the job definitions for in XML or YAML formats.

**Request:**

    GET /api/14/project/[PROJECT]/jobs/export

(**Deprecated URL**: `/api/14/jobs/export` with required parameter: `project`.)

Optional parameters:

* `format` : can be "xml" or "yaml" to specify the output format. Default is "xml"

The following parameters can also be used to narrow down the result set.

* `idlist`: specify a comma-separated list of Job IDs to export
* `groupPath`: specify a group or partial group path to include all jobs within that group path.
* `jobFilter`: specify a filter for the job Name

**Response:**

If you specify `format=xml`, then the output will be in [job-xml](/manual/document-format-reference/job-v20.md) format.

If you specify `format=yaml`, then the output will be in [job-yaml](/manual/document-format-reference/job-yaml-v12.md) format.

If an error occurs, then the output will be in XML format, using the common `result` element described in the [Response Format][] section.

## Importing Jobs ###

Import job definitions in XML or YAML formats.

**Request:**

    POST /api/1/project/[PROJECT]/jobs/import

(**Deprecated URL**: `/api/14/jobs/import` with optional parameter: `project`.)

Request Content:

One of the following:


* `Content-Type: x-www-form-urlencoded`, with a `xmlBatch` request parameter containing the input content
* `Content-Type: multipart/form-data` multipart MIME request part named `xmlBatch` containing the content.
* `Content-Type: application/xml`, request body is the Jobs XML formatted job definition (**since API v14**)
* `Content-Type: application/yaml`, request body is the Jobs YAML formatted job definition (**since API v14**)

Optional parameters:

* `fileformat` : can be "xml" or "yaml" to specify the input format, if multipart of form input is sent. Default is "xml"
    * (deprecated: `format` can be used as well, but this will also force the response format to be XML.)
* `dupeOption`: A value to indicate the behavior when importing jobs which already exist.  Value can be "skip", "create", or "update". Default is "create".
* `uuidOption`: Whether to preserve or remove UUIDs from the imported jobs. Allowed values (**since V9**):
    *  `preserve`: Preserve the UUIDs in imported jobs.  This may cause the import to fail if the UUID is already used. (Default value).
    *  `remove`: Remove the UUIDs from imported jobs. Allows update/create to succeed without conflict on UUID.

**Response:**

A set of status results.  Each imported job definition will be either "succeeded", "failed" or "skipped".  These status sections contain a `count` attribute declaring how many jobs they contain.  Within each one there will be 0 or more `job` elements.

`Content-Type: application/xml`:

``` xml
<succeeded count="x">
    <!-- job elements -->
</succeeded>
<failed count="x">
    <!-- job elements -->
</failed>
<skipped count="x">
    <!-- job elements -->
</skipped>
```

Each Job element will be of the form:

``` xml
<job index="x" href="[API url]">
    <!-- ID, href, and permalink may not be present if the job was not created yet -->
    <id>ID</id>
    <permalink>[GUI url]</permalink>
    <name>job name</name>
    <group>job group</group>
    <project>job project</project>
    <!--if within the failed section, then an error section will be included -->
    <error>Error message</error>
</job>
```

`Content-Type: application/json`:

``` json
{
  "succeeded": [...],
  "failed": [...],
  "skipped": [...]
}
```

Each array may contain a job data object:

``` json
{
  "index": 1,
  "href": "http://madmartigan.local:4440/api/14/job/3b6c19f6-41ee-475f-8fd0-8f1a26f27a9a",
  "id": "3b6c19f6-41ee-475f-8fd0-8f1a26f27a9a",
  "name": "restart",
  "group": "app2/dev",
  "project": "test",
  "permalink": "http://madmartigan.local:4440/job/show/3b6c19f6-41ee-475f-8fd0-8f1a26f27a9a"
}
```

* `index`: index in the input content of the job definition.
* `id`: If the job exists, or was successfully created, its UUID
* `href`: If the job exists, or was successfully created, its API href
* `permalink`: If the job exists, or was successfully created, its GUI URL.

## Getting a Job Definition ###

Export a single job definition in XML or YAML formats.

**Request:**

    GET /api/1/job/[ID]

Optional parameters:

* `format` : can be "xml" or "yaml" to specify the output format. Default is "xml"

**Response:**

If you specify `format=xml`, then the output will be in [job-xml](/manual/document-format-reference/job-v20.md) format.

If you specify `format=yaml`, then the output will be in [job-yaml](/manual/document-format-reference/job-yaml-v12.md) format.

If an error occurs, then the output will be in XML format, using the common `result` element described in the [Response Format][] section.

## Deleting a Job Definition ###

Delete a single job definition.

**Request:**

    DELETE /api/1/job/[ID]

**Response:**

    204 No Content

## Bulk Job Delete ###

Delete multiple job definitions at once.

**Request:**

    DELETE /api/5/jobs/delete
    POST /api/5/jobs/delete

Either Query parameters:

* `ids`: The Job IDs to delete, can be specified multiple times
* `idlist`: The Job IDs to delete as a single comma-separated string.

Or JSON/XML content:

`Content-Type: application/json`

``` json
{
  "ids": [
    "fefa50e1-2265-47af-b101-d4bbaa3ba21c",
    "f07e2311-4dae-40ca-bdfa-412bd223f863"
  ],
  "idlist":"49336998-21a3-42c7-8da3-a855587982e0,a387f77f-a623-45dc-967f-746a2e3f6686"
}
```

Note: you can combine `ids` with `idlist`

`application/xml` response:

The common `result` element described in the [Response Format][] section, indicating success or failure and any messages.

If successful, then the `result` will contain a `deleteJobs` element with two sections of results, `succeeded` and `failed`:

``` xml
<deleteJobs requestCount="#" allsuccessful="true/false">
    <succeeded count="1">
        <deleteJobRequest id="[job ID]">
            <message>[message]</message>
        </deleteJobRequest>
    </succeeded>
    <failed count="1">
        <deleteJobRequest id="[job ID]" errorCode="[code]">
            <error>[message]</error>
        </deleteJobRequest>
    </failed>
</deleteJobs>
```


`deleteJobs` will have two attributes:

* `requestCount`: the number of job IDs that were in the delete request
* `allsuccessful`: true/false: true if all job deletes were successful, false otherwise.

The response may contain only one of `succeeded` or `failed`, depending on the result.

The `succeeded` and `failed` sections contain multiple `deleteJobRequest` elements.

Each `deleteJobRequest` under the `succeeded` section will contain:

* `id` attribute - the Job ID
* `message` sub-element - result message for the delete request


Each `deleteJobRequest` under the `failed` section will contain:

* `id` attribute - the Job ID
* `error` sub-element - result error message for the delete request
* `errorCode` attribute - a code indicating the type of failure, currently one of `failed`, `unauthorized` or `notfound`.

`application/json` response:


``` json
{
  "requestCount": #integer#,
  "allsuccessful": true/false,
  "succeeded": [...],
  "failed":[...]
}
```

The list of succeeded/failed will contain objects of this form:

``` json
{
  "id": "[UUID]",
  "errorCode": "(error code, see above)",
  "message": "(success or failure message)"
}
```

## Enable Executions for a Job

Enable executions for a job. (ACL requires `toggle_execution` action for a job.)

**Request:**

    POST /api/14/job/[ID]/execution/enable

**Response:**

`application/xml`

```xml
<success>true</success>
```

`application/json`

```json
{"success":true}
```

## Disable Executions for a Job

Disable all executions for a job (scheduled or manual). (ACL requires `toggle_execution` action for a job.)

**Request:**

    POST /api/14/job/[ID]/execution/disable

**Response:**

(See [Enable Executions for a Job](#enable-executions-for-a-job).)

## Enable Scheduling for a Job

Enable the schedule for a job. (ACL requires `toggle_schedule` action for a job.)

**Request:**

    POST /api/14/job/[ID]/schedule/enable

**Response:**

(See [Enable Executions for a Job](#enable-executions-for-a-job).)

## Disable Scheduling for a Job

Disable the schedule for a job. (ACL requires `toggle_schedule` action for a job.)

**Request:**

    POST /api/14/job/[ID]/schedule/disable

**Response:**

(See [Enable Executions for a Job](#enable-executions-for-a-job).)

## Bulk Toggle Job Execution

Toggle whether executions are enabled for a set of jobs. (ACL requires `toggle_execution` action for each job.)

Executions will be enabled or disabled, depending on the URL used:

**Request:**

    POST /api/14/jobs/execution/enable
    POST /api/14/jobs/execution/disable

Query parameters:

* `ids`: The Job IDs to delete, can be specified multiple times
* `idlist`: The Job IDs to delete as a single comma-separated string.

Or JSON/XML content:

`Content-Type: application/json`

``` json
{
  "ids": [
    "fefa50e1-2265-47af-b101-d4bbaa3ba21c",
    "f07e2311-4dae-40ca-bdfa-412bd223f863"
  ],
  "idlist":"49336998-21a3-42c7-8da3-a855587982e0,a387f77f-a623-45dc-967f-746a2e3f6686"
}
```

Note: you can combine `ids` with `idlist`.

**Response:**

If successful, then the `result` will contain a `toggleExecution` element with two sections of results, `succeeded` and `failed`:

``` xml
<toggleExecution enabled="true" requestCount="#" allsuccessful="true/false">
    <succeeded count="1">
        <toggleExecutionResult id="[job ID]">
            <message>[message]</message>
        </toggleExecutionResult>
    </succeeded>
    <failed count="1">
        <toggleExecutionResult id="[job ID]" errorCode="[code]">
            <error>[message]</error>
        </toggleExecutionResult>
    </failed>
</toggleExecution>
```


`toggleExecution` has these attributes:

* `enabled`: `true` or `false`, depending on whether `enable` or `disable` was requested.
* `requestCount`: the number of job IDs that were in the request
* `allsuccessful`: true/false: true if all modifications were successful, false otherwise.

The response may contain only one of `succeeded` or `failed`, depending on the result.

The `succeeded` and `failed` sections contain multiple `toggleExecutionResult` elements.

Each `toggleExecutionResult` under the `succeeded` section will contain:

* `id` attribute - the Job ID
* `message` sub-element - result message for the request


Each `toggleExecutionResult` under the `failed` section will contain:

* `id` attribute - the Job ID
* `error` sub-element - result error message for the request
* `errorCode` attribute - a code indicating the type of failure, currently one of `failed`, `unauthorized` or `notfound`.

`application/json` response:


``` json
{
  "requestCount": #integer#,
  "enabled": true/false,
  "allsuccessful": true/false,
  "succeeded": [...],
  "failed":[...]
}
```

The list of succeeded/failed will contain objects of this form:

``` json
{
  "id": "[UUID]",
  "errorCode": "(error code, see above)",
  "message": "(success or failure message)"
}
```

## Bulk Toggle Job Schedules

Toggle whether schedules are enabled for a set of jobs. (ACL requires `toggle_schedule` action for each job.)

Schedules will be enabled or disabled, depending on the URL used:

**Request:**

    POST /api/14/jobs/schedule/enable
    POST /api/14/jobs/schedule/disable

Query parameters:

* `ids`: The Job IDs to delete, can be specified multiple times
* `idlist`: The Job IDs to delete as a single comma-separated string.

Or JSON/XML content:

`Content-Type: application/json`

``` json
{
  "ids": [
    "fefa50e1-2265-47af-b101-d4bbaa3ba21c",
    "f07e2311-4dae-40ca-bdfa-412bd223f863"
  ],
  "idlist":"49336998-21a3-42c7-8da3-a855587982e0,a387f77f-a623-45dc-967f-746a2e3f6686"
}
```

Note: you can combine `ids` with `idlist`.

**Response:**

If successful, then the `result` will contain a `toggleSchedule` element with two sections of results, `succeeded` and `failed`:

``` xml
<toggleSchedule enabled="true" requestCount="#" allsuccessful="true/false">
    <succeeded count="1">
        <toggleScheduleResult id="[job ID]">
            <message>[message]</message>
        </toggleScheduleResult>
    </succeeded>
    <failed count="1">
        <toggleScheduleResult id="[job ID]" errorCode="[code]">
            <error>[message]</error>
        </toggleScheduleResult>
    </failed>
</toggleSchedule>
```


`toggleSchedule` has these attributes:

* `enabled`: `true` or `false`, depending on whether `enable` or `disable` was requested.
* `requestCount`: the number of job IDs that were in the request
* `allsuccessful`: true/false: true if all modifications were successful, false otherwise.

The response may contain only one of `succeeded` or `failed`, depending on the result.

The `succeeded` and `failed` sections contain multiple `toggleScheduleResult` elements.

Each `toggleScheduleResult` under the `succeeded` section will contain:

* `id` attribute - the Job ID
* `message` sub-element - result message for the request


Each `toggleScheduleResult` under the `failed` section will contain:

* `id` attribute - the Job ID
* `error` sub-element - result error message for the request
* `errorCode` attribute - a code indicating the type of failure, currently one of `failed`, `unauthorized` or `notfound`.

`application/json` response:


``` json
{
  "requestCount": #integer#,
  "enabled": true/false,
  "allsuccessful": true/false,
  "succeeded": [...],
  "failed":[...]
}
```

The list of succeeded/failed will contain objects of this form:

``` json
{
  "id": "[UUID]",
  "errorCode": "(error code, see above)",
  "message": "(success or failure message)"
}
```

## Get Job Metadata

Get metadata about a specific job.

**Request:**

    GET /api/18/job/[ID]/info

**Response:**

`Content-Type: application/xml`: A single `job` element in the same format as [Listing Jobs](#listing-jobs):

``` xml
<job id="ID" href="[API url]" permalink="[GUI URL]" scheduled="true/false" scheduleEnabled="true/false"
   enabled="true/false" averageDuration="[ms]"
   >
    <name>Job Name</name>
    <group>Job Name</group>
    <project>Project Name</project>
    <description>...</description>
</job>
```

`Content-Type: application/json`

A single object:

``` json
{
    "id": "[UUID]",
    "name": "[name]",
    "group": "[group]",
    "project": "[project]",
    "description": "...",
    "href": "[API url]",
    "permalink": "[GUI url]",
    "scheduled": true/false,
    "scheduleEnabled": true/false,
    "enabled": true/false,
    "averageDuration": long (milliseconds)
}
```

## Upload a File for a Job Option

Job Options of type `file` require a file input. You can upload multiple files individually, or en-masse.
Each uploaded file is assigned a unique "file key" identifier.
You can then [Run the Job][/api/V/job/\[ID\]/run] using the "file key" as the option value.

**Single File Upload Request:**

    POST /api/19/job/[ID]/input/file?optionName=[NAME]&fileName=[FILENAME]
    POST /api/19/job/[ID]/input/file/[NAME]&fileName=[FILENAME]
    Content-Type: octet/stream

    <file-contents>

*Query Parameters*:

* `optionName`: For a single file/option value, specify the option name either as a query parameter or as part of the URL path.
* `fileName`: Specify the original file name (optional)

*Headers*: `Content-Type: octet/stream`

*Body*: File contents

**Multiple File Upload Request:**

    POST /api/19/job/[ID]/input/file
    Content-Type: multipart/form-data
    ...

For multiple files, use a Multi-part request.  For each file, specify the field name as `option.NAME` where NAME
is the option name. The filename is specified normally within the multi-part request.

**Response:**

`Content-Type: application/xml`:

``` xml
<jobFileUpload>
  <total>$total</total>
  <options>
    <entry key="$optionName">$fileKey</entry>
    <!-- ... -->
  </options>
</jobFileUpload>
```

`Content-Type: application/json`:

``` json
{
  "total": $total,
  "options": {
    "$optionName": "$fileKey"
  }
}
```

### Example

To upload a file for an option `myfile` and run a job with the file:

    POST /api/19/job/[ID]/input/file/myfile
    Accept: application/json
    Content-Type: application/octet-stream
    Content-Length: 10

    test file

Response:

``` json
{
  "total": 1,
  "options": {
    "myfile": "bb704988-6467-4613-b961-13014f6a55cb"
  }
}
```

Now run the job using the file key value for the `myfile` option:

    POST /api/19/job/[ID]/run
    Content-Type: application/json

    {"options":{"myfile":"bb704988-6467-4613-b961-13014f6a55cb"}}

**Multiple file example using curl:**

    curl -X POST -H x-rundeck-auth-token:$RD_TOKEN \
        -H accept:application/json \
        -F option.csvfile=@data.csv \
        -F option.xmlfile=@data.xml \
        $RD_URL/job/47d71672-9aa0-49f3-96d0-39f02daf80b9/input/file

This uploads two files, one for option `csvfile` and with filename `data.csv`, and the other for option `xmlfile` and filename `data.xml`.

The result:


``` json
{
  "options": {
    "csvfile": "34ba3064-28c6-447e-aafb-b73db8ee9f6f",
    "xmlfile": "a71c4cc7-71f6-4b3c-b53d-2aa89882a4cf"
  },
  "total": 2
}
```

## List Files Uploaded for a Job

List files that have been uploaded for a Job. Files with fileState `temp` can be used for for a new execution of the job.

**Request:**

    GET /api/19/job/[ID]/input/files

Query Parameters:

* Paging: `max` (maximum results, default: 20), `offset` (offset of first result)
* Filter:
    * `fileState`: state of file upload record (default: `temp`), can be one of:
        * `temp`: file was uploaded and is not yet used, may become expired and removed
        * `deleted`: file was used for an execution and then deleted
        * `expired`: temp file was not used for an execution and expired
        * `retained`: file was retained

**Response:**

```json
{
  "paging": {
    "offset": 0,
    "max": 20,
    "total": 1,
    "count": 1
  },
  "files": [
    {
      "id": "023057ee-418f-4da7-9ae5-e065ac91eb5a",
      "user": "admin",
      "fileState": "temp",
      "sha": "9284ed4fd7fe1346904656f329db6cc49c0e7ae5b8279bff37f96bc6eb59baad",
      "jobId": "7b3fff59-7a2d-4a31-a5b2-dd26177c823c",
      "dateCreated": "2017-02-24T22:57:32Z",
      "serverNodeUUID": "3425B691-7319-4EEE-8425-F053C628B4BA",
      "fileName": null,
      "size": 12,
      "expirationDate": "2017-02-24T22:58:02Z",
      "execId": null
    }
  ]
}
```

```xml
<jobFiles>
  <paging offset="0" max="20" total="1" count="1" />
  <files>
    <file id="023057ee-418f-4da7-9ae5-e065ac91eb5a">
      <user>admin</user>
      <fileState>temp</fileState>
      <sha>
      9284ed4fd7fe1346904656f329db6cc49c0e7ae5b8279bff37f96bc6eb59baad</sha>
      <jobId>7b3fff59-7a2d-4a31-a5b2-dd26177c823c</jobId>
      <dateCreated>2017-02-24 14:57:32.746 PST</dateCreated>
      <serverNodeUUID>
      3425B691-7319-4EEE-8425-F053C628B4BA</serverNodeUUID>
      <fileName />
      <size>12</size>
      <expirationDate>2017-02-24 14:58:02.655 PST</expirationDate>
      <execId />
    </file>
  </files>
</jobFiles>
```

## Get Info About an Uploaded File

Get info about an uploaded file given its ID.

**Request:**

    GET /api/19/jobs/file/[ID]

**Response:**

```json
{
  "dateCreated": "2017-02-24T19:10:33Z",
  "execId": 2741,
  "expirationDate": "2017-02-24T19:11:03Z",
  "fileName": null,
  "fileState": "deleted",
  "id": "f985864b-fa1b-4e09-af7a-4315e9908372",
  "jobId": "7b3fff59-7a2d-4a31-a5b2-dd26177c823c",
  "serverNodeUUID": "3425B691-7319-4EEE-8425-F053C628B4BA",
  "sha": "9284ed4fd7fe1346904656f329db6cc49c0e7ae5b8279bff37f96bc6eb59baad",
  "size": 12,
  "user": "admin"
}
```

```xml
<file id="f985864b-fa1b-4e09-af7a-4315e9908372">
  <user>admin</user>
  <fileState>deleted</fileState>
  <sha>9284ed4fd7fe1346904656f329db6cc49c0e7ae5b8279bff37f96bc6eb59baad</sha>
  <jobId>7b3fff59-7a2d-4a31-a5b2-dd26177c823c</jobId>
  <dateCreated>2017-02-24 11:10:33.829 PST</dateCreated>
  <serverNodeUUID>3425B691-7319-4EEE-8425-F053C628B4BA</serverNodeUUID>
  <fileName />
  <size>12</size>
  <expirationDate>2017-02-24 11:11:03.741 PST</expirationDate>
  <execId>2741</execId>
</file>
```

## Get Job Forecast

Get a forecast for a specific amount of days of the job by ID.

**Request:**

    GET /api/31/job/[ID]/forecast

Query Parameters:

* `time`: Time lapse to search the forecast (default: 1d). The format is "XY" where X is an integer, and "Y" is one of:
    * `s`: second
    * `n`: minute
    * `h`: hour
    * `d`: day
    * `w`: week
    * `m`: month
    * `y`: year
* `max`: Maximum number of items to return (default: no limit).
* `past`: `true` to return an inverse forecast, that is, considering the current scheduler, when it should have run. Note this forecast is only referential, since it will not take into account if the job could have been disabled or not yet been created. **Since API v32**



**Response:**

`Content-Type: application/xml`: A single job element with the array `futureScheduledExecutions`:

``` xml
<job id="ID" href="[API url]" permalink="[GUI URL]" scheduled="true/false" scheduleEnabled="true/false"
   enabled="true/false" averageDuration="[ms]"
   >
    <name>Job Name</name>
    <group>Job Group</group>
    <futureScheduledExecutions>
        <date>[W3C date]</date>
        <date>[W3C date]</date>
    </futureScheduledExecutions>
    <project>Project Name</project>
    <description>...</description>
</job>
```

`Content-Type: application/json`

A single object:

``` json
{
    "href": "[API url]",
    "futureScheduledExecutions": [
        "[W3C date]",
        "[W3C date]",
        "[W3C date]",
    ],
    "id": "[ID]",
    "scheduleEnabled": true/false,
    "scheduled": true/false,
    "enabled": true/false,
    "permalink": "[GUI URL]",
    "group": "[group]",
    "description": "[description]",
    "project": "[project]",
    "name": "[name]"
}
```


[/api/V/job/\[ID\]]:#getting-a-job-definition
[DELETE /api/V/job/\[ID\]]:#deleting-a-job-definition

[/api/V/job/\[ID\]/executions]:#getting-executions-for-a-job

[/api/V/job/\[ID\]/execution/enable]:#enable-executions-for-a-job

[/api/V/job/\[ID\]/execution/disable]:#disable-executions-for-a-job

[POST /api/V/job/\[ID\]/executions]:#running-a-job
[DELETE /api/V/job/\[ID\]/executions]:#delete-all-executions-for-a-job

[/api/V/job/\[ID\]/retry/\[EXECID\]]:#retry-a-job-based-on-execution
[POST /api/V/job/\[ID\]/retry/\[EXECID\]]:#retry-a-job-based-on-execution

[/api/V/job/\[ID\]/info]:#get-job-metadata
[GET /api/V/job/\[ID\]/info]:#get-job-metadata
[/api/V/job/\[ID\]/input/file]:#upload-a-file-for-a-job-option
[POST /api/V/job/\[ID\]/input/file]:#upload-a-file-for-a-job-option
[/api/V/job/\[ID\]/input/files]:#list-files-uploaded-for-a-job

[/api/V/job/\[ID\]/forecast]:#get-job-forecast
[GET /api/V/job/\[ID\]/forecast]:#get-job-forecast

[/api/V/job/\[ID\]/schedule/enable]:#enable-scheduling-for-a-job

[/api/V/job/\[ID\]/schedule/disable]:#disable-scheduling-for-a-job


[/api/V/job/\[ID\]/run]:#running-a-job

[/api/V/jobs/delete]:#bulk-job-delete
[/api/V/jobs/execution/enable]:#bulk-toggle-job-execution
[/api/V/jobs/execution/disable]:#bulk-toggle-job-execution
[/api/V/jobs/file/\[ID\]]:#get-info-about-an-uploaded-file
[/api/V/jobs/schedule/enable]:#bulk-toggle-job-schedules
[/api/V/jobs/schedule/disable]:#bulk-toggle-job-schedules