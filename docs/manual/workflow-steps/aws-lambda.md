# AWS Lambda Workflow Steps

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

## Execute Lambda Function

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
The following IAM Policies are required to use this plugin:
* **`lambda:InvokeFunction`**

## Lambda Custom Code Execution

The **AWS / Lambda / Custom Code Execution** plugin creates, executes, and optionally deletes a new Lambda function with the custom-code provided in the Job step as its input:

![Lambda Custom Code](@assets/img/aws-custom-lambda-code.png)<br>

In the example above, a new Lambda is created and is executed as a Python-3.9 script.  Any content defined in the **`return`** statement will be displayed in the log-output:

![Lambda Custom Output](@assets/img/aws-custom-lambda-output.png)<br>

:::tip Note
Content within **`print`** statements will **not** be displayed in the log-output of the plugin. Any content you wish to see in Runbook Automation should be in the **`return`** statement. 
:::

#### Plugin Field Descriptions

* **Execution Role ARN**: This is the Lambda function's IAM role that grants the function permission to access AWS services and resources. More details on this can be found [here](https://docs.aws.amazon.com/lambda/latest/dg/lambda-intro-execution-role.html).
* **Lambda Runtime**: The runtime to use for the Lambda function. Only _interpreted_ languages are included here - not compiled languages.
* **Function Code**: This is the code to be executed by the Lambda function.  This must include a _handler_ which is identified in the `Name of Main Function` field.  More details on the handler can be found [here](https://docs.aws.amazon.com/lambda/latest/dg/python-handler.html).
  ::: tip Supported Languages
    All _interpreted_ languages supported by AWS Lambda (Python, Ruby, Node.js) are usable within the plugin. Because the Lambda function is generated programmatically, _compiled_ languages such as Java and Go are not available within the plugin.
    :::
* **Name of Main Function**: The name of your _handler_ function.  In the example above, **`lambda_handler`** is the name of the main function.
* **Delete Function After Execution**: Select whether the Lambda that is created by this Job step should be automatically deleted after execution. The function will be deleted regardless of whether the execution of the Lambda code is successful. This is to avoid "orphaned" functions in your AWS environment. 
* **Function AWS Description (Optional)**: Provide a description for the Lambda function. Because the plugin auto-generates the function's _Name_, this can be useful when you do _not_ auto-delete the function.
* **Event Payload (Optional)**: This is the event payload that you may pass to the function. It is optional, because you can use **Data Variables** to pass variables from other Job steps or Job Options into the script. For more detail on Data Variables, see [here](/learning/howto/passing-variables.html).
* **AWS Tags (Optional)**: Add tags to the Lambda that is created. This is useful when searching for Lambda Functions generated by Runbook Automation.

#### Permissions
The following IAM Policies are required to use this plugin:
* **`lambda:CreateFunction`**
* **`lambda:InvokeFunction`**
* **`lambda:DeleteFunction`** - Only if **`Delete Function After Execution`** is selected.

