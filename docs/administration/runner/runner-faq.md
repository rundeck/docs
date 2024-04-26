---
title: "FAQs"
---

# Enterprise Runner - Frequently Asked Questions

## Does this replace Clustering?

This feature is intended to be used in situations where execution of Node Steps is needed in a network segment or security zone that is different from the Cluster feature(s). An Automation Server Cluster still provides high-availability and fault tolerance for the User Interface, Job Management/Execution and system management tasks.

## What plugins are available to run with the Enterprise Runners?

Please review the [list of supported Remote Runner plugins.](/administration/runner/runner-remoteplugins.md)

## Do Runners participate in node discovery?

Not at this time. To dynamically update nodes use custom scripting and the APIs to update the node lists remotely.

## Can multiple Runners run in parallel?

Yes, multiple runners can be configured with the same tags. At this time only one Runner in the Runnerset with the same tags will execute tasks for a given job.

## Does this work with Health Checks?

As of the current product version Health Checks via the Runner are not yet supported.