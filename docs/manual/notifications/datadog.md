# Datadog Notification Plugin (Enterprise)

Enterprise customers have access to this plugin, that allows you to create an event in Datadog based on the execution status of a job. For example, you can configure it to create an event if the job failed or if the job succeeded.

## Setup 

:::tip
You will need to have both an API and APP key created in Datadog and ready to use. To create these values in Datadog, navigate to Integrations > APIs and copy and paste the API key. If it doesn't exist yet, create a Rundeck integration and create an API/APP key. 
:::

To begin, you will need to add the API and APP to the project configuration setting, go to "Project Settings" and select "Edit Configuration." Next, select "Edit Configuarion File" and add the following:

```bash
project.plugin.Notification.datadog-notification-event.api_key=value
project.plugin.Notification.datadog-notification-event.app_key=value
```


## Configuration

![Datadog Notification - Configuration](~@assets/img/notification-config.png)

- **Title**
: This is the event title. It can be anything you want it to be. By default, it includes data about the job and the execution.

- **Text**
: This is the body of the event. It can be anything you wish.

- **Aggregation Key**
: This is an arbitrary key used for aggregation. If you specify a key, all events with that key will be grouped together in the event steam. Maximum 100 characters.

- **Alert Type**
: This is the type that the event is defined as. The options are error, warning, info or success. 

- **Device Name**
: This is the device name.

- **Host**
: If you want to associate the event with a specific host, then you could specify which host here. Doesn't require a value.

- **Priority**
: This is the priority that the event is defined as. The options are normal or low.

- **Related Parent ID**
: If the event should have a parent event, this is where you can specify the parent ID by including its ID. This field is not required.

- **Source Type Name**
: This is the type of event being posted. Option examples include nagios, hudson, jenkins, my_apps, chef, puppet, git, bitbucket, etc.

- **Tags**
: This can be a list of tags that you want to be applied to the event. If you wish to specify more than one, they need to be separated by a comma.
