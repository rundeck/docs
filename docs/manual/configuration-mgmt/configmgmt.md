# Configuration Management (Enterprise)

:::enterprise
:::

Runbook Automation includes a Configuration Management module to set configuration settings via the GUI and store them in the Rundeck database.  Database storage shares configuration options with all your cluster members and centralizes configuration.  This can significantly streamline configuration of new Rundeck servers.  Most settings will be set and refreshed upon Saving.  If a setting requires a restart there is a message to let users know.

![Configuration Management](/assets/img/configmgmt-list.png)

## Managing Configuration
Use the **+ Add Config** button to add new configuration entries.

![Add Config Mgmt Entry](/assets/img/configmgmt-add-config.png)

**Property Name**

Enter the property value here.  A dynamic drop down will pre-populate with some suggested settings, but the field will take any value.

**Property Value**

Enter the value for the setting here.  Currently the field only supports string values.


## Initial Boot Notes

On initial Rundeck build/boot all configuration items are still written to the traditional file based configuration files. In order to use this feature configuration settings must be written in this Configuration Management GUI, then removed from the file based configurations.  File based configurations will take precedence over database configuration.
