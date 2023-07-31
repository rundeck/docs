# Intro to Managing Secrets
As organizations increasingly rely on Rundeck, it becomes crucial to prioritize the secure storage of cryptographic keys. Proper key storage practices are fundamental to safeguarding sensitive information, protecting critical systems, and reinforcing the overall security posture. By consolidating keys in a centralized repository, organizations can enforce consistent security policies, control access, monitor key usage, and maintain audit logs.

Rundeck utilizes built-in key storage to save all credentials related to remote nodes (or for other purposes). Also, it’s possible to integrate with other top secret management technologies like Hashicorp Vault, Cyberark Privileged Access, and Thycotic Secret Server.

![](~@assets/img/secrets-1.png)
_The interface to upload a key to the Rundeck keystore_

## Storage Options in Rundeck and Process Automation

### [Rundeck Key Storage]/manual/key-storage/key-storage.html#rundeck-key-storage)
Rundeck Key Storage is the space that Rundeck Admins can use to store current sensitive private key/password data ("keys") storage that can be utilized across Rundeck. By default, Rundeck stores these keys on the internal [backend database](/administration/configuration/database/#database-overview). These keys can be used to customize the automation environment's plugins, node executors, and other components.

Rundeck also has [Key Storage Encryption](/administration/configuration/plugins/bundled-plugins.html#jasypt-encryption-plugin). This enables the encryption of keys and passwords saved on the Rundeck Key Storage (at the Rundeck backend). The following setting allows this encryption and is predefined in the `rundeck-config.properties` file:

```
# Encryption for key storage
rundeck.storage.provider.1.type=db
rundeck.storage.provider.1.path=keys
rundeck.storage.converter.1.type=jasypt-encryption
rundeck.storage.converter.1.path=keys
rundeck.storage.converter.1.config.encryptorType=custom
rundeck.storage.converter.1.config.password=encryption_password
rundeck.storage.converter.1.config.algorithm=PBEWITHSHA256AND128BITAES-CBC-BC
rundeck.storage.converter.1.config.provider=BC
```

### [Hashicorp Vault Integration](/learning/howto/vault-integration.html#how-to-integrate-hashicorp-vault)
HashiCorp Vault is a highly regarded open-source tool that provides a centralized and secure solution for managing secrets, encryption keys, and sensitive data in modern IT environments. Acting as a robust secrets management platform, Vault offers a wide range of features including secret storage, dynamic secret generation, secure access controls, and encryption as a service.

## Additional Storage Options in PagerDuty Process Automation

### [Thycotic Secret Server Integration](/manual/key-storage/storage-plugins/thycotic-storage.html#thycotic-storage-plugin-enterprise)
Thycotic Secret Server is a Privileged Access Management (PAM) solution designed to secure and streamline the management of sensitive secrets and privileged credentials within organizations. It provides a centralized repository for storing and managing secrets, including passwords, SSH keys, database credentials, and API tokens. 

### [Cyberark Privileged Access Integration](/manual/key-storage/storage-plugins/cyberark-storage.html#cyberark-key-storage-plugin-enterprise)
CyberArk is a provider of privileged access security solutions, offering a comprehensive suite of products designed to protect and manage privileged accounts, credentials, and secrets within organizations. CyberArk's flagship product, CyberArk Privileged Access Security, helps organizations secure, monitor, and control privileged access to critical systems and data.

## How does Key Storage work with third-party tools?
If using a third-party secrets tool, it is possible to use that keystore in addition to or instead of the built-in keystore.  Rundeck abstracts the key provider’s backend to efficiently store or retrieve passwords, public keys, and secret keys directly in the Rundeck interface but stored in the third-party store.

### [Practical Example: How to use a Secret to authenticate against remote nodes](/learning/howto/ssh-on-linux-nodes.html#using-ssh-on-linux-unix-nodes)
The linked example walks through configuring a remote SSH node, providing a good example for learning how to store keys and how to reference them in model sources to dispatch commands. 

## Resources
* [Hashicorp Vault Documentation](https://developer.hashicorp.com/vault/docs?product_intent=vault)
* [Thycotic Documentation](https://docs.thycotic.com/ss/current)
* [Cyberark Documentation](https://docs.cyberark.com/Product-Doc/OnlineHelp/Portal/Content/Resources/_TopNav/cc_Portal.htm)