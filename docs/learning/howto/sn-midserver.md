# Use a ServiceNow MID Server

A management, instrumentation, and discovery (MID) Server is a Java application that runs on a server on your local network. MID Servers facilitate communication and data movement between a ServiceNow® instance and external applications, data sources, and services.

Many Rundeck users utilize the ServiceNow Rundeck Application to trigger provisioning, diagnostic, and repair actions from ServiceNow ITSM workflows. The [Rundeck Automation App available in the ServiceNow Store](https://store.servicenow.com/sn_appstore_store.do#!/store/application/1f1cf27adb252110e8744a6c139619f8/) can be configured to use a MID Server to facilitate secure communications from ServiceNow® to your on-premise Process Automation installation.

> Note: MID Servers can only be used for sending outgoing HTTP messages from ServiceNow to Rundeck that are calling webhooks.  Rundeck will still need to communicate directly with the ServiceNow API for job steps.

## Pre-Requisites

* The ​​[Rundeck Automation ServiceNow® Store App](https://store.servicenow.com/sn_appstore_store.do#!/store/application/1f1cf27adb252110e8744a6c139619f8) must be installed. For more information on requesting access to the store app, see  [Rundeck Automation - ServiceNow Application](/manual/integrations/servicenow-app.md#rundeck-automation-servicenow-application) for details.
* A [ServiceNow Mid Server](https://docs.servicenow.com/bundle/rome-servicenow-platform/page/product/mid-server/concept/mid-server-landing.html) is already installed and working within your local environment.
* Note, the Rundeck ServiceNow App is only available to Process Automation users.

## Configuration Steps

​​After the store app has been successfully installed in your ServiceNow® instance, you can complete the following steps to configure a specific MID Server to use.

> Note: The ServiceNow login account will need the `web_service_admin` role and `x_pd_process_autom.app_user` roles to configure these settings.

1. Navigate to **System Web Services** > **REST Message**
1. Click the _Rundeck - API_ Entry
1. For each entry in the _HTTP Methods_ menu , click on the method name to open the record
    ![](/assets/img/howto-snmidserver-1.png)
1. After opening the record, click on the ‘HTTP Request’ tab and select the MID Server.
    ![](/assets/img/howto-snmidserver-2.png)
1. Click **Update** at the bottom of the page to save the change for each record.

## More Information

* [Rundeck Automation - ServiceNow Application Documentation](/manual/integrations/servicenow-app.md)
* [Link to Rundeck Automation App in the ServiceNow Store](https://store.servicenow.com/sn_appstore_store.do#!/store/application/1f1cf27adb252110e8744a6c139619f8)
* [How to setup Webhooks to trigger your Rundeck Jobs](/learning/howto/using-webhooks.md)
