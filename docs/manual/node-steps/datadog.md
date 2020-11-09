# Datadog Node Steps (Enterprise)

## Getting Started

:::tip
You will need to have both an API and APP key created in Datadog and ready to use. To create these values in Datadog, navigate to Integrations > APIs and copy and paste the API key. If it doesn't exist yet, create a Rundeck integration and create an API/APP key.
:::

Before we begin using the DataDog plugins, we are going to add the APP and API keys. We can do this by adding them to Rundeck's key storage and then specifying that path in the framework.

Note: You will need to follow these steps twice. Once for the API key and once for the APP key.

1. In the top right-hand corner of Rundeck, click on the gear icon and select "Key Storage."
2. Select "Add or Upload a Key."
3. For key type, select "Password."
4. Where it says enter text, copy and paste your API/APP key.  To create these values in Datadog, navigate to Integrations > APIs and copy and paste the API key. If it doesn't exist yet, create a Rundeck integration and create an API/APP key.
5. For storage path, this can be whatever you want (REMEMBER THIS FOR LATER). E.g. keys/datadog
6. This can be whatever you want. For example, if you chose API as the name, the new path would be keys/datadog/API.
7. Now that we have created the keys, we need to specify them in the framework. Open the `etc/framework.properties` file and add the following lines:
```bash
datadog.api-key-storage-path=path..
datadog.app-key-storage-path=path..
```
Where `path` is the path you created above.

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