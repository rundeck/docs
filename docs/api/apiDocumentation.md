# Rundeck API Spec

Rundeck provides a Web API for use with your applications.

## Get API Information
### Endpoint: /
- **Method**: GET
- **Description**: Return basic information about the Rundeck API.

Includes current latest API Version, and base API URL.
- **200 Response Example**:
	- **example**:
```json
{
  "apiversion": 44,
  "href": "http://localhost:4441/api/44"
}
```

## Delete a Single Config Value [Enterprise]
### Endpoint: /config/delete
- **Method**: POST
- **Description**: Delete a single config by key and strata.

Authorization required: `ops_admin` or `app_admin` for `system` resource.

Since: v36

- **Example Request**:
	- **example**:
```json
{
  "key": "myCustomConfig",
  "strata": "default"
}
```

## Get Configuration Value [Enterprise]
### Endpoint: /config/get
- **Method**: GET
- **Description**: Get the value for a configuration key.

Authorization required: `ops_admin` or `app_admin` for `system` resource.

Since: v36

- **200 Response Example**:
	- **example**:
```json
{
  "key": "key.name",
  "value": "config value",
  "strata": "default"
}
```

## Get Configuration Categories [Enterprise]
### Endpoint: /config/getCategories
- **Method**: GET
- **Description**: Get the Configuration categories.

Authorization required: `ops_admin` or `app_admin` for `system` resource.

Since: v36

- **200 Response Example**:
	- **example**:
```json
[
  {
    "name": "Plugins",
    "isSubcat": false,
    "parentCategory": null,
    "childNodes": [
      {
        "name": "Azure",
        "isSubcat": true,
        "parentCategory": "Plugins"
      },
      {
        "name": "DataDog",
        "isSubcat": true,
        "parentCategory": "Plugins"
      },
      {
        "name": "GCP",
        "isSubcat": true,
        "parentCategory": "Plugins"
      },
      {
        "name": "Jenkins",
        "isSubcat": true,
        "parentCategory": "Plugins"
      },
      {
        "name": "Oracle",
        "isSubcat": true,
        "parentCategory": "Plugins"
      },
      {
        "name": "Sensu",
        "isSubcat": true,
        "parentCategory": "Plugins"
      },
      {
        "name": "Sumo Logic",
        "isSubcat": true,
        "parentCategory": "Plugins"
      }
    ]
  },
  {
    "name": "SSO",
    "isSubcat": false,
    "parentCategory": null,
    "childNodes": [
      {
        "name": "Azure",
        "isSubcat": true,
        "parentCategory": "SSO"
      },
      {
        "name": "Okta",
        "isSubcat": true,
        "parentCategory": "SSO"
      },
      {
        "name": "Ping",
        "isSubcat": true,
        "parentCategory": "SSO"
      }
    ]
  }
]
```

## List All Current Configurations [Enterprise]
### Endpoint: /config/list
- **Method**: GET
- **Description**: List all existing configs and their properties.

Authorization required: `ops_admin` or `app_admin` for `system` resource.

Since: v36

- **200 Response Example**:
	- **example**:
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

## List All Currently configured Storage Plugins [Enterprise]
### Endpoint: /config/listStoragePlugins
- **Method**: GET
- **Description**: List all existing configs and their properties for storage plugins.

Authorization required: `app_admin`.

- **200 Response Example**:
	- **example**:
```json
[
      {
        "type": "exampleProvider",
        "path": "keys/exampleProvider",
        "extra": {
            "extraConfig": "value"
        },
        "config": {
            "password": "pass",
            "username": "user123",
        }
      },
      {
        "type": "testprovider2",
        "path": "keys/testprovider2",
        "extra": {
            "extraConfig": "value"
        },
        "config": {
            "password": "pass",
            "username": "user123",
        }
        
      }
]
```

## List Configuration Metadata [Enterprise]
### Endpoint: /config/metaList
- **Method**: GET
- **Description**: List all known configuration key names and metadata.

Authorization required: `ops_admin` or `app_admin` for `system` resource.

Since: v36

- **200 Response Example**:
	- **example**:
```json
[
  {
    "key": "rundeck.api.tokens.duration.max",
    "visibility": "Advanced",
    "category": "API",
    "strata": "default",
    "required": false,
    "restart": true,
    "label": "API Token Duration Max",
    "datatype": "String",
    "encrypted": false,
    "defaultValue": "",
    "link": "",
    "description": "",
    "authRequired": "app_admin"
  },
  {
    "key": "rundeck.authRateLimiting.enabled",
    "visibility": "Advanced",
    "category": "Authentication",
    "strata": "default",
    "required": false,
    "restart": false,
    "label": "Enable authentication rate limiting feature",
    "datatype": "Boolean",
    "encrypted": false,
    "defaultValue": "FALSE",
    "link": "https://docs.rundeck.com/docs/administration/security/rateLimiting.html",
    "description": "Enable or disable the authentication rate limiting feature",
    "authRequired": "ops_admin"
  }
]
```

## Refresh Configurations from Properties File [Enterprise]
### Endpoint: /config/refresh
- **Method**: POST
- **Description**: Make the Rundeck server re-read the config properties file.

Authorization required: `ops_admin` or `app_admin` for `system` resource.

Since: v36

- **200 Response Example**:
	- **example**:
```json
{
  "msg": "Rundeck configuration refreshed"
}
```

## Restart the Rundeck Server [Enterprise]
### Endpoint: /config/restart
- **Method**: POST
- **Description**: Restart the server. Requires that the server container supports the operation.

Authorization required: `ops_admin` for `system` resource

Since: v36
- **200 Response Example**:
	- **example**:
```json
{
  "msg": "Result message",
  "restarting": true
}
```

## Create or Update Configurations [Enterprise]
### Endpoint: /config/save
- **Method**: POST
- **Description**: Create or update configs and properties.

Authorization required: `ops_admin` or `app_admin` for `system` resource.

Since: v36

- **Example Request**:
	- **example**:
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
- **200 Response Example**:
	- **example**:
```json
{
  "msg": "Saved",
  "restart": true,
  "created": [
    "myNewCustomConfig"
  ],
  "updated": [
    "myCustomConfig"
  ]
}
```

## Create or Update Storage Plugins [Enterprise]
### Endpoint: /config/saveStoragePlugins
- **Method**: POST
- **Description**: Create or update configs and properties for storage plugins.

Authorization required: `app_admin`. 


- **Example Request**:
	- **example**:
```json
{
  "plugins": {
     "0" : {
        {
        "type": "exampleProvider1",
        "path": "keys/exampleProvider1",
        "extra": {
            "extraConfig": "value"
        },
        "config": {
            "password": "pass",
            "username": "user123",
        }
      },
     }
  },
  "removedPlugins": {
     "0" : {
        {
        "type": "exampleProvider2",
        "path": "keys/exampleProvider2",
        "extra": {
            "extraConfig": "value"
        },
        "config": {
            "password": "pass",
            "username": "user123",
        }
      },
     }
  }
  
}
```
- **200 Response Example**:
	- **example**:
```json
{
  "msg": "Saved",
  "restart": true,
  "created": [
    "myNewCustomConfig"
  ],
  "updated": [
    "myCustomConfig"
  ],
  "deleted": [
    "myDeletedCustomConfig"
  ]
}
```

## Set Execution Mode for a Cluster Member [Enterprise]
### Endpoint: /enterprise/cluster/executions/disable
- **Method**: POST
- **Description**: Set the Execution Mode for the target cluster member.

* `/enterprise/cluster/executions/enable`: Set execution mode to *Active* 
* `/enterprise/cluster/executions/disable`: Set execution mode to *Passive* 

If the UUID parameter matches the current cluster member, the mode will be changed immediately, otherwise the status will be `pending`.

Authorization required: (enable) `enable_executions` or `admin` for `system` resource, or 
(disable) `disable_executions` or `admin` for `system` resource.

Since: v41

- **200 Response Example**:
	- **example**:
```json
{
  "status": "pending",
  "executionMode": "active",
  "uuid": "a3de6030-2b7a-47e3-b46f-3e46a11a85d9"
}
```

## Set Execution Mode for a Cluster Member [Enterprise]
### Endpoint: /enterprise/cluster/executions/enable
- **Method**: POST
- **Description**: Set the Execution Mode for the target cluster member.

* `/enterprise/cluster/executions/enable`: Set execution mode to *Active* 
* `/enterprise/cluster/executions/disable`: Set execution mode to *Passive* 

If the UUID parameter matches the current cluster member, the mode will be changed immediately, otherwise the status will be `pending`.

Authorization required: (enable) `enable_executions` or `admin` for `system` resource, or 
(disable) `disable_executions` or `admin` for `system` resource.

Since: v41

- **200 Response Example**:
	- **example**:
```json
{
  "status": "pending",
  "executionMode": "active",
  "uuid": "a3de6030-2b7a-47e3-b46f-3e46a11a85d9"
}
```

## View License
### Endpoint: /enterprise/license
- **Method**: GET
- **Description**: Returns metadata about the current License for Rundeck Enterprise

## Set License Key
### Endpoint: /enterprise/license
- **Method**: POST
- **Description**: Uploads a license key for Rundeck Enterprise
- **Example Request**:
	- **example-license-key**:
```json
"-----BEGIN PGP MESSAGE-----\nVersion: ...\n...\n-----END PGP MESSAGE-----\n"
```
- **200 Response Example**:
	- **example**:
```json
{
  "message": "ok"
}
```
- **400 Response Example**:
	- **example**:
```json
{
  "error": true,
  "errorCode": "api.error.code",
  "message": "not ok",
  "apiversion": 41
}
```

## Get Webhook Debug Events [Enterprise]
### Endpoint: /enterprise/project/{project}/webhooks/{id}/debug-events
- **Method**: GET
- **Description**: Return webook debug events.

Authorization Required: `app_admin` to `webhook` resource.


## List System Report Datasets
### Endpoint: /enterprise/system-report/datasets
- **Method**: GET
- **Description**: List the system report datasets.

Authorization required: `ops_admin` for `system`

Since: v44

- **200 Response Example**:
	- **example**:
```json
[
  {
    "label": "Statistics",
    "name": "projectStats"
  },
  {
    "label": "Framework Configuration",
    "name": "frameworkConfig"
  },
  {
    "label": "Rundeck Configuration",
    "name": "rundeckConfig"
  },
  {
    "label": "System Environment",
    "name": "systemEnv"
  },
  {
    "label": "Licensing",
    "name": "licensing"
  },
  {
    "label": "Full Configuration",
    "name": "fullConfig"
  }
]
```

## Get System Report Dataset by Name
### Endpoint: /enterprise/system-report/datasets/{dataset}
- **Method**: GET
- **Description**: Get a system report dataset.

Authorization required: `ops_admin` for `system`

Since: v44


## Execution Info
### Endpoint: /execution/{id}
- **Method**: GET
- **Description**: Get the status for an execution by ID.
- **200 Response Example**:
	- **example**:
```json
{
  "id": 1,
  "href": "[url]",
  "permalink": "[url]",
  "status": "succeeded/failed/aborted/timedout/retried/other",
  "project": "[project]",
  "user": "[user]",
  "date-started": {
    "unixtime": 1431536339809,
    "date": "2015-05-13T16:58:59.000Z"
  },
  "date-ended": {
    "unixtime": 1431536346423,
    "date": "2015-05-13T16:59:06.000Z"
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
    "nodea",
    "nodeb"
  ],
  "failedNodes": [
    "nodec",
    "noded"
  ]
}
```

## Delete an Execution
### Endpoint: /execution/{id}
- **Method**: DELETE
- **Description**: Delete an execution by ID.

Authorization requirement: Requires the `delete_execution` action allowed for a `project` in the `application` context.

