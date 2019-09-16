# User Group Source Plugins

## About

User Group Source plugins allow you to add roles to a user when the user logs in.

## Use

Create a user group source plugin and install it like other Rundeck plugins.
When a user logs in, your plugin will be called with the user\'s username and will add any roles
you have designated to the user.

## Configuring

To configure your plugin you can add configuration values to the framework scope.

_Framework scope property definition in `framework.properties`_

    framework.plugin.UserGroupSource.[your_plugin_name].[property]=value

Please note you cannot configure this plugin at a project level because it executes
before any project information is applicable.

## Java Plugin Type

```java
package example;

import com.dtolabs.rundeck.core.plugins.Plugin;
import com.dtolabs.rundeck.plugins.ServiceNameConstants;
import com.dtolabs.rundeck.plugins.user.groups.UserGroupSourcePlugin;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Plugin(name = "example-user-group-source-plugin",service= ServiceNameConstants.UserGroupSource)
public class ExampleUserGroupSourcePlugin implements UserGroupSourcePlugin {
    List<String> groups = new ArrayList<>();

    public ExampleUserGroupSourcePlugin() {
        groups.add("RUNDECK_USER"); //This group would get added to all users
    }

    @Override
    public List<String> getGroups(final String username, final Map<String, Object> config) {
        //Check username and add groups from your datasource
        if(username.equals("bob")) {
            groups.add("PROJECT_MANAGER");
        } else if(username.equals("alice")) {
            groups.add("ENGINEERING");
        }
        return groups;
    }
}
```

## Script Plugin Type

Roles will be picked up from the script between the markers `==START_GROUPS==` and `==END_GROUPS==`.
Echo one role name per line.

```
#!/usr/bin/env bash

echo "==START_GROUPS=="
echo "role1"
echo "role2"
echo "==END_GROUPS=="

```
