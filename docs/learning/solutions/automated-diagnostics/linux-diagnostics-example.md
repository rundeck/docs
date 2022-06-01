## Automated Diagnostics

### Example: Linux Host Diagnostics

Let's walk through an example for how to target a specific host with our diagnostics.

1. Click on a prior incident for the PagerDuty Service in question. It can be a _Resolved_ or _Active_ incident.
2. Expand the **Custom Details** on the Incident
3. Locate the field that serves as the host "identifier". In this example Incident from Datadog, **`orig-source`** works - since it is our EC2 instance ID:<br><br>
![Source Field](@assets/img/solutions-auto-diag-source-field.png)<br><br>
   * This is the field that will be passed to Runbook Automation to specify the Node to target.
4. Copy the field name for this host identifier.
5. Navigate to edit the **Automation Action** you created in the prior section:
    * **Automation -> Automation Actions** Click on the Action you created and then click on **Edit**
6. Add the following to the **Enter Process Automation arguments** field:
   * **`-node_filter ${pd.alert.details.orig-source}`**
   * Replace `orig-source` with the field name from **Step 4**:<br><br>
![Add Node Filter](@assets/img/solutions-auto-diag-add-node-filter.png)<br><br>
7. Click **Update Action**
8. Refresh the Incident page for the Service, and click the **Run Actions** dropdown:<br><br>
![Updated Action](@assets/img/solutions-auto-diag-updated-action.png)<br><br>
You will now see the host identifier in the arguments of the invocation pane:<br>
![Invocation Pane](@assets/img/solutions-auto-diag-invocation-pane.png)<br><br>
9. Click **Run Job**