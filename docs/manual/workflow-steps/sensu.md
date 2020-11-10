# Sensu Workflow Steps (Enterprise)

:::warning
You will need to set the API Key and API Url at the project level or framework level. (I.e. `sensu.url=value` in framework.properties)
:::

Before we begin using the Sensu plugins, we are going to add the API key. We can do this by adding them to Rundeck's key storage and then specifying that path in the framework.

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

## Sensu / Check / Create

![Sensu - Create Check](~@assets/img/sensu-create-check.png)

- **Check Name**
: This is the check you want to get information about. If you set your API URL and API key in the project/framework settings prior to creating the job, there will be a list of checks that you currently have in Sensu for you to choose from.

- **Check NameSpace**
:

- **Check command**
: This is the command that you would like the check to run.

- **Check Subscriptions**
: These are the subscriptions that you would like to be added to the check. Example: `system, entity:12345`

- **Check Handlers**
: If you check one of the check handlers, it will apply those handlers to the new event. I.e. if you select the "Slack Handler," a notification will be sent to slack.

- **Is Publish?**
:

- **Check Type**
: This is the type that you want the check you are creating to be. If you set your API URL and API key in the project/framework settings prior to creating the job, there will be a list of check types that you currently have in Sensu for you to choose from.

- **Check Interval**
: This is where you set the check interval.

- **Check Cron**
: Set the check cron here. Example: `* * * * *` , `TZ=America/Los_Angeles * * * * *`


## Sensu / Delete / Silence

![Sensu - Delete a Silence on a Check](~@assets/img/sensuwf-delete-silence.png)

- **Check Name**
: This is the check that you would like the silenced entry to be deleted on. If you set your API URL and API key in the project/framework settings prior to creating the job, there will be a list of checks that you currently have in Sensu for you to choose from.

- **Subscriptions**
: These are the subscriptions that the entry should match. I.e. system, entity:id123

## Sensu / Create / Silence Entry

![Sensu - Create Silenced Entry](~@assets/img/sensu-create-silenced.png)

- **Check Name**
: This is the check you want to delete a silence entry from. If you set your API URL and API key in the project/framework settings prior to creating the job, there will be a list of checks that you currently have in Sensu for you to choose from.

- **Namespace**
: This is the namespace that you want the silenced entry to be in.

- **Subscriptions**
: These are the subscriptions that the new entry should match. I.e. system, entity:id123

- **Silence Reason**
: This is the reason that you are silencing. Can be whatever you want.

- **Expired**
- This is when you want the silenced entry to expire. This should be in number of seconds.

- **Begin**
: This is when you want the silenced entry to begin. You can specify seconds, minutes, hours. (I.e. 2s, 3m, 4h)

- **Expire on Resolve**
: If this is checked, then if the check finished successfully then the silenced entry will be deleted. 

- **API URL**
: This is the endpoint that needs to be hit in order to get the checks for a specific account. For example, `http://sensu:8080/api/core/v2/namespaces/default`

- **API Key**
: This is the API key for the account with the check you would like to get information about.
