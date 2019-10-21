# Execution Lifecycle Plugins

Execution Lifecycle Plugins add custom logic to be executed during the lifecycle of a Job execution.

To enable the Execution Lifecycle Plugin add: `rundeck.feature.executionLifecyclePlugin.enabled=true`
to your `rundeck-config.properties` or equivalent file.

The lifecycle points currently supported:

*Execution Start*
:   The Execution is created, the context is configured, and the workflow is about to run.

*Execution End*
:   The workflow execution has finished.

Execution Lifecycle plugins are configured at a *Job* context.

## Use

After installation, Execution Lifecycle Plugins can be added to Jobs.  In the Job Edit page, a tab named "Execution Plugins" will allow selection of plugins.
They can also be added to the Job XML or YAML definition.

## Configuration


Configuration at the Job level can be performed in the Job Edit GUI page, or via the Job definition file.

Project and Framework properties can also be used to configure the plugin.

_Framework scope property definition in `framework.properties`_

    framework.plugin.ExecutionLifecycle.[your_plugin_name].[property]=value

_Project scope property definition in `project.properties`_

    project.plugin.ExecutionLifecycle.[your_plugin_name].[property]=value

## Java Plugin


::: tip
Refer to [Java Development](/developer/01-plugin-development.md#java-plugin-development) for information about developing a Java plugin for Rundeck.
:::

Implement the `ExecutionLifecyclePlugin` interface:

* [ExecutionLifecyclePlugin]({{{javaDocBase}}}/com/dtolabs/rundeck/plugins/jobs/ExecutionLifecyclePlugin.html)

Define your class with the `@Plugin` annotation, with a service name of `ExecutionLifecycle`


Your class can implement two optional methods: `beforeJobStarts` and `afterJobEnds`:

```java
import com.dtolabs.rundeck.core.jobs.ExecutionLifecycleStatus;
import com.dtolabs.rundeck.core.jobs.JobExecutionEvent;
import com.dtolabs.rundeck.core.plugins.Plugin;
import com.dtolabs.rundeck.plugins.ServiceNameConstants;
import com.dtolabs.rundeck.plugins.jobs.ExecutionLifecyclePlugin;

@Plugin(service = ServiceNameConstants.ExecutionLifecycle, name = "MyPlugin")
class MyPlugin implements ExecutionLifecyclePlugin{
 		@Override
        public ExecutionLifecycleStatus beforeJobStarts(JobExecutionEvent event) throws ExecutionLifecyclePluginException{
            //...
            return null;
        }

        @Override
        public ExecutionLifecycleStatus afterJobEnds(JobExecutionEvent event) throws ExecutionLifecyclePluginException{
            //...
            return null;
        }
}
```

The [JobExecutionEvent]({{{javaDocBase}}}/com/dtolabs/rundeck/plugins/jobs/JobExecutionEvent.html) type allows access to the ExecutionContext,
and other information about the Job and Execution.

Your method should return a [ExecutionLifecycleStatus]({{{javaDocBase}}}/com/dtolabs/rundeck/plugins/jobs/ExecutionLifecycleStatus.html) object, which indicates
whether your plugin was successful or not, and can include new execution context data to use for the remaining execution.

Alternately, your plugin can return `null` to indicate a successful result. 


```java
public interface ExecutionLifecycleStatus extends LifecycleStatus{

    /**
     * @return StepExecutionContext of the event to use if isUseNewValues is true
     */
    default StepExecutionContext getExecutionContext(){ return null; }

}
```

The behavior of the execution depends on the contents of this object, and which event is occurring:

* `beforeJobStarts`:
	* if `isSuccessful()` returns `false`, the execution will halt.  The value in `errorMessage` will be logged as an error.
	* if `isUseNewValues()` returns `true`, 
		* `getExecutionContext()`: non-null value will be merged with the original context
* `afterJobEnds`:
	* Any error result is logged
