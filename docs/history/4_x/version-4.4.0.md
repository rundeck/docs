# 4.4.0 Release Notes

Name: <span style="color: deeppink"><span class="glyphicon glyphicon-piggy-bank"></span> "Murloc deeppink piggy-bank"</span>
Release Date: July 14, 2022

- [Download Rundeck](https://download.rundeck.com/)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Watch the Live Stream Release Recap](https://youtu.be/HAjCUEQfAow)
- [Upgrade instructions](/upgrading/)

<YouTube id="HAjCUEQfAow"/>

## Overview

Check out the new features and enhancements for PagerDuty Process Automation (formerly Rundeck Enterprise) and PagerDuty Runbook Automation (announced as Rundeck Cloud) and Rundeck Community included in this release.

## New AWS Plugins
New AWS Job Step Plugins for ECS (Fargate) and Lambda are available for Commercial product users. See details about specific plugin functionality below:

* [ECS/Fargate Command Workflow Step](/manual/workflow-steps/aws-ecs-fargate): Send commands to containers running in ECS using AWS's Systems Manager agent. This is useful for extracting realtime diagnostics from containers.<br><br>
* [Lambda Custom Code Workflow Step](/manual/workflow-steps/aws-lambda.html#lambda-custom-code-execution): Create, execute, and optionally delete a new Lambda function with the custom-code provided in a Job step as its input. This allows users to execute custom scripts as steps in their Jobs without needing to install any software - therefore particularly useful for Runbook Automation (Cloud) users.

## Commercial Updates

* Upgrade Ansible Plugin to 3.2.1 [More Details Below](#ansible-plugin-updates)
* Bump OpenSSH plugin version to 2.0.2
* Execute Custom Lambda Code Plugin
* ACL Manager UI Update: add context information about access levels in listing
* Fix: Issue saving/reading license from s3 bucket
* Add Runner Feature ACL resources to ACL Editor dropdown
* UI: Nodehealthcheck ACL help update


## Core Product Updates

* [Checking if jquery element has length greater than zero to avoid access an attribute on a undefined object](https://github.com/rundeck/rundeck/pull/7784)
* [Return basic Rundeck server info without any authorization for monitoring](https://github.com/rundeck/rundeck/pull/7772)
* [Add Webhook Auth Tokens to Export All function by default](https://github.com/rundeck/rundeck/pull/7771)
* [Add variable expansion for script url string](https://github.com/rundeck/rundeck/pull/7767)
* [Plugins menu not showing in scroll area](https://github.com/rundeck/rundeck/pull/7765)
* [Upgrade ansible-plugin to 3.2.1](https://github.com/rundeck/rundeck/pull/7762)
* [Bump OpenSSH plugin version to 2.0.2](https://github.com/rundeck/rundeck/pull/7751)
* [Fix: Rundeck gives error on job email notification using coma and spaces between emails](https://github.com/rundeck/rundeck/pull/7750)
* [Add bootstrap storage tree rewrite feature](https://github.com/rundeck/rundeck/pull/7744)
* [Adjust Tooltip position for activity list &amp; Fix position of search icon](https://github.com/rundeck/rundeck/pull/7742)
* [Fix: Can&#39;t access some menu items in main menu](https://github.com/rundeck/rundeck/pull/7741)
* [Add primary keys for some tables in mysql to facilitate high availability](https://github.com/rundeck/rundeck/pull/7739)
* [Fix: Webhook UI duplicates webhook when imported with the same name](https://github.com/rundeck/rundeck/pull/7737)
* [Fix: Output freezes when switching from Nodes tab to Log Output tab](https://github.com/rundeck/rundeck/pull/7731)
* [Add Runner ACL resources to ACL Editor dropdown](https://github.com/rundeck/rundeck/pull/7730)
* [Fix: Project Import fails when you add the project name as reference](https://github.com/rundeck/rundeck/pull/7728)
* [Grant appadmin user access to executionMode page and license Info page](https://github.com/rundeck/rundeck/pull/7726)
* [Upgrade Gradle to 7.4.2](https://github.com/rundeck/rundeck/pull/7720)
* [Remote url options sort only when selected](https://github.com/rundeck/rundeck/pull/7713)
* [OpenAPISpec: add docs for tokens, metrics](https://github.com/rundeck/rundeck/pull/7688)
* [Fix js error on nodes config page](https://github.com/rundeck/rundeck/pull/7660)

[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A4.4.0+is%3Aclosed)

## Ansible Plugin Updates

Ansible plugins continue to be very popular and are available to all users. We recently added additional enhancements and fixes outlined below.

* [Ansible: Inline inventory Fix](https://github.com/rundeck-plugins/ansible-plugin/pull/318)
* [Ansible: Update Gradle to 7.2](https://github.com/rundeck-plugins/ansible-plugin/pull/317)
* [Ansible: Normalize line separators to LF(unix)](https://github.com/rundeck-plugins/ansible-plugin/pull/316)
* [Ansible: Add a field to set the path to the Ansible binaries directory](https://github.com/rundeck-plugins/ansible-plugin/pull/315)
* [Add a field to set the path to the Ansible binaries directory](https://github.com/rundeck-plugins/ansible-plugin/pull/288)

## Community Contributors

* Pierre Carré (pierrecarre)
* Pieter De Praetere (pieterdp)

## Staff Contributors

* Greg Schueler (gschueler)
* Stephen Joyner (sjrd218)
* Imad Jafir (imad6639)
* Luis Toledo (ltamaster)
* Rodrigo Navarro (ronaveva)
* Carlos Eduardo (carlosrfranco)
* Miguel Ramos (mishingo)
* Christopher McCarroll-Gilbert (chrismcg14)
* Jason Qualman (qualman)
* Jesus Osuna (Jesus-Osuna-M)
* Alexander Abarca (alexander-variacode)
* Alberto Hormazabal Cespedes (ahormazabal)
* Leonel Juarez (L2JE)
* Eric He (ehe-pd)
* Forrest Evans (fdevans)
* Jake Cohen (jsboak)
* Darwis Narvaez (DarwisNarvaezDev)
* Antony Velasquez Ruiz (avelasquezr)
