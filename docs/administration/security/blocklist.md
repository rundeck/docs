# Plugin Blocklist

The Plugin Blocklist can be used when plugins need to be blocked or prevented from being installed or used for security or other use case situations.  To use the plugin blocklist, you will need to create a blocklist yaml file in the following format:

```yaml
fileNameEntries:
    - rundeckpro-plugin-jar-regex
    - rundeckpro-plugin-jar-regex
    - rundeckpro-plugin-jar-regex

providerNameEntries:
   ProviderService:
      - provider-name
      - provider-name

```

**fileNameEntries**: fileNameEntries will prevent entire plugin jars from being copied into the libext folder during setup/installation. For example. if you want to block every single rundeck Jira plugin, you would replace _rundeckpro-plugin-jar-regex_ with ```rundeckpro-jira```.

**providerNameEntries**: providerNameEntries allows more granular customization. Instead of blocking the whole plugin jar, it will only block the specified plugin. For example, to block a single plugin, the GitHub script step, you would add `WorkflowStep` as the providerService and `github-script-step` as the provider-name. This is a good option if you need to block a plugin that is bundled in a jar with a plugin you need.

Provider names can be found by navigating to the System Menu > Plugins > Installed Plugins.  Click on the information icon for the plugin and find the provider name in the upper left.

![provider name](~@assest/img/blocklist-providername.png)
