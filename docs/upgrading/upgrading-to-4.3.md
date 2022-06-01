# Rundeck 4.3 Upgrade Notes

:::warning
When upgrading from any previous version to 4.2, some users reported keys and passwords created using encryption were lost. Therefore, we strongly recommend backing up your data before upgrading from 4.2 to 4.3. Data created prior to version 4.2 should not be affected when upgrading to 4.3.
:::

## Background

Due to an issue in versions 4.2 and 4.2.1 with the [Storage Converters](/docs/manual/key-storage/key-storage.md#key-data-storage-converter) feature which encrypts values stored in the Rundeck Key Storage feature, any key added or changed while version 4.2.x was installed will be lost when upgrading to 4.3.

**How to know if you are impacted**

- The installation you are upgrading from is version 4.2 or 4.2.1
- You are using a Storage Converter Plugin. Check your configuration for [settings described here](/docs/administration/configuration/plugins/configuring.md#storage-converter-plugins).
- You have have added/changed Key Storage entries while using the 4.2 or 4.2.1 version.

As long as there is a Storage Converter in place as described above, this issue will also apply to the use of Key Storage backends like Thycotic, Vault, Cyberark.

## SCM Synchronization

Private keys used in SCM become invalid after an upgrade to 4.2. This results in disabling all projects at that use SCM with SSH private keys.

## Upgrading from 4.2.0

- If you didn't add or change an existing Key Storage entry after upgrading to 4.2 then you don't need to do anything in 4.3.

- If you have already updated Key Storage entries in v4.2.x to work around the issue, it will be necessary to overwrite those private keys again after upgrading to 4.3

Steps to update Key Storage entries:

- Go to the Key Storage section under the System Menu (gear icon)
- Select the key that needs to be updated then click the _Overwrite Key_ button in the toolbar
- Follow the rest of the steps from [Add a Private Key](/manual/system-configs.html#key-storage) to overwrite the entry with a valid value.
