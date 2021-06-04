# Jira Notification Plugins (Enterprise)

## Jira / Issue / Notification Comment

Append notification messages to a Jira issue.

### Configuration

The Jira connection credentials are set in the `project.properties` file for your project.
For these Notification plugins, `password` is your Auth Token (plain text).

```
project.plugin.Notification.jira-comment-issue.login=admin@instance.com
project.plugin.Notification.jira-comment-issue.password=tokentext
project.plugin.Notification.jira-comment-issue.url=https://instance.atlassian.net
```

### Usage

To use the plugin, configure the mandatory input.

- issue key: The Jira issue ID.

## Jira / Issue / Notification Create

Creates a new Jira issue.

### Configuration

The Jira connection credentials are set in the `project.properties` file for your project.
For these Notification plugins, `password` is your Auth Token (plain text).

```
project.plugin.Notification.jira-create-issue-notif.login=admin@instance.com
project.plugin.Notification.jira-create-issue-notif.password=tokentext
project.plugin.Notification.jira-create-issue-notif.url=https://instance.atlassian.net
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
