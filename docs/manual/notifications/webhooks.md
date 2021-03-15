# Webhooks

The Webhooks notification plugin is a builtin plugin that sends POST data to a URL when a job succeeds or fails.

- For more info about configuring jobs to use webhook notifications, see the chapter [Job Notifications](#job-notifications).
- For more info about webhooks in general see: <https://webhooks.pbworks.com/w/page/13385124/FrontPage>

When a Rundeck Job webhook notification is triggered, the server will send a POST request to one or more configured URLs. The request will contain JSON or XML content containing information about the Execution that has finished. The request will also contain special HTTP Headers to include some information about the notification and the Execution. You can also configure your URLs to have property tokens that will be replaced with specific details about the Job, Execution or Notification prior to the webhook request being submitted.

#### Execution Notification Content

The default content of the POST request will be XML, with a single `<notification>` root element. This element will contain `<executions..><execution>...</execution></executions>` content. This inner content is of the same format as the XML returned from the Web API for Execution information. See the chapter [API - Listing Running Executions](/api/rundeck-api.md#listing-running-executions) for more information.

Attributes of the `notification` element will include:

`trigger`

: The type of notification trigger. Either "success" or "failure".

`executionId`

: The ID of the Execution

`status`

: The result status of the Execution. Either "succeeded", "failed" or "aborted".

_Example_

```xml
<notification trigger="success" executionId="[ID]" status="[STATUS]">
    <executions count="1">
        <execution ...>
            ...
        </execution>
    </executions>
</notification>
```

If you have chosen JSON as the payload type the same information described previously will be sent in JSON format.

```json
{
    "trigger":"success",
    "status":"succeeded",
    "executionId":24873,
    "execution":{...}
}
```

#### Execution Notification Headers

The POST request will also contain several custom HTTP headers, providing another way to receive some of the webhook information:

`X-Rundeck-Notification-Trigger`

: The notification trigger type, either "success" or "failure".

`X-Rundeck-Notification-Execution-ID`

: The Execution ID

`X-Rundeck-Notification-Execution-Status`

: The status of the execution, either "succeeded", "failed", or "aborted".

(Optional)

`X-RunDeck-Notification-SHA256-Digest`

: A SHA-256 Digest of a combination of the webhook url, the trigger, and the execution id along with a server secret.
This digest allows a receiver to verify that the webhook was sent from Rundeck rather than an unauthorized sender.  
To create a digest on the receiver create a SHA-256 digest of the webhook url, the notification trigger type, the execution type and a secret key you wish to use,
then convert the digest into a string hex representation of the value.

The following java algorithm shows a method for generating the digest.
```java
MessageDigest digest = DigestUtils.getSha256Digest();
digest.update(postUrl.bytes)
digest.update(trigger.bytes)
digest.update(id.bytes)
new String(Hex.encodeHex(digest.digest(secretKey.bytes)))
```

The server secret is set using the rundeck property: `rundeck.notification.webhookSecurityKey`
Once this property is set the `X-RunDeck-Notification-SHA256-Digest` header will be sent along with all webhook notifications.

#### Execution Notification URL Token Expansion

As well, the URLs configured for the webhook notification may contain tokens that will be expanded with values taken from the associated job and execution, such as `${job.name}`.

Available tokens for expansion are:

`job.PROPERTY`

: Properties about the Job, including:

    `name`

     :    the Job name

    `group`

    :    The Job group, or a blank string

    `id`

    :    the Job Id

    `project`

    :    the Project name

`execution.PROPERTY`

: Properties about the Execution, including:

    `id`

    :    The Execution ID

    `user`

    :    The user who executed the job

    `status`

    :    The execution status, one of "succeeded","failed",or "aborted"

`notification.trigger`

: The trigger associated with the notification, one of "success" or "failure".

So for example, this URL:

    http://server/callback?id=${execution.id}&status=${execution.status}&trigger=${notification.trigger}

Will have the tokens replaced with the appropriate values prior to making the webhook request.
