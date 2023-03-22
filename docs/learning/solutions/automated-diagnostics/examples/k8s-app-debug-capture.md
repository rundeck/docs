#### Automated Diagnostics
---

# Capturing Debug Data from Apps in Kubernetes

Similar to how applications are analyzed in non-containerized environments, it is possible to debug and examine the state of programs running inside Kubernetes containers. This is helpful for identifying failure points, memory leaks, and other types of issues.

To accomplish this, the manual process could be messy: launch the pod shell and then execute some debugging commands like `netstat` inside the container.

With the [Kubernetes plugins](/learning/howto/how2kube), commands can be issued directly to a Kubernetes pod, and the output can be captured and persisted in various services like S3, an email, an SFTP server, or an HTTP web service, all of this in a single workflow.

This article demonstrates how to automate this process using Rundeck, Process Automation, and Runbook Automation.
