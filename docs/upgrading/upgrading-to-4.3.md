# Rundeck 4.3 Upgrade Notes

:::warning
Any keys or passwords created using encryption in 4.2.0/4.2.1 will be lost when upgrading, it is recommended to back up your data before upgrading from those versions. Data created in earlier versions (before v4.2.0) will transfer properly.
:::

## Private keys and password encryption issue

The release 4.3.0 fixes an issue that results in invalid credentials after upgrading from version 3.4.x to version 4.2.0.

This issue is related to the key encryption method and causes keys already stored using previous versions to become invalid.

One of the impacts related to this is related to the private keys used in SCM become invalid disabling all projects that use SCM with SSH private keys.

## Upgrading from 4.2.0

:::tip
**The issue was detected in version 4.2.0 and, if no action was taken so far, the stored keys should work normally in version 4.3.0.** 
:::

However, if the keys have been overwritten by the same key in order to workaround the issue in 4.2.0 version, the same step must be performed again, i.e., the keys must be overwritten by the same private key in version 4.3.0

Steps to overwrite key storage:

- Go to key storage page
- Select the private key
- Click on Overwrite Key button
- Overwrite the key **with the same key**
- Check if the keys is working well