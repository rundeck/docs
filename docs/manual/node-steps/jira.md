# Jira Node Step Plugins (Enterprise)

::: tip Upgrade Notice
As of Rundeck version 3.4.0 the Jira plugins now support Auth Tokens.  Please check the [Release Notes updates here](/history/3_4_x/version-3.4.0.md).
:::

Configuration of the Jira Node Steps can be done centrally using Configuration Management.

1. Create a Key Store entry with the API Token. (Note the path to this key for use later.)
1. Open **System Menu > Configuration Management**
1. Set **Jira Login Name**, **Jira Auth token** (use key path from step 1 in plain text), and **Jira base URL**.
1. Click Save in the Upper Right.

> There is no need to restart.  The JIRA Node Step plugins should be ready for use.


Alternatively the settings can be specified in `framework.properties`for all Jira Workflow Steps.

```
jira.url=https://instance.atlassian.net
jira.login=user
jira.auth_token=keys/jira/token
```

Configuration can be specific per project as documented in the settings below:

## Jira / Issue / Comment

Append notification messages to a Jira issue.

### Configuration

The Jira connection credentials are set in the `project.properties` file for your project.
Password is a key storage path to the auth token.

```
project.plugin.WorkflowNodeStep.jira-comment-issue-step.login=admin@instance.com
project.plugin.WorkflowNodeStep.jira-comment-issue-step.password=keys/jira/password
project.plugin.WorkflowNodeStep.jira-comment-issue-step.url=https://instance.atlassian.net
```

### Usage

To use the plugin, configure the mandatory input.

- key: The Jira issue ID.
- message: Message to append, can include variables.

## Jira / Issue / Create

Creates a new Jira issue.

### Configuration

The Jira connection credentials are set in the `project.properties` file
for your project.
Password it's a key storage path to the password.

```
project.plugin.WorkflowNodeStep.jira-create-issue.login=admin@instance.com
project.plugin.WorkflowNodeStep.jira-create-issue.password=keys/jira/password
project.plugin.WorkflowNodeStep.jira-create-issue.url=https://instance.atlassian.net
```

### Usage

To use the plugin, configure the mandatory inputs.

- project: Jira Project ID.
- type: Type of the issue, default Incident
- summary: Issue summary
- description: Issue description

Optional inputs:

- assignee: Issue assignee
- reporter: Issue reporter
