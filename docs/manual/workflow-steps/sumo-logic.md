# Sumo Logic Workflow Steps

:::enterprise
:::

Sumo Logic provides cloud monitoring, log management, Cloud SIEM tools, and real-time insights for web and SaaS based apps.
The **Sumo Logic workflow steps** allows users to automate operational tasks - such as retrieving logs for incident diagnostics - by integrating with a Sumo Logic instance.

There are two Workflow Step plugins for Sumo Logic:
* [Create and Execute Query Search Job](#execute-a-new-query-in-sumo-logic) - Executes a new logs query in Sumo Logic to surface log data in PagerDuty Runbook Automation.
* [Execute a Saved Search Query](#execute-a-saved-query-in-sumo-logic) - Executes an existing, saved logs query in Sumo Logic to surface log data in PagerDuty Runbook Automation.

![Create Query Example](/assets/img/sumo-logic-create-query-example.png)<br>

## Integration Setup

### Sumo Logic Preparations

1. In the Sumo Logic web app, click the login name in the left-nav and open the **Preferences** page.
2. In the **My Access Keys** section, click **+ Add Access Key**.
<br><br>![Create Access Key](/assets/img/sumo-create-access-key.png)<br>
3. The **Create a Sumo Logic Access Key** window appears.
4. Enter a **Name** for the access key in the Name field. [To skip configuring the allowlist of domains from which the access key can be used to access Sumo APIs, go to step 8 below.]
5. (Optional) In this step defines one or more domains that may use the access key to access Sumo APIs. Enter a domain in the **Allowlisted CORS Domains** field and click Add.
6. The window updates, and displays the domain added. Repeat steps 5 and 6 to add additional domains to the allowlist.
7. Click **Create Key** to generate the key.
8. The window displays the generated Access ID and Access Key. Copy both before clicking **Close**. (These will only be shown once.).

### Runbook Automation Setup

#### Add Access Key to Key Storage
1. Click on the System Menu (**gear** icon in upper-right) and click on **Key Storage**.
2. Click on **+ Add or Upload a Key**.
3. For the **Key Type** select the **Password** option.
4. In the **Enter Text** field, paste in the _Access Key_ that was copied from step 8 above.
5. Provide a name for this key, such as `sumo-logic-access-key`:
<br><br>![Add to Key Storage](/assets/img/sumo-add-to-key-storage.png)<br>

#### Execute a New Query in Sumo Logic

1. Add a new step to a new or existing Job by clicking on **Add a Step**:
<br><br>![Add Job Step](/assets/img/sumo-add-job-step.png)<br><br>
2. Click on the **Workflow** tab and in the **Search Step** field, type in **`sumo`** and hit return:
<br><br>![Search for Step](/assets/img/sumo-search-for-step.png)<br><br>
3. Select **Sumo Logic / Create and Execute Query Search  Job**
4. In the **Credentials** section, paste in the Sumo Logic Access ID.
5. Use the **Select** button to define the path in Key Storage for the **Access Key**.
6. In the **Query String** text box, place the Sumo logs query:
<img style='border:1px solid #327af6' src="/assets/img/sumo-add-query.png" />
    :::tip Tip
     It is possible to include variables in the query by making use of [Job Options](/manual/job-options) and [Context Variables](/manual/job-workflows.html#context-variable-usage).
    For example, if the job uses a log filter to capture the **`_collector`** from a prior step and saved in a variable **`${data.collector}`**, this could be passed into the Query String:
    <br><br><img style='border:1px solid #327af6' src="/assets/img/sumo-use-data-variable.png" />
    :::
7. Select a **Time Range**, such as **`3s`**, **`5m`**, **`1d`**.  This is the relative look-back time for the query. For more details on the time range, see [here](https://help.sumologic.com/05Search/Get-Started-with-Search/Search-Basics/Time-Range-Expressions).
8. [Optionally] Add a name for the **Step Label**.
9. Click **Save** for the Job step.

#### Execute a Saved Query in Sumo Logic

1. Perform steps 1 and 2 above to search for the Sumo Logic Job step plugins.
2. Select **Sumo Logic / Execute a Saved Search Query**
3. In the **Credentials** section, paste in the Sumo Logic Access ID.
4. In the **Search Job ID** field, place in a saved Search query from Sumo Logic.
   :::tip Note
    This is the **SESSION** field for a query in Sumo Logic:
    <img style='border:1px solid #327af6' src="/assets/img/sumo-saved-query-session.png" />
    :::
5. [Optionally] Add a name for the Step Label.
6. Click Save for the Job step.
