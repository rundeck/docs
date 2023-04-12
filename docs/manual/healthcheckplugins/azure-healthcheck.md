# Azure Health Check (Enterprise Only)

:::enterprise
:::
## Overview

The Azure Health Check plugin checks the status of Azure VMs. If the host is running the plugin will return a "healthy" status.

## Authentication

Follow the steps outlined in the [**Azure Plugins Overview**](/manual/plugins/azure-plugins-overview) to configure authentication for Azure Job steps.
Credentials can be configured on a per Job Step basis, Project basis, or for the entire Process Automation system.

## Setup

1. Visit the **Project Settings**... > **Edit Nodes** page.  Under the Configuration tab, check the "Health Checks Enabled" checkbox:
   * Alternately, in the project configuration properties file, add the configuration property:<br> 
      `project.healthcheck.enabled=true`<br>
   The health check uses a cache to store the statuses and improve performance when requesting them. To automatically refresh the Health Checks, enable the "Refresh health status cache" and set the update period in the "Cache refresh period" field whose default value is 30 seconds.
   <br>![Health Checks Enabled](@assets/img/healthchecks-enabled.png)
2. Visit the sidebar link "Health Checks"   
   ![Sidebar - Health Checks Link](~@assets/img/healthchecks-sidebar-link.png)
3. Click on the "Configure" Tab, and **Add a Health Check Plugin**.
4. Select **Azure / HealthCheck Plugin** from the list 
5. Return to the Nodes Tab to see a list of nodes.
   * There may be a message saying "Unauthorized: cannot execute on node".  If so, add an ACL Policy to allow the Health Check System to run commands and scripts on the target nodes. See [Access Control](#access-control).
![Health Checks - Unauthorized Warning](~@assets/img/healthchecks-unauthorized.png)<br><br>
7. Once Access Control is configured, the checks should be showing up and healthy:
   ![Health Checks - Healthy checks](~@assets/img/healthchecks-healthy-checks.png)<br><br>
8. Return to the "Project Settings... > Edit Nodes" page. Under "Enhancers" click "Add a new Node Enhancer"  and choose "Health Status".
   ![Health Checks - Add Node Enhancer](~@assets/img/healthchecks-add-node-enhancer.png)<br><br>
   Option to modify the settings, or keep the defaults.  Make sure "UI Status Attributes" is added, to add UI indicators. Then click "Save" and "Save" again.<br>
   ![Health Checks - Add Health Status Enhancer](~@assets/img/healthchecks-add-health-status-enhancer.png)<br><br>
9. Visit the "Nodes" link in the Sidebar. There will be healthy status indicators for the nodes:
   ![Health Checks - Node Health Status UI](~@assets/img/healthchecks-health-status-ui.png)