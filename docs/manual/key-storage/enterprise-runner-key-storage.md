# Key Storage through Enterprise Runner
The [Enterprise Runner](/administration/runner/runner-intro) can be used to retrieve keys from secrets providers that are _not_ directly accessible from the Process Automation cluster or
from Runbook Automation due to network/security boundaries.
For example, if Runbook Automation does not have a direct network path to a self-hosted Hashicorp Vault instance, then a Runner can be placed in the same
network as Vault and retrieve secrets from Vault to be used by operations on the Runner.

![Key Storage Through Runner](@assets/img/key-storage-runner-browse.png)<br>

## Use Cases
1. **Remote Node Commands & Scrips** (Node Executors & File Copiers): When SSH or WinRM credentials are stored in a secrets provider, then the Runner can retrieve keys from the provider to authenticate with remote nodes in order to execute commands or scripts.<br><br>
2. **Internal Tools & Infrastructure** (Job step plugins): When executing Jobs that include steps that integrate with internal tools APIs - such as Jira, Jenkins, homegrown tooling, etc. - or infrastructure such as databases, then the Runner can use secrets to authenticate with these endpoints using best-practice security standards.<br><br>
3. **Inventory Discovery** (Node Sources): The Runner can be used to discover inventory in secure or remote environments. By retrieving keys from a secrets-provider, the Runner can authenticate with an API endpoint, such as the VMware vSphere API, in order to retrieve the inventory.

:::warning Current Limitations
* As of version **`4.16.0`**, secrets from the Runner can only be used for Job step plugins - such as HTTP, SQL, Kubernetes, and so on.<br>
The **Remote Node Commands** and the **Inventory Discovery** use-cases listed above are _not_ yet supported in **`4.16.0`**. 

* As of version **`4.16.0`**, integration with Hashicorp Vault is supported on the Runner.  Integration with **CyberArk** and **Thycotic** through the Runner will also be supported in future releases.

* As of version **`4.16.0`**, if a Runner is directly integrated with a secrets-management provider, then secrets from the native Key Storage facility can not be used by that Runner.
:::

## Handling Secrets
Given the sensitivity of secrets retrieved by the Runner, the following guardrails have been put in place:

1. Secrets retrieved by a Runner can only be used for operations executed on that Runner.  These secrets are not sent back to the Process Automation cluster or Runbook Automation instance.  Therefore, these secrets can not be used for plugins that do not reside on the Runner.<br><br>
2. Secrets are masked in logs, including Job execution logs.  Any secrets retrieved by the Runner and printed to the Job log output will appear as `[SECURE]` in the logs.<br><br>
3. Sensitive environment variables set on the Runner are masked in logs, including Job execution logs.  Any environment variables ending with `TOKEN` or `KEY` or `PASSWORD` will be printed as `[SECURE]` in the logs.

## Configuration
To configure a Key Storage integration on the Runner, **configuration properties are set on the Runner**. These properties can be set through the following methods:

