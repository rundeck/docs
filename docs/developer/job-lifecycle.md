# Job Lifecycle Plugin

## About

Job Lifecycle Plugins add custom logic to be executed before a job is saved, and before an execution is started.
They can also modify the Options of the Job and input values.

::: tip
To enable the Job Lifecycle Plugin add: `rundeck.feature.jobLifecyclePlugin.enabled=true`
to your `rundeck-config.properties` or equivalent file.
:::

The lifecycle points currently supported:


*Before Save*
:   Job definition has been submitted for validation, either for new Job creation or an existing Job being updated.

*Before Execution*
:   Input for option values (user submitted, or scheduled) has been received for validation, but the Execution has not yet been created


Job Lifecycle plugins are configured at the *Project* level.

## Use

After installation, Job Lifecycle Plugins can be enabled in the Project Configuration.  The enabled plugins will be used for all Jobs in the project.

## Configuration


Select the Job Lifecycle Plugins to enable win the "Project > Edit Configuration" page under the tab named "Job Lifecycle Plugins", or in the project configuration file.

![Job Lifecycle Plugins Tab](~@assets/img/figure-job-lifecycle-plugin-project-configure-page.png)

Enable a Job Lifecycle plugin named `example`:

``` properties
# project.properties example
project.enable.jobLifecyclePlugin.example=true

```


::: warning
Currently, configuration values for individual plugins must be manually added to the project.properties file. GUI support will be added in a future release.
:::


Project and Framework properties can also be used to configure the plugin.

_Framework scope property definition in `framework.properties`_


``` properties
framework.plugin.JobLifecycle.[your_plugin_name].[property]=value
```

_Project scope property definition in `project.properties`_

``` properties
project.plugin.JobLifecycle.[your_plugin_name].[property]=value
```

## Java Plugin


::: tip
Refer to [Java Development](/developer/01-plugin-development.md#java-plugin-development) for information about developing a Java plugin for Rundeck.
:::

Implement the `JobLifecyclePlugin` interface:

* [JobLifecyclePlugin]({{{javaDocBase}}}/com/dtolabs/rundeck/plugins/jobs/JobLifecyclePlugin.html)


Define your class with the `@Plugin` annotation, with a service name of `JobLifecycle`


Your class can implement two optional methods: `beforeJobExecution` and `beforeSaveJob`:

```java
import com.dtolabs.rundeck.core.jobs.*;
import com.dtolabs.rundeck.core.plugins.JobLifecyclePluginException;
import com.dtolabs.rundeck.core.plugins.Plugin;
import com.dtolabs.rundeck.plugins.ServiceNameConstants;
import com.dtolabs.rundeck.plugins.project.JobLifecyclePlugin;

@Plugin(service = ServiceNameConstants.ExecutionLifecycle, name = "MyPlugin")
class MyPlugin implements JobLifecyclePlugin{
 		@Override
	    public JobLifecycleStatus beforeJobExecution(JobPreExecutionEvent event) throws JobLifecyclePluginException {
	   		//...
            return null;
        }

        @Override
	    public JobLifecycleStatus beforeSaveJob(JobPersistEvent event) throws JobLifecyclePluginException {
	        //...
            return null;
        }
}
```

The `beforeJobExecution` method will be called before the execution is created.  The [JobPreExecutionEvent]({{{javaDocBase}}}/com/dtolabs/rundeck/plugins/jobs/JobPreExecutionEvent.html) type allows access to information about the Job, and includes
the option values that will be used for the execution. The return value from your method can modify the option values used in the execution, or prevent the execution from
occurring.

You can use [JobLifecycleStatusImpl.builder\(\)]({{{javaDocBase}}}/com/dtolabs/rundeck/core/jobs/JobLifecycleStatusImpl.html) to build the JobLifecycleStatus result.

* if `isSuccessful()` returns `false`, the execution will be prevented.  The value in `errorMessage` will be logged as an error.
* otherwise, if `isUseNewValues()` returns `true`:
  * if `getOptionValues()` is not null, the values returned will be added to the Map used for the execution.

The [JobPersistEvent]({{{javaDocBase}}}/com/dtolabs/rundeck/plugins/jobs/JobPersistEvent.html) type allows access to information about the Job before it is persisted.

* if `isSuccessful()` returns `false`, the create/update will be prevented.  The value in `errorMessage` will be returned as a validation error.
* otherwise, if `isUseNewValues()` returns `true`:
  * if `getOptions()` is not null, the options defined will be *replaced* by the options returned here. If you want to preserve the initial values, you will
  have to include them in the result as well. 

You can use [JobOptionImpl.builder\(\)]({{{javaDocBase}}}/com/dtolabs/rundeck/plugins/jobs/JobOptionImpl.html) to create new JobOption values.


## Example Code

A full example is available on Github: <https://github.com/rundeck/rundeck/tree/main/examples/example-java-job-lifecycle-plugin>

