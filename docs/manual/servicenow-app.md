# Rundeck Automation - ServiceNow Application

Our ServiceNow application can be found on the ServiceNow Store.  The application is free to Enterprise customers.  To request the application please contact your Account Executive or Customer Success contact.

## Requirements

The application is supported on New York and Orlando ServiceNow releases.

An active Rundeck Enterprise license for version 3.2.x or higher is also required.

## Requesting the application

ServiceNow instructions TBD

## Configuration Steps

After the app has been installed in your ServiceNow instance there will be a new "Rundeck Automation" Module Group.

Note: Your account will need the 'admin' role and 'rundeck_app_user' role to configure these settings.

1. Create an API Key

2. Click "Configure Rundeck Connection" and fill out the fields on the form with your environment details.

- Choose if your Rundeck instance is running over http or https.
- Enter the IP address or domain name where your Rundeck is running.
- Confirm the port number Rundeck is running on
- Paste in the API Key from Step 1
- In rare occurrences the API version can be adjusted.  Default and minimum version is 34.

![Configuration Settings](@assets/img/sn-properties-config.png)


## Using the Application

### ServiceNow Roles included

- executor: Assign this role to allow users to execute Rundeck actions.  The role provides read-only access to the minimum necessary application components.
- rundeck_app_user:  Grants access to the Rundeck Automation module listing and allow read/write access to most application areas.

### Importing Webhooks

The Scheduled Scripts module will list the Populate Webhooks Scheduled Script.  This script can be used to import all available webhooks.  By default it comes unscheduled.  In order to keep your webhook listing current the script can be scheduled to run on a regular interval.

### Calling Webhooks from ServiceNow Code

Upon import webhooks from your Rundeck Projects will be added to the **Rundeck Webhooks** table.  A 'Code Example' field provides basic code that can be used in ServiceNow Client or Server side scripts to call that specific webhook.

![Webhook Record](@assets/img/sn-webhook-record.png)

```javascript
var rd = new Rundeck();
rd.callWebhook('11','{}');
```
The `callWebhook` function is part of a Server Include entry. The function takes two arguments to call a particular webhook.
 - ID value (e.g. "11")
 - An optional custom payload in JSON format "{}".  (Note: if no payload is needed leave the two empty braces as shown in example code).

### Examples

Below is an example Incident UI Action script that includes the ticket number and hostname value from the associated CMDB CI.

```javascript
try {
    var rd = new Rundeck();
    //Call Rundeck Webhook Server Include with ([webhook id], [payload])
    rd.callWebhook('11', '{"ticket":"' + current.number + '", "host":"' + current.cmdb_ci.host_name + '"}');
    action.setRedirectURL(current);
} catch (e) {
    gs.error(e);
}
```
