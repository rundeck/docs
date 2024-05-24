---
title: API Reference
alias: api/index.html
headerDepth: 1
---

# API Reference | Version {{ $apiVersion }}

Rundeck provides a Web API for use with your applications.  

## API Version Number

| Current | Minimum | Deprecation |
|---------|-------------|---------|
|{{ $apiVersion }} | {{ $apiMinVersion }} | {{$apiDepVersion}}

Current
:   The current version number.

Minimum
:   Minimum supported version.

Deprecation
:   Future minimum version.

For tips on getting started with the API, check out these [API Basics](/api/api_basics.md) .  For information on historical version changes please see [API Version History](/api/rundeck-api-versions.md). Please note of any [incubating endpoints](/api/rundeck-api-versions.md#incubating_endpoints) that may be subject to change.

Check out our Beta [OpenAPI Spec/Swagger](/api/api-spec.md) docs too!

### Usage

For API endpoints described in this document, the *minimum* API version required for their
use is indicated by the URL used, e.g.:

    /api/{{ $apiMinVersion }}/system/info
    /api/{{ $apiMinVersion }}/projects

This means you must use at least the API version indicated to access the
endpoint, unless otherwise noted. Some features or functionality for the
endpoint may only be supported in later versions.

The API Version Number is required to be included in all API calls within the URL.

If the version number is not included or if the requested version number is unsupported, then the API call will fail.  The error response will include the code "api-version-unsupported" and have HTTP status code of `400 Bad Request`:


`Content-Type: application/json`:

``` json
{
  "error": true,
  "apiversion": 14,
  "errorCode": "api.error.api-version.unsupported",
  "message": "Unsupported API Version \"1\". API Request: /api/1/project/test/resources. Reason: Minimum supported version: {{ $apiMinVersion }}"
}
```

## Index Links

View the [Index](#index) listing API paths.

## URLs

The Rundeck server has a "Base URL", where you access the server. Your Rundeck Server URL may look like: `http://myserver:4440`.

The root URL path for all calls to the API in this version is:

    $RUNDECK_SERVER_URL/api/{{ $apiVersion }}

## JSON API


The API uses JSON for all API-level information.  Some import/export features support YAML, XML, or `text/plain` formatted documents.

All endpoints support JSON format, with content type `application/json`. 

JSON results can be retrieved by sending the HTTP "Accept" header with a `application/json` value.  JSON request content is supported when the HTTP "Content-Type" header specifies `application/json`.

If an "Accept" header is not specified, then the response will be either the same format as the request content (for POST, or PUT requests), or JSON by default.

Some endpoints also support using a `format` query parameter to specify the expected output format.

## XML support

:::deprecated

XML request and response support is *deprecated* and will be removed in a future release.

(This does not apply to "Document Formats" such as Jobs or Node resources.)

Legacy XML API behavior is not enabled by default, it can be enabled with a configuration flag:

    rundeck.feature.legacyXml.enabled=true

Please see [previous 4.x versions](/manual/old-docs.md) of the API documentation for reference to XML response formats.
:::

## Authentication

Authentication can be done in two different ways, either with Token based authentication,
or with a username and password.

Note that in either case, **it is recommended that you enable SSL Support for the Rundeck server** so that communication is encrypted at all times. For more information about using SSL, see [Security - Configuring Rundeck for SSL](/administration/security/ssl.md).

### API Token Authentication

Token Authentication consists of including a string known as an "API Token" with every
request to the Rundeck API.

To obtain an API Token, you must first log in to the Rundeck GUI using a user account.
Click on your username in the header of the page, and you will be shown your User Profile page.
From this page you can [manage your API Tokens](/manual/10-user.html#user-api-tokens).

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

    GET /api/{{ $apiMinVersion }}/projects?authtoken=E4rNvVRV378knO9dp3d73O0cs1kd0kCd HTTP/1.1
    ...

Using the HTTP Header:

    GET /api/{{ $apiMinVersion }}/projects HTTP/1.1
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

::: tip

In v4.8+ the `JSESSIONID` cookie will change after the first request after authentication. You will have to update your client code to follow redirects for subsequent requests. For example, when using `curl` you would have to use `-b` and `-c` options to update the session cookie in your next request after authentication. Alternately, you could add the `-L` option to the initial login POST, which will follow the redirect after login and update the session cookie.

:::

### JWT Token Authentication (Enterprise)

:::enterprise
:::

Starting from **5.1.0**, Rundeck can act as an OAuth Resource Server and accept dynamic JWT tokens issued by an
OAuth/OIDC provider for API Authentication.

To call the API authenticating with a JWT token, you must include it in the `Authorization` header using the `Bearer` schema:

    GET /api/{{ $apiMinVersion }}/projects HTTP/1.1
    Authorization: Bearer <jwt_token>

In order to leverage dynamic tokens for API Authentication follow the [setup instructions for Enabling the OAuth Resource Server](/administration/security/sso.html#enabling-oauth-resource-server-and-jwt-token-authentication-support). 


## Error Responses


Errors in JSON format will be in the form:

``` json
{
    "error": true,
    "errorCode": "code",
    "message": "message",
    "apiversion": "X"
}
```

### Error codes ###

Defined error codes that may be returned as `<error code="...">`

`api-version-unsupported`

:    The specified API version is not supported for the requested resource

`unauthorized`

:    The requested action is not authorized and/or the connection is not authenticated.

# API Contents

## Authentication Tokens ###

Authentication tokens can be managed via the API itself.

**Note:** as of Rundeck 3.3.8, Authentication tokens are stored in secure form and are no longer retrievable. Listing and getting
tokens will show the token id, name and other metadata but not the token value itself. The token value is only available at creation time
using the [POST /api/V/tokens/[USER]][POST /api/V/tokens/\[USER\]] endpoint.

**Note:** as of Rundeck 2.8, Authentication tokens are generated with a unique ID as well as a token string. Listing
tokens will show the ID instead of the token string, and the ID should be used to manage the token instead of the
token string itself.  Until Rundeck 3.3.7, token strings can be retrieved with the [/api/V/token/[ID]][/api/V/token/\[ID\]] endpoint.

### List Tokens ####

List all tokens or all tokens for a specific user.

**Request:**

    GET /api/{{ $apiMinVersion }}/tokens
    GET /api/{{ $apiMinVersion }}/tokens/[USER]

**Response (API version: 19 and later):**

- `name` attribute added **since V37**


```json
[
  {
    "user": "user3",
    "id": "ece75ac8-2791-442e-b179-a9907d83fd05",
    "creator": "user3",
    "name": "Admin RD-CLI",
    "expiration": "2017-03-25T21:16:50Z",
    "roles": [
      "DEV_99",
      "FEDCD25B-C945-48D3-9821-A10D44535EA4"
    ],
    "expired": false
  },
  {
    "user": "user3",
    "id": "abcb096f-cef4-451a-bd2b-43284a3ff2ad",
    "creator": "user3",
    "name": "CI Server",
    "expiration": "2017-03-25T21:17:12Z",
    "roles": [
      "SVC_XYZ",
      "devops",
      "user3"
    ],
    "expired": false
  },
  {
    "user": "user3",
    "id": "a99bd86d-0125-4eaa-9b16-caded4485476",
    "creator": "user3",
    "name": "GitHub Integration",
    "expiration": "2018-03-24T21:17:26Z",
    "roles": [
      "user",
      "FEDCD25B-C945-48D3-9821-A10D44535EA4"
    ],
    "expired": false
  },
  {
    "user": "user3",
    "id": "c13de457-c429-4476-9acd-e1c89e3c2928",
    "creator": "user3",
    "expiration": "2017-03-24T21:18:55Z",
    "roles": [
      "USER_ACCOUNT"
    ],
    "expired": true
  }
]
```


**Response (API version: 18 and earlier):**

**Note: removed since Rundeck 3.3.8**

``` json
[
  {
    "user": "alice",
    "id": "DRUVEuCdENoPkUpDkcDcdd6PeKkPdurc"
  },
  {
    "user": "bob",
    "id": "VprOpDeDP3KcK2dp37p5DoD6o53cc82D"
  },
  {
    "user": "frank",
    "id": "EveKe1KSRORnUN28D09eERDN3OvO4S6N"
  }
]
```

### Get a token ####

Get a specified auth token metadata.

**Note:** API Version 19 and later uses the token ID instead of the token string.

**Note:** As of Rundeck 3.3.8, the actual token value is not available through this endpoint.

**Request:**

    GET /api/{{ $apiMinVersion }}/token/[ID]

**Response (API version: 19) (Rundeck 3.3.8 and later):**

The token includes the `creator` of the token, as well as the `user` (the effective username) of the token.
The `id` is the unique ID, and the `name` (since v37) is the name given at creation.

``` json
{
  "user": "user3",
  "id": "c13de457-c429-4476-9acd-e1c89e3c2928",
  "creator": "user3",
  "name": "CI Server Token",
  "expiration": "2017-03-24T21:18:55Z",
  "roles": [
    "USER_ACCOUNT"
  ],
  "expired": true
}
```

**Response (API version: 19) (Rundeck 3.3.7 and earlier):**

The token includes the `creator` of the token, as well as the `user` (the effective username) of the token.
The `id` is the unique ID, and the `token` value is the token string.


``` json
{
  "user": "user3",
  "token": "VjkbX2zUAwnXjDIbRYFp824tF5X2N7W1",
  "id": "c13de457-c429-4476-9acd-e1c89e3c2928",
  "creator": "user3",
  "expiration": "2017-03-24T21:18:55Z",
  "roles": [
    "USER_ACCOUNT"
  ],
  "expired": true
}
```

**Response (API version: 18 and earlier) (removed since Rundeck 3.3.8):**

The `id` value returned is the token string.


``` json
{
  "user": "alice",
  "id": "DuV0UoDUDkoR38Evd786cdRsed6uSNdP"
}
```

### Create a Token ####

Create a new token for a specific user. Specify custom roles and duration if authorized.

**Request:**

    POST /api/{{ $apiMinVersion }}/tokens
    POST /api/{{ $apiMinVersion }}/tokens/[USER]

The user specified must either be part of the URL, or be part of the request content.

**Note:** As of Rundeck 3.3.8, the actual token value **is only available at creation time through the response of this endpoint**. Be sure to store your tokens as they will not be available later.

**For API v18 and earlier**: by default the role `api_token_group` is set for the generated token,
and the duration will be the maximum allowed token duration.  If `user` is present in the URL, then the request content is ignored and can be empty.

**For API v19 and later**: A content body is expected, and `roles` must be specified, and `duration` is optional.
If unset, duration will be the maximum allowed token duration.

If the `roles` value is the string `*` (asterisk), and the token is generated for oneself (i.e. the authenticated user),
then the generated token will have all roles as the authenticated user.

**For API v37 and later**: You can provide a `name` parameter to name the created token.


``` json
{
  "user": "alice",
  "roles": [
    "sre",
    "dev"
  ],
  "duration": "120d",
  "name": "Example Token"
}
```

`roles` can be a comma-separated string:

``` json
{
  "user": "alice",
  "roles": "sre,dev",
  "duration": "120d",
  "name": "Example Token"
}
```

**Response (API version: 19 and later):**

- `name` attribute added **since V37**


``` json
{
  "user": "alice",
  "token": "08e7rlGwwnqoX6lzewriXSabuqNMueTL",
  "id": "b6ea87e3-43e5-4210-bd51-b82f8e33d9a4",
  "creator": "admin",
  "name": "Example Token",
  "expiration": "2017-07-22T22:43:53Z",
  "roles": [
    "dev",
    "sre"
  ],
  "expired": false
}
```

**Response (API version: 18 and earlier):**

``` json
{
  "user": "alice",
  "token": "mfAqxIZPlXIT8qQOD98RvMUcgCwOXbqc"
}
```

### Delete a token ####

Delete a specified auth token.

**Request:**

    DELETE /api/{{ $apiMinVersion }}/token/[ID]

Response:

    204 No Content


## Config Management ###
Manage your plugin and custom configuration properties via API.

### Create or Update Configurations ####
    POST api/36/config/save
Create or update configs and properties. POST fails if any configs are invalid.

**Request:**

Headers
* `Content-Type` Required
  * Accepts: `application/json`

Body
* `key` Required
  * Represents either a new config to be created, or an existing config to be updated.
  * Accepts: Any `string`
* `value` Required
  * The value for the desired config `key`.
  * Accepts: Any `string`
* `strata` Optional
  * Whether the config should apply to the current server (`Server`), or to all servers in the cluster (`default`).
  * Accepts: `Server`, `default`
  * Default: `default`

Example JSON
```json
[
  {
    "key": "myCustomConfig",
    "value": "newValueForCustomConfig",
    "strata": "default"
  },
  {
    "key": "myNewCustomConfig",
    "value": "valueOfNewCustomConfig",
    "strata": "default"
  }
]
```

**Responses**

    200 OK

All configs were successfully saved or updated. A payload reflecting save or creation status is returned.

Headers  
`Content-Type: application/json`:

Body
```json
{
  "msg":"Saved",
  "created": [
    "myNewCustomConfig"
  ],
  "updated": [
    "myCustomConfig"
  ]
}
```
---
    400 Bad Request

Some or all configs were formatted in an invalid way and were ignored. Check your request data and try again.

---
    401 Unathorized

API Key is associated with a user or role with insufficent permissions to perform the action.

Headers  
`Content-Type: application/json`

Body
```json
{
  "msg":"Unauthorized"
}
```

### Delete a Single Config ####
    DELETE /api/36/config/delete

Delete a single config by key and strata.

**Request:**

Headers
* `Content-Type` Required
  * Accepts: `application/json`

Body
* `key` Required
  * Represents the config to be deleted.
  * Accepts: Any `string`
* `strata` Optional
  * Whether the config should apply to the current server (`Server`), or to all servers in the cluster (`default`).
  * Accepts: `Server`, `default`
  * Default: `default`

Example JSON
```json
  {
    "key": "myCustomConfig",
    "strata": "default"
  }
```

**Response**

    204 No Content

The config was deleted successfully.

---
    401 Unathorized

API Key is associated with a user or role with insufficent permissions to perform the action.

Headers  
`Content-Type: application/json`

Body
```json
{
  "msg":"Unauthorized"
}
```

---
    404 Not Found

A config with the input config key was not found.

Headers  
`Content-Type: application/json`

Body
```json
{
  "error":true,
  "apiversion":40,
  "errorCode":"rundeckpro.config.api.error.not.found",
  "message":"System Configuration Not Found"
}
```

### List All Current Configurations ####
    GET api/36/config/list
List all existing configs and their properties.

**Request:**

Headers
* `Content-Type` Optional
  * Accepts: `application/json`

**Responses:**

    200 OK

Call was successful. A list of all configs stored using Configuration Management is returned.

_NOTE: For a complete list of all configs, reference the System Report page in Rundeck._


Headers  
`Content-Type: application/json`

Body
```json
[
  {
    "name": "azure.clientId",
    "value": "test222236",
    "level": "default",
    "label": "Azure Client ID",
    "category": "Plugins/Azure"
  },
  {
    "name": "myCustomConfig",
    "value": "myConfigValue",
    "level": "default",
    "category": "Custom",
  },
  {
    "name": "myCustomConfig2",
    "value": "myConfigValue2",
    "level": "default",
    "category": "Custom",
  }
]
```

---
    401 Unathorized

API Key is associated with a user or role with insufficent permissions to perform the action.

Headers

`Content-Type: application/json`

Body
```json
{
  "msg":"Unauthorized"
}
```

### Refresh Configurations from Properties File ####
    POST /api/36/config/refresh

Make the Rundeck server re-read the config properties file.

**Request:**

Headers
* `Content-Type` Optional
  * Accepts: `application/json`

**Response**

    200 OK

The call was successful. Rundeck will reread the config properties file.

_NOTE: Some config changes will not go into effect after a reload, and require a full restart of Rundeck._

Headers

`Content-Type: application/json`:

Body
``` json
{
    "msg": "Rundeck configuration refreshed"
}
```
---
    401 Unathorized

API Key is associated with a user or role with insufficent permissions to perform the action.

Headers

`Content-Type: application/json`

Body
```json
{
  "msg":"Unauthorized"
}
```


### Restart the Rundeck Server ####
    POST /api/36/config/restart
Restart the Rundeck server.

**Request:**

Headers
* `Content-Type` Optional
  * Accepts: `application/json`

**Response**

    200 OK

The call was successful. The Rundeck server will immediately restart.

Headers

`Content-Type: application/json`:

Body
``` json
{
  "msg": "Rundeck Restarting",
  "restarting":true
}
```
---
    401 Unathorized

API Key is associated with a user or role with insufficent permissions to perform the action.

Headers  
`Content-Type: application/json`

Body
```json
{
  "msg":"Unauthorized"
}
```

## System Info ###

Get Rundeck server information and stats.

**Request:**

    GET /api/{{ $apiMinVersion }}/system/info

Parameters: none

**Response:**

Success response, with included system info and stats in this format:


``` json
{
  "system": {
    "timestamp": {
      "epoch": 1431975278220,
      "unit": "ms",
      "datetime": "2015-05-18T18:54:38Z"
    },
    "rundeck": {
      "version": "2.5.2-SNAPSHOT",
      "build": "2.5.2-0-SNAPSHOT",
      "node": "madmartigan.local",
      "base": "/Users/greg/rundeck25",
      "apiversion": 14,
      "serverUUID": null
    },
    "executions":{
      "active":true,
      "executionMode":"active"
    },
    "os": {
      "arch": "x86_64",
      "name": "Mac OS X",
      "version": "10.10.3"
    },
    "jvm": {
      "name": "Java HotSpot(TM) 64-Bit Server VM",
      "vendor": "Oracle Corporation",
      "version": "1.7.0_71",
      "implementationVersion": "24.71-b01"
    },
    "stats": {
      "uptime": {
        "duration": 546776,
        "unit": "ms",
        "since": {
          "epoch": 1431974731444,
          "unit": "ms",
          "datetime": "2015-05-18T18:45:31Z"
        }
      },
      "cpu": {
        "loadAverage": {
          "unit": "percent",
          "average": 2.689453125
        },
        "processors": 8
      },
      "memory": {
        "unit": "byte",
        "max": 716177408,
        "free": 138606040,
        "total": 527958016
      },
      "scheduler": {
        "running": 0,
        "threadPoolSize": 10
      },
      "threads": {
        "active": 35
      }
    },
    "metrics": {
      "href": "http://madmartigan.local:4440/api/25/metrics/metrics?pretty=true",
      "contentType": "application/json"
    },
    "threadDump": {
      "href": "http://madmartigan.local:4440/api/25/metrics/threads",
      "contentType": "text/plain"
    },
    "healthcheck": {
      "href": "http://madmartigan.local:4440/api/25/metrics/healthcheck",
      "contentType": "application/json"
    },
    "ping": {
      "href": "http://madmartigan.local:4440/api/25/metrics/ping",
      "contentType": "text/plain"
    }
  }
}
```


Description of included elements:

`timestamp` describes the current system time known to the server. The `@epoch`
attribute includes the milliseconds since the unix epoch.

`datetime`

:   The W3C date and time

`rundeck` includes information about the Rundeck application.

`rundeck/version`

:   Rundeck version

`rundeck/apiversion`

:   Rundeck API version

`rundeck/build`

:   Rundeck build stamp

`rundeck/node`

:   Server node name

`rundeck/base`

:   Server base directory

`rundeck/serverUUID`

:   Server UUID (present if cluster mode is enabled)

`os/arch`

:   Operating System architecture

`os/name`

:   Operating System Name

`os/version`

:   Operating System Version

`jvm/name`

:   JVM name

`jvm/vendor`

:   JVM vendor

`jvm/version`

:   JVM version

`stats` section includes some system statistics:

`uptime` describes the JVM uptime as duration in ms, and includes absolute
startup time:

`uptime/since`

:   JVM startup time as time since the unix epoch

`uptime/since/datetime`

:   JVM startup time as W3C date time.

`cpu/loadAverage`

:   JVM load average percentage for the system for the previous minute (see [getSystemLoadAverage](https://docs.oracle.com/javase/6/docs/api/java/lang/management/OperatingSystemMXBean.html#getSystemLoadAverage())

`cpu/processors`

:   Number of available system processors. note that loadAverage might be
    calculated based on the total number of available processors

The `memory` section describes memory usage in bytes:

`max`

:   Maximum JVM memory that can be allocated

`free`

:   Free memory of the allocated memory

`total`

:   Total allocated memory for the JVM

`scheduler/running`

:   Number of running jobs in the scheduler

`scheduler/threadPoolSize`

:   Size of the scheduler threadPool: maximum number of concurrent Rundeck executions

`threads/active`

:   Number of active Threads in the JVM

### Metrics Links

Several Metrics API endpoints are linked in the System Info response.

See [GET /api/V/metrics][/api/V/metrics].

## List Metrics

List enabled Metrics endpoints.

*Configuration*

The Metrics endpoints are enabled by default, but can be disabled based on application configuration.  See: [Administration > Configuration File Reference](/administration/configuration/config-file-reference.md#metrics-api-endpoints).

*ACL Requirement*

They require `read` access to the `system` application scope resource.  See: [Access Control Policy > Application Scope](/administration/security/authorization.md#application-scope-resources-and-actions).

**Request:**

    GET /api/25/metrics

**Response:**

Links to enabled Metrics endpoints:

`Content-Type: application/json`:

``` json
{
  "_links": {
    "metrics": {
      "href": "http://ecto1.local:4440/api/25/metrics/metrics"
    },
    "ping": {
      "href": "http://ecto1.local:4440/api/25/metrics/ping"
    },
    "threads": {
      "href": "http://ecto1.local:4440/api/25/metrics/threads"
    },
    "healthcheck": {
      "href": "http://ecto1.local:4440/api/25/metrics/healthcheck"
    }
  }
}
```

### Metrics Data

Return the metrics data.

**Request:**

    GET /api/25/metrics/metrics

**Response:**

`Content-Type: application/json`:

``` json
{
  "version": "3.1.3",
  "gauges": {
    "dataSource.connection.pingTime": {
      "value": 1
    },
    "rundeck.scheduler.quartz.runningExecutions": {
      "value": 0
    },
    "rundeck.services.AuthorizationService.sourceCache.evictionCount": {
      "value": 0
    },
    "rundeck.services.AuthorizationService.sourceCache.hitCount": {
      "value": 9
    },
    "rundeck.services.AuthorizationService.sourceCache.hitRate": {
      "value": 0.9
    },
    "rundeck.services.AuthorizationService.sourceCache.loadExceptionCount": {
      "value": 0
    },
    "rundeck.services.AuthorizationService.sourceCache.missCount": {
      "value": 1
    },
    "rundeck.services.NodeService.nodeCache.evictionCount": {
      "value": 0
    },
    "rundeck.services.NodeService.nodeCache.hitCount": {
      "value": 11
    },
    "rundeck.services.NodeService.nodeCache.hitRate": {
      "value": 0.9166666666666666
    },
    "rundeck.services.NodeService.nodeCache.loadExceptionCount": {
      "value": 0
    },
    "rundeck.services.NodeService.nodeCache.missCount": {
      "value": 1
    },
    "rundeck.services.ProjectManagerService.fileCache.evictionCount": {
      "value": 0
    },
    "rundeck.services.ProjectManagerService.fileCache.hitCount": {
      "value": 0
    },
    "rundeck.services.ProjectManagerService.fileCache.hitRate": {
      "value": 0
    },
    "rundeck.services.ProjectManagerService.fileCache.loadExceptionCount": {
      "value": 0
    },
    "rundeck.services.ProjectManagerService.fileCache.missCount": {
      "value": 6
    },
    "rundeck.services.ProjectManagerService.projectCache.evictionCount": {
      "value": 0
    },
    "rundeck.services.ProjectManagerService.projectCache.hitCount": {
      "value": 530
    },
    "rundeck.services.ProjectManagerService.projectCache.hitRate": {
      "value": 0.9888059701492538
    },
    "rundeck.services.ProjectManagerService.projectCache.loadExceptionCount": {
      "value": 0
    },
    "rundeck.services.ProjectManagerService.projectCache.missCount": {
      "value": 6
    },
    "rundeck.services.ProjectManagerService.sourceCache.evictionCount": {
      "value": 0
    },
    "rundeck.services.ProjectManagerService.sourceCache.hitCount": {
      "value": 0
    },
    "rundeck.services.ProjectManagerService.sourceCache.hitRate": {
      "value": 1
    },
    "rundeck.services.ProjectManagerService.sourceCache.loadExceptionCount": {
      "value": 0
    },
    "rundeck.services.ProjectManagerService.sourceCache.missCount": {
      "value": 0
    }
  },
  "counters": {
    "rundeck.scheduler.quartz.scheduledJobs": {
      "count": 6
    }
  },
  "histograms": {},
  "meters": {
    "rundeck.services.AuthorizationService.systemAuthorization.evaluateMeter": {
      "count": 4,
      "m15_rate": 0.00314076610191179,
      "m1_rate": 0.023875601445527157,
      "m5_rate": 0.008400048550624787,
      "mean_rate": 0.026528128813374685,
      "units": "events/second"
    },
    "rundeck.services.AuthorizationService.systemAuthorization.evaluateSetMeter": {
      "count": 12,
      "m15_rate": 0.6892782713428792,
      "m1_rate": 0.1267495745218626,
      "m5_rate": 0.5153224625291539,
      "mean_rate": 0.07958452971073966,
      "units": "events/second"
    },
    "rundeck.services.ExecutionService.executionJobStartMeter": {
      "count": 6,
      "m15_rate": 0.3446391356714396,
      "m1_rate": 0.0633747872609313,
      "m5_rate": 0.25766123126457696,
      "mean_rate": 0.039926086575635206,
      "units": "events/second"
    },
    "rundeck.services.ExecutionService.executionStartMeter": {
      "count": 6,
      "m15_rate": 0.3446391356714396,
      "m1_rate": 0.0633747872609313,
      "m5_rate": 0.25766123126457696,
      "mean_rate": 0.039893916635731115,
      "units": "events/second"
    },
    "rundeck.services.ExecutionService.executionSuccessMeter": {
      "count": 6,
      "m15_rate": 0.3465591259042392,
      "m1_rate": 0.06888231291145262,
      "m5_rate": 0.2619915710449402,
      "mean_rate": 0.04041785210623091,
      "units": "events/second"
    }
  },
  "timers": {
    "rundeck.api.requests.requestTimer": {
      "count": 3,
      "max": 0.19907502000000002,
      "mean": 0.108295424,
      "min": 0.014703712,
      "p50": 0.11110754,
      "p75": 0.19907502000000002,
      "p95": 0.19907502000000002,
      "p98": 0.19907502000000002,
      "p99": 0.19907502000000002,
      "p999": 0.19907502000000002,
      "stddev": 0.09221781715431031,
      "m15_rate": 0.00314076610191179,
      "m1_rate": 0.023875601445527157,
      "m5_rate": 0.008400048550624787,
      "mean_rate": 0.0326409948656659,
      "duration_units": "seconds",
      "rate_units": "calls/second"
    },
    "rundeck.quartzjobs.ExecutionJob.executionTimer": {
      "count": 6,
      "max": 2.785892703,
      "mean": 0.6245617408333334,
      "min": 0.156943942,
      "p50": 0.2009052745,
      "p75": 0.8750149552500001,
      "p95": 2.785892703,
      "p98": 2.785892703,
      "p99": 2.785892703,
      "p999": 2.785892703,
      "stddev": 1.0593646577233937,
      "m15_rate": 0.17537122122178622,
      "m1_rate": 0.049487919338571586,
      "m5_rate": 0.13657375399032906,
      "mean_rate": 0.039744906881515114,
      "duration_units": "seconds",
      "rate_units": "calls/second"
    },
    "rundeck.services.AuthorizationService.getSystemAuthorization": {
      "count": 10,
      "max": 0.11291242300000001,
      "mean": 0.0168355508,
      "min": 0.002907568,
      "p50": 0.003709257,
      "p75": 0.0103103045,
      "p95": 0.11291242300000001,
      "p98": 0.11291242300000001,
      "p99": 0.11291242300000001,
      "p999": 0.11291242300000001,
      "stddev": 0.0345229796390412,
      "m15_rate": 0.3477799017733514,
      "m1_rate": 0.08725038870645847,
      "m5_rate": 0.2660612798152018,
      "mean_rate": 0.06628145573313499,
      "duration_units": "seconds",
      "rate_units": "calls/second"
    },
    "rundeck.services.AuthorizationService.systemAuthorization.evaluateSetTimer": {
      "count": 12,
      "max": 0.064324482,
      "mean": 0.0064664489166666676,
      "min": 0.0006582410000000001,
      "p50": 0.001099722,
      "p75": 0.0018917270000000002,
      "p95": 0.064324482,
      "p98": 0.064324482,
      "p99": 0.064324482,
      "p999": 0.064324482,
      "stddev": 0.01822988971428955,
      "m15_rate": 0.6892782713428792,
      "m1_rate": 0.1267495745218626,
      "m5_rate": 0.5153224625291539,
      "mean_rate": 0.07958252469001104,
      "duration_units": "seconds",
      "rate_units": "calls/second"
    },
    "rundeck.services.AuthorizationService.systemAuthorization.evaluateTimer": {
      "count": 4,
      "max": 0.002291996,
      "mean": 0.00132195675,
      "min": 0.000826429,
      "p50": 0.001084701,
      "p75": 0.00204558875,
      "p95": 0.002291996,
      "p98": 0.002291996,
      "p99": 0.002291996,
      "p999": 0.002291996,
      "stddev": 0.0006824895873415091,
      "m15_rate": 0.00314076610191179,
      "m1_rate": 0.023875601445527157,
      "m5_rate": 0.008400048550624787,
      "mean_rate": 0.0265274537259422,
      "duration_units": "seconds",
      "rate_units": "calls/second"
    },
    "rundeck.services.FrameworkService.authorizeApplicationResource": {
      "count": 4,
      "max": 0.016328387,
      "mean": 0.004882139000000001,
      "min": 0.000912978,
      "p50": 0.0011435955,
      "p75": 0.012589778000000001,
      "p95": 0.016328387,
      "p98": 0.016328387,
      "p99": 0.016328387,
      "p999": 0.016328387,
      "stddev": 0.007633923731977984,
      "m15_rate": 0.3711760292127013,
      "m1_rate": 0.14055240663997448,
      "m5_rate": 0.32006153577038915,
      "mean_rate": 0.05025453574530793,
      "duration_units": "seconds",
      "rate_units": "calls/second"
    },
    "rundeck.services.FrameworkService.filterNodeSet": {
      "count": 12,
      "max": 0.36586338300000004,
      "mean": 0.03359687208333334,
      "min": 0.000560871,
      "p50": 0.0010942600000000001,
      "p75": 0.00812147625,
      "p95": 0.36586338300000004,
      "p98": 0.36586338300000004,
      "p99": 0.36586338300000004,
      "p999": 0.36586338300000004,
      "stddev": 0.10477591919675994,
      "m15_rate": 0.6892782713428792,
      "m1_rate": 0.1267495745218626,
      "m5_rate": 0.5153224625291539,
      "mean_rate": 0.07994704576896616,
      "duration_units": "seconds",
      "rate_units": "calls/second"
    },
    "rundeck.services.NodeService.project.bingo.loadNodes": {
      "count": 3,
      "max": 0.29763018,
      "mean": 0.13177108533333334,
      "min": 0.046235376,
      "p50": 0.051447700000000006,
      "p75": 0.29763018,
      "p95": 0.29763018,
      "p98": 0.29763018,
      "p99": 0.29763018,
      "p999": 0.29763018,
      "stddev": 0.14366183050172013,
      "m15_rate": 0.17327375280520316,
      "m1_rate": 0.033814570567886885,
      "m5_rate": 0.1309493035278718,
      "mean_rate": 0.020034416530604948,
      "duration_units": "seconds",
      "rate_units": "calls/second"
    },
    "rundeck.web.requests.requestTimer": {
      "count": 5,
      "max": 0.19833273,
      "mean": 0.0921360348,
      "min": 0.008643088,
      "p50": 0.106350626,
      "p75": 0.16599702400000002,
      "p95": 0.19833273,
      "p98": 0.19833273,
      "p99": 0.19833273,
      "p999": 0.19833273,
      "stddev": 0.08113047507342931,
      "m15_rate": 0.33800395660416016,
      "m1_rate": 0.05334571472303017,
      "m5_rate": 0.24315644263411573,
      "mean_rate": 0.02965980629218819,
      "duration_units": "seconds",
      "rate_units": "calls/second"
    }
  }
}
```

### Metrics Healthcheck

Returns results of some health checks.

**Request:**

    GET /api/25/metrics/healthcheck

**Response:**

`Content-Type: application/json`:

``` json
{
  "dataSource.connection.time": {
    "healthy": true,
    "message": "Datasource connection healthy with timeout 5 seconds"
  },
  "quartz.scheduler.threadPool": {
    "healthy": true
  }
}
```


### Metrics Threads

Returns a dump of running JVM Threads.

**Request:**

    GET /api/25/metrics/threads

**Response:**

`Content-Type: text/plain`:

```
Reference Handler id=2 state=WAITING
    - waiting on <0x07413c0c> (a java.lang.ref.Reference$Lock)
    - locked <0x07413c0c> (a java.lang.ref.Reference$Lock)
    at java.lang.Object.wait(Native Method)
    at java.lang.Object.wait(Object.java:502)
    at java.lang.ref.Reference.tryHandlePending(Reference.java:191)
    at java.lang.ref.Reference$ReferenceHandler.run(Reference.java:153)

Finalizer id=3 state=WAITING
    - waiting on <0x280b74e0> (a java.lang.ref.ReferenceQueue$Lock)
    - locked <0x280b74e0> (a java.lang.ref.ReferenceQueue$Lock)
    at java.lang.Object.wait(Native Method)
    at java.lang.ref.ReferenceQueue.remove(ReferenceQueue.java:144)
    at java.lang.ref.ReferenceQueue.remove(ReferenceQueue.java:165)
    at java.lang.ref.Finalizer$FinalizerThread.run(Finalizer.java:216)

Signal Dispatcher id=4 state=RUNNABLE

...
```

### Metrics Ping

Returns a simple text response.

**Request:**

    GET /api/25/metrics/ping

**Response:**

`Content-Type: text/plain`:

```
pong
```

## User Profile

### List users

Get a list of all the users.

**Request:**

    GET /api/27/user/list/

**Response:**

Success response, with a list of users:


``` json
[{
    "login":"user",
    "firstName":"Name",
    "lastName":"LastName",
    "email":"user@server.com",
    "created": "2017-10-01T09:00:20Z",
    "updated": "2018-08-24T13:53:02Z",
    "lastJob": "2018-08-28T13:31:00Z",
    "tokens": 1
},
{
    "login":"admin",
    "firstName":"Admin",
    "lastName":"Admin",
    "email":"admin@server.com",
    "created": "2016-07-17T18:42:00Z",
    "updated": "2018-08-24T13:53:00Z",
    "lastJob": "2018-08-28T13:31:00Z",
    "tokens": 6
}]
```

**Since v27**:

* `created` Creation date of the user.
* `updated` Last time the user contact data was updated.
* `lastJob` Last time the user runs a job.
* `tokens` Number of API tokens associated to the user.


### Get user profile

Get same user profile data.

**Request:**

    GET /api/21/user/info/

**Response:**

Success response, with profile data:


``` json
{
    "login":"user",
    "firstName":"Name",
    "lastName":"LastName",
    "email":"user@server.com"
}
```


### Get another user profile

Get another user profile data. Requires system `admin` permission.

**Request:**

    GET /api/21/user/info/[User]

**Response:**

Success response, with profile data:


``` json
{
    "login":"user",
    "firstName":"Name",
    "lastName":"LastName",
    "email":"user@server.com"
}
```

### Modify user profile

Modify same user profile data.

**Request:**

    POST /api/21/user/info/

``` json
{
    "firstName":"Name",
    "lastName":"LastName",
    "email":"user@server.com"
}
```

**Response:**

Success response, with profile updated data:


``` json
{
    "login":"user",
    "firstName":"Name",
    "lastName":"LastName",
    "email":"user@server.com"
}
```

### Modify another user profile

Modify another user profile data. Requires system `admin` permission.

**Request:**

    POST /api/21/user/info/[User]

``` json
{
    "firstName":"Name",
    "lastName":"LastName",
    "email":"user@server.com"
}
```

**Response:**

Success response, with profile updated data:

``` json
{
    "login":"user",
    "firstName":"Name",
    "lastName":"LastName",
    "email":"user@server.com"
}
```

### List roles

Get a list of the authenticated user's roles

**Request:**

    GET /api/30/user/roles

**Response:**

Success response, with a list of roles:


``` json
{
    "roles":["admin","user"]
}
```

## User Class

### Get allocated User Classes

Get the User Class allocations provided and allowed by the License.

The response will contain the allocation state, the current allocations by username, and summary information.

Authorization required: `admin` or `app_admin` access for user resource type.

Available in API v41 and greater.

**Request:**

    GET /api/44/userclass/allocations

**Response:**
200
User Classes

`Content-Type: application/json`:


``` json
{
  "allocations": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "state": "string",
  "message": "string",
  "summary": {
    "additionalProp1": 0,
    "additionalProp2": 0,
    "additionalProp3": 0
  },
  "exceeded": {
    "additionalProp1": 0,
    "additionalProp2": 0,
    "additionalProp3": 0
  },
  "entitled": {
    "additionalProp1": 0,
    "additionalProp2": 0,
    "additionalProp3": 0
  }
}
```


### Get available User Classes

Get a list of User Classes that are available.

The response will be a list of User Class Definitions.

Authorization required: admin or app_admin access for user resource type.

Available in API v41 and greater.

**Request:**

    GET /api/44/userclass/available

**Response:**
200
User Classes

`Content-Type: application/json`:


``` json
{
  "classes": [
    {
      "name": "string",
      "title": "string",
      "description": "string"
    }
  ]
}
```

### Feature enablement check

Return whether the feature is enabled. 

Available in API v41 and greater.

**Request:**

    GET /api/44/userclass/enabled

**Response:**
200
Feature enablement response

`Content-Type: application/json`:


``` json
{
  "enabled": true
}
```


### Get current user's User Class assignment

Get the User Class assignment of the current user.

The response will contain the user class name, or **`NONE`** if unassigned.

Authorization required: none.

Available in API v41 and greater.

**Request:**

    GET /api/44/userclass/self

**Response:**
200
User Class assignment

`Content-Type: application/json`:


``` json
{
  "username": "string",
  "userclass": "string"
}
```


### Get allocated User Class State

Get the User Class state.

The response will contain the allocation state, and summary information.

Authorization required: `admin` or `app_admin` access for user resource type.

Available in API v41 and greater.

**Request:**

    GET /api/44/userclass/state

**Response:**
200
User Classes

`Content-Type: application/json`:


``` json
{
  "allocations": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "state": "string",
  "message": "string",
  "summary": {
    "additionalProp1": 0,
    "additionalProp2": 0,
    "additionalProp3": 0
  },
  "exceeded": {
    "additionalProp1": 0,
    "additionalProp2": 0,
    "additionalProp3": 0
  },
  "entitled": {
    "additionalProp1": 0,
    "additionalProp2": 0,
    "additionalProp3": 0
  }
}
```


### Update multiple User Class assignments

Allows modifying multiple User Class assignments in one request.

This action can operate in one of three behaviors:

1. If the request contains the allocations definition, those allocations will be set.<br>
2. If the request contains bulkRemove value true, and a set of usernames, then the specified usernames will have their user class assignments removed.<br>
3. If the request values bulkAssign and usernames are set, then all the specified usernames will be assigned to the User Class specified in bulkAssign.<br>

If the request doesn't match one of these three modes, a 400 error will be returned with error code api.error.item.unsupported-format.

The response will contain the current user class assignments, if successful.

If an allocation error occurs, such as the allocation of the specified User Class is already full, then a User Class Allocation error will be returned with a **`400`** status code with error code **`api.error.entitlements.user-class.allocation.exceeded`**.

Authorization required: `admin` or `app_admin` access for user resource type.

Available in API v41 and greater.

**Request:**

    POST /api/44/userclass/update

**Response:**
200
User Class allocation information


`Content-Type: application/json`:


``` json
{
  "allocations": {
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
  },
  "state": "string",
  "message": "string",
  "summary": {
    "additionalProp1": 0,
    "additionalProp2": 0,
    "additionalProp3": 0
  },
  "exceeded": {
    "additionalProp1": 0,
    "additionalProp2": 0,
    "additionalProp3": 0
  },
  "entitled": {
    "additionalProp1": 0,
    "additionalProp2": 0,
    "additionalProp3": 0
  }
}
```

**Response:**
400
Format Error

`Content-Type: application/json`:


``` json
{
  "error": "string",
  "errorCode": "string"
}
```


### Get a user's Class assignment

Get the User Class assignment of the specified user.

The response will contain the user class name, or **NONE** if unassigned.

Authorization required for current user: none

Authorization required for other user: `admin` or `app_admin` access for user resource type.

Available in API v41 and greater.

**Request:**

    GET /api/44/userclass/user/username

**Response:**
200
User Class assignment

`Content-Type: application/json`:


``` json
{
  "username": "string",
  "userclass": "string"
}
```


### Set a user's Class assignment

Set the User Class assignment of the specified user.

The response will contain the user class assignment, if successful.

If an allocation error occurs, such as the allocation of the specified User Class is already full, then a User Class Allocation error will be returned with a **`400`** status code with error code **`api.error.entitlements.user-class.allocation.exceeded`**.

Authorization required: `admin` or `app_admin` access for user resource type.

Available in API v41 and greater.

**Request:**

    POST /api/44/userclass/user/username

**Response:**
200
User Class assignment


`Content-Type: application/json`:


``` json
{
  "username": "string",
  "userclass": "string"
}
```



**Response:**
400
User Class Allocation error

`Content-Type: application/json`:


``` json
{
  "error": "string",
  "errorCode": "string",
  "excessions": {
    "additionalProp1": 0,
    "additionalProp2": 0,
    "additionalProp3": 0
  },
  "limits": {
    "additionalProp1": 0,
    "additionalProp2": 0,
    "additionalProp3": 0
  }
}
```

### Delete a user's Class assignment

Remove the User Class assignment of the specified user.

The response will be `204 No Content` if successful.

Authorization required: `admin` or `app_admin` access for user resource type.

Available in API v41 and greater.

**Request:**

    DELETE /api/44/userclass/user/username

**Response:**
204
No Content

## Log Storage

### Log Storage Info

Get Log Storage information and stats.

**Request:**

    GET /api/17/system/logstorage

**Response:**

Success response, with log storage info and stats in this format:


``` json
{
  "enabled": true,
  "pluginName": "NAME",
  "succeededCount": 369,
  "failedCount": 0,
  "queuedCount": 0,
  "totalCount": 369,
  "incompleteCount": 0,
  "missingCount": 0
}
```

`enabled`

:   True if a plugin is configured

`pluginName`

:   Name of the configured plugin

`succeededCount`

:   Number of successful storage requests

`failedCount`

:   Number of failed storage requests

`queuedCount`

:   Number of queued storage requests

`totalCount`

:   Total number of storage requests (currently queued plus previously processed)

`incompleteCount`

:   Number of storage requests which have not completed successfully

`missingCount`

:   Number of executions for this cluster node which have no associated storage requests

### List Executions with Incomplete Log Storage

List all executions with incomplete log storage.

**Request:**

    GET /api/17/system/logstorage/incomplete

**Response:**

```json
{
  "total": #,
  "max": 20,
  "offset": 0,
  "executions": [
    {
      "id": [EXECID],
      "project": "[PROJECT]",
      "href": "[API HREF]",
      "permalink": "[GUI HREF]",
      "storage": {
        "localFilesPresent": true/false,
        "incompleteFiletypes": "[TYPES]",
        "queued": true/false,
        "failed": true/false,
        "date": "[DATE]"
      },
      "errors": ["message","message..."]
    },
    ...
    ]
}
```

`total`, `max`, `offset` (paging information)

:   Total number of executions with incomplete log data storage, maximum returned in the response, offset of first result.

`id`

:   Execution ID

`project`

:   Project Name

`href`

:   API URL for Execution

`permalink`

:   GUI URL for Execution

`incompleteFiletypes`

:   Comma-separated list of filetypes which have not be uploaded, e.g. `rdlog,state.json`. Types are `rdlog` (log output), `state.json` (workflow state data), `execution.xml` (execution definition)

`queued`

:   True if the log data storage is queued to be processed.

`failed`

:   True if the log data storage was processed but failed without completion.

`date`

:   Date when log data storage was first processed. (W3C date format.)

`localFilesPresent`

:   True if all local files (`rdlog` and `state.json`) are available for upload.  False if one of them is not present on disk.

### Resume Incomplete Log Storage

Resume processing incomplete Log Storage uploads.

**Request:**

    POST /api/17/system/logstorage/incomplete/resume

**Response:**


``` json
{
  "resumed": true
}
```

## Execution Mode ##

Change the server execution mode to ACTIVE or PASSIVE.  The state of the current
execution mode can be viewed via the [`/api/{{ $apiMinVersion }}/system/info`][/api/V/system/info]
endpoint, or the [`/api/32/system/executions/status`][/api/V/system/executions/status]
endpoint.

### Set Active Mode ###

Enables executions, allowing adhoc and manual and scheduled jobs to be run.

**Request:**

    POST /api/{{ $apiMinVersion }}/system/executions/enable

**Response**


``` json
{
  "executionMode":"active"
}
```

### Set Passive Mode ###

Disables executions, preventing adhoc and manual and scheduled jobs from running.

**Request:**

POST /api/{{ $apiMinVersion }}/system/executions/disable

**Response**


``` json
{
  "executionMode":"passive"
}
```

### Get Current Execution Mode ###

Gets the current execution mode.

:::tip
Prior to API version 36 if the mode was **passive** a status ``HTTP 503 - Service Unavailable`` would be returned.
As of API v36 a ``200`` status will now be returned when the mode is **passive**.
To return a 503 when the mode is **passive** add `?passiveAs503=true` to the API call.  
:::

**Request:**

GET /api/32/system/executions/status

**Response**

``` json
{"executionMode":"active"}
or
{"executionMode":"passive"}
```

## Cluster Mode


### Takeover Schedule in Cluster Mode

Tell a Rundeck server in cluster mode to claim all scheduled jobs from another
cluster server.

This endpoint can take over the schedule of certain jobs based on the input:

* specify a server `uuid`: take over all jobs from that server
* specify server `all` value of `true`: take over all jobs regardless of server UUID

Additionally, you can specify a `project` name to take over only jobs matching
the given project name, in combination with the server options.

Alternately, specify a job ID to takeover only a single Job's schedule.

**Request**

    PUT /api/{{ $apiMinVersion }}/scheduler/takeover

Request JSON object:

* optional `server` entry, with one of these required entries:
    * `uuid` server UUID to take over from
    * `all` value of `true` to take over from all servers
* optional `project` entry, specifying a project name
* optional `job` entry, with required entry:
    * `id` Job UUID

``` json
{
  "server": {
    "uuid": "[UUID]",
    "all": true
  },
  "project": "[PROJECT]"
}
```

Specify a job id:

``` json
{
  "job": {
    "id": "[UUID]"
  }
}
```

Specify multiple jobs: (**since API v32**)

``` json
{
    "server": {
    "all": true
  },
  "jobs":[
    {
    "id": "[UUID]"
    },
    {
    "id": "[UUID]"
    }
  ]
}
```

**Response:**


JSON response for `uuid` specified:

``` json
{
  "takeoverSchedule": {
    "jobs": {
      "failed": [],
      "successful": [
        {
          "href": "http://dignan:4440/api/{{ $apiMinVersion }}/job/a1aa53ac-73a6-4ead-bbe4-34afbff8e057",
          "permalink": "http://dignan:4440/job/show/a1aa53ac-73a6-4ead-bbe4-34afbff8e057",
          "id": "a1aa53ac-73a6-4ead-bbe4-34afbff8e057",
          "previous-owner": "8F3D5976-2232-4529-847B-8E45764608E3"
        },
        {
          "href": "http://dignan:4440/api/{{ $apiMinVersion }}/job/116e2025-7895-444a-88f7-d96b4f19fdb3",
          "permalink": "http://dignan:4440/job/show/116e2025-7895-444a-88f7-d96b4f19fdb3",
          "id": "116e2025-7895-444a-88f7-d96b4f19fdb3",
          "previous-owner": "8F3D5976-2232-4529-847B-8E45764608E3"
        }
      ],
      "total": 2
    },
    "server": {
      "uuid": "8F3D5976-2232-4529-847B-8E45764608E3"
    }
  },
  "self": {
    "server": {
      "uuid": "C677C663-F902-4B97-B8AC-4AA57B58DDD6"
    }
  },
  "message": "Schedule Takeover successful for 2/2 Jobs.",
  "apiversion": 14,
  "success": true
}
```

JSON response for `all` specified:

``` json
{
  "takeoverSchedule": {
    "jobs": {
      ...
      "total": 2
    },
    "server": {
      "all": true
    }
  },
  "self": {
    "server": {
      "uuid": "C677C663-F902-4B97-B8AC-4AA57B58DDD6"
    }
  },
  "message": "Schedule Takeover successful for 2/2 Jobs.",
  "apiversion": 14,
  "success": true
}
```

JSON response for `project` specified:

``` json
{
  "takeoverSchedule": {
    "jobs": {
      ...
      "total": 2
    },
    "project": "My Project"
  },
  "self": {
    "server": {
      "uuid": "C677C663-F902-4B97-B8AC-4AA57B58DDD6"
    }
  },
  "message": "Schedule Takeover successful for 2/2 Jobs.",
  "apiversion": 14,
  "success": true
}
```

### List Scheduled Jobs For a Cluster Server

List the scheduled Jobs with their schedule owned by the cluster server with the specified UUID.

**Request**

    GET /api/17/scheduler/server/[UUID]/jobs

**Response**

The same format as [Listing Jobs](#listing-jobs).


### List Scheduled Jobs For this Cluster Server

List the scheduled Jobs with their schedule owned by the target cluster server.

**Request**

    GET /api/17/scheduler/jobs

**Response**

The same format as [Listing Jobs](#listing-jobs).


### Set Active Mode for a Cluster Member (Enterprise)

:::enterprise
:::

Set the Execution Mode for the target cluster member to *Active*.

If the UUID parameter matches the current cluster member, the mode will be changed immedidately, otherwise the status will be `pending`.

**Request**

`POST /api/41/enterprise/cluster/executions/enable`

URL Parameters:

`uuid`
:    UUID of Member

**Response**

`Content-Type: application/json`

```json
{
  "status": "pending",
  "executionMode": "active",
  "uuid": "a3de6030-2b7a-47e3-b46f-3e46a11a85d9"
}
```

`status`
:   `pending` indicates the request has been posted, `complete` indicates the request has taken effect already.

`executionMode`
:   The requested execution mode, either `active` or `passive`

`uuid`
:   The target cluster member UUID

### Set Passive Mode for a Cluster Member (Enterprise)

:::enterprise
:::

Set the Execution Mode for the target cluster member to *Passive*.

If the UUID parameter matches the current cluster member, the mode will be changed immedidately, otherwise the status will be `pending`.

**Request**

`POST /api/41/enterprise/cluster/executions/disable`


URL Parameters:

`uuid`
:    UUID of Member

**Response**

`Content-Type: application/json`

```json
{
  "status": "pending",
  "executionMode": "passive",
  "uuid": "a3de6030-2b7a-47e3-b46f-3e46a11a85d9"
}
```

`status`
:   `pending` indicates the request has been posted, `complete` indicates the request has taken effect already.

`executionMode`
:   The requested execution mode, either `active` or `passive`

`uuid`
:   The target cluster member UUID

## ACLs

Manage the system system ACL policy files stored in the database.

The files managed via the API **do not** include the files located on disk, however these policy files will be merged with
any policy files in the normal filesystem locations (e.g. `$RDECK_BASE/etc`).

::: tip
For Project-specific ACLs see [Project ACLs](#project-acls).
:::

For more information about ACL Policies see:

* [ACLPOLICY format][ACLPOLICY]
* [Access Control Policy](/administration/security/authorization.md)

### List System ACL Policies

**Request:**

    GET /api/{{ $apiMinVersion }}/system/acl/

**Response:**

`resources` contains a list of entries for each policy

``` json
{
  "path": "",
  "type": "directory",
  "href": "http://server/api/{{ $apiMinVersion }}/system/acl/",
  "resources": [
    {
      "path": "name.aclpolicy",
      "type": "file",
      "name": "name.aclpolicy",
      "href": "http://server/api/{{ $apiMinVersion }}/system/acl/name.aclpolicy"
    },
    ...
  ]
}
```

### Get an ACL Policy

Retrieve the YAML text of the ACL Policy file.  If YAML or text content is requested, the contents will be returned directly.
Otherwise if JSON is requested, the YAML text will be wrapped within that format.

**Request:**

    GET /api/{{ $apiMinVersion }}/system/acl/name.aclpolicy

**Response:**

`Content-Type: application/yaml` or `Content-Type: text/plain`:

``` yaml
description: "my policy"
context:
  application: rundeck
for:
  project:
    - allow: read
by:
  group: build
```

`Content-Type: application/json`:

``` json
{
  "contents": "description: \"my policy\"\ncontext:\n  application: rundeck\nfor:\n  project:\n    - allow: read\nby:\n  group: build"
}
```


### Create an ACL Policy

Use `POST` to create a policy.

**Request:**

    POST /api/{{ $apiMinVersion }}/system/acl/name.aclpolicy

If the `Content-Type` is `application/yaml` or `text/plain`, then the request body is the ACL policy contents directly.

Otherwise, you can use JSON in the same format as returned by [Get an ACL Policy](#get-an-acl-policy):

`Content-Type: application/json`

``` json
{
  "contents": "description: \"my policy\"\ncontext:\n  application: rundeck\nfor:\n  project:\n    - allow: read\nby:\n  group: build"
}

```

**Response:**

*Successful*

    201 Created

The format the response is based on the `Accept:` header, the same format as returned by [Get an ACL Policy](#get-an-acl-policy).

*Already Exists*

    409 Conflict

*Validation Failure*

    400 Bad Request

If Validation fails, the response will be `400 Bad Request`, and the body will contain a list of validation errors.
Because each [ACLPOLICY][] document can contain multiple Yaml documents, each will be listed as a separate policy.

`Content-Type: application/json`

``` json
{
  "valid": false,
  "policies": [
    {
      "policy": "file1.aclpolicy[1]",
      "errors": [
        "reason...",
        "reason2..."
      ]
    },

    {
      "policy": "file1.aclpolicy[2]",
      "errors": [
        "reason...",
        "reason2..."
      ]
    }
  ]
}

```


### Update an ACL Policy

Use `PUT` to update a policy.

**Request:**

    PUT /api/{{ $apiMinVersion }}/system/acl/name.aclpolicy

You can use Yaml or JSON in the same request format as used by [Create an ACL Policy](#create-an-acl-policy).

**Response:**

*Successful*

    200 OK

The same response format as used by [Create an ACL Policy](#create-an-acl-policy).

*Not Found*

    404 Not Found

If the policy does not exist, then a `404 Not Found` response is returned.

### Delete an ACL Policy

Delete an ACL policy file.

**Request:**

    DELETE /api/{{ $apiMinVersion }}/system/acl/name.aclpolicy

**Response:**

*Successful*

    204 No Content

*Not Found*

    404 Not Found

## Jobs

### Listing Jobs ###

List the jobs that exist for a project.

**Request:**

    GET  /api/{{ $apiMinVersion }}/project/[PROJECT]/jobs

The following parameters can also be used to narrow down the result set.

* `idlist`: specify a comma-separated list of Job IDs to include
* `groupPath`: specify a group or partial group path to include all jobs within that group path. (Default value: "*", all groups). Set to the special value "-" to match the top level jobs only
* `jobFilter`: specify a filter for the job Name. Matches any job name that contains this value.
* `jobExactFilter`: specify an exact job name to match.
* `groupPathExact`: specify an exact group path to match.  Set to the special value "-" to match the top level jobs only
* `scheduledFilter`: `true/false` specify whether to return only scheduled or only not scheduled jobs.
* `serverNodeUUIDFilter`: Value: a UUID. In cluster mode, use to select scheduled jobs assigned to the server with given UUID.
* `max`: limit the maximum amount of results to be received.
* `offset`: use in conjunction with `max` to paginate the result set.
* `tags`: specify a tag or comma separated list of tags to list Jobs that have matching tags. (e.g. `tags=tag1,tag2`)

**Note:** It is possible to disable result set pagination by setting the property `rundeck.api.paginatejobs.enabled=false` which is assumed to be true if not set.

**Note:** If neither `groupPath` nor `groupPathExact` are specified, then the default `groupPath` value of "*" will be used (matching jobs in all groups).  `groupPathExact` cannot be combined with `groupPath`.  You can set either one to "-" to match only the top-level jobs which are not within a group.

**Response**

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


### Running a Job

Run a job specified by ID.

**Request:**

    POST /api/{{ $apiMinVersion }}/job/[ID]/run
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
* `meta.KEY`: Additional extra metadata to store with the execution. Stores a metadata entry named `KEY`. (**API v32** or later).
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

### Retry a Job based on execution

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

### Exporting Jobs

Export the job definitions for in XML, YAML, or JSON formats.

**Request:**

    GET /api/{{ $apiMinVersion }}/project/[PROJECT]/jobs/export

Optional parameters:

* `format` : can be "xml" or "yaml" or "json" (API v44+) to specify the output format. Default is "json"

Alternately, specify the `Accept` header to indicate the response type:

* XML: `Accept: application/xml`
* YAML: `Accept: text/yaml`
* JSON: `Accept: application/json` (API v44+)

The following parameters can also be used to narrow down the result set.

* `idlist`: specify a comma-separated list of Job IDs to export
* `groupPath`: specify a group or partial group path to include all jobs within that group path.
* `jobFilter`: specify a filter for the job Name

**Response:**

Depending on the requested format:

* XML: [job-xml](/manual/document-format-reference/job-v20.md) format
* YAML: [job-yaml](/manual/document-format-reference/job-yaml-v12.md) format
* JSON: [job-json](/manual/document-format-reference/job-json-v44.md) format (API v44+)


### Importing Jobs ###

Import job definitions in XML, YAML, or JSON formats.

**Request:**

    POST /api/{{ $apiMinVersion }}/project/[PROJECT]/jobs/import

Request Content:

One of the following:


* `Content-Type: x-www-form-urlencoded`, with a `xmlBatch` request parameter containing the input content
* `Content-Type: multipart/form-data` multipart MIME request part named `xmlBatch` containing the content.
* `Content-Type: application/xml`, request body is the Jobs XML formatted job definition
* `Content-Type: application/yaml`, request body is the Jobs YAML formatted job definition
* `Content-Type: application/json`, request body is the Jobs JSON formatted job definition (API v44+)

Optional parameters:

* `fileformat` : can be "xml" or "yaml" or "json" (API v44+) to specify the input format, if multipart of form input is sent. Default is "json"
* `dupeOption`: A value to indicate the behavior when importing jobs which already exist.  Value can be "skip", "create", or "update". Default is "create".
* `uuidOption`: Whether to preserve or remove UUIDs from the imported jobs. Allowed values (**since V9**):
    *  `preserve`: Preserve the UUIDs in imported jobs.  This may cause the import to fail if the UUID is already used. (Default value).
    *  `remove`: Remove the UUIDs from imported jobs. Allows update/create to succeed without conflict on UUID.

**Response:**

A set of status results.  Each imported job definition will be either "succeeded", "failed" or "skipped".  These status sections contain a `count` attribute declaring how many jobs they contain.  Within each one there will be 0 or more `job` elements.


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
  "href": "http://madmartigan.local:4440/api/{{ $apiMinVersion }}/job/3b6c19f6-41ee-475f-8fd0-8f1a26f27a9a",
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

### Getting a Job Definition ###

Export a single job definition in XML, YAML, or JSON formats.

**Request:**

    GET /api/{{ $apiMinVersion }}/job/[ID]

Optional parameters:

* `format` : can be "xml" or "yaml" or "json" (API v44+) to specify the output format. Default is "json"

Alternately, specify the `Accept` header to indicate the response type:

* XML: `Accept: application/xml`
* YAML: `Accept: text/yaml`
* JSON: `Accept: application/json` (API v44+)

**Response:**

Depending on the requested format:

* XML: [job-xml](/manual/document-format-reference/job-v20.md) format
* YAML: [job-yaml](/manual/document-format-reference/job-yaml-v12.md) format
* JSON: [job-json](/manual/document-format-reference/job-json-v44.md) format (API v44+)


### Deleting a Job Definition ###

Delete a single job definition.

**Request:**

    DELETE /api/{{ $apiMinVersion }}/job/[ID]

**Response:**

    204 No Content

### Bulk Job Delete ###

Delete multiple job definitions at once.

**Request:**

Both of the following are valid options for doing a bulk delete of jobs. However, if you are hoping to pass a body with the request, then you must use the POST method since the DELETE method does not allow for request bodies.

    DELETE /api/{{ $apiMinVersion }}/jobs/delete
    POST /api/{{ $apiMinVersion }}/jobs/delete


Either Query parameters:

* `ids`: The Job IDs to delete, can be specified multiple times
* `idlist`: The Job IDs to delete as a single comma-separated string.

Or JSON content:

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

### Enable Executions for a Job

Enable executions for a job. (ACL requires `toggle_execution` action for a job.)

**Request:**

    POST /api/{{ $apiMinVersion }}/job/[ID]/execution/enable

**Response:**


```json
{"success":true}
```

### Disable Executions for a Job

Disable all executions for a job (scheduled or manual). (ACL requires `toggle_execution` action for a job.)

**Request:**

    POST /api/{{ $apiMinVersion }}/job/[ID]/execution/disable

**Response:**

(See [Enable Executions for a Job](#enable-executions-for-a-job).)

### Enable Scheduling for a Job

Enable the schedule for a job. (ACL requires `toggle_schedule` action for a job.)

**Request:**

    POST /api/{{ $apiMinVersion }}/job/[ID]/schedule/enable

**Response:**

(See [Enable Executions for a Job](#enable-executions-for-a-job).)

### Disable Scheduling for a Job

Disable the schedule for a job. (ACL requires `toggle_schedule` action for a job.)

**Request:**

    POST /api/{{ $apiMinVersion }}/job/[ID]/schedule/disable

**Response:**

(See [Enable Executions for a Job](#enable-executions-for-a-job).)

### Bulk Toggle Job Execution

Toggle whether executions are enabled for a set of jobs. (ACL requires `toggle_execution` action for each job.)

Executions will be enabled or disabled, depending on the URL used:

**Request:**

    POST /api/{{ $apiMinVersion }}/jobs/execution/enable
    POST /api/{{ $apiMinVersion }}/jobs/execution/disable

Query parameters:

* `ids`: The Job IDs to delete, can be specified multiple times
* `idlist`: The Job IDs to delete as a single comma-separated string.

Or JSON content:

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

* `id` attribute - the Job ID
* `error` sub-element - result error message for the request
* `errorCode` attribute - a code indicating the type of failure, currently one of `failed`, `unauthorized` or `notfound`.

### Bulk Toggle Job Schedules

Toggle whether schedules are enabled for a set of jobs. (ACL requires `toggle_schedule` action for each job.)

Schedules will be enabled or disabled, depending on the URL used:

**Request:**

    POST /api/{{ $apiMinVersion }}/jobs/schedule/enable
    POST /api/{{ $apiMinVersion }}/jobs/schedule/disable

Query parameters:

* `ids`: The Job IDs to delete, can be specified multiple times
* `idlist`: The Job IDs to delete as a single comma-separated string.

Or JSON content:

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


* `id` attribute - the Job ID
* `error` sub-element - result error message for the request
* `errorCode` attribute - a code indicating the type of failure, currently one of `failed`, `unauthorized` or `notfound`.

### Get Job Metadata

Get metadata about a specific job.

**Request:**

    GET /api/18/job/[ID]/info

**Response:**


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

### Upload a File for a Job Option

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


``` json
{
  "total": $total,
  "options": {
    "$optionName": "$fileKey"
  }
}
```

#### Example

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

### List Files Uploaded for a Job

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


### Get Info About an Uploaded File

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


### Get Job Forecast

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

**Since v48**:

Includes average duration in the response.

**Response:**


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
    "averageDuration": "[timestamp]",
    "name": "[name]"
}
```

### Get Job Workflow
Get the workflow tree for a job. It will traverse referenced jobs to a depth of 3.

**Request:**

    GET /api/33/job/[ID]/workflow

**Response:**

`Content-Type: application/json`:

```json
{
    "workflow": [
        {
            "description": "[description]",
            "exec": "[exec]",
            "script": "[script]",
            "scriptfile": "[scriptfile]",
            "scripturl": "[scripturl]",
            "jobRef": {
                "name": "[name]",
                "group": "[group]",
                "uuid": "[uuid]",
                "nodeStep": "[nodeStep]",
                "importOptions": "[importOptions]"
            },
            "jobId": "[jobId]",
            "type": "[type]",
            "nodeStep": "true|false",
            "workflow": "[workflow]"
        }
    ]
}
```

**Workflow Step Fields**
* `description`: Present and set to workflow step description if configured
* `exec`: If command step field is present and set to command string; otherwise
* `script`: Present and set to `"true"` if script step
* `scriptfile`: Present and set to file path if `scriptfile` step
* `scripturl`: If `scripturl` step field is present and set to URL if step
* `jobRef`: Present if step is a job reference
* `jobId`: If step is a job reference field is present and contains the referenced
jobs ID
* `type`: For plugin steps present and set to step plugin type
* `nodeStep`: Present if `type` is present and set to `"true"` or `"false"` to indicate
if the step is a node step. Implicitly `"true"` if not present and not a job step.
* `workflow`: If step is a job reference contains the sub-workflow

### Get Job UI Metadata

Get metadata for a specific job.

Authorization required: `read` or `view` for the Job.

Since: v46

**Request:**

    GET /api/46/job/[ID]/meta

Request parameters:

* `meta` - Comma-separated list of metadata item names to include, or "*" for all (default)

**Response:**

```json
[
  {
    "name":"name",
    "data":{ ... }
  },

  {
    "name":"name2",
    "data":{ ... }
  },
]
```

### Get Job Tags (Enterprise)

::: enterprise  
:::

Returns the list of tags for a job.

Requires Authorization: `read` or `view` for the Job

Since: v46

**Request:**

    GET /api/46/job/[ID]/tags

**Response:**

```json
[
  "taga",
  "tagb"
]
```


## Executions

### Getting Executions for a Job

Get the list of executions for a Job.

**Request:**

    GET /api/{{ $apiMinVersion }}/job/[ID]/executions

Optional Query Parameters:

* `status`: the status of executions you want to be returned.  Must be one of "succeeded", "failed", "aborted", or "running".  If this parameter is blank or unset, include all executions.
* Paging parameters:
    * `max`: indicate the maximum number of results to return. If unspecified, all results will be returned.
    * `offset`: indicate the 0-indexed offset for the first result to return.

**Response:**

See [Listing Running Executions](#listing-running-executions).

### Delete all Executions for a Job

Delete all executions for a Job.

**Request:**

    DELETE /api/12/job/[ID]/executions

**Response:**

The same format as [Bulk Delete Executions](#bulk-delete-executions).

### Listing Running Executions

List the currently running executions for a project

**Request:**

    GET /api/{{ $apiMinVersion }}/project/[PROJECT]/executions/running

Note: `PROJECT` is the project name, or use `*` for all projects.

Optional Query Parameters:

* `jobIdFilter`: Specifies a Job ID, the results will only contain running executions for the given job. **Since API v32**

**Response:**

It contains a `paging` entry with paging information, and an `executions` entry with execution information:

``` json
{
  "paging": {
    "count": 2,
    "total": 2,
    "offset": 0,
    "max": 20
  },
  "executions":
    {
      "id": 387,
      "href": "[API url]",
      "permalink": "[GUI url]",
      "status": "[status]",
      "customStatus": "[string]",
      "project": "test",
      "user": "[user]",
      "serverUUID":"[UUID]",
      "date-started": {
        "unixtime": 1431536339809,
        "date": "2015-05-13T16:58:59Z"
      },
      "date-ended": {
        "unixtime": 1431536346423,
        "date": "2015-05-13T16:59:06Z"
      },
      "job": {
        "id": "7400ff98-31c4-4834-ba3d-aee9646e867f",
        "averageDuration": 6094,
        "name": "test job",
        "group": "api-test/job-run-steps",
        "project": "test",
        "description": "",
        "href": "[API url]",
        "permalink": "[GUI url]",
        "options": {
          "opt2": "a",
          "opt1": "testvalue"
        }
      },
      "description": "echo hello there [... 5 steps]",
      "argstring": "-opt1 testvalue -opt2 a",
      "successfulNodes": [
        "madmartigan.local"
      ]
    },
    ...
}

```

The `[status]` value indicates the execution status.  It is one of:

* `running`: execution is running
* `succeeded`: execution completed successfully
* `failed`: execution completed with failure
* `aborted`: execution was aborted
* `timedout`: execution timed out
* `failed-with-retry`: execution failed and will retry
* `scheduled`: execution is scheduled to run in the future
* `other`: execution had a custom exit status string

If `status` is `other`, then, `customStatus` will contain the exit status.

The `[url]` value for the `href` is a URL the Rundeck API for the execution.
The `[url]` value for the `permalink` is a URL to the Rundeck server page to view the execution output.

`[user]` is the username of the user who started the execution.

`[unixtime]` is the millisecond unix timestamp, and `[datetime]` is a W3C dateTime string in the format "yyyy-MM-ddTHH:mm:ssZ".

If known, the average duration of the associated Job will be indicated (in milliseconds) as `averageDuration`. (Since API v5)

**API v9 and above**: `project="[project]"` is the project name of the execution.

`successfulNodes` and `failedNodes` list the names of nodes which succeeded or failed. **API v10 and above**.

The `job` section contains `options` if an `argstring` value is set (**API v10 and above**).  Inside `options` is a sequence of `<option>` elements with two attributes:

* `name` the parsed option name
* `value` the parsed option value

**Since API v13**: The `serverUUID` will indicate the server UUID
if executed in cluster mode.

### Execution Info

Get the status for an execution by ID.

**Request:**

    GET /api/{{ $apiMinVersion }}/execution/[ID]

**Response:**

With `Content-Type: application/json`, a single object:

``` json
{
  "id": X,
  "href": "[url]",
  "permalink": "[url]",
  "status": "succeeded/failed/aborted/timedout/retried/other",
  "project": "[project]",
  "user": "[user]",
  "date-started": {
    "unixtime": 1431536339809,
    "date": "2015-05-13T16:58:59Z"
  },
  "date-ended": {
    "unixtime": 1431536346423,
    "date": "2015-05-13T16:59:06Z"
  },
  "job": {
    "id": "[uuid]",
    "href": "[url]",
    "permalink": "[url]",
    "averageDuration": 6094,
    "name": "[name]",
    "group": "[group]",
    "project": "[project]",
    "description": "",
    "options": {
      "opt2": "a",
      "opt1": "testvalue"
    }
  },
  "description": "echo hello there [... 5 steps]",
  "argstring": "-opt1 testvalue -opt2 a",
  "successfulNodes": [
    "nodea","nodeb"
  ],
  "failedNodes": [
    "nodec","noded"
  ]
}
```

### List Input Files for an Execution

List input files used for an execution.

**Request:**

    GET /api/19/execution/[ID]/input/files

**Response:**

```json
{
  "files": [
    {
      "id": "382c7596-435b-4103-8781-6b32fbd629b2",
      "user": "admin",
      "fileState": "deleted",
      "sha": "9284ed4fd7fe1346904656f329db6cc49c0e7ae5b8279bff37f96bc6eb59baad",
      "jobId": "7b3fff59-7a2d-4a31-a5b2-dd26177c823c",
      "dateCreated": "2017-02-24T23:26:48Z",
      "serverNodeUUID": "3425B691-7319-4EEE-8425-F053C628B4BA",
      "fileName": null,
      "size": 12,
      "expirationDate": "2017-02-24T23:27:18Z",
      "execId": 2837
    }
  ]
}
```
### Delete an Execution

Delete an execution by ID.

**Request:**

    DELETE /api/12/execution/[ID]

**Response:**

`204 No Content`

*Authorization requirement*:

* Requires the `delete_execution` action allowed for a `project` in the `application` context. See: [Administration - Access Control Policy - Application Scope Resources and Actions](/administration/security/authorization.md#application-scope-resources-and-actions)

### Bulk Delete Executions

Delete a set of Executions by their IDs.

**Request:**

    POST /api/12/executions/delete

The IDs can be specified in two ways:

1. Using a URL parameter `ids`, as a comma separated list, with no body content

        POST /api/12/executions/delete?ids=1,2,17
        Content-Length: 0

2. Using a request body of JSON data.

If using a request body, the formats are specified below:


``` json
{"ids": [ 1, 2, 17 ] }
```

*OR* more simply:

``` json
[ 1, 2, 17 ]
```

Response:


``` json
{
  "failures": [
    {
      "id": "82",
      "message": "Not found: 82"
    },
    {
      "id": "83",
      "message": "Not found: 83"
    },
    {
      "id": "84",
      "message": "Not found: 84"
    }
  ],
  "failedCount": 3,
  "successCount": 2,
  "allsuccessful": false,
  "requestCount": 5
}
```

The JSON fields will be:

* `failures`: a list of objects indicating the `id` and `message` for the failed deletion attempt
* `failedCount`: number of deletion attempts that failed
* `successCount`: number of deletion attempts that succeeded
* `allsuccessful`: true if all deletions were successful
* `requestCount`: number of requested execution deletions

### Execution Query

Query for Executions based on Job or Execution details.

**Request:**

    GET /api/{{ $apiMinVersion }}/project/[PROJECT]/executions

The following parameters can also be used to narrow down the result set.

* `statusFilter`: execution status, one of "running", succeeded", "failed" or "aborted"
* `abortedbyFilter`: Username who aborted an execution
* `userFilter`: Username who started the execution
* Date query parameters:
    * `recentFilter`: Use a simple text format to filter executions that completed within a period of time. The format is "XY" where X is an integer, and "Y" is one of:
        * `s`: second
        * `n`: minute
        * `h`: hour
        * `d`: day
        * `w`: week
        * `m`: month
        * `y`: year

        So a value of `2w` would return executions that completed within the last two weeks.
    * `olderFilter`: (same format as `recentFilter`) return executions that completed before the specified relative period of time.  E.g. a value of `30d` returns executions older than 30 days.
    * `begin`: Specify exact date for earliest execution completion time
    * `end`: Specify exact date for latest execution completion time
* `adhoc`: "true/false", if true, include only Adhoc executions, if false return only Job executions. By default any matching executions are returned, however if you use any of the Job filters below, then only Job executions will be returned.

The format for the `end`, and `begin` filters is either:  a unix millisecond timestamp, or a W3C dateTime string in the format "yyyy-MM-ddTHH:mm:ssZ".

Parameters for querying for Executions for particular jobs:

* `jobIdListFilter`: specify a Job ID to include, can be specified multiple times
* `excludeJobIdListFilter`: specify a Job ID to exclude, can be specified multiple times
* `jobListFilter`: specify a full Job group/name to include, can be specified multiple times
* `excludeJobListFilter`: specify a full Job group/name to exclude, can be specified multiple times
* `groupPath`: specify a group or partial group path to include all jobs within that group path. Set to the special value "-" to match the top level jobs only.
* `groupPathExact`: specify an exact group path to match.  Set to the special value "-" to match the top level jobs only.
* `excludeGroupPath`: specify a group or partial group path to exclude all jobs within that group path. Set to the special value "-" to match the top level jobs only.
* `excludeGroupPathExact`: specify an exact group path to exclude.  Set to the special value "-" to match the top level jobs only.
* `jobFilter`: specify a filter for the job Name. Include any job name that matches this value.
* `excludeJobFilter`: specify a filter for the job Name. Exclude any job name that matches this value.
* `jobExactFilter`: specify an exact job name to match.
* `excludeJobExactFilter`: specify an exact job name to exclude.
* `executionTypeFilter`: specify the execution type, one of: `scheduled` (schedule trigger), `user` (user trigger), `user-scheduled` (user scheduled trigger)(*since v20*)

The format for the `jobListFilter` and `excludeJobListFilter` is the job's group and name separated by a '/' character, such as: "group1/job name", or "my job" if there is no group.

Paging parameters:

* `max`: maximum number of results to include in response. (default: 20)
* `offset`: offset for first result to include. (default: 0)

**Response**

See [Listing Running Executions](#listing-running-executions).

### Execution Query Metrics

Obtain metrics over the result set of an execution query. The query can be issued over all executions on the system, or over the executions of a single project depending on the variant used.

**Request:**

    GET /api/29/executions/metrics
    GET /api/29/project/[PROJECT]/executions/metrics

To narrow down the result set over which the metrics will be calculated, you can use the same parameters as [Execution Query](#execution-query).

Paging parameters `max` and `offset` will have no effect on the result.

**Response**


An object with `duration` entry containing duration stats, and a `total` entry with total executions.

``` json
{
    "duration": {
        "average": "0s",
        "min": "0s",
        "max": "39s"
    },
    "total": 1325,
}
```


### Execution State

Get detail about the node and step state of an execution by ID. The execution can be currently running or completed.

**Request:**

    GET /api/{{ $apiMinVersion }}/execution/[ID]/state

Specify expected output format with the `Accept: ` HTTP header. Supported formats:

* `application/json`

The content of the response contains state information for different parts of the workflow:

* overall state
* per-node overall state
* per-step node state

A workflow can have a step which consists of a sub-workflow, so each particular step has a "Step Context Identifier" which defines its location in the workflow(s), and looks something like "1/5/2". Each number identifies the step number (starting at 1) at a workflow level. If there is a "/" in the context identifier, it means there are sub-workflow step numbers, and each preceding number corresponds to a step which has a sub-workflow.

To identify the state of a particular node at a particular step, both a Node name, and a Step Context Identifier are necessary.

In the result set returned by this API call, state information is organized primarily by Step and is structured in the same way as the workflow.  This means that sub-workflows will have nested state structures for their steps.

The state information for a Node will not contain the full set of details for the Step and Node, since this information is present in the workflow structure which contains the step state.

#### State Result Content

The result set contains this top-level structure:

* general overall state information
    - `startTime` execution start time (see *Timestamp format* below)
    - `endTime` execution end time if complete
    - `updateTime` last update time
    - `executionState` overall execution state
* `allNodes` contains a *Node Name List* (see below) of nodes known to be targeted in some workflow
* `nodes` contains an *Overall Node State List* of per-node step states
* `serverNode` name of the server node
* `executionId` current execution ID
* `completed` true/false whether the execution is completed
* A *Workflow Section* (see below)

**Workflow Section**

Each Workflow Section within the result set will contain these structures

* `stepCount` Number of steps in the workflow
* `targetNodes` contains a Node Name List identifying the target nodes of the current workflow
* `steps` contains a *Step State List* (see below) of information and state for each step

**Node Name List**

Consists of a sequence of node name entries, identifying each entry by a name.

In JSON, an array of node names.

**Overall Node State List**

Consists of a sequence of entries for each Node. Each entry contains

* `name` node name
* `steps` list of simple state indicator for steps executed by this node

State Indicators:

* `stepctx` Step Context Identifier
* `executionState` execution state for this step and node


In JSON: an object where each key is a node name, and the value is an array of State indicators.  A state indicator is an object with two keys, `stepctx` and `executionState`

``` json
{
    "abc": [
      {
        "executionState": "SUCCEEDED",
        "stepctx": "1"
      },
      {
        "executionState": "SUCCEEDED",
        "stepctx": "2/1"
      }
    ]
}
```

**Step State List**

A list of Step State information.  Each step is identified by its number in the workflow (starting at 1) and its step context

* `id` the step number (JSON)
* `stepctx` the step context identifier in the workflow
* general overall state information for the step
    - `startTime` execution start time
    - `endTime` execution end time if complete
    - `updateTime` last update time
    - `executionState` overall execution state
* `nodeStep` true/false. true if this step directly targets each node from the targetNodes list.  If true, this means the step will contain a `nodeStates` section
* `nodeStates` a *Node Step State Detail List* (see below) for the target nodes if this is a node step.
* `hasSubworkflow` true/false. true if this step has a sub-workflow and a `workflow` entry
* `workflow` this section contains a Workflow Section

**Node Step State Detail List**

A sequence of state details for a set of Nodes for the containing step. Each entry will contain:

* `name` the node name
* state information for the Node
    - `startTime` execution start time
    - `endTime` execution end time if complete
    - `updateTime` last update time
    - `executionState` overall execution state


In JSON: an object with node names as keys.  Values are objects containing the state information entries.

``` json
{
    "abc": {
      "executionState": "SUCCEEDED",
      "endTime": "2014-01-13T20:38:31Z",
      "updateTime": "2014-01-13T20:38:31Z",
      "startTime": "2014-01-13T20:38:25Z"
    }
}
```


**Full JSON example**

``` json
{
  "completed": true,
  "executionState": "SUCCEEDED",
  "endTime": "2014-01-13T20:38:36Z",
  "serverNode": "dignan",
  "startTime": "2014-01-13T20:38:25Z",
  "updateTime": "2014-01-13T20:38:36Z",
  "stepCount": 2,
  "allNodes": [
    "dignan"
  ],
  "targetNodes": [
    "dignan"
  ],
  "nodes": {
    "dignan": [
      {
        "executionState": "SUCCEEDED",
        "stepctx": "1"
      },
      {
        "executionState": "SUCCEEDED",
        "stepctx": "2/1"
      }
    ]
  },
  "executionId": 134,
  "steps": [
    {
      "executionState": "SUCCEEDED",
      "endTime": "2014-01-13T20:38:31Z",
      "nodeStates": {
        "dignan": {
          "executionState": "SUCCEEDED",
          "endTime": "2014-01-13T20:38:31Z",
          "updateTime": "2014-01-13T20:38:31Z",
          "startTime": "2014-01-13T20:38:25Z"
        }
      },
      "updateTime": "2014-01-13T20:38:25Z",
      "nodeStep": true,
      "id": "1",
      "startTime": "2014-01-13T20:38:25Z"
    },
    {
      "workflow": {
        "completed": true,
        "startTime": "2014-01-13T20:38:31Z",
        "updateTime": "2014-01-13T20:38:36Z",
        "stepCount": 1,
        "allNodes": [
          "dignan"
        ],
        "targetNodes": [
          "dignan"
        ],
        "steps": [
          {
            "executionState": "SUCCEEDED",
            "endTime": "2014-01-13T20:38:36Z",
            "nodeStates": {
              "dignan": {
                "executionState": "SUCCEEDED",
                "endTime": "2014-01-13T20:38:36Z",
                "updateTime": "2014-01-13T20:38:36Z",
                "startTime": "2014-01-13T20:38:31Z"
              }
            },
            "updateTime": "2014-01-13T20:38:31Z",
            "nodeStep": true,
            "id": "1",
            "startTime": "2014-01-13T20:38:31Z"
          }
        ],
        "endTime": "2014-01-13T20:38:36Z",
        "executionState": "SUCCEEDED"
      },
      "executionState": "SUCCEEDED",
      "endTime": "2014-01-13T20:38:36Z",
      "hasSubworkflow": true,
      "updateTime": "2014-01-13T20:38:36Z",
      "nodeStep": false,
      "id": "2",
      "startTime": "2014-01-13T20:38:31Z"
    }
  ]
}
```

**Timestamp format:**

The timestamp format is ISO8601: `yyyy-MM-dd'T'HH:mm:ss'Z'`

**Execution states:**

* `WAITING` - Waiting to start running
* `RUNNING` - Currently running
* `RUNNING_HANDLER` - Running error handler\*
* `SUCCEEDED` - Finished running successfully
* `FAILED` - Finished with a failure
* `ABORTED` - Execution was aborted
* `NODE_PARTIAL_SUCCEEDED` - Partial success for some nodes\*
* `NODE_MIXED` - Mixed states among nodes\*
* `NOT_STARTED` - After waiting the execution did not start\*

\* these states only apply to steps/nodes and do not apply to the overall execution or workflow.

### Execution Output

Get the output for an execution by ID.  The execution can be currently running or may have already completed. Output can be filtered down to a specific node or workflow step.

**Request:**

    GET /api/{{ $apiMinVersion }}/execution/[ID]/output
    GET /api/{{ $apiMinVersion }}/execution/[ID]/output/node/[NODE]
    GET /api/{{ $apiMinVersion }}/execution/[ID]/output/node/[NODE]/step/[STEPCTX]
    GET /api/{{ $apiMinVersion }}/execution/[ID]/output/step/[STEPCTX]

The log output for each execution is stored in a file on the Rundeck server, and this API endpoint allows you to retrieve some or all of the output, in several possible formats: json, and plain text.  When retrieving the plain text output, some metadata about the log is included in HTTP Headers.  JSON output format includes metadata about each output log line, as well as metadata about the state of the execution and log file, and your current index location in the file.

Output can be selected by Node or Step Context or both.

Several parameters can be used to retrieve only part of the output log data.  You can use these parameters to more efficiently retrieve the log content over time while an execution is running.

The log file used to store the execution output is a formatted text file which also contains metadata about each line of log output emitted during an execution.  Several data values in this API endpoint refer to "bytes", but these do not reflect the size of the final log data; they are only relative to the formatted log file itself.  You can treat these byte values as opaque locations in the log file, but you should not try to correlate them to the actual textual log lines.

Optional Parameters:

* `offset`: byte offset to read from in the file. 0 indicates the beginning.
* `lastlines`: number of lines to retrieve from the end of the available output. If specified it will override the `offset` value and return only the specified number of lines at the end of the log.
* `lastmod`: epoch datestamp in milliseconds, return results only if modification changed since the specified date OR if more data is available at the given `offset`
* `maxlines`: maximum number of lines to retrieve forward from the specified offset.
* `compacted`: `true/false`, (API v21+), if true, results will be in *compacted form* (see below).

**Response:**

The output content in the requested format, see [Output Content](#output-content).

#### Tailing Output

To "tail" the output from a running execution, you will need to make a series of requests to this API endpoint, and update the `offset` value that you send to reflect the returned `dataoffset` value that you receive.  This gives you a consistent pointer into the output log file.

When starting these requests, there are two mechanisms you can use:

1. Start at the beginning, specifying either a `lastmod` or a `offset` of 0
2. Start at the end, by using `lastlines` to receive the last available set of log lines.

After your first request you will have the `dataoffset` and `lastmod` response values you can use to continue making requests for subsequent log output. You can choose several ways to do this:

1. Use the `offset` and `lastmod` parameters to indicate modification time and receive as much output as is available
2. Use the `offset` and `maxlines` parameter to specify a maximum number of log entries
3. Use only the `offset` parameter and receive as much output as is available.

After each request, you will update your `offset` value to reflect the `dataoffset` in the response.

All log output has been read when the `iscompleted` value is "true".

Below is some example pseudo-code for using this API endpoint to follow the output of a running execution "live":

* set offset to 0
* set lastmod to 0
* Repeat until `iscompleted` response value is "true":
    * perform request sending `offset` and `lastmod` parameters
    * print any log entries, update progress bar, etc.
    * Record the resulting `dataoffset` and `lastmod` response values for the next request
    * if `unmodified` is "true", sleep for 5 seconds
    * otherwise sleep for 2 seconds

**Authorization:**

This endpoint requires that the user have 'read' access to the Job or to Adhoc executions to retrieve the output content.

#### Output Format Using the URL

Specifying an output format can occur in several ways.  The simplest ways are to include the format in the URL, either by including a `format` URL parameter, or an extension on the request URL.

When using a URL format, use one of these values for the format:

* `json`
* `text`

To use a URL parameter, add a `?format=` parameter to your request.

E.g.:

    GET /api/{{ $apiMinVersion }}/execution/3/output?format=json

To use a URL extension, add a ".[format]" to the end of the URL, but prior to any URL parameters.

E.g.:

    GET /api/{{ $apiMinVersion }}/execution/3/output.json?offset=120

#### Output Format using Accept Header

You can also specify the format using Content Negotiation techniques by including an `Accept` header in your request, and specifying a valid MIME-type to represent one of the formats:

* For JSON, `application/json` or `text/json`
* For plain text, `text/plain`

E.g.:

    GET /api/{{ $apiMinVersion }}/execution/3/output
    Accept: */json

#### Output Content

The result will contain a set of data values reflecting the execution's status, as well as the status and read location in the output file.

Entries:

* `id`: ID of the execution
* `message`: optional text message indicating why no entries were returned
* `error`: optional text message indicating an error case
* `unmodified`: true/false, (optional) "true" will be returned if the `lastmod` parameter was used and the file had not changed
* `empty`: true/false, (optional) "true" will be returned if the log file does not exist or is empty, which may occur if the log data is requested before any output has been stored.
* `offset`: Byte offset to read for the next set of data
* `completed`: true/false, "true" if the current log entries or request parameters include all of the available data
* `execCompleted`: true/false, "true" if the execution has completed.
* `hasFailedNodes`: true/false, "true" if the execution has recorded a list of failed nodes
* `execState`: execution state, one of "running","succeeded","failed","aborted"
* `lastModified`: (long integer), millisecond timestamp of the last modification of the log file
* `execDuration`: (long integer), millisecond duration of the execution
* `percentLoaded`: (float), (optional) percentage of the output which has been loaded by the parameters to this request
* `totalSize`: (integer), total bytes available in the output file
* `filter` - if a `node` or `step` filter was used
    - `nodename` - value of the node name filter
    - `stepctx` - value of the step context filter
* `compacted`: `true` if compacted form was requested and is used in the response (API v21+)
* `compactedAttr`: name of JSON log entry key used by default for fully compacted entries (API v21+)

Each log entry will be included in a section called `entries`.

* `entries` will contain an array of Objects, each containing the following format

Content of each Log Entry:

* `time`: Timestamp in format: "HH:MM:SS"
* `absolute_time`: Timestamp in format: "yyyy-MM-dd'T'HH:mm:ssZ"
* `level`: Log level, one of: ERROR,WARN,NORMAL,VERBOSE,DEBUG,OTHER
* `log`: The log message
* `user`: User name
* `command`: Workflow command context string
* `node`: Node name
* `stepctx`: The step context such as `1` or `1/2/3`
* `metadata`: Map of extra metadata for the entry (API v43+)


##### Log Entries in Compacted Form (API v21+)

As of API v21, you can specify `compacted=true` in the URL parameters, which will send the Output Content in "compacted" form. This will be indicated by the `compacted`=`true` value in
the result data.

In this mode, Log Entries are compacted by only including the changed values from the
previous Log Entry in the list.  The first Log Entry in the results will always have complete information.  Subsequent entries may include only changed values.

In JSON format, if the `compactedAttr` value is `log` in the response data, and only the `log` value changed relative to a previous Log Entry, the Log Entry may consist only of the log message string. That is, the array entry will be a string, not a hash.

When no values changed from the previous Log Entry, the Log Entry will be an empty hash.

When an entry value is not present in the subsequent Log Entry, but was present in the previous
one, in JSON this will be represented with a `null` value.

Example (JSON):

In this example, four log entries are included. The first includes all Log Entry fields.
The second is only a String, indicating only `log` value changed.
The third is an empty hash, indicating the previous Log Entry was repeated identically.
The fourth specifies a new value for `stepctx` and `log` and `level` to use.
The fifth specifies a `node` and `stepctx` of `null`: indicating the `node` and `stepctx` values should be removed for
this Log Entry.

```json
{
  "id": 1,
  ... (snip) ...
  "compacted": "true",
  "compactedAttr": "log",
  "entries": [
    {
      "time": "17:00:00",
      "absolute_time": "1970-01-02T01:00:00Z",
      "level": "NORMAL",
      "log": "This is the first log message",
      "user": "bob",
      "node": "anode1",
      "stepctx": "1"
    },
    "This is the second log message",
    {},
    {
      "stepctx": "2",
      "level": "DEBUG",
      "log": "This is the fourth log message"
    },
    {
      "stepctx": null,
      "log": "This is the fifth log message",
      "node": null
    }
  ]
}
```

#### Text Format Content

For the plain text format, the content of the response will simply be the log output lines at the chosen offset location.

Included in the response will be some HTTP headers that provide the metadata about the output location. Some headers may not be present, depending on the state of the response. See the [Output Content](#output-content) section for descriptions of the content and availability of the values:

* `X-Rundeck-ExecOutput-Error`: The `error` field
* `X-Rundeck-ExecOutput-Message`: The `message` field
* `X-Rundeck-ExecOutput-Empty`: The `empty` field
* `X-Rundeck-ExecOutput-Unmodified`: The `unmodified` field
* `X-Rundeck-ExecOutput-Offset`: The `offset` field
* `X-Rundeck-ExecOutput-Completed`: The `completed` field
* `X-Rundeck-Exec-Completed`: The `execCompleted` field
* `X-Rundeck-Exec-State`: The `execState` field
* `X-Rundeck-Exec-Duration`: the `execDuration` field
* `X-Rundeck-ExecOutput-LastModifed`: The `lastModified` field
* `X-Rundeck-ExecOutput-TotalSize`: The `totalSize` field

### Execution Output with State

Get the metadata associated with workflow step state changes along with the log output, optionally excluding log output.

**Request:**

    GET /api/{{ $apiMinVersion }}/execution/[ID]/output/state
    GET /api/{{ $apiMinVersion }}/execution/[ID]/output/state?stateOnly=true

This API endpoint provides the sequential log of state changes for steps and nodes, optionally interleaved with the actual log output.

**Response:**

The output format is the same as [Execution Output](#execution-output), with this change:

* in the `entries` section, each entry will have a `type` value indicating the entry type
    - `log` a normal log entry
    - `stepbegin` beginning of the step indicated by the `stepctx`
    - `stepend` finishing of the step
    - `nodebegin` beginning of execution of a node for the given step
    - `nodeend` finishing of execution of a node for the given step
* metadata about the entry may be included in the entry

### Aborting Executions

Abort a running execution by ID.

**Request:**

    GET /api/{{ $apiMinVersion }}/execution/[ID]/abort

Optional Parameters:

* `asUser` : specifies a username identifying the user who aborted the execution. Requires `runAs` permission.
* `forceIncomplete`: if `true`, forces a running execution to be marked as "incomplete".

**Response:**


``` json
{
  "abort": {
    "status": "[abort-state]",
    "reason": "[reason]"
  },
  "execution": {
    "id": "[id]",
    "status": "[execution status]",
    "href": "[API href]",
  }
}
```

The `[abort-state]` will be one of: "pending", "failed", or "aborted".

If the `[abort-state]` is "failed", then `[reason]` will be a textual description of the reason.



### Check Execution Result Data Availability [Enterprise]

::: enterprise  
:::

Check whether the execution has Result Data created by a Job using the [Result Data feature](/manual/execution-lifecycle/result-data.html).

**Request:**

    GET /api/40/execution/[ID]/result/dataAvailable

**Response:**

* `404 Not found` - no data can be retrieved for the Execution

Successful response:

```json
{
  "loadable": true,
  "message": "OK"
}
```

### Get Execution Result Data [Enterprise]

::: enterprise  
:::


Retrieve the Result Data created by a Job using the [Result Data feature](/manual/execution-lifecycle/result-data.html) in JSON format.

:::tip
In a Rundeck Cluster, Result Data may not be locally available and must be retrieved by the server asynchronously before it can be returned.

You can handle this situation in two ways: either use the `wait=true` URL parameter, to indicate that the API request should block until the data is retrieved (waiting up to 10 seconds), or if the response has HTTP status `202` it means that the asynchronous request was started but has not completed yet and you can retry the same API request shortly.
:::

**Request:**

    GET /api/40/execution/[ID]/result/data

Optional Query Parameters:

* `wait`: true/false - if true and the data is not immediately available, the response will wait until the data is retrieved, or a timeout occurs. Otherwise the response may return 202 status if data must be retrieved first.

**Responses:**

* `404 Not Found` - data was not available
* `202 Accepted` - request was accepted but not fulfilled. This indicates the data will be retrieved asynchronously before it can be made available. Retry the request later to retrieve the data. See also: the `wait` parameter.

Sucessful response:

```
200 OK
Content-Type: application/json

...JSON data...
```


## Adhoc

### Running Adhoc Commands

Run a command string.

**Request:**

    GET /api/{{ $apiMinVersion }}/project/[PROJECT]/run/command
    POST /api/{{ $apiMinVersion }}/project/[PROJECT]run/command

The necessary content can be supplied as request Parameters:

* `exec`: the shell command string to run, e.g. "echo hello". (required)
* `nodeThreadcount`: threadcount to use (optional)
* `nodeKeepgoing`: if "true", continue executing on other nodes even if some fail. (optional)
* `asUser` : specifies a username identifying the user who ran the command. Requires `runAs` permission. (optional)

Node filter parameters as described under [Using Node Filters](#using-node-filters)

Or the request can be `Content-type: application/json`:

``` json
{
    "project":"[project]",
    "exec":"[exec]",
    "nodeThreadcount": #threadcount#,
    "nodeKeepgoing": true/false,
    "asUser": "[asUser]",
    "filter": "[node filter string]"
}
```

**Response:**

``` json
{
  "message": "Immediate execution scheduled (X)",
  "execution": {
    "id": X,
    "href": "[API Href]",
    "permalink": "[GUI Href]"
  }
}
```

### Running Adhoc Scripts

Run a script.

**Request:**

    POST /api/{{ $apiMinVersion }}/project/[PROJECT]/run/script

Request Content:

The script file content can be submitted either as a form request or multipart attachment with request parameters, or can be a json document.

For Content-Type: `application/x-www-form-urlencoded`

* `scriptFile`: A `x-www-form-urlencoded` request parameter containing the script file content.

For Content-Type: `multipart/form-data`

* `scriptFile`: the script file contents (`scriptFile` being the `name` attribute of the `Content-Disposition` header)

Parameters:

* `argString`: Arguments to pass to the script when executed.
* `nodeThreadcount`: threadcount to use
* `nodeKeepgoing`: if "true", continue executing on other nodes even if some fail.
* `asUser` : specifies a username identifying the user who ran the script. Requires `runAs` permission.
* `scriptInterpreter`: a command to use to run the script (*since version 8*)
* `interpreterArgsQuoted`: `true`/`false`: if true, the script file and arguments will be quoted as the last argument to the `scriptInterpreter` (*since version 8*)
* `fileExtension`: extension of of the script file on the remote node (*since version 14*)

Node filter parameters as described under [Using Node Filters](#using-node-filters)

If using a json document with Content-type: `application/json`:

``` json
{
    "project":"[project]",
    "script":"[script]",
    "nodeThreadcount": #threadcount#,
    "nodeKeepgoing": true/false,
    "asUser": "[asUser]",
    "argString": "[argString]",
    "scriptInterpreter": "[scriptInterpreter]",
    "interpreterArgsQuoted": true/false,
    "fileExtension": "[fileExtension]",
    "filter": "[node filter string]"
}
```

#### Response

``` json
{
  "message": "Immediate execution scheduled (X)",
  "execution": {
    "id": X,
    "href": "[API Href]",
    "permalink": "[GUI Href]"
  }
}
```

### Running Adhoc Script URLs

Run a script downloaded from a URL.  (**API version 4** required.)

**Request:**

    POST /api/{{ $apiMinVersion }}/project/[PROJECT]/run/url
    GET /api/{{ $apiMinVersion }}/project/[PROJECT]/run/url

The request can be form content, or a JSON document.

With Content-Type: `application/x-www-form-urlencoded` form or query parameters are used.

* `scriptURL`: A URL pointing to a script file (required)
* `argString`: Arguments to pass to the script when executed.
* `nodeThreadcount`: threadcount to use
* `nodeKeepgoing`: if "true", continue executing on other nodes even if some fail.
* `asUser` : specifies a username identifying the user who ran the script. Requires `runAs` permission.
* `scriptInterpreter`: a command to use to run the script
* `interpreterArgsQuoted`: `true`/`false`: if true, the script file and arguments will be quoted as the last argument to the `scriptInterpreter`
* `fileExtension`: extension of of the script file on the remote node (*since version 14*)

Node filter parameters as described under [Using Node Filters](#using-node-filters)


If using a json document with Content-type: `application/json`:

``` json
{
    "project":"[project]",
    "url":"[scriptURL]",
    "nodeThreadcount": #threadcount#,
    "nodeKeepgoing": true/false,
    "asUser": "[asUser]",
    "argString": "[argString]",
    "scriptInterpreter": "[scriptInterpreter]",
    "interpreterArgsQuoted": true/false,
    "fileExtension": "[fileExtension]",
    "filter": "[node filter string]"
}
```

**Response:**

A success message, and a single `<execution>` item identifying the
new execution by ID:

``` json
{
  "message": "Immediate execution scheduled (X)",
  "execution": {
    "id": X,
    "href": "[API Href]",
    "permalink": "[GUI Href]"
  }
}
```

## Key Storage ###

Upload and manage public and private key files and passwords.
For more information see the [Administration - Key Storage](/manual/key-storage/index.md) document.

Keys are stored via Rundeck's *Storage* facility.  This is a path-based interface to manage files.  The underlying storage may be on disk or in a database.

The Storage facility manages "resources", which may be files or directories.  File resources can have metadata associated with them (such as MIME content type).

Note: Private Keys and Passwords can be uploaded but not retrieved directly with this API.  They can only be used internally by Rundeck.

URL:

    /api/{{ $apiMinVersion }}/storage/keys/[PATH]/[FILE]

### Upload Keys ####

Specify the type of key via the `Content-type` header:

* `application/octet-stream` specifies a **private key**
* `application/pgp-keys` specifies a **public key**
* `application/x-rundeck-data-password` specifies a **password**

Use `POST` to create a new file, or `PUT` to modify an existing file.

```
POST /api/{{ $apiMinVersion }}/storage/keys/[PATH]/[FILE]
Content-Type: [...]
```

```
PUT /api/{{ $apiMinVersion }}/storage/keys/[PATH]/[FILE]
Content-Type: [...]
```

### List keys ####

Lists resources at the specified PATH.

Each resource has a type of `file` or `directory`.

    GET /api/{{ $apiMinVersion }}/storage/keys/[PATH]/

**Response:**

``` json
{
  "resources": [
    {
      "meta": {
        "Rundeck-key-type": "private",
        "Rundeck-content-mask": "content",
        "Rundeck-content-size": "1679",
        "Rundeck-content-type": "application/octet-stream"
      },
      "url": "http://dignan.local:4440/api/{{ $apiMinVersion }}/storage/keys/test1.pem",
      "name": "test1.pem",
      "type": "file",
      "path": "keys/test1.pem"
    },
    {
      "url": "http://dignan.local:4440/api/{{ $apiMinVersion }}/storage/keys/subdir",
      "type": "directory",
      "path": "keys/subdir"
    },
    {
      "meta": {
        "Rundeck-key-type": "public",
        "Rundeck-content-size": "640198",
        "Rundeck-content-type": "application/pgp-keys"
      },
      "url": "http://dignan.local:4440/api/{{ $apiMinVersion }}/storage/keys/monkey1.pub",
      "name": "monkey1.pub",
      "type": "file",
      "path": "keys/monkey1.pub"
    },
    {
      "meta": {
        "Rundeck-key-type": "public",
        "Rundeck-content-size": "393",
        "Rundeck-content-type": "application/pgp-keys"
      },
      "url": "http://dignan.local:4440/api/{{ $apiMinVersion }}/storage/keys/test1.pub",
      "name": "test1.pub",
      "type": "file",
      "path": "keys/test1.pub"
    }
  ],
  "url": "http://dignan.local:4440/api/{{ $apiMinVersion }}/storage/keys",
  "type": "directory",
  "path": "keys"
}

```


### Get Key Metadata ####

Returns the metadata about the stored key file.

    GET /api/{{ $apiMinVersion }}/storage/keys/[PATH]/[FILE]

Response:

``` json
{
  "meta": {
    "Rundeck-key-type": "public",
    "Rundeck-content-size": "393",
    "Rundeck-content-type": "application/pgp-keys"
  },
  "url": "http://dignan.local:4440/api/{{ $apiMinVersion }}/storage/keys/test1.pub",
  "name": "test1.pub",
  "type": "file",
  "path": "keys/test1.pub"
}
```

### Get Key Contents ####

Provides the **public key** content if the `Accept` request header matches `*/*` or `application/pgp-keys`:

    GET /api/{{ $apiMinVersion }}/storage/keys/[PATH]/[FILE]

**Retrieving private key or password file contents is not allowed.**

A GET request for a private key file if the `Accept` request header matches `*/*` or `application/octet-stream`,
or a password if the request header matches `*/*` or `application/x-rundeck-data-password`
will result in a `403 Unauthorized` response.

    GET /api/{{ $apiMinVersion }}/storage/keys/[PATH]/[FILE]
    Accept: application/octet-stream
    ...

Response:

    403 Unauthorized
    ...

### Delete Keys ####

Deletes the file if it exists and returns `204` response.

    DELETE /api/{{ $apiMinVersion }}/storage/keys/[PATH]/[FILE]

## Projects

### Listing Projects ###

List the existing projects on the server.

**Request:**

    GET /api/{{ $apiMinVersion }}/projects

**Response:**

See [Getting Project Info](#getting-project-info) section.

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

### Project Creation ###

Create a new project.

    POST /api/{{ $apiMinVersion }}/projects


`Content-Type: application/json`

``` json
{ "name": "myproject", "config": { "propname":"propvalue" } }
```

Response:  JSON project definition of the form indicated in the [Getting Project Info](#getting-project-info) section.

### Getting Project Info ###

Get information about a project.

    GET /api/{{ $apiMinVersion }}/project/[PROJECT]

**Response:**


``` json
{
  "description": "",
  "name": "NAME",
  "url": "http://server:4440/api/{{ $apiMinVersion }}/project/NAME",
  "config": {  }
}

```

### Project Deletion ###

Delete an existing projects on the server. Requires 'delete' authorization.

    DELETE /api/45/project/[PROJECT]

Optional Query Parameters:

* `deferred`: (**Since API v45**) If `true`, specifies the deletion process should take place in the background, and the request will be answered before its processed. 
If `false` the server will wait for the process to finish before answering. Default: `true` 


:::tip
If this endpoint is called with a version prior to 45, the behavior will be the same as using the query parameter `deferred=false`  
:::


Response:

    204 No Content

### Project Configuration ###

Retrieve or modify the project configuration data.  Requires `configure` authorization for the project.

#### GET Project Configuration ####

    GET /api/{{ $apiMinVersion }}/project/[PROJECT]/config


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

#### PUT Project Configuration ####

Replaces all configuration data with the submitted values.

**Request:**

    PUT /api/{{ $apiMinVersion }}/project/[PROJECT]/config

Content:

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

### Project Configuration Keys ###

Retrieve, change or delete individual configuration properties by their key.  Requires `configure` authorization for the project.

URL:

    /api/{{ $apiMinVersion }}/project/[PROJECT]/config/[KEY]

Request and response formats:

`application/json`:

``` json
{ "[KEY]" : "key value" }
```

`text/plain`: the plain text key value

```
key value
```

#### GET Project Configuration Key ####

Retrieve the value.

    GET /api/{{ $apiMinVersion }}/project/[PROJECT]/config/[KEY]

#### PUT Project Configuration Key ####

Set the value.

    PUT /api/{{ $apiMinVersion }}/project/[PROJECT]/config/[KEY]

Example JSON Payload:
    `{"value": "value-for-key"}`

#### DELETE Project Configuration Key ####

Delete the key.

    DELETE /api/{{ $apiMinVersion }}/project/[PROJECT]/config/[KEY]

Response will be

    204 No Content

### Project Archive Export ###

Export a zip archive of the project.  Requires `export` authorization for the project. Performs the export synchronously.
(See [Project Archive Export Async][/api/V/project/\[PROJECT\]/export/async] for asynchronous export.)

    GET /api/{{ $apiMinVersion }}/project/[PROJECT]/export

Response content type is `application/zip`

Optional parameters:

* `executionIds` a list (comma-separated) of execution IDs.  If this is specified then the archive will
contain *only* executions that are specified, and will not contain Jobs, ACLs, or project configuration/readme files.
    * optionally use `POST` method with with `application/x-www-form-urlencoded` content for large lists of execution IDs
    * optionally, specify `executionIds` multiple times, with a single ID per entry.

In APIv19 or later:

By default, exportALL=true. So, in order to not export empty data, you need to include one of the following flags. For example:
```
GET /api/{{ $apiMinVersion }}/project/[PROJECT]/export?exportAll=false
```

* `exportAll` true/false, include all project contents (default: true)
* `exportJobs` true/false, include executions
* `exportExecutions` true/false, include executions
* `exportConfigs` true/false, include project configuration
* `exportReadmes` true/false, include project readme/motd files
* `exportAcls` true/false, include project ACL Policy files, if authorized
* `exportComponents.calendars` true/false, include project calendars
* `exportComponents.Schedule%20Definitions` true/false, include schedule definitions
* `exportComponents.tours-manager` true/false, include tours manager
* `exportComponents.node-wizard` true/false, include node wizard

In APIv28 or later:

* `exportScm` true/false, include project SCM configuration, if authorized

In APIv34 or later:

* `exportWebhooks` true/false, include project webhooks in the archive
* `whkIncludeAuthTokens` true/false, include the auth token information when exporting webhooks, if not included the auth tokens will be regenerated upon import

:::tip
By default `exportAll` does not include the webhooks auth tokens, `whkIncludeAuthTokens` must be set to true in order to export the auth tokens.

Example:
```
GET /api/34/project/[PROJECT]/export?exportAll=true&whkIncludeAuthTokens=true
```
:::

GET Examples:

    GET /api/{{ $apiMinVersion }}/project/AlphaProject/export?executionIds=1,4,9
    GET /api/{{ $apiMinVersion }}/project/AlphaProject/export?executionIds=1&executionIds=4&executionIds=9

Post:

    POST /api/{{ $apiMinVersion }}/project/AlphaProject/export
    Content-Type: application/x-www-form-urlencoded

    executionIds=1&executionIds=4&executionIds=9&...    

### Project Archive Export Async

Export a zip archive of the project asynchronously.  Requires `export` authorization for the project. Use the Token result
to query the export status with [/api/V/project/[PROJECT]/export/status/[TOKEN]][/api/V/project/\[PROJECT\]/export/status/\[TOKEN\]], and retrieve the result once ready
with [/api/V/project/[PROJECT]/export/download/[TOKEN]][/api/V/project/\[PROJECT\]/export/download/\[TOKEN\]].

    GET /api/19/project/[PROJECT]/export/async

**Request:**

Same as [Project Archive Export][/api/V/project/\[PROJECT\]/export].

**Response:**

Same as [Project Archive Export Async Status][/api/V/project/\[PROJECT\]/export/status/\[TOKEN\]].


In APIv19 or later:

By default, exportALL=true. So, in order to not export empty data, you need to include one of the following flags. For example:
```
GET /api/{{ $apiMinVersion }}/project/[PROJECT]/export?exportAll=false
```

* `exportAll` true/false, include all project contents (default: true)
* `exportJobs` true/false, include executions
* `exportExecutions` true/false, include executions
* `exportConfigs` true/false, include project configuration
* `exportReadmes` true/false, include project readme/motd files
* `exportAcls` true/false, include project ACL Policy files, if authorized

### Project Archive Export Async Status

Get the status of an async export request. Retrieve the result once ready
with [/api/V/project/[PROJECT]/export/download/[TOKEN]][/api/V/project/\[PROJECT\]/export/download/\[TOKEN\]].

    GET /api/19/project/[PROJECT]/export/status/[TOKEN]

**Response:**

`application/json`

``` json
{
    "token":"[TOKEN]",
    "ready":true/false,
    "percentage":int,
}
```

### Project Archive Export Async Download

Download the archive file once the export status is `ready`.

    GET /api/19/project/[PROJECT]/export/download/[TOKEN]

**Response:**

Response content type is `application/zip`

### Project Archive Import ###

**Request:**

Import a zip archive to the project. Requires `import` authorization for the project.

    PUT /api/{{ $apiMinVersion }}/project/[PROJECT]/import{?jobUuidOption,importExecutions,importConfig,importACL,importScm}

Parameters:

+ `asyncImport` (optional, boolean, `true/false`, default: `false`) ... If true, an asynchronous project import process will be started, more info [here](#asynchronous-import).
+ `jobUuidOption` (optional, string, `preserve/remove`) ... Option declaring how duplicate Job UUIDs should be handled. If `preserve` (default) then imported job UUIDs will not be modified, and may conflict with jobs in other projects. If `remove` then all job UUIDs will be removed before importing.
+ `importExecutions` (optional, boolean, `true/false`) ... If true, import all executions and logs from the archive (default). If false, do not import executions or logs.
+ `importConfig` (optional,boolean,`true/false`) ... If true, import the project configuration from the archive. If false, do not import the project configuration (default).
+ `importACL` (optional,boolean,`true/false`) ... If true, import all of the ACL Policies from the archive. If false, do not import the ACL Policies (default).
+ `importScm` (optional,boolean,`true/false`) ... If true, import SCM configuration from the archive. If false, do not import the SCM configuration (default).


In APIv34 or later:

* `importWebhooks` true/false, If true, import the webhooks in the archive. If false, do not import webhooks (default).
* `whkRegenAuthTokens` true/false, If true, always regenerate the auth tokens associated with the webhook. If false, the webhook auth token in the archive will be imported. If no auth token info was included with the webhook, it will be generated (default).

In APIv38 or later:

* `importNodesSources` true/false. If true, import Node Resources Source defined on project properties. If false, do not import the nodes sources.    

**Component Options**

* `importComponents.NAME=true` enable a component for import
* `importOpts.NAME.KEY=VALUE` set a component option

Project archives may contain "components" which can be imported, beyond the base set of contents.  This includes some data used by Process Automation (Rundeck Enterprise) features.

Components:

* Project Tours (Enterprise). Name: `tours-manager`
* Project Schedules (Enterprise). Name: `Schedule Definitions`
* Project Calendars (Enterprise). Name: `calendars`
* Node Wizard Nodes (Enterprise): Name: `node-wizard`
* Webhooks, name: `webhooks`

For example, to enable Webhook import, you could use `importWebhooks` and `whkRegenAuthTokens` params, but those are simply shortcuts for the following parameters:

* `importComponents.webhooks=true&importOpts.webhooks.regenAuthTokens=true`

Import schedules definitions:

* `importComponents.Schedule%20Definitions=true`

Expected Request Content:

`Content-Type: application/zip`

**Response:**

Note: the import status indicates "failed" if any Jobs had failures,
otherwise it indicates "successful" even if other files in the archive were not imported.

Response will indicate whether the imported contents had any errors:

*All imported jobs and files were successful:*

``` json
{"import_status":"successful"}
```

*Some imported files failed:*


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
    ],
    "other_errors": [
        "webhooks could not be validated: ..."
    ]
}
```

* `other_errors` included since *API v35*

### Asynchronous Import

If the import is called with the parameter `asyncImport=true`, a different process will be started, in which we will obtain a response similar to this:

`{"import_status":"successful","successful":true}`

The response does not mean that the process has ended or that the import was carried out successfully, means that an asynchronous process has started.

The status of the asynchronous process could be requested through another query to the API:

- [Asyncronous Import Status](#asynchronous-import-status)

### Asynchronous Import Status

Users can check the status of an asynchronous project import process through the endpoint:

- `/api/$apiVersion/project/$project/import/status`

By doing so, users can receive a response similar to this:

`{
  "lastUpdate": "<update>",
  "lastUpdated": "<timestamp>",
  "errors": "<errors>"
}
`

The endpoint can be requested an infinite number of times from the start of the process until it ends.

### Updating and Listing Resources for a Project

Update or retrieve the Resources or Sources for a project.

Each Project can have multiple resource Sources.  Sources can be read-only, or writeable.

Use [/api/V/project/[PROJECT]/resources][/api/V/project/\[PROJECT\]/resources] to get all resources from a project.

Use [/api/V/project/[PROJECT]/sources][/api/V/project/\[PROJECT\]/sources] to get all Sources from a project.  Individual Sources
can be retrieved, or their Resources

#### List Resources for a Project

A GET request returns all the resources for the project.

**Request:**

    GET /api/{{ $apiMinVersion }}/project/[PROJECT]/resources

See [Listing Resources](#listing-resources).

#### List Resource Model Sources for a Project

**Request:**

    GET /api/23/project/[PROJECT]/sources

**Response:**

The response contains a set of `source` objects, each describes the `index`, the `type`, and details about the `resources`. If the
source had any error, that is included as `errors`.

Resources data includes any `description` provided by the source, whether it is `empty`, and
whether it is `writeable`.  The `href` indicates the URL for [Listing and Updating the resources for the source][/api/V/project/\[PROJECT\]/source/\[INDEX\]/resources].


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


#### Get a Resource Model Source for a Project

**Request:**

    GET /api/23/project/[PROJECT]/source/[INDEX]

**Response:**

A single `source` for the given index, as described in [List Resource Model Sources For a Project][/api/V/project/\[PROJECT\]/sources].

#### List Resources of a Resource Model Source

**Request:**

    GET /api/23/project/[PROJECT]/source/[INDEX]/resources

**Response:**

Based on the `Accept:` header, the resource model data for the source.

* See [Listing Resources](#listing-resources).

#### Update Resources of a Resource Model Source

**Request:**

    POST /api/23/project/[PROJECT]/source/[INDEX]/resources
    Content-Type: [TYPE]

    [RESOURCE MODEL DATA]

Specify the `Content-Type` header, with a value such as `application/json` or `application/xml` or any supported resource model format.

**Response:**

The resource model data in the format requested via the `Accept:` header.

* See [Listing Resources](#listing-resources).

### Project Readme File

The `readme.md` and `motd.md` files,
which are Markdown formatted and displayed in the Project listing page,
can be managed via the API. (See [Project Readme.md](/manual/projects/project-readme.md).)

**Request:**

    /api/13/project/[PROJECT]/readme.md
    /api/13/project/[PROJECT]/motd.md

Method: `GET`, `PUT` and `DELETE`.

Format: JSON and plain text formats.

#### GET Readme File

    GET /api/13/project/[PROJECT]/readme.md
    GET /api/13/project/[PROJECT]/motd.md

Response format depends on the `Accept:` HTTP header.

`text/plain`:

    The readme contents

`application/json`:

```json
{"contents":"The readme contents"}
```

If the file does not exist, then the response will be : `404 Not Found`

#### PUT Readme File

    PUT /api/13/project/[PROJECT]/readme.md
    PUT /api/13/project/[PROJECT]/motd.md

To create or modify the contents, use a `PUT` request, and `Content-Type` header to specify the same format.  Use the same format as returned by the GET responses.

#### DELETE Readme File

    DELETE /api/13/project/[PROJECT]/readme.md
    DELETE /api/13/project/[PROJECT]/motd.md

Deletes the resource if it exists.

Response: `204 No Content`

### Project ACLs

Manage a set of ACL Policy files for a project.  These files will apply to the specified project only,
and must either have a `context:` section which specifies the project context, or have no `context:` section.

The request and response formats for Project ACL Policies matches that of the
[System ACL Policies][/api/V/system/acl/*],
however the URL is rooted under the Project's URL path: `/api/13/project/[PROJECT]/acl/*`.

For more information about ACL Policies see:

* [ACLPOLICY format][ACLPOLICY]
* [Access Control Policy](/administration/security/authorization.md)

#### List Project ACL Policies

**Request:**

    GET /api/13/project/[PROJECT]/acl/

See [List System ACL Policies](#list-system-acl-policies) for request and response.

#### Get a Project ACL Policy

**Request:**

    GET /api/13/project/[PROJECT]/acl/name.aclpolicy

See [Get an ACL Policy](#get-an-acl-policy) for request and response.

#### Create a Project ACL Policy

**Request:**

    POST /api/13/project/[PROJECT]/acl/name.aclpolicy

See [Create an ACL Policy](#create-an-acl-policy) for request and response.

#### Update a Project ACL Policy

**Request:**

    PUT /api/13/project/[PROJECT]/acl/name.aclpolicy

See [Update an ACL Policy](#update-an-acl-policy) for request and response.

#### Delete a Project ACL Policy

**Request:**

    DELETE /api/13/project/[PROJECT]/acl/name.aclpolicy

See [Delete an ACL Policy](#delete-an-acl-policy)

#### Query Project Job Tags (Enterprise)

::: enterprise  
:::

Returns the list of available tags, along with the count of jobs per each tag, for the job 
query result received.

Since: v46

**Request:**

    GET /api/46/project/[PROJECT]/jobTags/query

Request Parameters:

* See [Listing Jobs](#listing-jobs)

**Response:**

```json
{
  "tag": 123,
  "tag2": 2
}
```

#### Get Project UI Metadata

Get project metadata.

Requires `read` authorization for the project resource.

Since: v46

**Request:**

    GET /api/46/project/[PROJECT]/meta

Request Parameters:

* `meta` - Comma-separated list of metadata items to include, or "*" for all (default)

**Response:**

```json
[
  {
    "name":"name",
    "data": { ... }
  }
]
```

#### Project Job Group browse

Query the jobs at a specific group path. Response includes the list of immediate jobs matching the query in the exact path, 
and the names of job Groups starting at that path.

Authorization required: `read` or `view` for the Job.

Since: v46

**Request:**

    GET /api/46/project/[PROJECT]/jobs/browse

Query Parameters:
* `path` - Group path root, or blank for the root
* `meta` - Comma-separated list of metadata items to include, or "*" for all
* `breakpoint` - Breakpoint, max number of jobs to load with metadata, if more results than the 
breakpoint are available, no metadata will be loaded

* Additional query parameters, see [Listing Jobs](#listing-jobs).

**Response**

```json
{
  "items": [
    {
      "description": "",
      "groupPath": null,
      "id": "6b7e6ee4-a120-4639-9375-4417a6e6d3d0",
      "job": true,
      "jobName": "job1",
      "meta": null
    },
    {
      "description": "",
      "groupPath": null,
      "id": "41b2f0a3-b140-4fac-bbc9-48a8d51ffc52",
      "job": true,
      "jobName": "job2",
      "meta": null
    },
    {
      "description": null,
      "groupPath": "apath",
      "id": null,
      "job": false,
      "jobName": null,
      "meta": null
    },
}
```

#### Toggle SCM for a Project

Toggle SCM enabled/disabled for a Project.

This endpoint will enable or disable all configured SCM plugins for the project. 
Specify whether to enable or disable in the request body.

This action is idempotent.

Authorization Required: `configure` for the Project resource (app context)

Since: v46


**Request:**

    POST /api/14/project/[PROJECT]/scm/toggle

```json
{
  "enabled":true/false
}
```

**Response:**

Indicates if a change was made.

```json
{
  "modified":true/false
}
```

## Listing History

List the event history for a project.

**Request:**

    GET /api/{{ $apiMinVersion }}/project/[PROJECT]/history

Optional Parameters:

* History query parameters:
    * `jobIdFilter`: include events for a job ID.
    * `reportIdFilter`: include events for an event Name.
    * `userFilter`: include events created by a user
    * `statFilter`: include events based on result status.  this can be 'succeed','fail', or 'cancel'.
    * `jobListFilter`: include events for the job by name, format: 'group/name'.  To use multiple values, include this parameter multiple times.  (Since *API v5*)
    * `excludeJobListFilter`: exclude events for the job by name, format: 'group/name'. To use multiple values, include this parameter multiple times. (Since *API v5*)
* Date query parameters:
    * `recentFilter`: Use a simple text format to filter events that occurred within a period of time. The format is "XY" where X is an integer, and "Y" is one of:
        * `h`: hour
        * `d`: day
        * `w`: week
        * `m`: month
        * `y`: year
        So a value of "2w" would return events within the last two weeks.
    * `begin`: Specify exact date for earliest result.
    * `end`: Specify exact date for latest result.
* Paging parameters:
    * `max`: indicate the maximum number of events to return. The default maximum to return is 20.
    * `offset`: indicate the 0-indexed offset for the first event to return.

The format for the `end`, and `begin` filters is either:  a unix millisecond timestamp, or a W3C dateTime string in the format "yyyy-MM-ddTHH:mm:ssZ".

The format for the `jobListFilter` and `excludeJobListFilter` is the job's group and name separated by a '/' character, such as: "group1/job name", or "my job" if there is no group.

**Response:**

Paging information:

`total` is the total number of events matching the query parameters.
`count` is the number of events included in the results.
`max` is the paging size as specified in the request, or with the default value of 20.
`offset` is the offset specified, or default value of 0.

The entries have a `href` attribute with the URL to the API for that resource, and a `permalink` attribute with the URL to the GUI view for the job or execution.

`Content-Type: application/json`:

``` json
{
  "paging": {
    "count": 10,
    "total": 110,
    "max": 20,
    "offset": 100
  },
  "events": [...]
}
```

The `events` array contains elements like:

``` json
{
  "starttime": #unixtime,
  "endtime": #unixtime,
  "title": "[job title, or "adhoc"]",
  "status": "[status]",
  "statusString": "[string]",
  "summary": "[summary text]",
  "node-summary": {
    "succeeded": #X,
    "failed": #Y,
    "total": #Z
  },
  "user": "[user]",
  "project": "[project]",
  "date-started": "[yyyy-MM-ddTHH:mm:ssZ]",
  "date-ended": "[yyyy-MM-ddTHH:mm:ssZ]",
  "job": {
    "id": "[uuid]",
    "href": "[api href]"
  },
  "execution": {
    "id": "[id]",
    "href": "[api href]"
  }
}
```

## Resources/Nodes

### Listing Resources

List or query the resources for a project.

**Request:**

    GET /api/{{ $apiMinVersion }}/project/[PROJECT]/resources

Optional Parameters:

* `format` : Result format. Can use "xml", "yaml" or "json", or an installed ResourceFormat plugin name.
    * Default is 'json'
* Node Filter parameters: You can select resources to include and exclude in the result set, see [Using Node Filters](#using-node-filters) below.

Accept header:

Specify a MIME type via the `Accept:` header to specify the requested format.

**Note:** If no query parameters are included, the result set will include all Node resources for the project.

**Response:**

Depending on the `format` parameter, a value of "xml" will return [resource-xml](/manual/document-format-reference/resource-v13.md) and "yaml" will return [resource-yaml](/manual/document-format-reference/resource-yaml-v13.md), and "json" will return [resource-json](/manual/document-format-reference/resource-json-v10.md) formatted results.  Any other supported format value will return content in the specified format.

### Getting Resource Info

Get a specific resource within a project.

**Request:**

    GET /api/{{ $apiMinVersion }}/project/[PROJECT]/resource/[NAME]

Optional Parameters:

* `format` : Result format. Can use "xml", "yaml" or "json", or an installed ResourceFormat plugin name.
    * Default is 'json' (API v23 and later)
    * Default is 'xml' (API v22 and earlier)

**Response:**

Depending on the `format` parameter, a value of "xml" will return [resource-xml](/manual/document-format-reference/resource-v13.md) and "yaml" will return [resource-yaml](/manual/document-format-reference/resource-yaml-v13.md), and "json" will return [resource-json](/manual/document-format-reference/resource-json-v10.md) formatted results.

The result will contain a single item for the specified resource.

### Using Node Filters

Refer to the [User Guide - Node Filters](/manual/11-node-filters.md) Documentation for information on
the node filter syntax and usage.

A basic node filter looks like:

    attribute: value attribute2: value2

To specify a Node Filter string as a URL parameter for an API request, use a parameter named `filter`.
Your HTTP client will have to correctly escape the value of the `filter` parameter.  For example you can
use `curl` like this;

    curl --data-urlencode "filter=attribute: value"

Common attributes:

* `name` - node name
* `tags` - tags
* `hostname`
* `username`
* `osFamily`, `osName`, `osVersion`, `osArch`

Custom attributes can also be used.

## SCM

Rundeck SCM Plugins can be used to synchronize Job definitions with an external Source Control Management repository.

Currently Rundeck includes a single built-in plugin for Git repositories.

There are two "integration" types of SCM Plugins: `import` and `export`, and they are managed separately.

A Project can be configured with a single Import and Export plugin.  After setting up these plugins, Project and Job level "status" can be read.  Changes to Jobs within a project affect the status for Import or Export.

Plugins provide "actions" which are available based on the Project or Job status.  For example, a plugin can provide a "commit" action for a Job, which allows a user to save the changes for the job.

The specific actions, and their behaviors depend on the plugin.  The actions can be listed and performed via the API.

### List SCM Plugins

Lists the available plugins for the specified integration.  Each plugin is identified by a `type` name.

**Request**

    GET /api/15/project/[PROJECT]/scm/[INTEGRATION]/plugins

**Response**

A list of plugin description.

Each plugin has these properties:

* `type` identifier for the plugin
* `configured` true/false whether a configuration is stored for the plugin
* `enabled` true/false whether the plugin is enabled
* `title` display title for the plugin
* `description` descriptive text for the plugin


``` json
{
  "integration": "$integration",
  "plugins": [
    {
      "configured": $boolean,
      "description": "$string",
      "enabled": $boolean,
      "title": "$string",
      "type": "$type"
    }
  ]
}
```


### Get SCM Plugin Input Fields

List the input fields for a specific plugin.  The `integration` and `type` must be specified.

The response will list each input field.

**Request**

    GET /api/15/project/[PROJECT]/scm/[INTEGRATION]/plugin/[TYPE]/input

**Response**

Input fields have a number of properties:

* `name` identifier for the field, used when submitting the input values.
* `defaultValue` a default value if the input does not specify one
* `description` textual description
* `renderOptions` a key/value map of options, such as declaring that GUI display the input as a password field.
* `required` true/false whether the input is required
* `scope`
* `title` display title for the field
* `type` data type of the field: `String`, `Integer`, `Select` (multi-value), `FreeSelect` (open-ended multi-value), `Boolean` (true/false)
* `values` if the type is `Select` or `FreeSelect`, a list of string values to choose from



``` json
{
  "fields": [
    {
      "defaultValue": "$string",
      "description": "$string",
      "name": "$string",
      "renderingOptions": {
        "$string": "$string"
      },
      "required": $boolean,
      "scope": "$string",
      "title": "$string",
      "type": "$string",
      "values": null or array
    }
    //...

  ],
  "integration": "$integration",
  "type": "$type"
}
```

### Setup SCM Plugin for a Project

Configure and enable a plugin for a project.

The request body is expected to contain entries for all of the `required` input fields for the plugin.

If a validation error occurs with the configuration, then the response will include detail about the errors.

**Request**

    POST /api/15/project/[PROJECT]/scm/[INTEGRATION]/plugin/[TYPE]/setup

Content:


``` json
{
    "config":{
        "key":"value",
        "key2":"value2..."
    }
}
```


**Response**

If a validation error occurs, the response will include information about the result.

    HTTP/1.1 400 Bad Request


`Content-Type: application/json`:

``` json
{
  "message": "Some input values were not valid.",
  "nextAction": null,
  "success": false,
  "validationErrors": {
    "dir": "required",
    "url": "required"
  }
}
```

If the result is successful:

    HTTP/1.1 200 OK


`Content-Type: application/json`:

``` json
{
  "message": "$string",
  "nextAction": null,
  "success": true,
  "validationErrors": null
}
```

If a follow-up **Action** is expected to be called, the action ID will be identified by the `nextAction` value.

See [Get Project SCM Status](#get-project-scm-status).

### Enable SCM Plugin for a Project

Enable a plugin that was previously configured. (Idempotent)

**Request**

    POST /api/15/project/[PROJECT]/scm/[INTEGRATION]/plugin/[TYPE]/enable

No content body is expected.

**Response**

Same response as [Setup SCM Plugin for a Project](#setup-scm-plugin-for-a-project).

### Disable SCM Plugin for a Project

Disable a plugin. (Idempotent)

**Request**

    POST /api/15/project/[PROJECT]/scm/[INTEGRATION]/plugin/[TYPE]/disable

No content body is expected.

**Response**

Same response as [Setup SCM Plugin for a Project](#setup-scm-plugin-for-a-project).

### Get Project SCM Status

Get the SCM plugin status and available actions for the project.

**Request**

    GET /api/15/project/[PROJECT]/scm/[INTEGRATION]/status

**Response**

If no plugin is configured:

    HTTP/1.1 404 Not Found

Otherwise:

    HTTP/1.1 200 OK

The plugin status has these properties:

* `actions` empty, or a list of action ID strings
* `integration` the integration
* `message` a string indicating the status message
* `synchState` a value indicating the state
* `project` project name

Import plugin values for `synchState`:

* `CLEAN` - no changes
* `UNKNOWN` - status unknown
* `REFRESH_NEEDED` - plugin needs to refresh
* `IMPORT_NEEDED` - some changes need to be imported
* `DELETE_NEEDED` - some jobs need to be deleted

Export plugin values for `synchState`:

* `CLEAN` - no changes
* `REFRESH_NEEDED` - plugin needs to refresh
* `EXPORT_NEEDED` - some changes need to be exported
* `CREATE_NEEDED` - some jobs need to be added to the repo


``` json
{
  "actions": ['action1','action2',..],
  "integration": "$integration",
  "message": null,
  "project": "$project",
  "synchState": "$state"
}
```

### Get Project SCM Config

Get the configuration properties for the current plugin.

**Request**

    GET /api/15/project/[PROJECT]/scm/[INTEGRATION]/config

**Response**

If no plugin for the given integration is configured for the project, a `404` response is sent:

    HTTP/1.1 404 Not Found

Otherwise the response contains:

* `config` a set of key/value pairs for the configuration
* `enabled` true/false if it is enabled
* `integration` integration name
* `project` project name
* `type` plugin type name


``` json
{
  "config": {
    "key": "$string",
    "key2": "$string"
  },
  "enabled": $boolean,
  "integration": "$integration",
  "project": "$project",
  "type": "$type"
}
```

### Get Project SCM Action Input Fields

Get the input fields and selectable items for a specific action.

Each action may have a set of Input Fields describing user-input values.

Export actions may have a set of `scmExportActionItem`s which describe Job changes that can be
included in the action.

Import actions may have a set of `scmImportActionItem`s which describe paths from the import repo
which can be selected for the action, they will also be associated with a Job after they are matched.

**Request**

    GET /api/15/project/[PROJECT]/scm/[INTEGRATION]/action/[ACTION_ID]/input

**Response**

The content of input fields is the same as shown in [Get SCM Plugin Input Fields](#get-scm-plugin-input-fields).

`exportItems` values:

* `itemId` - ID of the repo item, e.g. a file path
* `job` - job information
    * `groupPath` group path, or empty/null
    * `jobId` job ID
    * `jobName` job name
* `deleted` - boolean, whether the job was deleted and requires deleting the associated repo item
* `renamed` - boolean if the job was renamed
* `originalId` - ID of a repo item if the job was renamed and now is stored at a different repo path, or empty/null
* `status` - file status String, the same value as in the `$synchState` of [Get Job SCM Status](#get-job-scm-status).

`importItems` values:

* `itemId` - ID of the repo item, e.g. a file path
* `job` - job information, may be empty/null
    * `groupPath` group path, or empty
    * `jobId` job ID
    * `jobName` job name
* `tracked` - boolean, true if there is an associated `job`
* `deleted` - boolean, whether the job was deleted on remote and requires to be deleted
* `status` - file status String, the same value as in the `$synchState` of [Get Job SCM Status](#get-job-scm-status).



The content of `"fields"` array is the same as shown in [Get SCM Plugin Input Fields](#get-scm-plugin-input-fields).

``` json
{
  "actionId": "$actionId",
  "description": "$string",
  "fields": [
    { "name": ...
    }
  ],
  "integration": "$integration",
  "title": "$string",
  "importItems": [
    {
      "deleted": $boolean,
      "itemId": "$string",
      "job": {
        "groupPath": "$jobgroup",
        "jobId": "$jobid",
        "jobName": "$jobname"
      },
      "tracked": $boolean,
      "status": "$string"
    }
  ],
  "exportItems": [
    {
      "deleted": $boolean,
      "itemId": "$string",
      "job": {
        "groupPath": "$jobgroup",
        "jobId": "$jobid",
        "jobName": "$jobname"
      },
      "originalId": "$string",
      "renamed": $boolean,
      "status": "$string"
    }
  ]
}
```

### Perform Project SCM Action

Perform the action for the SCM integration plugin, with a set of input parameters,
selected Jobs, or Items, or Items to delete.

Depending on the [available Input Fields for the action](#get-project-scm-action-input-fields), the action will
expect a set of `input` values.

The set of `jobs` and `items` to choose from will be included in the Input Fields response,
however where an Item has an associated Job, you can supply either the Job ID, or the Item ID.

When there are items to be deleted on `export` integration, you can specify the Item IDs in the `deleted`
section.  However, if the item is associated with a renamed Job, including the Job ID will have the same effect.

When there are items to be deleted on `import` integration, you must specify the Job IDs in the `deletedJobs`
section.

Note: including the Item ID of an associated job, instead of the Job ID,
will not automatically delete a renamed item.


**Request**

    POST /api/15/project/[PROJECT]/scm/[INTEGRATION]/action/[ACTION_ID]

``` json
{
    "input":{
        "message":"$commitMessage"
    },
    "jobs":[
        "$jobId"
    ],
    "items":[
        "$itemId"
    ],
    "deleted":[
        "$itemId"
    ],
    "deletedJobs":[
        "$jobId"
    ]
}
```

**Response**

Same response as [Setup SCM Plugin for a Project](#setup-scm-plugin-for-a-project).

### Get Job SCM Status

**Request**

    GET /api/15/job/[ID]/scm/[INTEGRATION]/status

**Response**

Note: `import` status will not include any actions for the job, refer to the Project status to list import actions.

Import plugin values for `$synchState`:

* `CLEAN` - no changes
* `UNKNOWN` - status unknown, e.g. the job was not imported via SCM
* `REFRESH_NEEDED` - plugin needs to refresh
* `IMPORT_NEEDED` - Job changes need to be imported
* `DELETE_NEEDED` - Job need to be deleted

Export plugin values for `$synchState`:

* `CLEAN` - no changes
* `REFRESH_NEEDED` - plugin needs to refresh
* `EXPORT_NEEDED` - job changes need to be exported
* `CREATE_NEEDED` - Job needs to be added to the repo



``` json
{
  "actions": [
    "$action"
  ],
  "commit": {
    "author": "$commitAuthor",
    "commitId": "$commitId",
    "date": "$commitDate",
    "info": {
      "key": "value.."
    },
    "message": "$commitMessage"
  },
  "id": "$jobId",
  "integration": "$integration",
  "message": "$statusMessage",
  "project": "$project",
  "synchState": "$synchState"
}
```

### Get Job SCM Diff

Retrieve the file diff for the Job, if there are changes for the integration.

The format of the diff content depends on the specific plugin. For the Git plugins,
a unified diff format is used.

**Request**

    GET /api/15/job/[ID]/scm/[INTEGRATION]/diff

**Response**

The `commit` info will be the same structure as in [Get Job SCM Status](#get-job-scm-status).

For `import` only, `incomingCommit` will indicate the to-be-imported change.


``` json
{
  "commit": {
    ...
  },
  "diffContent": "...",
  "id": "$jobId",
  "incomingCommit": {
    ...
  },
  "integration": "$integration",
  "project": "$project"
}
```

### Get Job SCM Action Input Fields

Get the input fields and selectable items for a specific action for a job.

Each action may have a set of Input Fields describing user-input values.

Export actions will include one `scmExportActionItem` for the Job.

Import actions may have a set of `scmImportActionItem` for the job.

**Request**

    GET /api/15/job/[ID]/scm/[INTEGRATION]/action/[ACTION_ID]/input

**Response**

The same response format as in [Get Project SCM Action Input Fields](#get-project-scm-action-input-fields).

### Perform Job SCM Action

**Request**

    POST /api/15/job/[ID]/scm/[INTEGRATION]/action/[ACTION_ID]

Request Content is nearly exactly as expected in [Perform Project SCM Action](#perform-project-scm-action),
however the `jobIds` do not need to be specified, as the `ID` of the job is already specified.
The `items` and `deleted` sections are not used.

Only the `input` values need to be specified:


``` json
{
    "input":{
        "message":"$commitMessage"
    }
}
```

**Response**


Same response as [Setup SCM Plugin for a Project](#setup-scm-plugin-for-a-project).

## Plugins

### List installed plugins

**Request**

    GET /api/33/plugin/list

**Response**

`Content-Type: application/json`:

``` json
[
    {
        "artifactName": "kubernetes-plugin",
        "author": "Rundeck",
        "builtin": false,
        "description": "dispatch the command to the kubernetes pod",
        "id": "15712f2421d1",
        "name": "Kubernetes-node-executor",
        "pluginVersion": "1.0.0",
        "service": "NodeExecutor",
        "title": "Kubernetes / Pods / Node Executor",
        "iconUrl": "...",
        "providerMetadata": { }
    },
    {
        "artifactName": "py-winrm-plugin",
        "author": "© 2017, Rundeck, Inc.",
        "builtin": false,
        "description": "Executing Scripts or Commands on remote Windows computer",
        "id": "59ed572534b2",
        "name": "WinRMPython",
        "pluginVersion": "1.0.7",
        "service": "NodeExecutor",
        "title": "WinRM Node Executor Python",
        "iconUrl": "...",
        "providerMetadata": { }
    },
    ...
]
```

* `iconUrl` - URL to icon file for the plugin if present. **since V40**
* `providerMetadata` - Map of metadata about the plugin if present. **since V40**

## Webhooks

### List Project Webhooks

**Request**

    GET /api/V/project/[PROJECT]/webhooks

**Response**

`Content-Type: application/json`:

``` json
[
    {
        "authToken": "Z1vnbhShhQF3B0dQq7UhJTZMnGS92TBl",
        "config": {
            "argString": "-payload ${raw}",
            "jobId": "a54d07a1-033a-499f-9789-19bcacbd6e11"
        },
        "creator": "admin",
        "enabled": true,
        "eventPlugin": "webhook-run-job",
        "id": 3,
        "name": "Webhook Job Runner",
        "project": "Webhook",
        "roles": "admin,user",
        "user": "admin"
    },
    {
        "authToken": "p9ttreh05Zd222g5yBXocEMXmCJ1skOX",
        "config": {},
        "creator": "admin",
        "enabled": true,
        "eventPlugin": "log-webhook-event",
        "id": 4,
        "name": "Log it Hook",
        "project": "Webhook",
        "roles": "admin,user",
        "user": "admin"
    }
]
```

### Get A Webhook

**Request**

    GET /api/V/project/[PROJECT]/webhook/[ID]

**Response**

`Content-Type: application/json`:

``` json
{
    "authToken": "Z1vnbhShhQF3B0dQq7UhJTZMnGS92TBl",
    "config": {
        "argString": "-payload ${raw}",
        "jobId": "a54d07a1-033a-499f-9789-19bcacbd6e11"
    },
    "creator": "admin",
    "enabled": true,
    "eventPlugin": "webhook-run-job",
    "id": 3,
    "name": "Webhook Job Runner",
    "project": "Webhook",
    "roles": "admin,user",
    "user": "admin"
}
```

### Update A Webhook

**Request**

    POST /api/V/project/[PROJECT]/webhook/[ID]

Required Fields:    
`id`  
`project`
`roles`

Along with the required fields you may send only the fields you want to update.

When updating a webhook you may not change the user associated with a webhook or the authToken. Suppling the `user` field will have no effect. Also, specifying an `authToken` field has no effect.

`Content-Type: application/json`:

``` json
{
    "config": {
        "argString": "-payload ${raw} -d ${data.one}",
        "jobId": "a54d07a1-033a-499f-9789-19bcacbd6e11"
    },
    "id": 3,
    "name": "Webhook Job Runner 1",
    "roles": "admin,user,webhook",
    "project": "Webhook"
}
```   

**Response**

`Content-Type: application/json`:

``` json
{
    "msg": "Saved webhook"
}
```

or error

``` json
{
    "apiversion": 33,
    "error": true,
    "errorCode": "api.error.parameter.required",
    "message": "parameter \"project\" is required"
}
```

### Add A Webhook

**Request**

    POST /api/V/project/[PROJECT]/webhook

Required Fields:
```
project - the project that owns the webhook
name - the name of the webhook
user - string the webhook runs as this user
roles - string containing comma separated list of roles to use for the webhook
eventPlugin - string must be a valid plugin name
config - object containing config values for the specified plugin
enabled - boolean
```   

Do not specify an `authToken` or `creator` field. They will be ignored.

`Content-Type: application/json`:

``` json
{
    "config": {
        "jobId": "a54d07a1-033a-499f-9789-19bcacbd6e11"
    },
    "enabled": true,
    "eventPlugin": "webhook-run-job",
    "name": "Add Me",
    "project": "Webhook",
    "roles": "webhook,admin,user",
    "user": "admin"
}
```

**Response**

 `Content-Type: application/json`:

``` json
{
    "msg": "Saved webhook"
}
```

### Delete A Webhook

**Request**

    DELETE /api/V/project/[PROJECT]/webhook/[ID]

**Response**

`Content-Type: application/json`:

``` json
{
    "msg": "Deleted [webhook name] webhook"
}
```

### Send Webhook Event

**Request**

    POST /api/V/webhook/[AUTH_TOKEN]

You may post whatever data you wish to the webhook endpoint, however the plugin you are using must
be able to handle the data you post. If the webhook plugin associated with the webhook can't handle
the content type posted you will get an error response.

**Response**    

The webhook plugin will determine the response received.
Please see the documentation for the plugin that is configured for the webhook endpoint you are using.

The default response is:  
`Content-Type: text/plain`:

```
ok
```

## Calendars (Enterprise)

::: enterprise  
:::


Manage System and Project Calendars in Process Automation.

### List System Calendars
Get all calendars at system level.

::: enterprise  
:::


**Request:**

    GET  /api/41/system/calendars

**Response:**
Content-Type: application/json

```json
[
  {
    "id": [ID],
    "name": "[NAME]",
    "description": "[DESCRIPTION]",
    "calendarType": "[blackout/allowed]",
    "level": "system",
    "project": null,
    "dateType": "[date,range,daily,monthly]",
    "dateDefinition": [DATE-DEFINITION],
    "enable": [true/false],
    "allReference": [true/false],
    "recurrent": [true/false],
    "objects": [PROJECT_LIST/null]
  },
]
```

### List Project Calendars
Get all calendars at project level

::: enterprise  
:::


**Request:**

    GET  /api/41/project/[PROJECT]/calendars

**Response:**
Content-Type: application/json
```json
[
  {
    "id": [ID],
    "name": "[NAME]",
    "description": "[DESCRIPTION]",
    "calendarType": "[blackout/allowed]",
    "level": "project",
    "project": "[PROJECT]",
    "dateType": "[date,range,daily,monthly]",
    "dateDefinition": [DATE-DEFINITION],
    "enable": [true/false],
    "allReference": [true/false],
    "recurrent": [true/false],
    "objects": [
      {
        "uuid": "[JOBUUID]",
        "name": "[JOBNAME"
      }
    ]
  }
]
```

### Create/Update System Calendar
Create or update a calendar at system level

::: enterprise  
:::


**Request:**

    POST  /api/41/system/calendars

Request Content:
`Content-Type: application/json`

```json
  {
    "id": [ID],
    "name": "[NAME]",
    "description": "[DESCRIPTION]",
    "calendarType": "[blackout/allowed]",
    "level": "system",
    "dateType": "[date,range,daily,monthly]",
    "dateDefinition": [DATE-DEFINITION],
    "enable": [true/false],
    "allReference": [true/false],
    "recurrent": [true/false],
    "objects": [
      {
        "name": "[PROJECTNAME]"
      }
    ]
  }
```

* if the ID exists, it will update the existing calendar, otherwise a new one will be created.

Example:

```json
  {
    "id": 1,
    "name": "System Calendar",
    "description":"description",
    "calendarType": "blackout",
    "level": "system",
    "dateType": "range",
    "dateDefinition": [
      "2019/11/21",
      "2019/11/27"
    ],
    "enable": false,
    "allReference": true,
    "recurrent": true
  }
```


### Create/Update Project Calendar
Create or update a calendar at project level

::: enterprise  
:::


**Request:**

    POST  /api/41/project/[PROJECT]/calendars

Request Content:
`Content-Type: application/json`

```json
  {
    "id": [ID],
    "name": "[NAME]",
    "description": "[DESCRIPTION]",
    "calendarType": "[blackout/allowed]",
    "level": "project",
    "project": "[PROJECT]",
    "dateType": "[date,range,daily,monthly]",
    "dateDefinition": [DATE-DEFINITION],
    "enable": [true/false],
    "allReference": [true/false],
    "recurrent": [true/false],
    "objects": [
      {
        "uuid": "[JOBUUID]",
        "name": "[JOBNAME]"
      },
     {
        "uuid": "[JOBUUID]",
        "name": "[JOBNAME]"
      }
    ]
  }
```

* if the ID exists, it will update the existing calendar, otherwise a new one will be created.

Example:

```json
{
    "id": 1,
    "name": "New Calendar",
    "description": "test",
    "calendarType": "blackout",
    "level": "project",
    "project": "Demo",
    "dateType": "date",
    "dateDefinition": [
      "2019/12/07",
      "2019/12/14",
      "2019/12/31",
      "2020/01/01"
    ],
    "enable": true,
    "allReference": false,
    "recurrent": false,
    "objects": [
      {
        "uuid": "7ca918bd-b463-4948-96d2-796c0619c2bd",
        "name": "scheduled/job"
      }
    ]
  }
  ```

### Delete Project Calendar
Deletes a calendar at project level

::: enterprise  
:::


**Request:**

    DELETE  /api/41/project/[PROJECT]/calendars/[ID]

**Response:**

    204 No Content

### Delete System Calendar
Deletes a calendar at system level

::: enterprise  
:::


**Request:**

    DELETE  /api/41/system/calendars/[ID]

**Response:**

    204 No Content


## License (Enterprise)

### View License

::: enterprise  
:::

Returns metadata about the current License for Process Automation.

**Request:**

    GET /api/41/enterprise/license

**Response:**

```json
{
  "company": "rundeck.com",
  "contactEmail": "support@rundeck.com",
  "application": "rundeckpro",
  "editions": [
    "ENTERPRISE"
  ],
  "applicationVersion": [
    "3.3.0"
  ],
  "serverUUIDs": [
    "00000000-0000-0000-0000-000000000000"
  ],
  "gracePeriod": 30,
  "type": "EVAL",
  "issueDate": "2020-06-04T07:00:00Z",
  "validUntil": "2020-06-30T07:00:00Z",
  "validSince": null,
  "graceUntil": "2020-06-30T07:00:00Z",
  "licenseId": "00000000-0000-0000-0000-000000000000",
  "perpetual": false,
  "invalidCode": null,
  "remaining": 26,
  "state": "ACTIVE",
  "active": true,
  "shouldWarn": true,
  "baseUrl": "http://rundeck/license/index",
  "edition": "ENTERPRISE",
  "reason": "The License is Valid",
  "warning": "The Rundeck License will expire in 26 days"
}

```

### Set License Key

::: enterprise  
:::

Uploads a license key for Process Automation.

**Request:**

    POST /api/41/enterprise/license
    Content-Type: application/x-rundeck-license

Request Content:

The Process Automation License key file.

Optional Parameters:

* `license_agreement`: `true` to agree with the Process Automation License.

**Response:**

Content-Type: `application/json`

```json
{
    "message": "OK"
}
```

## System Feature

### Get A System Feature Status


Return the information whether a specific system feature is enabled or not.

**Request:**

    GET /api/42/feature/[FEATURE]

The `FEATURE` parameter should be the feature's configuration name without `rundeck.feature.` prefix and `.enabled` suffix. E.g. For configuration name `rundeck.feature.runner.enabled`, the value of `[FEATURE]` should be `runner`  

**Response:**

Content-Type: `application/json`

```json
{
  "enabled": true
}

```

### Get All System Feature Status
Return the information about all system features status.

**Request:**

    GET /api/42/feature/

**Response:**

Content-Type: `application/json`

```json
{
  "authorizationServiceBootstrapWarmupCache": {
    "enabled": true
  },
  "cleanExecutionsHistoryJob": {
    "enabled": true
  },
  "cleanExecutionsHistoryJobAsyncStart": {
    "enabled": true
  },
  "emailCSSFramework": {
    "enabled": false
  },
  "enableAll": null,
  "enhancedNodes": {
    "enabled": true
  },
  ...,
  "eventStore": {
    "enabled": true
  },
  "executionLifecyclePlugin": {
    "enabled": true
  }
}

```

## Runner Management

### Check a ping response ###

::: enterprise
:::

**Request:**

    GET /api/42/runnerManagement/checkPing/[TOKEN]

**Response:**

Content-Type: `application/json`:
 
```json
{
  "completed": true,
  "message": "Task completed successfully",
  "iserror": false
}
```
### Download runner Jar ###

::: enterprise
:::

**Request:**

    GET /api/41/runnerManagement/download/[TOKEN]

**Response:**

Content-Type: `application/java-archive`: Java Archive

### Ping the runner ###

::: enterprise
:::

**Request:**

    POST /api/41/runnerManagement/runner/[ID]/ping

**Response:**

Content-Type: `application/json`:
 
```json
{
  "pingToken": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
}
```
### Regenerate credentials for the Runner ###

::: enterprise
:::

**Request:**

    POST /api/42/runnerManagement/runner/[ID]/regenerateCreds

**Response:**

Content-Type: `application/json`:
 
```json
{
  "runnerId": "runner123",
  "token": "cdb9ff25-4606-4f0b-bf72-119263a25677",
  "downloadTk": "2804658a-b9a1-869d-08f7-8f30a9455995"
}
```

- `token`: Runner authentication token
- `downloadTk`: Runner package download token


### List tags for the Runner ###

::: enterprise
:::

**Request:**

    GET /api/42/runnerManagement/runner/[ID]/tags

**Response:**

Content-Type: `application/json`:
 
```json
[  "apple",  "banana",  "cherry",  "date"]
```
### Get runner information ###

::: enterprise
:::

**Request:**

    GET /api/41/runnerManagement/runner/[RUNNERID]

**Response:**

Content-Type: `application/json`:
 
```json
{
  "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "name": "My Runner",
  "description": "A runner for running CI/CD pipelines",
  "status": "Healthy",
  "runnerVersion": "0.1.34",
  "projectAssociations": {
    "projectNodeFilters": {
      "project1": ".*",
      "project2": ".*"
    }
  },
  "createTime": "2022-03-01T12:34:56Z",
  "lastCheckin": "2 seconds ago",
  "lastCheckinAlert": false,
  "runningOperations": 5,
  "uptime": 86400,
  "tagNames": [
    "runner",
    "pipeline",
    "automation"
  ]
}
```
### Update the runner information ###

::: enterprise
:::

**Request:**

    POST /api/41/runnerManagement/runner/[RUNNERID]

Request Content:
`Content-Type: application/json`

```json
{
  "runnerId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "name": "My Runner",
  "description": "A runner for running CI/CD pipelines",
  "assignedProjects": {
    "project1": ".*",
    "project2": ".*"
  },
  "tagNames": "runner, pipeline, automation"
}

```

**Response:**

Content-Type: `application/json`:
 
```json
{
  "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "name": "My Runner",
  "description": "A runner for running CI/CD pipelines",
  "status": "Healthy",
  "runnerVersion": "0.1.34",
  "projectAssociations": {
    "projectNodeFilters": {
      "project1": ".*",
      "project2": ".*"
    }
  },
  "createTime": "2022-03-01T12:34:56Z",
  "lastCheckin": "2 seconds ago",
  "lastCheckinAlert": false,
  "runningOperations": 5,
  "uptime": 86400,
  "tagNames": [
    "runner",
    "pipeline",
    "automation"
  ]
}
```
### Delete the specified runner ###

::: enterprise
:::

**Request:**

    DELETE /api/41/runnerManagement/runner/[RUNNERID]

**Response:**

    204

### List available runners ###

::: enterprise
:::

**Request:**

    GET /api/41/runnerManagement/runners

**Response:**

Content-Type: `application/json`:
 
Schema: RunnerList
```json
{
  "runners": [
    {
      "id": "runner1",
      "name": "My Runner",
      "description": "A runner for running CI/CD pipelines",
      "status": "Healthy",
      "version": "1.2.3",
      "associatedProjects": 2,
      "lastCheckin": "2022-02-28T12:34:56Z",
      "lastCheckinAlert": false,
      "selected": true,
      "tagNames": [
        "runner",
        "ci/cd"
      ]
    },
    {
      "id": "runner2",
      "name": "Another Runner",
      "description": "A runner for running builds",
      "status": "Healthy",
      "version": "1.2.3",
      "associatedProjects": 1,
      "lastCheckin": "2022-02-27T01:23:45Z",
      "lastCheckinAlert": true,
      "selected": false,
      "tagNames": [
        "runner",
        "builds"
      ]
    }
  ]
}
```
### Create a new Runner ###

::: enterprise
:::

**Request:**

    POST /api/42/runnerManagement/runners

Content-Type: `application/json`:
```json
{
  "name": "My Runner",
  "description": "A runner for running CI/CD pipelines",
  "assignedProjects": {
    "project1": ".*",
    "project2": ".*"
  },
  "tagNames": "runner, pipeline, automation"
}
```


**Response:**

Content-Type: `application/json`:
 
```json
{
  "runnerId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "name": "My New Runner",
  "description": "A project for building and testing software",
  "projectAssociations": {
    "project1": ".*",
    "project2": ".*"
  },
  "token": "cdb9ff25-4606-4f0b-bf72-119263a25677",
  "downloadTk": "2804658a-b9a1-869d-08f7-8f30a9455995"
}
```

or error

Content-Type: `application/json`:
 
```json
{
  "apiVersion": 41,
  "errorMessage": "An error occurred while processing the request",
  "errorCode": "400",
  "error": "Bad Request",
  "apiversion": 1,
  "message": ""
}
```
### List all known tags ###

::: enterprise
:::

**Request:**

    GET /api/42/runnerManagement/tags

**Response:**

Content-Type: `application/json`:
 
```json
{
  "tags": {
    "tag1": 3,
    "tag2": 5,
    "tag3": 7
  }
}
```
### Get UI info for runner management ###

::: enterprise
:::

**Request:**

    GET /api/42/runnerManagement/ui

**Response:**

Content-Type: `application/json`:
 
Schema: UiData
```json
{
  "allowedActions":[
    "create",
    "update",
    "delete",
    "ping",
    "regen"
  ],
  "features":[],
  "projectCount":2
}
```
### List tags for the Runner ###

::: enterprise
:::

**Request:**

    GET /api/42/runnerTag/searchTags

**Response:**

Content-Type: `application/json`:
 
```json
["tag1", "tag2", "tag3"]
```


## Index

[/api/V/config/refresh][]

* `POST` [Refresh config settings](#config-refresh)


[/api/V/enterprise/license][]

* `GET` [View License](#view-license)
* `POST` [Set License Key](#set-license-key)

[/api/V/execution/\[ID\]][]

* `GET` [Execution Info](#execution-info)
* `DELETE` [Delete an Execution](#delete-an-execution)

[/api/V/execution/\[ID\]/abort][]

* `GET` [Aborting Executions](#aborting-executions)

[/api/V/execution/\[ID\]/output/state][]

* `GET` [Execution Output with State](#execution-output-with-state)

[/api/V/execution/\[ID\]/output][]

* `GET` [Tailing Output](#tailing-output)

[/api/V/execution/\[ID\]/output/step/\[STEPCTX\]][]

[/api/V/execution/\[ID\]/output/node/\[NODE\]/step/\[STEPCTX\]][]

[/api/V/execution/\[ID\]/output/node/\[NODE\]][]

[/api/V/execution/\[ID\]/output][]

* `GET` [Execution Output](#execution-output)

[/api/V/execution/\[ID\]/state][]

* `GET` [Execution State](#execution-state)

[/api/V/executions/delete][]

* `POST` [Bulk Delete Executions](#bulk-delete-executions)

[/api/V/executions/metrics][]

* `GET` [Execution Query Metrics](#execution-query-metrics)

[/api/V/feature/\[FEATURE\]][]
* `GET` [System feature on/off status][/api/V/feature/\[FEATURE\]]

[/api/V/feature/][]
* `GET` [All System feature on/off statuses][/api/V/feature/]


[/api/V/job/\[ID\]][]

* `GET` [Getting a Job Definition](#getting-a-job-definition)
* `DELETE` [Deleting a Job Definition](#deleting-a-job-definition)

[/api/V/job/\[ID\]/executions][]

* `POST` [Running a Job](#running-a-job)
* `GET` [Getting Executions for a Job](#getting-executions-for-a-job)
* `DELETE` [Delete all Executions for a Job](#delete-all-executions-for-a-job)


[/api/V/job/\[ID\]/execution/enable][]

* `POST` [Enable Executions for a Job](#enable-executions-for-a-job)

[/api/V/job/\[ID\]/execution/disable][]

* `POST` [Disable Executions for a Job](#disable-executions-for-a-job)

[/api/V/job/\[ID\]/input/file][]

* `POST` [Upload a File for a Job Option](#upload-a-file-for-a-job-option)

[/api/V/job/\[ID\]/input/files][]

* `GET` [List Files Uploaded for a Job](#list-files-uploaded-for-a-job)

[/api/V/job/\[ID\]/retry/\[EXECID\]][]

* `POST` [Retry a Job Based on Execution](#retry-a-job-based-on-execution)

[/api/V/execution/\[ID\]/input/files][]

* `GET` [List Input Files for an Execution](#list-input-files-for-an-execution)

[/api/V/jobs/file/\[ID\]][]

* `GET` [Get Info About an Uploaded File](#get-info-about-an-uploaded-file)

[/api/V/job/\[ID\]/info][]

* `GET` [Get Job Metadata](#get-job-metadata)

[/api/V/job/\[ID\]/run][]

* `POST` [Running a Job](#running-a-job)

[/api/V/job/\[ID\]/schedule/enable][]

* `POST` [Enable Scheduling for a Job](#enable-scheduling-for-a-job)

[/api/V/job/\[ID\]/schedule/disable][]

* `POST` [Disable Scheduling for a Job](#disable-scheduling-for-a-job)

[/api/V/job/\[ID\]/scm/\[INTEGRATION\]/status][]

- `GET` [Get SCM status for a Job][/api/V/job/\[ID\]/scm/\[INTEGRATION\]/status]

[/api/V/job/\[ID\]/scm/\[INTEGRATION\]/action/\[ACTION_ID\]][]

- `POST` [Perform SCM action for a Job.][/api/V/job/\[ID\]/scm/\[INTEGRATION\]/action/\[ACTION_ID\]]

[/api/V/job/\[ID\]/scm/\[INTEGRATION\]/action/\[ACTION_ID\]/input][]

- `GET` [Get Job SCM Action Input Fields.][/api/V/job/\[ID\]/scm/\[INTEGRATION\]/action/\[ACTION_ID\]/input]

[/api/V/jobs/delete][]

* `DELETE` [Bulk Job Delete](#bulk-job-delete)

[/api/V/jobs/execution/enable][]

* `POST` [Bulk Toggle Job Execution](#bulk-toggle-job-execution)

[/api/V/jobs/execution/disable][]

* `POST` [Bulk Toggle Job Execution](#bulk-toggle-job-execution)

[/api/V/jobs/schedule/enable][]

* `POST` [Bulk Toggle Job Schedules](#bulk-toggle-job-schedules)

[/api/V/jobs/schedule/disable][]

* `POST` [Bulk Toggle Job Schedules](#bulk-toggle-job-schedules)

[/api/V/metrics][]

* `GET` [List Metrics](#list-metrics)

[/api/V/metrics/healthcheck][]

* `GET` [Metrics Healthcheck](#metrics-healthcheck)

[/api/V/metrics/metrics][]

* `GET` [Metrics Data](#metrics-data)

[/api/V/metrics/ping][]

* `GET` [Metrics Ping](#metrics-ping)

[/api/V/metrics/threads][]

* `GET` [Metrics Threads](#metrics-threads)

[/api/V/project/\[PROJECT\]][]

* `GET` [Getting Project Info](#getting-project-info)
* `DELETE` [Project Deletion](#project-deletion)

[/api/V/project/\[PROJECT\]/acl/*][]

* `GET` [List Project ACL Policies](#list-project-acl-policies)
* `GET` [Get a Project ACL Policy](#get-a-project-acl-policy)
* `POST` [Create a Project ACL Policy](#create-a-project-acl-policy)
* `PUT` [Update a Project ACL Policy](#update-a-project-acl-policy)
* `DELETE` [Delete a Project ACL Policy](#delete-a-project-acl-policy)


[/api/V/project/\[PROJECT\]/calendars][]

* `GET` [List Project Calendars](#list-project-calendars)
* `POST` [Create/Update Project Calendars](#create-update-project-calendar)
* `DELETE` [Delete Project Calendars](#delete-project-calendar)


[/api/V/project/\[PROJECT\]/config][]

* `GET` [GET Project Configuration](#get-project-configuration)
* `PUT` [PUT Project Configuration](#put-project-configuration)

[/api/V/project/\[PROJECT\]/config/\[KEY\]][]

* `GET` [GET Project Configuration Key](#get-project-configuration-key)
* `PUT` [PUT Project Configuration Key](#put-project-configuration-key)
* `DELETE` [DELETE Project Configuration Key](#delete-project-configuration-key)

[/api/V/project/\[PROJECT\]/executions][]

* `GET` [Execution Query](#execution-query)

[/api/V/project/\[PROJECT\]/executions/metrics][]

* `GET` [Execution Query Metrics](#execution-query-metrics)

[/api/V/project/\[PROJECT\]/executions/running][]

* `GET` [Listing Running Executions](#listing-running-executions)

[/api/V/project/\[PROJECT\]/export][]

* `GET` [Project Archive Export](#project-archive-export)

[/api/V/project/\[PROJECT\]/export/async][]

* `GET` [Project Archive Export Async](#project-archive-export-async)

[/api/V/project/\[PROJECT\]/export/status/\[TOKEN\]][]

* `GET` [Project Archive Export Async Status](#project-archive-export-async-status)

[/api/V/project/\[PROJECT\]/export/download/\[TOKEN\]][]

* `GET` [Project Archive Export Async Download](#project-archive-export-async-download)

[/api/V/project/\[PROJECT\]/\[FILE.md\]][]

* `GET` [GET Readme File](#get-readme-file)
* `PUT` [PUT Readme File](#put-readme-file)
* `DELETE` [DELETE Readme File](#delete-readme-file)

[/api/V/project/\[PROJECT\]/history][]

* `GET` [Listing History](#listing-history)

[/api/V/project/\[PROJECT\]/import][]

* `PUT` [Project Archive Import](#project-archive-import)

[/api/V/project/\[PROJECT\]/jobs][]

* `GET` [Listing Jobs](#listing-jobs)

[/api/V/project/\[PROJECT\]/jobs/export][]

* `GET` [Exporting Jobs](#exporting-jobs)

[/api/V/project/\[PROJECT\]/jobs/import][]

* `POST` [Importing Jobs](#importing-jobs)

[/api/V/project/\[PROJECT\]/resources][]

* `GET` [Listing Resources](#listing-resources)

[/api/V/project/\[PROJECT\]/resource/\[NAME\]][]

* `GET` [Getting Resource Info](#getting-resource-info)

[/api/V/project/\[PROJECT\]/run/command][]

* `POST` [Running Adhoc Commands](#running-adhoc-commands)

[/api/V/project/\[PROJECT\]/run/script][]

* `POST` [Running Adhoc Scripts](#running-adhoc-scripts)

[/api/V/project/\[PROJECT\]/run/url][]

* `POST` [Running Adhoc Script URLs](#running-adhoc-script-urls)

[/api/V/project/\[PROJECT\]/scm/\[INTEGRATION\]/plugins][]

* `GET` [List SCM plugins for a project.][/api/V/project/\[PROJECT\]/scm/\[INTEGRATION\]/plugins]

[/api/V/project/\[PROJECT\]/scm/\[INTEGRATION\]/plugin/\[TYPE\]/input][]

* `GET` [Get SCM plugin setup input fields.][/api/V/project/\[PROJECT\]/scm/\[INTEGRATION\]/plugin/\[TYPE\]/input]

[/api/V/project/\[PROJECT\]/scm/\[INTEGRATION\]/plugin/\[TYPE\]/setup][]

* `POST` [Setup SCM for a project.][/api/V/project/\[PROJECT\]/scm/\[INTEGRATION\]/plugin/\[TYPE\]/setup]

[/api/V/project/\[PROJECT\]/scm/\[INTEGRATION\]/plugin/\[TYPE\]/enable][]

* `POST` [Enable SCM for a project.][/api/V/project/\[PROJECT\]/scm/\[INTEGRATION\]/plugin/\[TYPE\]/enable]

[/api/V/project/\[PROJECT\]/scm/\[INTEGRATION\]/plugin/\[TYPE\]/disable][]

* `POST` [Disable SCM for a project.][/api/V/project/\[PROJECT\]/scm/\[INTEGRATION\]/plugin/\[TYPE\]/disable]

[/api/V/project/\[PROJECT\]/scm/\[INTEGRATION\]/status][]

* `GET` [Get SCM status for a project.][/api/V/project/\[PROJECT\]/scm/\[INTEGRATION\]/status]

[/api/V/project/\[PROJECT\]/scm/\[INTEGRATION\]/config][]

* `GET` [Get SCM config for a project.][/api/V/project/\[PROJECT\]/scm/\[INTEGRATION\]/config]]

[/api/V/project/\[PROJECT\]/scm/\[INTEGRATION\]/action/\[ACTION_ID\]][]

* `POST` [Perform SCM action for a project.][/api/V/project/\[PROJECT\]/scm/\[INTEGRATION\]/action/\[ACTION_ID\]]

[/api/V/project/\[PROJECT\]/scm/\[INTEGRATION\]/action/\[ACTION_ID\]/input][]

* `GET` [Get Project SCM Action Input Fields.][/api/V/project/\[PROJECT\]/scm/\[INTEGRATION\]/action/\[ACTION_ID\]/input]

[/api/V/project/\[PROJECT\]/sources][]

* `GET` [List Resource Model Sources for a Project][/api/V/project/\[PROJECT\]/sources]

[/api/V/project/\[PROJECT\]/source/\[INDEX\]][]

* `GET` [Get a Resource Model Source for a Project][/api/V/project/\[PROJECT\]/source/\[INDEX\]]

[/api/V/project/\[PROJECT\]/source/\[INDEX\]/resources][]

* `GET` [List Resources for a Resource Model Source][GET /api/V/project/\[PROJECT\]/source/\[INDEX\]/resources]
* `POST` [Update Resources for a Resource Model Source][POST /api/V/project/\[PROJECT\]/source/\[INDEX\]/resources]

[/api/V/projects][]

* `GET` [Listing Projects](#listing-projects)
* `POST` [Project Creation](#project-creation)

[/api/V/project/\[PROJECT\]/webhooks][]

* `GET` [List Webhooks](#list-project-webhooks)

[/api/V/webhook/\[AUTH_TOKEN\]](#send-webhook-event)

* `GET` [Send Webhook Event](#send-webhook-event)

[/api/V/project/\[PROJECT\]/webhook/][]

* `POST` [Add A Webhook](#add-a-webhook)

[/api/V/project/\[PROJECT\]/webhook/\[ID\]][]

* `GET` [Get A Webhook](#get-a-webhook)
* `POST` [Update A Webhook](#update-a-webhook)
* `DELETE` [Delete A Webhook](#delete-a-webhook)

[/api/V/scheduler/takeover][]

* `PUT` [Takeover Schedule in Cluster Mode](#takeover-schedule-in-cluster-mode)

[/api/V/scheduler/jobs][]

* `GET` [List Scheduled Jobs For this Cluster Server][/api/V/scheduler/jobs]

[/api/V/scheduler/server/\[UUID\]/jobs][]

* `GET` [List Scheduled Jobs For a Cluster Server][/api/V/scheduler/server/\[UUID\]/jobs]

[/api/V/storage/keys/\[PATH\]/\[FILE\]][]

* `PUT` [Upload Keys](#upload-keys)
* `GET` [List keys](#list-keys)
* `GET` [Get Key Metadata](#get-key-metadata)
* `GET` [Get Key Contents](#get-key-contents)
* `DELETE` [Delete Keys](#delete-keys)

[/api/V/system/acl/*][]

* `GET` [List System ACL Policies](#list-system-acl-policies)
* `GET` [Get an ACL Policy](#get-an-acl-policy)
* `POST` [Create an ACL Policy](#create-an-acl-policy)
* `PUT` [Update an ACL Policy](#update-an-acl-policy)
* `DELETE` [Delete an ACL Policy](#delete-an-acl-policy)

[/api/V/system/calendars][]

* `GET` [List System Calendars](#list-system-calendars)
* `POST` [Create/Update System Calendars](#create-update-system-calendar)
* `DELETE` [Delete System Calendars](#delete-system-calendar)

[/api/V/system/executions/enable][]

* `POST` [Set Active Mode](#set-active-mode)

[/api/V/system/executions/disable][]

* `POST` [Set Passive Mode](#set-passive-mode)

[/api/V/system/executions/status][]

* `POST` [Get Current Execution Mode](#get-current-execution-mode)

[/api/V/system/info][]

* `GET` [System Info](#system-info)

[/api/V/system/logstorage][]

* `GET` [Log Storage Info][/api/V/system/logstorage]

[/api/V/system/logstorage/incomplete][]

* `GET` [List Executions with Incomplete Log Storage][/api/V/system/logstorage/incomplete]

[/api/V/system/logstorage/incomplete/resume][]

* `POST` [Resume Incomplete Log Storage][/api/V/system/logstorage/incomplete/resume]

[/api/V/tokens][]

[/api/V/tokens/\[USER\]][]

* `GET` [List Tokens](#list-tokens)
* `POST` [Create a Token](#create-a-token)

[/api/V/token/\[ID\]][]

* `GET` [Get a token](#get-a-token)
* `DELETE` [Delete a token](#delete-a-token)


[/api/V/user/list][]

* `GET` [List users][/api/V/user/list]

[/api/V/user/info][]

* `GET` [Get user profile][/api/V/user/info]
* `POST`[Modify user profile][POST /api/V/user/info]


[/api/V/user/info/\[USER\]][]

* `GET` [Get another user profile][/api/V/user/info/\[USER\]]
* `POST` [Modify another user profile][POST /api/V/user/info/\[USER\]]


[/api/V/user/roles][]

* `GET` [List roles][/api/V/user/roles]

[Response Format]: #xml-response-format

[/api/V/plugin/list][]

* `GET` [List Installed Plugins][/api/V/plugin/list]


[/api/V/runnerManagement/checkPing/\[TOKEN\]](#check-a-ping-response)

* `GET` [Check a ping response](#check-a-ping-response)

[/api/V/runnerManagement/download/\[TOKEN\]](#download-runner-jar)

* `GET` [Download runner Jar](#download-runner-jar)

[/api/V/runnerManagement/runner/\[ID\]/ping](#ping-the-runner)

* `POST` [Ping the runner](#ping-the-runner)

[/api/V/runnerManagement/runner/\[ID\]/regenerateCreds](#regenerate-credentials-for-the-runner)

* `POST` [Regenerate credentials for the Runner](#regenerate-credentials-for-the-runner)

[/api/V/runnerManagement/runner/\[ID\]/tags](#list-tags-for-the-runner)

* `GET` [List tags for the Runner](#list-tags-for-the-runner)

[/api/V/runnerManagement/runner/\[RUNNERID\]](#get-runner-information)

* `GET` [Get runner information](#get-runner-information)
* `POST` [Update the runner](#update-the-runner)
* `DELETE` [Delete the specified runner](#delete-the-specified-runner)

[/api/V/runnerManagement/runners](#list-available-runners)

* `GET` [List available runners](#list-available-runners)
* `POST` [Create a new Runner](#create-a-new-runner)

[/api/V/runnerManagement/tags](#list-all-known-tags)

* `GET` [List all known tags](#list-all-known-tags)

[/api/V/runnerManagement/ui](#get-ui-info-for-runner-management)

* `GET` [Get UI info for runner management](#get-ui-info-for-runner-management)

[/api/V/runnerTag/searchTags](#list-tags-for-the-runner)

* `GET` [List tags for the Runner](#list-tags-for-the-runner)


### Incubating


(none)

[ACLPOLICY]:../manual/document-format-reference/aclpolicy-v10.html


!!!include(api/api-index-links.md)!!!