**Note:** These examples do not include the full list of configuration properties to configure an integration with Vault.  The full list of
configuration properties can be found [here](/manual/key-storage/storage-plugins/vault.html#configuration).

### Example: YAML Configuration File
```
runner:
  rundeck:
      storage:
        vault:
          type: "vault-storage"
          configuration:
            address: "http://localhost:8200"
            authBackend: "token"
            token: "sometoken"
            storageBehaviour: "vault"
            engineVersion: "2"
            secretBackend: "secret"
            prefix: "app"
            maxRetries: "5"
            ...
```
Save this as **`runner-props.yaml`** and then start the Runner with:
```
java -Dmicronaut.config.files=runner-props.yaml -jar pd-runner.jar
```

### Example: Environment Variables
```
export RUNNER_RUNDECK_STORAGE_VAULT_TYPE="vault-storage"
export RUNNER_RUNDECK_STORAGE_VAULT_PATH="keys"
export RUNNER_RUNDECK_STORAGE_VAULT_CONFIGURATION_ADDRESS="http://vault:8200"
export RUNNER_RUNDECK_STORAGE_VAULT_CONFIGURATION_TOKEN="token"
export RUNNER_RUNDECK_STORAGE_VAULT_CONFIGURATION_STORAGEBEHAVIOUR="vault"
export RUNNER_RUNDECK_STORAGE_VAULT_CONFIGURATION_ENGINEVERSION="2"
export RUNNER_RUNDECK_STORAGE_VAULT_CONFIGURATION_SECRETBACKEND="secret"
export RUNNER_RUNDECK_STORAGE_VAULT_CONFIGURATION_PREFIX="app"
export RUNNER_LOG_OUTPUT="console"
...
```
With these environment variables set, start the Runner with the command:
```
java -jar pd-runner.jar
```

### Example: docker-compose
```
version: '3'
services:
    runner:
      image: rundeckpro/runner:latest
      environment:
        RUNNER_RUNDECK_SERVER_TOKEN: ${RUNNER_RUNDECK_SERVER_TOKEN}
        RUNNER_RUNDECK_SERVER_URL: ${RUNNER_RUNDECK_SERVER_URL}
        RUNNER_RUNDECK_CLIENT_ID: ${RUNNER_RUNDECK_CLIENT_ID}
        RUNNER_LOG_OUTPUT: "console"
        RUNNER_RUNDECK_STORAGE_VAULT_TYPE: "vault-storage"
        RUNNER_RUNDECK_STORAGE_VAULT_CONFIGURATION_ADDRESS: "http://vault:8200"
        RUNNER_RUNDECK_STORAGE_VAULT_CONFIGURATION_TOKEN: "token"
        RUNNER_RUNDECK_STORAGE_VAULT_CONFIGURATION_STORAGEBEHAVIOUR: "vault"
        RUNNER_RUNDECK_STORAGE_VAULT_CONFIGURATION_ENGINEVERSION: "2"
        RUNNER_RUNDECK_STORAGE_VAULT_CONFIGURATION_SECRETBACKEND: "secret"
        RUNNER_RUNDECK_STORAGE_VAULT_CONFIGURATION_PREFIX: "app"
        ...
```
With this saved as **`compose.yaml`**, then start the Runner with the standard **`docker-compose up`** command.

## Using Secrets from Runner Key Storage Integrations

Once the Runner has been integrated with a secrets-management provider, such as Vault, then the _paths_ of the secrets can be browsed and selected
from the Key Storage browser.  The keys are not stored on the Rundeck Server, only the paths are shared with the GUI.

### Secrets in Job Steps

Follow the steps below to use a secret from a Runner in a Job Step plugin:

1. Add a step to a Job that relies on a secret.
2. Click the **`Select...`** button for any key storage field:
   ![Select Key](@assets/img/http-job-step-select-key.png)
3. On the left-hand side of the key storage browser, click the **Local Runner** dropdown:
    ![Key Storage Runner Selector](@assets/img/key-storage-runner-selector.png)
4. From the dropdown, click **Choose Tags** or **Enter Tag Filter** and then select the Runner that has Key Storage configured.
5. Initially, there will be a loading screen while the Runner fetches the key paths:
    ![Key Storage Runner Loading](@assets/img/key-storage-runner-loading.png)
6. Once loaded, the key paths and directories will be visible in the key storage browser:
    ![Runner Browse Keys](@assets/img/key-storage-runner-browse.png)
7. Select the desired key from the secret-management integration:
   ![Runner Select Key](@assets/img/runner-select-key.png)
8. Click on **Choose Selected Key**.
9. In the Job step, the field will now be populated with `runner/path/to/key`:
    ![Job Step Runner Key](@assets/img/job-step-using-runner-key.png)

:::warning Using Secrets from Runners in Jobs
* In order to use secrets retrieved by a Runner within Jobs, the Runner **Tag** used for secrets must align with the **Tag**
used for the **Runner Selector** in the **Nodes & Runner** tab of the Job configuration.

* If the selected Runner tag for the Key Storage browser contains more than one Runner, then all Runners with that tag must be integrated with the same secrets-management provider.  
Therefore, **all Runners with the same Tag must have the same Key Storage configuration**.

This ensures that when a Job is invoked, the Job will behave identically regardless of which Runner is chosen to execute that Job.
:::