#Sensu Notifications (Enterprise Only)

:::enterprise
:::

Enterprise customers have access to this plugin, that allows you to create an event in Sensu based on the execution status of a job. For example, you can configure it to create an event if the job failed or if the job succeeded.

## Setup

:::warning
You will need to set the API Key and API Url at the project level or framework level. (I.e. `sensu.url=value` in framework.properties)
:::

Before we begin using the Sensu plugins, we are going to add the API key and URL. We can do this by adding the API key to Rundeck's key storage and specifying that path and the URL value in the framework.

1. In the top right-hand corner of Rundeck, click on the gear icon and select "Key Storage."
2. Select "Add or Upload a Key."
3. For key type, select "Password."
4. Where it says enter text, copy and paste your API key.
5. For storage path, this can be whatever you want (REMEMBER THIS FOR LATER). E.g. keys/sensu/api
6. This can be whatever you want. For example, if you chose API as the name, the new path would be keys/sensu/api.
7. Now that we have created the keys, we need to specify them in the framework. Open the `etc/framework.properties` file and add the following lines:
```bash
sensu.url=value
sensu.api_key_path=/keys/sensu/api
```
Where `path` is the path you created above

## Send Event

![Sensu - Send Event Notification](~@assets/img/sensu-notification1.png)

- **Entity Namespace**
: This is the namespace that the event should be organized in.

- **Check Name**
: This is the check to add to the event.

- **Output**
: This is the check output for the event.

- **State**
: This is the check state for the event. Set the API URL and API key in the project/framework settings prior to creating the job, there will be a list of state values that are currently in Sensu to choose from.

- **Status**
: This is the check status for the event. Set the API URL and API key in the project/framework settings prior to creating the job, there will be a list of status values that are currently in Sensu to choose from.

- **Check Handlers**
: Select one of the check handlers and it will apply that handler to the new event. I.e. if you select the "Slack Handler," a notification will be sent to slack.

- **Is Silence?**
: If checked, the event will be silenced.

![Sensu - Send Event Notification - continued](~@assets/img/sensu-notification2.png)

- **Check Interval**
: This is the interval to run the check on.

- **API URL**
: This is the endpoint that needs to be hit in order to create an event for an account. For example, `http://sensu:8080/api/core/v2/namespaces/default`. If it is already specified it in project or framework settings, you don't need to add it again here.

- **API Key**
: This is the API key for the account to create an event in. Choose the one you created in the Setup section above. If it is already specified it in project or framework settings, you don't need to add it again here.