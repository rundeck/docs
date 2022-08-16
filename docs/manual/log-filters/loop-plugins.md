# Store and Validate JSON (Enterprise)

## Log Filter Store and Validate JSON

The "Store and Validate JSON" Log filter plugin validate and store a JSON string in the job context. 
It can be used to pass the input JSON parameter to the [Loop / Step / Run Script from a JSON Array](/manual/workflow-steps/loop-plugins.html)  and [Loop / Node Step / Run Script from a JSON Array](/manual/node-steps/loop-plugins.html)  plugins

### Plugin Configuration

* **_Group_** The group of the context variable
* **_Path_** The path of the context variable (you will access the context variable using ${group.path}
* **_Log Data_** Print the captured value

![plugin-config](@assets/img/loop-log-filter.png)
