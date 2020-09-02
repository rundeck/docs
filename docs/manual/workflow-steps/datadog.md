# Datadog Workflow Steps

## Getting Started

Before we begin using the DataDog plugins, we are going to add the APP and API keys. We can do this by adding them to Rundeck's key storage and then specifying that path in the framework. 

Note: You will need to follow these steps twice. Once for the API key and once for the APP key. 

1. In the top right-hand corner of Rundeck, click on the gear icon and select "Key Storage."
2. Select "Add or Upload a Key."
3. For key type, select "Password."
4. Where it says enter text, copy and paste your API/APP key.
5. For storage path, this can be whatever you want (REMEMBER THIS FOR LATER). E.g. keys/datadog
6. This can be whatever you want. For example, if you chose API as the name, the new path would be keys/datadog/API.
7. Now that we have created the keys, we need to specify them in the framework. Open the `etc/framework.properties` file and add the following lines:
```bash
datadog.api-key-storage-path=path..
datadog.app-key-storage-path=path..
```
Where `path` is the path you created above. 


## Datadog / Send Event

![Datadog - Send Event - Configuration](~@assets/img/datadog_send.png)

### Configuration

- **Title**
: This is the title of the event that you are sending. It can be anything you want it to be. 

- **Text**
: This is the body of the event. This can contain any details that you want to be included in the event in DataDog.

- **Aggregation Key**
: This is an arbitrary key used for aggregation. If you specify a key, all events with that key will be grouped together in the event steam. Maximum 100 characters.

- **Alert Type**
: This is the type that the event is defined as. The options are error, warning, info or success. 

- **Device Name**
: This is the device name.

- **Host**
: If you want to associate the event with a specific host, then you could specify which host here. Doesn't require a value.

- *Priority**
: This is the priority that the event is defined as. The options are normal or low.

- **Related Parent ID**
: If the event should have a parent event, this is where you can specify the parent ID by including its ID. This field is not required.

- **Source Type Name**
: This is the type of event that is being posted. Option examples include nagios, hudson, jenkins, my_apps, chef, puppet, git, bitbucket, etc.

- **Tags**
: This can be a list of tags that you want to be applied to the event. If you wish to specify more than one, they need to be separated by a comma.