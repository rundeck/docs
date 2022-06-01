# Rundeck 4.3 Upgrade Notes

:::warning
When upgrading from any previous version to 4.2, some users reported keys and passwords created using encryption were lost. Therefore, we strongly recommend backing up your data before upgrading from 4.2 to 4.3. Data created prior to version 4.2 should not be affected when upgrading to 4.3.
:::

## Private keys and password encryption issue

The release 4.3.0 fixes an issue that results in invalid credentials after upgrading from any previous version to 4.2.0.

This issue is related to the key encryption method and causes keys already stored using previous versions to become invalid.

Specifically, private keys used in SCM becoming invalid after the upgrade. This results in disabling all projects at that use SCM with SSH private keys.

## Upgrading from 4.2.0

This issue was detected after upgrading to v4.2.x from any previous version.

- If you didn't change the stored private keys after the upgrading then you don't need to do anything in v4.3.0.

- If you have already overwritten private keys in v4.2.x to work around the issue, you have to overwrite those private keys again after upgrading to v4.3.0 

Steps to overwrite key storage:

- Go to the key storage page
- Select the private key need to be overwritten then click the Overwrite Key button in the toolbar
- Follow the same steps as [Add a Private Key](/manual/system-configs.html#key-storage) to overwrite the keys
