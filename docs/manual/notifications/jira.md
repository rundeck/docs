# Jira Notification Plugins (Commercial)

## Authentication
Follow the steps outlined in [Jira Plugins Overview](/manual/plugins/jira-plugins-overview.md) to configure authentication with Jira for these Notification plugins.

## Jira / Issue / Notification Comment

Append notification messages to a Jira issue.

The Jira connection credentials are set in the `project.properties` file for your project.

### Usage

To use the plugin, configure the mandatory input.

- issue key: The Jira issue ID.

## Jira / Issue / Notification Create

Creates a new Jira issue.

### Usage

To use the plugin, configure the mandatory inputs.

- project: Jira Project ID.
- type: Type of the issue, default Incident
- summary: Issue summary
- description: Issue description

Optional inputs:

- assignee: Issue assignee
- reporter: Issue reporter
