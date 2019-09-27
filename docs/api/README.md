---
title: API Reference
---

# API Reference | Version {{{ apiVersion }}}

Rundeck provides a Web API for use with your applications.

## API Version Number

The current API version is {{{ apiVersion }}} .

For API endpoints described in this document, the *minimum* API version required for their
use is indicated by the URL used, e.g.:

    /api/2/system/info
    /api/1/projects

This means you must use at least the API version indicated to access the
endpoint, unless otherwise noted. Some features or functionality for the
endpoint may only be supported in later versions.

The API Version Number is required to be included in all API calls within the URL.

If the version number is not included or if the requested version number is unsupported, then the API call will fail.  The error response will include the code "api-version-unsupported" and have HTTP status code of `400 Bad Request`:


`Content-Type: application/xml`:

``` xml
<result error="true" apiversion="2">
    <error code="api-version-unsupported">
        <message>
        Unsupported API Version "1". API Request: /rundeck/api/1/project/test/jobs. Reason: Minimum supported version: 2
        </message>
    </error>
</result>
```


`Content-Type: application/json`:

``` json
{
  "error": true,
  "apiversion": 14,
  "errorCode": "api.error.api-version.unsupported",
  "message": "Unsupported API Version \"1\". API Request: /api/1/project/test/resources. Reason: Minimum supported version: 2"
}
```

## Index Links

