# Plugin Groups

## About

Plugin Groups are a way to define a common set of configuration Properties that
can be shared by multiple related plugins.

For example, a set of integration plugins with an external service can share
a PluginGroup definition to define common Properties such as credentials and connection configuration details.

## Defining a PluginGroup

Defining a PluginGroup is just like defining any other Java plugin, see [Plugin Development](/developer/01-plugin-development.md#java-plugin-development).

Your implementation class will extend a Java interface, named [PluginGroup]({{$javaDocBase}}/com/dtolabs/rundeck/plugins/config/PluginGroup.html), 
apply the `@Plugin` annotation, and will define any Plugin Properties that will be used by your other plugins.

Typically, the Plugin Properties are defined using [Plugin Annotations](/developer/02-plugin-annotations.md).

### Example

```java
import com.dtolabs.rundeck.core.plugins.Plugin;
import com.dtolabs.rundeck.plugins.ServiceNameConstants;
import com.dtolabs.rundeck.plugins.config.PluginGroup;
import com.dtolabs.rundeck.plugins.descriptions.PluginDescription;
import com.dtolabs.rundeck.plugins.descriptions.PluginProperty;

@Plugin(name="myPluginGroup", service=ServiceNameConstants.PluginGroup)
@PluginDescription(title = "My Service", description = "Common configurations for my service")
public class MyPluginGroup implements PluginGroup{
    //define plugin properties below
    @PluginProperty(title = "Username", description = "The username for the service", required = true)
    private String username;
    
    public String getUsername(){
        return username;
    }
}
```

## Using a PluginGroup

To use a PluginGroup with another plugin type, you will reference the PluginGroup
in the Plugin's definition, by implementing the [ConfiguredBy]({{$javaDocBase}}/com/dtolabs/rundeck/plugins/config/ConfiguredBy.html) interface.

This interface specifies that you implement a method `setPluginGroup(T pluginGroup)`.

This method will be called with a configured instance of your PluginGroup class, after your Plugin instance is configured.

### Example

```java

@Plugin(/*...*/)
@PluginDescription(/*...*/)
public class MyStepPlugin implements StepPlugin, ConfiguredBy<MyPluginGroup>{
    private MyPluginGroup config;
    
    public setPluginGroup(MyPluginGroup pluginGroup){
        this.config=pluginGroup;
    }

    public void executeStep(final PluginStepContext context, final Map<String, Object> configuration)
            throws StepException{
        /*
         * Access common configuration via config object. 
         */
        String user = config.getUsername();
    }
}
```