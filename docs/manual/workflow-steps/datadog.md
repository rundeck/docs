# Datadog Workflow Steps

## Getting Started

:::tip
An API and APP key created in Datadog are required to configure these steps. To create these values in Datadog, navigate to Integrations > APIs and copy and paste the API key. If it doesn't exist yet, create a Rundeck integration and create an API/APP key.
:::

Before using the DataDog plugins, add the APP and API keys to Rundeck's key storage and then specifying that path in the framework.

Note: Follow these steps twice. Once for the API key and once for the APP key.

1. In the top right-hand corner of Rundeck, click on the gear icon and select "Key Storage."
2. Select "Add or Upload a Key."
3. For key type, select "Password."
4. Where it says enter text, copy and paste your API/APP key. To create these values in Datadog, navigate to Integrations > APIs and copy and paste the API key. If it doesn't exist yet, create a Rundeck integration and create an API/APP key.
5. For storage path, this can be whatever you want (REMEMBER THIS FOR LATER). E.g. keys/datadog
6. This can be whatever you want. For example, if you chose API as the name, the new path would be keys/datadog/API.
7. Now that we have created the keys, we need to specify them in the framework. Open the `etc/framework.properties` file and add the following lines:

```bash
datadog.api-key-storage-path=path..
datadog.app-key-storage-path=path..
```
Where `path` is the path created above.


## Datadog / Send Event

![Datadog - Send Event - Configuration](~@assets/img/datadog_send.png)

### Configuration

- **Title**
: This is the title of the event.

- **Text**
: This is the body of the event. This can contain any details that need to be included in the event in DataDog.

- **Aggregation Key**
: This is an arbitrary key used for aggregation. If a key is specified, all events with that key will be grouped together in the event steam. Maximum 100 characters.

- **Alert Type**
: This is the type that the event is defined as. The options are error, warning, info or success.

- **Device Name**
: This is the device name.

- **Host**
: To associate the event with a specific host include this optional value.

- **Priority**
: This is the priority that the event is defined as. The options are normal or low.

- **Related Parent ID**
: Specify the parent ID by including its ID. This field is not required.

- **Source Type Name**
: This is the type of event that is being posted. Option examples include nagios, hudson, jenkins, my_apps, chef, puppet, git, bitbucket, etc.

- **Tags**
: A list of tags that you want to be applied to the event. To specify more than one separate each by a comma.
