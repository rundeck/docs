# Webhook Run Job Plugin
:::danger
Webhooks and the Run Job Plugin are currently in beta.
There may be breaking API changes between releases!
:::

The webhook run job plugin receives a webhook event and executes the configured job.
You can pass the payload of the webhook to the job or use the event payload information
to supply options, node filter, and `Run As` user to the job.

This plugin only handles JSON payloads.

## Usage

Add a new webhook in the UI, then pick the `Webhook Run Job` webhook event plugin.  
You will see the following configuration options in the `Plugin Configuration` section.

![Run Job Config](~@assets/img/webhook-run-job-plugin.png)

Once you have saved the webhook, you will see a `Post Url`. You can post a test message to
that Url using curl or httpie to ensure that it runs the job as expected.

## Configuration

The JSON that is received by the plugin can be used to supply options, node filter, and the `Run As` user.

#### Using parsed data

If the plugin received the following JSON
```json
{"field1":"value1","sub1":{"subfield": "subval"}}
```

You could use that data by specifying:

```${data.field1}```

or

```${data.sub1.subfield}```

#### Using the raw payload

If you had a job that had an option named `whkpayload` you could send the entire JSON
payload to that option like this:
```-whkpayload ${raw}``` 

#### Webhook context variables

The following context variables can be used:

```properties
id:unique event id
project:the project that owns the webhook
sender:the ip address of the sending system
timestamp:the epoch milliseconds when the event was received
```

These variables can be used by specifying:

```${webhook.id}```  
```${webhook.project}```  
```${webhook.sender}```  
```${webhook.timestamp}```    

