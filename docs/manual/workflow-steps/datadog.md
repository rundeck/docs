# Datadog Workflow Steps

## Getting Started

Before we begin using the DataDog plugins, we are going to add the APP and API keys. We have two different ways of doing this. We can either add it to the framework or to the specific project. 

### Adding to the Framwork

1. In Rundeck, click on the gear icon in the top right and select "Key Storage."
2. Click "Add or Upload a Key"
3. Choose "Password" as the key type and name it what you would like (API or APP, you will need one for both)
4. Where it says "Enter text," copy and paste the APP/API key from DataDog. You can find it in account settings in DataDog under API.
5. Choose a path for the key to be stored. For example, "keys/datadog" will create a new folder datadog to hold the two keys.
6. Open the framework.properties file and add the path to the keys:

```bash
datadog.api-key-storage-path=keys/datadog/api_key
datadog.app-key-storage-path=keys/datadog/app_key
```

Note:  The user must have proper permissions to create and access keys or these steps will not work.

## DataDog / Send Event

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
: This is the type of event being posted. Option examples include nagios, hudson, jenkins, my_apps, chef, puppet, git, bitbucket, etc.

- **Tags**
: This can be a list of tags that you want to be applied to the event. If you wish to specify more than one, they need to be separated by a comma.