# Oracle Cloud Infrastructure - Workflow Steps

## Getting Started

[Oracle Cloud Infrastructure](https://www.oracle.com/cloud/) is a cloud service in wide use for dynamic infrastructure; it is easy to start up and shut down Node "Instances" in the cloud.  Use these Rundeck steps to automate common OCI Virtual Machine actions.

To configure Authentication use this page as a reference: [Create Credential for OCI Authentication](https://docs.oracle.com/en/cloud/paas/management-cloud/logcs/create-credentials-oci-authentication.html)

**Tenant ID**
: The OCID of the tenant.

This setting can be configured using _System Configuration_ using `oracle.tenant_id` or project specific using `project.oracle.tenant_id`

**User ID**
: The OCID of the user.

This setting can be configured using _System Configuration_ using `oracle.user_id` or project specific using `project.oracle.user_id`

**Fingerprint**
: The fingerprint for the RSA key pair that you're using to access OCI. It looks something like this: `12:34:56:78:90:ab:cd:ef:12:34:56:78:90:ab:cd:ef`.

This setting can be configured using _System Configuration_ using `oracle.fingerprint` or project specific using `project.oracle.fingerprint`

**Private Key Path**
: The private key in the RSA key pair should be stored in the Rundeck Key Storage. The RSA key pair is generated from OCI in PEM format (minimum 2048 bits).  This "path" is the path to the key in Key Storage.  Example: `keys/project/oracle-test/connection.pem`

**Region**
: Specify the region for the node.  If using the OCI Node Source it's possible to use `${node.region}` and the region will be dynamically populated with the region for that node.

## OCI VM Workflow Steps (Enterprise Only)

For each of these steps an **Instance ID** will need to be included for the instance to be acted on.

### Oracle / VM / Start

Start the VM instance.

### Oracle / VM / Stop

Start the VM instance.

### Oracle / VM / Restart

Start the VM instance.

### Oracle / VM / Terminate

Terminate the VM instance.

:::danger
 Be very careful when using this step as the instance will be removed.
:::
