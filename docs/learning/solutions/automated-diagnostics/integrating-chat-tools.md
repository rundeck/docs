# Automated Diagnostics

## Sending Diagnostics to Chat Tools

Most teams operate out of a chat tool, like Slack or Microsoft Teams, during an incident.  
This is so that they can collaborate, assign tasks, and update others as they troubleshoot the issue. 
For this reason, one of the best practices with the Diagnostics Solution is to integrate PagerDuty with your chat tool so that the diagnostic data appears automatically in the incident channel.

Depending on the chat tool you use, you will want to follow the [Slack Integration Guide](https://support.pagerduty.com/docs/slack-integration-guide) or the [Microsoft Teams Integration Guide](https://support.pagerduty.com/docs/microsoft-teams).

Once those integrations are complete and a Channel or Team has been linked to a PagerDuty Service or Incident, the diagnostics from the runbook will appear in the chat tool when they are posted to the Incident Timeline:

![Diagnostic results displayed in Slack](/assets/img/diag_in_slack.png)

<br>

![Automation Actions in Microsoft Teams](/assets/img/auto-actions-ms-teams.png)

## Invoking Diagnostics from Chat Tools
PagerDuty’s Slack and Microsoft Teams integrations also provide the ability to invoke Automation Actions:

![Invoke Automation Actions from Slack](/assets/img/invoke-actions-from-slack.png)

This can be useful for **“refreshing” the diagnostics**, which can assist with providing status updates to stakeholders.  

Invoking from chat tools also makes it easy to execute a known-fix remediation - such as a restart, rollback, failover or scaling of resources.