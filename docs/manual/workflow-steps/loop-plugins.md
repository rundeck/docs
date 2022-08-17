# Loop Script Plugins (Enterprise)

These plugins add the functionality of running inline scripts, using the node executor and file copier, inside a loop.
So far the plugin has two different iteration types: iterating a JSON array and iterating the script until it finishes successful (exit code zero)

## Included Workflow steps Plugins

* Loop / Step / Run Script from a Json Array
* Loop / Step / Run Script until Success

## Run Script from a Json Array

This plugin runs an inline script based on a provided JSON Array.  
In order to capture the JSON array in previous steps (data context), you can use the [Loop / Log Filter / Store and Validate JSON](/manual/log-filters/loop-plugins.html) log filter plugging.

### Plugin Configuration

* **_Input array data from context_**:  JSON array from data context (eg: `data.json`). This value must be captured in a previous step with a Log Filter and is expecting an array element.
* **_Input Array (raw string)_**: (Optional) If you don't want to use data context you can add a raw JSON array.
* **_Script_**: Script to Run
* **_Invocation String_**:  (Optional) add the invocation string like: bash, powershell, python, etc.
* **_File Extension_**: (Optional) add the file extension string like: `.sh`, `.ps1`, `.py`, etc.
* **_Stop Iteration on failure_**: Stop execution if the iteration failed.

The input JSON array **must** be a simple key/value JSON array:

````
[
  {"id":"1","name":"test 1"},
  {"id":"2","name":"test 2"}
]
````

Then, the script will run for each of JSON object included in the input array.
Inside the inline scripts you can capture the variables from each JSON object using the following convention ($vars.key):

````
set -e
token="@option.token@"
id="$vars.id"
name="$vars.name"

echo "token: $token"
echo "id: $id"
echo "name: $name"
`````

![plugin-config](@assets/img/loop-step-run-script-json-attributes.png)
![plugin-config](@assets/img/loop-step-run-script-json-definition.png)
![plugin-config](@assets/img/loop-step-run-script-json-output.png)

## Run Script until Success
This plugin runs an inline script until it finishes successfully

### Plugin Configuration

* **_Retries_**: Max number of iterations.
*  **_Retry Delay_**: Retry Delay in seconds.
* **_Script_**: Script to Run.
* **_Invocation String_**:  (Optional) add the invocation string like: bash, powershell, python, etc.
* **_File Extension_**: (Optional) add the file extension string like: `.sh`, `.ps1`, `.py`, etc.

![plugin-config](@assets/img/loop-step-run-until-success.png)
