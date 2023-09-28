# Option Values Plugins

## About

Option values plugins allow you to provide custom values to your job options.
Instead of creating a web service to provide the values, or supplying a static list
of options, you can use an option values plugin to provide valid values for an option.
If you configure an option values plugin for your job, the plugin will run
and provide the values to the UI when you are preparing the job for execution.

To enable this plugin type in your Rundeck installation add the following to your `rundeck-config.properties`:

    rundeck.feature.option-values-plugin.enabled=true

## Use

Create an option values plugin and install it like other Rundeck plugins.
When you are creating a job, create a new option with the option type: Text.
Scroll down to the **Allowed Values** section and you will see your option values plugin listed.

![Figure: Select Option Values Plugin](~@assets/img/option-values-create.png)

Select your option values plugin. Finish configuring your job.

When you go to execute your job you will see the values provided by your plugin as
the allowable values for your option.

![Figure: Choose Value from Plugin Provided Values](~@assets/img/option-values-exec-values.png)

Select the value then run your Job.

## Configuring

To configure your plugin you can add configuration values to either the framework or project scope.

_Framework scope property definition in `framework.properties`_

    framework.plugin.OptionValues.[your_plugin_name].[property]=value

_Project scope property definition in `project.properties`_

    project.plugin.OptionValues.[your_plugin_name].[property]=value

## Java Plugin Type

```java
package com.plugin.optionvalue;

import com.dtolabs.rundeck.core.plugins.Plugin;
import com.dtolabs.rundeck.plugins.descriptions.PluginDescription;
import com.dtolabs.rundeck.plugins.option.OptionValue;
import com.dtolabs.rundeck.plugins.option.OptionValuesPlugin;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Plugin(service="OptionValues", name="foo-option-values")
@PluginDescription(title="Foo Option Values", description="Option values java plugin")
public class FooOptionValues implements OptionValuesPlugin {
    @Override
    public List<OptionValue> getOptionValues(final Map config) {
        List<OptionValue> options = new ArrayList<>();
        options.add(new StandardOptionValue("Alpha","alpha"));
        options.add(new StandardOptionValue("Beta","beta"));
        options.add(new StandardOptionValue("Gamma","gamma"));
        return options;
    }

    class StandardOptionValue implements OptionValue {

        private String name;
        private String value;
        StandardOptionValue(String name, String value) {
            this.name = name;
            this.value = value;
        }
        @Override
        public String getName() {
            return name;
        }

        @Override
        public String getValue() {
            return value;
        }
    }
}
```

## Groovy Plugin Type

```groovy
import com.dtolabs.rundeck.plugins.option.OptionValuesPlugin

rundeckPlugin(OptionValuesPlugin) {
    title="Foo Option Values Plugin"
    description="Option Values Plugin"

    configuration {
        cfg1 title: "Config Property", description: "A configuration property"
    }
    getOptionValues { config ->
        def options = []
        options.add([name:"Foo Value",value:"foo"])
        options.add([name:"Bar Value",value:"bar"])
        options.add([name:"Baz Value",value:"baz"])

        return options
    }
}
```

## Script Plugin Type

Options will be picked up from the script between the markers `==START_OPTIONS==` and `==END_OPTIONS==`.
Echo your options in the format of `value:label`.
The label will be the appear in the dropdown list, and the associated value will be used as the value passed
to the option.

```
#!/usr/bin/env bash

echo "==START_OPTIONS=="
echo "opt1:First Option"
echo "opt2:Second Option"
echo "==END_OPTIONS=="

```
