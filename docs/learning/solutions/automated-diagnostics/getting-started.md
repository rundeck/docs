## Automated Diagnostics
### Getting Started

::: tip Prerequisites
To use the Automated Diagnostics Solution, you must have either a Runbook Automation license or a Process Automation (previously Rundeck Enterprise) license.
If you do not have a license for either of these products, reach out to Sales.
:::

To get started with this Solution in your environment, you need to do the following:
1. Download the Automated Diagnostics Solution package
2. Create a project in your Runbook Automation environment 
   1. Click the blue “New Project+” button on your Main Dashboard (Click the P in the upper left corner to navigate to the Main Dashboard). 
   2. Copy the following into the Name field:  automated-diagnostics Provide a Label if you would like a “friendlier” visible name with spaces 
   3. Click the green Create button 
3. Import the archive file into your new project:
   1. In your new project, click the gear in the bottom left corner (Project Settings)
   2. Choose Import Archive from the menu and choose the project archive file you downloaded above 
   3. From the downloaded resources, select the automated-diagnostics-xxxxxx.jar 
   4. Click green Import button 
4. Import the Tours 
   1. Click the gear-icon in the upper right and select Tour Manager 
   2. Click on Import/Export and select Import 
   3. Select the system-tours-xxxxx.zip file from the downloaded resources 
   4. Click on the green Import button

::: tip Note
The Tours in the Automated Diagnostics Solution will help you integrate the product with various services (such as AWS) and other PagerDuty products.  However, if you are looking for a more general introduction to PagerDuty’s Automation products, you may wish to go through our tutorial and review the contents of the Welcome project, which can be found here.
:::