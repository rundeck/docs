# Sensu Node Steps (Enterprise)

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

## Configuration

![Sensu - Dispatch to Nodes](~@assets/img/datadog-dispatch.png)

## Sensu / Get Check Info

![Sensu - Get Check](~@assets/img/sensu-get-check.png)

- **Check Name**
: This is the check that you want to get information about. If you set your API URL and API key in the project/framework settings prior to creating the job, there will be a list of checks that you currently have in Sensu for you to choose from.

- **API URL**
: This is the endpoint that needs to be hit in order to get the checks for a specific account. For example, `http://sensu:8080/api/core/v2/namespaces/default`

- **API Key**
: This is the API key for the account with the check that you would like to get information about.

## Sensu / Delete / Silence Entry

![Sensu - Delete Silenced Entry](~@assets/img/sensu-delete-silenced.png)

- **Check Name**
: This is the check you want to delete a silence entry from. If you set your API URL and API key in the project/framework settings prior to creating the job, there will be a list of checks that you currently have in Sensu for you to choose from.

- **API URL**
: This is the endpoint that needs to be hit in order to get the checks for a specific account. For example, `http://sensu:8080/api/core/v2/namespaces/default`

- **API Key**
: This is the API key for the account with the check that you would like to get information about.

## Sensu / Event / Create

![Sensu - Delete Silenced Entry](~@assets/img/sensu-create-event.png)

- **Check Name**
: This is the check that you want to set on the new event. If you set your API URL and API key in the project/framework settings prior to creating the job, there will be a list of check options that you currently have in Sensu for you to choose from.

- **Output**
: This is the check output that you would like to be applied to the new event.

- **State**
: This is the state of the new event that you are creating. If you set your API URL and API key in the project/framework settings prior to creating the job, there will be a list of state options that you currently have in Sensu for you to choose from.

- **Status**
: This is the status of the new event that you are creating. If you set your API URL and API key in the project/framework settings prior to creating the job, there will be a list of status options that you currently have in Sensu for you to choose from.

- **Check Handlers**
: If you check one of the check handlers, it will apply those handlers to the new event. I.e. if you select the "Slack Handler," a notification will be sent to slack.

- **Check Interval**
: This is the interval that you want to check for new checks. 

- **API URL**
: This is the endpoint that needs to be hit in order to get the checks for a specific account. For example, `http://sensu:8080/api/core/v2/namespaces/default`

- **API Key**
: This is the API key for the account with the check that you would like to get information about.

## Sensu / Run ad hoc Check

![Sensu - Run ad hoc Check](~@assets/img/sensu-ad-hoc.png)

- **Check Name**
: This is the check that you want to run. If you set your API URL and API key in the project/framework settings prior to creating the job, there will be a list of check options that you currently have in Sensu for you to choose from.

- **Print Output**
: If you check this box, it will only print the output of the check and not the full API call's response.

- **Wait for the event**
: If you check this box, it will wait for the event to finish before running the check. 

- **API URL**
: This is the endpoint that needs to be hit in order to get the checks for a specific account. For example, `http://sensu:8080/api/core/v2/namespaces/default`

- **API Key**
: This is the API key for the account with the check that you would like to get information about.

## Sensu / Create / Silence Entry

![Sensu - Create Silenced Entry](~@assets/img/sensu-create-silenced.png)

- **Check Name**
: This is the check you want to delete a silence entry from. If you set your API URL and API key in the project/framework settings prior to creating the job, there will be a list of checks that you currently have in Sensu for you to choose from.

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