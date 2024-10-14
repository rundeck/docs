## AWS Lambda Node Steps

:::enterprise
:::

AWS Lambda is a serverless, event-driven compute service that lets you run code for virtually any type of application or backend service without provisioning or managing servers.

The following Lambda plugins are available for PagerDuty Runbook Automation:

* [Execute Lambda Function (AWS / Lambda / Invoke)](#execute-lambda-function) - Executes an existing Lambda function.

### Authentication
Follow the instructions outlined in the [AWS Plugins Overview](/manual/plugins/aws-plugins-overview.md) for Runbook Automation to authenticate with AWS.

When defining the IAM Role for Runbook Automation, be sure to include the following permissions in the Policy associated with the role:

* **`lambda:InvokeFunction`**

### Execute Lambda Function

The **AWS / Lambda / Invoke** plugin invokes an _existing_ Lambda function in an AWS account in a specific region:

* **Function Name**: The name of the Lambda function to invoke.
* **Event Payload**: The JSON Event Data that is sent as input to the Lambda function. For more details on Lambda Event Data, click [here](https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-concepts.html#gettingstarted-concepts-trigger).
* **Invocation Type**: In the _Advanced_ section, this allows you to specify whether this invocation is **synchronous** or **asynchronous**. For synchronous, select **Request** and for asynchronous, select **Event**. For more details on the differences between Event and Request, click [here](https://docs.aws.amazon.com/lambda/latest/dg/API_Invoke.html).
* **Qualifier**: In the _Advanced_ section, this determines the version of the Lambda function to invoke. For more information on Lambda function versions, click [here](https://docs.aws.amazon.com/lambda/latest/dg/configuration-versions.html).
* **Client Context**: Context to provide to the Lambda handler. For more details on Lambda Context, see [here](https://docs.aws.amazon.com/lambda/latest/dg/python-context.html).
* **Region**: The AWS region where the Lambda function is located.

![Invoke Lambda](/assets/img/aws-lambda-invoke-node-step.png)<br>