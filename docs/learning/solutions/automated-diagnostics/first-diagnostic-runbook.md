# Automated Diagnostics

## First Diagnostics Runbook

Now that your Runbook or Process Automation instance has been integrated with Automation Actions, you’re ready to invoke your first Diagnostic Runbook.  
Before jumping into your Automation instance, first [create a PagerDuty API Key](https://support.pagerduty.com/docs/api-access-keys) and copy or save it somewhere to be used later.  
This will be used to add the Diagnostic data onto the PagerDuty Incident.

Navigate into your Automation instance.  In the **Automated Diagnostics** project, click on the **Third Party Service Disruptions** job:
![First Diagnostic Runbook](@assets/img/third-party-service-disruptions.png)

This Job retrieves recent service-disruptions from Public-cloud or SaaS providers:
Click **Run Job Now**.  You will see whether there have been recent incidents for the specific Public-cloud or SaaS provider.

### Add PagerDuty Token into Key Storage
Navigate to **Project Settings** -> **Key Storage**.
Click **+Add or Upload a Key**. Select **Password** for the Key Type.  Paste the PagerDuty API Key you saved earlier into the field.
Name the key **`pd-api-key`**.

:::warning Note
Be sure to name the key **`pd-api-key`**. Otherwise, the prewritten Jobs will not post to PagerDuty.
:::

### Add PagerDuty Email to Project Configuration
Next, we need to add a PagerDuty user’s email as a project setting.  This is because Notes on the PagerDuty Incident must be associated with a particular user.
:::tip Tip
This can be a “placeholder” user in PagerDuty that is not associated with a particular person. Think of it as an “integration user.”
:::

Navigate to **Project Settings** -> **Edit Configuration** -> **Edit Configuration File**.

Find the line that starts with **`project.globals.pd-email`**
Replace the email address there with a valid PagerDuty user's email.
Click on **Save** at the bottom of the page.

### Invoke Diagnostic Runbook from PagerDuty
Navigate back to PagerDuty.  
If you have not yet associated an **Automation Action** with a Service, follow the steps in the [Integrating with Automation Actions](/learning/solutions/automated-diagnostics/automation-actions) section.
Navigate to an Incident that is part of that associated Service - either active or resolved.  Click on **Run Actions** and click on the Action that was defined in the prior section.
Click on **Run Job**.

When the page is refreshed, the following should now be visible on the Incident **Timeline**:
![First Diagnostics Output](@assets/img/third-party-service-disruptions-output.png)

The output you see in PagerDuty is different from the content seen in the log output of the Diagnostic Runbook.  
This is to demonstrate how verbose log data can be “simplified” so that a responder can make quick, informed decisions on where to start investigating or whom to pull in for assistance.
With this sample Job - and others in the **Automated Diagnostics Project** - users can click the link in the Incident note to jump into the Automation instance to see the full diagnostic data output.  
If desired, it is straightforward to send the "verbose" output to PagerDuty rather than just the simplified output.  