See: [Administration - Access Control Policy - Application Scope Resources and Actions](https://docs.rundeck.com/docs/administration/security/authorization.html#application-scope-resources-and-actions)

Since: V12


## Aborting Executions
### Endpoint: /execution/{id}/abort
- **Method**: POST
- **Description**: Abort a running execution by ID.
- **200 Response Example**:
	- **example**:
```json
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

## List Input Files for an Execution
### Endpoint: /execution/{id}/input/files
- **Method**: GET
- **Description**: List input files used for an execution. Since: V19
- **200 Response Example**:
	- **example**:
```json
{
  "files": [
    {
      "id": "382c7596-435b-4103-8781-6b32fbd629b2",
      "user": "admin",
      "fileState": "deleted",
      "sha": "9284ed4fd7fe1346904656f329db6cc49c0e7ae5b8279bff37f96bc6eb59baad",
      "jobId": "7b3fff59-7a2d-4a31-a5b2-dd26177c823c",
      "dateCreated": "2017-02-24T23:26:48.000Z",
      "serverNodeUUID": "3425B691-7319-4EEE-8425-F053C628B4BA",
      "size": 12,
      "expirationDate": "2017-02-24T23:27:18.000Z",
      "execId": 2837
    }
  ]
}
```

## Execution Output
### Endpoint: /execution/{id}/output
- **Method**: GET
- **Description**: Get the output for an execution by ID. The execution can be currently running or may have already completed. Output can be filtered down to a specific node or workflow step.

The log output for each execution is stored in a file on the Rundeck server, and this API endpoint allows you to retrieve some or all of the output, in several possible formats: json, XML, and plain text. When retrieving the plain text output, some metadata about the log is included in HTTP Headers. JSON and XML output formats include metadata about each output log line, as well as metadata about the state of the execution and log file, and your current index location in the file.

Output can be selected by Node or Step Context or both as of API v10.

Several parameters can be used to retrieve only part of the output log data. You can use these parameters to more efficiently retrieve the log content over time while an execution is running.

The log file used to store the execution output is a formatted text file which also contains metadata about each line of log output emitted during an execution. Several data values in this API endpoint refer to "bytes", but these do not reflect the size of the final log data; they are only relative to the formatted log file itself. You can treat these byte values as opaque locations in the log file, but you should not try to correlate them to the actual textual log lines.

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

This endpoint requires that the user have `read` access to the Job or to Adhoc executions to retrieve the output content.


- **200 Response Example**:
	- **example**:
```json
{
  "id": 1,
  "compacted": "true",
  "compactedAttr": "log",
  "entries": [
    {
      "time": 61200,
      "absolute_time": "1970-01-02T01:00:00.000Z",
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
      "log": "This is the fifth log message"
    }
  ]
}
```
- **200 Response Example**:
	- **example**:
```json
"Log output text..."
```

## Execution Output For Node
### Endpoint: /execution/{id}/output/node/{nodename}
- **Method**: GET
- **Description**: Get the output for an execution filtered for a specific node.

## Execution Output For Node and Step
### Endpoint: /execution/{id}/output/node/{nodename}/step/{stepctx}
- **Method**: GET
- **Description**: Get the output for an execution filtered for a specific node and step.

## Execution Output with State
### Endpoint: /execution/{id}/output/state
- **Method**: GET
- **Description**: Get the metadata associated with workflow step state changes along with the log output, optionally excluding log output.

JSON response requires API v14.


## Execution Output For Step
### Endpoint: /execution/{id}/output/step/{stepctx}
- **Method**: GET
- **Description**: Get the output for an execution filtered for a specific step.

## Get Execution Result Data [Enterprise]
### Endpoint: /execution/{id}/result/data
- **Method**: GET
- **Description**: Retrieve the Result Data created by a Job using the [Result Data feature](https://docs.rundeck.com/docs/manual/execution-lifecycle/result-data.html) in JSON format.

Note: In a Rundeck Cluster, Result Data may not be locally available and must be retrieved by the server asynchronously before it can be returned.

You can handle this situation in two ways: either use the `wait=true` URL parameter, to indicate that the API request should block until the data is retrieved (waiting up to 10 seconds), or if the response has HTTP status 202 it means that the asynchronous request was started but has not completed yet and you can retry the same API request shortly.

Since: v40


## Check Execution Result Data Availability [Enterprise]
### Endpoint: /execution/{id}/result/dataAvailable
- **Method**: GET
- **Description**: Check whether the execution has Result Data created by a Job using the [Result Data feature](https://docs.rundeck.com/docs/manual/execution-lifecycle/result-data.html).

Since: v40


## INCUBATING: ROI Metrics Data Available [Enterprise]
### Endpoint: /execution/{id}/roimetrics/available
- **Method**: GET
- **Description**: Get result indicating whether ROI metrics data is available.

## INCUBATING: ROI Metrics Data [Enterprise]
### Endpoint: /execution/{id}/roimetrics/data
- **Method**: GET
- **Description**: Get result data for ROI Metrics.

## Execution State
### Endpoint: /execution/{id}/state
- **Method**: GET
- **Description**: Get detail about the node and step state of an execution by ID. The execution can be currently running or completed.

JSON response requires API v14.

- **200 Response Example**:
	- **example**:
```json
{
  "completed": true,
  "executionState": "SUCCEEDED",
  "endTime": "2014-01-13T20:38:36.000Z",
  "serverNode": "dignan",
  "startTime": "2014-01-13T20:38:25.000Z",
  "updateTime": "2014-01-13T20:38:36.000Z",
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
      "endTime": "2014-01-13T20:38:31.000Z",
      "nodeStates": {
        "dignan": {
          "executionState": "SUCCEEDED",
          "endTime": "2014-01-13T20:38:31.000Z",
          "updateTime": "2014-01-13T20:38:31.000Z",
          "startTime": "2014-01-13T20:38:25.000Z"
        }
      },
      "updateTime": "2014-01-13T20:38:25.000Z",
      "nodeStep": true,
      "id": "1",
      "startTime": "2014-01-13T20:38:25.000Z"
    },
    {
      "workflow": {
        "completed": true,
        "startTime": "2014-01-13T20:38:31.000Z",
        "updateTime": "2014-01-13T20:38:36.000Z",
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
            "endTime": "2014-01-13T20:38:36.000Z",
            "nodeStates": {
              "dignan": {
                "executionState": "SUCCEEDED",
                "endTime": "2014-01-13T20:38:36.000Z",
                "updateTime": "2014-01-13T20:38:36.000Z",
                "startTime": "2014-01-13T20:38:31.000Z"
              }
            },
            "updateTime": "2014-01-13T20:38:31.000Z",
            "nodeStep": true,
            "id": "1",
            "startTime": "2014-01-13T20:38:31.000Z"
          }
        ],
        "endTime": "2014-01-13T20:38:36.000Z",
        "executionState": "SUCCEEDED"
      },
      "executionState": "SUCCEEDED",
      "endTime": "2014-01-13T20:38:36.000Z",
      "hasSubworkflow": true,
      "updateTime": "2014-01-13T20:38:36.000Z",
      "nodeStep": false,
      "id": "2",
      "startTime": "2014-01-13T20:38:31.000Z"
    }
  ]
}
```

## Bulk Delete Executions
### Endpoint: /executions/delete
- **Method**: POST
- **Description**: Delete a set of Executions by their IDs.

The IDs can be specified in two ways:

1. Using a URL parameter `ids`, as a comma separated list, with no body content

        POST /api/12/executions/delete?ids=1,2,17
        Content-Length: 0

2. Using a request body of JSON data.

Note: the JSON schema also supports a basic JSON array 

- **Example Request**:
	- **object**:
```json
{
  "ids": [
    1,
    2,
    17
  ]
}
```
	- **array**:
```json
[
  1,
  2,
  17
]
```
- **200 Response Example**:
	- **example**:
```json
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

## Execution Query Metrics
### Endpoint: /executions/metrics
- **Method**: GET
- **Description**: Obtain metrics over the result set of an execution query.
- **200 Response Example**:
	- **example**:
```json
{
  "duration": {
    "average": "1s",
    "min": "0s",
    "max": "3s"
  },
  "total": 1325
}
```

## List all System Feature on/off Status
### Endpoint: /feature
- **Method**: GET
- **Description**: The query will return all system features' status

## Get Rundeck System Feature Status
### Endpoint: /feature/{featureName}
- **Method**: GET
- **Description**: Return whether a feature is enabled or disabled.

## Getting a Job Definition
### Endpoint: /job/{id}
- **Method**: GET
- **Description**: Export a single job definition, in one of the supported formats.

Authorization required: `read` for the Job.

## Deleting a Job Definition
### Endpoint: /job/{id}
- **Method**: DELETE
- **Description**: Delete a single job definition.

Authorization required: `delete` for the job.

## Disable Executions for a Job
### Endpoint: /job/{id}/execution/disable
- **Method**: POST
- **Description**: Disable executions for a job. 

Authorization required: `toggle_execution` action for a job.

Since: V14
- **200 Response Example**:
	- **example**:
```json
{
  "success": true
}
```

## Enable Executions for a Job
### Endpoint: /job/{id}/execution/enable
- **Method**: POST
- **Description**: Enable executions for a job. 

Authorization required: `toggle_execution` action for a job.

Since: V14
- **200 Response Example**:
	- **example**:
```json
{
  "success": true
}
```

## Getting Executions for a Job
### Endpoint: /job/{id}/executions
- **Method**: GET
- **Description**: Get the list of executions for a Job.

Authorizations required: `read` or `view` for the Job, and `read` for the project resource type `execution`.

- **200 Response Example**:
	- **example**:
```json
[
  {
    "id": 1,
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
      "nodea",
      "nodeb"
    ],
    "failedNodes": [
      "nodec",
      "noded"
    ]
  }
]
```

## Running a Job
### Endpoint: /job/{id}/executions
- **Method**: POST
- **Description**: Run a job specified by ID.

Parameters can be specified in the request body, instead of as query parameters

Authorization required: `run` for the Job resource.

- **Example Request**:
	- **example**:
```json
{
  "argString": "...",
  "loglevel": "...",
  "asUser": "...",
  "filter": "...",
  "runAtTime": "...",
  "options": {
    "myopt1": "value"
  }
}
```
- **200 Response Example**:
	- **example**:
```json
{
  "id": 1,
  "href": "[url]",
  "permalink": "[url]",
  "status": "succeeded/failed/aborted/timedout/retried/other",
  "project": "[project]",
  "user": "[user]",
  "date-started": {
    "unixtime": 1431536339809,
    "date": "2015-05-13T16:58:59.000Z"
  },
  "date-ended": {
    "unixtime": 1431536346423,
    "date": "2015-05-13T16:59:06.000Z"
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
    "nodea",
    "nodeb"
  ],
  "failedNodes": [
    "nodec",
    "noded"
  ]
}
```

## Delete all Executions for a Job
### Endpoint: /job/{id}/executions
- **Method**: DELETE
- **Description**: Delete all executions for a Job.

## Get Job Forecast
### Endpoint: /job/{id}/forecast
- **Method**: GET
- **Description**: Get Metadata for the job including a schedule forecast for a specific amount of time of the job by ID.

Authorization required: `read` or `view` for the Job

Since: V31

## Get Job Metadata
### Endpoint: /job/{id}/info
- **Method**: GET
- **Description**: Get metadata about a specific job.

Authorization required: `read` or `view` for the job.

Since: V18

## Upload Multiple Files for Job Options
### Endpoint: /job/{id}/input/file
- **Method**: POST
- **Description**: Job Options of type `file` require a file input. You can upload multiple files en-masse.

Each uploaded file is assigned a unique "file key" identifier.
You can then Run the Job using the "file key" as the option value.

For multiple files, use a Multi-part request.  For each file, specify the field name as `option.NAME` where NAME
is the option name. The filename is specified normally within the multi-part request.

Since: v19

## Upload a File for a Job Option
### Endpoint: /job/{id}/input/file/{optionName}
- **Method**: POST
- **Description**: Job Options of type `file` require a file input. This endpoint uploads a single file individually.

Each uploaded file is assigned a unique "file key" identifier.
You can then Run the Job using the "file key" as the option value.

Since: v19

## Retry a Job based on execution
### Endpoint: /job/{id}/retry/{executionId}
- **Method**: POST
- **Description**: Retry a failed execution on failed nodes only or on the same as the execution.
This is the same functionality as the `Retry Failed Nodes ...` button on the execution page.

Parameters can be specified in the request body, instead of as query parameters

Authorization required: `run` for the Job resource, and `read` or `view` for the Execution resource.

Since: v24

- **Example Request**:
	- **example**:
```json
{
  "failedNodes": true,
  "argString": "...",
  "loglevel": "...",
  "asUser": "...",
  "filter": "...",
  "runAtTime": "...",
  "options": {
    "myopt1": "value"
  }
}
```
- **200 Response Example**:
	- **example**:
```json
{
  "id": 1,
  "href": "[url]",
  "permalink": "[url]",
  "status": "succeeded/failed/aborted/timedout/retried/other",
  "project": "[project]",
  "user": "[user]",
  "date-started": {
    "unixtime": 1431536339809,
    "date": "2015-05-13T16:58:59.000Z"
  },
  "date-ended": {
    "unixtime": 1431536346423,
    "date": "2015-05-13T16:59:06.000Z"
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
    "nodea",
    "nodeb"
  ],
  "failedNodes": [
    "nodec",
    "noded"
  ]
}
```

## Running a Job
### Endpoint: /job/{id}/run
- **Method**: POST
- **Description**: Run a job specified by ID.

Parameters can be specified in the request body, instead of as query parameters

Authorization required: `run` for the Job resource.

- **Example Request**:
	- **example**:
```json
{
  "argString": "...",
  "loglevel": "...",
  "asUser": "...",
  "filter": "...",
  "runAtTime": "...",
  "options": {
    "myopt1": "value"
  }
}
```
- **200 Response Example**:
	- **example**:
```json
{
  "id": 1,
  "href": "[url]",
  "permalink": "[url]",
  "status": "succeeded/failed/aborted/timedout/retried/other",
  "project": "[project]",
  "user": "[user]",
  "date-started": {
    "unixtime": 1431536339809,
    "date": "2015-05-13T16:58:59.000Z"
  },
  "date-ended": {
    "unixtime": 1431536346423,
    "date": "2015-05-13T16:59:06.000Z"
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
    "nodea",
    "nodeb"
  ],
  "failedNodes": [
    "nodec",
    "noded"
  ]
}
```

