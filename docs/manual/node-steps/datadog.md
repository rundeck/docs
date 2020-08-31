# Datadog Node Steps (Enterprise)

## Getting Started

Before we begin using the DataDog plugins, we are going to add the APP and API keys. We have two different ways of doing this. We can either add it to the framework or to the specific project. 

### Adding to the Framework

In the `etc/framework.properties` file, add the following lines of code, depending on which job step plugin you are using. 

#### Mute Host
```bash
framework.plugin.WorkflowNodeStep.datadog-mute-hosts.api_key=value
framework.plugin.WorkflowNodeStep.datadog-mute-hosts.app_key=value
```

#### Unmute Host
```bash
framework.plugin.WorkflowNodeStep.datadog-unmute-hosts.api_key=value
framework.plugin.WorkflowNodeStep.datadog-unmute-hosts.app_key=value
```

### Adding to the Project Configuration

To add the API and APP to the project configuration setting, go to "Project Settings" and select "Edit Configuration." Next, select "Edit Configuarion File" and add the following:

#### Mute Host
```bash
project.plugin.WorkflowNodeStep.datadog-mute-hosts.api_key=value
project.plugin.WorkflowNodeStep.datadog-mute-hosts.app_key=value
```

#### Unmute Host
```bash
project.plugin.WorkflowNodeStep.datadog-unmute-hosts.api_key=value
project.plugin.WorkflowNodeStep.datadog-unmute-hosts.app_key=value
```

### Adding to the Project Configuration

1. In Rundeck, navigate to the Datadog project, select "project settings" and then "edit configuration."
2. In the top right, you will see an option to edit configuation 

## Configuration

![Datadog - Dispatch to Nodes](~@assets/img/datadog-dispatch.png)

For both of the following steps, you will need to dispatch these steps to specific nodes for execution. In order to do so, when defining the job, select the tab "Nodes." Select "Dispatch to Nodes" and select the nodes that you wish to be muted/unmuted.

## Mute Host

![Datadog - Mute Host](~@assets/img/datadog-mute.png)

- **Message**
: This is the message that you want to be added when the host is muting. It can be used to describe who ran it, why, etc.

- **Date End**
: When you choose to mute a host, you also have to specify how long you want it to remain muted for. For example, if you want it to be muted for one hour you would put "1h", or "5m" for 5 minutes. The possible units are h,m,s for hours, minutes and seconds.

 - **API Key**
 : This is where you can choose the key from storage that we save earlier. Just click on browse, and choose the key you want to use. So select the API key here. 
 
  - **APP Key**
  : This is where you can choose the key from storage that we save earlier. Just click on browse, and choose the key you want to use. So select the APP key here. 
  
  ## Unmute Host 
  
You do not need to specify anything here, besides a step label if you would like. You just need to make sure the job step is dispatching to the right node as mentioned above. 