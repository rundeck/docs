# Rundeck 4.0 Upgrade Notes

::: tip
This document highlights changes for users upgrading _from_ Rundeck 3.4. See other [Upgrading](/upgrading/index.md) Documents if you are upgrading from 3.3 or earlier.
:::

:::danger
Warning:  The 4.0.0/1 release contains a bug that will cause issues with environments using a Load Balancer in front of Rundeck and running on https.  If your environment leverages a load balancer (NGINX, ELB, etc) and the `server.useForwardHeaders=true` is set there may be a situation where this version reverts to using `http` instead of `https`.  It is recommended to use version 4.1.0 or later to avoid this issue.

[Rundeck 4.1.0 fixes this bug](/history/4_x/version-4.1.0.md).
:::

## Result Data GA

In Rundeck 3.4.2 we released an incubating feature for Result Data.  With Rundeck 4.0 the plugins were updated with new provider names to better represent the feature name.  Job definitions using the incubating version will need to update the definition with the new provider name.

When editing a job with previously configured incubating Result Data template or export Rundeck 4.0 will present an error message. If this is encountered it’s recommended to Cancel editing the job and follow one of the following steps.

### Ways to Update the Jobs

* Export the Job Definition and search for the string `job-data` and replace it with `result-data-json-template` and re-import the job.
* Export the Job Definition and copy the Result Data template or setting from the export and paste it into the job definition in the UI and save the job.

## JSON Event Data Errors

After an upgrade there may be errors in logs relating to `EventDataFormat` during boot.  These are not an issue, but do create unnecessary noise in the logs.** **To clear up these errors, move the `rundeckpro-json-event-format-plugin-3.4.x.jar` from the `libext` directory to another directory. Restart Rundeck and confirm everything is functioning correctly. This plugin is no longer needed, but during an upgrade, previous plugins are not removed to maintain any custom plugins that may be installed.

Example of Errors seen in logs:

```java
Caused by: java.lang.NoClassDefFoundError: org/rundeck/reactions/plugins/EventDataFormat
at java.base/java.lang.ClassLoader.defineClass1(Native Method)
at java.base/java.lang.ClassLoader.defineClass(ClassLoader.java:1017)
at java.base/java.security.SecureClassLoader.defineClass(SecureClassLoader.java:174)
at java.base/java.net.URLClassLoader.defineClass(URLClassLoader.java:555)
at java.base/java.net.URLClassLoader$1.run(URLClassLoader.java:458)
at java.base/java.net.URLClassLoader$1.run(URLClassLoader.java:452)
at java.base/java.security.AccessController.doPrivileged(Native Method)
at java.base/java.net.URLClassLoader.findClass(URLClassLoader.java:451)
at com.dtolabs.rundeck.core.plugins.LocalFirstClassLoader.loadClass(LocalFirstClassLoader.java:52)
at com.dtolabs.rundeck.core.plugins.LocalFirstClassLoader.loadClass(LocalFirstClassLoader.java:44)
at java.base/java.lang.Class.forName0(Native Method)
at java.base/java.lang.Class.forName(Class.java:398)
at com.dtolabs.rundeck.core.plugins.JarPluginProviderLoader.loadClass(JarPluginProviderLoader.java:435)
... 96 more
```

## Dot Notation Warnings

Some builds of 4.0 will show a Warning about Dot Notation as shown below.  These messages are informational only and will be cleared up in a future release.

```
WARN  config.NavigableMap - Accessing config key '[useManifest]' through dot notation is deprecated, and it will be removed in a future release. Use 'config.getProperty(key, targetClass)' instead.
```
