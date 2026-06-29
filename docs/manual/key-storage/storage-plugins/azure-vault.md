# Azure Key Vault Key Storage Plugin (Commercial)

:::enterprise
:::

[Azure Key Vault](https://azure.microsoft.com/en-us/products/key-vault) is a cloud-based service for secure storage and management of sensitive data. It allows controlled access to confidential information such as API keys, passwords, certificates, and cryptographic keys.

This integration enables users to retrieve **secrets** from Azure Key Vault and utilize them for secure connections to various resources including virtual machines, databases, other tools, and more.

## Configuration

### Prerequisites

Before configuring the Azure Vault Key Storage Plugin, you must set up the necessary permissions for Azure Service Principal associated with the Runbook Automation instance depending on the **Permission Model** used in your Vaults. You can integrate with vaults that use either Azure role-based access control (RBAC) or Vault access policy.

- For RBAC, you can use any of the predefined roles (or create a new one) including permission **`Microsoft.KeyVault/vaults/secrets/*`**. There are some Built In Roles that Azure provides that have this permission, such as **Key Vault Secrets Officer**.

- If you vault is configured with **Vault Access Policy**, you need to create a policy that allows operations on Secrets and assign it to your Service Principal. You can use the **Secret Management** template which contains the necessary permitions to manage secrets.

See [Azure AKS resource model plugin](manual/projects/resource-model-sources/azure-aks.html#prerequisites) for an example on setting up Azure credentials.


### Configuration
1. Navigate to the **System Menu** (gear icon in the upper right).
2. Click on **Key Storage**.
![Key Storage Menu](/assets/img/key-storage-menu.png)
3. Navigate to the **Configure** tab.
4. Click on **Add Storage Plugin +**.
5. Click on **Azure Vault Key Storage** from the popup list.
![Azure Vault Key Storage](/assets/img/azure-vault-config-plugin.png)
6. In the **Key Storage Path** field, type in a directory name to be the "root" for the secrets retrieved from your Key Vault. For example, `keys/azure-vault` would create a directory called `azure-vault` within the base `keys` directory of the Key Storage tree.
7. Leave the checkbox for **Remove Path Prefix** unmarked
![Path config](/assets/img/azure-vault-path-config.png)
8. Fill in the necessary credentials for the Azure service principal in the **Authentication** section
   - **Vault URL**: The URL of your Azure Vault such as `https://your_vault_name.vault.azure.net/`. You can retrieve this URL from your vault's overview page in the Azure Portal
   - **Tenant ID**: The Azure Tenant ID. If not provided, the value from the Azure plugin group at the System context will be used.
   - **Client ID**: The Azure Client ID. If not provided, the Client ID value from the Azure plugin group at the System context will be used.
   - **Azure Client Secret**: The Azure Client Secret. 
9. Choose `true` in **Enforce Key Dates** if you want to hide keys based on their `Activation date` and `Expiration date` values. Disabled keys are always hidden.
![Enforce Key Dates](/assets/img/azure-vault-enforce-key-dates.png)
8. Click **Save** to commit changes for the integration.
9. Click **Save** to add this integration to the Key Storage configuration.
![Save config](/assets/img/azure-vault-save-config.png)

Within the **Keys** tab, refresh the browser page and the new directory path specified in **Step 6** should appear:

![Secrets Folder](/assets/img/azure-vault-secrets-folder.png)<br>

Click into this directory and begin to navigate the secrets retrieved from Azure Key Vault.

## Usage

Once the integration is configured, the secrets from Azure Key Vault can be used by the various functions of the Runbook Automation product that require secrets.

### Azure Key Vault Secret Naming Limitations

Secret names in Azure Key Vault are restricted to alphanumeric characters and dashes.

:::info Directories within Key Storage
To enhance secret browsing in Azure Key Vault, secrets containing two consecutive dashes (`--`) will be organized into directories.

For example, a secret named `kubernetes--clusters--api-token-12345` in Azure Vault will appear in Runbook Automation as:
- Directory: `kubernetes`
  - Subdirectory: `clusters`
    - Key: `api-token-12345`

When creating keys through the Rundeck Key Storage UI, you can use directories and the standard separator `/` normally. The system will automatically replace this with the allowed sequence `--`.
:::

### Rundeck Keys and Passwords

Rundeck supports three key types: *Private Keys, Public Keys, and Passwords.* As private keys cannot be retrieved from Azure Key Vault Keys, all three kinds of Rundeck keys are stored as Azure Key Vault Secrets with the necessary metadata stored using Azure object Tags.

Existing secrets in Azure Vault are treated as Rundeck Passwords by default, unless a specific tag is set:
- `Rundeck-key-type: private` for private keys
- `Rundeck-key-type: public` for public keys
:::info File Extensions
Due to Azure secret naming limitations, file extensions cannot be saved. For example, a public key named `my-key.pem` should be saved without the `.` and file extension in Rundeck.
:::

### Azure Key Vault Secret Versions

While Azure supports versioning for Keys/Secrets, this plugin always retrieves the latest version. Updating an existing key through Rundeck generates a new version, ensuring the most recent version contains the updated value.

:::info Updating Secrets
Updating a secret using Rundeck Key Storage will only modify Rundeck-related tags.
:::

### Expired and Not-Yet-Enabled Secrets

Azure Key Vault allows setting Activation and Expiration dates for keys and secrets. You can choose to respect these dates using the **Enforce Key Dates** plugin configuration:
- If set to `true`, only active secrets within their valid date range will be visible and usable in Rundeck.
- If set to `false`, all secrets will be visible and usable, regardless of their activation or expiration status. This does not include **disabled** or **deleted** secrets. 

Rundeck does not modify these date values. Updating an expired secret via Rundeck key storage will generate a new version of the secret, but it will remain expired.

:::info Disabled Secrets
Disabled Azure Key Vault Secrets are always hidden in Rundeck Key Storage. All new keys created through Rundeck are Enabled and no values are set for Activation and Expiration dates.
:::

### Deleting Secrets

If Soft Delete is enabled on your Key Vault, secrets deleted through Rundeck will be soft-deleted and retained for the configured retention period in your vault. 

:::info Soft-deleted Azure Key Vault Secrets
Soft deleted secrets can be found in the *Manage deleted secrets* window in the Azure Portal where they can be recovered or purged. If you try to create a new key or password using the name of a soft-deleted secret you will get an error from Azure.
:::

### Storage Converters and Encryption
When you have external key storage configured for rundeck such as the Azure Key Vault plugin, you may not need the [Storage Converter](/manual/key-storage/index.md#key-data-storage-converter) (encryption) as you already have a security layer from provider-side, but if you are already using a storage converter plugin, such as `aes-gcm-encryption` configured via the `rundeck.storage.converter.1.type=aes-gcm-encryption` setting, you can still use the Azure Vault Key Storage Plugin. Keys created or updated will be encrypted with their values `base64` encoded and the necessary metadata required for decryption stored as object tags.

:::warning Using an encryption storage converter
If your rundeck instance has an storage converter enabled and some of the secrets present in the configured Key Vault are used in places other than rundeck, you should try to avoid updating them through rundeck key storage as encrypted keys will only be usable in Rundeck instances that know the encryption password used to encrypt the actual value. 
:::

