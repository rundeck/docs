# Configure ServiceNow CMDB Node Source

The ServiceNow&reg; Node Source brings CMDB entries into Rundeck as Nodes.  This exercise shows how to configure and use some key features of that Node Source.

## PreRequisites

- ServiceNow&reg; login with access to the CMDB data
- (If possible) Add two entries to the Servers CI Class as "node1" and "node2" with other data assigned to that CI.

## Exercise

This exercise configures the [ServiceNow&reg; Node Source](/manual/projects/resource-model-sources/servicenow.md) with a Custom Filter from the ServiceNow&reg; CMDB.

:::: tabs
::: tab Basic Exercise
**ServiceNow&reg; Steps**

1. Login to your ServiceNow&reg; instance
1. In the Module Explorer navigate to _Configuration > Severs > All_ <br>or type `cmdb_ci.list` in the Filter Navigator box.
1. Filter the CMDB entries as needed for your Node Source.<br>In our example we have filtered for entries names that start with _node_.
    <br><br>![Example Filtered Results](@assets/img/howto-sn-nodelist.png)<br><br>
1. In the filter bar right click the last entry in the filter breadcrumbs list and choose **Copy Query**
    <br><br>![Copy CMDB Query](@assets/img/howto-sn-copyquery.png)<br><br>

**Rundeck Steps**

1. Open **Welcome Project > Project Settings > Edit Nodes**
1. Click **Add a new Node Source +** button
1. Choose **ServiceNow Resource Model Source**
1. Enter values for **Sever URL**, **Username**, **Password** (or supply Password Path to Key Store entry)
1. Paste the Query string from the ServiceNow&reg; steps above.<br>Our example uses `nameSTARTSWITHnode`
1. Click **Save**
1. Use the arrow buttons to put the ServiceNow&reg; Node Source above the Node Wizard.
    <br><br>![Move Node Source](@assets/img/howto-sn-movenodesource.png)<br><br>
1. Navigate to the **Nodes** area and search `.*` to show the SN nodes.

Since we previously completed the [Creating Nodes Tutorial](/learning/tutorial/creatingnodes.md) to add `node1` and `node2` and were able to add corresponding entries to our demo ServiceNow&reg; Instance the nodes were merged.  Moving the ServiceNow&reg; entry to the top allowed our settings from the Node Wizard entry to drive the settings.


:::

::: tab Additional Exercises
**Field Mappings**

1. Add some values to the Asset Tag fields on your ServiceNow&reg; entries.
1. Add the following text to the ServiceNow&reg; Node Source **Mapping Params**: `asset-tag.selector=asset_tag`
1. Refresh the Nodes List.

The Asset Tag (asset-tag) entry is now an attribute on the Node.

:::
::::

## Additional Information
ServiceNow's&reg;Developer program allows anyone to sign up and get access to a ServiceNow&reg; instance for testing/learning purposes. Sign Up at: [https://developer.servicenow.com/](https://developer.servicenow.com/)
