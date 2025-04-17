---

title: "5.11.0 Release Notes"
date: 2025-04-09
image: /images/chevron-logo-red-on-white.png
description: "Rundeck | Runbook Automation Releases 5.11.0 with MongoDB Plugin and enhanced SQL Table Output options."
feed:
 enable: true
 description: "5.11.0 - MongoDB Plugin and enhanced SQL Table Output options."

---

# 5.11.0 Release Notes

## Overview

::: warning Please Use 5.11.1
5.11.0 has been updated to fix some critical bugs.  Please use the [5.11.1 Release](version-5.11.1.md).
:::

<VidStack src="youtube/u-JcLa9XcJQ" poster="https://img.youtube.com/vi/u-JcLa9XcJQ/maxresdefault.jpg"/>

### MongoDB Job Step Plugin

MongoDB is a widely adopted NoSQL database known for its flexibility and ease of use, making it a popular choice for modern application development. With our new [MongoDB job step plugin](/manual/jobs/job-plugins/workflow-steps/mongodb.md), you can now run arbitrary queries against your MongoDB databases as part of your Runbook Automation workflows. This enables teams to perform tasks–such as automating diagnostics, data validation, and operational checks—while exposing those tasks through safe, self-service interfaces. It’s a powerful way to reduce manual effort, eliminate DB access bottlenecks, and bring MongoDB operations into your existing automation ecosystem.  Our [MongoDB How-To article](/learning/howto/how2mongodb.md) has a full walk through how to setup and test the plugin.

![MongoDB Command Runner](/assets/img/relnotes-511-mongo.png)<br>

### JSON and Table for SQL Query Plugin

The [SQL Runner Node Step plugin](/manual/jobs/job-plugins/node-steps/sqlrunner.md) is commonly used to automate tasks or provide a self-service mechanism for interfacing with SQL databases–such as MySQL, MSSQL, Oracle and so on.  Previously, the step would always return the output of the query as plain-text log-lines.  Now, with this latest enhancement, users can select a format from a list of options, including JSON and CSV.  These output options allow for the SQL output to be viewable as a HTML table in the GUI, and provides an easier method to capture specific data elements using log filters–for example, using the JQ log filter with the JSON output format.  This enhancement both provides an improved visual experience of retrieving database data but also reduces the steps to use that data in subsequent workflow steps.



## Runbook Automation Updates

> Also includes all Open Source updates from below

### Additional Updates


* Add MongoDB command runner to enterprise plugins
* Add JSON,Table output format to SQL Runner Step
* Fix: User Class Management issues when license assignment is exceeded


## Rundeck Open Source Product Updates

* [Fix Remco CVEs - See pull request for list](https://github.com/rundeck/rundeck/pull/9603)
* [Make public key download from GUI disabled as default](https://github.com/rundeck/rundeck/pull/9590)


[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A5.11.0+is%3Aclosed)

## Links

- Download the Releases: [Open Source](https://www.rundeck.com/community-downloads/5.11.0) | [Self-Hosted](https://www.rundeck.com/enterprise-downloads/5.11.0)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Upgrade instructions](/upgrading/index.md)
- [Catch us on LinkedIn for the Live Stream Release Videos](https://www.linkedin.com/company/pagerduty/events)

## Version Info

Name: <span style="color: coral"><span class="glyphicon glyphicon-briefcase"></span> "Kilimanjaro coral briefcase"</span>

Release Date: April 9th, 2025


## Community Contributors

Submit your own Pull Requests to get recognition here!


## Staff Contributors

* Greg Schueler ([gschueler](https://github.com/gschueler))
* Alexander Abarca ([alexander-variacode](https://github.com/alexander-variacode))
* Alexander Grachtchouk ([mrdubr](https://github.com/mrdubr))
* Carlos Eduardo ([carlosrfranco](https://github.com/carlosrfranco))
* Christopher McCarroll-Gilbert ([chrismcg14](https://github.com/chrismcg14))
* Charlie Crawford ([ChuckCrawford](https://github.com/ChuckCrawford))
* Forrest Evans ([fdevans](https://github.com/fdevans))
* Jake Cohen ([jsboak](https://github.com/jsboak))
* Jason Brooks ([jbrookspd](https://github.com/jbrookspd))
* Jesus Osuna ([Jesus-Osuna-M](https://github.com/Jesus-Osuna-M))
* José Vásquez ([hiawvp](https://github.com/hiawvp))
* Luis Toledo ([ltamaster](https://github.com/ltamaster))
* Rodrigo Navarro ([ronaveva](https://github.com/ronaveva))
* Sarah Martinelli Benedetti ([smartinellibenedetti](https://github.com/smartinellibenedetti))