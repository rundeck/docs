# Automated Diagnostics

## Integrating with Event Orchestration

Event Orchestration allows users to route events to an endpoint and create nested rules, which define sets of actions to take based on event content.

Users can configure Event Orchestration to natively invoke Automation Actions - without any human intervention. This allows for "zero touch" Automated Diagnostics and Remediation. 

:::tip Prerequisites
**Event Orchestration** is part of the _Even Intelligence_ feature-set. Details for which plans have this feature-set can be seen on our [**Pricing Page**](https://www.pagerduty.com/pricing/#aiops).
:::

### Configuration

Follow the official [PagerDuty documentation](https://support.pagerduty.com/docs/event-orchestration) to initially set up Event Orchestration. 

:::warning Heads Up
As of December 2022, Event Orchestration can integrate with Automation Actions solely for **Service Orchestration Rules**.
:::

1. As part of defining a [Service Rule](https://support.pagerduty.com/docs/event-orchestration#service-rules), navigate to the **Runbook Automation** tab:
   ![Service Rule Configuration](/assets/img/solutions-auto-diag-event-orchestration.png)<br><br>
2. In the **Automation Action** dropdown, select an Action from the list.
   :::tip Automation Actions
   If you have not yet configured an **Automation Action**, complete this first by following the [**Configuring Automation Actions**](/learning/solutions/automated-diagnostics/automation-actions)
   :::
   :::warning Heads Up
   Only one Automation Action can be specified per rule, however multiple Automation Actions can be triggered during incident creation by nesting rules one after another.
   :::
4. Click **Save**.

Now when an event, such as an alert from a monitoring tool, is sent to PagerDuty and evaluates for this **Service Rule**, the associated Automation Action will be invoked automatically.