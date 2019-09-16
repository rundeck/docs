# Jira Node Step Plugins (Enterprise)

## Jira / Issue / Comment

Append notification messages to a Jira issue.

### Configuration

The Jira connection credentials are set in the `project.properties` file
for your project.
Password it's a keystorage path to the password.

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
Password it's a keystorage path to the password.

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
