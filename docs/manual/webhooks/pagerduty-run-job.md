# PagerDuty Webhooks (Enterprise)
::: enterprise
:::

Rundeck has two PagerDuty webhooks - one handles **PagerDuty's V2 webhooks** and one handles **PagerDuty's V3 webhooks**. The webhooks both function the same.

Jobs can be executed in response to PagerDuty events when incidents are `triggered` or `updated`, or even in response to **custom actions**.  PagerDuty does this by executing a webhook call into Rundeck.  This guide will show and example PagerDuty integration that calls a Rundeck jobs for incidents when they are triggered.

## Getting Started
This section will walk through configuring a Webhook in Rundeck using a PagerDuty Webhook plugin.
The plugin configuration will run a **Job** when PagerDuty sends Rundeck an incident
`trigger` event.


### Create Rundeck Webhook
1. Navigate to **Webhooks**
1. Click **Add**
1. Give the new webhook a name.  (e.g. PagerDuty)
1. Select **PagerDuty: Generic V2 Webhook** or **PagerDuty: Generic V3 Webhook**

![](~@assets/img/wh-pd-create.png)


### Customize Sample Action
A sample action will be created in the Actions section called `PagerDuty Example Action`. To configure action details click the **Edit >** link.
1. Click **Choose A Job** to select a job to run when the rule matches.
1. Customize the **Job Options**:  
   The sample will set the job's `pd_incident_id` option to the PagerDuty incident ID extracted from the event
1. Customize **Conditions**:  
   The sample condition will match for `trigger` event types. See [Webhook Types](https://v2.developer.pagerduty.com/docs/webhooks-v2-overview#webhook-types) for a list of PagerDuty event types.
1. Save the Webhook

::: tip
Use the suggestion drop-downs to chose from common PagerDuty event fields
:::

![Sample Action](~@assets/img/wh-pd-rule.png "Sample Action")

### Add Webhook to PagerDuty

1. *In **Rundeck*** select the Webhook by name in **Webhook Management** and copy the **Post URL** :
   ![](~@assets/img/wh-pd-posturl.png)
1. *In **PagerDuty*** navigate to **Services** in the top menu and select the service where the integration would be called from.
1. Select the **Integrations** tab and click **Add or Manage extensions**
1. Click **New Extension**
1. For the **Extension Type** select **Generic V2 Webhook**
1. Enter the **Post URL** into the **URL** field from step **1**
(For the Name we recommend using the same name as the webhook name in Rundeck.)
   ![](~@assets/img/wh-pd-extension.png)

### V3 Webhook Signature Verification

In Rundeck 3.4.0 and later, enterprise customers have the ability to verify that incoming webhooks are actually coming from PagerDuty.

To begin, users must have a shared secret key from PagerDuty. In order to get the shared secret key, make an API call to create a webhook subscription, as described here: [Webhook Subscriptions](https://developer.pagerduty.com/api-reference/reference/REST/openapiv3.json/paths/~1webhook_subscriptions/post)

In the response body of the call above, there will be a "secret" key. The value for secret is the shared secret used to verify webhooks. Once that value has been returned, create a new password type key in Rundeck Key Storage.

Now, when returning to the Webhook V3 definition as described above, select "Shared Secret" and then select the shared secret key from key storage. If the key doesn't match what was returned from PagerDuty, the webhook will not trigger the job successfully.
