# Release 3.4.4

Name: <span style="color: chartreuse"><span class="glyphicon glyphicon-cutlery"></span> "Papadum chartreuse cutlery"</span>

- [Download Rundeck](https://download.rundeck.com/)
- [Sign up for Release Notes](https://www.rundeck.com/release-notes-signup)

## Overview

Check out the new features and enhancements for Rundeck Enterprise and Rundeck Community included in this release.

### Expanded Cloud Infrastructure plugins [Enterprise]

This release includes new **Cloud Infrastructure** plugins that add coverage for **Oracle Cloud** and **Google Cloud** platforms and expands coverage within the **Amazon Web Services** and **Azure** platforms.

### New UI based Ruleset Designer [Enterprise]

In version 3.4.2 we introduced the Ruleset Visualization capability as part of our incubating features program.  With this 3.4.4 release it's now possible to use the GUI to design your Ruleset and generate the rules automatically.

![Ruleset Designer](@assets/img/relnotes-344-rulesetdesigner.gif)

### Accessible Colors

We have updated our color palette with updated colors to enhance the contrast and overall visual presence of Rundeck.  We'll let these before and after pictures speak for themselves.

![Before Color Changes](@assets/img/relnotes-344-before.png)

![After Color Changes](@assets/img/relnotes-344-after.png)

## Enterprise Updates

* Adding new GCP, Oracle, AWS Steps and Node Sources
* Show error page if not authorized to access System Configuration page.
* Upgrade pywinrm plugin to 2.0.14


## Core Product Updates

* [Fix: dismissible alert x button too far right](https://github.com/rundeck/rundeck/pull/7251)
* [Fix duplicated node filter after save a job](https://github.com/rundeck/rundeck/pull/7250)
* [Add Jost variable font](https://github.com/rundeck/rundeck/pull/7244)
* [Fix SCM/Node Sources configuration auth checks to be less restrictive](https://github.com/rundeck/rundeck/pull/7240)
* [Migration to change adhoc_local_string column type from VARCHAR to NVARCHAR on SQL Server database.](https://github.com/rundeck/rundeck/pull/7237)
* [Update project picker to respect GUI startpage setting](https://github.com/rundeck/rundeck/pull/7233)
* [Fix: &#39;by:&#39; urn list is not working](https://github.com/rundeck/rundeck/pull/7228)
* [Grant webhooks permissions with project based ACL](https://github.com/rundeck/rundeck/pull/7226)
* [Enhance color accessibility](https://github.com/rundeck/rundeck/pull/7225)
* [Delete apitoken.aclpolicy from docker image](https://github.com/rundeck/rundeck/pull/7222)
* [Fixing modal to save node filter when editing/creating a job. Adding config property to define max number of matched nodes.](https://github.com/rundeck/rundeck/pull/7215)
* [Remove dependency on Ant Design](https://github.com/rundeck/rundeck/pull/7211)
* [Add RUNDECK_GUI_STARTPAGE docker config](https://github.com/rundeck/rundeck/pull/7210)
* [Fix: Improve Limit log feature for better behavior with large logs](https://github.com/rundeck/rundeck/pull/7199)
* [Upgrade pywinrm plugin.](https://github.com/rundeck/rundeck/pull/7191)

[Here is a link to the full list of public PRs](https://github.com/rundeck/rundeck/pulls?q=is%3Apr+milestone%3A3.4.4+is%3Aclosed)

## Community Contributors

* Jacek Kowalski (jacekkow)

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
