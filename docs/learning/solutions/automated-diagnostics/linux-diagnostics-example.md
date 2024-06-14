## Automated Diagnostics

### Example: Linux Host Diagnostics

Let's walk through an example for how to target a specific host with our diagnostics.

1. Click on a prior incident for the PagerDuty Service in question. It can be a _Resolved_ or _Active_ incident.
2. Expand the **Custom Details** on the Incident
3. Locate the field that serves as the host "identifier". In this example Incident from Datadog, **`orig-source`** works - since it is our EC2 instance ID:<br><br>
![Source Field](/assets/img/solutions-auto-diag-source-field.png)<br><br>
   * This is the field that will be passed to Runbook Automation to specify the Node to target.
4. Copy the field name for this host identifier.
5. Navigate to edit the **Automation Action** you created in the prior section:
    * **Automation -> Automation Actions** Click on the Action you created and then click on **Edit**
6. Add the following to the **Enter Runbook Automation arguments** field:
   * **`-node_filter ${pd.alert.details.orig-source}`**
   * Replace `orig-source` with the field name from **Step 4**:<br><br>
![Add Node Filter](/assets/img/solutions-auto-diag-add-node-filter.png)<br><br>
7. Click **Update Action**
8. Refresh the Incident page for the Service, and click the **Run Actions** dropdown:<br><br>
![Updated Action](/assets/img/solutions-auto-diag-updated-action.png)<br><br>
You will now see the host identifier in the arguments of the invocation pane:<br>
![Invocation Pane](/assets/img/solutions-auto-diag-invocation-pane.png)<br><br>
9. Click **Run Job**. You can optionally view the status of the invocation by clicking on the **output report** on the incident timeline.

If the configuration was successful, the Automated Diagnostic Job will execute and the diagnostics will be posted to the Incident Timeline:
![Timeline Notes](/assets/img/solutions-auto-diag-timeline-notes.png)

::: warning Heads Up!
If the parameters in the **Runbook Automation Arguments** (_Step 6_) do not match those in the Job Options of the associated Runbook Automation Job, 
then you will see the following log in the Automation Actions output report:
```
Rundeck communication error. Status: 400
```
Be sure that _**all**_ Job Options are present in the **Runbook Automation Arguments** and that they are all spelled exactly the same.
:::

### Instance Attributes for Automation Actions Node Filter
If the Node names in Runbook Automation do not directly match the instance-identifier on the PagerDuty incident, you can modify the Node Filter syntax within the Automation Action
to associate it with the correct Nodes.

For example, in Runbook Automation, EC2's might be discovered by their display-name:<br><br>
![EC2 Nodes](/assets/img/solutions-auto-diag-ec2-nodes.png)<br><br>
In this case, we would use the **`instanceId`** node-attribute:<br><br>
![EC2 Node Attribute](/assets/img/solutions-auto-diag-ec2-node-attribute.png)<br><br>
So in Automation Actions, the **Runbook Automation Arguments** would be <br> 
**`-node_filter instanceId:${pd.alert.details.orig-source}`**, as shown here:<br><br>
![Action Node Syntax](/assets/img/solutions-auto-diag-actions-node-filter.png)<br><br>

**<center><font size="+3">Congratulations!</font></center>**
**You have successfully implemented the Automated Diagnostics Solution!**
**Check out the [Welcome Project](/learning/howto/welcome-project-starter) to learn other use-cases for Runbook Automation.**