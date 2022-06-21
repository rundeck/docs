## AWS Lambda Workflow Steps

:::enterprise
:::

AWS Lambda is a serverless, event-driven compute service that lets you run code for virtually any type of application or backend service without provisioning or managing servers.

The following Lambda plugins are available for PagerDuty Runbook Automation and Process Automation (formerly Rundeck Enterprise):

* [Execute Lambda Function](#execute-lambda-function) - Executes an existing Lambda function.
* [Lambda Custom Code Execution](#lambda-custom-code-execution) - Creates and executes a new Lambda function with the custom-code provided in the Job step.

These plugins utilize the following properties:

**Access Key ID**
: Specify your AWS Access key.

- **Project setting**: project.aws.access_key
- **Configuration Management**/**Framework Setting**: aws.access_key

**Secret Key**
: Specify the path to your AWS Secret Key in the Rundeck Key Storage

- **Project setting**: project.aws.secret_key_path
- **Configuration Management**/**Framework Setting**: aws.secret_key_path

**Region**
: Specify the region for the node.

- **Project setting**: project.aws.region
- **Configuration Management**/**Framework Setting**: aws.region

### Execute Lambda Function

The **AWS / Lambda / Invoke** plugin invokes an _existing_ Lambda function in an AWS account in a specific region:

![Invoke Lambda](@assets/img/aws-invoke-lambda-workflow-step.png)<br>

#### Plugin Field Descriptions

* **Event Payload**: the JSON Event Data that is sent as input to the Lambda function. For more details on Lambda Event Data, click [**here**](https://docs.aws.amazon.com/lambda/latest/dg/gettingstarted-concepts.html#gettingstarted-concepts-trigger).

* **Invocation Type**: In the _Advanced_ section, this allows you to specify whether this invocation is **synchronous** or **asynchronous**. For synchronous, select **Request** and for asynchronous, select **Event**.
For more details on the differences between Event and Request, click [here](https://docs.aws.amazon.com/lambda/latest/dg/API_Invoke.html).

* **Qualifier**: In the _Advanced_ section, this determines the version of the Lambda function to invoke. For more information on Lambda function versions, click [here](https://docs.aws.amazon.com/lambda/latest/dg/configuration-versions.html).

* **Client Context**: Context to provide to the Lambda handler. For more details on Lambda Context, see [here](https://docs.aws.amazon.com/lambda/latest/dg/python-context.html).
<br>

#### Permissions
The IAM Policies required to use this plugin are:
* **`lambda:InvokeFunction`**

### Lambda Custom Code Execution

The **AWS / Lambda / Custom Code Execution** plugin creates and executes a new Lambda function with the custom-code provided in the Job step as its input:

![Lambda Custom Code](@assets/img/aws-custom-lambda-code.png)<br>

In the example above, a new Lambda is created and is executed as a Python-3.9 script.  Any content defined in the **`return`** statement will be displayed in the log-output:

![Lambda Custom Output](@assets/img/aws-custom-lambda-output.png)<br>

#### Supported Languages
All _interpreted_ languages supported by AWS Lambda (Python, Ruby, Node.js) are usable within the plugin. Because the Lambda function is generated programmatically, _compiled_ languages such as Java and Go are not available within the plugin.

