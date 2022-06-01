# Rundeck 4.3 Upgrade Notes

:::warning
Any keys or passwords created using encryption in 4.2.0/4.2.1 will be lost when upgrading, it is recommended to back up your data before upgrading from those versions. Data created in earlier versions (before v4.2.0) is will transfer properly.
:::

## Upgradting from 4.2.0/4.2.1

- If on upgrading to 4.2.0/4.2.1 the workaround of overwriting the keys in the keystorage was applied, the same problem will show up after upgrading to 4.3. However, overwriting the keys again will fix this.

- If the workaround was not applied, the stored keys will work again as expected after upgrading to 4.3.