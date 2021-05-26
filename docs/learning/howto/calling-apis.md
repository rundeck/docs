# Calling APIs from Rundeck

Modern applications use the [HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP) protocol to communicate with each other and send or obtain information from any web service using [HTTP methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods) like GET, POST, or PUT. For example, to obtain a valid user ID from a web service to use it later in another process/application.

To make those HTTP calls we can use an [inline-script](https://docs.rundeck.com/docs/manual/node-steps/builtin.html#script-step)] with a [cURL](https://curl.se/) command inside, curl is used in scripts or commands to transfer data and it’s available for any operating system. But this implies maintaining a lot of code inside a Rundeck workflow.

Rundeck’s Job Steps offer a more user-friendly way to make these calls. For HTTP calls, use the [HTTP Workflow Step Plugin](https://resources.rundeck.com/plugins/rundeck-http-workflow-step-plugin/) in Rundeck. This plugin will send HTTP calls to any web service or HTTP endpoint. The returned data can then be used in subsequent steps. (Check out our [Passing Variables](/learning/howto/passing-variables.md) guide).

If you are using our Enterprise version the plugin is already bundled with your installation. Skip straight to the exercises.

## Community Version Prerequisite

The HTTP Workflows Step plugin isn’t bundled with the Rundeck Community version (is out-of-the-box with [Rundeck Enterprise](https://www.rundeck.com/enterprise)), these steps show you
how to install it.

1. Go to the **System Menu** (Gear Icon in upper right) **> Plugins > Upload Plugin**.
1. Copy the plugin file location from the repository _(Latest link as of last update is below)_
    ```
    https://github.com/rundeck-plugins/http-step/releases/download/1.0.12/http-step-1.0.12.jar
    ```
    ![Upload Plugin](@assets/img/upload-plugin.png)
1. Paste it on the **Plugin URL** textbox, and click on the **Install** button.
    ![Plugin Installed!](@assets/img/plugin-installed.png)

> An alternative method to install the plugin is to download the .jar file directly from the [repository](https://github.com/rundeck-plugins/http-step/releases/download/1.0.12/http-step-1.0.12.jar) and put it on the `libext` directory (at ``/var/lib/rundeck/libext` on RPM / DEB based installations or ``$RDECK_BASE/libext` directory on WAR based installations). Just copy the the .jar to the folder, no restart is needed.

## Exercise
::: warning
For this exercise we will use the site [httpbin.org](http://httpbin.org/) test website, [httpbin.org](http://httpbin.org/) is a simple HTTP request and response service written in python by Ken Reitz. This is not a site owned or run by PagerDuty.  **Note: Don't send any sensitive data.** This site is simply used as a test.  If you would like to run your own their site has more information about using their [Docker Images](https://github.com/postmanlabs/httpbin#httpbin1-http-request--response-service).
:::

:::: tabs
1. Go to the jobs page.
1. Click on the **Create a new job** button.
1. On the **Details** tab, give your job a name.
1. On the **Workflow** tab click on the **Add a step** button.
1. Choose the step named **HTTP Request Node Step** from the **Workflow steps** tab (Do not use the Node Steps one for this exercise).
    ![HTTP Request Workflow Step](@assets/img/http-req-wf-step.png)
1. Put `https://httpbin.org/anything` URL into “Remote URL”.
1. Select **POST** in the **HTTP Method** list. Other methods available are: `GET`, `PUT`, `PATCH`, `DELETE`, `HEAD`, `OPTIONS`.
1. Put `{"MyHeader":"test"}` in the **headers** section (headers must be defined as JSON or YAML format). _Don't send any potentially sensitive data._
1. In the **Body** section put `{"myBodyValues":[{"body1":"value1"},{"body2":"value2"}]}`.  _Don't send any potentially sensitive data._
1. Enable the **Print Response?** checkbox, to see the web service / endpoint response on the job output.
1. Leave all the other settings as the defaults.
1. Click **Save** on the HTTP Request Job Step.
    ![HTTP Request Saved](@assets/img/howto-http-request-step.png)
1. Scroll down and click on the **Create** button.
1. Then click on the **Run Job Now** button.
::: tab Enterprise Exercise

:::
::: tab Community Exercise

:::
::::

## Other Parameters
Other parameters available:

- Request Timeout (How long to wait for a request to complete before failing).
- Validate [SSL Certificates](https://en.wikipedia.org/wiki/Transport_Layer_Security#Digital_certificates) (true or false, validate that SSL certificates are trusted, match the hostname, etc.)
- Authentication section. If the HTTP service uses Basic / [OAuth2](https://en.wikipedia.org/wiki/OAuth#OAuth_2.0_2) authentication. On Basic Auth it’s possible to define the user and password from the Rundeck Key Storage. On OAuth 2.0 add the OAuth Token URL and OAuth Validate URL.
- Validate Response can check the [HTTP response code](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) that is returned and fail the step if it is not the expected value. (typically looking for 200)
- Proxy Settings section, if the HTTP service is behind a proxy server, you can define the Proxy IP address and port.

## Additional Information

- If you need to use variables in the *HTTP Request Steps* Headers or Body sections use the format `${data.variable-name}`.  For more information about using variables check out [Passing Data Between Steps](passing-variables.md)
- Link to [Example Job](https://github.com/rundeck/welcome-project-community/blob/main/runbooks/yaml/HowTos/Calling_APIs_from_Rundeck.yaml) built using the steps above. Download the YAML and use it in your Rundeck.
- Official plugin description from [the plugin's GitHub repository](https://github.com/rundeck-plugins/http-step).
- [Documentation on different HTTP methods](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods).
