# URL Transformer Node Source

:::enterprise
:::

The URL Transformer Node Source performs a GET request on the configured URL endpoint
and retrieves the response as a JSON payload. The payload is then transformed into
Rundeck Nodes.

### Features
* Ability to specify authentication credentials to the endpoint.
* Ability to specify custom headers on the request to the endpoint.
* Ability to transform the JSON payload returned by the endpoint with a JQ expression.
* Ability to add supplemental tags to all the nodes returned by the endpoint.

### Requirements
* The configured endpoint must return a JSON payload.

## Configuring

1. Specify the Runner that will be used to execute this plugin.
1. Specify the **URL** endpoint to hit.
1. (Optional) **Authorization Header** If your endpoint requires authentication, either manually type in the value
or select a Key Storage path that will be used for the `Authorization` header.
`Note: If your token needs a 'Bearer' prefix, you must add it manually.`
1. (Optional) **Supplemental Headers** If your URL requires custom headers, add them here.
`Note: If you manually add a 'Content-Type' header it will be overridden by the plugin because the plugin
requires an 'application/json' response.`
1. (Optional) **JQ Transform** If your JSON payload needs to be transformed, add a JQ expression here.
The transformed JSON should conform to the [JSON](/manual/document-format-reference/resource-json-v10.html) Rundeck nodes format.
If you don't supply a JQ expression, the plugin will assume the JSON payload retrieved from the URL conforms to the proper format.
1. (Optional) **Supplemental Tags** If you want to add tags to all the nodes returned by the endpoint, add them here as a comma separated list.
