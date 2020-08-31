# PagerDuty (Enterprise)
::: enterprise
:::

Rundeck's **PagerDuty Generic V2 Webhook** plugin makes it easy
to automatically run jobs in response to PagerDuty events.

Jobs can be executed in response to PagerDuty events when incidents are `triggered` or `updated`, or even in response to **custom actions**.  PagerDuty does this by executing a webhook call into Rundeck.  This guide will show and example PagerDuty integration that calls a Rundeck jobs for incidents when they are triggered.

## Getting Started
This section will guide you through configuring a Webhook in Rundeck using the
PagerDuty Webhook plugin.
The plugin configuration will run a **Job** when PagerDuty sends Rundeck an incident
`trigger` event.

### Create Rundeck Webhook
1. Navigate to **Webhooks**
2. Click **Add**
3. Give the new webhook a name.  (e.g. PagerDuty)
4. Select **PagerDuty: Generic V2 Webhook**

![](~@assets/img/wh-pd-create.png)


### Customize Sample Rule
A sample rule will be created in the Rules section called `PagerDuty Example Rule`. To configure rule details click the **Edit >** link.
1. Click **Choose A Job** to select a job to run when the rule matches.
2. Customize the **Job Options**:  
   The sample will set the job's `pd_incident_id` option to the PagerDuty incident ID extracted from the event
3. Customize **Conditions**:  
   The sample condition will match for `trigger` event types. See [Webhook Types](https://v2.developer.pagerduty.com/docs/webhooks-v2-overview#webhook-types) for a list of PagerDuty event types.
4. Save the Webhook

::: tip
Use the suggestion drop-downs to chose from common PagerDuty event fields
:::

![Sample Rule](~@assets/img/wh-pd-rule.png "Sample Rule")

### Add Webhook to PagerDuty

1. *In **Rundeck*** select the Webhook by name in **Webhook Management** and copy the **Post URL** :
   ![](~@assets/img/wh-pd-posturl.png)

2. *In **PagerDuty*** navigate to **Configuration** -> **Services** and select the service where the integration would be called from.
3. Select the **Integrations** tab and click **New Extension**
4. For the **Extension Type** select **Generic V2 Webhook**
5. Enter the **Post URL** into the **URL** field from step **1**
(For the Name we recommend using the same name as the webhook name in Rundeck.)
   ![](~@assets/img/wh-pd-extension.png)