View the [Index](#index) listing API paths.

## URLs

The Rundeck server has a "Base URL", where you access the server. Your Rundeck Server URL may look like: `http://myserver:4440`.

The root URL path for all calls to the API in this version is:

    $RUNDECK_SERVER_URL/api/2

## XML and JSON

The API supports both XML and JSON.  Some import/export features support YAML or `text/plain` formatted documents, but XML and JSON are used for all API-level information.

As of API version 14, all endpoints support JSON format, with content type `application/json`, with one exception ([/api/V/project/[PROJECT]/jobs/export][/api/V/project/\[PROJECT\]/jobs/export]).

JSON results can be retrieved by sending the HTTP "Accept" header with a `application/json` value.  JSON request content is supported when the HTTP "Content-Type" header specifies `application/json`.

If an "Accept" header is not specified, then the response will be either the same format as the request content (for POST, or PUT requests), or XML by default.

Some endpoints also support using a `format` query parameter to specify the expected output format.

## Authentication

Authentication can be done in two different ways, either with Token based authentication,
or with a username and password.

Note that in either case, **it is recommended that you enable SSL Support for the Rundeck server** so that communication is encrypted at all times. For more information about using SSL, see [Security - Configuring Rundeck for SSL](/administration/security/ssl.md).

### Token Authentication

Token Authentication consists of including a string known as an "API Token" with every
request to the Rundeck API.

To obtain an API Token, you must first log in to the Rundeck GUI using a user account.
Click on your username in the header of the page, and you will be shown your User Profile page.
From this page you can manage your API Tokens.

**Note**: You must have appropriate authorization to generate a token. See [API Token Authorization](/administration/security/authorization.md#api-token-authorization).

Depending on what authorization level you have, you can generate a token with a certain set of *Authorization Roles*
and an *Expiration Period*.

Click "Generate API Token" to create a new one. The unique string that is shown is the API Token.

Alternately you can define tokens in static file, by setting the `rundeck.tokens.file` in [framework.properties](/administration/configuration/config-file-reference.md#framework-properties).

You must include one of the following with every HTTP request to the API:

* HTTP Header `X-Rundeck-Auth-Token` set to the API Token string

OR

* HTTP URL Parameter `authtoken` set to the API Token string

With that in place, you can make calls to the API as described in the rest of this
document, and you don't need to maintain any cookies between requests.

Examples:

Using the URL parameter to request the project list:

    GET /api/1/projects?authtoken=E4rNvVRV378knO9dp3d73O0cs1kd0kCd HTTP/1.1
    ...

Using the HTTP Header:

    GET /api/1/projects HTTP/1.1
    X-Rundeck-Auth-Token: E4rNvVRV378knO9dp3d73O0cs1kd0kCd
    ...

### Password Authentication

If using Password Authentication, you must perform the authentication steps prior to accessing the API.

This means that you must submit authentication parameters (username, password) to the "Authentication URL" and retain a Session Cookie.

The Session Cookie must be sent with all calls to the API to maintain the authenticated connection.

To submit authentication, submit a `POST` request to the URL:

    $RUNDECK_SERVER_URL/j_security_check

With these parameters:

* `j_username`: rundeck username
* `j_password`: password

If the response includes a redirect chain which includes or results in `$RUNDECK_SERVER_URL/user/login` or `$RUNDECK_SERVER_URL/user/error`, then the authentication request failed.

Otherwise, if the response is a redirect chain which results in `200 successful` response,  then the authentication was successful.

The response should set a cookie named `JSESSIONID`.

## XML Response Format

For version 11 and later API requests, XML responses will have only the content indicated in the appropriate endpoint documentation.

For version 10 and earlier API requests, XML responses will have this document structure:

``` xml
<result success/error="true" apiversion="X">
    <!-- error included if error="true" -->
    <error>
        <message><!-- error message text --></message>
        <!-- ... multiple message elements -->
    </error>

    <!-- optional success element if declared for the endpoint -->
    <success>
        <message><!-- success message --></message>
    </success>

    <!--
        Specific API results..
    -->
</result>
```

If an error occurred, then the `error` attribute of the `<result>` element will be "true". Otherwise a `success` attribute will have the value "true".

Some `<error>` responses will include a `code` attribute giving a specific type
of error code, in addition to the message.

The `apiversion` attribute will be set to the latest version of the API
supported by the server.

### Error codes ###

Defined error codes that may be returned as `<error code="...">`

`api-version-unsupported`

:    The specified API version is not supported for the requested resource

`unauthorized`

:    The requested action is not authorized and/or the connection is not authenticated.

### Item Lists ###

Many API requests will return an item list as a result.  These are typically in the form:

    <[items] count="x">
        <[item] ...>
        <[item] ...>
    </[items]>

Where the list of specific items are wrapped in a pluralized element name which contains a `count` attribute.

When an API path declares its results as an "Item List" this is the format that will be returned.


## Changes

Changes introduced by API Version number:

**Version 33**:

* New Endpoints:
    - [`POST /api/V/webhook/[WEBHOOK TOKEN]`](/api/V/webhook/\[TOKEN\]) - Trigger a webhook with the payload as the body of the post
    - [`GET /api/V/project/[PROJECT]/webhooks`](/api/V/project/\[PROJECT\]/webhooks) - Lists the webhooks configured for the project
    - [`GET /api/V/project/[PROJECT]/webhook/[ID]`](/api/V/project/\[PROJECT\]/webhooks) - Get the webhook identified by ID
    - [`POST /api/V/project/[PROJECT]/webhook/[ID]`](/api/V/project/\[PROJECT\]/webhooks) - Create or update the webhook identified by ID. When creating a new webhook ID is not provided.
    - [`DELETE /api/V/project/[PROJECT]/webhook/[ID]`](/api/V/project/\[PROJECT\]/webhooks) - Delete the webhook identified by ID
    - [`GET /api/V/plugin/list`][/api/V/plugin/list] - List the installed plugins.
    
* Updated Endpoints:
    - [`GET /api/V/projects`][/api/V/projects] - project creation date to response.

**Version 32**:

* New Endpoint:
    - [`GET /api/V/system/executions/status`][/api/V/system/executions/status] - Gets the current execution mode.
    
* Updated Endpoints:
    - [`GET /api/V/project/[PROJECT]/executions/running`][/api/V/project/\[PROJECT\]/executions/running] - Added `jobIdFilter` parameter to return running executions for a specific job.
    - [`GET /api/V/job/[ID]/forecast`][/api/V/job/\[ID\]/forecast] - Added `past` parameter to return inverse forecast.
    - [`PUT /api/V/scheduler/takeover`][/api/V/scheduler/takeover] - Added capability to specify multiple job ids.

**Version 31**:

* New Endpoint:
    - [`GET /api/V/job/[ID]/forecast`][/api/V/job/\[ID\]/forecast] - Get a forecast for a specific amount of days of the job by ID.

**Version 30**:

* Updated Endpoints:
    - [`GET /api/V/user/roles`][/api/V/user/roles] - List the roles of the authenticated user

**Version 29**:

* New Endpoints:
    - [`GET /api/V/executions/metrics`][/api/V/executions/metrics] - Get metrics over a system-wide execution query.
    - [`GET /api/V/project/[PROJECT]/executions/metrics`][/api/V/project/\[PROJECT\]/executions/metrics] - Get metrics over a project-wide execution query.

**Version 28**:

* Updated Endpoints:
    - [`GET /api/V/project/[PROJECT]/export`][/api/V/project/\[PROJECT\]/export] - exportScm parameter.
    - [`PUT /api/V/project/[PROJECT]/import`][/api/V/project/\[PROJECT\]/import] - importScm parameter.

**Version 27**:

* Updated Endpoints:
    - [`GET /api/V/user/list`][/api/V/user/list] - More info from the user.

**Version 26**:

* Updated Endpoints:
    - [`GET /api/V/projects`][/api/V/projects] - label to projects response.

**Version 25**:

* New Endpoints.
    - [`GET /api/V/metrics`][/api/V/metrics] - List enabled Metrics endpoints
    - [`GET /api/V/metrics/metrics`][/api/V/metrics/metrics] - Get Metrics Data
    - [`GET /api/V/metrics/threads`][/api/V/metrics/threads] - Get Metrics Threads
    - [`GET /api/V/metrics/healthcheck`][/api/V/metrics/healthcheck] - Get Metrics Healthcheck
    - [`GET /api/V/metrics/ping`][/api/V/metrics/ping] - Get Metrics Ping

* Updated Endpoints:
    - [`GET /api/V/system/info`][/api/V/system/info] - `metrics` links now point to correct API endpoints.

**Version 24**:

* New Endpoints.
    - [`POST /api/V/job/[ID]/retry/[EXECID]`][POST /api/V/job/\[ID\]/retry/\[EXECID\]] - Retry a Job based on execution

**Version 23**:

* New Endpoints. (replacing removed `POST /api/2/project/[PROJECT]/resources` endpoint)
    - [`GET /api/V/project/[PROJECT]/sources`][/api/V/project/\[PROJECT\]/sources] - List project resource model sources
    - [`GET /api/V/project/[PROJECT]/source/[INDEX]`][/api/V/project/\[PROJECT\]/source/\[INDEX\]] - Get a specific project resource model source by index
    - [`GET /api/V/project/[PROJECT]/source/[INDEX]/resources`][GET /api/V/project/\[PROJECT\]/source/\[INDEX\]/resources] - Get Nodes content from a specific resource model source by index
    - [`POST /api/V/project/[PROJECT]/source/[INDEX]/resources`][POST /api/V/project/\[PROJECT\]/source/\[INDEX\]/resources] - Update Nodes content for a specific Writeable resource model source by index
* Updated Endpoints.
    - [`GET /api/V/project/[PROJECT]/resources`][/api/V/project/\[PROJECT\]/resources] - Default response format is `application/json` for API v23 and later
    - [`GET /api/V/project/[PROJECT]/resource/[NAME]`][/api/V/project/\[PROJECT\]/resource/\[NAME\]] - Default response format is `application/json` for API v23 and later

**Version 22**:

* Updated Endpoints.
    - [`GET /api/V/project/[PROJECT]/scm/[INTEGRATION]/action/[ACTION_ID]/input`][/api/V/project/\[PROJECT\]/scm/\[INTEGRATION\]/action/\[ACTION_ID\]/input] - Include Job `status`, and `deleted` whether the job file was deleted for Import integration
    - [`POST /api/V/project/[PROJECT]/scm/[INTEGRATION]/action/[ACTION_ID]`][/api/V/project/\[PROJECT\]/scm/\[INTEGRATION\]/action/\[ACTION_ID\]] - Can include `deletedJobs` to delete jobs for Import integration.

**Version 21**:

* Removed Endpoints.
    - `POST /api/2/project/[PROJECT]/resources`
    - `POST /api/2/project/[PROJECT]/resources/refresh`
* Updated Endpoints.
    - [`/api/21/execution/[ID]/output`][/api/V/execution/\[ID\]/output] - Execution output, supports `compacted=true` query parameter for less verbose xml/json results
* New Endpoints.
    - [`GET /api/21/user/list`][/api/V/user/list] - List user profiles
    - [`GET /api/21/user/info`][/api/V/user/info] - Get current user profile
    - [`POST /api/21/user/info`][POST /api/V/user/info] - Modify current user profile
    - [`GET /api/21/user/info/[USER]`][/api/V/user/info/\[USER\]] - Get another user's profile

    - [`POST /api/21/user/info/[USER]`][POST /api/V/user/info/\[USER\]] - Modify another user's profile

**Version 20**:

* Updated Endpoints.
    - [`GET /api/20/project/[PROJECT]/executions`][/api/V/project/\[PROJECT\]/executions] - Executions query, add `executionTypeFilter`

**Version 19**:

* New Endpoints.
    - [`POST /api/19/job/[ID]/input/file`][/api/V/job/\[ID\]/input/file] - Upload file(s) to use for job option values
    - [`GET /api/19/job/[ID]/input/files`][/api/V/job/\[ID\]/input/files] - List uploaded files for a job
    - [`GET /api/19/execution/[ID]/input/files`][/api/V/execution/\[ID\]/input/files] - List input files used for an execution
    - [`GET /api/19/jobs/file/[ID]`][/api/V/jobs/file/\[ID\]] - Get info for an uploaded file
    - [`GET /api/19/project/[PROJECT]/export/async`][/api/V/project/\[PROJECT\]/export/async] - Async project archive export
    - [`GET /api/19/project/[PROJECT]/export/status/[TOKEN]`][/api/V/project/\[PROJECT\]/export/status/\[TOKEN\]] - Async project archive export status
    - [`GET /api/19/project/[PROJECT]/export/download/[TOKEN]`][/api/V/project/\[PROJECT\]/export/download/\[TOKEN\]] - Async project archive export download

* Updated Endpoints.
    - [`POST /api/19/tokens/[USER]`][POST /api/V/tokens/\[USER\]] - Specify token roles and expiration
    - [`GET /api/19/tokens/[USER]`][/api/V/tokens/\[USER\]] - List tokens for users
    - [`GET /api/19/token/[ID]`][/api/V/token/\[ID\]] - Get Token string for Token ID
    - [`GET /api/19/project/[PROJECT]/export`][/api/V/project/\[PROJECT\]/export] - Additional parameters to select archive contents.

**Version 18**:

* New Endpoints.
    - [`GET /api/18/job/[ID]/info`][/api/V/job/\[ID\]/info] - Get metadata about a Job: Project name and scheduling info.
* Updated Endpoints:
    - [`/api/18/job/[ID]/run`][/api/V/job/\[ID\]/run]
        - new `runAtTime` parameter to run once at a certain time.
        - Job options can now be specified separately outside of the `argString`. Use `option.NAME=value` parameters,
       or specify `options` entry in JSON body.
* Updated responses for Executions
    - Executions results include custom status strings.
    - Documented `timedout`,`failed-with-retry`, and `scheduled` status values.
    - See [Listing Running Executions](#listing-running-executions)

**Version 17**:

* New Endpoints.
    - [`/api/17/scheduler/server/[UUID]/jobs`][/api/V/scheduler/server/\[UUID\]/jobs] - List scheduled jobs owned by the server with given UUID.
    - [`/api/17/scheduler/jobs`][/api/V/scheduler/jobs] - List scheduled jobs owned by the target server.
    - [`/api/17/system/logstorage`][/api/V/system/logstorage] - Get stats about the Log File storage system.
    - [`/api/17/system/logstorage/incomplete`][/api/V/system/logstorage/incomplete] - List all executions with incomplete logstorage.
    - [`/api/17/system/logstorage/incomplete/resume`][/api/V/system/logstorage/incomplete/resume] - Resume incomplete log storage processing.

* Updated Endpoints.
    - [`/api/17/project/[PROJECT]/jobs`][/api/V/project/\[PROJECT\]/jobs]
        - Response now includes whether a job is enabled, scheduled, schedule is enabled, and in Cluster mode includes the cluster mode server UUID of the schedule owner, and whether that is the current server or not.
        - add `?scheduledFilter=true/false` returns scheduled/unscheduled jobs only
        - and `?serverNodeUUIDFilter=[uuid]` returns scheduled jobs owned by the given cluster member
    - [`/api/17/scheduler/takeover`][/api/V/scheduler/takeover]
        - Response now includes previous scheduler owner UUID for jobs.
    - [`/api/17/scheduler/takeover`][/api/V/scheduler/takeover] - Can specify a single job ID to takeover.

**Version 16**:

* New Endpoints.
    - [`/api/16/jobs/execution/enable`][/api/V/jobs/execution/enable] - Enable execution for multiple jobs
    - [`/api/16/jobs/execution/disable`][/api/V/jobs/execution/disable] - Disable execution for multiple jobs
    - [`/api/16/jobs/schedule/enable`][/api/V/jobs/schedule/enable] - Enable schedule for multiple jobs
    - [`/api/16/jobs/schedule/disable`][/api/V/jobs/schedule/disable] - Disable schedule for multiple jobs


**Version 15**:

* New Endpoints.
    - [`/api/15/project/[PROJECT]/scm/[INTEGRATION]/plugins`][/api/V/project/\[PROJECT\]/scm/\[INTEGRATION\]/plugins] - List SCM plugins for a project.
    - [`/api/15/project/[PROJECT]/scm/[INTEGRATION]/plugin/[TYPE]/input`][/api/V/project/\[PROJECT\]/scm/\[INTEGRATION\]/plugin/\[TYPE\]/input] - Get SCM plugin setup input fields.
    - [`/api/15/project/[PROJECT]/scm/[INTEGRATION]/plugin/[TYPE]/setup`][/api/V/project/\[PROJECT\]/scm/\[INTEGRATION\]/plugin/\[TYPE\]/setup] - Setup SCM for a project.
    - [`/api/15/project/[PROJECT]/scm/[INTEGRATION]/plugin/[TYPE]/enable`][/api/V/project/\[PROJECT\]/scm/\[INTEGRATION\]/plugin/\[TYPE\]/enable] - Enable SCM for a project.
    - [`/api/15/project/[PROJECT]/scm/[INTEGRATION]/plugin/[TYPE]/disable`][/api/V/project/\[PROJECT\]/scm/\[INTEGRATION\]/plugin/\[TYPE\]/disable] - Disable SCM for a project.
    - [`/api/15/project/[PROJECT]/scm/[INTEGRATION]/status`][/api/V/project/\[PROJECT\]/scm/\[INTEGRATION\]/status] - Get SCM status for a project.
    - [`/api/15/project/[PROJECT]/scm/[INTEGRATION]/config`][/api/V/project/\[PROJECT\]/scm/\[INTEGRATION\]/config] - Get SCM config for a project.
    - [`/api/15/project/[PROJECT]/scm/[INTEGRATION]/action/[ACTION_ID]/input`][/api/V/project/\[PROJECT\]/scm/\[INTEGRATION\]/action/\[ACTION_ID\]/input] - Get Project SCM Action Input Fields.
    - [`/api/15/project/[PROJECT]/scm/[INTEGRATION]/action/[ACTION_ID]`][/api/V/project/\[PROJECT\]/scm/\[INTEGRATION\]/action/\[ACTION_ID\]] - Perform SCM action for a project.

    - [`/api/15/job/[ID]/scm/[INTEGRATION]/status`][/api/V/job/\[ID\]/scm/\[INTEGRATION\]/status] - Get SCM status for a Job.
    - [`/api/15/job/[ID]/scm/[INTEGRATION]/action/[ACTION_ID]`][/api/V/job/\[ID\]/scm/\[INTEGRATION\]/action/\[ACTION_ID\]] - Perform SCM action for a Job.
    - [`/api/15/job/[ID]/scm/[INTEGRATION]/action/[ACTION_ID]/input`][/api/V/job/\[ID\]/scm/\[INTEGRATION\]/action/\[ACTION_ID\]/input] - Get Job SCM Action Input Fields


**Version 14**:

**Note**: this document now has an [Index](#index) listing API paths.

* Deprecated Endpoints.  These endpoints are deprecated, and new versions are added which include the Project name in the URL path
    - `/api/14/executions/running` replacement: [`/api/14/project/[PROJECT*]/executions/running`][/api/V/project/\[PROJECT\]/executions/running]
    - `/api/14/executions` replacement: [`/api/14/project/[PROJECT]/executions`][/api/V/project/\[PROJECT\]/executions]
    - `/api/14/history` replacement: [`/api/14/project/[PROJECT]/history`][/api/V/project/\[PROJECT\]/history]
    - `/api/14/jobs/export` replacement: [`/api/14/project/[PROJECT]/jobs/export`][/api/V/project/\[PROJECT\]/jobs/export]
    - `/api/14/jobs/import` replacement: [`/api/14/project/[PROJECT]/jobs/import`][/api/V/project/\[PROJECT\]/jobs/import]
    - `/api/14/jobs` replacement: [`/api/14/project/[PROJECT]/jobs`][/api/V/project/\[PROJECT\]/jobs]
    - `/api/14/resource/[NAME]` replacement: [`/api/14/project/[PROJECT]/resource/[NAME]`][/api/V/project/\[PROJECT\]/resource/\[NAME\]]
    - `/api/14/resources(/*)` replacement: [`/api/14/project/[PROJECT]/resources`][/api/V/project/\[PROJECT\]/resources]
    - `/api/14/run/command` replacement: [`/api/14/project/[PROJECT]/run/command`][/api/V/project/\[PROJECT\]/run/command]
    - `/api/14/run/script` replacement: [`/api/14/project/[PROJECT]/run/script`][/api/V/project/\[PROJECT\]/run/script]
    - `/api/14/run/url` replacement: [`/api/14/project/[PROJECT]/run/url`][/api/V/project/\[PROJECT\]/run/url]
* Deprecated Endpoints with no replacement
    - `/api/2/project/[PROJECT]/resources/refresh`
* New Endpoints
    - [`/api/14/system/executions/enable`][/api/V/system/executions/enable] - Enable executions (ACTIVE mode)
    - [`/api/14/system/executions/disable`][/api/V/system/executions/disable] - Disable executions (PASSIVE mode)
    - [`/api/14/system/acl/*`][/api/V/system/acl/*] - Manage system ACLs
    - [`/api/14/project/[PROJECT]/acl/*`][/api/V/project/\[PROJECT\]/acl/*] - Manage project ACLs
    - [`/api/14/job/[ID]/execution/enable`][/api/V/job/\[ID\]/execution/enable] - Enable executions for a job
    - [`/api/14/job/[ID]/execution/disable`][/api/V/job/\[ID\]/execution/disable] - Disable executions for a job
    - [`/api/14/job/[ID]/schedule/enable`][/api/V/job/\[ID\]/schedule/enable] - Enable scheduling for a job
    - [`/api/14/job/[ID]/schedule/disable`][/api/V/job/\[ID\]/schedule/disable] - Disable scheduling for a job
* New Endpoints, replacing deprecated versions:
    - [`/api/14/project/[PROJECT*]/executions/running`][/api/V/project/\[PROJECT\]/executions/running]
    - [`/api/14/project/[PROJECT]/executions`][/api/V/project/\[PROJECT\]/executions]
    - [`/api/14/project/[PROJECT]/history`][/api/V/project/\[PROJECT\]/history]
    - [`/api/14/project/[PROJECT]/jobs/export`][/api/V/project/\[PROJECT\]/jobs/export]
    - [`/api/14/project/[PROJECT]/jobs/import`][/api/V/project/\[PROJECT\]/jobs/import]
    - [`/api/14/project/[PROJECT]/resource/[NAME]`][/api/V/project/\[PROJECT\]/resource/\[NAME\]]
    - `/api/14/project/[PROJECT]/resources(/*)`
    - [`/api/14/project/[PROJECT]/run/command`][/api/V/project/\[PROJECT\]/run/command]
    - [`/api/14/project/[PROJECT]/run/script`][/api/V/project/\[PROJECT\]/run/script]
    - [`/api/14/project/[PROJECT]/run/url`][/api/V/project/\[PROJECT\]/run/url]
* Added JSON support for endpoints, when using API v14:
    - [`/api/14/execution/[ID]/abort`][/api/V/execution/\[ID\]/abort]
    - [`/api/14/execution/[ID]`][/api/V/execution/\[ID\]]
    - [`/api/14/job/[ID]/executions`][/api/V/job/\[ID\]/executions]
    - [`/api/14/job/[ID]/run`][/api/V/job/\[ID\]/run] and [`POST /api/14/job/[ID]/executions`][POST /api/V/job/\[ID\]/executions]
    - [`/api/14/jobs/delete`][/api/V/jobs/delete]
    - [`/api/14/project/[PROJECT]/executions/running`][/api/V/project/\[PROJECT\]/executions/running]
    - [`/api/14/project/[PROJECT]/executions`][/api/V/project/\[PROJECT\]/executions]
    - [`/api/14/project/[PROJECT]/history`][/api/V/project/\[PROJECT\]/history]
    - [`/api/14/project/[PROJECT]/jobs/import`][/api/V/project/\[PROJECT\]/jobs/import]
    - [`/api/14/project/[PROJECT]/jobs`][/api/V/project/\[PROJECT\]/jobs]
    - [`/api/14/project/[PROJECT]/resource/[NAME]`][/api/V/project/\[PROJECT\]/resource/\[NAME\]]
    - [`/api/14/project/[PROJECT]/resources`][/api/V/project/\[PROJECT\]/resources]
    - [`/api/14/project/[PROJECT]/run/command`][/api/V/project/\[PROJECT\]/run/command]
    - [`/api/14/project/[PROJECT]/run/script`][/api/V/project/\[PROJECT\]/run/script]
    - [`/api/14/project/[PROJECT]/run/url`][/api/V/project/\[PROJECT\]/run/url]
    - [`/api/14/system/info`][/api/V/system/info]
* TODO json support:
    - [`/api/14/project/[PROJECT]/jobs/export`][/api/V/project/\[PROJECT\]/jobs/export]
* Updated endpoints:
    - [`/api/14/job/[ID]/run`][/api/V/job/\[ID\]/run] action `GET` is no longer allowed (v14+), `POST` is required. For POST, this endpoint is now equivalent to `/api/14/job/[ID]/executions`. JSON request content is now supported.
    - [`/api/14/project/[PROJECT]/jobs/import`][/api/V/project/\[PROJECT\]/jobs/import]
        * Both XML and YAML job definitions can now be posted directly using the appropriate MIME type
        * Add API `href` and GUI `permalink` values into XML response
        * JSON response support
    - [`/api/14/project/[PROJECT]/jobs`][/api/V/project/\[PROJECT\]/jobs] - added API/GUI href/permalink to XML responses.
    - [`/api/14/execution/[ID]/abort`][/api/V/execution/\[ID\]/abort] - added API/GUI href/permalink to XML responses.
    - [`/api/14/project/[PROJECT]/history`][/api/V/project/\[PROJECT\]/history] - added API/GUI href/permalink to XML responses.
    - `/api/14/project/[PROJECT]/run/*` - added API/GUI href/permalink to XML responses for adhoc command/script/url.
    - [`/api/14/system/info`][/api/V/system/info] - added information about Rundeck Execution Mode
    - [`/api/14/project/[PROJECT]/import`][/api/V/project/\[PROJECT\]/import] - Added parameters for importing Configuration and ACL Policies from the archive.
* Endpoints promoted out of "incubator" status:
    - [`/api/14/scheduler/takeover`][/api/V/scheduler/takeover] - Can specify `all` servers, or jobs within a specific `project`. Added API/GUI href/permalink to XML responses for adhoc command/script/url. Note: `href` was modified as mentioned below.
* Modified `href` meaning for XML responses:
    * Some endpoints that included a `href` value in XML responses used the link that was appropriate
    for an end user to use in a web browser,
    essentially the permalink to the GUI view for the linked object.
    When using API v14, these URLs now point to the API,
    and a new attribute `permalink` will be included to link to the GUI view for the object.
    * Using an API version 13 or earlier will retain the old behavior of `href` in XML responses.

Corrections:

* The response for [DELETE /api/V/job/[ID]][DELETE /api/V/job/\[ID\]] incorrectly stated it would return XML response, when the actual response is `204 No Content`.

**Version 13**:

* New endpoints
    - `/api/13/project/[PROJECT]/readme.md` and `/api/13/project/[PROJECT]/motd.md`
        - [Project Readme File](#project-readme-file) (`GET`, `PUT`, `DELETE`)

**Version 12**:

* New endpoints
    - `POST /api/12/executions/delete`
        - [Bulk delete executions](#bulk-delete-executions)
* Updated endpoints
    - `DELETE /api/12/execution/[ID]`
        - [Delete an execution](#delete-an-execution)
    - `DELETE /api/12/job/[ID]/executions`
        - [Delete all executions for a job](#delete-all-executions-for-a-job)
    - `POST /api/12/job/[ID]/executions`
        - [Run a Job](#running-a-job)


**Version 11**:

**Update**: The URL path for Token access was corrected.

In this version, all new and updated endpoints support XML or JSON request and response content where appropriate.

**Modified XML Response format**:

- For endpoints requiring API version 11 *only*, the default for XML responses is to *no longer* include a `<result>` element around the data.
- For API clients that expect to see the `<result>` element, a request header of `X-Rundeck-API-XML-Response-Wrapper: true` will restore it.
- For endpoint requests for API version 10 and earlier, the `<result>` element will be sent as it has been (described in [Response Format][])


**Version 11**:

* New endpoints
    - `/api/11/project/[PROJECT]/config`
        - PUT and GET for [Project Configuration](#project-configuration)
    - `/api/11/project/[PROJECT]/config/[KEY]`
        + PUT, GET, DELETE for [Project Configuration Keys](#project-configuration-keys)
    - `/api/11/project/[PROJECT]/export`
        + GET to retrieve archive of a project - [Project Archive Export](#project-archive-export)
    - `/api/11/project/[PROJECT]/import`
        + PUT to import an archive to a project - [Project Archive Import](#project-archive-import)
    - `/api/11/storage/keys/[PATH]`
        + GET, POST, PUT, DELETE: manage stored keys - [Key Storage](#key-storage)
    - `/api/11/tokens`
        + GET: List all auth tokens - [List Tokens](#list-tokens)
        + POST: Generate a token for a user - [Create a Token](#create-a-token)
    - `/api/11/tokens/[user]`
        + GET: List auth tokens defined for a user - [List Tokens](#list-tokens)
        + POST: Generate a token for a user - [Create a Token](#create-a-token)
    - `/api/11/token/[tokenID]`
        + GET: get a token - [Get a token](#get-a-tokens)
        + DELETE: delete a token - [Delete a Token](#delete-a-token)
* Updated endpoints
    - `/api/11/project/[PROJECT]`
        + DELETE method can delete a project - [Project Deletion](#project-deletion)
        + GET method response updated - [Getting Project Info](#getting-project-info)
    - `/api/11/projects`
        + POST method can be used to create a new project - [Project creation](#project-creation)

**Version 10**:

* New endpoints
    - `/api/10/execution/[ID]/state` - [Execution State](#execution-state)
        + Retrieve workflow step and node state information
    - `/api/10/execution/[ID]/output/state` - [Execution Output with State](#execution-output-with-state)
        + Retrieve log output with state change information
    - `/api/10/execution/[ID]/output/node/[NODENAME]` and `/api/10/execution/[ID]/output/step/[STEPCTX]` - [Execution Output](#execution-output)
        + Retrieve log output for a particular node or step
        + Can combine both node and step context
* Updated endpoints
    - `/api/10/execution/[ID]` - [Execution Info](#execution-info)
        + added `successfulNodes` and `failedNodes` detail.
        + added `job/options` data

**Version 9**:

* Updated endpoints
    * `/api/9/executions/running` - [Listing Running Executions](#listing-running-executions)
        * Allow `project=*` to list running executions across all projects
        * Result data now includes `project` attribute for each `<execution>`.
    * `/api/9/jobs/import` - [Importing Jobs](#importing-jobs)
        * Add `uuidOption` parameter to allow removing imported UUIDs to avoid creation conflicts.

**Version 8**:

* Updated endpoints
    * `/api/8/run/script` and `/api/8/run/url` -  [Running Adhoc Scripts](#running-adhoc-scripts) and [Running Adhoc Script URLs](#running-adhoc-script-urls)
        * Added two optional parameters for `scriptInterpreter` and `interpreterArgsQuoted`
    * `/api/8/jobs/import` -  [Importing Jobs](#importing-jobs)
        * Added an optional parameter `project` which will override any project defined in the Job definition contexts.  If used, the job definitions do not need a `project` value in them.
* Removed endpoints
    * `/api/1/report/create`
      * Removed due to History no longer supporting arbitrary event reports.

**Version 7**:

* Add **Incubator** endpoint
    * PUT `/api/7/incubator/jobs/takeoverSchedule` - [Takeover Schedule in Cluster Mode](#takeover-schedule-in-cluster-mode)
        * incubating feature for cluster mode schedule takeover

**Version 6**:

* Updated endpoints
    * `/api/6/execution/[ID]/output` - [Execution Output](#execution-output)
        * XML format has changed for API v6: entry log content is now specified as a `log` attribute value
        * The old XML format will still be used for queries using `/api/5`
        * Fixed invalid XML when no format was specified and XML was used by default
        * **documentation typo fixed**: the JSON format incorrectly specified the log text key as 'mesg', corrected to 'log'

**Version 5**:

Added in Rundeck 1.4.6, 1.5.1:

* New feature for some endpoints:
    * new `asUser` parameter can record an action (run or abort) as having been performed by another user
    * Affected endpoints
        * [Running a Job](#running-a-job)
        * [Running Adhoc Commands](#running-adhoc-commands)
        * [Running Adhoc Scripts](#running-adhoc-scripts)
        * [Running Adhoc Script URLs](#running-adhoc-script-urls)
        * [Aborting Executions](#aborting-executions)

* New endpoint
    * `/api/5/jobs/delete` - [Bulk Job Delete](#bulk-job-delete)
* New endpoint
    * `/api/5/execution/[ID]/output` - [Execution Output](#execution-output)
* New endpoint
    * `/api/5/executions` - [Execution Query](#execution-query)
* Updated endpoints
    * `/api/1/history` - [Listing History](#listing-history)
        * new filter parameters added for including or excluding reports for exact job group/name values: `jobListFilter` and `excludeJobListFilter`

**Version 4**:

* New endpoint
    * `/api/4/run/url` - [Running Adhoc Script URLs](#running-adhoc-script-urls)

**Version 3**:

* Updated endpoints
    * `/api/1/resources` - [Listing Resources](#listing-resources)
        * `format` parameter can now use any supported Resource Format Parser format name.
    * `/api/2/project/[PROJECT]/resources` - [Updating and Listing Resources for a Project](#updating-and-listing-resources-for-a-project)
        * `POST` request Content-Type can be any MIME type supported by a Resource Format Parser plugin.

**Version 2**:

* New endpoints
    * `/api/2/project/[PROJECT]/jobs` - [Listing Jobs for a Project](#listing-jobs-for-a-project)
    * `/api/2/project/[PROJECT]/resources` - [Updating and Listing Resources for a Project](#updating-and-listing-resources-for-a-project)
    * `/api/2/project/[PROJECT]/resources/refresh` - [Refreshing Resources for a Project](#refreshing-resources-for-a-project)
* Updated endpoints
    * `/api/1/jobs` - [Listing Jobs](#listing-jobs)
        * Additional parameters added


[/api/V/project/\[PROJECT\]/scm/\[INTEGRATION\]/plugins]:#list-scm-plugins
[/api/V/project/\[PROJECT\]/scm/\[INTEGRATION\]/plugin/\[TYPE\]/input]:#get-scm-plugin-input-fields
[/api/V/project/\[PROJECT\]/scm/\[INTEGRATION\]/plugin/\[TYPE\]/setup]:#setup-scm-plugin-for-a-project
[/api/V/project/\[PROJECT\]/scm/\[INTEGRATION\]/plugin/\[TYPE\]/enable]:#enable-scm-plugin-for-a-project
[/api/V/project/\[PROJECT\]/scm/\[INTEGRATION\]/plugin/\[TYPE\]/disable]:#disable-scm-plugin-for-a-project
[/api/V/project/\[PROJECT\]/scm/\[INTEGRATION\]/status]:#get-project-scm-status
[/api/V/project/\[PROJECT\]/scm/\[INTEGRATION\]/config]:#get-project-scm-config
[/api/V/project/\[PROJECT\]/scm/\[INTEGRATION\]/action/\[ACTION_ID\]]:#perform-project-scm-action
[/api/V/project/\[PROJECT\]/scm/\[INTEGRATION\]/action/\[ACTION_ID\]/input]:#get-project-scm-action-input-fields

[/api/V/project/\[PROJECT\]/sources]:#list-resource-model-sources-for-a-project
[/api/V/project/\[PROJECT\]/source/\[INDEX\]]:#get-a-resource-model-source-for-a-project
[/api/V/project/\[PROJECT\]/source/\[INDEX\]/resources]:#list-resources-of-a-resource-model-source
[GET /api/V/project/\[PROJECT\]/source/\[INDEX\]/resources]:#list-resources-of-a-resource-model-source
[POST /api/V/project/\[PROJECT\]/source/\[INDEX\]/resources]:#update-resources-of-a-resource-model-source

[/api/V/job/\[ID\]/scm/\[INTEGRATION\]/status]:#get-job-scm-status
[/api/V/job/\[ID\]/scm/\[INTEGRATION\]/action/\[ACTION_ID\]]:#perform-job-scm-action
[/api/V/job/\[ID\]/scm/\[INTEGRATION\]/action/\[ACTION_ID\]/input]:#get-job-scm-action-input-fields


[/api/V/execution/\[ID\]]: #execution-info

[/api/V/execution/\[ID\]/abort]:#aborting-executions

[/api/V/execution/\[ID\]/input/files]:#list-input-files-for-an-execution

[/api/V/execution/\[ID\]/output/state]:#execution-output-with-state

[/api/V/execution/\[ID\]/output/step/\[STEPCTX\]]:#execution-output

[/api/V/execution/\[ID\]/output/node/\[NODE\]/step/\[STEPCTX\]]:#execution-output

[/api/V/execution/\[ID\]/output/node/\[NODE\]]:#execution-output

[/api/V/execution/\[ID\]/output]:#execution-output

[/api/V/execution/\[ID\]/state]:#execution-state

[/api/V/executions/delete]:#bulk-delete-executions



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


[/api/V/metrics]:#list-metrics

[/api/V/metrics/healthcheck]:#metrics-healthcheck

[/api/V/metrics/metrics]:#metrics-data

[/api/V/metrics/ping]:#metrics-ping

[/api/V/metrics/threads]:#metrics-threads

[/api/V/project/\[PROJECT\]]:#getting-project-info
[DELETE /api/V/project/\[PROJECT\]]:#project-deletion

[/api/V/project/\[PROJECT\]/acl/*]:#project-acls

[/api/V/project/\[PROJECT\]/config]:#get-project-configuration
[PUT /api/V/project/\[PROJECT\]/config]:#put-project-configuration


[/api/V/project/\[PROJECT\]/config/\[KEY\]]:#get-project-configuration-key
[PUT /api/V/project/\[PROJECT\]/config/\[KEY\]]:#put-project-configuration-key
[DELETE /api/V/project/\[PROJECT\]/config/\[KEY\]]:#delete-project-configuration-key


[/api/V/project/\[PROJECT\]/executions]:#execution-query


[/api/V/project/\[PROJECT\]/executions/running]:#listing-running-executions


[/api/V/project/\[PROJECT\]/export]:#project-archive-export
[/api/V/project/\[PROJECT\]/export/async]:#project-archive-export-async
[/api/V/project/\[PROJECT\]/export/status/\[TOKEN\]]:#project-archive-export-async-status
[/api/V/project/\[PROJECT\]/export/download/\[TOKEN\]]:#project-archive-export-async-download


[/api/V/project/\[PROJECT\]/\[FILE.md\]]:#get-readme-file
[PUT /api/V/project/\[PROJECT\]/\[FILE.md\]]:#put-readme-file
[DELETE /api/V/project/\[PROJECT\]/\[FILE.md\]]:#delete-readme-file

[/api/V/project/\[PROJECT\]/history]:#listing-history

[/api/V/project/\[PROJECT\]/import]:#project-archive-import

[/api/V/project/\[PROJECT\]/jobs]:#listing-jobs

[/api/V/project/\[PROJECT\]/jobs/export]:/api/jobs.html#exporting-jobs

[/api/V/project/\[PROJECT\]/jobs/import]:#importing-jobs

[/api/V/project/\[PROJECT\]/resources]:#listing-resources

[/api/V/project/\[PROJECT\]/resource/\[NAME\]]:#getting-resource-info

[/api/V/projects]:#listing-projects

[POST /api/V/projects]:#project-creation

[/api/V/project/\[PROJECT\]/run/command]:#running-adhoc-commands

[/api/V/project/\[PROJECT\]/run/script]:#running-adhoc-scripts

[/api/V/project/\[PROJECT\]/run/url]:#running-adhoc-script-urls

[/api/V/scheduler/takeover]:#takeover-schedule-in-cluster-mode

[/api/V/scheduler/jobs]:#list-scheduled-jobs-for-this-cluster-server

[/api/V/scheduler/server/\[UUID\]/jobs]:#list-scheduled-jobs-for-a-cluster-server

[/api/V/storage/keys/\[PATH\]/\[FILE\]]:#list-keys
[PUT /api/V/storage/keys/\[PATH\]/\[FILE\]]:#upload-keys
[DELETE /api/V/storage/keys/\[PATH\]/\[FILE\]]:#delete-keys


[/api/V/system/acl/*]:#acls
[/api/V/system/info]:#system-info
[/api/V/system/executions/enable]:#set-active-mode
[/api/V/system/executions/disable]:#set-passive-mode
[/api/V/system/executions/status]:#get-current-execution-mode

[/api/V/system/logstorage]:#log-storage-info
[/api/V/system/logstorage/incomplete]:#list-executions-with-incomplete-log-storage
[/api/V/system/logstorage/incomplete/resume]:#resume-incomplete-log-storage
[POST /api/V/system/logstorage/incomplete/resume]:#resume-incomplete-log-storage

[/api/V/tokens]:#list-tokens
[/api/V/tokens/\[USER\]]:#list-tokens
[POST /api/V/tokens/\[USER\]]:#create-a-token
[/api/V/token/\[ID\]]:#get-a-token
[DELETE /api/V/token/\[ID\]]:#delete-a-token


[/api/V/user/list]:#list-users
[/api/V/user/info]:#get-user-profile
[POST /api/V/user/info]:#modify-user-profile
[/api/V/user/info/\[USER\]]:#get-another-user-profile
[POST /api/V/user/info/\[USER\]]:#modify-another-user-profile
[/api/V/user/roles]:#list-roles

[/api/V/project/\[PROJECT\]/webhooks]:#list-project-webhooks
[/api/V/plugin/list]:#list-installed-plugins

[ACLPOLICY]:../man5/aclpolicy.html