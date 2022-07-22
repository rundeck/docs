# Sumo Logic Workflow Steps

:::enterprise
:::

Sumo Logic provides cloud monitoring, log management, Cloud SIEM tools, and real-time insights for web and SaaS based apps.
The **Sumo Logic workflow steps** allows users to automate operational tasks - such as retrieving logs for incident diagnostics - by integrating with their Sumo instance.

There are two Workflow Step plugins for Sumo Logic:
* [Create and Execute Query Search Job](#execute-a-new-query-in-sumo-logic) - Executes a new logs query in Sumo Logic to surface log data in PagerDuty Process Automation.
* [Execute a Saved Search Query](#execute-a-saved-query-in-sumo-logic) - Executed an existing, saved logs query in Sumo Logic to surface log data in PagerDuty Process Automation.

![Create Query Example](@assets/img/sumo-logic-create-query-example.png)<br>

## Integration Setup

To configure the Sumo Logic workflow steps, API credentials must be generated in Sumo Logic:

1. In the Sumo Logic web app, click your name in the left-nav and open the **Preferences** page.
2. In the **My Access Keys** section, click **+ Add Access Key**.
3. The **Create a Sumo Logic Access Key** window appears.
4. Enter a **Name** for the access key in the Name field. If you don’t want to create an allowlist of domains from which the access key can be used to access Sumo APIs, go to step 8 below.
5. (Optional) In this step, you can define one or more domains that may use the access key to access Sumo APIs. Enter a domain in the **Allowlisted CORS Domains** field and click Add.
6. The window updates, and displays the domain you added.Repeat steps 5 and 6 to add additional domains to the allowlist. 
7. Click **Create Key** to generate the key. 
8. The window displays the generated Access ID and Access Key. Copy both before clicking **Close**. After you press Close, you will not be able to recover the Access ID and Access Key.