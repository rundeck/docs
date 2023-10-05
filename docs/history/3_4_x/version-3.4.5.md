# Release 3.4.5

Name: <span style="color: coral"><span class="glyphicon glyphicon-flag"></span> "Papadum coral flag"</span>
Release Date: October 18, 2021

- [Download Rundeck](https://download.rundeck.com/)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)
- [Upgrade instructions](/upgrading/)

## Overview

Check out the new features and enhancements for Rundeck Enterprise and Rundeck Community included in this release.

## Configuration Management UI/UX

Continuing with our Redesign efforts started in 3.4.0, [Configuration Management](/manual/configuration-mgmt/configmgmt.md) has been fully revamped with an improved UI/UX.

As a reminder, with [3.4.0](/history/3_4_x/version-3.4.0.md) release users can now configure Rundeck within the GUI and many of the settings now do not require a restart. The settings are stored in the Rundeck database so they are also shared across all your cluster members immediately. No need to worry about visiting each server console to update that certain setting for each server in your cluster.

![System Configuration Updated](/assets/img/relnotes-345-sysconfig.png)

## Dark Mode!!

Dark mode is a highly requested Rundeck feature! One of our rock-star devs made dark mode a reality during PagerDuty’s Hackweek. Now you can view Rundeck in a dark background with white text. Change the theme using the setting icon in the bottom right corner of the Rundeck GUI.

![Dark Mode](/assets/img/relnotes-345-darkmode.gif)

## New AWS Actions

Continuing our enhancements to Amazon Web Services these new job steps enable new functionality to automate your digital operations strategy.

- Create EC2 Resources from Snapshot
- Enable Audit Trail Logs
- Enable VPC Logs

## Enterprise Updates

* Config Management Styling Enhancements
* Dark Mode - Enterprise
* AWS and GCP Plugin enhancements

## Core Product Updates

* [Allow more SVG attributes through HTML sanitization](https://github.com/rundeck/rundeck/pull/7306)
* [Add color theme picker](https://github.com/rundeck/rundeck/pull/7288)
* [Dark Mode](https://github.com/rundeck/rundeck/pull/7283)
* [Grant permission to delete webhook with project based ACL.](https://github.com/rundeck/rundeck/pull/7269)
* [Add functionality to specify a blocklist of plugins](https://github.com/rundeck/rundeck/pull/7264)
* [Fix to include payload format and http method on notification importing](https://github.com/rundeck/rundeck/pull/7259)
* [Admin access updates](https://github.com/rundeck/rundeck/pull/7258)
* [Add a flag to disable Local Execution and Local File Copier](https://github.com/rundeck/rundeck/pull/7256)
* [Auth check cleanup](https://github.com/rundeck/rundeck/pull/7254)
* [Fix: Improve Limit log feature for better behavior with large logs](https://github.com/rundeck/rundeck/pull/7248)
* [unable to delete project with 100 k executions](https://github.com/rundeck/rundeck/pull/7151)

[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A3.4.5+is%3Aclosed)

## Staff Contributors

* Imad Jafir (imad6639)
* Greg Schueler (gschueler)
* Luis Toledo (ltamaster)
* Rodrigo Navarro (ronaveva)
* Carlos Eduardo (carlosrfranco)
* Miguel Ramos (mishingo)
* Stephen Joyner (sjrd218)
* Greg Zapp (ProTip)
* Christopher McCarroll-Gilbert (chrismcg14)
* Jason Qualman (qualman)
* Alexander Abarca (alexander-variacode)
* Alberto Hormazabal Cespedes (ahormazabal)
* Forrest Evans (fdevans)
