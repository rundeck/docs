# Plugin Blocklist

The Plugin Blocklist can be used when plugins need to be blocked or prevented from being installed or used for security or other use-case situations.  To use the plugin blocklist, you will need to create a blocklist yaml file in the following format:

```yaml
fileNameEntries:
    - rundeckpro-plugin-jar-name
    - rundeckpro-plugin-jar-name
    - rundeckpro-plugin-jar-name
providerNameEntries:
   ProviderService:
      - provider-name
      - provider-name
```
:::tip
If you intend to use the fileNameEntries or providerNameEntries, both of these properties must be declared otherwise Rundeck will fail to start.
:::

**fileNameEntries**: fileNameEntries will prevent entire plugin jars from being copied into the libext folder during setup/installation. For example. if you want to block every single rundeck Jira plugin, you would replace rundeckpro-plugin-jar-name with `rundeckpro-jira`. Keep in mind that you can still add plugins using the GUI or by putting the plugin (JAR file) right into the `/rundeck/libext folder`.

*Example using fileNameEntries:*
```yaml
fileNameEntries:
    - rundeckpro-jira-plugins
providerNameEntries:
	none:
```

File name entries can be found on `rundeck/libext`.

![Plugins File Names](~@assets/img/blocklist-filename.png)

Use only the plugin file name without the version or file extension as shown in the previous example.

**providerNameEntries**: providerNameEntries allows more granular customization. Instead of blocking the whole plugin jar, it will only block the specified plugin. For example, to block a single plugin, the Jira comment issue step, you would add `WorkflowStep` as the providerService and `jira-comment-issue-step` as the provider-name. This is a good option if you need to block a plugin that is bundled in a jar with a plugin you need.

Example using providerNameEntries:
```yaml
fileNameEntries:
  - none
providerNameEntries:
    WorkflowStep:
        - jira-comment-issue-step
```

Provider names can be found by navigating to the System Menu > Plugins > Installed Plugins.  Click on the information icon for the plugin and find the provider name in the upper left.

![Provider Name](~@assets/img/blocklist-providername.png)

Once the providers are all listed, add the following config entry to rundeck-config.properties with the path to the file just created:
```rundeck.plugins.providerBlockListFile=/path/to/user/blocklist```

If the plugin was correctly blocked with the providerNameEntries you will see the following messages:

![On Console](~@assets/img/blocklist-console-message.png)

![On GUI](~@assets/img/blocklist-gui-message.png)
