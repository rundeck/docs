# Key Storage through Enterprise Runner
The [Enterprise Runner](/administration/runner/runner-intro) can be used to retrieve keys from secrets providers that are _not_ directly accessible from the Process Automation cluster or
from Runbook Automation due to network boundaries.
For example, if Runbook Automation does not have a direct network path to a self-hosted Hashicorp Vault instance, then a Runner can be placed in the same
network as Vault and retrieve secrets from Vault to be used by operations on the Runner.

:::warning Key Storage Plugin Support
As of version **`4.16.0`**, integration with Hashicorp Vault is supported on the Runner.
In future releases, integration with **CyberArk** and **Thycotic** will be available through the Runner.
:::

## Use Cases
1. **Remote Node Commands & Scrips** (Node Executors & File Copiers): When SSH or WinRM credentials are stored in a secrets provider, then the Runner can retrieve keys from the provider to authenticate with remote nodes in order to execute commands or scripts.<br><br>
2. **Internal Tools & Infrastructure** (Job step plugins): When executing Jobs that include steps that integrate with internal tools APIs - such as Jira, Jenkins, homegrown tooling, etc. - or infrastructure such as databases, then the Runner can use secrets to authenticate with these endpoints using best-practice security standards.<br><br>
3. **Inventory Discovery** (Node Sources): The Runner can be used to discover inventory in secure or remote environments. By retrieving keys from a secrets-provider, the Runner can authenticate with an API endpoint, such as the VMware vSphere API, in order to retrieve the inventory.

## Handling Secrets
Given the sensitivity of secrets retrieved by the Runner, the following guardrails have been put in place:

1. Secrets retrieved by a Runner can only be used for operations executed on that Runner.  These secrets are not sent back to the Process Automation cluster or Runbook Automation instance.  Therefore, these secrets can not be used for plugins that do not reside on the Runner.<br><br>
2. Secrets are masked in logs, including Job execution logs.  Any secrets retrieved by the Runner and printed to the Job log output will appear as `[SECURE]` in the logs.<br><br>
3. Sensitive environment variables set on the Runner are masked in logs, including Job execution logs.  Any environment variables ending with `TOKEN` or `KEY` or `PASSWORD` will be printed as `[SECURE]` in the logs.

## Configuration
To configure a Key Storage integration on the Runner, configuration properties are set on the Runner. These properties can be set through the following methods:

**Note:** These example do not include the full list of configuration properties to optionally set to configure integration with Vault.  The full list of
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

