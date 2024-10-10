# Jira Workflow Steps (Enterprise)

::: tip Upgrade Notice
As of Rundeck version 3.4.0 the Jira plugins now support Auth Tokens.  Please check the [Release Notes updates here](/history/3_4_x/version-3.4.0.md).
:::

## Authentication
Follow the steps outlined in [Jira Plugins Overview](/manual/plugins/jira-plugins-overview.html) to configure authentication with Jira for these Job step plugins.

Alternatively the settings can be specified in `framework.properties`for all Jira Workflow Steps.

```
jira.url=https://instance.atlassian.net
jira.login=user
jira.auth_token=keys/jira/token
jira.password-key-storage-path=keys/jira/password
```

Configuration can be specific per project as documented in the settings below:

## Jira / Issue / Assigned

Search assigned issues by user.

### Configuration

:::tip Tip
These settings do not need to be set if credentials were configured on the [Jira Plugins Overview](/manual/plugins/jira-plugins-overview.html) page.
:::

The Jira connection credentials are set in the `project.properties` file
for your project.
Password it's a key storage path to the password.

```
project.plugin.WorkflowStep.jira-assigned-issue.login=admin@instance.com
project.plugin.WorkflowStep.jira-assigned-issue.password=keys/jira/password
project.plugin.WorkflowStep.jira-assigned-issue.password-key-storage-path=keys/jira/password
project.plugin.WorkflowStep.jira-assigned-issue.url=https://instance.atlassian.net
```

### Usage

To use the plugin, configure the mandatory inputs.

- assignee: Issue assignee.
- fail: true to fail if there's no assigned issues.

## Jira / Issue / Check Exist

Check if the Jira Issue exist by key.

### Configuration

:::tip Tip
These settings do not need to be set if credentials were configured on the [Jira Plugins Overview](/manual/plugins/jira-plugins-overview.html) page.
:::

The Jira connection credentials are set in the `project.properties` file
for your project.
Password it's a key storage path to the password.

```
project.plugin.WorkflowStep.jira-check-issue.login=admin@instance.com
project.plugin.WorkflowStep.jira-check-issue.password=keys/jira/password
project.plugin.WorkflowStep.jira-check-issue.password-key-storage-path=keys/jira/password
project.plugin.WorkflowStep.jira-check-issue.url=https://instance.atlassian.net
```

### Usage

To use the plugin, configure the mandatory input.

- key: Jira issue ID.

## Jira / Issue / Comment

Append notification messages to a Jira issue.

### Configuration

:::tip Tip
These settings do not need to be set if credentials were configured on the [Jira Plugins Overview](/manual/plugins/jira-plugins-overview.html) page.
:::

The Jira connection credentials are set in the `project.properties` file
for your project.
Password it's a keystorage path to the password.

```
project.plugin.WorkflowStep.jira-comment-issue-step.login=admin@instance.com
project.plugin.WorkflowStep.jira-comment-issue-step.password=keys/jira/password
project.plugin.WorkflowStep.jira-comment-issue-step.password-key-storage-path=keys/jira/password

project.plugin.WorkflowStep.jira-comment-issue-step.url=https://instance.atlassian.net
```

### Usage

To use the plugin, configure the mandatory input.

- key: The Jira issue ID.
- message: Message to append, can include variables.

## Jira / Issue / Create

Creates a new Jira issue.

### Configuration

:::tip Tip
These settings do not need to be set if credentials were configured on the [Jira Plugins Overview](/manual/plugins/jira-plugins-overview.html) page.
:::

The Jira connection credentials are set in the `project.properties` file
for your project.
Password it's a keystorage path to the password.

```
project.plugin.WorkflowStep.jira-create-issue.login=admin@instance.com
project.plugin.WorkflowStep.jira-create-issue.password=keys/jira/password
project.plugin.WorkflowStep.jira-create-issue.password-key-storage-path=keys/jira/password
project.plugin.WorkflowStep.jira-create-issue.url=https://instance.atlassian.net
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

## Jira / Issue / Update

Updates a Jira Issue.

### Configuration

:::tip Tip
These settings do not need to be set if credentials were configured on the [Jira Plugins Overview](/manual/plugins/jira-plugins-overview.html) page.
:::

The Jira connection credentials are set in the `project.properties` file
for your project.
Password it's a keystorage path to the password.

```
project.plugin.WorkflowStep.jira-update-issue.login=admin@instance.com
project.plugin.WorkflowStep.jira-update-issue.password=keys/jira/password
project.plugin.WorkflowStep.jira-update-issue.password-key-storage-path=keys/jira/password
project.plugin.WorkflowStep.jira-update-issue.url=https://instance.atlassian.net
```

### Usage

To use the plugin, configure the mandatory inputs.

- issue key: Jira Issue ID.
- transition: Transition name, in the case of Incidents these value can be Investigate, Pending, Resolve, Cancel or Close

Optional input:

- resolution: Resolution, only needed to Close or Resolve an Incident

## Jira / Issue / Get Data

Retrieve Jira Issue data by key.

### Configuration

:::tip Tip
These settings do not need to be set if credentials were configured on the [Jira Plugins Overview](/manual/plugins/jira-plugins-overview.html) page.
:::

The Jira connection credentials are set in the `project.properties` file
for your project.
Password it's a keystorage path to the password.

```
project.plugin.WorkflowStep.jira-get-issue.login=admin@instance.com
project.plugin.WorkflowStep.jira-get-issue.password=keys/jira/password
project.plugin.WorkflowStep.jira-get-issue.password-key-storage-path=keys/jira/password
project.plugin.WorkflowStep.jira-get-issue.url=https://instance.atlassian.net
```

### Usage

To use the plugin, configure the mandatory input.

- key: Jira issue ID.
- plainJson: to print the info in plain Json instead of formatted text.
