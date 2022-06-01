# Rundeck 4.3 Upgrade Notes

:::warning
An issue was reported in 4.2.0 and 4.2.1 where keys and passwords created using encryption was lost when upgrading. We recommend backing up your data before upgrading from these two versions. Data created prior to version 4.2.0 will transfer correctly.
:::

## Private keys and password encryption issue

The release 4.3.0 fixes an issue that results in invalid credentials after upgrading from version 3.4.x to version 4.2.0.

This issue is related to the key encryption method and causes keys already stored using previous versions to become invalid.

Specifically, private keys used in SCM becoming invalid after the upgrade. This results in disabling all projects at that use SCM with SSH private keys.

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