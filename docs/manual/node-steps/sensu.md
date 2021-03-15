# Sensu Node Steps (Enterprise)

Before using the Sensu plugins, add the API key and URL to the framework settings To do this, add the API key to Rundeck's key storage and specify the path and the URL value in the framework.

1. In the top right-hand corner of Rundeck, click on the gear icon and select "Key Storage."
2. Select "Add or Upload a Key."
3. For key type, select "Password."
4. Where it says enter text, copy and paste the API key.
5. For storage path, this can be anything (REMEMBER THIS FOR LATER). E.g. keys/sensu/api
6. This can be anything. For example, if  api is the name, the new path would be keys/sensu/api.
7. Now that the keys are created, specify them in the framework. Open the `etc/framework.properties` file and add the following lines:
```bash
sensu.url=http://sensu-backend:8080/api/core/v2/namespaces/default
sensu.api_key_path=/keys/sensu/api
```
Where `path` is the path created above

## Configuration

![Sensu - Dispatch to Nodes](~@assets/img/datadog-dispatch.png)

## Sensu / Get Check Info

![Sensu - Get Check](~@assets/img/sensu-get-check.png)

- **Check Name**
: This is the name of the check to gather information about. Set the API URL and API key in the project/framework settings prior to creating the job, there will be a list of checks that are currently in Sensu to choose from.

- **API URL**
: This is the endpoint that needs to be hit in order to get the checks for a specific account. For example, `http://sensu:8080/api/core/v2/namespaces/default`

- **API Key**
: This is the API key for the account with the check to get information about.

## Sensu / Create / Silence Entry

![Sensu - Create Silenced Entry](~@assets/img/sensu-create-silenced.png)

- **Check Name**
: This is the check to delete a silence entry from. If the API URL and API key are set in the project/framework settings prior to creating the job, there will be a list of checks that are currently in Sensu to choose from.

- **Silence Reason**
: This is the reason that the node is being silenced.

- **Expired**
- This is when the silence entry on the node will expire. The value should be entered in number of seconds. (i.e. 60 for one minute)

- **Begin**
: This is when the silenced entry begins. Can specify seconds, minutes, hours. (I.e. 2s, 3m, 4h)

- **Expire on Resolve**
: If this is checked, then if the check finished successfully then the silenced entry will be deleted.

- **API URL**
: This is the endpoint that needs to be hit in order to create a silence entry for a specific account. (For example: `http://sensu:8080/api/core/v2/namespaces/default`)

- **API Key**
: This is the API key for the account to create a silenced entry in.

## Sensu / Delete / Silence Entry

![Sensu - Delete Silenced Entry](~@assets/img/sensu-delete-silenced.png)

- **Check Name**
: This is the check to delete a silence entry from. If the API URL and API key are set in the project/framework settings prior to creating the job, there will be a list of checks that are currently in Sensu to choose from.

- **API URL**
: This is the endpoint that needs to be hit in order to silence an entry. For example, `http://sensu:8080/api/core/v2/namespaces/default`

- **API Key**
: This is the API key for the account with the silence entry to delete.

## Sensu / Event / Create

![Sensu - Create Event](~@assets/img/sensu-create-event.png)

- **Check Name**
: This is the check to set on the new event. If the API URL and API key are set in the project/framework settings prior to creating the job, there will be a list of check options that are currently in Sensu to choose from.

- **Output**
: This is the check output that to be applied to the new event.

- **State**
: This is the state of the new event that is being created. If the API URL and API key are set in the project/framework settings prior to creating the job, there will be a list of state options that are currently in Sensu to choose from.

- **Status**
: This is the status of the new event that is being created. If the API URL and API key are set in the project/framework settings prior to creating the job, there will be a list of status options that are currently in Sensu to choose from.

- **Check Handlers**
: If one of the check handlers is selected, it will apply those handlers to the new event. I.e. if  "Slack Handler" is selected, a notification will be sent to slack.

- **Check Interval**
: This is the interval period to check for new checks.

- **API URL**
: This is the endpoint that needs to be hit in order to create an event for that account. For example, `http://sensu:8080/api/core/v2/namespaces/default`

- **API Key**
: This is the API key for the account to create the event in.

## Sensu / Run ad hoc Check

![Sensu - Run ad hoc Check](~@assets/img/sensu-ad-hoc.png)

- **Check Name**
: This is the check to run. If the API URL and API key are set in the project/framework settings prior to creating the job, there will be a list of check options that are currently in Sensu to choose from.

- **Print Output**
: If this box is checked, it will only print the output of the check and not the full API call's response.

- **Wait for the event**
: If this box is checked, it will wait for the event to finish before running the check.

- **API URL**
: This is the endpoint that needs to be hit in order to run an ad hoc check for an account. For example, `http://sensu:8080/api/core/v2/namespaces/default`

- **API Key**
: This is the API key for the account with the check to run.
