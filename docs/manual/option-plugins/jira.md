# Jira Dynamic Option Plugins (Enterprise)

The Jira Dynamic Option Plugins can provide dynamic lists as Option Inputs for your workflows.

Each option value requires specific settings in the Project Configuration settings.

1. After loading your project navigate to **Project Settings > Edit Configuration**
1. Click **Edit Configuration** button in Upper Right
1. Use the settings below to configure the plugin(s)
> Note: the `.project` settings are configured with the Project ID for the related JIRA project.

To use these plugins, add an Option to your Job and select the Allowed Values list entry.

![JIRA Dynamic Options](@assets/img/jira-options.png)

### Project Configuration Settings

* List of Issues in a Project

Project Settings
```
project.plugin.OptionValues.jira-option-values.login=login
project.plugin.OptionValues.jira-option-values.passwordStoragePath=keys/jira/pass
project.plugin.OptionValues.jira-option-values.project=JiraProject
project.plugin.OptionValues.jira-option-values.url=https\://test.atlassian.net
```

* Issue Types Option (list issue types):

Project settings
```
project.plugin.OptionValues.jira-issue-types-option-values.login=login
project.plugin.OptionValues.jira-issue-types-option-values.passwordStoragePath=keys/jira/pass
project.plugin.OptionValues.jira-issue-types-option-values.project=JiraProject
project.plugin.OptionValues.jira-issue-types-option-values.url=https\://test.atlassian.net
```

* Issue Transition Option  (list transition types):

Project settings
```
project.plugin.OptionValues.jira-transition-option-values.login=login
project.plugin.OptionValues.jira-transition-option-values.passwordStoragePath=keys/jira/pass
project.plugin.OptionValues.jira-transition-option-values.project=JiraProject
project.plugin.OptionValues.jira-transition-option-values.url=https\://test.atlassian.net
```
