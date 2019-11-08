# Execution Lifecycle Plugins


## About

Execution Lifecycle Plugins add custom logic to be executed during the lifecycle of a Job execution.
At execution start, plugins can update the contents of the ExecutionContext if necessary, or store custom Java objects as "components" to be used by step plugins, or later in the the course of the execution lifecycle.

The lifecycle points currently supported:

*Execution Start*
:   The Execution is created, the context is configured, and the workflow is about to run. Plugins can modify the contents of the Execution Context and store custom objects in the context.

*Execution End*
:   The workflow execution has finished. Plugins can perform final cleanup, logging, or other tasks.

Execution Lifecycle plugins are configured at a *Job* scope, in the Job definition.

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

To modify the ExecutionContext within the `beforeJobStarts` method, you should create a new StepExecutionContext object, by building from the original available from the JobExecutionEvent object, and returning the new context object within the ExecutionLifecycleStatus object.

Here is an example using the `ExecutionContextImpl.builder()` method to construct a new context, and add some more context data.

```java
ExecutionContextImpl.Builder builder = ExecutionContextImpl.builder(event.getExecutionContext());
//use builder methods to modify contents
builder.loglevel(0); //change loglevel
builder.addComponent("myCustomObject", myObject, MyType.class);
StepExecutionContext newContext = builder.build();
//you can also use the normal SharedDataContext to add values to the available data

Map<String, String> mapData = ...;
newContext.getSharedDataContext().merge(ContextView.global(), DataContextUtils.context("myplugin", mapData));
```

Your method should return a [ExecutionLifecycleStatus]({{{javaDocBase}}}/com/dtolabs/rundeck/plugins/jobs/ExecutionLifecycleStatus.html) object, which indicates
whether your plugin was successful or not, and can include new execution context data to use for the remaining execution.

This example returns a new ExecutionLifecycleStatus with the newly constructed StepExecutionContext:

```java
       return new ExecutionLifecycleStatus() {
            @Override
            public boolean isUseNewValues() {
                return true; //must return true if you want the new context to be used
            }

            @Override
            public StepExecutionContext getExecutionContext() {
                return newContext;
            }
        };
```

Alternately, your plugin can return `null` to indicate a successful result with no changes to the context.


The behavior of the execution depends on the contents of this object, and which event is occurring:

* `beforeJobStarts`:
    * if `isSuccessful()` returns `false`, the execution will halt.  The value in `errorMessage` will be logged as an error.
    * if `isUseNewValues()` returns `true`, 
        * `getExecutionContext()`: non-null value will be merged with the original context
* `afterJobEnds`:
    * Any error result is logged

## Using Context Components

Context "components" are Java objects you can add to the Execution Context, for use by your custom plugin.
The component will stay within the context if desired, or can be set as "single-use".
If a component is "single-use", and you retrieve it with one of the "use\*" methods below, it will be removed from the context.

Components are identified by a name and/or Java Type.  In the `ExecutionContextImpl.Builder`, you can add new components using `addComponent(..)` methods. 

The components can later be retrieved (such as within a step plugin, or later phase of the Execution Lifecycle), using methods of the `ExecutionContext`:

* `componentForType(Class<T> type)`
* `componentsForType(Class<T> type)`

If `use*` is called, then any components retrieved that are "single-use" will also be removed from the context:

* `useSingleComponentOfType(Class<T> type)`
* `useSingleComponentOfType(Class<T> type,Consumer<Optional<T>> consumer)`
* `useAllComponentsOfType(Class<T> type, Consumer<T> consumer)`


## Example Code

A full example is available on Github: <https://github.com/rundeck/rundeck/tree/master/examples/example-java-execution-lifecyle-plugin>

