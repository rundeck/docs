# Plugin Blocklist

To use the plugin blocklist, you will need to create a blacklist yaml file in the following format:

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

**fileNameEntries**: fileNameEntries will prevent entire plugin jars from being copied into the libext folder. For example. if you want to block every single rundeck jira plugin, you would replace ```rundeckpro-jira``` with the rundeckpro-plugin-jar-regex.

**providerNameEntries**: providerNameEntries allows a little bit more customization. Instead of blocking the whole plugin jar, it will only block the specified plugin. For example, if you wanted to block a single plugin, the github script step, you would add `WorkflowStep` as the providerService and `github-script-step` as the provider-name. This is a good option if you need to block a plugin that is bundled in a jar with a plugin you need.