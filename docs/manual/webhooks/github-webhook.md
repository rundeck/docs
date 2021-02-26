# GitHub Webhook Plugin (Enterprise)
::: enterprise
:::

This plugin provides simplified integration with Github Webhooks and includes support for the confirmation ping event.  When a new webhook is setup in GitHub a ping event is sent to confirm the webhook.  The Rundeck Github Webhook will receive the ping event and return a success response, but will not run the related jobs.  The jobs will only run for valid events configured on the webhook.

**This plugin expects the payload from GitHub to be JSON**

## Configuration

Create a webhook in Rundeck and choose `GitHub Webhook` as the event plugin.

The job property is the only required property.

All other properties may be supplied with data substitutions. See the following examples for details.

#### Data substitution examples

Example raw payload
```json
{
  "action": "created",
  "issue": {
    "url": "https://api.github.com/repos/youraccount/YourProject/issues/1",
    "repository_url": "https://api.github.com/repos/youraccount/YourProject",
    "labels_url": "https://api.github.com/repos/youraccount/YourProject/issues/1/labels{/name}",
    "comments_url": "https://api.github.com/repos/youraccount/YourProject/issues/1/comments",
    "events_url": "https://api.github.com/repos/youraccount/YourProject/issues/1/events",
    "html_url": "https://github.com/youraccount/YourProject/issues/1",
    "id": 486590337,
    "node_id": "MDU6SXNzdWU0ODY1OTAzMzc=",
    "number": 1,
    "title": "Webhook test",
    "user": {
      "login": "youraccount",
      ...
    }
  },
  "repository": {
    "name": "YourProject",
    ...
  }   
}
```

`-repo ${data.repository.name} -action ${data.action} -issue_title ${data.issue.title}`

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

#GitHub payload signature
${webhook['X-Hub-Signature']}

#GitHub event type
${webhook['X-GitHub-Event']}

#GitHub delivery
${webhook['X-GitHub-Delivery']}
```

#### Raw payload

To send the raw payload to your job you can pass it like this:

```-githubraw ${raw}```

### GitHub Secret

If you want to validate the payloads that GitHub is sending, you can configure the GitHub
secret in your webhook configuration. If you add the secret, every payload received by the
webhook will validate the payload using the secret.
