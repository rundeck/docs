# Configuration Management (Enterprise)

:::enterprise
:::

::: warning Beta Feature
This Enterprise feature was released as Beta in version 3.4.0.  Please be sure to read the "BETA Notes" below.
:::

Rundeck Enterprise includes a Configuration Management module to set configuration settings via the GUI and store them in the Rundeck database.  Database storage shares configuration options with all your cluster members and centralizes configuration.  This can significantly streamline configuration of new Rundeck servers.

![Configuration Management](~@assets/img/configmgmt-list.png)

## Managing Configuration
Use the **Add Config** button to add new configuration entries.

![Add Config Mgmt Entry](~@assets/img/configmgmt-add-config.png)

**Property Name**

Enter the property value here.  A dynamic drop down will pre-populate with some suggested settings, but the field will take any value.

**Property Value**

Enter the value for the setting here.  Currently the field only supports string values.

**Strata Menu**

If the setting should be applied globally (all servers in a cluster) choose _Global_.  If the setting should apply to the specific server to choose _Server_ and it will apply to the current server.


## BETA Notes

On initial Rundeck build/boot all configuration items are still written to the traditional file based configuration files. In order to use this feature configuration settings must be written in this Configuration Management GUI, then removed from the file based configurations.  File based configurations will take precedence over database configuration.

All setting values are done in String format for this release.  If a setting is expecting a Boolean value please use `true` or `false`.

### Feature Plans

Bugs:
- Removing a Base setting does not take it off the list.

Enhancements:
- Currently everything is entered as a string. In future versions the datatype of the field will be used to simplify input.  _(e.g. True/False selectors, List entries, Storage Path browsers, etc.)_
- Initial boot configuration settings will be written to the database by default rather than server based text files.
- Critical settings will be identified and marked as required.
- UI Improvements with setting descriptions, documentation links, no-restart refresh where possible.
- Include the ability to sort the settings list.
- Add ability to change config Strata setting without removing and re-adding config.
- Add ability to cancel or revert changes that have been made without having to navigate to another page.
- Allow for nesting Categories listing.
- Deleting entries will be “staged” and committed after “Save” rather than immediate removal.

To provide feedback please email [product@rundeck.com](mailto:product@rundeck.com)
