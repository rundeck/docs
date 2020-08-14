# AWS SNS Plugin (Enterprise)
::: enterprise
:::

## Description

A Rundeck webhook plugin that receives events from an AWS SNS topic and runs a Rundeck job.

This plugin expects the data coming from AWS to be a JSON object. 
The http content type does not have to be `application/json` because
in some cases AWS will send json with the content type `text/plain`. As long
as the data is JSON it will be handled correctly.

## Configuration

Create a webhook in Rundeck and choose `AWS SNS Webhook Plugin` as the event plugin.

The job is the only required property.

The options, node filter, and user properties can all use data from the payload.

#### Data substitution examples

If the data is sent using an AWS SNS envelop the `Message` property will contain the SNS message  
`-myopt ${data.Message}`

If you enable raw delivery on the AWS topic subscription, the data sent
as the SNS message will be delivered without a JSON envelop.  
**NOTE: This plugin expects the event payload to be JSON**

Example raw payload
```json
{"prop1":"val1","prop2":"val2"}
```

`-myopt ${data.prop2}`

You can also get the following webhook context properties:
```code
#a uniquely generated id for the webhook event
${webhook.id}
  
#the project that owns the webhook
${webhook.project}
  
#the ip that sent the event
${webhook.sender}
  
#epoch timestamp when event was received
${webhook.timestamp}

#event type specified by AWS
${webhook['x-amz-sns-message-type']}
```

#### Raw payload

To send the raw payload to your job you can pass it like this:

```-myopt ${raw}```

### Autosubscribe

When you set up a topic subscription in AWS you must confirm the subscription
by receiving the first payload AWS sends, then using the confirmation url and token
to confirm the subscription.

You could do all of this manually by looking at the payload received from AWS
in the `rundeck.webhooks.log` and pulling out the token and putting it in the AWS console
for that subscription.

If you check the `Auto Subscribe` property this plugin will do the subscription confirmation
process for you, so that you can immediately start to receive SNS data events without having to
do the manual confirmation.