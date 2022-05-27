## Automated Diagnostics
### Following the Tours

In addition to the library of prebuilt Automation Jobs, this Solution includes a collection of in-product **Tours** that guide you through integrating the automation with your infrastructure and tooling - including PagerDuty’s Incident Response.

To begin using the Solution, it is recommended that you follow the included Tours.

::: tip Tip
To initiate any Tour, click the Tours icon at the bottom right of your screen (next to the light bulb icon) and select the Tour you’d like.
:::

![Initiate Tours](@assets/img/solutions-auto-diag-initiate-tours.png)<br>

### Included Tours
| Tour | Dependencies or Requirements | Expected Result |
|---|---|---|
| Tour 1: Configure AWS Credentials | - Your AWS Access Key ID<br> - Your AWS Secret Key | Can run most includes AWS Jobs |
| Tour 2: Configure EC2 Inventory | - Completed Tour 1<br> * Endpoint Region  (you will select this during the tour) | EC2 instances added to the Node-Inventory |
| Tour 3a: Configure Systems Manager (SSM) | - Completed Tours 1 and 2 | Can connect to AWS instances using SSM for commands and Jobs |
| Tour 3b: Configure SSH Connectivity | - Completed Tour 1 and 2<br><br> - Install an Enterprise Runner if you are using Runbook Automation<br><br> - SSH Private Key or Password for connecting to nodes | Can connect to nodes using SSH for commands and Jobs |
| Tour 4: Send Diagnostic Data to PagerDuty | - PagerDuty API Token | Can add diagnostic-diata to the Incident Timeline of PagerDuty incidents |

### **After following the tours, you can now use the [<span style="color:green"><ins>Prebuilt Automation Jobs!</ins></span>](/learning/solutions/automated-diagnostics/jobs.html)**