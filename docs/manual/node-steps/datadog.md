# Datadog Node Steps (Enterprise)

## Getting Started

Before we begin using the DataDog plugins, we are going to add the APP and API keys to our storage to make the process even simpler. To do so, follow these steps: 

1. Click on the gear in the top right corner of Rundeck and select "key storage" from the drop down. 
2. Click "Add or Upload a Key"
3. Choose "Password" as the key type and name it what you would like (API or APP, you will need one for both)
4. Where it says "Enter text," copy and paste the APP/API key from DataDog. You can find it in account settings in DataDog under API.
5. Choose a path for the key to be stored. For example, "keys/datadog" will create a new folder datadog to hold the two keys.

For the rest of the instruction, you can now use the storage to locate the keys instead of typing them in everytime you create a new datadog job.

Note:  The user must have proper permissions to create and access keys or these steps will not work.

## Configuration

![Datadog - Dispatch to Nodes](~@assets/img/datadog-dispatch.png)

For both of the following steps, you will need to dispatch these steps to specific nodes for execution. In order to do so, when defining the job, select the tab "Nodes." Select "Dispatch to Nodes" and select the nodes that you wish to be muted/unmuted.

## Mute Host

![Datadog - Mute Host](~@assets/img/datadog_mute.png)

- **Message**
: This is the message that you want to be added when the host is muting. It can be used to describe who ran it, why, etc.

- **Date End**
: When you choose to mute a host, you also have to specify how long you want it to remain muted for. For example, if you want it to be muted for one hour you would put "1h", or "5m" for 5 minutes. The possible units are h,m,s for hours, minutes and seconds.

 - **API Key**
 : This is where you can choose the key from storage that we save earlier. Just click on browse, and choose the key you want to use. So select the API key here. 
 
  - **APP Key**
  : This is where you can choose the key from storage that we save earlier. Just click on browse, and choose the key you want to use. So select the APP key here. 
  
  ## Unmute Host 
  
  ![Datadog - Unmute Host](~@assets/img/datadog_unmute.png)
  
  The only thing you need to specify here are the API and APP key.
  
  - **API Key**
  : This is where you can choose the key from storage that we save earlier. Just click on browse, and choose the key you want to use. So select the API key here. 
   
  - **APP Key**
  : This is where you can choose the key from storage that we save earlier. Just click on browse, and choose the key you want to use. So select the APP key here. 
    