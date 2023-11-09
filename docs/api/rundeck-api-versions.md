---
title: API Version History
---

# API Version History | Current Version {{$apiVersion}}

This page documents changes to the Rundeck API through-out the versions.  For usage references please see the [API Reference](/api/index.md) page.

## API Version Number

| Current  | Minimum | Deprecation |
|---------|-------------|----------|
|`{{$apiVersion}}` | `{{ $apiMinVersion }}` | `{{$apiDepVersion}}`

Current
:   The current version number.

Minimum
:   Minimum supported version.

Deprecation
:   Future minimum version.

## Incubating Endpoints

These endpoints are in "Incubating" status, and are subject to change in future releases.

* (none)

## API Changes

Changes introduced by API Version number:

::: dagner Deprecation Notice
API versions below `{{$apiDepVersion}}` are *deprecated*.  Clients using earlier versions should upgrade to use `{{$apiDepVersion}}` as the minimum version before release `{{ $apiDepRelease }}` to avoid errors.
:::

### Version 45

* [Delete Project API](/api/#project-deletion) runs in deferred mode if v45+ is used. Specify `?deferred=false` to run in synchronous mode.
    * [`DELETE /api/45/project/[PROJECT]`][DELETE /api/V/project/\[PROJECT\]] - Project Deletion

### Version 44

* JSON format added to Job Export and Import APIs. Specify `Accept: application/json` or `?format=json` when exporting, and `Content-Type: application/json` or `?format=json` when importing.
    * [`POST /api/14/project/[PROJECT]/jobs/import`][/api/V/project/\[PROJECT\]/jobs/import] - Job Import
    * [`GET /api/44/job/[ID]`][/api/V/job/\[ID\]] - Single Job Export
    * [`GET /api/44/project/[PROJECT]/jobs/export`][/api/V/project/\[PROJECT\]/jobs/export] - Project Jobs Export

### Version 43

* Execution log and state ouput returns extended metadata if API v43+ is used.
    * [`GET /api/43/execution/[ID]/output/state`][/api/V/execution/\[ID\]/output/state] - Execution output with state
    * [`GET /api/43/execution/[ID]/output`][/api/V/execution/\[ID\]/output] - Get Execution log output
  
### Version 42

* Endpoints promoted out of incubating status. These endpoints no longer contain `incubating/` in the endpoint URL, and now require API version 42 minimum.
    * [`GET /api/42/feature/[FEATURE]`][/api/V/feature/\[FEATURE\]] - Query system feature status for a feature. 
    * [`GET /api/42/feature/`][/api/V/feature/] - Get all system feature statuses. 
* New Endpoints:
    * [`GET /api/V/runnerManagement/checkPing/\[TOKEN\]`][GET /api/V/runnerManagement/checkPing/\[TOKEN\]] - Check a ping response
    * [`POST /api/V/runnerManagement/runner/\[ID\]/regenerateCreds`][POST /api/V/runnerManagement/runner/\[ID\]/regenerateCreds] - Regenerate credentials for the Runner
    * [`GET /api/V/runnerManagement/runner/\[ID\]/tags`][GET /api/V/runnerManagement/runner/\[ID\]/tags] - List tags for the Runner
    * [`POST /api/V/runnerManagement/runners`][POST /api/V/runnerManagement/runners] - Create a new Runner
    * [`GET /api/V/runnerManagement/tags`][GET /api/V/runnerManagement/tags] - List all known tags
    * [`GET /api/V/runnerManagement/ui`][GET /api/V/runnerManagement/ui] - Get UI info for runner management
    * [`GET /api/V/runnerTag/searchTags`][GET /api/V/runnerTag/searchTags] - List tags for the Runner
  

### Version 41

* Endpoints promoted out of incubating status. These endpoints no longer contain `incubating/` in the endpoint URL, and now require API version 41 minimum.
    * [`GET /api/V/enterprise/license`][GET /api/V/enterprise/license] - Get Enterprise license
    * [`POST /api/V/enterprise/license`][POST /api/V/enterprise/license] - Store Enterprise license
    * [`GET /api/V/project/[PROJECT]/calendars`][GET /api/V/project/\[PROJECT\]/calendars] - Get Project Calendars (Enterprise only)
    * [`POST /api/V/project/[PROJECT]/calendars`][POST /api/V/project/\[PROJECT\]/calendars] - Create/Update Project Calendars (Enterprise only)
    * [`DELETE /api/V/project/[PROJECT]/calendars/[ID]`][DELETE /api/V/project/\[PROJECT\]/calendars/\[ID\]] - Delete a Project Calendar (Enterprise only)
    * [`GET /api/V/system/calendars`][GET /api/V/system/calendars] - Get System Calendars (Enterprise only)
    * [`POST /api/V/system/calendars`][POST /api/V/system/calendars] - Create/Update System Calendars (Enterprise only)
    * [`DELETE /api/V/system/calendars/[ID]`][DELETE /api/V/system/calendars/\[ID\]] - Delete a System Calendar (Enterprise only)
* New Endpoints:
    * [`POST /api/V/enterprise/cluster/executions/enable`][POST /api/V/enterprise/cluster/executions/enable] - Set Active execution Mode for a cluster member
    * [`POST /api/V/enterprise/cluster/executions/disable`][POST /api/V/enterprise/cluster/executions/disable] - Set Passive execution Mode for a cluster member
    * [`GET /api/V/runnerManagement/download/\[TOKEN\]`][GET /api/V/runnerManagement/download/\[TOKEN\]] - Download runner Jar
    * [`POST /api/V/runnerManagement/runner/\[ID\]/ping`][POST /api/V/runnerManagement/runner/\[ID\]/ping] - Ping the runner
    * [`GET /api/V/runnerManagement/runner/\[RUNNERID\]`][GET /api/V/runnerManagement/runner/\[RUNNERID\]] - Get runner information
    * [`POST /api/V/runnerManagement/runner/\[RUNNERID\]`][POST /api/V/runnerManagement/runner/\[RUNNERID\]] - Update the runner
    * [`DELETE /api/V/runnerManagement/runner/\[RUNNERID\]`][DELETE /api/V/runnerManagement/runner/\[RUNNERID\]] - Delete the specified runner
    * [`GET /api/V/runnerManagement/runners`][GET /api/V/runnerManagement/runners] - List available runners

    
### Version 40

* Updated Endpoints:
    * [`GET /api/V/plugin/list`][GET /api/V/plugin/list] - Plugin detail includes `iconUrl` and `providerMetadata`

### Version 39

* Removed support for previously deprecated API v10 and below. The minimum API version is now v11.
* XML Responses no longer support the request header of `X-Rundeck-API-XML-Response-Wrapper: true`. A `<result>` element will now only be returned in some endpoints where explicitly documented.
* When returning an error response, JSON will be sent by default if no `Accept:` header is specified, instead of XML.
* Removed Endpoints:
    - `/api/1/executions/running` replacement: [`/api/14/project/[PROJECT*]/executions/running`][/api/V/project/\[PROJECT\]/executions/running]
    - `/api/1/executions` replacement: [`/api/14/project/[PROJECT]/executions`][/api/V/project/\[PROJECT\]/executions]
    - `/api/1/history` replacement: [`/api/14/project/[PROJECT]/history`][/api/V/project/\[PROJECT\]/history]
    - `/api/1/jobs/export` replacement: [`/api/14/project/[PROJECT]/jobs/export`][/api/V/project/\[PROJECT\]/jobs/export]
    - `/api/1/jobs/import` replacement: [`/api/14/project/[PROJECT]/jobs/import`][/api/V/project/\[PROJECT\]/jobs/import]
    - `/api/1/jobs` replacement: [`/api/14/project/[PROJECT]/jobs`][/api/V/project/\[PROJECT\]/jobs]
    - `/api/1/resource/[NAME]` replacement: [`/api/14/project/[PROJECT]/resource/[NAME]`][/api/V/project/\[PROJECT\]/resource/\[NAME\]]
    - `/api/1/resources(/*)` replacement: [`/api/14/project/[PROJECT]/resources`][/api/V/project/\[PROJECT\]/resources]
    - `/api/1/run/command` replacement: [`/api/14/project/[PROJECT]/run/command`][/api/V/project/\[PROJECT\]/run/command]
    - `/api/1/run/script` replacement: [`/api/14/project/[PROJECT]/run/script`][/api/V/project/\[PROJECT\]/run/script]
    - `/api/1/run/url` replacement: [`/api/14/project/[PROJECT]/run/url`][/api/V/project/\[PROJECT\]/run/url]

    **Replacement endpoints above require v14**

### Version 38
* Updated Endpoint:
    - [`PUT /api/V/project/[PROJECT]/import`][/api/V/project/\[PROJECT\]/import]  - Added `importNodesSources` parameter to define if Node Resources Source will be imported

### Version 36
* Updated Response:
    - [`GET /api/V/system/executions/status`][/api/V/system/executions/status] - If Rundeck is in passive mode, the call will now return a 503 error code.

### Version 35
* Updated Response:
    - [`PUT /api/V/project/[PROJECT]/import`][/api/V/project/\[PROJECT\]/import] - More validation and error message results added.

### Version 34
* New Endpoints:
    - [`GET /api/V/job/[ID]/workflow`][/api/V/job/\[ID\]/workflow] - Get the job workflow tree

### Version 33

* New Endpoints:
    - [`POST /api/V/webhook/[AUTH_TOKEN]`][/api/V/webhook/\[AUTH_TOKEN\]] - Trigger a webhook with the payload as the body of the post
    - [`GET /api/V/project/[PROJECT]/webhooks`][/api/V/project/\[PROJECT\]/webhooks] - Lists the webhooks configured for the project
    - [`GET /api/V/project/[PROJECT]/webhook/[ID]`][/api/V/project/\[PROJECT\]/webhooks] - Get the webhook identified by ID
    - [`POST /api/V/project/[PROJECT]/webhook/[ID]`][/api/V/project/\[PROJECT\]/webhooks] - Create or update the webhook identified by ID. When creating a new webhook ID is not provided.
    - [`DELETE /api/V/project/[PROJECT]/webhook/[ID]`][/api/V/project/\[PROJECT\]/webhooks] - Delete the webhook identified by ID
    - [`GET /api/V/plugin/list`][/api/V/plugin/list] - List the installed plugins.

* Updated Endpoints:
    - [`GET /api/V/projects`][/api/V/projects] - project creation date to response.

### Version 32

* New Endpoint:
    - [`GET /api/V/system/executions/status`][/api/V/system/executions/status] - Gets the current execution mode.

* Updated Endpoints:
    - [`GET /api/V/project/[PROJECT]/executions/running`][/api/V/project/\[PROJECT\]/executions/running] - Added `jobIdFilter` parameter to return running executions for a specific job.
    - [`GET /api/V/job/[ID]/forecast`][/api/V/job/\[ID\]/forecast] - Added `past` parameter to return inverse forecast.
    - [`PUT /api/V/scheduler/takeover`][/api/V/scheduler/takeover] - Added capability to specify multiple job ids.

### Version 31

* New Endpoint:
    - [`GET /api/V/job/[ID]/forecast`][/api/V/job/\[ID\]/forecast] - Get a forecast for a specific amount of days of the job by ID.

### Version 30

* Updated Endpoints:
    - [`GET /api/V/user/roles`][/api/V/user/roles] - List the roles of the authenticated user

### Version 29

* New Endpoints:
    - [`GET /api/V/executions/metrics`][/api/V/executions/metrics] - Get metrics over a system-wide execution query.
    - [`GET /api/V/project/[PROJECT]/executions/metrics`][/api/V/project/\[PROJECT\]/executions/metrics] - Get metrics over a project-wide execution query.

### Version 28

* Updated Endpoints:
    - [`GET /api/V/project/[PROJECT]/export`][/api/V/project/\[PROJECT\]/export] - exportScm parameter.
    - [`PUT /api/V/project/[PROJECT]/import`][/api/V/project/\[PROJECT\]/import] - importScm parameter.

### Version 27

* Updated Endpoints:
    - [`GET /api/V/user/list`][/api/V/user/list] - More info from the user.

### Version 26

* Updated Endpoints:
    - [`GET /api/V/projects`][/api/V/projects] - label to projects response.

### Version 25

* New Endpoints.
    - [`GET /api/V/metrics`][/api/V/metrics] - List enabled Metrics endpoints
    - [`GET /api/V/metrics/metrics`][/api/V/metrics/metrics] - Get Metrics Data
    - [`GET /api/V/metrics/threads`][/api/V/metrics/threads] - Get Metrics Threads
    - [`GET /api/V/metrics/healthcheck`][/api/V/metrics/healthcheck] - Get Metrics Healthcheck
    - [`GET /api/V/metrics/ping`][/api/V/metrics/ping] - Get Metrics Ping

* Updated Endpoints:
    - [`GET /api/V/system/info`][/api/V/system/info] - `metrics` links now point to correct API endpoints.

### Version 24

* New Endpoints.
    - [`POST /api/V/job/[ID]/retry/[EXECID]`][POST /api/V/job/\[ID\]/retry/\[EXECID\]] - Retry a Job based on execution

### Version 23

* New Endpoints. (replacing removed `POST /api/2/project/[PROJECT]/resources` endpoint)
    - [`GET /api/V/project/[PROJECT]/sources`][/api/V/project/\[PROJECT\]/sources] - List project resource model sources
    - [`GET /api/V/project/[PROJECT]/source/[INDEX]`][/api/V/project/\[PROJECT\]/source/\[INDEX\]] - Get a specific project resource model source by index
    - [`GET /api/V/project/[PROJECT]/source/[INDEX]/resources`][GET /api/V/project/\[PROJECT\]/source/\[INDEX\]/resources] - Get Nodes content from a specific resource model source by index
    - [`POST /api/V/project/[PROJECT]/source/[INDEX]/resources`][POST /api/V/project/\[PROJECT\]/source/\[INDEX\]/resources] - Update Nodes content for a specific Writeable resource model source by index
* Updated Endpoints.
    - [`GET /api/V/project/[PROJECT]/resources`][/api/V/project/\[PROJECT\]/resources] - Default response format is `application/json` for API v23 and later
    - [`GET /api/V/project/[PROJECT]/resource/[NAME]`][/api/V/project/\[PROJECT\]/resource/\[NAME\]] - Default response format is `application/json` for API v23 and later

### Version 22

* Updated Endpoints.
    - [`GET /api/V/project/[PROJECT]/scm/[INTEGRATION]/action/[ACTION_ID]/input`][/api/V/project/\[PROJECT\]/scm/\[INTEGRATION\]/action/\[ACTION_ID\]/input] - Include Job `status`, and `deleted` whether the job file was deleted for Import integration
    - [`POST /api/V/project/[PROJECT]/scm/[INTEGRATION]/action/[ACTION_ID]`][/api/V/project/\[PROJECT\]/scm/\[INTEGRATION\]/action/\[ACTION_ID\]] - Can include `deletedJobs` to delete jobs for Import integration.

### Version 21

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

### Version 20

* Updated Endpoints.
    - [`GET /api/20/project/[PROJECT]/executions`][/api/V/project/\[PROJECT\]/executions] - Executions query, add `executionTypeFilter`

### Version 19

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

### Version 18

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
    - See [Listing Running Executions](/api/index.md#listing-running-executions)

### Version 17

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

### Version 16

* New Endpoints.
    - [`/api/16/jobs/execution/enable`][/api/V/jobs/execution/enable] - Enable execution for multiple jobs
    - [`/api/16/jobs/execution/disable`][/api/V/jobs/execution/disable] - Disable execution for multiple jobs
    - [`/api/16/jobs/schedule/enable`][/api/V/jobs/schedule/enable] - Enable schedule for multiple jobs
    - [`/api/16/jobs/schedule/disable`][/api/V/jobs/schedule/disable] - Disable schedule for multiple jobs


### Version 15

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


### Version 14

**Note**: this document now has an [Index](/api/index.md#index) listing API paths.

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

### Version 13

* New endpoints
    - `/api/13/project/[PROJECT]/readme.md` and `/api/13/project/[PROJECT]/motd.md`
        - [Project Readme File](/api/index.md#project-readme-file) (`GET`, `PUT`, `DELETE`)

### Version 12

* New endpoints
    - `POST /api/12/executions/delete`
        - [Bulk delete executions](/api/index.md#bulk-delete-executions)
* Updated endpoints
    - `DELETE /api/12/execution/[ID]`
        - [Delete an execution](/api/index.md#delete-an-execution)
    - `DELETE /api/12/job/[ID]/executions`
        - [Delete all executions for a job](/api/index.md#delete-all-executions-for-a-job)
    - `POST /api/12/job/[ID]/executions`
        - [Run a Job](/api/index.md#running-a-job)


### Version 11

**Update**: The URL path for Token access was corrected.

In this version, all new and updated endpoints support XML or JSON request and response content where appropriate.

**Modified XML Response format**:

- For endpoints requiring API version 11 *only*, the default for XML responses is to *no longer* include a `<result>` element around the data.
- For API clients that expect to see the `<result>` element, a request header of `X-Rundeck-API-XML-Response-Wrapper: true` will restore it.
- For endpoint requests for API version 10 and earlier, the `<result>` element will be sent as it has been (described in [Response Format][])

* New endpoints
    - `/api/11/project/[PROJECT]/config`
        - PUT and GET for [Project Configuration](/api/index.md#project-configuration)
    - `/api/11/project/[PROJECT]/config/[KEY]`
        + PUT, GET, DELETE for [Project Configuration Keys](/api/index.md#project-configuration-keys)
    - `/api/11/project/[PROJECT]/export`
        + GET to retrieve archive of a project - [Project Archive Export](/api/index.md#project-archive-export)
    - `/api/11/project/[PROJECT]/import`
        + PUT to import an archive to a project - [Project Archive Import](/api/index.md#project-archive-import)
    - `/api/11/storage/keys/[PATH]`
        + GET, POST, PUT, DELETE: manage stored keys - [Key Storage](/api/index.md#key-storage)
    - `/api/11/tokens`
        + GET: List all auth tokens - [List Tokens](/api/index.md#list-tokens)
        + POST: Generate a token for a user - [Create a Token](/api/index.md#create-a-token)
    - `/api/11/tokens/[user]`
        + GET: List auth tokens defined for a user - [List Tokens](/api/index.md#list-tokens)
        + POST: Generate a token for a user - [Create a Token](/api/index.md#create-a-token)
    - `/api/11/token/[tokenID]`
        + GET: get a token - [Get a token](/api/index.md#get-a-tokens)
        + DELETE: delete a token - [Delete a Token](/api/index.md#delete-a-token)
* Updated endpoints
    - `/api/11/project/[PROJECT]`
        + DELETE method can delete a project - [Project Deletion](/api/index.md#project-deletion)
        + GET method response updated - [Getting Project Info](/api/index.md#getting-project-info)
    - `/api/11/projects`
        + POST method can be used to create a new project - [Project creation](/api/index.md#project-creation)

### Version 10

* New endpoints
    - `/api/10/execution/[ID]/state` - [Execution State](/api/index.md#execution-state)
        + Retrieve workflow step and node state information
    - `/api/10/execution/[ID]/output/state` - [Execution Output with State](/api/index.md#execution-output-with-state)
        + Retrieve log output with state change information
    - `/api/10/execution/[ID]/output/node/[NODENAME]` and `/api/10/execution/[ID]/output/step/[STEPCTX]` - [Execution Output](/api/index.md#execution-output)
        + Retrieve log output for a particular node or step
        + Can combine both node and step context
* Updated endpoints
    - `/api/10/execution/[ID]` - [Execution Info](/api/index.md#execution-info)
        + added `successfulNodes` and `failedNodes` detail.
        + added `job/options` data

### Version 9

* Updated endpoints
    * `/api/9/executions/running` - [Listing Running Executions](/api/index.md#listing-running-executions)
        * Allow `project=*` to list running executions across all projects
        * Result data now includes `project` attribute for each `<execution>`.
    * `/api/9/jobs/import` - [Importing Jobs](/api/index.md#importing-jobs)
        * Add `uuidOption` parameter to allow removing imported UUIDs to avoid creation conflicts.

### Version 8

* Updated endpoints
    * `/api/8/run/script` and `/api/8/run/url` -  [Running Adhoc Scripts](/api/index.md#running-adhoc-scripts) and [Running Adhoc Script URLs](/api/index.md#running-adhoc-script-urls)
        * Added two optional parameters for `scriptInterpreter` and `interpreterArgsQuoted`
    * `/api/8/jobs/import` -  [Importing Jobs](/api/index.md#importing-jobs)
        * Added an optional parameter `project` which will override any project defined in the Job definition contexts.  If used, the job definitions do not need a `project` value in them.
* Removed endpoints
    * `/api/1/report/create`
      * Removed due to History no longer supporting arbitrary event reports.

### Version 7

* Add **Incubator** endpoint
    * PUT `/api/7/incubator/jobs/takeoverSchedule` - [Takeover Schedule in Cluster Mode](/api/index.md#takeover-schedule-in-cluster-mode)
        * incubating feature for cluster mode schedule takeover

### Version 6

* Updated endpoints
    * `/api/6/execution/[ID]/output` - [Execution Output](/api/index.md#execution-output)
        * XML format has changed for API v6: entry log content is now specified as a `log` attribute value
        * The old XML format will still be used for queries using `/api/5`
        * Fixed invalid XML when no format was specified and XML was used by default
        * **documentation typo fixed**: the JSON format incorrectly specified the log text key as 'mesg', corrected to 'log'

### Version 5

Added in Rundeck 1.4.6, 1.5.1:

* New feature for some endpoints:
    * new `asUser` parameter can record an action (run or abort) as having been performed by another user
    * Affected endpoints
        * [Running a Job](/api/index.md#running-a-job)
        * [Running Adhoc Commands](/api/index.md#running-adhoc-commands)
        * [Running Adhoc Scripts](/api/index.md#running-adhoc-scripts)
        * [Running Adhoc Script URLs](/api/index.md#running-adhoc-script-urls)
        * [Aborting Executions](/api/index.md#aborting-executions)

* New endpoint
    * `/api/5/jobs/delete` - [Bulk Job Delete](/api/index.md#bulk-job-delete)
* New endpoint
    * `/api/5/execution/[ID]/output` - [Execution Output](/api/index.md#execution-output)
* New endpoint
    * `/api/5/executions` - [Execution Query](/api/index.md#execution-query)
* Updated endpoints
    * `/api/1/history` - [Listing History](/api/index.md#listing-history)
        * new filter parameters added for including or excluding reports for exact job group/name values: `jobListFilter` and `excludeJobListFilter`

### Version 4

* New endpoint
    * `/api/4/run/url` - [Running Adhoc Script URLs](/api/index.md#running-adhoc-script-urls)

### Version 3

* Updated endpoints
    * `/api/1/resources` - [Listing Resources](/api/index.md#listing-resources)
        * `format` parameter can now use any supported Resource Format Parser format name.
    * `/api/2/project/[PROJECT]/resources` - [Updating and Listing Resources for a Project](/api/index.md#updating-and-listing-resources-for-a-project)
        * `POST` request Content-Type can be any MIME type supported by a Resource Format Parser plugin.

### Version 2

* New endpoints
    * `/api/2/project/[PROJECT]/jobs` - [Listing Jobs for a Project](/api/index.md#listing-jobs-for-a-project)
    * `/api/2/project/[PROJECT]/resources` - [Updating and Listing Resources for a Project](/api/index.md#updating-and-listing-resources-for-a-project)
    * `/api/2/project/[PROJECT]/resources/refresh` - [Refreshing Resources for a Project](/api/index.md#refreshing-resources-for-a-project)
* Updated endpoints
    * `/api/1/jobs` - [Listing Jobs](/api/index.md#listing-jobs)
        * Additional parameters added


!!!include(api/api-index-links.md)!!!