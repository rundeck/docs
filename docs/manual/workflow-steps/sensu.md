# Sensu Workflow Steps (Enterprise)

Before using the Sensu plugins, add the API key and URL to the framework settings To do this, add the API key to Rundeck's key storage and specify the path and the URL value in the framework.

1. In the top right-hand corner of Rundeck, click on the gear icon and select "Key Storage."
2. Select "Add or Upload a Key."
3. For key type, select "Password."
4. Where it says enter text, copy and paste the API key.
5. For storage path, this can be anything (REMEMBER THIS FOR LATER). E.g. keys/sensu/api
6. This can be anything. For example, if  api is the name, the new path would be keys/sensu/api.
7. Now that the keys are created, specify them in the framework. Open the `etc/framework.properties` file and add the following lines:
```bash
sensu.url=value
sensu.api_key_path=/keys/sensu/api
```
Where `path` is the path created above

## Sensu / Check / Create

![Sensu - Create Check](~@assets/img/sensu-create-check.png)

- **Check Name**
: This is the name of the check to create.

- **Check NameSpace**
:This is the namespace to add the check too. 

- **Check command**
: This is the command for the check to run.

- **Check Subscriptions**
: These are the subscriptions that to be added to the check. Example: `system, entity:12345`

- **Check Handlers**
: If one of the check handlers is selected, it will apply those handlers to the new event. I.e. if  "Slack Handler" is selected, a notification will be sent to slack.

- **Check Type**
: This is the type that the check being created should be. If the API URL and API key are set in the project/framework settings prior to creating the job, there will be a list of check types that are currently in Sensu to choose from.

- **Check Interval**
: This is interval the check should be run on.

- **Check Cron**
: Set the check cron here. Example: `* * * * *` , `TZ=America/Los_Angeles * * * * *`


## Sensu / Delete / Silence

![Sensu - Delete a Silence on a Check](~@assets/img/sensuwf-delete-silence.png)

- **Check Name**
: This is the check the silenced entry should be deleted on. If the API URL and API key are set in the project/framework settings prior to creating the job, there will be a list of checks that are currently in Sensu to choose from

- **Subscriptions**
: These are the subscriptions that the entry should match. I.e. system, entity:id123

## Sensu / Create / Silence Entry

![Sensu - Create Silenced Entry](~@assets/img/sensu-create-silenced.png)

- **Check Name**
: This is the check to create a silenced entry for. If the API URL and API key are set in the project/framework settings prior to creating the job, there will be a list of checks that are currently in Sensu to choose from

- **Namespace**
: This is the namespace the silenced entry should be in.

- **Subscriptions**
: These are the subscriptions that the new entry should match. I.e. system, entity:id123

- **Silence Reason**
: This is the reason for silencing. Can be anything.

- **Expired**
- This is when the silenced entry should expire. This should be in number of seconds.

- **Begin**
: This is when the silenced entry should begin. Can specify seconds, minutes, hours. (I.e. 2s, 3m, 4h)

- **Expire on Resolve**
: If this is checked, then if the check finished successfully then the silenced entry will be deleted. 

- **API URL**
: This is the endpoint that needs to be hit in order to get the checks for a specific account. For example, `http://sensu:8080/api/core/v2/namespaces/default`. If it is already specified it in project or framework settings, no need to add it again here.

- **API Key**
: This is the API key for the account with the check to get information about. If it is already specified it in project or framework settings, no need to add it again here.
