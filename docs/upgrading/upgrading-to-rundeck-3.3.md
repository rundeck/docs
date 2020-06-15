# Upgrading to Rundeck 3.3


::: tip
See other [Upgrading](/upgrading/) Documents if you are upgrading from 3.1 or earlier.
:::

## Single-Sign On Notes

## Log4j2 Notes

## JSCH Timeout Notes

Old behavior used a timeout config of 0, causing an internal JSCH timeout of 20s, which caused some connections to fail. A new default timeout config is set for JSCH (instead of 0), this fixes the timeout issue in cases where the network is unstable.

However, by setting the timeout config, JSCH now responds differently to the case when remote sshd does not accept remote env vars, causing connections to fail when env vars are sent.

We added a new config `send-env-var` which is default to false, if you use `RD_*` env vars you can enable this by default using `framework.properties`, at project level using project properties or at node level.

## rd-acl Removed in 3.3.0

The `rd-acl` CLI tool has been removed from the Rundeck server package. It has migrated to be an extension for [`rd`][rd], the official Rundeck CLI client tool.

The `rd acl` extension is bundled with `rd` version 1.3.0.

Invoke the command `rd acl` to replace the functionality of `rd-acl`.

Please report any issues on the [rd-ext-acl github](https://github.com/rundeck/rd-ext-acl).

[rd]: https://rundeck.github.io/rundeck-cli/

## Docker Notes