## Disable Schedule for a Job
### Endpoint: /job/{id}/schedule/disable
- **Method**: POST
- **Description**: Disable schedule for a job. 

Authorization required: `toggle_schedule` action for a job.

Since: V14
- **200 Response Example**:
	- **example**:
```json
{
  "success": true
}
```

## Enable Schedule for a Job
### Endpoint: /job/{id}/schedule/enable
- **Method**: POST
- **Description**: Enable schedule for a job. 

Authorization required: `toggle_schedule` action for a job.

Since: V14
- **200 Response Example**:
	- **example**:
```json
{
  "success": true
}
```

## Perform Job SCM Action
### Endpoint: /job/{id}/scm/{integration}/action/{actionId}
- **Method**: POST
- **Description**: Perform the action for the SCM integration plugin, with a set of input parameters,
for the Job.

Depending on the available Input Fields for the action. (See `/job/{id}/scm/{integration}/action/inputs`), the action will
expect a set of `input` values.

Authorization required: `export` or `scm_export` (for export integration), or `import` or `scm_import` (for import integration), for the Job resource.

Since: v15
- **Example Request**:
	- **example**:
```json
{
  "input": {
    "field1": "value1",
    "field2": "value2"
  }
}
```
- **200 Response Example**:
	- **example**:
```json
{
  "message": "Some message.",
  "nextAction": "next-action",
  "success": true
}
```
- **400 Response Example**:
	- **example**:
```json
{
  "message": "Some input was invalid.",
  "success": false,
  "validationErrors": {
    "dir": "required",
    "url": "required"
  }
}
```

## Get Job SCM Action Input Fields
### Endpoint: /job/{id}/scm/{integration}/action/{actionId}/input
- **Method**: GET
- **Description**: Get the input fields and selectable items for a specific action.

Each action may have a set of Input Fields describing user-input values.

Export actions may have a set of `exportItems`s which describe Job changes that can be
included in the action.

Import actions may have a set of `importItems`s which describe paths from the import repo
which can be selected for the action, they will also be associated with a Job after they are matched.

Authorization required: `export` or `scm_export` (for export integration), or `import` or `scm_import` (for import integration), for the Job resource.

Since: v15

## Get Job SCM Diff
### Endpoint: /job/{id}/scm/{integration}/diff
- **Method**: GET
- **Description**: Retrieve the file diff for the Job, if there are changes for the integration.

The format of the diff content depends on the specific plugin. For the Git plugins,
a unified diff format is used.

Authorization required: `export` or `scm_export` (for export integration), or `import` or `scm_import` (for import integration), for the Job resource.

Since: v15
- **200 Response Example**:
	- **example**:
```json
{
  "commit": {},
  "diffContent": "...",
  "id": "$jobId",
  "incomingCommit": {},
  "integration": "$integration",
  "project": "$project"
}
```

## Get Job SCM Status
### Endpoint: /job/{id}/scm/{integration}/status
- **Method**: GET
- **Description**: Get SCM status for a Job.

Authorization required: `export` or `scm_export` (for export integration), or `import` or `scm_import` (for import integration), for the Job resource.

Since: v15

- **200 Response Example**:
	- **example**:
```json
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

## Get Job Workflow
### Endpoint: /job/{id}/workflow
- **Method**: GET
- **Description**: Get the workflow tree for a job. It will traverse referenced jobs to a depth of 3.

Authorization required: `read` or `view` for the Job.

The authorization level affects the response data.

* `read` - full workflow details are included for each step
* `view` - basic information and description is included for each step

Since: v34
- **200 Response Example**:
	- **example**:
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
      "nodeStep": true,
      "workflow": []
    }
  ]
}
```

## Bulk Job Delete
### Endpoint: /jobs/delete
- **Method**: POST
- **Description**: Delete multiple job definitions at once.

Both `DELETE` and `POST` are allowed for doing a bulk delete of jobs. 
However, to send a body with the request, 
then the POST method must be used, 
since the DELETE method does not allow for request bodies.
 
Authorization required: `delete` on project resource type `job`, and `delete` on each Job resource.

- **200 Response Example**:
	- **example**:
