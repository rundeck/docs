% Upgrading to Rundeck 3.1
% Greg Schueler
% May 21, 2019

## RPM package

* There is now only a single RPM package required (no rundeck-config anymore)

Otherwise there should be no problem upgrading from Rundeck 3.0 to Rundeck 3.1

If you are upgrading from an older version, please review the Upgrade Guide for the specific version.

## Docker using OpenShift

Some changes to the Docker image were added to support OpenShift, see [#4826](https://github.com/rundeck/rundeck/pull/4826).

* The `rundeck` user's default group needs to be `root(0)`
* Any files and directories Rundeck uses need to have the appropriate `root` group and permissions set
* Use `chown=rundeck:root` in Dockerfile with `ADD` and `COPY`
* Use `chmod 0775` on directories and files as appropriate
