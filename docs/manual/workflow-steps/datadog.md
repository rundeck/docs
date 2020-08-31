# Datadog Workflow Steps

## Getting Started

Before we begin using the DataDog plugins, we are going to add the APP and API keys. We have two different ways of doing this. We can either add it to the framework or to the specific project. 

### Send Event

#### Adding to the Framework

In the `etc/framework.properties` file, add the following lines of code, depending on which you are using. 


```bash
framework.plugin.WorkflowStep.datadog-send-event.api_key=value
framework.plugin.WorkflowStep.datadog-send-event.app_key=value
```

#### Adding to the Project Configuration

To add the API and APP to the project configuration setting, go to "Project Settings" and select "Edit Configuration." Next, select "Edit Configuarion File" and add the following:

```bash
project.plugin.WorkflowNodeStep.datadog-send-event.api_key=value
project.plugin.WorkflowNodeStep.datadog-send-event.app_key=value
```

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