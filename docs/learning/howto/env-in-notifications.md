# Pass captured Key-Value Data into Notifications
:::tip
Though these instructions reference Rundeck, they can also be applied to environments running the Enterprise versions of the product, PagerDuty [Runbook Automation](https://www.pagerduty.com/platform/automation/runbook/).
:::

## Overview
Job notifications are messages triggered by a job event. Notifications can occur based on different job events or statuses via email or by calling a webhook. Rundeck users commonly add job results or job key-value data on the notification result to store the job result in the service that receives the notification. In this article, we will show you how to capture useful data and add it to any job notification.
The HTTP Notification Step plugin is required to follow this example. The plugin is available [here](https://github.com/rundeck-plugins/http-notification) and instructions to install it in Rundeck are [here](/administration/configuration/plugins/installing.html#installation).

## Step-by-step example

### Creating a Global Variable
1. Create a new job and add a command step that just displays all environment variables with the `env` command.
2. Add a Key Value Data log filter to capture the user name. 
![](/assets/img/notification1.png)
3. For the pattern, enter the following regex `^(USER)\s*=\s*(.+)$ `
 Also, check the Log Data box.
![](/assets/img/notification2.png)
4. Create a new global variable using Key-Value Data. 
![](/assets/img/notification3.png)
5.Add `${data.USER*}` on the Value text field, “export” on the Group text field, and “myglobal” in the "Name" text field.
![](/assets/img/notification4.png)
6. To test the exported variable, add a new step to print it: echo `${export.mydata.`Save it and run it to test, the result should be the Key Value Data content.
![](/assets/img/notification5.png)

### Using the Variable in notifications
1. The exported variable is usable on any notification.  Edit the job by clicking on the "Notifications'' tab.  
![](/assets/img/notification6.png)
2. Click on "+ Add Notification" in the "On Success" section.
![](/assets/img/notification7.png)
3. In the "Notification Type" section put the HTTP URL to send the test exported variable content. You can test this using your own unique url from this site: [https://webhook.site](https://webhook.site) (Go there in your browser to get one).  On the "HTTP Method" select "POST" and put the exported variable in the "Body" section in this format `${export.myglobal}.`
![](/assets/img/notification8.png)
4. Run the job and see the exported variable content from the HTTP service (containing the Key Data variable) on the test site.
![](/assets/img/notification9.png)

## Job Definition Example (in YAML format) to [import](/manual/creating-jobs.md#importing-job-definitions) and test.

```
- defaultTab: nodes
 description: ''
 executionEnabled: true
 id: ea07f41a-71b4-4ed9-91fb-6113de996e48
 loglevel: INFO
 name: TestJob
 nodeFilterEditable: false
 notification:
   onsuccess:
     plugin:
       configuration:
         authentication: None
         body: ${export.myglobal}
         contentType: application/json
         method: POST
         remoteUrl: https://any/webhook/url
         timeout: '30000'
       type: HttpNotification
 notifyAvgDurationThreshold: null
 plugins:
   ExecutionLifecycle: {}
 scheduleEnabled: true
 schedules: []
 sequence:
   commands:
   - exec: env
     plugins:
       LogFilter:
       - config:
           invalidKeyPattern: \s|\$|\{|\}|\\
           logData: 'true'
           regex: ^(USER)\s*=\s*(.+)$
         type: key-value-data
   - configuration:
       export: myglobal
       group: export
       value: ${data.USER*}
     nodeStep: false
     type: export-var
   - exec: echo ${export.myglobal}
   keepgoing: false
   strategy: node-first
 uuid: ea07f41a-71b4-4ed9-91fb-6113de996e48
```

## Resources

* [Key Value Data usage](/manual/log-filters/key-value-data.md#key-value-data) (Rundeck documentation).
* [Passing data between steps](/learning/howto/passing-variables.md) (Rundeck how-to article).
* [Rundeck Feature Tutorial: Output Processing and Data Passing](https://www.youtube.com/watch?v=ao2SvpspWl4) (Youtube video).