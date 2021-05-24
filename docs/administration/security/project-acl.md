# 3.4.0 ACL Changes

## Project ACLs for Key Storage
In Rundeck 3.4.0, the ACL policies were enhanced to allow administrators the ability to write project level ACLs for key storage access.  Previously, ACL policies for Key Storage Access were defined at the system level.  Now, administrators and authorized users can control key storage access at a project level in order to isolate users from other contexts at the System level. 

The default behavior for Key Storage access is defined at the project level.  For administrators who would like to retain the previous functionality of defining key storage access at the system level, they would have to set the following config property:



     rundeck.feature.projectKeyStorage.enabled=false



This property should be set in the `rundeck-config.properties`. The Key Storage GUI is available in the project configuration menu allowing project level key management.  
## Enterprise ACL Storage Layer

Rundeck Enterprise 3.4.0 adds a more efficient Enterprise ACL Storage Layer, which improves application performance if you have many ACLs. This feature is enabled by default and will automatically transfer ACLs from the Core ACL Storage Layer at startup if they exist. Newly added or changed ACLs will use the new Enterprise ACL Storage Layer. The new storage layer stores ACLs in the database in a format that allows them to be queried more efficiently, and improves performance when there are many ACLs. 

:::warning
If regular expressions are used in the `by:` clause of ACLs, those ACLs cannot be queried efficiently, and remain stored only in the Core storage layer.
:::

This feature can be toggled with these two feature flags:

Enable or disable the Enterprise ACL Storage Layer:

`rundeck.feature.enterpriseacl.enabled=true | false`

Enable or disable automatic Transfer between the Core and Enterprise Storage layers at startup:

 `rundeck.feature.enterpriseacltransfer.enabled=true | false`.

 The Transfer feature flag will determine whether to automatically transfer ACLs between the Enterprise and Core ACL Storage Layers at Rundeck startup. When the Enterprise ACL Storage Layer feature is enabled, any ACLs that can be transferred will be transferred out of Core and into the Enterprise storage layer. Conversely, when the Transfer feature flag is disabled, ACLs will be transferred back to the Core storage layer.

If the Transfer feature flag is disabled, no ACLs will be automatically transferred. You can choose to enable the Enterprise ACL Storage Layer while not enabling the automatic Transfer, and only newly created or modified ACLs will use the new storage layer. 

:::warning
if you disable the Enterprise ACL Storage Layer feature, but enable the Transfer feature and restart, any ACLs in the new storage layer will be automatically transferred back to the Core storage layer.
:::
