# Datadog Node Steps (Commercial)

## Getting Started

Follow the instructions outlined in the [**Datadog Integration Overview**](/manual/plugins/datadog-plugins-overview) to set up authentication with Datadog.


## Configuration

![Datadog - Dispatch to Nodes](/assets/img/datadog-dispatch.png)

For both of the following steps, you will need to dispatch these steps to specific nodes for execution. In order to do so, when defining the job, select the tab "Nodes." Select "Dispatch to Nodes" and select the nodes that you wish to be muted/unmuted.

## Mute Host

![Datadog - Mute Host](/assets/img/datadog-mute.png)

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