```json
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

## Bulk Job Delete
### Endpoint: /jobs/delete
- **Method**: DELETE
- **Description**: Delete multiple job definitions at once.

Both `DELETE` and `POST` are allowed for doing a bulk delete of jobs. 
However, to send a body with the request, 
then the POST method must be used, 
since the DELETE method does not allow for request bodies.
 
Authorization required: `delete` on project resource type `job`, and `delete` on each Job resource.


## Bulk Toggle Job Execution Disabled
### Endpoint: /jobs/execution/disable
- **Method**: POST
- **Description**: Toggle executions disabled for a set of jobs.

Authorization required: `toggle_execution` action for each job.

Since: v16
- **200 Response Example**:
	- **example**:
```json
{
  "requestCount": 2,
  "enabled": true,
  "allsuccessful": false,
  "succeeded": [
    {
      "id": "[UUID]",
      "message": "success message"
    }
  ],
  "failed": [
    {
      "id": "[UUID]",
      "errorCode": "(error code, see above)",
      "message": "(success or failure message)"
    }
  ]
}
```

## Bulk Toggle Job Execution Enabled
### Endpoint: /jobs/execution/enable
- **Method**: POST
- **Description**: Toggle executions enabled for a set of jobs.

Authorization required: `toggle_execution` action for each job.

Since: v16
- **200 Response Example**:
	- **example**:
```json
{
  "requestCount": 2,
  "enabled": true,
  "allsuccessful": false,
  "succeeded": [
    {
      "id": "[UUID]",
      "message": "success message"
    }
  ],
  "failed": [
    {
      "id": "[UUID]",
      "errorCode": "(error code, see above)",
      "message": "(success or failure message)"
    }
  ]
}
```

## Get Info About an Uploaded File
### Endpoint: /jobs/file/{id}
- **Method**: GET
- **Description**: Get info about an uploaded file given its ID.
- **200 Response Example**:
	- **example**:
```json
{
  "dateCreated": "2017-02-24T19:10:33.000Z",
  "execId": 2741,
  "expirationDate": "2017-02-24T19:11:03.000Z",
  "fileState": "deleted",
  "id": "f985864b-fa1b-4e09-af7a-4315e9908372",
  "jobId": "7b3fff59-7a2d-4a31-a5b2-dd26177c823c",
  "serverNodeUUID": "3425B691-7319-4EEE-8425-F053C628B4BA",
  "sha": "9284ed4fd7fe1346904656f329db6cc49c0e7ae5b8279bff37f96bc6eb59baad",
  "size": 12,
  "user": "admin"
}
```

## Bulk Toggle Job Schedule Disabled
### Endpoint: /jobs/schedule/disable
- **Method**: POST
- **Description**: Toggle schedule disabled for a set of jobs.

Authorization required: `toggle_schedule` action for each job.

Since: v16
- **200 Response Example**:
	- **example**:
```json
{
  "requestCount": 2,
  "enabled": true,
  "allsuccessful": false,
  "succeeded": [
    {
      "id": "[UUID]",
      "message": "success message"
    }
  ],
  "failed": [
    {
      "id": "[UUID]",
      "errorCode": "(error code, see above)",
      "message": "(success or failure message)"
    }
  ]
}
```

## Bulk Toggle Job Schedule Enabled
### Endpoint: /jobs/schedule/enable
- **Method**: POST
- **Description**: Toggle schedule enabled for a set of jobs.

Authorization required: `toggle_schedule` action for each job.

Since: v16
- **200 Response Example**:
	- **example**:
```json
{
  "requestCount": 2,
  "enabled": true,
  "allsuccessful": false,
  "succeeded": [
    {
      "id": "[UUID]",
      "message": "success message"
    }
  ],
  "failed": [
    {
      "id": "[UUID]",
      "errorCode": "(error code, see above)",
      "message": "(success or failure message)"
    }
  ]
}
```

## Get Rundeck metrics
### Endpoint: /metrics/{name}
- **Method**: GET
- **Description**: Return metrics and information
- **404 Response Example**:
	- **example**:
```json
{
  "error": true,
  "errorCode": "api.error.code",
  "message": "not ok",
  "apiversion": 41
}
```

## List installed plugins
### Endpoint: /plugin/list
- **Method**: GET
- **Description**: Get the list of installed Plugins.

Since: v33


## List Projects
### Endpoint: /project/projects
- **Method**: GET
- **Description**: List the existing projects on the server.

Authorization required: `read` for project resource

- **200 Response Example**:
	- **example**:
```json
[
  {
    "name": "...",
    "description": "...",
    "url": "..."
  }
]
```

## Create a Project
### Endpoint: /project/projects
- **Method**: POST
- **Description**: Create a new project.

Authorization required: `create` for resource type `project`

- **Example Request**:
	- **example**:
```json
{
  "name": "myproject",
  "config": {
    "propname": "propvalue"
  }
}
```
- **200 Response Example**:
	- **example**:
```json
{
  "description": "",
  "name": "NAME",
  "url": "http://server:4440/api/11/project/NAME",
  "config": {}
}
```

## Get a project
### Endpoint: /project/{project}
- **Method**: GET
- **Description**: Get information about a project.
The reponse in XML or JSON format is determined by the Accept request header.

Authorization required: `read` access for `project` resource type to get basic project details and `configure` access to get all properties config or `admin` or `app_admin` access for `user` resource type.
- **200 Response Example**:
	- **example**:
```json
{
  "description": "",
  "name": "PROJECT_NAME",
  "url": "http://server:4440/api/11/project/PROJECT_NAME",
  "config": {}
}
```

## Delete a project
### Endpoint: /project/{project}
- **Method**: DELETE
- **Description**: Delete an existing projects on the server.

Authorization required: `delete` access for `project` resource type or `admin` or `app_admin` access for `user` resource type.

## Get ACL Policy file for a project.
### Endpoint: /project/{project}/acl/{path}
- **Method**: GET
- **Description**: Retrieve the YAML text of the ACL Policy file for a project. 
If YAML or text content is requested, the contents will be returned directly. Otherwise if XML or JSON is requested, the YAML text will be wrapped within that format.

Authorization required: `read` access for `Project ACL` resource type or `admin` or `app_admin` access for `user` resource type.
Since: v14
- **200 Response Example**:
	- **example**:
```json
"description: \"my policy\"\ncontext:\n  application: rundeck\nfor:\n  project:\n    - allow: read\nby:\n  group: build"
```
- **200 Response Example**:
	- **example**:
```json
"description: \"my policy\"\ncontext:\n  application: rundeck\nfor:\n  project:\n    - allow: read\nby:\n  group: build"
```
- **200 Response Example**:
	- **example**:
```json
{
  "contents": "description: \"my policy\"\ncontext:\n  application: rundeck\nfor:\n  project:\n    - allow: read\nby:\n  group: build"
}
```

## Update a Project ACL Policy
### Endpoint: /project/{project}/acl/{path}
- **Method**: PUT
- **Description**: Use `PUT` to update a policy.
If the Content-Type is `application/yaml` or `text/plain`, then the request body is the ACL policy contents directly. 
Otherwise if XML or JSON is requested, the YAML text will be wrapped within that format.

Authorization required: `update` access for `Project ACL` resource type or `admin` or `app_admin` access for `user` resource type.
Since: v14
- **Example Request**:
	- **example**:
```json
"description: \"my policy\"\ncontext:\n  application: rundeck\nfor:\n  project:\n    - allow: read\nby:\n  group: build"
```
- **Example Request**:
	- **example**:
```json
"description: \"my policy\"\ncontext:\n  application: rundeck\nfor:\n  project:\n    - allow: read\nby:\n  group: build"
```
- **Example Request**:
	- **example**:
```json
{
  "contents": "description: \"my policy\"\ncontext:\n  application: rundeck\nfor:\n  project:\n    - allow: read\nby:\n  group: build"
}
```
- **200 Response Example**:
	- **example**:
```json
"description: \"my policy\"\ncontext:\n  application: rundeck\nfor:\n  project:\n    - allow: read\nby:\n  group: build"
```
- **200 Response Example**:
	- **example**:
```json
"description: \"my policy\"\ncontext:\n  application: rundeck\nfor:\n  project:\n    - allow: read\nby:\n  group: build"
```
- **200 Response Example**:
	- **example**:
```json
{
  "contents": "description: \"my policy\"\ncontext:\n  application: rundeck\nfor:\n  project:\n    - allow: read\nby:\n  group: build"
}
```

## Update a Project ACL Policy
### Endpoint: /project/{project}/acl/{path}
- **Method**: POST
- **Description**: Use `POST` to create a policy.
If the Content-Type is `application/yaml` or `text/plain`, then the request body is the ACL policy contents directly. 
Otherwise if XML or JSON is requested, the YAML text will be wrapped within that format.

Authorization required: `create` access for `Project ACL` resource type or `admin` or `app_admin` access for `user` resource type.
Since: v14
- **Example Request**:
	- **example**:
```json
"description: \"my policy\"\ncontext:\n  application: rundeck\nfor:\n  project:\n    - allow: read\nby:\n  group: build"
```
- **Example Request**:
	- **example**:
```json
"description: \"my policy\"\ncontext:\n  application: rundeck\nfor:\n  project:\n    - allow: read\nby:\n  group: build"
```
- **Example Request**:
	- **example**:
```json
{
  "contents": "description: \"my policy\"\ncontext:\n  application: rundeck\nfor:\n  project:\n    - allow: read\nby:\n  group: build"
}
```
- **201 Response Example**:
	- **example**:
```json
"description: \"my policy\"\ncontext:\n  application: rundeck\nfor:\n  project:\n    - allow: read\nby:\n  group: build"
```
- **201 Response Example**:
	- **example**:
```json
"description: \"my policy\"\ncontext:\n  application: rundeck\nfor:\n  project:\n    - allow: read\nby:\n  group: build"
```
- **201 Response Example**:
	- **example**:
```json
{
  "contents": "description: \"my policy\"\ncontext:\n  application: rundeck\nfor:\n  project:\n    - allow: read\nby:\n  group: build"
}
```

## Delete an ACL policy file.
### Endpoint: /project/{project}/acl/{path}
- **Method**: DELETE
- **Description**: Delete a project ACL policy file.

Authorization required: `delete` access for `Project ACL` resource type or `admin` or `app_admin` access for `user` resource type.
Since: v14

## List Project Calendars [Enterprise]
### Endpoint: /project/{project}/calendars
- **Method**: GET
- **Description**: Get all calendars at project scope.

Authorization required: `admin` or `app_admin` access for `user` resource type.

Since: v41
- **200 Response Example**:
	- **example**:
```json
[
  {
    "id": 1,
    "name": "[NAME]",
    "description": "[DESCRIPTION]",
    "calendarType": "[blackout/allowed]",
    "scope": "project",
    "project": "[PROJECT]",
    "dateType": "[date,range,daily,monthly]",
    "dateDefinition": ""[DATE-DEFINITION]"",
    "enable": true,
    "allReference": true,
    "recurrent": true,
    "objects": [
      {
        "uuid": "[JOBUUID]",
        "name": "[JOBNAME"]
      }
    ]
  }
]
```

## Create/Update Project Calendar [Enterprise]
### Endpoint: /project/{project}/calendars
- **Method**: POST
- **Description**: Create or update a calendar at project scope.
* if the ID exists, it will update the existing calendar, otherwise a new one will be created.

Authorization required: `admin` or `app_admin` access for `user` resource type.

Since: v41
- **Example Request**:
	- **example**:
```json
{
  "id": 1,
  "name": "[NAME]",
  "description": "[DESCRIPTION]",
  "calendarType": "[blackout/allowed]",
  "scope": "project",
  "project": "[PROJECT]",
  "dateType": "[date,range,daily,monthly]",
  "dateDefinition": "[DATE-DEFINITION]",
  "enable": true,
  "allReference": true,
  "recurrent": true,
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
- **200 Response Example**:
	- **example**:
```json
{
  "calendar": {
    "id": 1,
    "name": "New Calendar",
    "description": "test",
    "calendarType": "blackout",
    "scope": "project",
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
  },
  "saved": true,
  "msg": "Saved Calendar"
}
```

## Delete Project Calendar [Enterprise]
### Endpoint: /project/{project}/calendars/{id}
- **Method**: DELETE
- **Description**: Deletes a calendar at project scope.

Authorization required: `delete` access for `project` resource type or `admin` or `app_admin` access for `user` resource type.

Since: v41

## Get a project config
### Endpoint: /project/{project}/config
- **Method**: GET
- **Description**: Retrieve the project configuration data.
The response, based on `Accept` header, can be returned in the Text, XML or Json format.

Authorization required: `configure` access for `project` resource type or `admin` or `app_admin` access for `user` resource type.
- **200 Response Example**:
	- **example**:
```json
"key=value\nkey2=value"
```
- **200 Response Example**:
	- **example**:
```json
{
  "key": "value",
  "key2": "value2..."
}
```

## Modify a project config
### Endpoint: /project/{project}/config
- **Method**: PUT
- **Description**: Replaces all configuration data with the submitted values.
The response, based on `Accept` header, can be returned in the Text, XML or Json format.

Authorization required: `configure` access for `project` resource type or `admin` or `app_admin` access for `user` resource type.
- **Example Request**:
	- **set-project-config**:
```json
{
  "key": "value",
  "key2": "value2..."
}
```
- **Example Request**:
	- **set-project-config**:
```json
"key=value\nkey2=value"
```
- **200 Response Example**:
	- **example**:
```json
{
  "key": "value",
  "key2": "value2..."
}
```
- **200 Response Example**:
	- **example**:
```json
"key=value\nkey2=value"
```

## Get an individual project config by their key
### Endpoint: /project/{project}/config/{keypath}
- **Method**: GET
- **Description**: Retrieve an individual configuration properties by their key.
The response, based on `Accept` header, can be returned in the Text, XML or Json format.

Authorization required: `configure` access for `project` resource type or `admin` or `app_admin` access for `user` resource type.
- **200 Response Example**:
	- **example**:
```json
"key=value\nkey2=value"
```
- **200 Response Example**:
	- **example**:
```json
{
  "key": "value",
  "key2": "value2..."
}
```

## Set the value.
### Endpoint: /project/{project}/config/{keypath}
- **Method**: PUT
- **Description**: Replace an individual configuration data with the submitted value.
The response, based on `Accept` header, can be returned in the Text, XML or Json format.

Authorization required: `configure` access for `project` resource type or `admin` or `app_admin` access for `user` resource type.
- **Example Request**:
	- **set-project-config**:
```json
{
  "[KEY]": "key value"
}
```
- **Example Request**:
	- **set-project-config**:
```json
"key value"
```
- **200 Response Example**:
	- **example**:
```json
{
  "[KEY]": "key value"
}
```
- **200 Response Example**:
	- **example**:
```json
"key value"
```

## Delete the key
### Endpoint: /project/{project}/config/{keypath}
- **Method**: DELETE
- **Description**: Delete an individual configuration properties by their key.

Authorization required: `configure` access for `project` resource type or `admin` or `app_admin` access for `user` resource type.

## Disable Project executions or schedules after a duration of time
### Endpoint: /project/{project}/disable/later
- **Method**: POST
- **Description**: Sets project execution mode to Passive or disables Schedules at a later time.

Since: v34

- **Example Request**:
	- **Disable-Schedule**:
```json
{
  "type": "schedule",
  "value": "2h30m"
}
```
	- **Disable-Executions**:
```json
{
  "type": "executions",
  "value": "1d"
}
```
- **200 Response Example**:
	- **example**:
```json
{
  "saved": true,
  "msg": "Project Execution Mode Later saved"
}
```
- **400 Response Example**:
	- **example**:
```json
{
  "saved": false,
  "msg": "Project Execution Mode Later saved"
}
```

## Enable Project executions or schedules after a duration of time
### Endpoint: /project/{project}/enable/later
- **Method**: POST
- **Description**: Sets project execution mode to Active or enable Schedules at a later time.

Since: v34

- **Example Request**:
	- **Enable-Schedule**:
```json
{
  "type": "schedule",
  "value": "2h30m"
}
```
	- **Enable-Executions**:
```json
{
  "type": "executions",
  "value": "1d"
}
```
- **200 Response Example**:
	- **example**:
```json
{
  "saved": true,
  "msg": "Project Execution Mode Later saved"
}
```
- **400 Response Example**:
	- **example**:
```json
{
  "saved": false,
  "msg": "Project Execution Mode Later saved"
}
```

## Execution Query
### Endpoint: /project/{project}/executions
- **Method**: GET
- **Description**: Query for Executions based on Job or Execution details.
- **200 Response Example**:
	- **example**:
```json
{
  "paging": {
    "count": 2,
    "total": 2,
    "offset": 0,
    "max": 20
  },
  "executions": [
    {
      "id": 387,
      "href": "[API url]",
      "permalink": "[GUI url]",
      "status": "[status]",
      "customStatus": "[string]",
      "project": "test",
      "user": "[user]",
      "serverUUID": "[UUID]",
      "date-started": {
        "unixtime": 1431536339809,
        "date": "2015-05-13T16:58:59.000Z"
      },
      "date-ended": {
        "unixtime": 1431536346423,
        "date": "2015-05-13T16:59:06.000Z"
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
    }
  ]
}
```

## Execution Query Metrics
### Endpoint: /project/{project}/executions/metrics
- **Method**: GET
- **Description**: Obtain metrics over the result set of an execution query over the executions of a single project.

Note: This endpoint has the same query parameters and response as the `/executions/metrics` endpoint.


## Listing Running Executions
### Endpoint: /project/{project}/executions/running
- **Method**: GET
- **Description**: List the currently running executions for a project or all projects.

Authorization required: `read` for project resource type `event`

- **200 Response Example**:
	- **example**:
```json
{
  "paging": {
    "count": 1,
    "total": 1,
    "offset": 0,
    "max": 20
  },
  "executions": [
    {
      "id": 1,
      "href": "[url]",
      "permalink": "[url]",
      "status": "running/scheduled/queued",
      "project": "[project]",
      "user": "[user]",
      "date-started": {
        "unixtime": 1431536339809,
        "date": "2015-05-13T16:58:59.000Z"
      },
      "date-ended": {
        "unixtime": 1431536346423,
        "date": "2015-05-13T16:59:06.000Z"
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
        "nodea",
        "nodeb"
      ],
      "failedNodes": [
        "nodec",
        "noded"
      ]
    }
  ]
}
```

## Export a zip archive of the project.
### Endpoint: /project/{project}/export
- **Method**: GET
- **Description**: Performs the export to a zip archive of the project synchronously. 
Optional parameters:

* executionIds a list (comma-separated) of execution IDs. If this is specified then the archive will contain only executions that are specified, and will not contain Jobs, ACLs, or project configuration/readme files.
* optionally use POST method with with application/x-www-form-urlencoded content for large lists of execution IDs
* optionally, specify executionIds multiple times, with a single ID per entry.

In APIv19 or later:

By default, exportALL=true. So, in order to not export empty data, you need to include one of the parameter flags.

In APIv28 or later:

* exportScm true/false, include project SCM configuration, if authorized

In APIv34 or later:

* exportWebhooks true/false, include project webhooks in the archive
* whkIncludeAuthTokens true/false, include the auth token information when exporting webhooks, if not included the auth tokens will be regenerated upon import

Requires `export` authorization for the project resource.

## Export a zip archive of the project asynchronously.
### Endpoint: /project/{project}/export/async
- **Method**: GET
- **Description**: Performs the export to a zip archive of the project asynchronously.
Use the Token result to query the export status and to retrieve the result once ready 
Optional parameters:

* executionIds a list (comma-separated) of execution IDs. If this is specified then the archive will contain only executions that are specified, and will not contain Jobs, ACLs, or project configuration/readme files.
* optionally use POST method with with application/x-www-form-urlencoded content for large lists of execution IDs
* optionally, specify executionIds multiple times, with a single ID per entry.

In APIv19 or later:

By default, exportALL=true. So, in order to not export empty data, you need to include one of the parameter flags.

In APIv28 or later:

* exportScm true/false, include project SCM configuration, if authorized

In APIv34 or later:

* exportWebhooks true/false, include project webhooks in the archive
* whkIncludeAuthTokens true/false, include the auth token information when exporting webhooks, if not included the auth tokens will be regenerated upon import

Requires `export` authorization for the project resource.
- **200 Response Example**:
	- **example**:
```json
{
    "token":"[TOKEN]",
    "ready":true/false,
    "percentage":int,
}
```

## Download the zip archive file
### Endpoint: /project/{project}/export/download/{token}
- **Method**: GET
- **Description**: Download the archive file once the export status is `ready`.

Requires `export` authorization for the project resource.
Since: v19

## Get the status of an async export request
### Endpoint: /project/{project}/export/status/{token}
- **Method**: GET
- **Description**: Get the status of an async export request. 
Retrieve the result once ready with `/api/V/project/[PROJECT]/export/download/[TOKEN]`.

Requires `export` authorization for the project resource.
Since: v19
- **200 Response Example**:
	- **example**:
```json
{
    "token":"[TOKEN]",
    "ready":true/false,
    "percentage":int,
}
```

## Check Health Status Node Enhancer is Configured [Enterprise]
### Endpoint: /project/{project}/healthcheck/enhancer
- **Method**: GET
- **Description**: Check if the Project has the Health Status Node Enhancer configured.

Authorization required: `app_admin` for `system` resource.

- **200 Response Example**:
	- **example**:
```json
{
  "status": true,
  "message": "The project test has the HealthStatusNodeEnhancerPlugin installed"
}
```

## Refresh Node Healthcheck Status [Enterprise]
### Endpoint: /project/{project}/healthcheck/refresh
- **Method**: POST
- **Description**: Request a Refresh to the Healtcheck status for a set of Nodes.

Authorization required: `app_admin` for `system` resource.

- **Example Request**:
	- **example**:
```json
{
  "nodes": [
    "node1",
    "node2"
  ]
}
```
- **200 Response Example**:
	- **example**:
```json
{
  "message": "ok"
}
```

## Refresh All Project Node Healthchecks [Enterprise]
### Endpoint: /project/{project}/healthcheck/refresh/all
- **Method**: POST
- **Description**: Request a Refresh to the Healtcheck status for all Nodes in a Project.

Authorization required: `app_admin` for `system` resource.

- **200 Response Example**:
	- **example**:
```json
{
  "message": "ok"
}
```

## Get Node Healthcheck Status [Enterprise]
### Endpoint: /project/{project}/healthcheck/status
- **Method**: GET
- **Description**: Node Healtcheck status for a Node.

Authorization required: `app_admin` for `system` resource.



- **200 Response Example**:
	- **example**:
```json
{
  "node": "node-0",
  "project": "test",
  "healthchecks": [
    {
      "type": "command",
      "status": "HEALTHY",
      "data": {}
    }
  ],
  "status": "HEALTHY",
  "lastChecked": "2023-03-20T17:33:28.000Z",
  "duration": 25
}
```

## Get Node Healthcheck Status for All Nodes [Enterprise]
### Endpoint: /project/{project}/healthcheck/status/all
- **Method**: GET
- **Description**: Node Healtcheck status for all Nodes.

Authorization required: `app_admin` for `system` resource.

- **200 Response Example**:
	- **example**:
```json
[
  {
    "node": "459a545d524f",
    "project": "test",
    "href": "/api/44/project/test/healthcheck/status?nodename=459a545d524f",
    "status": "HEALTHY",
    "lastChecked": "2023-03-20T19:30:28Z",
    "duration": 35
  },
  {
    "node": "node-0",
    "project": "test",
    "href": "/api/44/project/test/healthcheck/status?nodename=node-0",
    "status": "HEALTHY",
    "lastChecked": "2023-03-20T19:30:28Z",
    "duration": 19
  }
]
```

## Listing History
### Endpoint: /project/{project}/history
- **Method**: GET
- **Description**: 
List the event history for a project.
- **200 Response Example**:
	- **example**:
```json
{
  "paging": {
    "count": 10,
    "total": 110,
    "max": 20,
    "offset": 100
  },
  "events": [
    {
      "starttime": 123,
      "endtime": 123,
      "title": "[job title, or adhoc]",
      "status": "[status]",
      "statusString": "[string]",
      "summary": "[summary text]",
      "node-summary": {
        "succeeded": 1,
        "failed": 2,
        "total": 3
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
  ]
}
```

## Import a zip archive.
### Endpoint: /project/{project}/import
- **Method**: PUT
- **Description**: Import a zip archive to the project.
Note: the import status indicates "failed" if any Jobs had failures, otherwise it indicates "successful" even if other files in the archive were not imported.

Requires `import` authorization for the project resource.
- **200 Response Example**:
	- **successful-result**:
```json
{
  "import_status": "successful"
}
```
	- **status-failed-result**:
```json
{
  "import_status": "failed",
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

## Listing Jobs
### Endpoint: /project/{project}/jobs
- **Method**: GET
- **Description**: List the jobs that exist for a project.

* `idlist`: specify a comma-separated list of Job IDs to include
* `groupPath`: specify a group or partial group path to include all jobs within that group path. (Default value: "*", all groups). Set to the special value "-" to match the top level jobs only
* `jobFilter`: specify a filter for the job Name. Matches any job name that contains this value.
* `jobExactFilter`: specify an exact job name to match.
* `groupPathExact`: specify an exact group path to match.  Set to the special value "-" to match the top level jobs only
* `scheduledFilter`: `true/false` specify whether to return only scheduled or only not scheduled jobs.
* `serverNodeUUIDFilter`: Value: a UUID. In cluster mode, use to select scheduled jobs assigned to the server with given UUID.

**Note:** It is possible to disable result set pagination by setting the property `rundeck.api.paginatejobs.enabled=false` which is assumed to be true if not set.

**Note:** If neither `groupPath` nor `groupPathExact` are specified, then the default `groupPath` value of "*" will be used (matching jobs in all groups).  `groupPathExact` cannot be combined with `groupPath`.  You can set either one to "-" to match only the top-level jobs which are not within a group.

Authorization required: `view` or `read` for each Job resource.

- **200 Response Example**:
	- **example**:
```json
[
  {
    "id": "[UUID]",
    "name": "[name]",
    "group": "[group]",
    "project": "[project]",
    "description": "...",
    "href": "[API url]",
    "permalink": "[GUI url]",
    "scheduled": true,
    "scheduleEnabled": true,
    "enabled": true
  }
]
```

## Export Jobs
### Endpoint: /project/{project}/jobs/export
- **Method**: GET
- **Description**: Export the job definitions in a Project in JSON or YAML formats.

Authorization required: `read` for each job resource.

Since: v14


## Import Job definitions
### Endpoint: /project/{project}/jobs/import
- **Method**: POST
- **Description**: Import a set of job definitions in a supported format.


Since: v14
- **200 Response Example**:
	- **example**:
```json
{
  "succeeded": [
    {
      "index": 1,
      "href": "http://madmartigan.local:4440/api/14/job/3b6c19f6-41ee-475f-8fd0-8f1a26f27a9a",
      "id": "3b6c19f6-41ee-475f-8fd0-8f1a26f27a9a",
      "name": "restart",
      "group": "app2/dev",
      "project": "test",
      "permalink": "http://madmartigan.local:4440/job/show/3b6c19f6-41ee-475f-8fd0-8f1a26f27a9a"
    }
  ],
  "failed": [
    {
      "index": 2,
      "href": "http://madmartigan.local:4440/api/14/job/3b6c19f6-41ee-475f-8fd0-8f1a26f27a9a",
      "id": "3b6c19f6-41ee-475f-8fd0-8f1a26f27a9a",
      "name": "restart",
      "group": "app2/dev",
      "project": "test",
      "permalink": "http://madmartigan.local:4440/job/show/3b6c19f6-41ee-475f-8fd0-8f1a26f27a9a",
      "error": "error message"
    }
  ],
  "skipped": []
}
```

## List all Jobs in Summarized Form [Enterprise]
### Endpoint: /project/{project}/listAllJobs
- **Method**: GET
- **Description**: List the jobs summarized for a project.
- **200 Response Example**:
	- **example**:
```json
[
  {
    "scheduleEnabled": true,
    "executionEnabled": true,
    "scheduled": false,
    "name": "test job",
    "type": "job",
    "uuid": "0bafa429-96ab-4568-ac60-0a440bc11f26",
    "actions": [
      "update",
      "view",
      "run",
      "delete",
      "read",
      "kill"
    ],
    "group": "job group",
    "desc": "a basic job"
  }
]
```

## Get Node Info
### Endpoint: /project/{project}/resource/{name}
- **Method**: GET
- **Description**: Get a specific resource within a project.

Authorization required: `read` for project resource type `node`, as well as `read` for the Node 

Since: v14

## List Project Nodes
### Endpoint: /project/{project}/resources
- **Method**: GET
- **Description**: List or query the nodes (resources) for a project.

Node Filter parameters: You can select nodes to include and exclude in the result set, see below.

**Note:** If no query parameters are included, the result set will include all Node resources for the project.

Refer to the [User Guide - Node Filters](https://docs.rundeck.com/docs/manual/11-node-filters.html) Documentation for information on
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

Authorization required: `read` for project resource type `node`, as well as `read` for each Node resource

Since: v14
- **200 Response Example**:
	- **example**:
```json
{
  "node1": {
    "nodename": "node1",
    "hostname": "node1",
    "osVersion": "5.15.49-linuxkit",
    "osFamily": "unix",
    "osArch": "amd64",
    "description": "Rundeck server node",
    "osName": "Linux"
  }
}
```
- **200 Response Example**:
	- **example**:
```json
"node1:\n  nodename: node1\n  hostname: node1\n  osVersion: 5.15.49-linuxkit\n  osFamily: unix\n  osArch: amd64\n  description: Rundeck server node\n  osName: Linux\n  tags: ''"
```

## Run Adhoc Command
### Endpoint: /project/{project}/run/command
- **Method**: POST
- **Description**: Run a command string.

Authorization required: `run` for project resource type `adhoc`, as well as `runAs` if the runAs parameter is used

Since: v14
- **Example Request**:
	- **example**:
```json
{
  "project": "[project]",
  "exec": "[exec]",
  "nodeThreadcount": 2,
  "nodeKeepgoing": true,
  "asUser": "[asUser]",
  "filter": "[node filter string]"
}
```
- **200 Response Example**:
	- **example**:
```json
{
  "message": "Immediate execution scheduled (X)",
  "execution": {
    "id": 1,
    "href": "[API Href]",
    "permalink": "[GUI Href]"
  }
}
```

## Run Adhoc Script
### Endpoint: /project/{project}/run/script
- **Method**: POST
- **Description**: Run a script.

Authorization required: `run` for project resource type `adhoc`, as well as `runAs` if the runAs parameter is used

Since: v14
- **Example Request**:
	- **example**:
```json
{
  "project": "[project]",
  "script": "[script]",
  "nodeThreadcount": 1,
  "nodeKeepgoing": true,
  "asUser": "[asUser]",
  "argString": "[argString]",
  "scriptInterpreter": "[scriptInterpreter]",
  "interpreterArgsQuoted": true,
  "fileExtension": "[fileExtension]",
  "filter": "[node filter string]"
}
```
- **200 Response Example**:
	- **example**:
```json
{
  "message": "Immediate execution scheduled (X)",
  "execution": {
    "id": 1,
    "href": "[API Href]",
    "permalink": "[GUI Href]"
  }
}
```

## Run Adhoc Script URL
### Endpoint: /project/{project}/run/url
- **Method**: POST
- **Description**: Run a script downloaded from a URL.

Authorization required: `run` for project resource type `adhoc`, as well as `runAs` if the runAs parameter is used

Since: v14
- **Example Request**:
	- **example**:
```json
{
  "project": "[project]",
  "url": "[scriptURL]",
  "nodeThreadcount": 1,
  "nodeKeepgoing": true,
  "asUser": "[asUser]",
  "argString": "[argString]",
  "scriptInterpreter": "[scriptInterpreter]",
  "interpreterArgsQuoted": true,
  "fileExtension": "[fileExtension]",
  "filter": "[node filter string]"
}
```
- **200 Response Example**:
	- **example**:
```json
{
  "message": "Immediate execution scheduled (X)",
  "execution": {
    "id": 1,
    "href": "[API Href]",
    "permalink": "[GUI Href]"
  }
}
```

## Perform Project SCM Action
### Endpoint: /project/{project}/scm/{integration}/action/{actionId}
- **Method**: POST
- **Description**: Perform the action for the SCM integration plugin, with a set of input parameters,
selected Jobs, or Items, or Items to delete.

Depending on the available Input Fields for the action (see `/project/{project}/scm/{integration}/action/{actionId}/input`), the action will
expect a set of `input` values.

The set of `jobs` and `items` to choose from will be included in the Input Fields response,
however where an Item has an associated Job, you can supply either the Job ID, or the Item ID.

When there are items to be deleted on `export` integration, you can specify the Item IDs in the `deleted`
section.  However, if the item is associated with a renamed Job, including the Job ID will have the same effect.

When there are items to be deleted on `import` integration, you must specify the Job IDs in the `deletedJobs`
section.

Note: including the Item ID of an associated job, instead of the Job ID,
will not automatically delete a renamed item.

Authorization Required: `export` or `scm_export` or `import` or `scm_import` for the Project resource (app context), depending on the integration type

Since: v15

## Get Project SCM Action Input Fields
### Endpoint: /project/{project}/scm/{integration}/action/{actionId}/input
- **Method**: GET
- **Description**:  Get the input fields and selectable items for a specific action.

Each action may have a set of Input Fields describing user-input values.

Export actions may have a set of `exportItems`s which describe Job changes that can be
included in the action.

Import actions may have a set of `importItems`s which describe paths from the import repo
which can be selected for the action, they will also be associated with a Job after they are matched.

Authorization Required: `export` or `scm_export` or `import` or `scm_import` for the Project resource (app context), depending on the integration type

Since: v15

## Get Project SCM Config
### Endpoint: /project/{project}/scm/{integration}/config
- **Method**: GET
- **Description**:  Get the configuration properties for the current plugin.

Authorization Required: `configure` for the Project resource (app context)

Since: v15

## Disable SCM Plugin for a Project
### Endpoint: /project/{project}/scm/{integration}/plugin/{type}/disable
- **Method**: POST
- **Description**:  Disable a plugin. (Idempotent).

Authorization Required: `configure` for the Project resource (app context)

Since: v15

## Enable SCM Plugin for a Project
### Endpoint: /project/{project}/scm/{integration}/plugin/{type}/enable
- **Method**: POST
- **Description**:  Enable a plugin that was previously configured. (Idempotent).

Authorization Required: `configure` for the Project resource (app context)

Since: v15

## Get SCM Plugin Input Fields
### Endpoint: /project/{project}/scm/{integration}/plugin/{type}/input
- **Method**: GET
- **Description**:  List the input fields for a specific plugin.

The response will list each input field.

Authorization Required: `export` or `scm_export` or `import` or `scm_import` for the Project resource (app context), depending on the integration type

Since: v15

## Setup SCM Plugin for a Project
### Endpoint: /project/{project}/scm/{integration}/plugin/{type}/setup
- **Method**: POST
- **Description**: Configure and enable a plugin for a project.

The request body is expected to contain entries for all of the `required` input fields for the plugin.

See the `/project/{project}/scm/{integration}/plugin/{type}/input` endpoint.

If a validation error occurs with the configuration, then the response will include detail about the errors.

Authorization Required: `configure` for the Project resource (app context)

Since: v15
- **Example Request**:
	- **example**:
```json
{
  "config": {
    "key": "value",
    "key2": "value2..."
  }
}
```

## List SCM Plugins
### Endpoint: /project/{project}/scm/{integration}/plugins
- **Method**: GET
- **Description**: Lists the available plugins for the specified integration.  Each plugin is identified by a 
`type` name.

Authorization Required: `configure` for the Project resource (app context)

Since: v15


## Get Project SCM Status
### Endpoint: /project/{project}/scm/{integration}/status
- **Method**: GET
- **Description**:  Get the SCM plugin status and available actions for the project.

Authorization Required: `export` or `scm_export` or `import` or `scm_import` for the Project resource (app context), depending on the integration type

Since: v15

## Get a Resource Model Source for a Project
### Endpoint: /project/{project}/source/{index}
- **Method**: GET
- **Description**: The response contains the `index`, the `type`, and 
details about the `resources`. If the
source had any error, that is included as `errors`.

Resources data includes any `description` provided by the source, whether it is `empty`, and
whether it is `writeable`.  The `href` indicates the URL for `/project/{project}/source/{index}/resources`.

Authorization required: `configure` for project resource

Since: v23
- **200 Response Example**:
	- **example**:
```json
{
  "index": 1,
  "resources": {
    "description": "/Users/greg/rundeck2.11/projects/atest/etc/resources.xml",
    "empty": false,
    "href": "http://ecto1.local:4440/api/23/project/atest/source/1/resources",
    "writeable": true
  },
  "type": "file"
}
```

## List Resources of a Resource Model Source
### Endpoint: /project/{project}/source/{index}/resources
- **Method**: GET
- **Description**: 
Authorization required: `configure` for project resource

Since: v23

## Update Resources of a Resource Model Source
### Endpoint: /project/{project}/source/{index}/resources
- **Method**: POST
- **Description**: 
Authorization required: `configure` for project resource

Since: v23
- **Example Request**:
	- **example**:
```json
{
  "node1": {
    "nodename": "node1",
    "hostname": "node1",
    "osVersion": "5.15.49-linuxkit",
    "osFamily": "unix",
    "osArch": "amd64",
    "description": "Rundeck server node",
    "osName": "Linux"
  }
}
```
- **Example Request**:
	- **example**:
```json
"node1:\n  nodename: node1\n  hostname: node1\n  osVersion: 5.15.49-linuxkit\n  osFamily: unix\n  osArch: amd64\n  description: Rundeck server node\n  osName: Linux\n  tags: ''"
```

## List Resource Model Sources for a Project
### Endpoint: /project/{project}/sources
- **Method**: GET
- **Description**: The response contains a set of `source` objects, each describes the `index`, the `type`, and 
details about the `resources`. If the
source had any error, that is included as `errors`.

Resources data includes any `description` provided by the source, whether it is `empty`, and
whether it is `writeable`.  The `href` indicates the URL for `/project/{project}/source/{index}/resources`.

Authorization required: `configure` for project resource

Since: v23
- **200 Response Example**:
	- **example**:
```json
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

## Import Tours Archive for a Project [Enterprise]
### Endpoint: /project/{project}/tour/import/{tourFolder}/{manifestFileName}
- **Method**: POST
- **Description**: Import a zip archive of Tours to a Project.

Authorization required: `admin` for the Project resource.

## Get Project Tours [Enterprise]
### Endpoint: /project/{project}/tours
- **Method**: GET
- **Description**: Get the manifest of tours for the project.

Authorization required: `admin` for the Project resource.


## Get Project Tour Resource [Enterprise]
### Endpoint: /project/{project}/tours/resource/{path}
- **Method**: GET
- **Description**: Get a tour at a specific path.

Authorization required: `admin` for the Project resource.

## Upload Project Tour Resource [Enterprise]
### Endpoint: /project/{project}/tours/{path}
- **Method**: POST
- **Description**: Upload a tour resource at a specific path.

Authorization required: `admin` for the Project resource.

## Add A Webhook
### Endpoint: /project/{project}/webhook
- **Method**: POST
- **Description**: 

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
Optional:

`useAuth` - if true, use header authorization
`regenAuth` - if true, use generate header authorization

Do not specify an `authToken` or `creator` field. They will be ignored.

Since: v33

- **Example Request**:
	- **example**:
```json
{
  "id": 3,
  "name": "Webhook Job Runner 1",
  "project": "Webhook",
  "eventPlugin": "plugin-provider-name",
  "config": {
    "argString": "-payload ${raw} -d ${data.one}",
    "jobId": "a54d07a1-033a-499f-9789-19bcacbd6e11"
  },
  "user": "username",
  "roles": "admin,user,webhook",
  "enabled": true,
  "useAuth": true,
  "regenAuth": true
}
```
- **200 Response Example**:
	- **example**:
```json
{
  "msg": "Saved webhook",
  "generatedSecurityString": "generated security string"
}
```
- **400 Response Example**:
	- **example**:
```json
{
  "err": "error message"
}
```

## Get A Webhook
### Endpoint: /project/{project}/webhook/{id}
- **Method**: GET
- **Description**: Get the webhook definition.

Since: v33
- **200 Response Example**:
	- **example**:
```json
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

## Update A Webhook
### Endpoint: /project/{project}/webhook/{id}
- **Method**: POST
- **Description**: Updates the specified webhook.

Since: v33
- **Example Request**:
	- **example**:
```json
{
  "id": 3,
  "name": "Webhook Job Runner 1",
  "project": "Webhook",
  "eventPlugin": "plugin-provider-name",
  "config": {
    "argString": "-payload ${raw} -d ${data.one}",
    "jobId": "a54d07a1-033a-499f-9789-19bcacbd6e11"
  },
  "roles": "admin,user,webhook",
  "enabled": true,
  "useAuth": true,
  "regenAuth": true
}
```
- **200 Response Example**:
	- **example**:
```json
{
  "msg": "Saved webhook",
  "generatedSecurityString": "generated security string"
}
```
- **400 Response Example**:
	- **example**:
```json
{
  "err": "error message"
}
```

## Delete A Webhook
### Endpoint: /project/{project}/webhook/{id}
- **Method**: DELETE
- **Description**: Deletes the webhook.

Since: v33
- **200 Response Example**:
	- **example**:
```json
{
  "msg": "deleted webhook"
}
```
- **400 Response Example**:
	- **example**:
```json
{
  "err": "error message"
}
```

## List Project Webhooks
### Endpoint: /project/{project}/webhooks
- **Method**: GET
- **Description**: List the webhooks for the project.

Since: v33
- **200 Response Example**:
	- **example**:
```json
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

## Get `readme.md` and `motd.md`
### Endpoint: /project/{project}/{filename}
- **Method**: GET
- **Description**: Retrieve the `readme.md` and `motd.md` files, which are Markdown formatted and displayed in the Project listing page.
The response, based on `Accept` header, can be returned in the Text, XML or Json format.

Authorization required: `configure` access for `project` resource type or `admin` or `app_admin` access for `user` resource type.
- **200 Response Example**:
	- **example**:
```json
"The readme contents"
```
- **200 Response Example**:
	- **example**:
```json
{
  "contents": "The readme contents"
}
```

## To create or modify the `readme.md` and `motd.md` contents
### Endpoint: /project/{project}/{filename}
- **Method**: PUT
- **Description**: Create or modify the `readme.md` and `motd.md` files, which are Markdown formatted and displayed in the Project listing page.
The response, based on `Accept` header, can be returned in the Text, XML or Json format.

Authorization required: `configure` access for `project` resource type or `admin` or `app_admin` access for `user` resource type.
- **Example Request**:
	- **example**:
```json
{
  "contents": "The readme contents"
}
```
- **Example Request**:
	- **example**:
```json
"The readme contents"
```
- **200 Response Example**:
	- **example**:
```json
"The readme contents"
```
- **200 Response Example**:
	- **example**:
```json
{
  "contents": "The readme contents"
}
```

## Delete `readme.md` and `motd.md`
### Endpoint: /project/{project}/{filename}
- **Method**: DELETE
- **Description**: Delete the `readme.md` and `motd.md` files, which are Markdown formatted and displayed in the Project listing page.

Authorization required: `configure` access for `project` resource type or `admin` or `app_admin` access for `user` resource type.

## Check Runner Ping
### Endpoint: /runnerManagement/checkPing/{token}
- **Method**: GET
- **Description**: Check a ping response. Since: V42

## Download Runner
### Endpoint: /runnerManagement/download/{token}
- **Method**: GET
- **Description**: Download runner Jar. Since: V41

## Get Runner Storage Keys
### Endpoint: /runnerManagement/runner/{id}/keys
- **Method**: GET
- **Description**: List all keys

## Ping a Runner
### Endpoint: /runnerManagement/runner/{id}/ping
- **Method**: POST
- **Description**: Ping the runner. Since: V41

## Regenerate Runner Creds
### Endpoint: /runnerManagement/runner/{id}/regenerateCreds
- **Method**: POST
- **Description**: Regenerate credentials for the Runner. Since: V42

## List Runner Tags
### Endpoint: /runnerManagement/runner/{id}/tags
- **Method**: GET
- **Description**: List tags for the Runner. Since: V42

## Get Runner Info
### Endpoint: /runnerManagement/runner/{runnerId}
- **Method**: GET
- **Description**: Get runner information. Since: V41

## Update Runner Definition
### Endpoint: /runnerManagement/runner/{runnerId}
- **Method**: POST
- **Description**: Update the runner. Since: V41

## Delete Runner
### Endpoint: /runnerManagement/runner/{runnerId}
- **Method**: DELETE
- **Description**: Delete the specified runner. Since: V41

## List Runners
### Endpoint: /runnerManagement/runners
- **Method**: GET
- **Description**: List available runners. Since: V41

## Create a Runner
### Endpoint: /runnerManagement/runners
- **Method**: POST
- **Description**: Create a new Runner. Since: V42

## List all Tags associated to a project
### Endpoint: /runnerManagement/tags
- **Method**: GET
- **Description**: List all known tags. Since: V42

## Get UI info for runner management
### Endpoint: /runnerManagement/ui
- **Method**: GET
- **Description**: Get UI info for runner management. Since: V42

## Search Runner Tags by a keyword
### Endpoint: /runnerTag/searchTags
- **Method**: GET
- **Description**: List tags for the Runner

## List Scheduled Jobs For this Cluster Server
### Endpoint: /scheduler/jobs
- **Method**: GET
- **Description**: List the scheduled Jobs with their schedule owned by the target cluster server.

Authorization required: `read` or `view` for each job resource

Since: v17

## List Scheduled Jobs For a Cluster Server
### Endpoint: /scheduler/server/{uuid}/jobs
- **Method**: GET
- **Description**: List the scheduled Jobs with their schedule owned by the cluster server with the specified UUID.

Authorization required: `read` or `view` for each job resource

Since: v17

## Takeover Schedule in Cluster Mode
### Endpoint: /scheduler/takeover
- **Method**: PUT
- **Description**: Tell a Rundeck server in cluster mode to claim all scheduled jobs from another
cluster server.

This endpoint can take over the schedule of certain jobs based on the input:

* specify a server `uuid`: take over all jobs from that server
* specify server `all` value of `true`: take over all jobs regardless of server UUID

Additionally, you can specify a `project` name to take over only jobs matching
the given project name, in combination with the server options.

Alternately, specify one or more job IDs to takeover certain Jobs' schedules.

Authorization required: `ops_admin` for resource type `job`

Since: v14
- **Example Request**:
	- **all-servers-project**:
```json
{
  "server": {
    "all": true
  },
  "project": "[PROJECT]"
}
```
	- **job**:
```json
{
  "job": {
    "id": "[UUID]"
  }
}
```
	- **multiple-jobs**:
```json
{
  "server": {
    "all": true
  },
  "jobs": [
    {
      "id": "[UUID]"
    },
    {
      "id": "[UUID]"
    }
  ]
}
```
- **200 Response Example**:
	- **uuid-specified**:
```json
{
  "takeoverSchedule": {
    "jobs": {
      "failed": [],
      "successful": [
        {
          "href": "http://dignan:4440/api/14/job/a1aa53ac-73a6-4ead-bbe4-34afbff8e057",
          "permalink": "http://dignan:4440/job/show/a1aa53ac-73a6-4ead-bbe4-34afbff8e057",
          "id": "a1aa53ac-73a6-4ead-bbe4-34afbff8e057",
          "previous-owner": "8F3D5976-2232-4529-847B-8E45764608E3"
        },
        {
          "href": "http://dignan:4440/api/14/job/116e2025-7895-444a-88f7-d96b4f19fdb3",
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
	- **all-specified**:
```json
{
  "takeoverSchedule": {
    "jobs": {
      "failed": [],
      "successful": [
        {
          "job": "data"
        }
      ],
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
	- **project-specified**:
```json
{
  "takeoverSchedule": {
    "jobs": {
      "failed": [],
      "successful": [
        {
          "job": "data"
        }
      ],
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

## Reset User Password [Enterprise]
### Endpoint: /secure/generatepasswordreset/{username}
- **Method**: POST
- **Description**: Sends a password reset email to the user's email address, if email is configured.

Authorization required: `app_admin` for system resource type `user`.

Since: v44
- **200 Response Example**:
	- **example**:
```json
{
  "link": "RESET LINK"
}
```

## Get A Local Role [Enterprise]
### Endpoint: /secure/role/{id}
- **Method**: GET
- **Description**: 
Authorization required: `app_admin` for system resource type `user`.

Since: v44

## Update A Local Role [Enterprise]
### Endpoint: /secure/role/{id}
- **Method**: POST
- **Description**: List the local role definitions.

Authorization required: `app_admin` for system resource type `user`.

Since: v44

- **Example Request**:
	- **example**:
```json
{
  "authority": "rolename",
  "description": "description"
}
```

## Delete A Local Role [Enterprise]
### Endpoint: /secure/role/{id}
- **Method**: DELETE
- **Description**: 
Authorization required: `app_admin` for system resource type `user`.

Since: v44

## Update Role Members [Enterprise]
### Endpoint: /secure/role/{id}/updateMembers
- **Method**: POST
- **Description**: 
Authorization required: `app_admin` for system resource type `user`.

Since: v44
- **Example Request**:
	- **example**:
```json
{
  "add": [
    1,
    2
  ],
  "remove": [
    3,
    4
  ]
}
```

## List Local Roles [Enterprise]
### Endpoint: /secure/roles
- **Method**: GET
- **Description**: List local role definitions.

Authorization required: `app_admin` for system resource type `user`.

Since: v44
- **200 Response Example**:
	- **example**:
```json
[
  {
    "id": 1,
    "authority": "agroup",
    "description": "a description"
  }
]
```

## Create A Local Role [Enterprise]
### Endpoint: /secure/roles/create
- **Method**: PUT
- **Description**: 
Authorization required: `app_admin` for system resource type `user`.

Since: v44
- **Example Request**:
	- **example**:
```json
{
  "authority": "rolename",
  "description": "description"
}
```
- **201 Response Example**:
	- **example**:
```json
{
  "msg": "role created",
  "id": 2
}
```

## Get Roles for a Local User [Enterprise]
### Endpoint: /secure/user/roles/{id}
- **Method**: GET
- **Description**: 
Authorization required: `app_admin` for system resource type `user`.

Since: v44

## Get A Local User [Enterprise]
### Endpoint: /secure/user/{id}
- **Method**: GET
- **Description**: 
Authorization required: `app_admin` for system resource type `user`.

Since: v44
- **200 Response Example**:
	- **example**:
```json
{
  "id": 1,
  "username": "test1",
  "enabled": true,
  "passwordExpired": false,
  "accountLocked": false,
  "accountExpired": false,
  "roles": [
    {
      "id": 1,
      "authority": "agroup",
      "description": "a description"
    }
  ],
  "firstname": "test",
  "lastname": "user",
  "email": "test@example.com"
}
```

## Update A Local User [Enterprise]
### Endpoint: /secure/user/{id}
- **Method**: POST
- **Description**: 
Authorization required: `app_admin` for system resource type `user`.

Since: v44

## Delete A Local User [Enterprise]
### Endpoint: /secure/user/{id}
- **Method**: DELETE
- **Description**: 
Authorization required: `app_admin` for system resource type `user`.

Since: v44

## List Local Users [Enterprise]
### Endpoint: /secure/users
- **Method**: GET
- **Description**: 
Authorization required: `app_admin` for system resource type `user`.

Since: v44
- **200 Response Example**:
	- **example**:
```json
[
  {
    "id": 1,
    "username": "test1",
    "enabled": true,
    "passwordExpired": false,
    "accountLocked": false,
    "accountExpired": false,
    "notes": null,
    "roles": [
      {
        "id": 1,
        "authority": "agroup",
        "description": "a description"
      }
    ],
    "firstname": "test",
    "lastname": "user",
    "email": "test@example.com"
  }
]
```

## Create A Local User [Enterprise]
### Endpoint: /secure/users/create
- **Method**: PUT
- **Description**: 
Authorization required: `app_admin` for system resource type `user`.

Since: v44

## List and Get Keys and Key Metadata
### Endpoint: /storage/keys/{path}
- **Method**: GET
- **Description**: 
Lists resources at the specified PATH if it is a directory.

Otherwise if it is a file, return the metadata about the stored file if JSON response is requested.

Provides the content for **public key** files if the `Accept` request header matches `*/*` or `application/pgp-keys`.

Returns `403` if content is requested from other Key file types.

Authorization required: `read` for the `key` resource

Authorization under the key path `project/{project}` can be granted at the project context.

- **200 Response Example**:
	- **key-metadata**:
```json
{
  "meta": {
    "Rundeck-key-type": "public",
    "Rundeck-content-size": "393",
    "Rundeck-content-type": "application/pgp-keys"
  },
  "url": "http://rundeckhost/api/11/storage/keys/test1.pub",
  "name": "test1.pub",
  "type": "file",
  "path": "keys/test1.pub"
}
```
	- **list-keys**:
```json
{
  "resources": [
    {
      "meta": {
        "Rundeck-key-type": "private",
        "Rundeck-content-mask": "content",
        "Rundeck-content-size": "1679",
        "Rundeck-content-type": "application/octet-stream"
      },
      "url": "http://rundeckhost/api/11/storage/keys/test1.pem",
      "name": "test1.pem",
      "type": "file",
      "path": "keys/test1.pem"
    },
    {
      "url": "http://rundeckhost/api/11/storage/keys/subdir",
      "type": "directory",
      "path": "keys/subdir"
    },
    {
      "meta": {
        "Rundeck-key-type": "public",
        "Rundeck-content-size": "640198",
        "Rundeck-content-type": "application/pgp-keys"
      },
      "url": "http://rundeckhost/api/11/storage/keys/monkey1.pub",
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
      "url": "http://rundeckhost/api/11/storage/keys/test1.pub",
      "name": "test1.pub",
      "type": "file",
      "path": "keys/test1.pub"
    }
  ],
  "url": "http://rundeckhost/api/11/storage/keys",
  "type": "directory",
  "path": "keys"
}
```
- **200 Response Example**:
	- **public-key**:
```json
"...Public Key Contents..."
```

## Modify A Key
### Endpoint: /storage/keys/{path}
- **Method**: PUT
- **Description**: 
Specify the type of key via the `Content-type` header:

* `application/octet-stream` specifies a **private key**
* `application/pgp-keys` specifies a **public key**
* `application/x-rundeck-data-password` specifies a **password**

Authorization required: `update` for the `key` resource.

Authorization under the key path `project/{project}` can be granted at the project context.


## Create Keys
### Endpoint: /storage/keys/{path}
- **Method**: POST
- **Description**: 
Specify the type of key via the `Content-type` header:

* `application/octet-stream` specifies a **private key**
* `application/pgp-keys` specifies a **public key**
* `application/x-rundeck-data-password` specifies a **password**

Authorization required: `create` for the `key` resource.
 
Authorization under the key path `project/{project}` can be granted at the project context.

- **Example Request**:
	- **example**:
```json
"...private key..."
```
- **Example Request**:
	- **example**:
```json
"...public key..."
```
- **Example Request**:
	- **example**:
```json
"password-value"
```
- **201 Response Example**:
	- **key-metadata**:
```json
{
  "meta": {
    "Rundeck-key-type": "public",
    "Rundeck-content-size": "393",
    "Rundeck-content-type": "application/pgp-keys"
  },
  "url": "http://rundeckhost/api/11/storage/keys/test1.pub",
  "name": "test1.pub",
  "type": "file",
  "path": "keys/test1.pub"
}
```
- **201 Response Example**:
	- **public-key**:
```json
"...Public Key Contents..."
```

## Delete A Key
### Endpoint: /storage/keys/{path}
- **Method**: DELETE
- **Description**: Deletes the file if it exists and returns `204` response.

Authorization required: `delete` for the `key` resource.

Authorization under the key path `project/{project}` can be granted at the project context.


## Get an ACL Policy.
### Endpoint: /system/acl/{path}
- **Method**: GET
- **Description**: Retrieve the YAML text of the ACL Policy file.  If YAML or text content is requested, the contents will be returned directly.
Otherwise if XML or JSON is requested, the YAML text will be wrapped within that format.

Authorization required: `read` or `admin` or `app_admin` access for `system_acl` resource type 

Since: v14
- **200 Response Example**:
	- **example**:
```json
"description: \"my policy\"\ncontext:\n  application: rundeck\nfor:\n  project:\n    - allow: read\nby:\n  group: build"
```
- **200 Response Example**:
	- **example**:
```json
"description: \"my policy\"\ncontext:\n  application: rundeck\nfor:\n  project:\n    - allow: read\nby:\n  group: build"
```
- **200 Response Example**:
	- **example**:
```json
{
  "contents": "description: \"my policy\"\ncontext:\n  application: rundeck\nfor:\n  project:\n    - allow: read\nby:\n  group: build"
}
```

## Update an ACL Policy.
### Endpoint: /system/acl/{path}
- **Method**: PUT
- **Description**: 
Authorization required: `update` or `admin` or `app_admin` access for `system_acl` resource type 

Since: v14
- **400 Response Example**:
	- **example**:
```json
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

## Create an ACL Policy.
### Endpoint: /system/acl/{path}
- **Method**: POST
- **Description**: 
Authorization required: `create` or `admin` or `app_admin` access for `system_acl` resource type 

Since: v14
- **Example Request**:
	- **example**:
```json
"description: \"my policy\"\ncontext:\n  application: rundeck\nfor:\n  project:\n    - allow: read\nby:\n  group: build"
```
- **Example Request**:
	- **example**:
```json
{
  "contents": "description: \"my policy\"\ncontext:\n  application: rundeck\nfor:\n  project:\n    - allow: read\nby:\n  group: build"
}
```
- **201 Response Example**:
	- **example**:
```json
"description: \"my policy\"\ncontext:\n  application: rundeck\nfor:\n  project:\n    - allow: read\nby:\n  group: build"
```
- **201 Response Example**:
	- **example**:
```json
"description: \"my policy\"\ncontext:\n  application: rundeck\nfor:\n  project:\n    - allow: read\nby:\n  group: build"
```
- **201 Response Example**:
	- **example**:
```json
{
  "contents": "description: \"my policy\"\ncontext:\n  application: rundeck\nfor:\n  project:\n    - allow: read\nby:\n  group: build"
}
```
- **400 Response Example**:
	- **example**:
```json
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

## Delete an ACL Policy.
### Endpoint: /system/acl/{path}
- **Method**: DELETE
- **Description**: 
Authorization required: `delete` or `admin` or `app_admin` access for `system_acl` resource type 

Since: v14

## List System Calendars [Enterprise]
### Endpoint: /system/calendars
- **Method**: GET
- **Description**: Get all calendars at system scope.

Authorization required: `admin` or `app_admin` access for `user` resource type.

Since: v41
- **200 Response Example**:
	- **example**:
```json
[
  {
    "id": 1,
    "name": "[NAME]",
    "description": "[DESCRIPTION]",
    "calendarType": "[blackout/allowed]",
    "scope": "project",
    "dateType": "[date,range,daily,monthly]",
    "dateDefinition": "[DATE-DEFINITION]",
    "enable": true,
    "allReference": true,
    "recurrent": true,
    "objects": [
      {
        "uuid": "[JOBUUID]",
        "name": "[JOBNAME]"
      }
    ]
  }
]
```

## Create/Update System Calendar [Enterprise]
### Endpoint: /system/calendars
- **Method**: POST
- **Description**: Create or update a calendar at system scope.
* if the ID exists, it will update the existing calendar, otherwise a new one will be created.

Authorization required: `admin` or `app_admin` access for `user` resource type.

Since: v41
- **Example Request**:
	- **example**:
```json
{
  "id": 1,
  "name": "[NAME]",
  "description": "[DESCRIPTION]",
  "calendarType": "[blackout/allowed]",
  "scope": "project",
  "dateType": "[date,range,daily,monthly]",
  "dateDefinition": "[DATE-DEFINITION]",
  "enable": true,
  "allReference": true,
  "recurrent": true,
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
- **200 Response Example**:
	- **example**:
```json
{
  "calendar": {
    "id": 1,
    "name": "New Calendar",
    "description": "test",
    "calendarType": "blackout",
    "scope": "system",
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
  },
  "saved": true,
  "msg": "Saved Calendar"
}
```

## Delete System Calendar [Enterprise]
### Endpoint: /system/calendars/{id}
- **Method**: DELETE
- **Description**: Deletes a calendar at system scope.

Authorization required: `delete` access for `project` resource type or `admin` or `app_admin` access for `user` resource type.

Since: v41

## Set Execution Mode Passive
### Endpoint: /system/executions/disable
- **Method**: POST
- **Description**: Disables executions, preventing adhoc and manual and scheduled jobs from running.

The state of the current
execution mode can be viewed via the `/system/info`
endpoint, or the `/system/executions/status`
endpoint.

Authorization Required: `disable_executions` on `system` resource.

Since: v14


## Disable System executions after a duration of time
### Endpoint: /system/executions/disable/later
- **Method**: POST
- **Description**: Sets System execution mode to Passive at a later time.

Since: v34

- **Example Request**:
	- **example**:
```json
{
  "value": "2h30m"
}
```
- **200 Response Example**:
	- **example**:
```json
{
  "saved": true,
  "msg": "Execution Mode Later saved"
}
```
- **400 Response Example**:
	- **example**:
```json
{
  "saved": false,
  "msg": "Project Execution Mode Later saved"
}
```

## Set Execution Mode Active
### Endpoint: /system/executions/enable
- **Method**: POST
- **Description**: Enables executions, allowing adhoc and manual and scheduled jobs to be run.

The state of the current
execution mode can be viewed via the `/system/info`
endpoint, or the `/system/executions/status`
endpoint.

Authorization Required: `enable_executions` on `system` resource.

Since: v14


## Enable System executions after a duration of time
### Endpoint: /system/executions/enable/later
- **Method**: POST
- **Description**: Sets System execution mode to Active at a later time.

Since: v34

- **Example Request**:
	- **example**:
```json
{
  "value": "2h30m"
}
```
- **200 Response Example**:
	- **example**:
```json
{
  "saved": true,
  "msg": "Execution Mode Later saved"
}
```
- **400 Response Example**:
	- **example**:
```json
{
  "saved": false,
  "msg": "Project Execution Mode Later saved"
}
```

## Get Current Execution Mode
### Endpoint: /system/executions/status
- **Method**: GET
- **Description**: Gets the current execution mode.

Note:
Prior to API version 36 if the mode was **passive** a status `HTTP 503 - Service Unavailable` would be returned.
As of API v36 a `200` status will now be returned when the mode is **passive**.
To return a 503 when the mode is **passive** add `?passiveAs503=true` to the API call.  

Authorization Required: `read` for `system` resource

Since: V32

- **200 Response Example**:
	- **active**:
```json
{
  "executionMode": "active"
}
```
	- **passive**:
```json
{
  "executionMode": "passive"
}
```
- **503 Response Example**:
	- **passive**:
```json
{
  "executionMode": "passive"
}
```

## Get Rundeck server information and stats
### Endpoint: /system/info
- **Method**: GET
- **Description**: Display stats and info about the rundeck server

## Log Storage Info
### Endpoint: /system/logstorage
- **Method**: GET
- **Description**: Get Log Storage information and stats.

Authorization required: `read` for `system` resource

Since: V17

- **200 Response Example**:
	- **example**:
```json
{
  "enabled": true,
  "pluginName": "NAME",
  "succeededCount": 369,
  "failedCount": 0,
  "queuedCount": 0,
  "queuedRequestCount": 0,
  "queuedRetriesCount": 0,
  "queuedIncompleteCount": 0,
  "totalCount": 369,
  "incompleteCount": 0,
  "retriesCount": 0,
  "missingCount": 0
}
```

## List Executions with Incomplete Log Storage
### Endpoint: /system/logstorage/incomplete
- **Method**: GET
- **Description**: List all executions with incomplete log storage.

Authorization required: `read` for `system` resource

Since: V17
- **200 Response Example**:
	- **example**:
```json
{
  "total": 100,
  "max": 20,
  "offset": 0,
  "executions": [
    {
      "id": 1,
      "project": "[PROJECT]",
      "href": "[API HREF]",
      "permalink": "[GUI HREF]",
      "storage": {
        "localFilesPresent": true,
        "incompleteFiletypes": "[TYPES]",
        "queued": true,
        "failed": false,
        "date": "[DATE]"
      },
      "errors": [
        "message",
        "message..."
      ]
    }
  ]
}
```

## Resume Incomplete Log Storage
### Endpoint: /system/logstorage/incomplete/resume
- **Method**: POST
- **Description**: Resume processing incomplete Log Storage uploads.

Authorization required: `ops_admin` for `system` resource

Since: V17
- **200 Response Example**:
	- **example**:
```json
{
  "resumed": true
}
```

## Import Tours Archive for System [Enterprise]
### Endpoint: /system/tour/import/{tourFolder}/{manifestFileName}
- **Method**: POST
- **Description**: Import a zip archive of Tours to the System.

Authorization required: `app_admin` for the `system` resource.

## Get System Tours [Enterprise]
### Endpoint: /system/tours
- **Method**: GET
- **Description**: Get the manifest of tours for the system.

Authorization required: `app_admin` for the `system` resource.


## Get System Tour Resource [Enterprise]
### Endpoint: /system/tours/resource/{path}
- **Method**: GET
- **Description**: Get a tour at a specific path.

Authorization required: `app_admin` for the `system` resource.

## Upload System Tour Resource [Enterprise]
### Endpoint: /system/tours/{path}
- **Method**: POST
- **Description**: Upload a system tour resource at a specific path.

Authorization required: `app_admin` for the `system` resource.

## Get a specified auth token metadata
### Endpoint: /token/{tokenid}
- **Method**: GET
- **Description**: API Token information

## Delete a specified auth token.
### Endpoint: /token/{tokenid}
- **Method**: DELETE
- **Description**: undefined

## List all tokens or all tokens for a specific user.
### Endpoint: /tokens/{user}
- **Method**: GET
- **Description**: undefined

## Create API Token
### Endpoint: /tokens/{user}
- **Method**: POST
- **Description**: Create a new token for a specific user. Specify custom roles and duration if authorized.

The user specified must either be part of the URL, or be part of the request content.

A content body is expected, and `roles` must be specified, and `duration` is optional.
If unset, duration will be the maximum allowed token duration.

If the `roles` value is the string `*` (asterisk), and the token is generated for oneself (i.e. the authenticated user),
then the generated token will have all roles as the authenticated user.

Since: v11

- **Example Request**:
	- **list-of-roles**:
```json
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
	- **string-roles**:
```json
{
  "user": "alice",
  "roles": "sre,dev",
  "duration": "120d",
  "name": "Example Token"
}
```

## Remove Expired Tokens
### Endpoint: /tokens/{user}/removeExpired
- **Method**: POST
- **Description**: Remove expired tokens for the specified User. Since: v19

## Get Tour Endpoints List [Enterprise]
### Endpoint: /tours/endpoints
- **Method**: GET
- **Description**: List the endpoints usable by Tours

## Get User Profile
### Endpoint: /user/info
- **Method**: GET
- **Description**: Get the user profile data for current user.

Since: v21
- **200 Response Example**:
	- **example**:
```json
{
  "login": "username",
  "firstName": "first name",
  "lastName": "last name",
  "email": "email@domain"
}
```

## Modify user profile
### Endpoint: /user/info
- **Method**: POST
- **Description**: Modify the user profile data for current user.

Since: v21
- **Example Request**:
	- **example**:
```json
{
  "firstName": "Name",
  "lastName": "LastName",
  "email": "user@server.com"
}
```

## Get User Profile
### Endpoint: /user/info/{username}
- **Method**: GET
- **Description**: Get the user profile data for another user.

Authorization required: `app_admin` for `system` resource, if not the current user.

Since: v21

## Modify user profile
### Endpoint: /user/info/{username}
- **Method**: POST
- **Description**: Modify the user profile data for another user.

Authorization required: `app_admin` for `system` resource, if not the current user.

Since: v21
- **Example Request**:
	- **example**:
```json
{
  "firstName": "Name",
  "lastName": "LastName",
  "email": "user@server.com"
}
```

## List users
### Endpoint: /user/list
- **Method**: GET
- **Description**: Get a list of all the users.

Authorization required: `app_admin` for `system` resource

Since: v21
- **200 Response Example**:
	- **example**:
```json
[
  {
    "login": "user",
    "firstName": "Name",
    "lastName": "LastName",
    "email": "user@server.com",
    "created": "2017-10-01T09:00:20Z",
    "updated": "2018-08-24T13:53:02Z",
    "lastJob": "2018-08-28T13:31:00Z",
    "tokens": 1
  },
  {
    "login": "admin",
    "firstName": "Admin",
    "lastName": "Admin",
    "email": "admin@server.com",
    "created": "2016-07-17T18:42:00Z",
    "updated": "2018-08-24T13:53:00Z",
    "lastJob": "2018-08-28T13:31:00Z",
    "tokens": 6
  }
]
```

## List Authorized Roles
### Endpoint: /user/roles
- **Method**: GET
- **Description**: Get a list of the authenticated user's roles.

Since: v30
- **200 Response Example**:
	- **example**:
```json
{
  "roles": [
    "admin",
    "user"
  ]
}
```

## Get allocated User Classes
### Endpoint: /userclass/allocations
- **Method**: GET
- **Description**: Get the User Class allocations provided by the License.

The response will contain the allocation state, the current allocations by username, and summary information.

Authorization required: `admin` or `app_admin` access for `user` resource type.

 Since v41

## Get available User Classes
### Endpoint: /userclass/available
- **Method**: GET
- **Description**: Get a list of User Classes that are available.

The response will be a list of User Class Definitions.

Authorization required: `admin` or `app_admin` access for `user` resource type.

 Since v41

## Feature enablement check
### Endpoint: /userclass/enabled
- **Method**: GET
- **Description**: Return whether the feature is enabled. Since v41

## Get current user's User Class assignment
### Endpoint: /userclass/self
- **Method**: GET
- **Description**: Get the User Class assignment of the current user.

The response will contain the user class name, or `NONE` if unassigned.

Authorization required: none.

 Since v41

## Get allocated User Class State
### Endpoint: /userclass/state
- **Method**: GET
- **Description**: Get the User Class state.

The response will contain the allocation state, and summary information.

Authorization required: `admin` or `app_admin` access for `user` resource type.

 Since v41

## Update multiple user class assignments
### Endpoint: /userclass/update
- **Method**: POST
- **Description**: Allows modifying multiple User Class assignments in one request.

This action can operate in one of three behaviors:

1. If the request contains the `allocations` definition, those allocations will be set.
2. If the request contains `bulkRemove` value `true`, and a set of `usernames`, then the specified 
usernames will have their user class assignments removed.
3. If the request values `bulkAssign` and `usernames` are set, then all the specified usernames will be assigned to the User Class specified in `bulkAssign`.

If the request doesn't match one of these three modes, a 400 error will be returned with error code `api.error.item.unsupported-format`.

The response will contain the current user class assignments, if successful.

If an allocation error occurs, such as the allocation of the specified User Class is already full,
then a User Class Allocation error will be returned with a 400 status code with error code `api.error.entitlements.user-class.allocation.exceeded`.

Authorization required: `admin` or `app_admin` access for `user` resource type.

 Since v41
- **Example Request**:
	- **update-user-class**:
```json
{
  "userclass": "FullUser"
}
```

## Get a user's User Class assignment
### Endpoint: /userclass/user/{username}
- **Method**: GET
- **Description**: Get the User Class assignment of the specified user.

The response will contain the user class name, or `NONE` if unassigned.

Authorization required for current user: none
 
Authorization required for other user: `admin` or `app_admin` access for `user` resource type.

 Since v41

## Set a user's User Class assignment
### Endpoint: /userclass/user/{username}
- **Method**: POST
- **Description**: Set the User Class assignment of the specified user.

The response will contain the user class assignment, if successful.

If an allocation error occurs, such as the allocation of the specified User Class is already full,
then a User Class Allocation error will be returned with a 400 status code with error code `api.error.entitlements.user-class.allocation.exceeded`.

Authorization required: `admin` or `app_admin` access for `user` resource type.

 Since v41
- **Example Request**:
	- **set-user-class**:
```json
{
  "userclass": "FullUser"
}
```

## Delete a user's User Class assignment
### Endpoint: /userclass/user/{username}
- **Method**: DELETE
- **Description**: Remove the User Class assignment of the specified user.

The response will be 204 No Content if successful.

Authorization required: `admin` or `app_admin` access for `user` resource type.

 Since v41

## Send Webhook Event
### Endpoint: /webhook/{authtoken}
- **Method**: POST
- **Description**: You may post whatever data you wish to the webhook endpoint, however the plugin you are 
using must
be able to handle the data you post. If the webhook plugin associated with the webhook can't handle
the content type posted you will get an error response.

The webhook plugin will determine the response received.
Please see the documentation for the plugin that is configured for the webhook endpoint you are using.

If the webhook is defined to require the authorization secret, then the `Authorization` HTTP header must be included
with a value that matches the secret.

Since: v33

- **200 Response Example**:
	- **example**:
```json
"ok"
```
- **400 Response Example**:
	- **example**:
```json
{
  "err": "Error message"
}
```
- **503 Response Example**:
	- **example**:
```json
{
  "err": "Webhook not enabled"
}
```

