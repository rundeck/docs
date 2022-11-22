### Automated Diagnostics Examples
---

## Applications & API's

#### Introduction
A very common type of diagnostic job is to query an API as a way of measuring application or system health.  This could be a common SAAS API or might be querying the API of an internal application.  In either case, this is accomplished by using the [HTTP Request workflow step](https://resources.rundeck.com/plugins/rundeck-http-workflow-step-plugin/), which can send an http request and trigger further steps based on the response code.  Whatever data is returned by the http step can be used in later steps in a workflow through the use of [custom variables](/learning/howto/passing-variables.html).  This plugin is very customizable to accommodate whatever is needed, including various authentication methods and support for proxy settings.

#### Some common examples
* Validate health status of cloud providers’ infrastructure
![**Results of an API query using built-in job**](~@assets/img/saasapi1.png)
* Check health of each component in a custom app stack
* Query status of public-facing applications, such as your own customer interface or support site
* Confirm infrastructure health for the cloud or virtualization solution hosting your servers