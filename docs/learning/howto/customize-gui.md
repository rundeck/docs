# How to customize the Rundeck GUI
Rundeck empowers organizations to efficiently manage and orchestrate complex workflows. While the out-of-the-box interface provides powerful capabilities, tailoring the GUI to your needs can enhance user experience and streamline operations. 

In this how-to guide, we will explore the advantages of customizing the Rundeck GUI, delve into relevant use cases, and provide step-by-step instructions to help you unlock the full potential of this versatile automation platform.

This allows you to:
* Tailor User Experience: Customize the Rundeck interface to align with your organization's branding, making it more intuitive and user-friendly for your team.
* Increase Efficiency: Streamline workflows by organizing and presenting information in a way that matches your team's workflow, reducing the time required to execute tasks.
* Ensure Branding and Compliance: Tailor the appearance to reflect your organization's branding, while also ensuring compliance with industry standards and security protocols.

## GUI customization parameters

`rundeck.gui.instanceName`   
It allows you to define a name for your Runbook Automation instance in a clustered environment. The Instance name will be displayed on the top right corner of your instance on all pages and the Login Screen. Example with the value "Production".

`rundeck.gui.instanceNameLabelColor`  
Sets the instance label background color in HEX format. The example below with `c` (Red).

`rundeck.gui.instanceNameLabelTextColor`  
Sets the instance label text color in HEX format. The default value is #FFFFFF (White).

`rundeck.gui.title`  
Allows you to change the title presented in the web browser.

`rundeck.gui.login.welcome`  
Allow you to define a welcome message (in plain text format) to be displayed on the login page. For example with the value "Welcome to PROD Rundeck".


`rundeck.gui.login.welcomeHtml`  
Allow you to define a welcome message (HTML Formatted) to be displayed on the login page. For example with the value "WARNING: You are accessing the Production instance. Proceed with caution!".

`rundeck.gui.login.footerMessageHtml`  
Allow you to define a footer message (HTML Formatted) to be displayed on the login page. For example with the value "PRODUCTION".

`rundeck.gui.clusterIdentityInHeader`  (**Only for Runbook Automation products**)   
For clusterized environments, when set as true it will display your server name/ID in the page header.

`rundeck.gui.clusterIdentityInFooter` (**Only for Runbook Automation products**)   
For clusterized environments, when set as true it will display your server name/ID in the page footer.

## Gui Customization Example
1. Stop your Rundeck instance service.
2. Open the `rundeck-config.properties` file and add the following lines:

```
rundeck.gui.instanceName=Production
rundeck.gui.instanceNameLabelColor=#880808
rundeck.gui.instanceNameLabelTextColor=#FFFFFF
rundeck.gui.title=Production
rundeck.gui.login.welcome=Welcome to Production Instance
rundeck.gui.login.footerMessageHtml=Lab One
```

3. Save the file and start the Rundeck service.
4. Check the web GUI.  
![](/assets/img/custom-gui.png)

## Resources
[Rundeck Full GUI Customization Reference](https://docs.rundeck.com/docs/administration/configuration/gui-customization.html) 
